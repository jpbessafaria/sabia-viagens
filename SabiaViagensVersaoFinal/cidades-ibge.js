const URL_LOCALIDADES_IBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades';
const consultasIBGE = new Map();

function consultarLocalidadesIBGE(caminho) {
    if (!consultasIBGE.has(caminho)) {
        const controlador = new AbortController();
        const prazo = setTimeout(() => controlador.abort(), 7000);
        const consulta = fetch(URL_LOCALIDADES_IBGE + caminho, { signal: controlador.signal })
            .then(resposta => {
                if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
                return resposta.json();
            })
            .then(dados => {
                if (!Array.isArray(dados) || !dados.every(item => item && typeof item.nome === 'string' && item.id != null)) {
                    throw new Error('Resposta inválida');
                }
                if (!dados.length) consultasIBGE.delete(caminho);
                return dados.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
            })
            .catch(erro => { consultasIBGE.delete(caminho); throw erro; })
            .finally(() => clearTimeout(prazo));
        consultasIBGE.set(caminho, consulta);
    }
    return consultasIBGE.get(caminho);
}

async function carregarMunicipiosDoBrasil() {
    const [municipios, estados] = await Promise.all([
        consultarLocalidadesIBGE('/municipios'),
        consultarLocalidadesIBGE('/estados').catch(() => [])
    ]);
    const ufs = new Map(estados.map(estado => [String(estado.id), estado.sigla]));
    return municipios.map(municipio => ({
        nome: municipio.nome, pais: 'Brasil', ibgeId: municipio.id,
        estado: municipio['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla ||
            municipio.microrregiao?.mesorregiao?.UF?.sigla || ufs.get(String(municipio.id).slice(0, 2))
    })).filter(municipio => municipio.estado);
}

function configurarConsultaIBGE(form) {
    const modo = form.querySelector('#cad-cid-modo');
    const grupo = form.querySelector('#cad-cid-ibge');
    const uf = form.querySelector('#ibge-uf');
    const municipio = form.querySelector('#ibge-municipio');
    const aviso = form.querySelector('#ibge-aviso');
    const tentar = form.querySelector('#ibge-tentar');
    const campos = ['nome', 'estado', 'pais'].map(campo => form.querySelector('#cad-cid-' + campo));
    let estados = [];
    let municipios = [];
    let pedido;

    function preencherSelect(select, itens, placeholder) {
        select.replaceChildren(new Option(placeholder, ''), ...itens.map(item => new Option(item.nome, item.valor)));
        select.disabled = itens.length === 0;
    }

    async function carregar() {
        pedido?.abort();
        pedido = new AbortController();
        const { signal } = pedido;
        municipios = [];
        campos.forEach(campo => { campo.value = ''; });
        preencherSelect(municipio, [], 'Selecione o estado primeiro');
        tentar.hidden = true;
        aviso.textContent = 'Carregando estados do IBGE…';
        try {
            const resultado = await consultarLocalidadesIBGE('/estados');
            if (signal.aborted) return;
            estados = resultado;
            preencherSelect(uf, estados.map(e => ({ nome: e.nome, valor: e.sigla })), 'Selecione o estado');
            aviso.textContent = estados.length ? 'Selecione um estado para consultar os municípios.' : 'O IBGE retornou uma lista de estados vazia.';
            tentar.hidden = estados.length > 0;
        } catch {
            if (signal.aborted) return;
            aviso.textContent = 'Não foi possível carregar os estados do IBGE. Tente novamente ou use o cadastro manual.';
            tentar.hidden = false;
        }
    }

    async function carregarMunicipios() {
        pedido?.abort();
        pedido = new AbortController();
        const { signal } = pedido;
        const estado = uf.value;
        municipios = [];
        campos.forEach(campo => { campo.value = ''; });
        tentar.hidden = true;
        preencherSelect(municipio, [], estado ? 'Carregando municípios…' : 'Selecione o estado primeiro');
        if (!estado) {
            aviso.textContent = 'Selecione um estado para consultar os municípios.';
            return;
        }
        aviso.textContent = 'Carregando municípios…';
        try {
            const resultado = await consultarLocalidadesIBGE('/estados/' + encodeURIComponent(estado) + '/municipios');
            if (signal.aborted) return;
            municipios = resultado;
            preencherSelect(municipio, municipios.map(m => ({ nome: m.nome, valor: m.id })), 'Selecione o município');
            aviso.textContent = municipios.length ? 'Selecione o município e confirme o cadastro.' : 'Nenhum município foi retornado para este estado.';
            tentar.hidden = municipios.length > 0;
        } catch {
            if (signal.aborted) return;
            aviso.textContent = 'Não foi possível carregar os municípios. Tente novamente ou use o cadastro manual.';
            tentar.hidden = false;
        }
    }

    uf.addEventListener('change', carregarMunicipios);
    tentar.addEventListener('click', () => uf.value ? carregarMunicipios() : carregar());
    municipio.addEventListener('change', () => {
        const atual = municipios.find(m => String(m.id) === municipio.value);
        campos[0].value = atual?.nome || '';
        campos[1].value = atual ? uf.value : '';
        campos[2].value = atual ? 'Brasil' : '';
    });

    function resetarModo() {
        const manual = modo.value === 'manual';
        grupo.hidden = manual;
        campos.forEach(campo => {
            campo.value = '';
            campo.readOnly = !manual;
            campo.required = manual;
        });
        pedido?.abort();
        uf.value = '';
        municipios = [];
        tentar.hidden = true;
        preencherSelect(municipio, [], 'Selecione o estado primeiro');
        aviso.textContent = 'Selecione um estado para consultar os municípios.';
        if (!manual && !estados.length) carregar();
    }

    modo.addEventListener('change', resetarModo);
    return {
        abrir: () => { if (modo.value === 'ibge' && !estados.length) carregar(); },
        resetar: resetarModo,
        lerId: () => {
            if (modo.value === 'manual') return '';
            const escolhido = municipios.find(m => String(m.id) === municipio.value);
            if (escolhido) return escolhido.id;
            aviso.textContent = uf.value ? 'Selecione um município para salvar.' : 'Selecione primeiro um estado.';
            (uf.value ? municipio : uf).focus();
            return null;
        }
    };
}


function normalizarUF(estado) {
    const chave = normalizarBusca(estado || '');
    const estados = { 'acre':'ac', 'alagoas':'al', 'amapa':'ap', 'amazonas':'am', 'bahia':'ba',
        'ceara':'ce', 'distrito federal':'df', 'espirito santo':'es', 'goias':'go', 'maranhao':'ma',
        'mato grosso':'mt', 'mato grosso do sul':'ms', 'minas gerais':'mg', 'para':'pa', 'paraiba':'pb',
        'parana':'pr', 'pernambuco':'pe', 'piaui':'pi', 'rio de janeiro':'rj', 'rio grande do norte':'rn',
        'rio grande do sul':'rs', 'rondonia':'ro', 'roraima':'rr', 'santa catarina':'sc', 'sao paulo':'sp',
        'sergipe':'se', 'tocantins':'to' };
    return estados[chave] || chave;
}

function mesmaCidade(a, b) {
    if (mesmoId(a.ibgeId, b.ibgeId)) return true;
    const pais = normalizarBusca(b.pais);
    const uf = pais === 'brasil' ? normalizarUF : estado => normalizarBusca(estado || '');
    return normalizarBusca(a.pais) === pais && normalizarBusca(a.nome) === normalizarBusca(b.nome) &&
        uf(a.estado) === uf(b.estado);
}
