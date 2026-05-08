const form = document.getElementById('cadastroForm');
const feedbackMessage = document.getElementById('feedbackMessage');
const campos = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    senha: document.getElementById('senha'),
    confirmaSenha: document.getElementById('confirmaSenha')
};

//valida os campos
const validadores = {
    nome: (val) => val.trim().length >= 3 ? {valido: true} : {valido: false, msg: 'Mínimo 3 caracteres'},
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? {valido: true} : {valido: false, msg: 'Formato inválido'},
    senha: (val) => {
        if (val.length < 8) return {valido: false, msg: 'Mínimo 8 caracteres'};
        if (!/[A-Z]/.test(val)) return {valido: false, msg: 'Precisa de 1 letra maiúscula'};
        if (!/[0-9]/.test(val)) return {valido: false, msg: 'Precisa de 1 número'};
        return {valido: true};
    },
    confirmaSenha: (val) => val === campos.senha.value && val !== '' ? {valido: true} : {valido: false, msg: 'As senhas não conferem'}
};


//aplica a validação visual
function aplicarValidacao(input, resultado) {
    const msgErro = document.getElementById(input.id + '-error');
    if (!resultado.valido) {
        input.classList.add('error');
        input.classList.remove('success');
        msgErro.textContent = resultado.msg;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        msgErro.textContent = '';
    }
}

function showFeedback(text, type = 'success') {
    feedbackMessage.textContent = text;
    feedbackMessage.className = `feedback-message ${type}`;
}

function clearFeedback() {
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback-message';
}

function validarFormulario() {
    let formularioValido = true;

    Object.keys(campos).forEach(key => {
        const campo = campos[key];
        const resultado = validadores[key](campo.value);
        aplicarValidacao(campo, resultado);
        if (!resultado.valido) {
            formularioValido = false;
        }
    });

    if (!formularioValido) {
        showFeedback('Revise os campos em vermelho e tente novamente.', 'error');
    } else {
        clearFeedback();
    }

    return formularioValido;
}

Object.keys(campos).forEach(key => {
    campos[key].addEventListener('blur', () => {
        const resultado = validadores[key](campos[key].value);
        aplicarValidacao(campos[key], resultado);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    setTimeout(() => {
        showFeedback('Cadastro realizado com sucesso!', 'success');
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Criar Conta';
        document.querySelectorAll('input').forEach(i => i.classList.remove('success'));
        setTimeout(clearFeedback, 5000);
    }, 2000);
});