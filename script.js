document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = "Enviando...";

  setTimeout(() => {
    status.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
    this.reset();
  }, 1500);
});
