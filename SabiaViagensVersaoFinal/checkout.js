
function iniciarCheckout({ usuarioAtual, dbData, saveStoredCart, escaparHtml, atualizarDadosDeConta, abrirLogin }) {
    const campo = id => document.getElementById(id);
    const form = campo('form-checkout');
    const erro = campo('checkout-erro');
    const botao = campo('checkout-confirmar');
    let leitura;
    let itens = [];
    let total;
    let quantidadeViajantes = 0;
    let processando = false;

    function dataBR(data) {
        return data ? data.split('-').reverse().join('/') : '';
    }

    function quantidadeComRotulo(valor, unitario, plural) {
        return valor + ' ' + (valor === 1 ? unitario : plural);
    }

    function detalhesDoItem(item) {
        if (item.tipo === 'hotel') {
            const datas = item.checkin ? dataBR(item.checkin) + ' a ' + dataBR(item.checkout) : 'Datas no formulário';
            return quantidadeComRotulo(item.quantidade, 'noite', 'noites') + ' · ' +
                quantidadeComRotulo(item.hospedes || 1, 'hóspede', 'hóspedes') + ' · ' + datas;
        }
        const datas = item.voos.length
            ? item.voos.map(voo => [item.voos.length > 1 ? [voo.origem, voo.destino].filter(Boolean).join(' → ') : '',
                dataBR(voo.data), [voo.partida, voo.chegada].filter(Boolean).map(hora => hora.includes('T') ? hora.slice(11, 16) : hora).join('–')].filter(Boolean).join(' · ')).join(' / ')
            : dataBR(item.data);
        return quantidadeComRotulo(item.quantidade, 'viajante', 'viajantes') + (datas ? ' · ' + datas : '');
    }

    function listar(itensCompra, destino) {
        const html = itensCompra.map(item =>
            '<li><div><span class="checkout-tipo">' + escaparHtml(item.rotulo) + '</span><strong>' +
            escaparHtml(item.titulo) + '</strong><span>' + escaparHtml(item.sub) + '</span><small>' +
            escaparHtml(detalhesDoItem(item)) + '</small><small>' + moedaSabia(item.unitario) +
            (item.tipo === 'hotel' ? ' por diária' : ' por viajante') + '</small></div><b>' +
            moedaSabia(item.subtotal) + '</b></li>');
        destino.innerHTML = html.join('');
    }

    function montarItens(cart) {
        return cart.map((item, i) => {
            const tipo = tipoItem(item);
            const hotelId = item.hotelId ?? (tipo === 'hotel' ? String(item.id).replace(/^HOTEL-/, '') : null);
            const voos = item.voos?.map(voo => ({ ...voo })) || [];
            if (tipo === 'voo' && !voos.length && !String(item.id).startsWith('PROMO-')) {
                const voo = dbData.voos.find(v => mesmoId(v.id, item.id));
                voos.push({ id: item.id, origem: voo?.origem || '', destino: voo?.destino || '',
                    data: item.ida || voo?.partida?.slice(0, 10) || '', partida: voo?.horarioPartida || '', chegada: voo?.horarioChegada || '' });
            }
            // Carrinhos antigos armazenavam as referências de vários trechos no próprio ID.
            if (String(item.id).startsWith('MULTI-') && !item.voos?.length) {
                try {
                    const ids = JSON.parse(item.id.slice(6));
                    if (Array.isArray(ids)) {
                        voos.splice(0, voos.length, ...ids.map(id => {
                            const v = dbData.voos.find(voo => mesmoId(voo.id, id));
                            return { id, origem: v?.origem || '', destino: v?.destino || '', data: v?.partida?.slice(0, 10) || '' };
                        }));
                    }
                } catch { /* A conferência do catálogo sinaliza referência inválida. */ }
            }
            const quantidade = quantidadeItem(item);
            return { tipo, rotulo: item.type || 'Serviço', titulo: item.title, sub: item.sub || '',
                unitario: Number(item.price), quantidade, subtotal: total.itens[i],
                hotelId, checkin: item.checkin || '', checkout: adicionarNoites(item.checkin, quantidade),
                hospedes: item.hospedes || 1, data: item.ida || '', voos };
        });
    }

    function mostrarResumo() {
        listar(itens, campo('checkout-itens'));
        campo('checkout-subtotal').textContent = moedaSabia(total.subtotal);
        campo('checkout-total').textContent = moedaSabia(total.total);
        campo('checkout-desconto-linha').hidden = !total.desconto;
        campo('checkout-desconto').textContent = '− ' + moedaSabia(total.desconto);
    }

    function montarFormulario() {
        quantidadeViajantes = Math.max(0, ...itens.filter(i => i.tipo !== 'hotel').map(i => i.quantidade));
        campo('checkout-passageiros').hidden = !quantidadeViajantes;
        campo('checkout-nomes').innerHTML = Array.from({ length: quantidadeViajantes }, (_, i) =>
            '<fieldset class="checkout-viajante"><legend>Viajante ' + (i + 1) + '</legend><div class="checkout-campos">' +
            '<label>Nome<input name="nome-' + i + '" required maxlength="80"></label>' +
            '<label>Sobrenome<input name="sobrenome-' + i + '" required maxlength="80"></label></div></fieldset>').join('');
        const hoteis = itens.some(i => i.tipo === 'hotel');
        campo('checkout-responsavel-linha').hidden = !hoteis;
        form.elements.responsavel.required = hoteis;
        campo('checkout-hospedagem').hidden = !hoteis;
        campo('checkout-hoteis').innerHTML = itens.map((item, i) => item.tipo === 'hotel' ?
            '<fieldset class="checkout-viajante"><legend>' + escaparHtml(item.titulo) + '</legend><div class="checkout-campos checkout-campos-hotel">' +
            '<label>Hóspedes<input name="hospedes-' + i + '" type="number" min="1" max="99" required value="' + Number(item.hospedes) + '"></label>' +
            '<label>Check-in<input name="checkin-' + i + '" type="date" value="' + escaparHtml(item.checkin) + '" required></label>' +
            '<label>Check-out<input name="checkout-' + i + '" type="date" value="' + escaparHtml(item.checkout) + '" readonly></label>' +
            '</div><small>' + quantidadeComRotulo(item.quantidade, 'noite', 'noites') + ' no carrinho. Ajuste a quantidade no carrinho para mudar a duração.</small></fieldset>' : '').join('');
        const datas = itens.flatMap((item, i) => {
            if (item.tipo === 'hotel') return [];
            if (!item.voos.length) return item.data ? [] : [{ nome: item.titulo, campo: 'data-' + i }];
            return item.voos.flatMap((voo, j) => voo.data ? [] : [{
                nome: [voo.origem, voo.destino].filter(Boolean).join(' → ') || item.titulo, campo: 'trecho-' + i + '-' + j
            }]);
        });
        campo('checkout-datas').hidden = !datas.length;
        campo('checkout-datas-campos').innerHTML = datas.map(data =>
            '<label>' + escaparHtml(data.nome) + '<input type="date" required name="' + data.campo + '"></label>').join('');
        form.elements.contato.value = usuarioAtual()?.email || '';
        form.elements.responsavel.value = hoteis ? usuarioAtual()?.nome || '' : '';
    }

    function lerDatas() {
        itens.forEach((item, i) => {
            if (item.tipo === 'hotel') {
                item.checkin = form.elements['checkin-' + i].value;
                item.checkout = adicionarNoites(item.checkin, item.quantidade);
                item.hospedes = Number(form.elements['hospedes-' + i].value);
                form.elements['checkout-' + i].value = item.checkout;
            } else {
                item.data = form.elements['data-' + i]?.value || item.data;
                item.voos.forEach((voo, j) => { voo.data = form.elements['trecho-' + i + '-' + j]?.value ?? voo.data; });
            }
        });
    }

    const metodoRotulo = metodo => metodo === 'pix_simulado' ? 'PIX simulado' : 'Cartão simulado';
    function mostrarHistorico(reservas, usuario, codigo) {
        const minhas = reservas.filter(r => reservaDaConta(r, usuario)).reverse();
        const confirmado = minhas.find(r => r.codigo === codigo);
        const lista = campo('checkout-historico-lista');
        lista.replaceChildren();
        const aviso = campo('checkout-confirmacao');
        aviso.hidden = !confirmado;
        if (confirmado) campo('checkout-codigo').textContent = confirmado.codigo;
        if (!minhas.length) lista.textContent = 'Você ainda não tem reservas neste navegador.';
        minhas.forEach(reserva => {
            const card = document.createElement('article');
            card.className = 'checkout-card checkout-reserva';
            const tempo = new Date(reserva.confirmadaEm).toLocaleString('pt-BR');
            card.innerHTML = '<h2>' + escaparHtml(reserva.codigo) + '</h2><p>' + escaparHtml(tempo) + ' · ' +
                escaparHtml(reserva.status) + ' · ' + metodoRotulo(reserva.metodo) + '</p>' +
                '<ul class="checkout-lista"></ul><div class="checkout-total"><span>Total</span><strong>' +
                moedaSabia(reserva.total) + '</strong></div>';
            listar(reserva.itens, card.querySelector('ul'));
            lista.append(card);
        });
    }

    function atualizarTela() {
        const usuario = usuarioAtual();
        const fragmento = location.hash.slice(1);
        const verHistorico = fragmento === 'historico' || fragmento.startsWith('confirmada/');
        const reservas = lerReservasSabia();
        const mensagem = campo('checkout-mensagem');
        mensagem.hidden = true;
        erro.textContent = '';
        campo('checkout-pedido').hidden = true;
        campo('checkout-historico').hidden = !usuario || !verHistorico;
        campo('checkout-entrar').hidden = !!usuario;
        campo('checkout-titulo').textContent = verHistorico ? 'Minhas reservas' : 'Finalizar reserva';
        if (!usuario || reservas.estado === 'invalido') {
            mensagem.textContent = !usuario ? 'Entre com sua conta para ' + (verHistorico ? 'ver suas reservas.' : 'continuar com o carrinho atual.') :
                'Não foi possível ler as reservas deste navegador.';
            mensagem.hidden = false;
            return;
        }
        if (verHistorico) return mostrarHistorico(reservas.valor || [], usuario, fragmento.split('/')[1]);
        leitura = lerCarrinho();
        if (!leitura.valor?.length) {
            mensagem.textContent = leitura.estado === 'invalido' ? 'Não foi possível ler o carrinho. Os dados foram preservados.' : 'Seu carrinho está vazio.';
            mensagem.hidden = false;
            return;
        }
        if (!leitura.valor[0].lote && saveStoredCart(leitura.valor)) leitura = lerCarrinho();
        if (!leitura.valor[0].lote) {
            mensagem.textContent = 'Não foi possível preparar a reserva. Verifique o armazenamento e tente novamente.';
            mensagem.hidden = false;
            return;
        }
        const anterior = (reservas.valor || []).find(r => r.lote === leitura.valor[0].lote);
        if (anterior) {
            if (reservaDaConta(anterior, usuario)) {
                if (lerCarrinho().texto === leitura.texto) saveStoredCart([]);
                location.replace('#confirmada/' + anterior.codigo);
            } else {
                mensagem.textContent = 'Este carrinho já foi reservado. Altere os itens para iniciar outra reserva.';
                mensagem.hidden = false;
            }
            return;
        }
        if (leitura.valor.some(item => quantidadeItem(item) > 99)) {
            mensagem.textContent = 'Revise as quantidades no carrinho. Cada serviço aceita até 99 unidades na demonstração.';
            mensagem.hidden = false;
            return;
        }
        total = cotarCarrinho(leitura.valor);
        itens = montarItens(leitura.valor);
        montarFormulario();
        mostrarResumo();
        campo('checkout-pedido').hidden = false;
    }

    function confirmar() {
        const usuario = usuarioAtual();
        if (!usuario) { erro.textContent = 'Entre na sua conta para confirmar.'; return; }
        const cartAtual = lerCarrinho();
        const reservas = lerReservasSabia();
        if (cartAtual.texto !== leitura.texto || reservas.estado === 'invalido') {
            erro.textContent = 'O carrinho mudou ou as reservas estão inacessíveis. Atualize a página e confira sua compra.';
            return;
        }
        const lote = cartAtual.valor[0].lote;
        if ((reservas.valor || []).some(r => r.lote === lote)) {
            erro.textContent = 'Este carrinho já foi confirmado. Consulte Minhas reservas.';
            return;
        }

        atualizarDadosDeConta();
        const indisponivel = itens.find(item =>
            (item.hotelId != null && !dbData.hoteis.some(h => mesmoId(h.id, item.hotelId) && hotelPublicado(h))) ||
            item.voos.some(t => !dbData.voos.some(v => mesmoId(v.id, t.id) && v.ativo !== false &&
                dbData.companhias.some(c => mesmoId(c.id, v.companhiaId) && c.ativo !== false))));
        if (indisponivel) {
            erro.textContent = indisponivel.titulo + ' está indisponível. Revise o carrinho.';
            return;
        }

        lerDatas();
        const viajantes = Array.from({ length: quantidadeViajantes }, (_, i) =>
            [form.elements['nome-' + i].value.trim(), form.elements['sobrenome-' + i].value.trim()]);
        const responsavel = form.elements.responsavel.value.trim();
        if (viajantes.some(nomes => nomes.some(nome => !nome)) || (itens.some(i => i.tipo === 'hotel') && !responsavel)) {
            erro.textContent = 'Informe o nome completo dos viajantes ou do responsável pela hospedagem.';
            return;
        }
        const metodo = new FormData(form).get('pagamento');
        if (!['pix_simulado', 'cartao_simulado'].includes(metodo) || !form.elements.termos.checked) return;
        const reserva = { codigo: 'SAB-' + gerarId(), lote, contaId: usuario.id,
            contaEmail: usuario.email, confirmadaEm: new Date().toISOString(), status: 'Confirmada',
            contato: form.elements.contato.value.trim(), viajantes: viajantes.map(nome => nome.join(' ')),
            responsavel, metodo, itens, subtotal: total.subtotal, desconto: total.desconto, total: total.total };
        if (!gravarLocal(CHAVE_RESERVAS, [...(reservas.valor || []), reserva])) {
            erro.textContent = 'A reserva não foi gravada. Seu carrinho foi mantido.';
            return;
        }
        if (lerCarrinho().texto === leitura.texto) saveStoredCart([]);
        form.reset();
        location.replace('#confirmada/' + reserva.codigo);
    }

    form.addEventListener('invalid', () => {
        erro.textContent = 'Confira os campos obrigatórios e aceite os termos da simulação.';
    }, true);
    form.addEventListener('input', () => {
        erro.textContent = '';
        lerDatas();
        mostrarResumo();
        campo('checkout-pix').hidden = !form.elements.pix.checked;
        campo('checkout-cartao').hidden = !form.elements.cartao.checked;
    });
    form.addEventListener('submit', async evento => {
        evento.preventDefault();
        if (processando) return;
        processando = true;
        botao.disabled = true;
        try {
            if (navigator.locks) await navigator.locks.request('sabia-checkout', confirmar);
            else confirmar();
        } catch {
            erro.textContent = 'Não foi possível concluir a confirmação. Confira o histórico e tente novamente.';
        } finally {
            processando = false;
            botao.disabled = false;
        }
    });
    campo('checkout-entrar').addEventListener('click', abrirLogin);
    window.addEventListener('hashchange', atualizarTela);
    atualizarTela();
}

