const parent = document.getElementById("skills");
const tags = parent.getElementsByTagName("skills__item");
const fragment = document.createDocumentFragment();

// Randomize order of skills
while (tags.length) {
  fragment.appendChild(tags[Math.floor(Math.random() * tags.length)]);
}
parent.appendChild(fragment);
