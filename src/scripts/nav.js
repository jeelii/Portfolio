window.onscroll = () => {
  stickIt();
};

const navbar = document.querySelector("nav");
const nav = document.querySelector(".nav__wrap");

const sticky = navbar.offsetTop;

const stickIt = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

const toggleMenu = () => {
  if (nav.classList.contains("visible")) {
    nav.classList.remove("visible");
  } else {
    nav.classList.add("visible");
  }
};

const menuIcon = document.querySelector(".menu-icon");
const menuLinks = document.querySelectorAll(".nav__link");

menuIcon.addEventListener("click", toggleMenu);

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", toggleMenu);
});