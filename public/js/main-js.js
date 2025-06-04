// Burger button functionality
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById(burger.dataset.target);

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
});

//Comparator functionality
function startComparator () {
const followers_list = document.getElementById('followers').value
console.log(followers_list);
}

document.getElementById('textarea-button').addEventListener('click', startComparator)


 // Copyright year update
document.getElementById('year').textContent = new Date().getFullYear();


