// Helpers
const $ = (s, o=document) => o.querySelector(s);
const $$ = (s, o=document) => [...o.querySelectorAll(s)];

// Dynamic year in footer
$('#year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = $('#navToggle');
const navMenu = $('#nav-menu');
if (navToggle && navMenu){
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
  });
  // Close menu on link click
  $$('#nav-menu a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Reveal-on-scroll using IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('reveal-visible');
  });
}, { threshold: 0.16 });

$$('.reveal-up').forEach(el => io.observe(el));

// Testimonials slider
(function slider(){
  const slides = $('#slides');
  const prev = $('#prevBtn');
  const next = $('#nextBtn');
  if(!slides || !prev || !next) return;
  let index = 0;
  const total = slides.children.length;

  function update(){
    slides.style.transform = `translateX(-${index * 100}%)`;
  }
  prev.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    update();
  });
  next.addEventListener('click', () => {
    index = (index + 1) % total;
    update();
  });
  // Auto-play
  setInterval(() => { index = (index + 1) % total; update(); }, 6000);
})();

// Contact form validation (frontend-only demo, PT-BR messages)
$('#contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name');
  const email = $('#email');
  const message = $('#message');
  let ok = true;

  const setErr = (el, msgId, msg) => { $(msgId).textContent = msg; if (msg) ok = false; };

  setErr(name, '#nameError', name.value.trim() ? '' : 'Por favor, informe seu nome.');
  setErr(email, '#emailError', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Informe um e-mail válido.');
  setErr(message, '#messageError', message.value.trim().length >= 10 ? '' : 'A mensagem deve ter ao menos 10 caracteres.');

  if(ok){
    alert('Obrigado! Sua mensagem foi enviada.');
    e.target.reset();
  }
});
