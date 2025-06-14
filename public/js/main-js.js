// Burger button functionality
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById(burger.dataset.target);

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
});

// Copyright year update
document.getElementById('year').textContent = new Date().getFullYear();


