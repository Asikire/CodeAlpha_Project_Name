const modal = document.querySelector(".modal");
// const img = document.getElementById("img01");
const img = document.querySelector(".modal-content");
const captionText = document.getElementById("caption");
let currentImageIndex = 0;
const images = document.querySelectorAll(".gallery-item");

function openModal(index) {
  currentImageIndex = index;
  img.src = images[currentImageIndex].src;
  captionText.innerHTML = images[currentImageIndex].alt;
  modal.style.display = "block";
}

function changeImage(direction) {
  currentImageIndex += direction;

  // Possibilite de boucle a travers les images
  if (currentImageIndex < 0) {
    currentImageIndex = 0;
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = images.length - 1;
  }
  openModal(currentImageIndex);
}

images.forEach((item, index) => {
  item.addEventListener("click", () => openModal(index));
});

document.querySelector(".close").addEventListener("click", () => {
  modal.style.display = "none";
});
