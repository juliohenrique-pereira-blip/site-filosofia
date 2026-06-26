const menuButton = document.querySelector('.menubtn');
const mobileNav = document.querySelector('#mobile-nav');
const dialog = document.querySelector('#contact-dialog');
const closeDialogButton = document.querySelector('.close-dialog');
const contactForm = document.querySelector('#contact-form');
const subjectLinks = document.querySelectorAll('[data-subject]');
let selectedSubject = 'Contato pelo site';

const closeMobileNav = () => {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  mobileNav.hidden = true;
};

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileNav.hidden = isOpen;
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileNav));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target?.tagName === 'DETAILS') target.open = true;
  });
});

subjectLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    selectedSubject = link.dataset.subject || 'Contato pelo site';
    dialog?.showModal();
  });
});

closeDialogButton?.addEventListener('click', () => dialog?.close());

dialog?.addEventListener('click', (event) => {
  const card = dialog.querySelector('.dialog-card');
  if (card && !card.contains(event.target)) dialog.close();
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(selectedSubject);
  const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);
  window.location.href = `mailto:juliohenrique-pereira@hotmail.com?subject=${subject}&body=${body}`;
  dialog?.close();
  contactForm.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
