// Burger button functionality
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById(burger.dataset.target);

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
});

// Documentation hide sections
document.querySelectorAll(".menu-list a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("data-section");

    // hide all sections as default
    document.querySelectorAll(".doc-section").forEach((section) => {
      section.classList.add("is-hidden");
    });

    // make sure to remove is-active in all sections
    document.querySelectorAll(".menu-list a").forEach((l) => {
      l.classList.remove("is-active");
    });

    // only show selected section
    const selectedSection = document.getElementById(target);
    if (selectedSection) {
      selectedSection.classList.remove("is-hidden");
    }

    // highlight active link
    link.classList.add("is-active");
  });
});

// Copyright year update
document.getElementById("year").textContent = new Date().getFullYear();
