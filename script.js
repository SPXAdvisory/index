const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('[data-nav]');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const leadForm = document.getElementById('leadForm');
const formNote = document.getElementById('formNote');

if (leadForm && formNote) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const lead = Object.fromEntries(formData.entries());
    const subject = encodeURIComponent(`Novo contato - ${lead.company || 'Landing Page'}`);
    const body = encodeURIComponent(
      `Nome: ${lead.name}\nEmpresa: ${lead.company}\nE-mail: ${lead.email}\nDesafio: ${lead.challenge}\nMensagem: ${lead.message || '-'}\n\nOrigem: Landing Page Projeto Alpha7`
    );

    formNote.textContent = 'Solicitação preparada. Seu aplicativo de e-mail será aberto para envio.';
    formNote.classList.add('success');

    window.location.href = `mailto:contato@suaempresa.com.br?subject=${subject}&body=${body}`;
    leadForm.reset();
  });
}
