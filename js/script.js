const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

function toggleTheme() {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        themeIcon.className = 'bx bx-moon theme-icon';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'bx bx-sun theme-icon';
        localStorage.setItem('theme', 'dark');
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.className = 'bx bx-moon theme-icon';
    } else {
        body.classList.remove('light-mode');
        hr.classList.remove('text-white');
        themeIcon.className = 'bx bx-sun theme-icon';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSavedTheme);
} else {
    loadSavedTheme();
}

themeToggle.addEventListener("click", toggleTheme);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formspreeUrl = 'https://formspree.io/f/mqardlao';

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' 
                }
            });

            if (response.ok) {
                alert('Mensagem enviada com sucesso! Obrigado!');
                form.reset(); // Limpa o formulário
            } else {
                const data = await response.json();
                if (data.errors) {
                    alert('Erro ao enviar: ' + data.errors.map(error => error.message).join(', '));
                } else {
                    alert('Houve um problema no envio da mensagem. Tente novamente.');
                }
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de conexão. Verifique sua rede.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        "Desenvolvedor em Formação",
        "Transformando Ideias em Código",
        "Desenvolvimento Front-end e Back-end",
        "Paixão em Programação"
    ];

    const element = document.getElementById('typing-text');
    let phraseIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseTime = 1500; 

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (charIndex < currentPhrase.length) {
            element.textContent += currentPhrase.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, pauseTime);
        }
    }

    function erase() {
        const currentPhrase = phrases[phraseIndex];

        if (charIndex > 0) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, deletingSpeed);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500); 
        }
    }

    type();
});