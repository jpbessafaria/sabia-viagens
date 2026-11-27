// O IBGE identifica municípios. Cada opção guarda apenas vínculos encontrados no catálogo.
function criarBuscaLocalidades(dados, voosPublicos, hoteisPublicos) {
    let opcoes = [];
    let carregamento;
    let estado = 'local';
    const chaveNome = (nome, pais) => normalizarBusca(pais || '') + '|' + normalizarBusca(nome);
    const chaveLocal = local => chaveNome(local.nome, local.pais) + '|' +
        (normalizarBusca(local.pais || '') === 'brasil' ? normalizarUF(local.estado) : normalizarBusca(local.estado || ''));

    function indexar(oficiais) {
        const porChave = new Map();
        const porNome = new Map();
        const porIbge = new Map();
        const porMunicipio = new Map();

        function incluir(local) {
            if (!local?.nome) return null;
            const chave = chaveLocal(local);
            if (porChave.has(chave)) return porChave.get(chave);
            const complemento = normalizarBusca(local.pais || '') === 'brasil'
                ? normalizarUF(local.estado).toUpperCase() || 'UF não informada'
                : [local.estado, local.pais].filter(Boolean).join(', ');
            const rotulo = [local.nome, complemento].filter(Boolean).join(', ');
            const opcao = { ...local, rotulo, aeroportos: new Set(), origem: new Set(), destino: new Set(), hotel: new Set() };
            porChave.set(chave, opcao);
            const nome = chaveNome(local.nome, local.pais);
            if (!porNome.has(nome)) porNome.set(nome, []);
            porNome.get(nome).push(opcao);
            const municipio = normalizarBusca(local.nome);
            if (!porMunicipio.has(municipio)) porMunicipio.set(municipio, []);
            porMunicipio.get(municipio).push(opcao);
            if (local.ibgeId != null) porIbge.set(String(local.ibgeId), opcao);
            return opcao;
        }

        oficiais.forEach(incluir);
        dados.cidades.forEach(incluir);
        function vincular(servico, nome) {
            const relacionado = dados.cidades.find(c => mesmoId(c.id, servico.cidadeId));
            if (relacionado) return incluir(relacionado);
            if (servico.ibgeId != null && porIbge.has(String(servico.ibgeId))) return porIbge.get(String(servico.ibgeId));
            const local = { nome, pais: servico.pais, estado: servico.estado };
            if (servico.estado) return incluir(local);
            const conhecidos = porNome.get(chaveNome(nome, servico.pais)) || [];
            if (conhecidos.length === 1) return conhecidos[0];
            // Se houver homônimos, o cadastro sem UF continua disponível como vínculo local indefinido.
            return incluir(local);
        }

        const aeroportos = new Map();
        dados.aeroportos.forEach(a => {
            const opcao = vincular(a, a.cidade);
            if (!opcao) return;
            const codigo = a.codigo.toUpperCase();
            if (aeroportos.has(codigo) && aeroportos.get(codigo) !== opcao) aeroportos.set(codigo, null);
            else aeroportos.set(codigo, opcao);
            opcao.aeroportos.add(codigo);
        });

        function localDoTrecho(trecho) {
            const comCodigo = trecho.match(/^(.+?)\s*\(([A-Z0-9]{3,4})\)\s*$/i);
            const codigo = (comCodigo?.[2] || trecho).trim().toUpperCase();
            if (aeroportos.has(codigo)) return aeroportos.get(codigo);
            const nome = (comCodigo?.[1] || trecho).trim();
            const candidatos = porMunicipio.get(normalizarBusca(nome)) || [];
            if (candidatos.length === 1 && !comCodigo) return candidatos[0];
            // Rotas legadas sem aeroporto confirmado ficam pesquisáveis pelo próprio rótulo de catálogo.
            return incluir({ nome: trecho, pais: '', estado: '' });
        }

        voosPublicos().forEach(voo => {
            localDoTrecho(voo.origem)?.origem.add(voo.origem);
            localDoTrecho(voo.destino)?.destino.add(voo.destino);
        });
        hoteisPublicos().forEach(hotel => vincular(hotel, hotel.cidade)?.hotel.add(String(hotel.id)));
        opcoes = [...porChave.values()].map(opcao => ({
            ...opcao,
            pesquisa: normalizarBusca(opcao.rotulo + ' ' + (opcao.pais || '') + ' ' + [...opcao.aeroportos].join(' '))
        }));
    }

    indexar([]);
    return {
        carregar() {
            if (!carregamento) {
                estado = 'carregando';
                carregamento = carregarMunicipiosDoBrasil().then(oficiais => {
                    if (!oficiais.length) throw new Error('Municípios indisponíveis');
                    indexar(oficiais);
                    estado = 'disponivel';
                }).catch(() => { estado = 'indisponivel'; });
            }
            return carregamento;
        },
        estado: () => estado,
        sugerir(termo, tipo) {
            const texto = normalizarBusca(termo).replace(/[,()]/g, ' ').trim();
            const termos = texto.split(/\s+/).filter(Boolean);
            return opcoes.filter(opcao => termos.length
                ? termos.every(parte => opcao.pesquisa.includes(parte))
                : opcao[tipo].size > 0)
                .sort((a, b) => Number(b[tipo].size > 0) - Number(a[tipo].size > 0) ||
                    Number(b.pesquisa.startsWith(texto)) - Number(a.pesquisa.startsWith(texto)) ||
                    a.rotulo.localeCompare(b.rotulo, 'pt-BR')).slice(0, 8);
        }
    };
}

let sequenciaAutocomplete = 0;

function configurarAutocompleteLocalidade(input, lista, busca, tipo, aoAlterar) {
    let selecao = null;
    let sugestoes = [];
    let indice = -1;
    let exibindo = false;
    lista.id ||= 'sugestoes-localidade-' + (++sequenciaAutocomplete);
    lista.setAttribute('role', 'listbox');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-controls', lista.id);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');

    const aviso = document.createElement('span');
    aviso.id = lista.id + '-aviso';
    aviso.className = 'sr-only';
    aviso.setAttribute('role', 'status');
    input.setAttribute('aria-describedby', aviso.id);
    lista.after(aviso);

    function fechar() {
        exibindo = false;
        indice = -1;
        lista.classList.remove('active');
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
    }

    function selecionar(opcao, notificar = true) {
        selecao = opcao;
        input.value = opcao?.rotulo || '';
        input.removeAttribute('aria-invalid');
        fechar();
        if (notificar) aoAlterar?.(opcao);
    }

    function renderizar() {
        if (!exibindo) return;
        sugestoes = busca.sugerir(input.value, tipo);
        indice = -1;
        input.removeAttribute('aria-activedescendant');
        lista.replaceChildren();
        sugestoes.forEach((opcao, i) => {
            const item = document.createElement('div');
            item.id = lista.id + '-opcao-' + i;
            item.className = 'autocomplete-item';
            item.setAttribute('role', 'option');
            item.setAttribute('aria-selected', 'false');
            item.textContent = opcao.rotulo;
            if (opcao.aeroportos.size && tipo !== 'hotel') {
                const codigo = document.createElement('span');
                codigo.className = 'code-badge';
                codigo.textContent = [...opcao.aeroportos].join(', ');
                item.append(codigo);
            }
            item.addEventListener('mousedown', evento => evento.preventDefault());
            item.addEventListener('click', () => selecionar(opcao));
            lista.append(item);
        });
        const estado = busca.estado();
        const mensagem = estado === 'carregando' ? 'Consultando municípios do IBGE…'
            : estado === 'indisponivel' ? 'IBGE indisponível. Busca pelo catálogo local.'
                : sugestoes.length ? '' : 'Nenhuma localidade encontrada.';
        const invalido = input.getAttribute('aria-invalid') === 'true';
        const instrucao = [invalido ? 'Selecione uma opção da lista para pesquisar.' : '', mensagem].filter(Boolean).join(' ');
        aviso.textContent = instrucao || sugestoes.length + ' sugestões disponíveis.';
        if (instrucao) {
            const texto = document.createElement('div');
            texto.className = 'autocomplete-aviso';
            texto.setAttribute('role', 'presentation');
            texto.textContent = instrucao;
            lista.append(texto);
        }
        lista.classList.add('active');
        input.setAttribute('aria-expanded', 'true');
    }

    function abrir() {
        exibindo = true;
        const carregando = busca.estado() === 'local' || busca.estado() === 'carregando';
        if (carregando) busca.carregar().then(renderizar);
        renderizar();
    }

    input.addEventListener('focus', () => { if (!selecao) abrir(); });
    input.addEventListener('blur', fechar);
    input.addEventListener('input', () => {
        selecao = null;
        input.removeAttribute('aria-invalid');
        aoAlterar?.(null);
        abrir();
    });
    input.addEventListener('keydown', evento => {
        if (evento.key === 'Escape' && exibindo) {
            evento.preventDefault();
            fechar();
        }
        if (evento.key === 'Enter' && exibindo && indice >= 0) {
            evento.preventDefault();
            selecionar(sugestoes[indice]);
        }
        if (!['ArrowDown', 'ArrowUp'].includes(evento.key)) return;
        evento.preventDefault();
        if (!exibindo) abrir();
        if (!sugestoes.length) return;
        indice = indice < 0 && evento.key === 'ArrowUp' ? sugestoes.length - 1 :
            (indice + (evento.key === 'ArrowDown' ? 1 : -1) + sugestoes.length) % sugestoes.length;
        const itens = lista.querySelectorAll('[role="option"]');
        itens.forEach((item, i) => item.setAttribute('aria-selected', String(i === indice)));
        input.setAttribute('aria-activedescendant', itens[indice].id);
        itens[indice].scrollIntoView({ block: 'nearest' });
    });

    return {
        fechar, selecionar,
        ler: () => selecao?.rotulo === input.value ? selecao : null,
        exigir() {
            const atual = this.ler();
            if (atual) return atual;
            input.setAttribute('aria-invalid', 'true');
            input.focus();
            abrir();
            return null;
        }
    };
}

