window.onscroll = () => {
  stickIt();
};

const navbar = document.querySelector("nav");

const sticky = navbar.offsetTop;

const stickIt = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
