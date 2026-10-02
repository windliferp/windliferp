const links = [...document.querySelectorAll('.rule-link')];
const cards = [...document.querySelectorAll('.rule-card')];

function activate(id) {
  links.forEach(link => link.classList.toggle('active', link.dataset.target === id));
}

links.forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activate(link.dataset.target);
  });
});

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) activate(visible.target.id);
}, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .2, .5, .8] });

cards.forEach(card => observer.observe(card));
