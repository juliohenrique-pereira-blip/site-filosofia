const menuButton = document.querySelector('.menu');
const mobileNav = document.querySelector('.nav-mobile');
menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Fechar' : 'Menu';
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
  if(menuButton) menuButton.textContent='Menu';
}));
const filter = document.querySelector('#filter-publications');
const publications = [...document.querySelectorAll('.publication')];
const empty = document.querySelector('#empty-state');
filter?.addEventListener('change', ({target}) => {
  let count=0;
  publications.forEach(item=>{
    const visible = target.value==='all'||item.dataset.type===target.value;
    item.hidden=!visible;
    if(visible) count++;
  });
  empty.hidden=!!count;
});
document.querySelector('#year').textContent = new Date().getFullYear();
