const parent = document.getElementById("skills__items");
const tags = parent.getElementsByTagName("li");
const buttons = document.getElementsByClassName("skills__button");
const buttonReLoad = document.querySelector(".skills__button--reload");
const buttonSort = document.querySelector(".skills__button--sort");
const buttonLevel = document.querySelector(".skills__button--level");
const fragment = document.createDocumentFragment();

const renderTags = () => {
  while (tags.length) {
    const idx = Math.floor(Math.random() * tags.length);
    fragment.appendChild(tags[idx]);
  }
  parent.appendChild(fragment);
};

const filterTags = (category) => {
  for (let idx = 0; idx < tags.length; idx++) {
    if (!category || tags[idx].dataset.skillCategory === category) {
      tags[idx].classList.remove("skills__item--faded");
    } else {
      tags[idx].classList.add("skills__item--faded");
    }
  }
};

const sortTags = () => {
  Array.from(tags)
    .sort((a, b) => {
      return a.textContent.localeCompare(b.textContent);
    })
    .forEach((li) => parent.appendChild(li));
};

const sortTagsLevel = () => {
  renderTags();
  Array.from(tags)
    .sort((a, b) => {
      return b.dataset.skillLevel - a.dataset.skillLevel;
    })
    .forEach((li) => parent.appendChild(li));
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mouseover", () => {
    filterTags(buttons[i].dataset.skillCategory);
  });
  buttons[i].addEventListener("mouseout", () => filterTags());
}
buttonReLoad.addEventListener("click", renderTags);
buttonSort.addEventListener("click", sortTags);
buttonLevel.addEventListener("click", sortTagsLevel);

renderTags();
