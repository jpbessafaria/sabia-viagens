const CHAVE_SESSAO = 'sabia_user';

const PAINEIS_ADMIN = {
    ADM_GERAL: { pagina: 'admin.html', rotulo: 'Administração geral' },
    ADM_HOTEL: { pagina: 'admin_hotel.html', rotulo: 'Gerenciar meu hotel' },
    ADM_VOO: { pagina: 'admin_voo.html', rotulo: 'Gerenciar minha companhia' }
};

const PERFIS_POR_PAINEL = {
    'admin-page': ['ADM_GERAL'],
    'admin-hotel-page': ['ADM_HOTEL'],
    'admin-voo-page': ['ADM_GERAL', 'ADM_VOO'],
    'solicitacao-page': ['SOLICITANTE_HOTEL', 'SOLICITANTE_COMPANHIA', 'ADM_HOTEL', 'ADM_VOO']
};

document.addEventListener('DOMContentLoaded', async () => {

    
    
    const DEFAULT_DB = {
        usuarios: [
            { cpf: "000.000.000-00", nome: "Administrador Geral", email: "admin@sabia.com", senha: "admin123", tipo: "ADM_GERAL", foto: "avatar-bird" },
            { cpf: "111.111.111-11", nome: "Carlos Latam (Gestor)", email: "latam@sabia.com", senha: "voo123", tipo: "ADM_VOO", companhiaId: 1, foto: "avatar-bird" },
            { cpf: "999.111.111-11", nome: "Paula Latam (Gestora)", email: "paula.latam@sabia.com", senha: "voo456", tipo: "ADM_VOO", companhiaId: 1, foto: "avatar-bird" },
            { cpf: "222.222.222-22", nome: "Roberto Mendez (Gerente)", email: "krystal@sabia.com", senha: "hotel123", tipo: "ADM_HOTEL", hotelId: 1, foto: "avatar-bird" },
            { cpf: "999.222.222-22", nome: "Fernanda Krystal (Gerente)", email: "fernanda.krystal@sabia.com", senha: "hotel456", tipo: "ADM_HOTEL", hotelId: 1, foto: "avatar-bird" },
            { cpf: "123.456.789-00", nome: "Carlos Silva", email: "carlos@email.com", senha: "123456", tipo: "CLIENTE", foto: "avatar-bird" },
            { cpf: "987.654.321-11", nome: "Ana Oliveira", email: "ana@email.com", senha: "sabia2026", tipo: "CLIENTE", foto: "avatar-bird" }
        ],
        hoteis: [
            { id: 1, nome: "Krystal Grand Cancún Resort", cidade: "Cancún", pais: "México", tipo: "resorts", estrelas: 5, diaria: 1234, lat: 21.139, lng: -86.749, imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", amenities: ["All Inclusive", "Piscina", "Wi-Fi Grátis", "Café da manhã", "Recepção 24h"] },
            { id: 2, nome: "Disney All-Star Music Resort", cidade: "Orlando", pais: "Estados Unidos", tipo: "resorts", estrelas: 4, diaria: 2040, lat: 28.343, lng: -81.571, imagem: "https://images.unsplash.com/photo-1572293007244-8b60335d2b7d?auto=format&fit=crop&w=1000&q=80", amenities: ["Estacionamento", "Café da manhã", "Piscina", "Recepção 24h"] },
            { id: 3, nome: "Hôtel Le Parisien Romantique", cidade: "Paris", pais: "França", tipo: "hoteis", estrelas: 5, diaria: 2700, lat: 48.858, lng: 2.294, imagem: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80", amenities: ["Vista Torre Eiffel", "Café da manhã", "Recepção 24h", "Wi-Fi Grátis"] },
            { id: 4, nome: "Grand Hotel Resort Salvador", cidade: "Salvador", pais: "Brasil", tipo: "resorts", estrelas: 4, diaria: 990, lat: -12.977, lng: -38.501, imagem: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80", amenities: ["Piscina", "All Inclusive", "Café da manhã", "Estacionamento", "Recepção 24h"] },
            { id: 5, nome: "FOUND Hotel Carlton, Nob Hill", cidade: "São Francisco", pais: "Estados Unidos", tipo: "hoteis", estrelas: 5, diaria: 618, lat: 37.789, lng: -122.418, imagem: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80", amenities: ["Café da manhã", "Estacionamento", "Piscina", "Recepção 24h", "Wi-Fi Grátis"] },
            { id: 6, nome: "Copacabana Palace Hotel & Spa", cidade: "Rio de Janeiro", pais: "Brasil", tipo: "hoteis", estrelas: 5, diaria: 1450, lat: -22.967, lng: -43.178, imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80", amenities: ["Café da manhã", "Piscina", "Estacionamento", "Recepção 24h", "Frente Mar", "Wi-Fi Grátis"] },
            { id: 7, nome: "Pousada Recanto das Hortênsias", cidade: "Gramado", pais: "Brasil", tipo: "pousadas", estrelas: 4, diaria: 420, lat: -29.374, lng: -50.876, imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80", amenities: ["Café da manhã", "Estacionamento", "Wi-Fi Grátis", "Recepção 24h"] },
            { id: 8, nome: "Hotel Fasano Jardins", cidade: "São Paulo", pais: "Brasil", tipo: "hoteis", estrelas: 5, diaria: 1890, lat: -23.567, lng: -46.669, imagem: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80", amenities: ["Café da manhã", "Piscina", "Estacionamento", "Recepção 24h", "Wi-Fi Grátis"] },
            { id: 9, nome: "Pestana CR7 Lisboa", cidade: "Lisboa", pais: "Portugal", tipo: "hoteis", estrelas: 4, diaria: 1150, lat: 38.709, lng: -9.136, imagem: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80", amenities: ["Café da manhã", "Recepção 24h", "Wi-Fi Grátis", "Estacionamento"] },
            { id: 10, nome: "Bariloche Mountain Lodge & Spa", cidade: "Bariloche", pais: "Argentina", tipo: "resorts", estrelas: 5, diaria: 870, lat: -41.133, lng: -71.310, imagem: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80", amenities: ["Café da manhã", "Piscina", "Estacionamento", "Recepção 24h", "Wi-Fi Grátis"] },
            { id: 11, nome: "The Manhattan Grand Suites", cidade: "Nova York", pais: "Estados Unidos", tipo: "hoteis", estrelas: 5, diaria: 2190, lat: 40.758, lng: -73.985, imagem: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80", amenities: ["Recepção 24h", "Wi-Fi Grátis", "Café da manhã", "Estacionamento"] }
        ],
        companhias: [
            { id: 1, nome: "Latam Airlines", codigoIata: "LA", pais: "Brasil" },
            { id: 2, nome: "Copa Airlines", codigoIata: "CM", pais: "Panamá" },
            { id: 3, nome: "Azul Linhas Aéreas", codigoIata: "AD", pais: "Brasil" },
            { id: 4, nome: "Gol Linhas Aéreas", codigoIata: "G3", pais: "Brasil" },
            { id: 5, nome: "Turkish Airlines", codigoIata: "TK", pais: "Turquia" }
        ],
        cidades: [
            { id: 1, nome: "São Paulo", estado: "SP", pais: "Brasil" },
            { id: 2, nome: "Cancún", estado: "Quintana Roo", pais: "México" },
            { id: 3, nome: "Rio de Janeiro", estado: "RJ", pais: "Brasil" },
            { id: 4, nome: "Orlando", estado: "Flórida", pais: "Estados Unidos" },
            { id: 5, nome: "Paris", estado: "Île-de-France", pais: "França" },
            { id: 6, nome: "Salvador", estado: "BA", pais: "Brasil" },
            { id: 7, nome: "Lisboa", estado: "Estremadura", pais: "Portugal" },
            { id: 8, nome: "Nova York", estado: "NY", pais: "Estados Unidos" },
            { id: 9, nome: "Buenos Aires", estado: "Capital Federal", pais: "Argentina" },
            { id: 10, nome: "São Francisco", estado: "CA", pais: "Estados Unidos" }
        ],
        aeroportos: [
            { id: 1, nome: "Guarulhos / Congonhas", codigo: "SAO", cidade: "São Paulo", pais: "Brasil" },
            { id: 2, nome: "Aeroporto Internacional de Cancún", codigo: "CUN", cidade: "Cancún", pais: "México" },
            { id: 3, nome: "Galeão / Santos Dumont", codigo: "RIO", cidade: "Rio de Janeiro", pais: "Brasil" },
            { id: 4, nome: "Orlando International Airport", codigo: "MCO", cidade: "Orlando", pais: "Estados Unidos" },
            { id: 5, nome: "Charles de Gaulle", codigo: "CDG", cidade: "Paris", pais: "França" },
            { id: 6, nome: "Deputado Luís Eduardo Magalhães", codigo: "SSA", cidade: "Salvador", pais: "Brasil" },
            { id: 7, nome: "Humberto Delgado", codigo: "LIS", cidade: "Lisboa", pais: "Portugal" },
            { id: 8, nome: "John F. Kennedy", codigo: "JFK", cidade: "Nova York", pais: "Estados Unidos" },
            { id: 9, nome: "Ezeiza", codigo: "EZE", cidade: "Buenos Aires", pais: "Argentina" },
            { id: 10, nome: "San Francisco International", codigo: "SFO", cidade: "São Francisco", pais: "Estados Unidos" }
        ],
        destinos: [
            { id: 1, cidade: "São Paulo", codigo: "SAO", aeroporto: "Guarulhos / Congonhas", pais: "Brasil" },
            { id: 2, cidade: "Cancún", codigo: "CUN", aeroporto: "Aeroporto Internacional de Cancún", pais: "México" },
            { id: 3, cidade: "Rio de Janeiro", codigo: "RIO", aeroporto: "Galeão / Santos Dumont", pais: "Brasil" },
            { id: 4, cidade: "Orlando", codigo: "MCO", aeroporto: "Orlando International Airport", pais: "Estados Unidos" },
            { id: 5, cidade: "Paris", codigo: "CDG", aeroporto: "Charles de Gaulle", pais: "França" },
            { id: 6, cidade: "Salvador", codigo: "SSA", aeroporto: "Deputado Luís Eduardo Magalhães", pais: "Brasil" },
            { id: 7, cidade: "Lisboa", codigo: "LIS", aeroporto: "Humberto Delgado", pais: "Portugal" },
            { id: 8, cidade: "Nova York", codigo: "JFK", aeroporto: "John F. Kennedy", pais: "Estados Unidos" },
            { id: 9, cidade: "Buenos Aires", codigo: "EZE", aeroporto: "Ezeiza", pais: "Argentina" },
            { id: 10, cidade: "São Francisco", codigo: "SFO", aeroporto: "San Francisco International", pais: "Estados Unidos" }
        ],
        promocoes: [
            {
                id: 101, tipo: "Hotel All Inclusive", titulo: "Cancún", subtitulo: "Viagem para cancun - tudo incluso com voo + hospedagem e traslados",
                estrelas: 5, parcelas: 6, valorParcela: 206, valorTotal: 1234, descontoPix: "3% OFF no PIX",
                cupom: "KRYSTAL10", descontoCupom: 500, imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Pensão Completa", "Wi-Fi Grátis", "Piscina com Borda Infinita"]
            },
            {
                id: 102, tipo: "Voo + Hotel", titulo: "Orlando", subtitulo: "Parques temáticos + Hospedagem 4 estrelas inclusa com café",
                estrelas: 5, parcelas: 10, valorParcela: 204, valorTotal: 2040, descontoPix: "5% OFF no PIX",
                cupom: "DISNEY15", descontoCupom: 300, imagem: "https://images.unsplash.com/photo-1572293007244-8b60335d2b7d?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Ingressos Inclusos", "Translado Parques", "Hotel 4 Estrelas"]
            },
            {
                id: 103, tipo: "Pacote Completo", titulo: "Paris", subtitulo: "Pacote romântico com café da manhã e passeios turísticos",
                estrelas: 5, parcelas: 12, valorParcela: 225, valorTotal: 2700, descontoPix: "5% OFF no PIX",
                cupom: "PARIS2026", descontoCupom: 450, imagem: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Café da Manhã", "Passeio Torre Eiffel", "Voo Direto"]
            },
            {
                id: 104, tipo: "Resort Beira-Mar", titulo: "Salvador", subtitulo: "Resort All Inclusive à beira-mar com pé na areia e lazer",
                estrelas: 4, parcelas: 6, valorParcela: 165, valorTotal: 990, descontoPix: "3% OFF no PIX",
                cupom: "BAHIA20", descontoCupom: 200, imagem: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Pé na Areia", "All Inclusive", "Recreação Infantil"]
            },
            {
                id: 105, tipo: "Passagem Aérea", titulo: "Buenos Aires", subtitulo: "Voando Turkish com aéreo ida e volta e bagagem despachada inclusa",
                companhia: "Voando Turkish", estrelas: 5, parcelas: 4, valorParcela: 154, valorTotal: 618, descontoPix: "5% OFF no PIX",
                cupom: "BUENOS40", descontoCupom: 150, imagem: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Aéreo ida e volta", "Saída 15/08/2026", "Bagagem despachada inclusa"]
            },
            {
                id: 106, tipo: "Passagem Aérea", titulo: "Rio de Janeiro", subtitulo: "Voando Gol com voo direto e taxas inclusas",
                companhia: "Voando Gol", estrelas: 5, parcelas: 4, valorParcela: 95, valorTotal: 380, descontoPix: "5% OFF no PIX",
                cupom: "RIO20", descontoCupom: 80, imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Aéreo ida e volta", "Saída 05/09/2026", "Bagagem de mão inclusa"]
            },
            {
                id: 107, tipo: "Pacote Completo", titulo: "Lisboa", subtitulo: "Voando TAP com tour em Belém e Sintra",
                companhia: "Voando TAP Air", estrelas: 5, parcelas: 12, valorParcela: 204, valorTotal: 2450, descontoPix: "5% OFF no PIX",
                cupom: "PORTUGAL10", descontoCupom: 250, imagem: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Aéreo ida e volta", "Saída 12/10/2026", "Bagagem despachada inclusa"]
            },
            {
                id: 108, tipo: "Passagem Aérea", titulo: "Santiago", subtitulo: "Voando Sky Airline com vista para os Andes",
                companhia: "Voando Sky Airline", estrelas: 4, parcelas: 6, valorParcela: 131, valorTotal: 790, descontoPix: "5% OFF no PIX",
                cupom: "CHILE15", descontoCupom: 100, imagem: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Aéreo ida e volta", "Saída 18/11/2026", "Voo direto"]
            },
            {
                id: 109, tipo: "Pacote Completo", titulo: "Nova York", subtitulo: "Voando Delta com hotel em Manhattan e ingressos",
                companhia: "Voando Delta", estrelas: 5, parcelas: 12, valorParcela: 240, valorTotal: 2890, descontoPix: "5% OFF no PIX",
                cupom: "NYC50", descontoCupom: 300, imagem: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Aéreo ida e volta", "Saída 01/12/2026", "Bagagem despachada inclusa"]
            },
            {
                id: 110, tipo: "Passagem Aérea", titulo: "Gramado & Canela", subtitulo: "Voando Azul com transfer para a Serra Gaúcha",
                companhia: "Voando Azul", estrelas: 5, parcelas: 6, valorParcela: 90, valorTotal: 540, descontoPix: "5% OFF no PIX",
                cupom: "SERRA10", descontoCupom: 70, imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
                amenities: ["Aéreo ida e volta", "Saída 10/08/2026", "Bagagem inclusa"]
            }
        ],
        destaques: [
            { id: 201, titulo: "Paris, França", tag: "Romântico", imagem: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80", preco: "R$ 2.700", parcelas: "12x R$ 225", avaliacao: "4.9 (128)" },
            { id: 202, titulo: "Orlando, EUA", tag: "Diversão em Família", imagem: "https://images.unsplash.com/photo-1572293007244-8b60335d2b7d?auto=format&fit=crop&w=600&q=80", preco: "R$ 2.040", parcelas: "10x R$ 204", avaliacao: "4.8 (210)" },
            { id: 203, titulo: "Salvador, Bahia", tag: "Praia & Cultura", imagem: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", preco: "R$ 990", parcelas: "6x R$ 165", avaliacao: "4.7 (95)" }
        ],
        voos: [
            { id: "V-101", origem: "São Paulo (SAO)", destino: "Cancún (CUN)", companhia: "Latam Airlines", horarioPartida: "08:30", horarioChegada: "14:15", duracao: "7h 45m", direto: true, preco: 1234 },
            { id: "V-102", origem: "São Paulo (SAO)", destino: "Cancún (CUN)", companhia: "Copa Airlines", horarioPartida: "12:10", horarioChegada: "19:00", duracao: "8h 50m", direto: false, preco: 1090 },
            { id: "V-103", origem: "São Paulo (SAO)", destino: "Orlando (MCO)", companhia: "Azul Linhas Aéreas", horarioPartida: "09:45", horarioChegada: "17:30", duracao: "8h 45m", direto: true, preco: 2040 }
        ]
    };

    let base;
    let baseDisponivel = true;
    try {
        base = await carregarCatalogoInicial();
    } catch (erro) {
        base = DEFAULT_DB;
        baseDisponivel = false;
        avisarArmazenamento('Não foi possível carregar database.json. Para salvar alterações, abra o projeto por HTTP e confirme que o arquivo está acessível.', erro);
    }

    let leitura = lerEstadoDados(base);
    let estadoDados = leitura.valor || { catalogo: {}, usuarios: [] };
    const dbData = { ...base };
    window.dbData = dbData;

    function aplicarEstado() {
        for (const nome of Object.keys(CHAVES_CATALOGO)) {
            dbData[nome] = estadoDados.catalogo[nome] ??
                (leitura.estado === 'invalido' && !leitura.valor ? [] : base[nome] || []);
        }
        dbData.voos = catalogoDeVoos(base, estadoDados.catalogo, dbData.companhias,
            leitura.estado === 'invalido' && !leitura.valor);
        dbData.hoteis = dbData.hoteis.map(h => ({ statusAprovacao: 'aprovado', ...h }));
        dbData.solicitacoesHotel = estadoDados.solicitacoesHotel || [];
        dbData.solicitacoesCompanhia = estadoDados.solicitacoesCompanhia || [];
        dbData.companhias = dbData.companhias.map(c => ({ statusAprovacao: 'aprovado', ...c }));
        dbData.destinos = destinosDoCatalogo(base, dbData.cidades, dbData.aeroportos);
        dbData.usuarios = combinarUsuarios(base.usuarios, estadoDados.usuarios).map(u =>
            u.tipo === 'ADM_HOTEL' && u.hotelId == null ? { ...u, tipo: 'SOLICITANTE_HOTEL' } : u
        );
    }
    aplicarEstado();

    // Confere alterações feitas em outra aba antes de consultar ou gravar contas.
    function atualizarDadosDeConta() {
        const atual = lerEstadoDados(base);
        if (atual.estado === leitura.estado && atual.texto === leitura.texto) return;
        leitura = atual;
        estadoDados = leitura.valor || { catalogo: {}, usuarios: [] };
        aplicarEstado();
    }

    function gestorAprovado(user) {
        if (!user) return false;
        if (user.tipo === 'ADM_GERAL') return true;
        if (user.tipo === 'ADM_HOTEL') {
            return dbData.hoteis.some(h => mesmoId(h.id, user.hotelId) && hotelPublicado(h));
        }
        if (user.tipo === 'ADM_VOO') {
            return dbData.companhias.some(c => mesmoId(c.id, user.companhiaId) &&
                c.statusAprovacao === 'aprovado' && c.ativo !== false);
        }
        return false;
    }

    function destinoDeConta(user) {
        return gestorAprovado(user) ? PAINEIS_ADMIN[user.tipo]?.pagina :
            ['SOLICITANTE_HOTEL', 'SOLICITANTE_COMPANHIA', 'ADM_HOTEL', 'ADM_VOO'].includes(user?.tipo) ? 'solicitacao.html' : 'index.html';
    }

    function salvarEstado(catalogo = {}, usuarios = estadoDados.usuarios, restaurar = false,
        solicitacoesHotel = dbData.solicitacoesHotel, solicitacoesCompanhia = dbData.solicitacoesCompanhia) {
        if (document.body.id === 'admin-page' && usuarioAtual()?.tipo !== 'ADM_GERAL' &&
            (restaurar || Object.keys(catalogo).length)) return false;
        const atual = lerLocal(CHAVE_DADOS, estadoValido);
        const estadoEsperado = leitura.valor && !leitura.persistido ? 'ausente' : leitura.estado;
        if (atual.estado !== estadoEsperado || (estadoEsperado !== 'ausente' && atual.texto !== leitura.texto)) {
            alert('Os dados mudaram em outra aba. Atualize esta página antes de salvar.');
            return false;
        }
        if (!restaurar && (!baseDisponivel || leitura.estado === 'invalido')) {
            alert('O catálogo está em consulta. Restaure os dados iniciais no painel geral ou corrija a leitura antes de alterar.');
            return false;
        }
        const proximo = { catalogo: restaurar ? catalogo : { ...estadoDados.catalogo, ...catalogo },
            usuarios, solicitacoesHotel, solicitacoesCompanhia };
        if (Object.hasOwn(proximo.catalogo, 'voos')) delete proximo.catalogo.voos_cia;
        const texto = JSON.stringify(proximo);
        if (!gravarLocal(CHAVE_DADOS, proximo)) return false;
        estadoDados = proximo;
        leitura = { estado: 'valido', persistido: true, texto, valor: proximo };
        aplicarEstado();
        if (typeof atualizarAtalhoAdmin === 'function') atualizarAtalhoAdmin();
        return true;
    }

    const btnRestaurar = document.getElementById('btn-restaurar-catalogo');
    if (btnRestaurar) {
        btnRestaurar.addEventListener('click', async () => {
            if (usuarioAtual()?.tipo !== 'ADM_GERAL') return;
            for (const [tipo, servicos] of [['hotel', dbData.hoteis], ['voo', dbData.voos]]) {
                if (servicos.some(servico => referenciasDeReserva(tipo, servico) !== false)) {
                    return alert('A restauração foi bloqueada para preservar serviços com reservas confirmadas ou dados de reserva inválidos.');
                }
            }
            if (!confirm('Restaurar o catálogo inicial? Alterações em hotéis, companhias, cidades, aeroportos, quartos e voos do painel serão removidas. Parceiros aprovados pela central, carrinho, sessão, reservas e solicitações serão preservados.')) return;
            try {
                if (leitura.invalidos?.includes('sabia_registered_users')) {
                    throw new Error('O registro legado de usuários está inválido e precisa ser recuperado antes da restauração.');
                }
                const inicial = await carregarCatalogoInicial();
                if (!leitura.valor && leitura.estado === 'invalido') {
                    const textoDanificado = localStorage.getItem(CHAVE_DADOS);
                    if (textoDanificado !== leitura.texto) throw new Error('Dados alterados em outra aba');
                    if (textoDanificado !== null && !gravarLocal('sabia_dados_v1_backup', textoDanificado)) return;
                }
                const catalogo = {};
                for (const [colecao, pedidos, campo] of [
                    ['hoteis', dbData.solicitacoesHotel, 'hotelId'],
                    ['companhias', dbData.solicitacoesCompanhia, 'companhiaId']
                ]) {
                    const parceiros = dbData[colecao].filter(registro => pedidos.some(pedido =>
                        pedido.statusAprovacao === 'aprovado' && mesmoId(pedido[campo], registro.id)));
                    if (!parceiros.length) continue;
                    catalogo[colecao] = [
                        ...inicial[colecao].filter(registro => !parceiros.some(p => mesmoId(p.id, registro.id))),
                        ...parceiros
                    ];
                }
                if (!salvarEstado(catalogo, estadoDados.usuarios, true)) return;
                alert('Catálogo inicial restaurado.');
                window.location.reload();
            } catch (erro) {
                avisarArmazenamento('Falha ao restaurar o catálogo inicial.', erro);
                alert('A restauração falhou. Os dados armazenados foram preservados. ' + erro.message);
            }
        });
    }

    const btnBackToTop = document.getElementById('btn-back-to-top');
    if (btnBackToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnBackToTop.classList.add('show');
            } else {
                btnBackToTop.classList.remove('show');
            }
        });

        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    
    const btnLoginTrigger = document.getElementById('btn-login-trigger');
    const loginLabel = document.getElementById('login-label');
    const userIconLogged = document.getElementById('user-icon-logged');
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    const btnCloseAuth = document.getElementById('btn-close-auth');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const tipoCadastro = document.getElementById('reg-tipo');
    const camposHotel = document.getElementById('reg-campos-hotel');
    const camposCompanhia = document.getElementById('reg-campos-companhia');
    function atualizarTipoCadastro() {
        const tipo = tipoCadastro?.value || 'CLIENTE';
        for (const [grupo, ativo] of [[camposHotel, tipo === 'SOLICITANTE_HOTEL'],
            [camposCompanhia, tipo === 'SOLICITANTE_COMPANHIA']]) {
            if (!grupo) continue;
            grupo.hidden = !ativo;
            grupo.querySelectorAll('input').forEach(campo => { campo.required = ativo; });
        }
    }
    tipoCadastro?.addEventListener('change', atualizarTipoCadastro);
    atualizarTipoCadastro();
    const formForgot = document.getElementById('form-forgot');
    const linkToRegister = document.getElementById('link-to-register');
    const linkToLogin = document.getElementById('link-to-login');
    const linkToForgot = document.getElementById('link-to-forgot');
    const linkForgotToLogin = document.getElementById('link-forgot-to-login');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    const userFullName = document.getElementById('user-full-name');
    const userEmailDisp = document.getElementById('user-email-disp');
    const btnLogout = document.getElementById('btn-logout');

    let currentUser = null;
    let atalhoAdmin = null;
    let atalhoSolicitacao = null;

    function atualizarAtalhoAdmin() {
        const conta = usuarioAtual();
        const perfil = conta?.tipo;
        if (conta && destinoDeConta(conta) === 'solicitacao.html' && userDropdownMenu) {
            if (!atalhoSolicitacao) {
                atalhoSolicitacao = document.createElement('a');
                atalhoSolicitacao.className = 'user-menu-item';
                atalhoSolicitacao.href = 'solicitacao.html';
                atalhoSolicitacao.textContent = 'Acompanhar solicitação';
                btnLogout.before(atalhoSolicitacao);
            }
        } else if (atalhoSolicitacao) {
            atalhoSolicitacao.remove();
            atalhoSolicitacao = null;
        }
        const linkHistorico = userDropdownMenu?.querySelector('[data-historico-reservas]');
        if (!conta) linkHistorico?.remove();
        if (conta && userDropdownMenu && !linkHistorico) {
            const link = document.createElement('a');
            link.className = 'user-menu-item';
            link.dataset.historicoReservas = '';
            link.href = 'checkout.html#historico';
            link.textContent = 'Minhas reservas';
            btnLogout.before(link);
        }
        const painel = gestorAprovado(usuarioAtual()) && Object.hasOwn(PAINEIS_ADMIN, perfil)
            ? PAINEIS_ADMIN[perfil] : null;
        if (!painel) {
            atalhoAdmin?.remove();
            atalhoAdmin = null;
            return;
        }
        if (!atalhoAdmin) {
            const cabecalho = document.getElementById('auth-wrapper');
            if (!cabecalho) return;
            atalhoAdmin = document.createElement('a');
            atalhoAdmin.id = 'atalho-admin';
            atalhoAdmin.className = 'atalho-admin';
            const icone = document.createElement('span');
            icone.setAttribute('aria-hidden', 'true');
            icone.textContent = '⚙';
            atalhoAdmin.append(icone);
            cabecalho.append(atalhoAdmin);
        }
        atalhoAdmin.href = painel.pagina;
        atalhoAdmin.title = painel.rotulo;
        atalhoAdmin.setAttribute('aria-label', painel.rotulo);
    }

    
    if (btnLoginTrigger) {
        btnLoginTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentUser) {
                if (userDropdownMenu) userDropdownMenu.classList.toggle('active');
            } else {
                openAuthModal('login');
            }
        });
    }

    function openAuthModal(mode) {
        if (!authModalOverlay) return;
        authModalOverlay.classList.add('active');
        if (formLogin) formLogin.classList.remove('active');
        if (formRegister) formRegister.classList.remove('active');
        if (formForgot) formForgot.classList.remove('active');

        if (mode === 'login') {
            if (formLogin) formLogin.classList.add('active');
        } else if (mode === 'register') {
            if (formRegister) formRegister.classList.add('active');
        } else if (mode === 'forgot') {
            if (formForgot) formForgot.classList.add('active');
        }
    }

    function closeAuthModal() {
        if (authModalOverlay) authModalOverlay.classList.remove('active');
    }

    if (btnCloseAuth) btnCloseAuth.addEventListener('click', closeAuthModal);
    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', (e) => {
            if (e.target === authModalOverlay) closeAuthModal();
        });
    }

    if (linkToRegister) {
        linkToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('register');
        });
    }

    if (linkToLogin) {
        linkToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('login');
        });
    }

    if (linkToForgot) {
        linkToForgot.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('forgot');
        });
    }

    if (linkForgotToLogin) {
        linkForgotToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('login');
        });
    }

    const linkPageToLogin = document.getElementById('link-page-to-login');
    if (linkPageToLogin) {
        linkPageToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('login');
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            atualizarDadosDeConta();
            const identificador = document.getElementById('login-cpf').value.trim();
            const senhaInput = document.getElementById('login-senha').value.trim();
            const user = buscarUsuario(dbData.usuarios, identificador);

            if (!user?.senha || user.senha !== senhaInput) {
                alert('CPF, e-mail ou senha incorretos.');
                return;
            }

            if (!loginUser(user)) return;
            closeAuthModal();
            if (document.body.id === 'checkout-page') {
                window.location.reload();
                return;
            }

            const perfis = PERFIS_POR_PAINEL[document.body.id];
            if (perfis?.includes(user.tipo) && (document.body.id === 'solicitacao-page' || gestorAprovado(user))) {
                window.location.reload();
            } else if (perfis || destinoDeConta(user) === 'solicitacao.html') {
                window.location.href = destinoDeConta(user);
            }
        });
    }

    if (formRegister) {
        formRegister.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('reg-nome').value.trim();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const cpf = document.getElementById('reg-cpf').value.trim();
            const senha = document.getElementById('reg-senha').value.trim();

            if (!nome || !email || !cpf || !senha) {
                alert('⚠️ Preencha todos os campos do cadastro.');
                return;
            }

            if (cpf.replace(/\D/g, '').length !== 11 || !/^[\d.\s-]+$/.test(cpf)) {
                alert('Informe um CPF com 11 dígitos.');
                return;
            }

            atualizarDadosDeConta();
            if (buscarUsuario(dbData.usuarios, email) || buscarUsuario(dbData.usuarios, cpf)) {
                alert('Já existe uma conta com este CPF ou e-mail.');
                return;
            }
            const tipo = tipoCadastro?.value || 'CLIENTE';
            if (!['CLIENTE', 'SOLICITANTE_HOTEL', 'SOLICITANTE_COMPANHIA'].includes(tipo)) return;
            const newUser = { id: gerarId(), nome, email, cpf, senha, tipo, foto: 'avatar-bird' };
            let pedidosHotel = dbData.solicitacoesHotel;
            let pedidosCompanhia = dbData.solicitacoesCompanhia;
            const agora = new Date().toISOString();
            if (tipo === 'SOLICITANTE_HOTEL') {
                const nomeHotel = document.getElementById('reg-hotel-nome').value.trim();
                const cidade = document.getElementById('reg-hotel-cidade').value.trim();
                const pais = document.getElementById('reg-hotel-pais').value.trim();
                const diaria = Number(document.getElementById('reg-hotel-diaria').value);
                if (!nomeHotel || !cidade || !pais || !Number.isFinite(diaria) || diaria < 0) {
                    return alert('Confira os dados do estabelecimento.');
                }
                if (dbData.hoteis.some(h => normalizarBusca(h.nome) === normalizarBusca(nomeHotel) &&
                    normalizarBusca(h.cidade) === normalizarBusca(cidade)) ||
                    pedidosHotel.some(p => p.statusAprovacao !== 'rejeitado' &&
                        normalizarBusca(p.nome) === normalizarBusca(nomeHotel) && normalizarBusca(p.cidade) === normalizarBusca(cidade))) {
                    return alert('Estabelecimento já cadastrado ou com solicitação em análise.');
                }
                pedidosHotel = [...pedidosHotel, { id: gerarId(), responsavelEmail: email,
                    nome: nomeHotel, cidade, pais, diaria, hotelId: null,
                    statusAprovacao: 'pendente', criadoEm: agora, atualizadoEm: agora, historico: [
                        { status: 'pendente', data: agora, acao: 'Solicitação enviada' }] }];
            } else if (tipo === 'SOLICITANTE_COMPANHIA') {
                const nomeCia = document.getElementById('reg-cia-nome').value.trim();
                const codigoIata = document.getElementById('reg-cia-iata').value.trim().toUpperCase();
                const pais = document.getElementById('reg-cia-pais').value.trim();
                if (!nomeCia || !/^[A-Z0-9]{2,3}$/.test(codigoIata) || !pais) {
                    return alert('Informe nome, país e código IATA de 2 ou 3 caracteres.');
                }
                if (dbData.companhias.some(c => normalizarBusca(c.nome) === normalizarBusca(nomeCia) ||
                    normalizarBusca(c.codigoIata) === normalizarBusca(codigoIata)) ||
                    pedidosCompanhia.some(p => p.statusAprovacao !== 'rejeitado' &&
                        (normalizarBusca(p.nome) === normalizarBusca(nomeCia) ||
                         normalizarBusca(p.codigoIata) === normalizarBusca(codigoIata)))) {
                    return alert('A companhia já existe ou possui uma solicitação em análise.');
                }
                pedidosCompanhia = [...pedidosCompanhia, { id: gerarId(), responsavelEmail: email,
                    nome: nomeCia, codigoIata, pais, companhiaId: null,
                    statusAprovacao: 'pendente', criadoEm: agora, atualizadoEm: agora, historico: [
                        { status: 'pendente', data: agora, acao: 'Solicitação enviada' }] }];
            }
            if (!salvarEstado({}, combinarUsuarios(estadoDados.usuarios, [newUser]), false, pedidosHotel, pedidosCompanhia)) return;
            formRegister.reset();
            atualizarTipoCadastro();
            if (!loginUser(newUser)) {
                alert('A conta foi criada. Use as credenciais do cadastro para entrar.');
                openAuthModal('login');
                return;
            }
            closeAuthModal();
            if (tipo !== 'CLIENTE') window.location.href = 'solicitacao.html';
            else if (document.body.id === 'checkout-page') window.location.reload();
            else alert('Conta de cliente criada com sucesso!');
        });
    }

    function handlePasswordReset(ident, s1, s2, onSuccessCallback) {
        if (!ident || !s1 || !s2) {
            alert('⚠️ Preencha todos os campos obrigatórios.');
            return false;
        }

        if (s1 !== s2) {
            alert('❌ As senhas não coincidem! Digite a mesma senha em ambos os campos.');
            return false;
        }

        if (s1.length < 4) {
            alert('⚠️ A nova senha deve conter pelo menos 4 caracteres.');
            return false;
        }

        atualizarDadosDeConta();
        const user = buscarUsuario(dbData.usuarios, ident);

        if (!user) {
            alert('❌ Usuário não encontrado com este CPF ou E-mail!\n\nVerifique os dados digitados.');
            return false;
        }

        if (user.tipo !== 'CLIENTE' && usuarioAtual()?.email !== user.email) {
            alert('Entre na própria conta administrativa para alterar sua senha.');
            return false;
        }
        const atualizado = { ...user, senha: s1 };
        if (!salvarEstado({}, combinarUsuarios(estadoDados.usuarios, [atualizado]))) return false;

        alert(`✅ Senha alterada com sucesso para ${user.nome.split(' ')[0]}!\n\nVocê já pode fazer login com a sua nova senha.`);
        if (onSuccessCallback) onSuccessCallback();
        return true;
    }

    if (formForgot) {
        formForgot.addEventListener('submit', (e) => {
            e.preventDefault();
            const ident = document.getElementById('forgot-ident').value.trim();
            const s1 = document.getElementById('forgot-senha').value.trim();
            const s2 = document.getElementById('forgot-senha-confirm').value.trim();

            handlePasswordReset(ident, s1, s2, () => {
                formForgot.reset();
                openAuthModal('login');
            });
        });
    }

    const formPageForgot = document.getElementById('form-page-forgot');
    if (formPageForgot) {
        formPageForgot.addEventListener('submit', (e) => {
            e.preventDefault();
            const ident = document.getElementById('page-forgot-ident').value.trim();
            const s1 = document.getElementById('page-forgot-senha').value.trim();
            const s2 = document.getElementById('page-forgot-senha-confirm').value.trim();

            handlePasswordReset(ident, s1, s2, () => {
                formPageForgot.reset();
                openAuthModal('login');
            });
        });
    }

    function loginUser(user, persistir = true) {
        const sessao = { id: user.id, nome: user.nome, email: user.email, cpf: user.cpf, tipo: user.tipo };
        if (persistir && !gravarLocal(CHAVE_SESSAO, sessao)) return false;
        currentUser = user;
        atualizarAtalhoAdmin();
        const firstName = user.nome.split(' ')[0];
        
        
        if (loginLabel) loginLabel.textContent = `Olá, ${firstName}`;

        if (userFullName) userFullName.textContent = user.nome;
        if (userEmailDisp) userEmailDisp.textContent = user.email;

        
        if (userIconLogged) {
            userIconLogged.className = 'fa-solid fa-dove user-avatar-icon';
            userIconLogged.style.color = '';
        }

        return true;
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (!gravarLocal(CHAVE_SESSAO, null)) return;
            currentUser = null;
            atualizarAtalhoAdmin();
            if (loginLabel) loginLabel.textContent = 'Fazer Login';
            if (userIconLogged) {
                userIconLogged.className = 'fa-regular fa-user-circle';
                userIconLogged.style.color = '';
            }
            userDropdownMenu?.classList.remove('active');
            if (document.body.id === 'checkout-page') window.location.reload();
            else if (PERFIS_POR_PAINEL[document.body.id]) window.location.href = 'index.html';
        });
    }

    const sessaoSalva = lerLocal(CHAVE_SESSAO, valor => listaUsuarios([valor]));
    if (sessaoSalva.estado === 'valido') {
        const conta = dbData.usuarios.find(u => u.email.toLowerCase() === sessaoSalva.valor.email.toLowerCase());
        if (conta && (!sessaoSalva.valor.id || mesmoId(conta.id, sessaoSalva.valor.id))) loginUser(conta, false);
    }

    function usuarioAtual() {
        const sessao = lerLocal(CHAVE_SESSAO, valor => listaUsuarios([valor])).valor;
        if (!currentUser || sessao?.email !== currentUser.email) return null;
        return dbData.usuarios.find(u => u.email === currentUser.email &&
            (!sessao.id || mesmoId(u.id, sessao.id))) || null;
    }

    document.addEventListener('click', () => {
        if (userDropdownMenu) userDropdownMenu.classList.remove('active');
    });

    
    const inputOrigem = document.getElementById('input-origem');
    const inputDestino = document.getElementById('input-destino');
    const suggestOrigem = document.getElementById('suggest-origem');
    const suggestDestino = document.getElementById('suggest-destino');
    const btnSwap = document.getElementById('btn-swap');

    const buscaLocalidades = inputOrigem ? criarBuscaLocalidades(dbData, voosPublicos, hoteisPublicos) : null;
    const sugestoesPorCampo = new WeakMap();
    function setupAutocomplete(input, lista, tipo, aoAlterar) {
        const controle = configurarAutocompleteLocalidade(input, lista, buscaLocalidades, tipo, aoAlterar);
        sugestoesPorCampo.set(input, controle);
        return controle;
    }

    function fecharSugestoes() {
        document.querySelectorAll('.autocomplete-wrapper input').forEach(input => sugestoesPorCampo.get(input)?.fechar());
    }

    const controleOrigem = inputOrigem && setupAutocomplete(inputOrigem, suggestOrigem, 'origem');
    const controleDestino = inputDestino && setupAutocomplete(inputDestino, suggestDestino, 'destino');
    btnSwap?.addEventListener('click', () => {
        const origem = controleOrigem.ler();
        const destino = controleDestino.ler();
        controleOrigem.selecionar(destino);
        controleDestino.selecionar(origem);
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const formRowMain = document.getElementById('form-row-main');
    const formRowMulti = document.getElementById('form-row-multi');
    const voltaBox = document.getElementById('volta-box');
    const datesFieldDivider = document.getElementById('dates-field-divider');
    const labelTravelersTitle = document.getElementById('label-travelers-title');
    const multiLegList = document.getElementById('multi-leg-list');
    const btnAddLeg = document.getElementById('btn-add-leg');

    let multiLegsData = [
        { origem: null, destino: null, date: null },
        { origem: null, destino: null, date: null }
    ];
    let activeMultiLegIndex = null;

    function renderMultiLegs() {
        if (!multiLegList) return;
        multiLegList.innerHTML = '';
        multiLegsData.forEach((leg, index) => {
            const row = document.createElement('div');
            row.className = 'multi-leg-row';
            row.dataset.index = index;
            row.innerHTML = `
                <div class="form-group field-location multi-location-group">
                    <span class="leg-number-badge">${index + 1}º Trecho</span>
                    <div class="input-subgroup autocomplete-wrapper">
                        <input type="text" placeholder="Origem" class="input-multi-origem" aria-label="Origem do trecho ${index + 1}" autocomplete="off">
                        <div class="autocomplete-dropdown suggest-multi-origem"></div>
                    </div>
                    <div class="input-subgroup autocomplete-wrapper">
                        <input type="text" placeholder="Destino" class="input-multi-destino" aria-label="Destino do trecho ${index + 1}" autocomplete="off">
                        <div class="autocomplete-dropdown suggest-multi-destino"></div>
                    </div>
                </div>
                <div class="form-group field-dates date-trigger-multi" data-index="${index}">
                    <div class="date-box">
                        <span class="date-label-sub">Data do Voo</span>
                        <span class="date-value">${leg.date ? formatDate(leg.date) : 'Selecione'}</span>
                    </div>
                    <i class="fa-regular fa-calendar"></i>
                </div>
                ${multiLegsData.length > 2 ? `
                    <button type="button" class="btn-remove-leg" data-index="${index}" title="Remover Trecho">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                ` : '<div class="remove-placeholder"></div>'}
            `;
            multiLegList.appendChild(row);
        });

        const rows = multiLegList.querySelectorAll('.multi-leg-row');
        rows.forEach((row, idx) => {
            const inputOrig = row.querySelector('.input-multi-origem');
            const suggestOrig = row.querySelector('.suggest-multi-origem');
            const inputDest = row.querySelector('.input-multi-destino');
            const suggestDest = row.querySelector('.suggest-multi-destino');

            const leg = multiLegsData[idx];
            setupAutocomplete(inputOrig, suggestOrig, 'origem', local => { leg.origem = local; })
                .selecionar(leg.origem, false);
            setupAutocomplete(inputDest, suggestDest, 'destino', local => {
                leg.destino = local;
                const proximo = multiLegsData[idx + 1];
                if (local && proximo && !proximo.origem) {
                    const proximaOrigem = rows[idx + 1].querySelector('.input-multi-origem');
                    if (!proximaOrigem.value) sugestoesPorCampo.get(proximaOrigem).selecionar(local);
                }
            }).selecionar(leg.destino, false);

            const dateTrigger = row.querySelector('.date-trigger-multi');
            if (dateTrigger) {
                dateTrigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    activeMultiLegIndex = idx;
                    if (travelersModal) travelersModal.classList.remove('active');
                    fecharSugestoes();
                    if (calendarModal) calendarModal.classList.add('active');
                });
            }
        });

        multiLegList.querySelectorAll('.btn-remove-leg').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const removeIdx = parseInt(btn.dataset.index, 10);
                if (multiLegsData.length > 2) {
                    multiLegsData.splice(removeIdx, 1);
                    renderMultiLegs();
                }
            });
        });
    }

    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('filled');
                });
                btn.classList.remove('filled');
                btn.classList.add('active');

                const tab = btn.dataset.tab;

                if (tab === 'ida-volta') {
                    if (formRowMain) formRowMain.style.display = 'grid';
                    if (formRowMulti) formRowMulti.style.display = 'none';
                    if (voltaBox) voltaBox.style.display = 'flex';
                    if (datesFieldDivider) datesFieldDivider.style.display = 'block';
                    if (labelTravelersTitle) labelTravelersTitle.textContent = 'Viajantes';
                } else if (tab === 'so-ida') {
                    if (formRowMain) formRowMain.style.display = 'grid';
                    if (formRowMulti) formRowMulti.style.display = 'none';
                    if (voltaBox) voltaBox.style.display = 'none';
                    if (datesFieldDivider) datesFieldDivider.style.display = 'none';
                    if (labelTravelersTitle) labelTravelersTitle.textContent = 'Viajantes';
                } else if (tab === 'varios-destinos') {
                    if (window.location.hash === '#hospedagem') window.location.hash = 'passagens';
                    if (formRowMain) formRowMain.style.display = 'none';
                    if (formRowMulti) formRowMulti.style.display = 'flex';
                    renderMultiLegs();
                } else if (tab === 'voo-hotel') {
                    if (formRowMain) formRowMain.style.display = 'grid';
                    if (formRowMulti) formRowMulti.style.display = 'none';
                    if (voltaBox) voltaBox.style.display = 'flex';
                    if (datesFieldDivider) datesFieldDivider.style.display = 'block';
                    if (labelTravelersTitle) labelTravelersTitle.textContent = 'Viajantes / Quartos';
                }
            });
        });
    }

    if (btnAddLeg) {
        btnAddLeg.addEventListener('click', () => {
            if (multiLegsData.length < 5) {
                const lastLeg = multiLegsData[multiLegsData.length - 1];
                multiLegsData.push({
                    origem: lastLeg ? lastLeg.destino : '',
                    destino: '',
                    date: null
                });
                renderMultiLegs();
            } else {
                alert('Você pode adicionar no máximo 5 trechos.');
            }
        });
    }

    
    const datesTrigger = document.getElementById('dates-trigger');
    const travelersTrigger = document.getElementById('travelers-trigger');
    const calendarModal = document.getElementById('calendar-modal');
    const travelersModal = document.getElementById('travelers-modal');

    if (datesTrigger) {
        datesTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (travelersModal) travelersModal.classList.remove('active');
            if (calendarModal) calendarModal.classList.toggle('active');
            fecharSugestoes();
        });
    }

    if (travelersTrigger) {
        travelersTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (calendarModal) calendarModal.classList.remove('active');
            if (travelersModal) travelersModal.classList.toggle('active');
            fecharSugestoes();
        });
    }

    if (calendarModal) calendarModal.addEventListener('click', (e) => e.stopPropagation());
    if (travelersModal) travelersModal.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', evento => {
        if (calendarModal) calendarModal.classList.remove('active');
        if (travelersModal) travelersModal.classList.remove('active');
        if (!evento.target.closest('.autocomplete-wrapper')) fecharSugestoes();
    });

    
    let currentYear = 2026;
    let currentMonth = 6;
    let startDate = null;
    let endDate = null;

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const monthTitle1 = document.getElementById('month-title-1');
    const monthTitle2 = document.getElementById('month-title-2');
    const daysContainer1 = document.getElementById('days-month-1');
    const daysContainer2 = document.getElementById('days-month-2');
    const calPrev = document.getElementById('cal-prev');
    const calNext = document.getElementById('cal-next');
    const btnConfirmCal = document.getElementById('btn-confirm-cal');
    const dispIda = document.getElementById('disp-ida');
    const dispVolta = document.getElementById('disp-volta');

    function renderCalendar() {
        if (!daysContainer1 || !daysContainer2) return;
        const m1 = currentMonth;
        const y1 = currentYear;
        let m2 = currentMonth + 1;
        let y2 = currentYear;
        if (m2 > 11) { m2 = 0; y2++; }

        if (monthTitle1) monthTitle1.textContent = `${monthNames[m1]} de ${y1}`;
        if (monthTitle2) monthTitle2.textContent = `${monthNames[m2]} de ${y2}`;

        renderDays(daysContainer1, y1, m1);
        renderDays(daysContainer2, y2, m2);
    }

    function renderDays(container, year, month) {
        if (!container) return;
        container.innerHTML = '';
        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell empty';
            container.appendChild(emptyCell);
        }

        for (let day = 1; day <= totalDays; day++) {
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            cell.textContent = day;
            const thisDate = new Date(year, month, day);

            if (startDate && isSameDate(thisDate, startDate)) {
                cell.classList.add('start-date');
            } else if (endDate && isSameDate(thisDate, endDate)) {
                cell.classList.add('end-date');
            } else if (startDate && endDate && thisDate > startDate && thisDate < endDate) {
                cell.classList.add('in-range');
            }

            cell.addEventListener('click', () => {
                if (activeMultiLegIndex !== null) {
                    multiLegsData[activeMultiLegIndex].date = thisDate;
                    activeMultiLegIndex = null;
                    renderCalendar();
                    if (calendarModal) calendarModal.classList.remove('active');
                    renderMultiLegs();
                    return;
                }

                if (!startDate || (startDate && endDate)) {
                    startDate = thisDate;
                    endDate = null;
                } else if (startDate && !endDate) {
                    if (thisDate >= startDate) endDate = thisDate;
                    else startDate = thisDate;
                }
                renderCalendar();
            });
            container.appendChild(cell);
        }
    }

    function isSameDate(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    function formatDate(date) {
        if (!date) return "Selecione";
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        return `${d}/${m}/${date.getFullYear()}`;
    }

    if (calPrev) {
        calPrev.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderCalendar();
        });
    }

    if (calNext) {
        calNext.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            renderCalendar();
        });
    }

    if (btnConfirmCal) {
        btnConfirmCal.addEventListener('click', () => {
            if (activeMultiLegIndex !== null) {
                if (startDate) {
                    multiLegsData[activeMultiLegIndex].date = startDate;
                }
                activeMultiLegIndex = null;
                renderMultiLegs();
                if (calendarModal) calendarModal.classList.remove('active');
                return;
            }
            if (startDate && dispIda) dispIda.textContent = formatDate(startDate);
            if (endDate && dispVolta) dispVolta.textContent = formatDate(endDate);
            if (calendarModal) calendarModal.classList.remove('active');
        });
    }

    if (daysContainer1) renderCalendar();

    
    let counts = { adults: 1, children: 0, infants: 0 };
    const cntAdults = document.getElementById('cnt-adults');
    const cntChildren = document.getElementById('cnt-children');
    const cntInfants = document.getElementById('cnt-infants');
    const selectClass = document.getElementById('select-class');
    const btnLimpar = document.getElementById('btn-limpar-travelers');
    const btnAplicar = document.getElementById('btn-aplicar-travelers');
    const dispTravelers = document.getElementById('disp-travelers');

    document.querySelectorAll('.btn-cnt').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const isPlus = btn.classList.contains('plus');
            if (isPlus) counts[type]++;
            else {
                if (type === 'adults' && counts.adults > 1) counts.adults--;
                else if (type !== 'adults' && counts[type] > 0) counts[type]--;
            }
            if (cntAdults) cntAdults.textContent = counts.adults;
            if (cntChildren) cntChildren.textContent = counts.children;
            if (cntInfants) cntInfants.textContent = counts.infants;
        });
    });

    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            counts = { adults: 1, children: 0, infants: 0 };
            if (selectClass) selectClass.value = "Todas as classes";
            if (cntAdults) cntAdults.textContent = 1;
            if (cntChildren) cntChildren.textContent = 0;
            if (cntInfants) cntInfants.textContent = 0;
        });
    }

    if (btnAplicar) {
        btnAplicar.addEventListener('click', () => {
            const total = counts.adults + counts.children + counts.infants;
            if (dispTravelers) dispTravelers.textContent = `${total} ${total === 1 ? 'Viajante' : 'Viajantes'}`;
            if (travelersModal) travelersModal.classList.remove('active');
        });
    }

    
    let currentDealIndex = 0;
    const cardImg = document.getElementById('card-img');
    const cardTitle = document.getElementById('card-title');
    const cardSub = document.getElementById('card-sub');
    const cardType = document.getElementById('card-type');
    const cardPrice = document.getElementById('card-price');
    const cardInstallments = document.getElementById('card-installments');
    const cardTotal = document.getElementById('card-total');
    const cardPix = document.getElementById('card-pix');
    const cardCouponVal = document.getElementById('card-coupon-val');
    const cardCoupon = document.getElementById('card-coupon');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');

    function updateCarousel(index) {
        if (!cardImg || !dbData.promocoes || dbData.promocoes.length === 0) return;
        const deal = dbData.promocoes[index];
        if (cardImg) cardImg.src = deal.imagem;
        if (cardType) cardType.textContent = deal.tipo;
        if (cardTitle) cardTitle.textContent = deal.titulo;
        if (cardSub) cardSub.textContent = deal.subtitulo;
        if (cardInstallments) cardInstallments.textContent = `${deal.parcelas}X R$`;
        if (cardPrice) cardPrice.textContent = deal.valorParcela;
        if (cardTotal) cardTotal.textContent = `Total: R$ ${deal.valorTotal.toLocaleString('pt-BR')}`;
        if (cardPix) cardPix.textContent = deal.descontoPix;
        if (cardCouponVal) cardCouponVal.textContent = `R$ ${deal.descontoCupom}`;
        if (cardCoupon) cardCoupon.textContent = deal.cupom;

        const amenitiesContainer = document.querySelector('.amenities-list');
        if (amenitiesContainer && deal.amenities) {
            const icons = ['fa-utensils', 'fa-wifi', 'fa-water-ladder'];
            amenitiesContainer.innerHTML = deal.amenities.map((item, idx) => `
                <span><i class="fa-solid ${icons[idx] || 'fa-check'}"></i> ${item}</span>
            `).join('');
        }
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            currentDealIndex = (currentDealIndex - 1 + dbData.promocoes.length) % dbData.promocoes.length;
            updateCarousel(currentDealIndex);
        });
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            currentDealIndex = (currentDealIndex + 1) % dbData.promocoes.length;
            updateCarousel(currentDealIndex);
        });
    }

    if (cardImg) updateCarousel(0);

    // Detalhes da viagem e das promoções
    const tripModalOverlay = document.getElementById('trip-modal-overlay');
    const btnCloseTripModal = document.getElementById('btn-close-trip-modal');
    const btnCancelTripModal = document.getElementById('btn-cancel-trip-modal');
    const btnAddTripToCart = document.getElementById('btn-add-trip-to-cart');

    let currentTripModalItem = null;

    function openTripDetailsModal(item) {
        if (!tripModalOverlay || !item) return;

        currentTripModalItem = item;

        const imgEl = document.getElementById('trip-modal-img');
        const airlineEl = document.getElementById('trip-modal-airline');
        const tagEl = document.getElementById('trip-modal-tag');
        const typeEl = document.getElementById('trip-modal-type');
        const titleEl = document.getElementById('trip-modal-title');
        const subEl = document.getElementById('trip-modal-sub');
        const starsIconsEl = document.getElementById('trip-modal-stars-icons');
        const scoreEl = document.getElementById('trip-modal-score');
        const originEl = document.getElementById('trip-modal-origin');
        const dateEl = document.getElementById('trip-modal-date');
        const baggageEl = document.getElementById('trip-modal-baggage');
        const amenitiesEl = document.getElementById('trip-modal-amenities');
        const priceEl = document.getElementById('trip-modal-price');
        const installmentsEl = document.getElementById('trip-modal-installments');
        const pixEl = document.getElementById('trip-modal-pix');
        const couponSection = document.getElementById('trip-modal-coupon-section');
        const couponCodeEl = document.getElementById('trip-modal-coupon-code');
        const couponDescEl = document.getElementById('trip-modal-coupon-desc');

        if (imgEl) imgEl.src = item.imagem || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';
        if (airlineEl) airlineEl.textContent = item.companhia || 'Voando Parceiras';
        if (tagEl) tagEl.innerHTML = `<i class="fa-solid fa-plane"></i> ${item.tipo || 'Voo Direto'}`;

        if (typeEl) typeEl.textContent = item.tipo || 'Pacote Promocional';
        if (titleEl) titleEl.textContent = item.titulo || item.title || item.nome || 'Destino Incrível';
        if (subEl) subEl.textContent = item.subtitulo || item.sub || 'Aéreo ida e volta com hospedagem e taxas inclusas';

        const starsCount = item.estrelas || 5;
        if (starsIconsEl) {
            starsIconsEl.innerHTML = Array(starsCount).fill('<i class="fa-solid fa-star"></i>').join('');
        }
        if (scoreEl) {
            scoreEl.innerHTML = `<strong>${item.estrelas ? item.estrelas + '.9' : '4.9'}</strong> / 5.0 • Excelente (140+ avaliações de viajantes)`;
        }

        if (originEl) originEl.textContent = item.origem || 'São Paulo (SAO)';
        if (dateEl) dateEl.textContent = item.dataSaida || 'Saída confirmada 2026';
        if (baggageEl) baggageEl.textContent = item.bagagem || 'Mão + Despachada inclusa';

        if (amenitiesEl) {
            const amenitiesList = item.amenities && item.amenities.length > 0 
                ? item.amenities 
                : ['Aéreo ida e volta com taxas inclusas', 'Bagagem despachada até 23kg', 'Traslado aeroporto-hotel', 'Suporte e cancelamento grátis até 24h'];
            amenitiesEl.innerHTML = amenitiesList.map(a => `<li><i class="fa-solid fa-circle-check"></i> ${a}</li>`).join('');
        }

        const totalVal = Number(item.valorTotal || item.price || item.diaria || 790);
        const parcels = item.parcelas || 10;
        const parcelVal = Math.round(totalVal / parcels);
        const pixVal = Math.round(totalVal * 0.95);

        if (priceEl) priceEl.textContent = `R$ ${totalVal.toLocaleString('pt-BR')},00`;
        if (installmentsEl) installmentsEl.textContent = `em até ${parcels}x de R$ ${parcelVal.toLocaleString('pt-BR')},00 sem juros`;
        if (pixEl) pixEl.innerHTML = `<i class="fa-solid fa-bolt"></i> <strong>R$ ${pixVal.toLocaleString('pt-BR')},00</strong> à vista no PIX (5% OFF)`;

        if (couponSection) {
            if (item.cupom) {
                couponSection.style.display = 'flex';
                if (couponCodeEl) couponCodeEl.textContent = item.cupom;
                if (couponDescEl) couponDescEl.textContent = item.descontoCupom ? `Economize R$ ${item.descontoCupom} no checkout` : 'Desconto extra no checkout!';
            } else {
                couponSection.style.display = 'none';
            }
        }

        tripModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeTripModal() {
        if (!tripModalOverlay) return;
        tripModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (btnCloseTripModal) btnCloseTripModal.addEventListener('click', closeTripModal);
    if (btnCancelTripModal) btnCancelTripModal.addEventListener('click', closeTripModal);
    if (tripModalOverlay) {
        tripModalOverlay.addEventListener('click', (e) => {
            if (e.target === tripModalOverlay) closeTripModal();
        });
    }

    if (btnAddTripToCart) {
        btnAddTripToCart.addEventListener('click', () => {
            if (!currentTripModalItem) return;
            const item = currentTripModalItem;
            const totalVal = Number(item.valorTotal || item.price || item.diaria || 790);

            addItemToCart({
                id: item.id ? (String(item.id).startsWith('PROMO-') ? item.id : `PROMO-${item.id}`) : `TRIP-${Date.now()}`,
                type: item.tipo || 'Pacote Promocional',
                title: item.titulo || item.title || item.nome || 'Pacote de Viagem',
                sub: item.subtitulo || item.sub || 'Aéreo ida e volta com bagagem inclusa',
                meta: `Saída confirmada 2026 • ${item.companhia || 'Voando Parceiras'}`,
                price: totalVal
            });

            closeTripModal();
        });
    }

    const btnComprarPromo = document.querySelector('.btn-comprar-promo');
    if (btnComprarPromo) {
        btnComprarPromo.addEventListener('click', () => {
            if (!dbData.promocoes || dbData.promocoes.length === 0) return;
            const deal = dbData.promocoes[currentDealIndex] || dbData.promocoes[0];
            openTripDetailsModal(deal);
        });
    }

    const highlightsGrid = document.getElementById('highlights-grid');
    function renderHighlights() {
        if (!highlightsGrid || !dbData.destaques) return;
        highlightsGrid.innerHTML = '';
        dbData.destaques.forEach(item => {
            const card = document.createElement('div');
            card.className = 'highlight-card';
            card.innerHTML = `
                <div class="highlight-img-box">
                    <img src="${item.imagem}" alt="${item.titulo}">
                    <span class="highlight-tag">${item.tag}</span>
                </div>
                <div class="highlight-body">
                    <h4 class="highlight-title">${item.titulo}</h4>
                    <span class="highlight-rating"><i class="fa-solid fa-star"></i> ${item.avaliacao}</span>
                    <div class="highlight-price-box">
                        <div>
                            <div class="highlight-price">${item.preco}</div>
                            <div class="highlight-installments">${item.parcelas}</div>
                        </div>
                        <button class="btn-ver-destaque">Ver Detalhes</button>
                    </div>
                </div>
            `;
            const btnVer = card.querySelector('.btn-ver-destaque');
            if (btnVer) {
                btnVer.addEventListener('click', () => {
                    const numPrice = parseInt(String(item.preco).replace(/\D/g, ''), 10) || 2040;
                    openTripDetailsModal({
                        id: item.id,
                        tipo: 'Pacote de Viagem',
                        titulo: item.titulo,
                        subtitulo: `${item.tag} • Avaliação: ${item.avaliacao || '4.9 (100)'}`,
                        companhia: 'Sabiá Parceiras',
                        estrelas: 5,
                        parcelas: 10,
                        valorTotal: numPrice,
                        imagem: item.imagem,
                        amenities: ['Hospedagem inclusa', 'Aéreo ida e volta', 'Café da manhã incluso', 'Passeios turísticos e suporte 24h']
                    });
                });
            }
            highlightsGrid.appendChild(card);
        });
    }

    if (highlightsGrid) renderHighlights();


    
    const btnBuscar = document.getElementById('btn-buscar');
    const btnBuscarMulti = document.getElementById('btn-buscar-multi');
    const resultsOverlay = document.getElementById('results-overlay');
    const btnCloseResults = document.getElementById('btn-close-results');
    const resultsList = document.getElementById('results-list');
    const resultsSummaryBar = document.getElementById('results-summary-bar');

    function executeSearch(origemVal, destinoVal) {
        const dataIda = dispIda ? dispIda.textContent : 'Selecione';
        const dataVolta = dispVolta ? dispVolta.textContent : 'Selecione';
        const numViajantes = dispTravelers ? dispTravelers.textContent : '1 Viajante';
        const classe = selectClass ? selectClass.value : 'Todas as classes';

        if (resultsSummaryBar) {
            resultsSummaryBar.textContent = `${origemVal.rotulo} ➔ ${destinoVal.rotulo} | ${dataIda} a ${dataVolta} | ${numViajantes} | ${classe}`;
        }

        renderResults(buscarVoos(origemVal, destinoVal));
        if (resultsOverlay) resultsOverlay.classList.add('active');
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            const currentHash = window.location.hash.replace('#', '').toLowerCase();
            if (currentHash === 'hospedagem') {
                if (inputHospDest.value.trim() && !controleHospedagem.exigir()) return;
                renderHospedagemHotels();
                const listEl = document.getElementById('hospedagem-hotel-list');
                if (listEl) listEl.scrollIntoView({ behavior: 'smooth' });
            } else {
                const orig = controleOrigem.exigir();
                if (!orig) return;
                const dest = controleDestino.exigir();
                if (!dest) return;
                executeSearch(orig, dest);
                if (typeof renderInlineFlightResults === 'function') renderInlineFlightResults(orig, dest);
            }
        });
    }

    if (btnBuscarMulti) {
        btnBuscarMulti.addEventListener('click', () => {
            executeMultiSearch();
        });
    }

    function executeMultiSearch() {
        for (const campo of multiLegList.querySelectorAll('input[type="text"]')) {
            if (!sugestoesPorCampo.get(campo).exigir()) return;
        }
        const validLegs = multiLegsData;

        const numViajantes = dispTravelers ? dispTravelers.textContent : '1 Viajante';
        const classe = selectClass ? selectClass.value : 'Todas as classes';

        if (resultsSummaryBar) {
            resultsSummaryBar.innerHTML = `<strong>Vários Destinos (${validLegs.length} Trechos)</strong> | ${numViajantes} | ${classe}`;
        }

        const voos = validLegs.map(leg => buscarVoos(leg.origem, leg.destino)
            .find(voo => !leg.date || (voo.partida && voo.partida.slice(0, 10) === dataLocal(leg.date))));
        if (voos.some(voo => !voo)) {
            renderResults([]);
        } else {
            renderMultiResults([{
                id: 'MULTI-' + JSON.stringify(voos.map(voo => voo.id)),
                title: `Itinerário (${voos.length} trechos)`,
                summaryHtml: voos.map(voo => `<p>${escaparHtml(voo.origem)} → ${escaparHtml(voo.destino)} · ${escaparHtml(voo.companhia)}</p>`).join(''),
                totalPrice: voos.reduce((total, voo) => total + voo.preco, 0),
                voos: voos.map((voo, i) => dadosDoVoo(voo, validLegs[i].date)),
                validLegsCount: voos.length
            }]);
        }
        if (resultsOverlay) resultsOverlay.classList.add('active');
    }

    function dataLocal(data) {
        return [data.getFullYear(), data.getMonth() + 1, data.getDate()]
            .map(numero => String(numero).padStart(2, '0')).join('-');
    }

    function dadosDoVoo(voo, selecionada) {
        return { id: voo.id, origem: voo.origem, destino: voo.destino,
            partida: voo.horarioPartida || '', chegada: voo.horarioChegada || '',
            data: voo.partida?.slice(0, 10) || (selecionada ? dataLocal(selecionada) : '') };
    }

    function voosPublicos() {
        return dbData.voos.filter(voo => voo.ativo !== false &&
            dbData.companhias.some(cia => mesmoId(cia.id, voo.companhiaId) &&
                cia.ativo !== false && cia.statusAprovacao === 'aprovado') &&
            Number.isFinite(voo.preco) && voo.preco >= 0);
    }

    function buscarVoos(origem, destino) {
        // Os botões de promoções ainda usam os textos fixos de suas rotas no catálogo.
        const temTrecho = (local, campo, voo) => typeof local === 'string'
            ? normalizarBusca(voo[campo]).includes(normalizarBusca(local))
            : local[campo].has(voo[campo]);
        return voosPublicos().filter(voo => temTrecho(origem, 'origem', voo) && temTrecho(destino, 'destino', voo));
    }

    function hoteisPublicos() {
        return dbData.hoteis.filter(hotelPublicado);
    }

    function renderMultiResults(packages) {
        if (!resultsList) return;
        resultsList.innerHTML = '';
        packages.forEach(pkg => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'stretch';
            div.style.gap = '14px';

            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                    <div>
                        <span style="font-size: 17px; font-weight: 800; color: #1e293b;"><i class="fa-solid fa-route" style="color: #2563eb; margin-right: 6px;"></i> ${pkg.title}</span>
                        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Todos os trechos inclusos no mesmo bilhete</div>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 11px; color: #64748b; display: block;">Valor Total</span>
                        <span class="result-price" style="font-size: 24px;">R$ ${pkg.totalPrice.toLocaleString('pt-BR')}</span>
                    </div>
                </div>
                <div class="multi-package-legs">
                    ${pkg.summaryHtml}
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                    <button class="btn-select-flight" style="padding: 10px 24px; font-size: 14px; font-weight: 800; background-color: #ea580c; color: white;">Selecionar Itinerário Completo</button>
                </div>
            `;

            div.querySelector('.btn-select-flight').addEventListener('click', () => {
                addItemToCart({
                    id: pkg.id,
                    type: 'Vários Destinos',
                    title: pkg.title,
                    sub: `${pkg.validLegsCount} Trechos inclusos`,
                    meta: 'Viagem Multi-Destinos',
                    price: pkg.totalPrice, voos: pkg.voos,
                    qty: counts.adults + counts.children + counts.infants
                });
                if (resultsOverlay) resultsOverlay.classList.remove('active');
            });

            resultsList.appendChild(div);
        });
    }

    function escaparHtml(texto) {
        return String(texto).replace(/[&<>"']/g, caractere =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[caractere]);
    }

    function tipoDeTrecho(voo) {
        if (voo.direto === true) return 'Voo direto';
        if (voo.direto === false) return 'Com conexão';
        return 'Conexão não informada';
    }

    function renderResults(voos) {
        if (!resultsList) return;
        resultsList.innerHTML = '';
        if (!voos.length) resultsList.textContent = 'Nenhum voo encontrado para esta busca.';
        voos.forEach(voo => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <div class="result-flight-info">
                    <span class="airline-name"><i class="fa-solid fa-plane"></i> ${escaparHtml(voo.companhia)}</span>
                    <span class="flight-times">${escaparHtml(voo.horarioPartida)} ➔ ${escaparHtml(voo.horarioChegada)}</span>
                    <span class="flight-meta">${voo.duracao || 'Duração não informada'} • ${tipoDeTrecho(voo)}</span>
                </div>
                <div class="result-price-box">
                    <span class="result-price">R$ ${voo.preco.toLocaleString('pt-BR')}</span>
                    <button class="btn-select-flight" data-id="${escaparHtml(voo.id)}">Selecionar</button>
                </div>
            `;
            
            div.querySelector('.btn-select-flight').addEventListener('click', () => {
                const trecho = dadosDoVoo(voo, startDate);
                addItemToCart({
                    id: voo.id,
                    type: 'Passagem Aérea',
                    title: `${voo.origem} ➔ ${voo.destino}`,
                    sub: `${voo.companhia} • ${voo.duracao}`,
                    meta: `${voo.horarioPartida} - ${voo.horarioChegada} • ${tipoDeTrecho(voo)}`,
                    price: voo.preco, voos: [trecho],
                    ida: trecho.data, qty: counts.adults + counts.children + counts.infants
                });
                if (resultsOverlay) resultsOverlay.classList.remove('active');
            });

            resultsList.appendChild(div);
        });
    }

    if (btnCloseResults) btnCloseResults.addEventListener('click', () => resultsOverlay.classList.remove('active'));
    if (resultsOverlay) {
        resultsOverlay.addEventListener('click', (e) => {
            if (e.target === resultsOverlay) resultsOverlay.classList.remove('active');
        });
    }


    
    function getStoredCart() {
        return lerCarrinho().valor || [];
    }

    function saveStoredCart(cart, cupom) {
        const atual = lerCarrinho();
        if (atual.estado === 'invalido') {
            alert('O carrinho armazenado está inválido. Os dados foram preservados.');
            return false;
        }
        const itens = cart.map((item, index) => {
            const { lote, cupom: cupomAnterior, ...dados } = item;
            return index === 0 ? { ...dados, lote: gerarId(), cupom: cupom ?? atual.valor?.[0]?.cupom ?? '' } : dados;
        });
        if (!gravarLocal(CHAVE_CARRINHO, itens)) return false;
        updateCartBadges();
        return true;
    }

    function addItemToCart(item) {
        const cart = getStoredCart();
        const existing = cart.find(i => mesmoId(i.id, item.id) && i.ida === item.ida && i.checkin === item.checkin);
        if (existing) {
            existing.qty = quantidadeItem(existing) + quantidadeItem(item);
        } else {
            cart.push({
                ...item,
                id: item.id || gerarId(),
                type: item.type || 'Passagem Aérea',
                title: item.title,
                sub: item.sub || '',
                meta: item.meta || '',
                price: item.price,
                qty: quantidadeItem(item)
            });
        }
        if (!saveStoredCart(cart)) return false;

        if (!currentUser) {
            alert(`✅ ${item.title} foi adicionado ao seu carrinho!\n\n💡 Dica: Para finalizar a compra das passagens, faça Login ou Cadastre-se.`);
        } else {
            alert(`✅ ${item.title} foi adicionado com sucesso ao carrinho!`);
        }
        
        renderCartPage();
        return true;
    }

    function updateCartBadges() {
        const cart = getStoredCart();
        const count = cart.reduce((sum, item) => sum + quantidadeItem(item), 0);
        document.querySelectorAll('.cart-badge').forEach(b => b.textContent = count);
        const pageCountEl = document.getElementById('page-cart-count');
        if (pageCountEl) pageCountEl.textContent = `${count} ${count === 1 ? 'item' : 'itens'}`;
    }

    updateCartBadges();

    const cartItemsColumn = document.getElementById('cart-items-column');

    function renderCartPage() {
        const cartItemsCol = document.getElementById('cart-items-column');
        if (!cartItemsCol) return;

        const cart = getStoredCart();
        updateCartBadges();

        if (cart.length === 0) {
            cartItemsCol.innerHTML = `
                <div class="cart-empty-card">
                    <i class="fa-solid fa-cart-flatbed cart-empty-icon"></i>
                    <h3>Seu carrinho está vazio</h3>
                    <p>Você ainda não adicionou nenhuma passagem ou pacote de viagem.</p>
                    <div class="cart-empty-actions">
                        <a href="index.html" class="btn-continue-shopping">
                            <i class="fa-solid fa-magnifying-glass"></i> Buscar Passagens e Pacotes
                        </a>
                        <button type="button" class="btn-add-sample" id="btn-add-sample">
                            <i class="fa-solid fa-plus"></i> Adicionar Oferta Exemplo
                        </button>
                    </div>
                </div>
            `;

            const subEl = document.getElementById('cart-subtotal');
            const totEl = document.getElementById('cart-total-price');
            if (subEl) subEl.textContent = 'R$ 0,00';
            if (totEl) totEl.textContent = 'R$ 0,00';
            const discRow = document.getElementById('cart-discount-row');
            if (discRow) discRow.style.display = 'none';

            const btnSample = document.getElementById('btn-add-sample');
            if (btnSample) {
                btnSample.addEventListener('click', () => {
                    addItemToCart({
                        id: 'V-101',
                        type: 'Passagem Aérea',
                        title: 'São Paulo (SAO) ➔ Cancún (CUN)',
                        sub: 'Latam Airlines • Classe Econômica',
                        meta: 'Ida: 15/10/2026 • Volta: 22/10/2026 • 1 Viajante',
                        price: 1234, ida: '2026-10-15'
                    });
                });
            }
            return;
        }

        cartItemsCol.innerHTML = '';
        const valores = cotarCarrinho(cart);

        cart.forEach((item, index) => {
            const itemSubtotal = valores.itens[index];

            const card = document.createElement('div');
            card.className = 'cart-item-card';
            card.innerHTML = `
                <div class="cart-item-icon">
                    <i class="fa-solid ${String(item.type || '').includes('Hotel') ? 'fa-hotel' : item.type.includes('Multi') || item.type.includes('Trecho') ? 'fa-route' : 'fa-plane-departure'}"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-type">${escaparHtml(item.type || 'Serviço')}</div>
                    <h3 class="cart-item-title">${escaparHtml(item.title)}</h3>
                    <div class="cart-item-meta">
                        ${item.sub ? `<span><i class="fa-solid fa-circle-info"></i> ${escaparHtml(item.sub)}</span>` : ''}
                        ${item.meta ? `<span><i class="fa-regular fa-calendar"></i> ${escaparHtml(item.meta)}</span>` : ''}
                    </div>
                </div>
                <div class="cart-item-price-box">
                    <div class="cart-item-price">${moedaSabia(itemSubtotal)}</div>
                    <small>${tipoItem(item) === 'hotel' ? 'Diárias' : 'Viajantes'}</small>
                    <div class="cart-qty-controls">
                        <button type="button" class="btn-qty minus" aria-label="Diminuir quantidade" data-index="${index}"><i class="fa-solid fa-minus"></i></button>
                        <span class="qty-val">${quantidadeItem(item)}</span>
                        <button type="button" class="btn-qty plus" aria-label="Aumentar quantidade" data-index="${index}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <button type="button" class="btn-remove-cart-item" data-index="${index}" title="Remover item">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            cartItemsCol.appendChild(card);
        });

        cartItemsCol.querySelectorAll('.btn-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                const isPlus = btn.classList.contains('plus');
                const cart = getStoredCart();
                if (!cart[idx]) return renderCartPage();
                if (isPlus) {
                    cart[idx].qty = quantidadeItem(cart[idx]) + 1;
                } else {
                    if (quantidadeItem(cart[idx]) > 1) {
                        cart[idx].qty = quantidadeItem(cart[idx]) - 1;
                    } else {
                        cart.splice(idx, 1);
                    }
                }
                if (!saveStoredCart(cart)) return false;
                renderCartPage();
            });
        });

        cartItemsCol.querySelectorAll('.btn-remove-cart-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                const cart = getStoredCart();
                cart.splice(idx, 1);
                if (!saveStoredCart(cart)) return false;
                renderCartPage();
            });
        });

        const subEl = document.getElementById('cart-subtotal');
        const totEl = document.getElementById('cart-total-price');
        const discRow = document.getElementById('cart-discount-row');
        const discValEl = document.getElementById('cart-discount-val');
        if (subEl) subEl.textContent = moedaSabia(valores.subtotal);
        if (totEl) totEl.textContent = moedaSabia(valores.total);
        if (discRow) discRow.style.display = valores.desconto ? 'flex' : 'none';
        if (discValEl) discValEl.textContent = '- ' + moedaSabia(valores.desconto);
    }

    const btnApplyCoupon = document.getElementById('btn-apply-coupon');
    const couponInput = document.getElementById('cart-coupon-input');
    const couponFeedback = document.getElementById('coupon-feedback');
    if (btnApplyCoupon && couponInput) {
        couponInput.value = getStoredCart()[0]?.cupom || '';
        btnApplyCoupon.addEventListener('click', () => {
            const cart = getStoredCart();
            if (!cart.length) return alert('Adicione um serviço antes de aplicar o cupom.');
            const code = couponInput.value.trim().toUpperCase();
            const valido = Object.hasOwn(CUPONS_SABIA, code);
            if (!saveStoredCart(cart, valido ? code : '')) return;
            if (couponFeedback) {
                couponFeedback.style.color = valido ? '#167044' : '#bd2626';
                couponFeedback.textContent = valido ? 'Cupom ' + code + ' aplicado.' : 'Cupom inválido ou expirado.';
            }
            renderCartPage();
        });
    }

    document.getElementById('btn-checkout')?.addEventListener('click', () => {
        if (!getStoredCart().length) return alert('Seu carrinho está vazio.');
        window.location.href = 'checkout.html';
    });

    if (document.body.id === 'checkout-page') {
        iniciarCheckout({ usuarioAtual, dbData, saveStoredCart, escaparHtml, atualizarDadosDeConta, abrirLogin: () => openAuthModal('login') });
    }

    renderCartPage();

    // Busca e navegação entre as telas
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const heroHeaderTitle = document.getElementById('hero-header-title');
    const fieldLocationFlights = document.getElementById('field-location-flights');
    const fieldHospType = document.getElementById('field-hosp-type');
    const fieldHospDest = document.getElementById('field-hosp-dest');
    const inputHospDest = document.getElementById('input-hosp-dest');
    const suggestHospDest = document.getElementById('suggest-hosp-dest');
    const selectHospType = document.getElementById('select-hosp-type');
    const hospedagemHotelList = document.getElementById('hospedagem-hotel-list');
    const hospAmenityFilters = document.querySelectorAll('.hosp-amenity-filter');

    const controleHospedagem = inputHospDest &&
        setupAutocomplete(inputHospDest, suggestHospDest, 'hotel', renderHospedagemHotels);

    if (selectHospType) {
        selectHospType.addEventListener('change', () => {
            renderHospedagemHotels();
        });
    }

    hospAmenityFilters.forEach(f => {
        f.addEventListener('change', () => {
            renderHospedagemHotels();
        });
    });

    // Favoritos de hotéis (persistência em localStorage)
    const listaFavoritos = valor => Array.isArray(valor) && valor.every(id => typeof id === 'number' || typeof id === 'string');
    function getFavoriteHotels() {
        const favoritos = lerLocal('sabia_fav_hotels', listaFavoritos);
        return favoritos.valor || (favoritos.estado === 'ausente' ? [5] : []);
    }

    function toggleFavoriteHotel(hotelId) {
        let favs = getFavoriteHotels();
        if (favs.some(id => mesmoId(id, hotelId))) {
            favs = favs.filter(id => !mesmoId(id, hotelId));
        } else {
            favs.push(hotelId);
        }
        if (lerLocal('sabia_fav_hotels', listaFavoritos).estado === 'invalido' ||
            !gravarLocal('sabia_fav_hotels', favs)) return;
        renderHospedagemHotels();
    }

    function renderHospedagemHotels() {
        if (!hospedagemHotelList) return;

        const favs = getFavoriteHotels();
        const selectedAmenities = Array.from(hospAmenityFilters)
            .filter(ch => ch.checked)
            .map(ch => ch.value);

        const localidade = controleHospedagem?.ler();
        if (inputHospDest?.value.trim() && !localidade) {
            hospedagemHotelList.innerHTML = '<p class="autocomplete-aviso">Escolha uma localidade nas sugestões para filtrar as hospedagens.</p>';
            return;
        }
        const typeQuery = selectHospType ? selectHospType.value : 'todos';

        let hotels = hoteisPublicos().filter(h => {
            if (typeQuery !== 'todos') {
                if (h.tipo && h.tipo !== typeQuery) return false;
            }

            if (localidade && !localidade.hotel.has(String(h.id))) return false;

            if (selectedAmenities.length > 0) {
                const hotelAmenities = (h.amenities || []).map(a => a.toLowerCase());
                for (let filter of selectedAmenities) {
                    if (filter === 'cafe' && !hotelAmenities.some(a => a.includes('café') || a.includes('cafe') || a.includes('pensão') || a.includes('all inclusive'))) {
                        return false;
                    }
                    if (filter === 'estacionamento' && !hotelAmenities.some(a => a.includes('estacionamento') || a.includes('translado') || a.includes('all inclusive'))) {
                        return false;
                    }
                    if (filter === 'piscina' && !hotelAmenities.some(a => a.includes('piscina') || a.includes('all inclusive'))) {
                        return false;
                    }
                    if (filter === 'recepcao' && !hotelAmenities.some(a => a.includes('24h') || a.includes('wi-fi') || a.includes('all inclusive') || a.includes('recepção'))) {
                        return false;
                    }
                }
            }

            return true;
        });

        // Ordenar para garantir que o hotel 5 (FOUND Hotel Carlton Nob Hill) apareça no topo como no mockup original
        hotels.sort((a, b) => (b.id === 5 ? 1 : 0) - (a.id === 5 ? 1 : 0));

        if (hotels.length === 0) {
            hospedagemHotelList.innerHTML = `
                <div style="background: #ffffff; border-radius: 8px; padding: 40px; text-align: center; color: #64748b; border: 1px solid #cbd5e1;">
                    <i class="fa-solid fa-hotel" style="font-size: 36px; color: #cbd5e1; margin-bottom: 12px; display: block;"></i>
                    <h3 style="font-size: 16px; color: #1e293b; margin-bottom: 6px;">${localidade && !localidade.hotel.size ? 'Nenhuma hospedagem cadastrada nesta localidade' : 'Nenhuma hospedagem encontrada com esses filtros'}</h3>
                    <p style="font-size: 13px;">Tente desmarcar alguns filtros de comodidade ou pesquisar por outro destino.</p>
                </div>
            `;
            return;
        }

        hospedagemHotelList.innerHTML = hotels.map(h => {
            const isFav = favs.some(id => mesmoId(id, h.id));
            const starsHtml = '★'.repeat(h.estrelas || 5);
            const amenitiesHtml = (h.amenities || []).slice(0, 3).map(a => `<span class="hotel-amenity-pill">${escaparHtml(a)}</span>`).join('');

            return `
                <div class="hotel-horizontal-card">
                    <div class="hotel-card-img-box">
                        <img src="${escaparHtml(h.imagem || '')}" alt="${escaparHtml(h.nome)}" class="hotel-card-img" loading="lazy">
                        <button type="button" class="btn-favorite-heart ${isFav ? 'active' : ''}" data-fav-id="${h.id}" title="${isFav ? 'Remover dos favoritos' : 'Favoritar hotel'}">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                    </div>

                    <div class="hotel-card-details">
                        <h3 class="hotel-name-heading">${escaparHtml(h.nome)}</h3>
                        <div class="hotel-loc-sub"><i class="fa-solid fa-location-dot" style="color: #ea580c; font-size: 12px;"></i> ${escaparHtml(h.cidade)}, ${escaparHtml(h.pais)}</div>
                        <div class="hotel-amenities-tags">${amenitiesHtml}</div>
                        
                        <div class="hotel-price-rating-row">
                            <div class="hotel-price-display">
                                R$ <strong>${Number(h.diaria).toLocaleString('pt-BR')}</strong> Por pessoa
                            </div>
                            <div class="hotel-rating-display">
                                <span class="rating-label">Avaliação do hotel</span>
                                <span class="rating-stars">${starsHtml}</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn-hospede-agora" data-hotel-id="${h.id}">
                        Hospede-se Agora
                    </button>
                </div>
            `;
        }).join('');

        hospedagemHotelList.querySelectorAll('.btn-favorite-heart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const hid = btn.dataset.favId;
                toggleFavoriteHotel(hid);
            });
        });

        hospedagemHotelList.querySelectorAll('.btn-hospede-agora').forEach(btn => {
            btn.addEventListener('click', () => {
                const hotel = hoteisPublicos().find(item => mesmoId(item.id, btn.dataset.hotelId));
                if (hotel) {
                    addItemToCart({
                        id: `HOTEL-${hotel.id}`,
                        type: 'Hospedagem',
                        title: hotel.nome,
                        sub: `${hotel.cidade}, ${hotel.pais}`,
                        meta: `Diária com pensão e comodidades inclusas`,
                        price: hotel.diaria,
                        hotelId: hotel.id, checkin: startDate ? dataLocal(startDate) : '',
                        hospedes: counts.adults + counts.children + counts.infants,
                        qty: startDate && endDate ? Math.max(1, noitesEntre(dataLocal(startDate), dataLocal(endDate))) : 1
                    });
                }
            });
        });
    }

    // Mapa de hospedagens
    const btnOpenMap = document.getElementById('btn-open-map');
    const mapModalOverlay = document.getElementById('map-modal-overlay');
    const btnCloseMap = document.getElementById('btn-close-map');
    const mapFilterCity = document.getElementById('map-filter-city');
    const mapPreviewImg = document.getElementById('map-preview-img');
    const mapPreviewTitle = document.getElementById('map-preview-title');
    const mapPreviewCity = document.getElementById('map-preview-city');
    const mapPreviewAmenities = document.getElementById('map-preview-amenities');
    const mapPreviewPrice = document.getElementById('map-preview-price');
    const btnMapBookHotel = document.getElementById('btn-map-book-hotel');

    let leafletMapInstance = null;
    let mapMarkersList = [];
    let selectedMapHotel = null;

    function selectHotelOnMap(hotel) {
        if (!hotel) return;
        selectedMapHotel = hotel;

        if (mapPreviewImg) mapPreviewImg.src = hotel.imagem;
        if (mapPreviewTitle) mapPreviewTitle.textContent = hotel.nome;
        if (mapPreviewCity) mapPreviewCity.textContent = `${hotel.cidade}, ${hotel.pais} • ${'★'.repeat(hotel.estrelas || 5)}`;
        if (mapPreviewAmenities) mapPreviewAmenities.textContent = (hotel.amenities || []).join(' • ');
        if (mapPreviewPrice) mapPreviewPrice.textContent = `R$ ${Number(hotel.diaria).toLocaleString('pt-BR')}`;
    }

    function initLeafletMap() {
        const mapContainer = document.getElementById('hotel-leaflet-map');
        if (!mapContainer) return;

        if (typeof L !== 'undefined') {
            if (!leafletMapInstance) {
                leafletMapInstance = L.map('hotel-leaflet-map', {
                    zoomControl: true,
                    attributionControl: false
                }).setView([20, 0], 2);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19
                }).addTo(leafletMapInstance);
            }

            mapMarkersList.forEach(m => leafletMapInstance.removeLayer(m));
            mapMarkersList = [];

            const bounds = [];

            hoteisPublicos().forEach(hotel => {
                if (hotel.lat && hotel.lng) {
                    const priceFormatted = `R$ ${Number(hotel.diaria).toLocaleString('pt-BR')}`;
                    const customPinIcon = L.divIcon({
                        className: 'custom-hotel-pin',
                        html: `<div class="pin-badge">${priceFormatted}</div><div class="pin-arrow"></div>`,
                        iconSize: [80, 36],
                        iconAnchor: [40, 36]
                    });

                    const marker = L.marker([hotel.lat, hotel.lng], { icon: customPinIcon }).addTo(leafletMapInstance);

                    marker.on('click', () => {
                        selectHotelOnMap(hotel);
                        leafletMapInstance.setView([hotel.lat, hotel.lng], 13);
                    });

                    mapMarkersList.push(marker);
                    bounds.push([hotel.lat, hotel.lng]);
                }
            });

            if (bounds.length > 0 && mapFilterCity && mapFilterCity.value === 'todos') {
                leafletMapInstance.fitBounds(bounds, { padding: [40, 40] });
            }

            setTimeout(() => {
                leafletMapInstance.invalidateSize();
            }, 250);

        } else {
            // Fallback caso não haja conexão com a biblioteca Leaflet
            mapContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f1f5f9; color: #475569; text-align: center; padding: 20px;">
                    <i class="fa-solid fa-map-location-dot" style="font-size: 40px; color: #ea580c; margin-bottom: 10px;"></i>
                    <strong style="font-size: 16px; color: #1e293b;">Mapa de Localização dos Hotéis</strong>
                    <p style="font-size: 13px; max-width: 480px; margin-top: 4px;">Explore os hotéis cadastrados e selecione uma cidade no filtro acima para visualizar detalhes de localização e tarifas.</p>
                </div>
            `;
        }

        // Selecionar o primeiro hotel (FOUND Hotel Carlton) por padrão no banner
        const defaultHotel = hoteisPublicos().find(h => h.id === 5) || hoteisPublicos()[0];
        selectedMapHotel = null;
        const previa = document.getElementById('map-hotel-preview-banner');
        if (previa) previa.style.display = defaultHotel ? '' : 'none';
        if (defaultHotel) selectHotelOnMap(defaultHotel);
    }

    if (btnOpenMap && mapModalOverlay) {
        btnOpenMap.addEventListener('click', () => {
            mapModalOverlay.classList.add('active');
            initLeafletMap();
        });
    }

    if (btnCloseMap && mapModalOverlay) {
        btnCloseMap.addEventListener('click', () => {
            mapModalOverlay.classList.remove('active');
        });
    }

    if (mapModalOverlay) {
        mapModalOverlay.addEventListener('click', (e) => {
            if (e.target === mapModalOverlay) {
                mapModalOverlay.classList.remove('active');
            }
        });
    }

    if (mapFilterCity) {
        mapFilterCity.addEventListener('change', () => {
            const city = mapFilterCity.value;
            if (city === 'todos') {
                initLeafletMap();
            } else {
                const found = hoteisPublicos().find(h => h.cidade.toLowerCase() === city.toLowerCase());
                if (found) {
                    selectHotelOnMap(found);
                    if (leafletMapInstance && found.lat && found.lng) {
                        leafletMapInstance.setView([found.lat, found.lng], 14);
                    }
                }
            }
        });
    }

    if (btnMapBookHotel) {
        btnMapBookHotel.addEventListener('click', () => {
            if (selectedMapHotel && hoteisPublicos().some(h => mesmoId(h.id, selectedMapHotel.id))) {
                addItemToCart({
                    id: `HOTEL-${selectedMapHotel.id}`,
                    type: 'Hospedagem',
                    title: selectedMapHotel.nome,
                    sub: `${selectedMapHotel.cidade}, ${selectedMapHotel.pais}`,
                    meta: `Reserva confirmada via Mapa Interativo`,
                    price: selectedMapHotel.diaria
                });
                if (mapModalOverlay) mapModalOverlay.classList.remove('active');
            }
        });
    }

    // Carrossel de promoções
    const promoCarouselTrack = document.getElementById('promocoes-carousel-track');
    const promoCarouselDots = document.getElementById('promocoes-carousel-dots');
    const btnPromoPrev = document.getElementById('btn-promo-prev');
    const btnPromoNext = document.getElementById('btn-promo-next');

    let currentPromoIndex = 0;

    function getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 640) return 1;
        if (width <= 1024) return 2;
        return 3; // 3 cards maiores e destacados no desktop
    }

    function renderPromocoesCarousel() {
        if (!promoCarouselTrack) return;

        const promos = dbData.promocoes || [];
        promoCarouselTrack.innerHTML = promos.map((p, idx) => `
            <div class="promo-travel-card" data-promo-index="${idx}" title="Clique para ver mais detalhes da viagem">
                <div class="promo-img-wrapper">
                    <img src="${p.imagem}" alt="${p.titulo}" class="promo-dest-img" loading="lazy">
                    <div class="ribbon-airline">${p.companhia || 'Voando Parceiras'}</div>
                    <div class="badge-direct-discount">Voo direto! Até 40% de desconto!</div>
                </div>
                <div class="promo-card-body">
                    <div class="promo-tag-aereo">
                        <i class="fa-solid fa-plane"></i> Aéreo
                    </div>
                    <h3 class="promo-dest-title">${p.titulo}</h3>
                    <div class="promo-origin-sub">Saindo de São Paulo</div>

                    <ul class="promo-features-list">
                        <li><i class="fa-solid fa-check"></i> ${p.amenities ? p.amenities[0] : 'Aéreo ida e volta'}</li>
                        <li><i class="fa-solid fa-check"></i> ${p.amenities && p.amenities[1] ? p.amenities[1] : 'Saída confirmada 2026'}</li>
                        <li><i class="fa-solid fa-check"></i> ${p.amenities && p.amenities[2] ? p.amenities[2] : 'Bagagem inclusa'}</li>
                    </ul>

                    <div class="promo-price-block">
                        <span class="promo-from-text">a partir de</span>
                        <div class="promo-price-value">R$ <strong>${Number(p.valorTotal).toLocaleString('pt-BR')}</strong></div>
                        <span class="promo-per-person">Por pessoa</span>
                    </div>

                    <button type="button" class="btn-compre-site" data-promo-index="${idx}">
                        <i class="fa-solid fa-circle-info"></i> Ver Detalhes
                    </button>
                </div>
            </div>
        `).join('');

        promoCarouselTrack.querySelectorAll('.promo-travel-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = Number(card.dataset.promoIndex);
                const promoItem = promos[idx];
                if (promoItem) openTripDetailsModal(promoItem);
            });
        });

        updatePromoCarouselPosition();
    }

    function updatePromoCarouselPosition() {
        if (!promoCarouselTrack) return;
        const promos = dbData.promocoes || [];
        const perView = getItemsPerView();
        const maxIndex = Math.max(0, promos.length - perView);

        if (currentPromoIndex > maxIndex) currentPromoIndex = maxIndex;
        if (currentPromoIndex < 0) currentPromoIndex = 0;

        const cardEl = promoCarouselTrack.querySelector('.promo-travel-card');
        const cardWidth = cardEl ? cardEl.offsetWidth : 320;
        const gap = 24; // Espaçamento sincronizado com o CSS
        const offset = currentPromoIndex * (cardWidth + gap);

        promoCarouselTrack.style.transform = `translateX(-${offset}px)`;

        if (btnPromoPrev) btnPromoPrev.disabled = (currentPromoIndex === 0);
        if (btnPromoNext) btnPromoNext.disabled = (currentPromoIndex >= maxIndex);

        if (promoCarouselDots) {
            const totalDots = maxIndex + 1;
            promoCarouselDots.innerHTML = '';
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.className = `promo-dot ${i === currentPromoIndex ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    currentPromoIndex = i;
                    updatePromoCarouselPosition();
                });
                promoCarouselDots.appendChild(dot);
            }
        }
    }

    if (btnPromoPrev) {
        btnPromoPrev.addEventListener('click', () => {
            if (currentPromoIndex > 0) {
                currentPromoIndex--;
                updatePromoCarouselPosition();
            }
        });
    }

    if (btnPromoNext) {
        btnPromoNext.addEventListener('click', () => {
            const perView = getItemsPerView();
            const maxIndex = Math.max(0, (dbData.promocoes || []).length - perView);
            if (currentPromoIndex < maxIndex) {
                currentPromoIndex++;
                updatePromoCarouselPosition();
            }
        });
    }

    window.addEventListener('resize', () => {
        updatePromoCarouselPosition();
    });

    renderPromocoesCarousel();

    // Resultados de Passagens
    const btnPromoBannerOfertas = document.getElementById('btn-promo-banner-ofertas');
    const passagensResultsSection = document.getElementById('passagens-results-section');
    const passagensFlightsList = document.getElementById('passagens-flights-list');
    const btnClosePassagensResults = document.getElementById('btn-close-passagens-results');

    function renderInlineFlightResults(origem, destino) {
        if (!passagensResultsSection || !passagensFlightsList) return;

        const flights = buscarVoos(origem, destino);

        passagensFlightsList.innerHTML = flights.map(f => `
            <div class="flight-result-row">
                <div class="airline-col">
                    <i class="fa-solid fa-plane" style="color: #ea580c; font-size: 20px;"></i>
                    <div>
                        <strong style="color: #1e293b; font-size: 14px;">${escaparHtml(f.companhia)}</strong>
                        <div style="font-size: 11px; color: #64748b;">${tipoDeTrecho(f)}</div>
                    </div>
                </div>

                <div class="route-col">
                    <div style="text-align: right;">
                        <strong style="font-size: 16px; color: #1e293b;">${escaparHtml(f.horarioPartida)}</strong>
                        <div style="font-size: 11px; color: #64748b;">${escaparHtml(f.origem)}</div>
                    </div>
                    <div style="text-align: center; color: #94a3b8; font-size: 11px;">
                        <div>${f.duracao || 'Duração não informada'}</div>
                        <div style="border-top: 2px solid #cbd5e1; width: 60px; margin: 2px auto;"></div>
                        <div>${tipoDeTrecho(f)}</div>
                    </div>
                    <div>
                        <strong style="font-size: 16px; color: #1e293b;">${escaparHtml(f.horarioChegada)}</strong>
                        <div style="font-size: 11px; color: #64748b;">${escaparHtml(f.destino)}</div>
                    </div>
                </div>

                <div class="price-col">
                    <span style="font-size: 11px; color: #64748b;">A partir de</span>
                    <strong style="font-size: 22px; color: #ea580c;">R$ ${f.preco.toLocaleString('pt-BR')}</strong>
                    <button type="button" class="btn-comprar-inline" data-id="${escaparHtml(f.id)}" data-title="Passagem ${escaparHtml(f.origem)} ➔ ${escaparHtml(f.destino)}" data-price="${f.preco}" style="background: #ea580c; color: #ffffff; border: none; border-radius: 6px; padding: 6px 14px; font-weight: 700; font-size: 12px; cursor: pointer;">
                        Comprar Passagem
                    </button>
                </div>
            </div>
        `).join('');

        if (!flights.length) passagensFlightsList.textContent = 'Nenhum voo encontrado para esta busca.';
        passagensResultsSection.style.display = 'block';
        passagensResultsSection.scrollIntoView({ behavior: 'smooth' });

        passagensFlightsList.querySelectorAll('.btn-comprar-inline').forEach(btn => {
            btn.addEventListener('click', () => {
                const voo = flights.find(item => mesmoId(item.id, btn.dataset.id));
                if (!voo) return;
                const trecho = dadosDoVoo(voo, startDate);
                addItemToCart({
                    id: btn.dataset.id,
                    type: 'Passagem Aérea',
                    title: btn.dataset.title,
                    sub: flights.find(voo => mesmoId(voo.id, btn.dataset.id))?.companhia || '',
                    price: Number(btn.dataset.price), voos: [trecho], ida: trecho.data,
                    qty: counts.adults + counts.children + counts.infants
                });
            });
        });
    }

    if (btnPromoBannerOfertas) {
        btnPromoBannerOfertas.addEventListener('click', () => {
            renderInlineFlightResults('São Paulo (SAO)', 'Cancún (CUN)');
        });
    }

    document.querySelectorAll('.btn-deal-search').forEach(btn => {
        btn.addEventListener('click', () => {
            const dest = btn.dataset.dest || 'Rio de Janeiro';
            renderInlineFlightResults('São Paulo (SAO)', dest);
        });
    });

    if (btnClosePassagensResults && passagensResultsSection) {
        btnClosePassagensResults.addEventListener('click', () => {
            passagensResultsSection.style.display = 'none';
        });
    }

    document.querySelectorAll('.btn-compre-site').forEach(btn => {
        btn.addEventListener('click', () => {
            const pid = btn.dataset.promoId;
            const title = btn.dataset.title || 'Pacote de Viagem';
            const price = Number(btn.dataset.price) || 618;

            addItemToCart({
                id: `PROMO-${pid}`,
                type: 'Pacote Promocional',
                title: title,
                sub: 'Aéreo ida e volta + Bagagem despachada inclusa',
                meta: 'Saída confirmada de São Paulo',
                price: price
            });
        });
    });

    function switchMainView(viewName) {
        if (!viewName) viewName = 'home';
        fecharSugestoes();
        const institucional = document.getElementById('institucional-sabia');
        if (institucional) institucional.hidden = viewName !== 'home';

        navItems.forEach(item => {
            if (item.dataset.view === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        if (heroHeaderTitle) {
            const titles = {
                'passagens': 'Passagens',
                'hospedagem': 'Hospedagem',
                'promocoes': 'Promoções',
                'home': 'Home'
            };
            heroHeaderTitle.textContent = titles[viewName] || 'Passagens';
        }

        const formRowMainEl = document.getElementById('form-row-main');
        const variosTrechos = viewName !== 'hospedagem' && Boolean(document.querySelector('[data-tab="varios-destinos"].active'));
        if (formRowMainEl) formRowMainEl.style.display = variosTrechos ? 'none' : 'grid';
        if (formRowMulti) formRowMulti.style.display = variosTrechos ? 'flex' : 'none';
        if (viewName === 'hospedagem') {
            if (fieldLocationFlights) fieldLocationFlights.style.display = 'none';
            if (fieldHospType) fieldHospType.style.display = 'flex';
            if (fieldHospDest) fieldHospDest.style.display = 'flex';
            if (formRowMainEl) formRowMainEl.classList.add('mode-hospedagem');
            renderHospedagemHotels();
        } else {
            if (fieldLocationFlights) fieldLocationFlights.style.display = 'flex';
            if (fieldHospType) fieldHospType.style.display = 'none';
            if (fieldHospDest) fieldHospDest.style.display = 'none';
            if (formRowMainEl) formRowMainEl.classList.remove('mode-hospedagem');
        }

        document.querySelectorAll('.main-view-section').forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });

        const targetSec = document.getElementById(`view-${viewName}`);
        if (targetSec) {
            targetSec.classList.add('active');
            targetSec.style.display = 'flex';
        }

        if (viewName === 'promocoes') {
            setTimeout(() => {
                if (typeof renderPromocoesCarousel === 'function') renderPromocoesCarousel();
            }, 50);
        } else if (viewName === 'hospedagem') {
            if (typeof renderHospedagemHotels === 'function') renderHospedagemHotels();
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            if (window.location.hash !== '#' + view) window.location.hash = view;
        });
    });

    function navegarPeloHash() {
        const hash = window.location.hash.slice(1).toLowerCase();
        if (['passagens', 'hospedagem', 'promocoes', 'home'].includes(hash)) {
            switchMainView(hash);
            return;
        }
        const secao = document.getElementById(hash);
        const institucional = secao?.closest('#institucional-sabia');
        if (!hash || institucional) switchMainView('home');
        if (institucional) secao.scrollIntoView();
    }

    window.addEventListener('hashchange', navegarPeloHash);
    navegarPeloHash();

    function initPainelSolicitacao() {
        const conta = usuarioAtual();
        const titulo = document.getElementById('pedido-titulo');
        const texto = document.getElementById('pedido-status');
        const form = document.getElementById('form-acompanhamento');
        const hotel = ['SOLICITANTE_HOTEL', 'ADM_HOTEL'].includes(conta?.tipo);
        const chave = hotel ? 'solicitacoesHotel' : 'solicitacoesCompanhia';
        const pedido = [...dbData[chave]].reverse().find(p =>
            p.responsavelEmail.toLowerCase() === conta.email.toLowerCase());
        titulo.textContent = hotel ? 'Solicitação de hotel' : 'Solicitação de companhia aérea';
        if (gestorAprovado(conta)) {
            texto.textContent = 'Conta aprovada. Seu painel já está disponível.';
            const a = document.getElementById('link-painel-aprovado');
            a.href = PAINEIS_ADMIN[conta.tipo].pagina; a.hidden = false;
            form.hidden = true;
        }
        if (!gestorAprovado(conta)) texto.textContent = pedido ? `Situação: ${pedido.statusAprovacao}` +
            (pedido.justificativa ? ` · Justificativa: ${pedido.justificativa}` : '') :
            'Não há uma solicitação registrada para esta conta.';
        form.hidden = gestorAprovado(conta) || (!!pedido && pedido.statusAprovacao !== 'rejeitado');
        const areaHotel = document.getElementById('edicao-hotel');
        const areaCia = document.getElementById('edicao-companhia');
        areaHotel.hidden = !hotel; areaCia.hidden = hotel;
        areaHotel.disabled = !hotel; areaCia.disabled = hotel;
        for (const input of form.querySelectorAll('input')) input.required = !input.closest('[hidden]');
        if (pedido) {
            for (const campo of ['nome', 'cidade', 'pais', 'diaria', 'codigoIata']) {
                const el = (hotel ? areaHotel : areaCia).querySelector(`[name="${campo}"]`);
                if (el) el.value = pedido[campo] ?? '';
            }
        }
        const historico = document.getElementById('historico-pedido');
        if (pedido?.historico?.length) pedido.historico.forEach(h => {
            const li = document.createElement('li');
            li.textContent = `${h.acao || h.status}` + (h.justificativa ? ` · ${h.justificativa}` : '');
            historico.append(li);
        });
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (usuarioAtual()?.email !== conta.email || gestorAprovado(usuarioAtual())) return;
            const atual = dbData[chave].find(p => mesmoId(p.id, pedido?.id));
            if (atual && atual.statusAprovacao !== 'rejeitado') return;
            const dados = new FormData(form);
            const nome = String(dados.get('nome') || '').trim();
            const pais = String(dados.get('pais') || '').trim();
            const cidade = String(dados.get('cidade') || '').trim();
            const codigoIata = String(dados.get('codigoIata') || '').trim().toUpperCase();
            const diaria = Number(dados.get('diaria'));
            if (!nome || !pais || (hotel && (!cidade || !Number.isFinite(diaria) || diaria < 0)) ||
                (!hotel && !/^[A-Z0-9]{2,3}$/.test(codigoIata))) return alert('Confira os dados informados.');
            if (hotel && dbData.hoteis.some(h => normalizarBusca(h.nome) === normalizarBusca(nome) &&
                normalizarBusca(h.cidade) === normalizarBusca(cidade))) return alert('Este hotel já existe no catálogo.');
            if (!hotel && dbData.companhias.some(c => normalizarBusca(c.nome) === normalizarBusca(nome) ||
                normalizarBusca(c.codigoIata) === normalizarBusca(codigoIata))) return alert('Esta companhia já existe no catálogo.');
            const pedidoDuplicado = dbData[chave].some(outro => {
                if (mesmoId(outro.id, pedido?.id) || outro.statusAprovacao !== 'pendente') return false;
                const mesmoNome = normalizarBusca(outro.nome) === normalizarBusca(nome);
                return hotel ? mesmoNome && normalizarBusca(outro.cidade) === normalizarBusca(cidade)
                    : mesmoNome || normalizarBusca(outro.codigoIata) === normalizarBusca(codigoIata);
            });
            if (pedidoDuplicado) return alert('Já existe uma solicitação pendente para este cadastro.');
            const agora = new Date().toISOString();
            const novo = { ...pedido, id: pedido?.id || gerarId(), responsavelEmail: conta.email,
                nome, pais, statusAprovacao: 'pendente', atualizadoEm: agora,
                criadoEm: pedido?.criadoEm || agora, justificativa: '',
                historico: [...(pedido?.historico || []), { status: 'pendente',
                    acao: pedido ? 'Solicitação corrigida e reenviada' : 'Solicitação enviada', data: agora }] };
            if (hotel) { novo.cidade = cidade; novo.diaria = diaria; }
            else novo.codigoIata = codigoIata;
            const lista = [...dbData[chave].filter(p => !mesmoId(p.id, novo.id)), novo];
            if (!salvarEstado({}, undefined, false,
                hotel ? lista : dbData.solicitacoesHotel,
                hotel ? dbData.solicitacoesCompanhia : lista)) return;
            window.location.reload();
        });
    }

    function initAdminPanel() {
        const listaHotel = document.getElementById('lista-solicitacoes-hotel');
        const listaCompanhia = document.getElementById('lista-solicitacoes-companhia');
        const filtro = document.getElementById('filtro-status-solicitacoes');
        const abas = [...document.querySelectorAll('[data-aba-solicitacao]')];
        abas.forEach(aba => aba.addEventListener('click', () => {
            abas.forEach(a => { a.classList.toggle('active', a === aba); a.setAttribute('aria-selected', String(a === aba)); });
            document.getElementById('painel-solicitacoes-hotel').hidden = aba.dataset.abaSolicitacao !== 'hotel';
            document.getElementById('painel-solicitacoes-companhia').hidden = aba.dataset.abaSolicitacao !== 'companhia';
        }));
        filtro?.addEventListener('change', renderCentral);

        function renderCentral() {
            if (!listaHotel || !listaCompanhia) return;
            const total = dbData.solicitacoesHotel.filter(p => p.statusAprovacao === 'pendente').length +
                dbData.solicitacoesCompanhia.filter(p => p.statusAprovacao === 'pendente').length;
            document.getElementById('total-solicitacoes-pendentes').textContent = String(total);
            for (const [tipo, destino, lista] of [['hotel', listaHotel, dbData.solicitacoesHotel],
                ['companhia', listaCompanhia, dbData.solicitacoesCompanhia]]) {
                destino.replaceChildren();
                const exibidos = lista.filter(p => filtro?.value === 'todas' || p.statusAprovacao === filtro?.value);
                if (!exibidos.length) {
                    const vazio = document.createElement('p'); vazio.textContent = 'Nenhuma solicitação neste filtro.';
                    destino.append(vazio); continue;
                }
                exibidos.forEach(p => {
                    const card = document.createElement('article'); card.className = 'solicitacao-card';
                    const titulo = document.createElement('h3'); titulo.textContent = p.nome;
                    const resumo = document.createElement('p');
                    const responsavel = dbData.usuarios.find(u =>
                        u.email.toLowerCase() === p.responsavelEmail.toLowerCase());
                    const contato = responsavel ? responsavel.nome + ' (' + p.responsavelEmail + ')' : p.responsavelEmail;
                    resumo.textContent = (tipo === 'hotel' ? `${p.cidade}, ${p.pais} · R$ ${p.diaria} / diária` :
                        `${p.codigoIata} · ${p.pais}`) + ` · Responsável: ${contato}`;
                    const situacao = document.createElement('p'); situacao.className = 'solicitacao-situacao';
                    situacao.textContent = `Status: ${p.statusAprovacao}` + (p.justificativa ? ` · Justificativa: ${p.justificativa}` : '');
                    card.append(titulo, resumo, situacao);
                    if (p.statusAprovacao === 'pendente') {
                        const acoes = document.createElement('div'); acoes.className = 'solicitacao-acoes';
                        botaoAdmin(acoes, 'Aprovar', () => decidirSolicitacao(tipo, p.id, true));
                        botaoAdmin(acoes, 'Rejeitar', () => decidirSolicitacao(tipo, p.id, false));
                        card.append(acoes);
                    }
                    if (p.historico?.length) {
                        const details = document.createElement('details');
                        const summary = document.createElement('summary'); summary.textContent = 'Histórico de decisões';
                        const ul = document.createElement('ul');
                        p.historico.forEach(h => { const li = document.createElement('li');
                            li.textContent = `${h.data ? new Date(h.data).toLocaleString('pt-BR') : ''}: ${h.acao || h.status}` +
                                (h.justificativa ? ` (${h.justificativa})` : ''); ul.append(li); });
                        details.append(summary, ul); card.append(details);
                    }
                    destino.append(card);
                });
            }
        }

        function decidirSolicitacao(tipo, id, aprovar) {
            if (usuarioAtual()?.tipo !== 'ADM_GERAL') return;
            const chave = tipo === 'hotel' ? 'solicitacoesHotel' : 'solicitacoesCompanhia';
            const pedido = dbData[chave].find(p => mesmoId(p.id, id));
            if (!pedido || pedido.statusAprovacao !== 'pendente') return;
            const usuario = dbData.usuarios.find(u => u.email.toLowerCase() === pedido.responsavelEmail.toLowerCase());
            const perfis = tipo === 'hotel' ? ['SOLICITANTE_HOTEL', 'ADM_HOTEL'] : ['SOLICITANTE_COMPANHIA', 'ADM_VOO'];
            if (!usuario || !perfis.includes(usuario.tipo)) {
                return alert('Conta do responsável não encontrada ou com perfil incompatível.');
            }
            const vinculo = tipo === 'hotel' ? 'hotelId' : 'companhiaId';
            if (pedido[vinculo] != null && !mesmoId(pedido[vinculo], usuario[vinculo])) {
                return alert('O pedido não corresponde ao vínculo do responsável.');
            }
            let justificativa = '';
            if (!aprovar) {
                const motivo = prompt('Qual é a justificativa da rejeição?');
                if (motivo === null) return;
                justificativa = motivo.trim();
                if (!justificativa) return alert('Informe uma justificativa antes de rejeitar.');
            } else if (!confirm('Aprovar esta solicitação e liberar o painel do responsável?')) return;
            const agora = new Date().toISOString();
            let novoRegistro = null;
            let usuarioAtualizado = usuario;
            let catalogo = {};
            if (aprovar && tipo === 'hotel') {
                const existe = dbData.hoteis.some(h =>
                    normalizarBusca(h.nome) === normalizarBusca(pedido.nome) &&
                    normalizarBusca(h.cidade) === normalizarBusca(pedido.cidade));
                if (existe && !pedido.hotelId) return alert('Já existe hotel com este nome e cidade. Confira antes de aprovar.');
                const hotelId = pedido.hotelId || gerarId();
                novoRegistro = { id: hotelId, nome: pedido.nome, cidade: pedido.cidade,
                    pais: pedido.pais, diaria: Number(pedido.diaria), estrelas: 3, amenities: [],
                    imagem: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
                    statusAprovacao: 'aprovado', ativo: true };
                catalogo.hoteis = [...dbData.hoteis.filter(h => !mesmoId(h.id, hotelId)), novoRegistro];
                usuarioAtualizado = { ...usuario, tipo: 'ADM_HOTEL', hotelId, hotelNome: pedido.nome };
            } else if (aprovar && tipo === 'companhia') {
                const existe = dbData.companhias.some(c => normalizarBusca(c.nome) === normalizarBusca(pedido.nome) ||
                    normalizarBusca(c.codigoIata) === normalizarBusca(pedido.codigoIata));
                if (existe && !pedido.companhiaId) return alert('Nome ou código da companhia já utilizado. Confira antes de aprovar.');
                const companhiaId = pedido.companhiaId || gerarId();
                novoRegistro = { id: companhiaId, nome: pedido.nome, codigoIata: pedido.codigoIata,
                    pais: pedido.pais, statusAprovacao: 'aprovado', ativo: true };
                catalogo.companhias = [...dbData.companhias.filter(c => !mesmoId(c.id, companhiaId)), novoRegistro];
                usuarioAtualizado = { ...usuario, tipo: 'ADM_VOO', companhiaId, companhiaNome: pedido.nome };
            }
            const atualizado = { ...pedido, statusAprovacao: aprovar ? 'aprovado' : 'rejeitado',
                atualizadoEm: agora, justificativa,
                historico: [...(pedido.historico || []), { data: agora, status: aprovar ? 'aprovado' : 'rejeitado',
                    acao: aprovar ? 'Solicitação aprovada' : 'Solicitação rejeitada',
                    justificativa, por: usuarioAtual().email }] };
            if (novoRegistro && tipo === 'hotel') atualizado.hotelId = novoRegistro.id;
            if (novoRegistro && tipo === 'companhia') atualizado.companhiaId = novoRegistro.id;
            const lista = dbData[chave].map(p => mesmoId(p.id, id) ? atualizado : p);
            const pedidosHotel = tipo === 'hotel' ? lista : dbData.solicitacoesHotel;
            const pedidosCompanhia = tipo === 'companhia' ? lista : dbData.solicitacoesCompanhia;
            const usuarios = aprovar ? combinarUsuarios(estadoDados.usuarios, [usuarioAtualizado]) : estadoDados.usuarios;
            if (!salvarEstado(catalogo, usuarios, false, pedidosHotel, pedidosCompanhia)) return;
            renderCentral();
            alert(aprovar ? 'Solicitação aprovada. O vínculo e o acesso foram atualizados.' : 'Solicitação rejeitada. O responsável poderá corrigir e reenviar.');
        }
        renderCentral();
        const btnOpenCadHotel = document.getElementById('btn-open-cad-hotel');
        const btnOpenListHotel = document.getElementById('btn-open-list-hotel');
        const btnOpenCadCia = document.getElementById('btn-open-cad-cia');
        const btnOpenListCia = document.getElementById('btn-open-list-cia');
        const btnOpenCadCidade = document.getElementById('btn-open-cad-cidade');
        const btnOpenListCidade = document.getElementById('btn-open-list-cidade');
        const btnOpenCadAero = document.getElementById('btn-open-cad-aero');
        const btnOpenListAero = document.getElementById('btn-open-list-aero');

        const modalCadHotel = document.getElementById('modal-cad-hotel');
        const modalListHotel = document.getElementById('modal-list-hotel');
        const modalCadCia = document.getElementById('modal-cad-cia');
        const modalListCia = document.getElementById('modal-list-cia');
        const modalCadCidade = document.getElementById('modal-cad-cidade');
        const modalListCidade = document.getElementById('modal-list-cidade');
        const modalCadAero = document.getElementById('modal-cad-aero');
        const modalListAero = document.getElementById('modal-list-aero');

        const formCadHotel = document.getElementById('form-cad-hotel');
        const formCadCia = document.getElementById('form-cad-cia');
        const formCadCidade = document.getElementById('form-cad-cidade');
        const consultaIBGE = formCadCidade ? configurarConsultaIBGE(formCadCidade) : null;
        const formCadAero = document.getElementById('form-cad-aero');

        const selectCadHotelCidade = document.getElementById('cad-hotel-cidade');
        const selectCadAeroCidade = document.getElementById('cad-aero-cidade');

        function populateCityDropdowns() {
            const cidadesList = dbData.cidades || [];
            const optionsHtml = cidadesList.map(c => `<option value="${escaparHtml(c.nome)}">${escaparHtml(c.nome)} (${escaparHtml(c.estado || c.pais)}, ${escaparHtml(c.pais)})</option>`).join('');
            if (selectCadHotelCidade) selectCadHotelCidade.innerHTML = optionsHtml;
            if (selectCadAeroCidade) selectCadAeroCidade.innerHTML = optionsHtml;
        }
        populateCityDropdowns();

        
        document.querySelectorAll('.btn-close-admin-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.close;
                if (targetId) {
                    const m = document.getElementById(targetId);
                    if (m) m.classList.remove('active');
                }
            });
        });

        
        document.querySelectorAll('.admin-modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        });

        
        if (btnOpenCadHotel) {
            btnOpenCadHotel.addEventListener('click', () => {
                populateCityDropdowns();
                if (modalCadHotel) modalCadHotel.classList.add('active');
            });
        }

        if (btnOpenListHotel) {
            btnOpenListHotel.addEventListener('click', () => {
                renderHoteisTable();
                if (modalListHotel) modalListHotel.classList.add('active');
            });
        }

        if (btnOpenCadCia) {
            btnOpenCadCia.addEventListener('click', () => {
                if (modalCadCia) modalCadCia.classList.add('active');
            });
        }

        if (btnOpenListCia) {
            btnOpenListCia.addEventListener('click', () => {
                renderCompanhiasTable();
                if (modalListCia) modalListCia.classList.add('active');
            });
        }

        if (btnOpenCadCidade) {
            btnOpenCadCidade.addEventListener('click', () => {
                if (modalCadCidade) modalCadCidade.classList.add('active');
                consultaIBGE?.abrir();
            });
        }

        if (btnOpenListCidade) {
            btnOpenListCidade.addEventListener('click', () => {
                renderCidadesTable();
                if (modalListCidade) modalListCidade.classList.add('active');
            });
        }

        if (btnOpenCadAero) {
            btnOpenCadAero.addEventListener('click', () => {
                populateCityDropdowns();
                if (modalCadAero) modalCadAero.classList.add('active');
            });
        }

        if (btnOpenListAero) {
            btnOpenListAero.addEventListener('click', () => {
                renderAeroportosTable();
                if (modalListAero) modalListAero.classList.add('active');
            });
        }

        
        if (formCadHotel) {
            formCadHotel.addEventListener('submit', (e) => {
                e.preventDefault();
                const nome = document.getElementById('cad-hotel-nome').value.trim();
                const cidade = document.getElementById('cad-hotel-cidade').value.trim();
                const pais = document.getElementById('cad-hotel-pais').value.trim();
                const estrelas = parseInt(document.getElementById('cad-hotel-estrelas').value, 10);
                const diaria = parseFloat(document.getElementById('cad-hotel-diaria').value);
                const amenitiesStr = document.getElementById('cad-hotel-amenities').value.trim();
                const amenities = amenitiesStr ? amenitiesStr.split(',').map(s => s.trim()) : ["All Inclusive", "Wi-Fi", "Piscina"];

                
                const admNome = document.getElementById('admhotel-nome').value.trim();
                const admCpf = document.getElementById('admhotel-cpf').value.trim();
                const admEmail = document.getElementById('admhotel-email').value.trim();
                const admSenha = document.getElementById('admhotel-senha').value.trim();

                if (!nome || !cidade || !pais || !admNome || !admCpf || !admEmail || !admSenha) {
                    alert('⚠️ Por favor, preencha todos os campos obrigatórios do hotel e do gestor ADMHOTEL.');
                    return;
                }

                const newHotelId = Date.now();
                const newHotel = {
                    id: newHotelId,
                    statusAprovacao: 'aprovado',
                    nome,
                    cidade,
                    pais,
                    estrelas,
                    diaria,
                    amenities,
                    imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
                };

                if (dbData.usuarios.some(u => u.email.toLowerCase() === admEmail.toLowerCase() ||
                    u.cpf.replace(/\D/g, '') === admCpf.replace(/\D/g, ''))) {
                    return alert('Já existe uma conta com este CPF ou e-mail.');
                }
                const newAdmHotelUser = {
                    nome: admNome,
                    cpf: admCpf,
                    email: admEmail,
                    senha: admSenha,
                    tipo: "ADM_HOTEL",
                    hotelId: newHotelId,
                    hotelNome: nome,
                    foto: "avatar-bird"
                };

                
                if (!salvarEstado({ hoteis: [...dbData.hoteis, newHotel] }, combinarUsuarios(estadoDados.usuarios, [newAdmHotelUser]))) return;

                alert(`Hotel aprovado e gestor cadastrado: ${nome}. A conta pode acessar seu painel.`);
                formCadHotel.reset();
                if (modalCadHotel) modalCadHotel.classList.remove('active');
                renderHoteisTable();
            });
        }

        
        if (formCadCia) {
            formCadCia.addEventListener('submit', (e) => {
                e.preventDefault();
                const nome = document.getElementById('cad-cia-nome').value.trim();
                const codigoIata = document.getElementById('cad-cia-iata').value.trim().toUpperCase();
                const pais = document.getElementById('cad-cia-pais').value.trim();

                
                const admNome = document.getElementById('admvoo-nome').value.trim();
                const admCpf = document.getElementById('admvoo-cpf').value.trim();
                const admEmail = document.getElementById('admvoo-email').value.trim();
                const admSenha = document.getElementById('admvoo-senha').value.trim();

                if (!nome || !codigoIata || !pais || !admNome || !admCpf || !admEmail || !admSenha) {
                    alert('⚠️ Por favor, preencha todos os campos obrigatórios da companhia e do gestor ADMVOO.');
                    return;
                }

                if (dbData.companhias.some(c => normalizarBusca(c.codigoIata) === normalizarBusca(codigoIata) ||
                    normalizarBusca(c.nome) === normalizarBusca(nome))) {
                    return alert('Já existe uma companhia com este nome ou código IATA.');
                }
                const newCiaId = Date.now();
                const newCia = {
                    id: newCiaId,
                    nome,
                    codigoIata,
                    pais
                };

                if (dbData.usuarios.some(u => u.email.toLowerCase() === admEmail.toLowerCase() ||
                    u.cpf.replace(/\D/g, '') === admCpf.replace(/\D/g, ''))) {
                    return alert('Já existe uma conta com este CPF ou e-mail.');
                }
                const newAdmVooUser = {
                    nome: admNome,
                    cpf: admCpf,
                    email: admEmail,
                    senha: admSenha,
                    tipo: "ADM_VOO",
                    companhiaId: newCiaId,
                    companhiaNome: nome,
                    foto: "avatar-bird"
                };

                
                if (!salvarEstado({ companhias: [...dbData.companhias, newCia] }, combinarUsuarios(estadoDados.usuarios, [newAdmVooUser]))) return;

                alert(`Companhia aprovada e gestor cadastrado: ${nome}. A conta pode acessar seu painel.`);
                formCadCia.reset();
                if (modalCadCia) modalCadCia.classList.remove('active');
                renderCompanhiasTable();
            });
        }

        
        if (formCadCidade) {
            formCadCidade.addEventListener('submit', (e) => {
                e.preventDefault();
                const ibgeId = consultaIBGE.lerId();
                if (ibgeId === null) return;
                const nome = document.getElementById('cad-cid-nome').value.trim();
                const estado = document.getElementById('cad-cid-estado').value.trim();
                const pais = document.getElementById('cad-cid-pais').value.trim();

                if (!nome || !estado || !pais) return alert('Informe nome, estado e país.');
                const newCity = { id: gerarId(), nome, estado, pais };
                if (ibgeId) newCity.ibgeId = ibgeId;
                if (dbData.cidades.some(cidade => mesmaCidade(cidade, newCity))) {
                    return alert('Esta cidade já está cadastrada neste estado e país.');
                }

                if (!salvarEstado({ cidades: [...dbData.cidades, newCity] })) return;

                alert(`✅ Cidade "${nome} (${pais})" cadastrada com sucesso!`);
                formCadCidade.reset();
                consultaIBGE.resetar();
                populateCityDropdowns();
                if (modalCadCidade) modalCadCidade.classList.remove('active');
                renderCidadesTable();
            });
        }

        
        if (formCadAero) {
            formCadAero.addEventListener('submit', (e) => {
                e.preventDefault();
                const nome = document.getElementById('cad-aero-nome').value.trim();
                const codigo = document.getElementById('cad-aero-codigo').value.trim().toUpperCase();
                const cidade = document.getElementById('cad-aero-cidade').value.trim();
                const pais = document.getElementById('cad-aero-pais').value.trim();

                if (!nome || !codigo || !cidade || !pais) {
                    alert('⚠️ Preencha todos os campos do aeroporto.');
                    return;
                }

                const newAeroId = Date.now();
                const newAero = { id: newAeroId, nome, codigo, cidade, pais };

                if (!salvarEstado({ aeroportos: [...dbData.aeroportos, newAero] })) return;

                alert(`✅ Aeroporto "${nome} (${codigo})" cadastrado com sucesso!`);
                formCadAero.reset();
                if (modalCadAero) modalCadAero.classList.remove('active');
                renderAeroportosTable();
            });
        }

        
        function renderHoteisTable() {
            const tbody = document.getElementById('table-body-hoteis');
            if (!tbody) return;
            const hoteis = dbData.hoteis || [];
            if (hoteis.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="admin-empty-table"><i class="fa-solid fa-hotel"></i>Nenhum hotel cadastrado.</td></tr>';
                return;
            }

            tbody.innerHTML = hoteis.map((h, idx) => {
                
                const gestores = (dbData.usuarios || []).filter(u => u.tipo === 'ADM_HOTEL' && mesmoId(u.hotelId, h.id));
                const gestoresHtml = gestores.length > 0
                    ? gestores.map(g => `<div style="margin-bottom:3px;"><span class="badge-role adm-hotel"><i class="fa-solid fa-user-shield"></i> ADMHOTEL</span> <strong>${escaparHtml(g.nome)}</strong> <span style="color:#64748b;font-size:11px;">${escaparHtml(g.email)}</span></div>`).join('')
                    : '<span style="color:#94a3b8;font-size:12px;">Nenhum gestor</span>';

                return `
                    <tr>
                        <td><strong>${escaparHtml(h.nome)}</strong></td>
                        <td>${escaparHtml(h.cidade)}, ${escaparHtml(h.pais)}</td>
                        <td>${'⭐'.repeat(h.estrelas || 4)}</td>
                        <td>R$ ${(h.diaria || 0).toLocaleString('pt-BR')}/dia</td>
                        <td>${gestoresHtml}</td>
                        <td>
                            <button type="button" class="btn-table-action-del" data-type="hotel" data-index="${idx}" title="Excluir Hotel">
                                <i class="fa-solid fa-trash-can"></i> Excluir
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

            tbody.querySelectorAll('.btn-table-action-del').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    const hotel = dbData.hoteis[idx];
                    const reserva = referenciasDeReserva('hotel', hotel);
                    if (reserva === null) return alert('Não foi possível verificar as reservas do hotel.');
                    if (reserva) {
                        if (confirm('Este hotel tem reservas confirmadas. Desativar o serviço?') &&
                            salvarEstado({ hoteis: dbData.hoteis.map(h => mesmoId(h.id, hotel.id) ? { ...h, ativo: false } : h) })) renderHoteisTable();
                        return;
                    }
                    if (dbData.quartos.some(q => mesmoId(q.hotelId, hotel.id))) {
                        return alert('Este hotel ainda possui quartos vinculados.');
                    }
                    const gestoresDoHotel = (dbData.usuarios || []).filter(u => u.tipo === 'ADM_HOTEL' && mesmoId(u.hotelId, hotel.id));
                    if (confirm(`Deseja realmente excluir o hotel "${hotel.nome}" e seus ${gestoresDoHotel.length} gestor(es) associado(s)?`)) {
                        if (!salvarEstado({ hoteis: dbData.hoteis.filter((_, i) => i !== idx) }, estadoDados.usuarios.filter(u => String(u.hotelId) !== String(hotel.id)))) return;
                        renderHoteisTable();
                    }
                });
            });
        }

        function renderCompanhiasTable() {
            const tbody = document.getElementById('table-body-cias');
            if (!tbody) return;
            const cias = dbData.companhias || [];
            if (cias.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="admin-empty-table"><i class="fa-solid fa-building"></i>Nenhuma companhia aérea cadastrada.</td></tr>';
                return;
            }

            tbody.innerHTML = cias.map((c, idx) => {
                
                const gestores = (dbData.usuarios || []).filter(u => u.tipo === 'ADM_VOO' && mesmoId(u.companhiaId, c.id));
                const gestoresHtml = gestores.length > 0
                    ? gestores.map(g => `<div style="margin-bottom:3px;"><span class="badge-role adm-voo"><i class="fa-solid fa-user-shield"></i> ADMVOO</span> <strong>${escaparHtml(g.nome)}</strong> <span style="color:#64748b;font-size:11px;">${escaparHtml(g.email)}</span></div>`).join('')
                    : '<span style="color:#94a3b8;font-size:12px;">Nenhum gestor</span>';

                return `
                    <tr>
                        <td><strong>${escaparHtml(c.nome)}</strong></td>
                        <td><span class="code-badge" style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:4px; font-weight:800;">${escaparHtml(c.codigoIata)}</span></td>
                        <td>${escaparHtml(c.pais)}</td>
                        <td>${gestoresHtml}</td>
                        <td>
                            <button type="button" class="btn-table-action-del" data-type="cia" data-index="${idx}" title="Excluir Companhia">
                                <i class="fa-solid fa-trash-can"></i> Excluir
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

            tbody.querySelectorAll('.btn-table-action-del').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    const cia = dbData.companhias[idx];
                    if (dbData.voos.some(v => mesmoId(v.companhiaId, cia.id))) return alert('Esta companhia ainda possui voos vinculados.');
                    const gestoresDaCia = (dbData.usuarios || []).filter(u => u.tipo === 'ADM_VOO' && mesmoId(u.companhiaId, cia.id));
                    if (confirm(`Deseja realmente excluir a companhia "${cia.nome}" e seus ${gestoresDaCia.length} gestor(es) associado(s)?`)) {
                        if (!salvarEstado({ companhias: dbData.companhias.filter((_, i) => i !== idx) }, estadoDados.usuarios.filter(u => String(u.companhiaId) !== String(cia.id)))) return;
                        renderCompanhiasTable();
                    }
                });
            });
        }

        function renderCidadesTable() {
            const tbody = document.getElementById('table-body-cidades');
            if (!tbody) return;
            const cidades = dbData.cidades || [];
            if (cidades.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="admin-empty-table"><i class="fa-solid fa-city"></i>Nenhuma cidade cadastrada.</td></tr>';
                return;
            }

            tbody.innerHTML = cidades.map((c, idx) => `
                <tr>
                    <td>#${c.id}</td>
                    <td><strong>${escaparHtml(c.nome)}</strong></td>
                    <td>${escaparHtml(c.estado || '-')}</td>
                    <td>${escaparHtml(c.pais)}</td>
                    <td>
                        <button type="button" class="btn-table-action-del" data-type="cidade" data-index="${idx}" title="Excluir Cidade">
                            <i class="fa-solid fa-trash-can"></i> Excluir
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-table-action-del').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    const cid = dbData.cidades[idx];
                    if (confirm(`Deseja excluir a cidade "${cid.nome}"?`)) {
                        if (!salvarEstado({ cidades: dbData.cidades.filter((_, i) => i !== idx) })) return;
                        populateCityDropdowns();
                        renderCidadesTable();
                    }
                });
            });
        }

        function renderAeroportosTable() {
            const tbody = document.getElementById('table-body-aeroportos');
            if (!tbody) return;
            const aeroportos = dbData.aeroportos || [];
            if (aeroportos.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="admin-empty-table"><i class="fa-solid fa-plane-departure"></i>Nenhum aeroporto cadastrado.</td></tr>';
                return;
            }

            tbody.innerHTML = aeroportos.map((a, idx) => `
                <tr>
                    <td><strong>${a.nome}</strong></td>
                    <td><span class="code-badge" style="background:#fef3c7; color:#b45309; padding:3px 8px; border-radius:4px; font-weight:800;">${a.codigo}</span></td>
                    <td>${a.cidade}</td>
                    <td>${a.pais}</td>
                    <td>
                        <button type="button" class="btn-table-action-del" data-type="aeroporto" data-index="${idx}" title="Excluir Aeroporto">
                            <i class="fa-solid fa-trash-can"></i> Excluir
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-table-action-del').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    const aero = dbData.aeroportos[idx];
                    if (confirm(`Deseja excluir o aeroporto "${aero.nome}"?`)) {
                        if (!salvarEstado({ aeroportos: dbData.aeroportos.filter((_, i) => i !== idx) })) return;
                        renderAeroportosTable();
                    }
                });
            });
        }
    }

    const perfis = PERFIS_POR_PAINEL[document.body.id];
    if (perfis && (!perfis.includes(usuarioAtual()?.tipo) ||
        (document.body.id !== 'solicitacao-page' && !gestorAprovado(usuarioAtual())))) {
        const main = document.querySelector('main');
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Entre com o perfil administrativo correspondente para acessar este painel.';
        const voltar = document.createElement('a');
        voltar.href = 'index.html';
        voltar.textContent = 'Voltar ao site';
        main.replaceChildren(mensagem, voltar);
        main.classList.add('admin-acesso-restrito');
        document.querySelectorAll('.admin-secoes a[href^="#"]').forEach(link => link.remove());
        document.querySelectorAll('.admin-modal-overlay').forEach(modal => modal.remove());
    } else if (document.body.id === 'admin-page') {
        initAdminPanel();
    } else if (document.body.id === 'admin-hotel-page') {
        initAdminHotelPanel(dbData, salvarEstado, usuarioAtual);
    } else if (document.body.id === 'admin-voo-page') {
        initAdminVooPanel(dbData, salvarEstado, usuarioAtual);
    } else if (document.body.id === 'solicitacao-page') {
        initPainelSolicitacao();
    }
    if (perfis) document.body.classList.add('painel-verificado');

    window.addEventListener('storage', evento => {
        if (evento.key === CHAVE_SESSAO || evento.key === null) window.location.reload();
    });
    window.addEventListener('pageshow', evento => {
        if (evento.persisted) window.location.reload();
    });


});

function initAdminHotelPanel(dbData, salvarEstado, usuarioAtual) {
    const status = document.getElementById('status-solicitacao-hotel');
    const conta = usuarioAtual();
    const hotel = dbData.hoteis.find(h => mesmoId(h.id, conta.hotelId));
    status.textContent = hotel ? hotel.nome + ' · ' + hotel.statusAprovacao : '';
    const blocoDados = document.getElementById('dados-meu-hotel');
    const formularioEdicao = document.getElementById('form-edicao-hotel');
    const diariaEdicao = document.getElementById('editar-hotel-diaria');
    const comodidadesEdicao = document.getElementById('editar-hotel-comodidades');
    if (blocoDados) blocoDados.hidden = !hotel;
    if (formularioEdicao) formularioEdicao.hidden = !hotel;
    if (hotel) {
        document.getElementById('info-hotel-vinculado').textContent = `${hotel.nome} · ${hotel.cidade}, ${hotel.pais}`;
        document.getElementById('status-meu-hotel').textContent = hotel.statusAprovacao;
        diariaEdicao.value = hotel.diaria ?? 0;
        comodidadesEdicao.value = (hotel.amenities || []).join(', ');
        formularioEdicao.addEventListener('submit', evento => {
            evento.preventDefault();
            const usuario = usuarioAtual();
            if (usuario?.tipo !== 'ADM_HOTEL' || !mesmoId(usuario.hotelId, hotel.id)) return;
            const atual = dbData.hoteis.find(h => mesmoId(h.id, usuario.hotelId) && hotelPublicado(h));
            if (!atual) return;
            const diaria = Number(diariaEdicao.value);
            const amenities = comodidadesEdicao.value.split(',').map(c => c.trim()).filter(Boolean);
            if (!Number.isFinite(diaria) || diaria < 0 || amenities.some(c => c.length > 80)) {
                return alert('Confira a diária e os nomes das comodidades.');
            }
            const novo = { ...atual, diaria, amenities };
            if (!salvarEstado({ hoteis: dbData.hoteis.map(h => mesmoId(h.id, novo.id) ? novo : h) })) return;
            alert('Informações do hotel atualizadas.');
        });
    }
    function hotelDoGestor() {
        const u = usuarioAtual();
        return u?.tipo === 'ADM_HOTEL' && dbData.hoteis.find(h => mesmoId(h.id, u.hotelId));
    }
    for (const id of ['btn-open-cad-quarto', 'btn-open-list-quarto', 'btn-open-list-reservas-hotel']) {
        document.getElementById(id).disabled = !hotel;
    }
    if (!window.dbData) window.dbData = {};

    function openModal(id) { const el = document.getElementById(id); if (el) el.classList.add('active'); }
    function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('active'); }

    document.querySelectorAll('.btn-close-admin-modal').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.close));
    });
    document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
    });

    const btnCadQuarto = document.getElementById('btn-open-cad-quarto');
    if (btnCadQuarto) btnCadQuarto.addEventListener('click', () => openModal('modal-cad-quarto'));

    const btnListQuarto = document.getElementById('btn-open-list-quarto');
    if (btnListQuarto) btnListQuarto.addEventListener('click', () => { renderQuartosTable(); openModal('modal-list-quarto'); });

    const btnListReservas = document.getElementById('btn-open-list-reservas-hotel');
    if (btnListReservas) btnListReservas.addEventListener('click', () => { renderReservasHotelTable(); openModal('modal-list-reservas-hotel'); });

    const formCadQuarto = document.getElementById('form-cad-quarto');
    if (formCadQuarto) {
        formCadQuarto.addEventListener('submit', (e) => {
            e.preventDefault();
            const hotel = hotelDoGestor();
            if (!hotel) return;
            const novoQuarto = {
                hotelId: hotel.id,
                id: Date.now(),
                tipo: document.getElementById('cad-quarto-tipo').value,
                numero: document.getElementById('cad-quarto-numero').value.trim(),
                capacidade: document.getElementById('cad-quarto-capacidade').value,
                diaria: parseFloat(document.getElementById('cad-quarto-diaria').value).toFixed(2),
                comodidades: document.getElementById('cad-quarto-comodidades').value.trim(),
                status: document.getElementById('cad-quarto-status').value
            };
            if (!novoQuarto.tipo || !novoQuarto.numero) { alert('Preencha todos os campos obrigatórios!'); return; }
            if (!salvarEstado({ quartos: [...dbData.quartos, novoQuarto] })) return;
            formCadQuarto.reset();
            closeModal('modal-cad-quarto');
            alert('Quarto ' + novoQuarto.numero + ' (' + novoQuarto.tipo + ') cadastrado com sucesso!');
        });
    }

    function renderQuartosTable() {
        const tbody = document.getElementById('table-body-quartos');
        if (!tbody) return;
        const hotel = hotelDoGestor();
        const quartos = dbData.quartos.filter(q => hotel && mesmoId(q.hotelId, hotel.id));
        if (!quartos.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="admin-empty-table">Nenhum quarto cadastrado ainda.</td></tr>';
            return;
        }
        tbody.innerHTML = quartos.map((q, idx) => {
            const sl = q.status === 'disponivel' ? 'Disponivel' : q.status === 'ocupado' ? 'Ocupado' : 'Manutencao';
            return '<tr><td>' + q.numero + '</td><td>' + q.tipo + '</td><td>' + q.capacidade + ' pessoa(s)</td><td>R$ ' + q.diaria + '</td><td>' + sl + '</td><td><button class="btn-table-action-del" data-index="' + idx + '"><i class="fa-solid fa-trash"></i></button></td></tr>';
        }).join('');
        tbody.querySelectorAll('.btn-table-action-del').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                const quarto = quartos[idx];
                const hotel = hotelDoGestor();
                if (!quarto || !hotel || !mesmoId(quarto.hotelId, hotel.id)) return;
                const reserva = referenciasDeReserva('hotel', hotel);
                if (reserva === null) return alert('Não foi possível verificar as reservas.');
                if (confirm(reserva ? 'Há reserva confirmada no hotel. Desativar este quarto?' : 'Excluir este quarto?')) {
                    const atualizados = reserva
                        ? dbData.quartos.map(q => mesmoId(q.id, quarto.id) ? { ...q, status: 'manutencao' } : q)
                        : dbData.quartos.filter(q => !mesmoId(q.id, quarto.id));
                    if (!salvarEstado({ quartos: atualizados })) return;
                    renderQuartosTable();
                }
            });
        });
    }

    function renderReservasHotelTable() {
        const tbody = document.getElementById('table-body-reservas-hotel');
        if (!tbody) return;
        const hotel = hotelDoGestor();
        const reservas = (reservasDoServico('hotel') || [])
            .filter(r => hotel && mesmoId(r.hotelId, hotel.id));
        if (reservas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="admin-empty-table">Nenhuma reserva de hotel registrada ainda.</td></tr>';
            return;
        }
        tbody.replaceChildren();
        reservas.forEach(r => linhaAdmin(tbody, [r.hospede, r.quarto, r.checkin, r.checkout, 'R$ ' + r.total, r.status]));
    }
}

function initAdminVooPanel(dbData, salvarEstado, usuarioAtual) {
    const usuario = usuarioAtual();
    const companhia = dbData.companhias.find(c => mesmoId(c.id, usuario?.companhiaId));
    const info = document.getElementById('identificacao-companhia');
    const situacao = document.getElementById('situacao-companhia');
    if (info) info.textContent = usuario?.tipo === 'ADM_GERAL' ? 'Visão global de todas as companhias.' :
        `${companhia?.nome || 'Companhia não localizada'} · ${companhia?.codigoIata || '-'} · ${companhia?.pais || '-'}`;
    if (situacao) situacao.textContent = usuario?.tipo === 'ADM_GERAL' ? 'Status: administração geral' : 'Status: aprovada';
    const porId = id => document.getElementById(id);
    const campo = nome => porId('cad-voo-' + nome);
    const form = porId('form-cad-voo');
    const modal = porId('modal-cad-voo');
    const lista = porId('modal-list-voo');
    const corpo = porId('table-body-voos-cia');
    const seletor = campo('companhia');
    const campos = ['numero', 'classe', 'origem', 'destino', 'partida', 'chegada', 'preco', 'assentos'];
    let editando = null;
    function permitido(voo) {
        const u = usuarioAtual();
        return u?.tipo === 'ADM_GERAL' || (u?.tipo === 'ADM_VOO' && mesmoId(u.companhiaId, voo.companhiaId));
    }
    if (usuarioAtual()?.tipo === 'ADM_GERAL') {
        seletor.parentElement.hidden = false;
        dbData.companhias.forEach(c => seletor.add(new Option(c.nome, c.id)));
    }

    document.querySelectorAll('.btn-close-admin-modal').forEach(b =>
        b.addEventListener('click', () => porId(b.dataset.close)?.classList.remove('active')));
    document.querySelectorAll('.admin-modal-overlay').forEach(m =>
        m.addEventListener('click', e => { if (e.target === m) m.classList.remove('active'); }));

    function abrir(voo) {
        if (voo && !permitido(voo)) return;
        const usuario = usuarioAtual();
        if (!usuario || !['ADM_GERAL', 'ADM_VOO'].includes(usuario.tipo)) return;
        editando = voo?.id ?? null;
        form.reset();
        modal.querySelector('h2, h3').textContent = voo ? 'Editar voo' : 'Cadastrar voo';
        campos.forEach(nome => { if (voo?.[nome] != null) campo(nome).value = String(voo[nome]); });
        if (voo?.companhiaId != null) seletor.value = voo.companhiaId;
        if (voo && !voo.partida) campo('partida').title = 'Informe a data. Horário anterior: ' + voo.horarioPartida;
        else campo('partida').removeAttribute('title');
        if (voo && !voo.chegada) campo('chegada').title = 'Informe a data. Horário anterior: ' + voo.horarioChegada;
        else campo('chegada').removeAttribute('title');
        lista.classList.remove('active');
        modal.classList.add('active');
    }
    porId('btn-open-cad-voo').addEventListener('click', () => abrir());
    porId('btn-open-list-voo').addEventListener('click', () => {
        renderizar();
        lista.classList.add('active');
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const anterior = dbData.voos.find(v => mesmoId(v.id, editando));
        if (editando !== null && (!anterior || !permitido(anterior))) return;
        const u = usuarioAtual();
        const id = u?.tipo === 'ADM_GERAL' ? seletor.value : u?.companhiaId;
        const cia = dbData.companhias.find(c => mesmoId(c.id, id));
        if (!cia || !permitido({ companhiaId: cia.id })) return alert('Companhia inválida para este perfil.');
        const voo = { ...anterior, id: anterior?.id ?? gerarId(),
            companhiaId: cia.id, companhia: cia.nome };
        campos.forEach(nome => { voo[nome] = campo(nome).value.trim(); });
        voo.preco = Number(voo.preco);
        voo.assentos = Number(voo.assentos);
        if (!voo.numero || !voo.origem || !voo.destino) return alert('Informe número, origem e destino.');
        if (!Number.isFinite(voo.preco) || voo.preco < 0 || !Number.isInteger(voo.assentos) || voo.assentos < 1) {
            return alert('Informe um preço válido e pelo menos um assento.');
        }
        if (voo.partida >= voo.chegada) return alert('A chegada deve ser posterior à partida.');
        if (dbData.voos.some(v => !mesmoId(v.id, voo.id) && mesmoId(v.companhiaId, voo.companhiaId) &&
            normalizarBusca(v.numero || '') === normalizarBusca(voo.numero) && v.partida === voo.partida)) {
            return alert('Já existe um voo com esse número e essa partida na companhia.');
        }
        const voos = anterior ? dbData.voos.map(v => mesmoId(v.id, voo.id) ? voo : v) : [...dbData.voos, voo];
        if (!salvarEstado({ voos })) return;
        modal.classList.remove('active');
        renderizar();
        lista.classList.add('active');
    });

    function remover(id) {
        const voo = dbData.voos.find(v => mesmoId(v.id, id));
        if (!voo || !permitido(voo)) return;
        const reserva = referenciasDeReserva('voo', voo);
        if (reserva === null) return alert('Não foi possível verificar as reservas.');
        if (!confirm(reserva ? 'Há reserva confirmada. Desativar este voo?' : 'Excluir este voo?')) return;
        const voos = reserva ? dbData.voos.map(v => mesmoId(v.id, id) ? { ...v, ativo: false } : v)
            : dbData.voos.filter(v => !mesmoId(v.id, id));
        if (salvarEstado({ voos })) renderizar();
    }

    function renderizar() {
        corpo.replaceChildren();
        const voos = dbData.voos.filter(permitido);
        if (!voos.length) return linhaVazia(corpo, 8, 'Nenhum voo disponível para este perfil.');
        voos.forEach(v => {
            const linha = linhaAdmin(corpo, [v.numero || v.id, v.origem, v.destino, v.horarioPartida,
                v.horarioChegada, 'R$ ' + v.preco.toFixed(2), v.assentos]);
            const acoes = linha.insertCell();
            botaoAdmin(acoes, 'Editar ' + (v.numero || v.id), () => abrir(v));
            if (v.ativo !== false) botaoAdmin(acoes, 'Excluir ' + (v.numero || v.id), () => remover(v.id));
            else acoes.append(' Desativado');
        });
    }
    porId('btn-open-list-reservas-voo').addEventListener('click', () => {
        const tbody = porId('table-body-reservas-voo');
        const reservas = (reservasDoServico('voo') || []).filter(r =>
            usuarioAtual()?.tipo === 'ADM_GERAL' || dbData.voos.some(v => mesmoId(v.id, r.vooId) && permitido(v)));
        tbody.replaceChildren();
        if (!reservas.length) linhaVazia(tbody, 7, 'Nenhuma reserva vinculada a este painel.');
        reservas.forEach(r => linhaAdmin(tbody, [r.passageiro, r.voo || r.vooId, r.origem, r.destino, r.data, r.valor, r.status]));
        porId('modal-list-reservas-voo').classList.add('active');
    });
}

function linhaAdmin(tbody, valores) {
    const linha = tbody.insertRow();
    valores.forEach(valor => { linha.insertCell().textContent = valor ?? '—'; });
    return linha;
}

function linhaVazia(tbody, colunas, mensagem) {
    const celula = linhaAdmin(tbody, [mensagem]).cells[0];
    celula.colSpan = colunas;
    celula.className = 'admin-empty-table';
}

function botaoAdmin(container, rotulo, acao) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-admin-visualizar';
    botao.textContent = rotulo;
    botao.addEventListener('click', acao);
    container.append(botao);
}
