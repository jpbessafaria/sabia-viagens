const CHAVES_CATALOGO = {
    hoteis: 'sabia_hoteis',
    companhias: 'sabia_companhias',
    cidades: 'sabia_cidades',
    aeroportos: 'sabia_aeroportos',
    quartos: 'sabia_quartos',
    voos_cia: 'sabia_voos_cia',
    voos: 'sabia_voos'
};
const CHAVE_DADOS = 'sabia_dados_v1';

function avisarArmazenamento(mensagem, erro) {
    console.warn(mensagem, erro);
    let aviso = document.getElementById('sabia-aviso-dados');
    if (!aviso) {
        aviso = document.createElement('p');
        aviso.id = 'sabia-aviso-dados';
        aviso.setAttribute('role', 'status');
        (document.querySelector('main') || document.body).prepend(aviso);
    }
    aviso.textContent = mensagem;
}

function lerLocal(chave, validar) {
    let texto;
    try {
        texto = localStorage.getItem(chave);
        if (texto === null) return { estado: 'ausente' };
        const valor = JSON.parse(texto);
        if (!validar(valor)) throw new Error('Formato inválido em ' + chave);
        return { estado: 'valido', valor, texto };
    } catch (erro) {
        avisarArmazenamento('Não foi possível ler ' + chave + '. Os dados armazenados foram preservados.', erro);
        return { estado: 'invalido', texto };
    }
}

function gravarLocal(chave, valor) {
    try {
        if (valor === null) localStorage.removeItem(chave);
        else localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        avisarArmazenamento('Não foi possível salvar os dados no navegador.', erro);
        alert('A alteração não foi salva. Verifique o armazenamento do navegador.');
        return false;
    }
}

function listaDeRegistros(valor) {
    return Array.isArray(valor) && valor.every(item => item && typeof item === 'object' && !Array.isArray(item));
}

const CAMPOS_CATALOGO = {
    hoteis: ['nome', 'cidade'],
    companhias: ['nome', 'codigoIata'],
    cidades: ['nome', 'pais'],
    aeroportos: ['nome', 'cidade', 'codigo'],
    quartos: ['numero', 'tipo'],
    voos_cia: ['numero', 'origem', 'destino', 'partida', 'chegada'],
    voos: ['origem', 'destino']
};

function listaCatalogo(valor, nome) {
    return listaDeRegistros(valor) && valor.every(item =>
        (typeof item.id === 'number' || typeof item.id === 'string') &&
        CAMPOS_CATALOGO[nome].every(campo => typeof item[campo] === 'string')
    );
}

function listaUsuarios(valor) {
    return listaDeRegistros(valor) && valor.every(u =>
        typeof u.email === 'string' && typeof u.cpf === 'string' && typeof u.nome === 'string'
    );
}

function estadoValido(valor) {
    return valor && valor.catalogo && typeof valor.catalogo === 'object' &&
        !Array.isArray(valor.catalogo) &&
        Object.keys(valor.catalogo).every(nome =>
            Object.hasOwn(CHAVES_CATALOGO, nome) && listaCatalogo(valor.catalogo[nome], nome)
        ) && listaUsuarios(valor.usuarios) &&
        (valor.solicitacoesHotel === undefined || (listaCatalogo(valor.solicitacoesHotel, 'hoteis') &&
            valor.solicitacoesHotel.every(p => typeof p.responsavelEmail === 'string' &&
                ['pendente', 'rejeitado', 'aprovado'].includes(p.statusAprovacao)))) &&
        (valor.solicitacoesCompanhia === undefined || (listaCatalogo(valor.solicitacoesCompanhia, 'companhias') &&
            valor.solicitacoesCompanhia.every(p => typeof p.responsavelEmail === 'string' &&
                ['pendente', 'rejeitado', 'aprovado'].includes(p.statusAprovacao))));
}

async function carregarCatalogoInicial() {
    const resposta = await fetch('database.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    const dados = await resposta.json();
    const listas = ['destinos', 'promocoes', 'destaques', 'voos'];
    const catalogos = ['hoteis', 'companhias', 'cidades', 'aeroportos'];
    if (!dados || !listaUsuarios(dados.usuarios) || !listas.every(nome => listaDeRegistros(dados[nome])) ||
        !dados.destinos.every(d => typeof d.cidade === 'string' && typeof d.codigo === 'string') ||
        !dados.voos.every(v => typeof v.origem === 'string' && typeof v.destino === 'string') ||
        !catalogos.every(nome => listaCatalogo(dados[nome], nome))) {
        throw new Error('Estrutura inválida em database.json');
    }
    return dados;
}

function buscarUsuario(usuarios, identificador) {
    const ident = identificador.trim();
    if (ident.includes('@')) {
        return usuarios.find(u => u.email.trim().toLowerCase() === ident.toLowerCase());
    }
    if (!/^[\d.\s-]+$/.test(ident)) return undefined;
    const cpf = ident.replace(/\D/g, '');
    if (!cpf) return undefined;
    return usuarios.find(u => u.cpf.replace(/\D/g, '') === cpf);
}

function gerarId() {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function combinarUsuarios(usuarios, alteracoes) {
    const resultado = [...usuarios];
    alteracoes.forEach(usuario => {
        const cpf = usuario.cpf.replace(/\D/g, '');
        const email = usuario.email.trim().toLowerCase();
        const indice = resultado.findIndex(u =>
            u.email.trim().toLowerCase() === email || (cpf && u.cpf.replace(/\D/g, '') === cpf)
        );
        if (indice < 0) resultado.push(usuario);
        else resultado[indice] = usuario;
    });
    return resultado;
}

function lerEstadoDados(base) {
    const atual = lerLocal(CHAVE_DADOS, estadoValido);
    if (atual.estado !== 'ausente') return { ...atual, persistido: atual.estado === 'valido' };

    const catalogo = {};
    const invalidos = [];
    for (const [nome, chave] of Object.entries(CHAVES_CATALOGO)) {
        const antigo = lerLocal(chave, valor => listaCatalogo(valor, nome));
        if (antigo.estado === 'invalido') {
            catalogo[nome] = [];
            invalidos.push(chave);
        }
        if (antigo.estado !== 'valido') continue;
        const inicial = base[nome] || [];
        const idsIniciais = new Set(inicial.map(item => String(item.id)));
        // A versão antiga salvava tanto adições quanto listas completas na mesma chave.
        const lista = antigo.valor;
        const pareceCopia = lista.length === 0 || lista.some(item => idsIniciais.has(String(item.id)));
        const registros = pareceCopia ? lista : [...inicial, ...lista];
        catalogo[nome] = [...new Map(registros.map(item => [String(item.id), item])).values()];
    }
    if (catalogo.voos?.length && catalogo.voos_cia?.length) {
        catalogo.voos = [...catalogo.voos, ...catalogo.voos_cia];
    }
    const usuarios = lerLocal('sabia_registered_users', listaUsuarios);
    if (usuarios.estado === 'invalido') invalidos.push('sabia_registered_users');
    return { estado: invalidos.length ? 'invalido' : 'ausente',
        valor: { catalogo, usuarios: combinarUsuarios([], usuarios.valor || []) }, invalidos };
}

function destinosDoCatalogo(base, cidades, aeroportos) {
    const nome = valor => valor.trim().toLowerCase();
    const cidadesAtivas = new Set(cidades.map(c => nome(c.nome)));
    const cidadesIniciais = new Set(base.cidades.map(c => nome(c.nome)));
    const aeroportosAtivos = new Set(aeroportos.map(a => a.codigo));
    const aeroportosIniciais = new Set(base.aeroportos.map(a => a.codigo));
    const destinos = base.destinos.filter(d =>
        (!cidadesIniciais.has(nome(d.cidade)) || cidadesAtivas.has(nome(d.cidade))) &&
        (!aeroportosIniciais.has(d.codigo) || aeroportosAtivos.has(d.codigo))
    );
    aeroportos.forEach(a => {
        if (cidadesIniciais.has(nome(a.cidade)) && !cidadesAtivas.has(nome(a.cidade))) return;
        if (!destinos.some(d => d.codigo === a.codigo)) {
            destinos.push({ id: a.id, cidade: a.cidade, codigo: a.codigo, aeroporto: a.nome, pais: a.pais });
        }
    });
    cidades.forEach(c => {
        if (c.ibgeId || cidadesIniciais.has(nome(c.nome)) || destinos.some(d => nome(d.cidade) === nome(c.nome))) return;
        destinos.push({ id: c.id, cidade: c.nome, codigo: c.codigo || c.nome.slice(0, 3).toUpperCase(),
            aeroporto: 'Aeroporto de ' + c.nome, pais: c.pais });
    });
    return destinos;
}

function mesmoId(a, b) {
    return a != null && b != null && String(a) === String(b);
}

function normalizarBusca(valor) {
    return valor.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function catalogoDeVoos(base, catalogo, companhias, semBase) {
    const registros = catalogo.voos ?? [
        ...(semBase ? [] : base.voos),
        ...(catalogo.voos_cia || [])
    ];
    const voos = new Map();
    registros.forEach(voo => {
        // Vínculo antigo só é recuperado quando o nome corresponde ao cadastro.
        const cia = voo.companhiaId != null
            ? companhias.find(c => mesmoId(c.id, voo.companhiaId))
            : companhias.find(c => normalizarBusca(c.nome) === normalizarBusca(voo.companhia || ''));
        const id = String(voo.id);
        if (voos.has(id)) return;
        voos.set(id, {
            ...voo,
            companhiaId: voo.companhiaId ?? cia?.id ?? null,
            companhia: cia?.nome || voo.companhia || 'Companhia não identificada',
            horarioPartida: voo.partida || voo.horarioPartida || '',
            horarioChegada: voo.chegada || voo.horarioChegada || '',
            preco: Number(voo.preco)
        });
    });
    return [...voos.values()];
}

function hotelPublicado(hotel) {
    return hotel.statusAprovacao === 'aprovado' && hotel.ativo !== false;
}

function referenciasDeReserva(tipo, servico) {
    const reservas = reservasDoServico(tipo);
    if (!reservas) return null;
    const campo = tipo === 'voo' ? 'vooId' : 'hotelId';
    const nome = tipo === 'voo' ? servico.numero : servico.nome;
    return reservas.some(r => {
        if (!['confirmada', 'confirmado'].includes(normalizarBusca(String(r.status || 'confirmada')))) return false;
        if (r[campo] != null) return mesmoId(r[campo], servico.id);
        const referencia = r[tipo];
        // Sem vínculo identificável, preservar o serviço diante de uma reserva antiga.
        if (referencia == null || referencia === '') return true;
        return mesmoId(referencia, servico.id) || mesmoId(referencia, nome);
    });
}

const CHAVE_CARRINHO = 'sabia_cart_items';
const CHAVE_RESERVAS = 'sabia_reservas_v1';
const CUPONS_SABIA = { SABIA10: 0.10, KRYSTAL10: 0.10, DISNEY15: 0.15, PARIS2026: 450 };
const formatoReal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function quantidadeItem(item) {
    const quantidade = Number(item.qty ?? 1);
    return Number.isSafeInteger(quantidade) && quantidade > 0 ? quantidade : 1;
}

function tipoItem(item) {
    if (item.hotelId != null || String(item.id).startsWith('HOTEL-') || item.type === 'Hospedagem') return 'hotel';
    if (item.voos?.length || /Aérea|Aéreo|Trecho|Destinos/i.test(item.type || '')) return 'voo';
    return 'pacote';
}

function trechosValidos(trechos) {
    return listaDeRegistros(trechos) && trechos.every(trecho =>
        ['origem', 'destino', 'data', 'partida', 'chegada'].every(campo =>
            trecho[campo] === undefined || typeof trecho[campo] === 'string'));
}

function lerCarrinho() {
    return lerLocal(CHAVE_CARRINHO, valor => listaDeRegistros(valor) && valor.every(item =>
        typeof item.title === 'string' && item.price != null &&
        Number.isFinite(Number(item.price)) && Number(item.price) >= 0 &&
        (item.voos === undefined || trechosValidos(item.voos))));
}

function moedaSabia(valor) {
    return formatoReal.format(valor);
}

function cotarCarrinho(itens) {
    const centavos = itens.map(item => Math.round(Number(item.price) * 100) * quantidadeItem(item));
    const subtotal = centavos.reduce((soma, valor) => soma + valor, 0);
    const cupom = itens[0]?.cupom;
    const regra = Object.hasOwn(CUPONS_SABIA, cupom) ? CUPONS_SABIA[cupom] : 0;
    const desconto = regra < 1 ? Math.round(subtotal * regra) : Math.min(subtotal, regra * 100);
    return { itens: centavos.map(valor => valor / 100), subtotal: subtotal / 100,
        desconto: desconto / 100, total: (subtotal - desconto) / 100 };
}

function dataUTC(data) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data || '')) return NaN;
    return Date.parse(data + 'T00:00:00Z');
}

function noitesEntre(inicio, fim) {
    return (dataUTC(fim) - dataUTC(inicio)) / 86400000;
}

function adicionarNoites(data, noites) {
    const inicio = dataUTC(data);
    return Number.isFinite(inicio) ? new Date(inicio + noites * 86400000).toISOString().slice(0, 10) : '';
}

function lerReservasSabia() {
    return lerLocal(CHAVE_RESERVAS, valor => listaDeRegistros(valor) && valor.every(reserva =>
        typeof reserva.codigo === 'string' && typeof reserva.contaEmail === 'string' &&
        Array.isArray(reserva.viajantes) && Number.isFinite(reserva.total) &&
        listaDeRegistros(reserva.itens) && reserva.itens.every(item =>
            typeof item.titulo === 'string' && Number.isFinite(item.subtotal) && trechosValidos(item.voos))));
}

function reservaDaConta(reserva, usuario) {
    if (!usuario) return false;
    if (reserva.contaId != null && usuario.id != null) return mesmoId(reserva.contaId, usuario.id);
    return reserva.contaEmail.toLowerCase() === usuario.email.toLowerCase();
}

function reservasDoServico(tipo) {
    const legado = lerLocal(tipo === 'hotel' ? 'sabia_reservas_hotel' : 'sabia_reservas_voo', listaDeRegistros);
    const atual = lerReservasSabia();
    if (legado.estado === 'invalido' || atual.estado === 'invalido') return null;
    const novas = (atual.valor || []).flatMap(reserva => reserva.itens.flatMap(item => {
        if (tipo === 'hotel' && item.hotelId != null) {
            return [{ hotelId: item.hotelId, hospede: reserva.responsavel, quarto: '-', checkin: item.checkin,
                checkout: item.checkout, total: item.subtotal.toFixed(2), status: reserva.status }];
        }
        if (tipo !== 'voo') return [];
        return (item.voos || []).map(voo => ({
            vooId: voo.id, origem: voo.origem, destino: voo.destino, data: voo.data,
            passageiro: reserva.viajantes.slice(0, item.quantidade).join(', '),
            valor: item.voos.length === 1 ? moedaSabia(item.subtotal) : 'No itinerário', status: reserva.status
        }));
    }));
    return [...(legado.valor || []), ...novas];
}

