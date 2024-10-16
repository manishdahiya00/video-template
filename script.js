let videos = [
  "video1.mp4",
  "video2.mp4",
  "video3.mp4",
  "video4.mp4",
  "video5.mp4",
  "video6.mp4",
];
let products = [
  {
    image: "https://placehold.co/600x600/EEE/31343C",
    name: "Advanced Hair Growth Serum",
    price: "₹799",
    oldPrice: "₹1,695",
  },
  {
    image: "https://placehold.co/600x600/EEE/31343C",
    name: "Anti-Aging Face Cream",
    price: "₹999",
    oldPrice: "₹2,099",
  },
  {
    image: "https://placehold.co/600x600/EEE/31343C",
    name: "Vitamin C Serum",
    price: "₹599",
    oldPrice: "₹1,299",
  },
  {
    image: "https://placehold.co/600x600/EEE/31343C",
    name: "Advanced Hair Growth Serum",
    price: "₹799",
    oldPrice: "₹1,695",
  },
  {
    image: "https://placehold.co/600x600/EEE/31343C",
    name: "Anti-Aging Face Cream",
    price: "₹999",
    oldPrice: "₹2,099",
  },
  {
    image: "https://placehold.co/600x600/EEE/31343C",
    name: "Vitamin C Serum",
    price: "₹599",
    oldPrice: "₹1,299",
  },
];

let currentVideoIndex = 0;
const popupVideoElement = document.getElementById("popup-video");
const prevVideoElement = document
  .getElementById("prev-video")
  .querySelector("video");
const nextVideoElement = document
  .getElementById("next-video")
  .querySelector("video");
const popupElement = document.getElementById("video-popup");

const productImageElement = document.querySelector(".cart-item img");
const productNameElement = document.querySelector(
  ".cart-details p:first-child"
);
const productPriceElement = document.querySelector(".cart-details .price");
const productOldPriceElement = document.querySelector(
  ".cart-details .old-price"
);

function openPopup(index) {
  currentVideoIndex = index;
  updatePopupVideos();
  updateProductDetails();
  popupElement.style.display = "flex";
}

function closePopup() {
  popupElement.style.display = "none";
  popupVideoElement.pause();
}

function updatePopupVideos() {
  popupVideoElement.src = videos[currentVideoIndex];
  const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  const nextIndex = (currentVideoIndex + 1) % videos.length;

  prevVideoElement.src = videos[prevIndex];
  nextVideoElement.src = videos[nextIndex];
}

function updateProductDetails() {
  const product = products[currentVideoIndex];
  productImageElement.src = product.image;
  productNameElement.textContent = product.name;
  productPriceElement.innerHTML =
    product.price + ' <span class="old-price">' + product.oldPrice + "</span>";
}

function nextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  updatePopupVideos();
  updateProductDetails();
}

function prevVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  updatePopupVideos();
  updateProductDetails();
}

function toggleMute() {
  popupVideoElement.muted = !popupVideoElement.muted;
  const muteBtn = document.getElementById("mute-btn");
  muteBtn.textContent = popupVideoElement.muted ? "🔇" : "🔊";
}

function likeVideo() {
  alert("You liked this video!");
}

function shareVideo() {
  alert("Share this video link: " + videos[currentVideoIndex]);
}

document.getElementById("add-to-cart").addEventListener("click", function () {
  const product = products[currentVideoIndex];
  alert("Added to cart: " + product.name + " - " + product.price);
});
