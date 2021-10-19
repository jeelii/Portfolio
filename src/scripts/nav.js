/* Sticky */

window.onscroll = () => {
  stickIt();
};

const navbar = document.querySelector('.nav');
const nav = document.querySelector('.nav__wrap');
const menuLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');

const sticky =
  navbar.offsetTop > sections[1].offsetTop - 100
    ? navbar.offsetTop
    : sections[1].offsetTop - 53;

const stickIt = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
};

/* Handle scrolls */

let scrollpos = window.scrollY;
let activePage = 'home';

const add_nav_class = () => navbar.classList.add('fade-in');
const remove_nav_class = () => navbar.classList.remove('fade-in');

const setActiveLink = (activePage) => {
  let target;
  menuLinks.forEach((link) => {
    target = link.querySelector('a').getAttribute('href').replace(/[^\w]/, '');
    if (target === activePage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;

  if (scrollpos >= sticky) {
    add_nav_class();
  } else {
    remove_nav_class();
  }

  sections.forEach((section) => {
    if (scrollpos >= section.offsetTop - 100) {
      activePage = section.getAttribute('id');
    }
  });
  if (history.pushState) {
    history.pushState(null, null, `#${activePage}`);
  } else {
    location.hash = `#${activePage}`;
  }
  setActiveLink(activePage);
});

/* Handle clicks */

const toggleMenu = () => {
  if (scrollpos <= sections[1].offsetTop) {
    window.scrollTo(0, sections[1].offsetTop);
  }

  if (nav.classList.contains('visible')) {
    nav.classList.remove('visible');
  } else {
    nav.classList.add('visible');
  }
};

const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', toggleMenu);

menuLinks.forEach((link) => {
  link.addEventListener('click', toggleMenu);
  link.addEventListener('click', remove_nav_class);
});
