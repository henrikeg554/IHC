const links = document.querySelectorAll('nav ul li a');
const secoes = document.querySelectorAll('section[id]');

function atualizarLinkAtivo() {
    let atual = secoes[0].id;
    secoes.forEach((secao) => {
        const topo = secao.offsetTop - 100;
        if (window.scrollY >= topo) {
            atual = secao.id;
        }
    });

    links.forEach((link) => {
        link.classList.remove('link-ativo');
        if (link.getAttribute('href') === '#' + atual) {
            link.classList.add('link-ativo');
        }
    });
}

window.addEventListener('scroll', atualizarLinkAtivo);
window.addEventListener('load', atualizarLinkAtivo);

const botaoTopo = document.getElementById('topo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        botaoTopo.classList.add('visivel');
    } else {
        botaoTopo.classList.remove('visivel');
    }
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function mostrarErro(campo, mensagem) {
    campo.classList.add('invalido');
    const erroEl = document.getElementById('erro-' + campo.id);
    if (erroEl) erroEl.textContent = mensagem;
}

function limparErro(campo) {
    campo.classList.remove('invalido');
    const erroEl = document.getElementById('erro-' + campo.id);
    if (erroEl) erroEl.textContent = '';
}

const formEncomenda = document.getElementById('form-encomenda');
const statusEncomenda = document.getElementById('status-encomenda');

formEncomenda.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let valido = true;

    const nome = document.getElementById('nome');
    const item = document.getElementById('item');
    const data = document.getElementById('data-retirada');

    [nome, item, data].forEach(limparErro);

    if (nome.value.trim() === '') {
        mostrarErro(nome, 'Por favor, informe seu nome.');
        valido = false;
    }

    if (item.value === '') {
        mostrarErro(item, 'Selecione um item para encomendar.');
        valido = false;
    }

    if (data.value === '') {
        mostrarErro(data, 'Escolha uma data de retirada.');
        valido = false;
    } else {
        const hoje = new Date().toISOString().split('T')[0];
        if (data.value < hoje) {
            mostrarErro(data, 'A data deve ser hoje ou uma data futura.');
            valido = false;
        }
    }

    statusEncomenda.classList.remove('sucesso', 'falha');

    if (valido) {
        statusEncomenda.textContent = 'Encomenda enviada com sucesso! Em breve entraremos em contato.';
        statusEncomenda.classList.add('sucesso');
        formEncomenda.reset();
    } else {
        statusEncomenda.textContent = 'Verifique os campos destacados em vermelho.';
        statusEncomenda.classList.add('falha');
    }
});

const formContato = document.getElementById('form-contato');
const statusContato = document.getElementById('status-contato');

formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let valido = true;

    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    [email, mensagem].forEach(limparErro);

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.value.trim())) {
        mostrarErro(email, 'Informe um e-mail válido (ex: nome@email.com).');
        valido = false;
    }

    if (mensagem.value.trim() === '') {
        mostrarErro(mensagem, 'Escreva uma mensagem antes de enviar.');
        valido = false;
    }

    statusContato.classList.remove('sucesso', 'falha');

    if (valido) {
        statusContato.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
        statusContato.classList.add('sucesso');
        formContato.reset();
    } else {
        statusContato.textContent = 'Verifique os campos destacados em vermelho.';
        statusContato.classList.add('falha');
    }
});
