const renderVideosDiv = document.getElementById("render-videos");

const leftBtn = document.createElement("button");
leftBtn.className = "leftBtn button";
const rightBtn = document.createElement("button");
rightBtn.className = "rightBtn button";

leftBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
rightBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8.59 7.41L10 6l6 6-6 6-1.41-1.41L13.17 12z"/></svg>`;

const fetchData = async () => {
  const videoId = document.getElementById("video").attributes.data.value;
  const response = await fetch(`http://127.0.0.1:3000/videos/${videoId}`);
  const videos = await response.json();
  return videos;
};
const renderVideos = async () => {
  const data = await fetchData();
  console.log(data);
  const videos = document.createElement("div");
  videos.className = "videos";
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const popup = document.createElement("div");
  popup.className = "popup";
  for (let v = 0; v < data.length; v++) {
    const video = document.createElement("video");
    video.className = "video";
    video.autoplay = true;
    video.src = data[v].videoUrl;
    videos.appendChild(video);
    video.addEventListener("click", () => {
      popup.style.display = "block";
      const prevVideoUrl =
        v === 0 ? data[data.length - 1].videoUrl : data[v - 1].videoUrl;
      const nextVideoUrl =
        v === data.length - 1 ? data[0].videoUrl : data[v + 1].videoUrl;

      popup.innerHTML = `<div id="popupInner">
      <video src="${prevVideoUrl}" class="prevVideo" muted></video>
      <video src="${data[v].videoUrl}" id="mainVideo" class="mainVideo" autoplay></video>
      <button class="videoLeft" id="videoLeft"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
    <button class="like" ><i class="fas fa-thumbs-up"></i>
</button>
    <button class="share"><i class="fas fa-share"></i>
</button>
    <button class="mute" id="muteBtn"><i class="fas fa-volume-mute"></i>
</button>
      <button class="videoRight" id="videoRight"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8.59 7.41L10 6l6 6-6 6-1.41-1.41L13.17 12z"/></svg></button>
      <video src="${nextVideoUrl}" class="nextVideo" muted></video>
      <div class="productCard">
      <img src="https://yt3.ggpht.com/YbAVmssDjUwwfCA1PCuudodL0UAbrLlPVVgdeUTS4BRwmFsa6g1BvEEhfGUNNk5ZxGvr0xTW=s48-c-k-c0x00ffffff-no-rj" class="productImage" alt="Product Image"/>
      <div class="productDetails">
        <h3>Product Title</h3>
        <p class="productDesc">Description of the product goes here. It can include details about the product featured in the video.</p>
        <button class="addToCartBtn">Add to Cart</button>
      </div>
    </div>
  </div>`;
      const popupInner = document.getElementById("popupInner");
      const mainVideo = document.getElementById("mainVideo");
      const muteBtn = document.getElementById("muteBtn");
      const closebtn = document.createElement("button");
      const videoLeft = document.getElementById("videoLeft");
      const videoRight = document.getElementById("videoRight");
      closebtn.className = "closeBtn";
      closebtn.innerHTML = `&times;`;
      popupInner.appendChild(closebtn);
      overlay.style.display = "block";
      const updateMuteIcon = () => {
        if (mainVideo.muted) {
          muteBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        } else {
          muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        }
      };

      updateMuteIcon();

      muteBtn.addEventListener("click", () => {
        mainVideo.muted = !mainVideo.muted;
        updateMuteIcon();
      });

      videoLeft.addEventListener("click", () => {
        // Update the current index to the previous video
        v = v === 0 ? data.length - 1 : v - 1;

        // Set the new sources for the videos
        const prevVideoUrl =
          v === 0 ? data[data.length - 1].videoUrl : data[v - 1].videoUrl;
        const nextVideoUrl =
          v === data.length - 1 ? data[0].videoUrl : data[v + 1].videoUrl;

        // Update the video sources
        document.querySelector(".prevVideo").src = prevVideoUrl;
        document.getElementById("mainVideo").src = data[currentIndex].videoUrl;
        document.querySelector(".nextVideo").src = nextVideoUrl;

        // Play the new main video
        document.getElementById("mainVideo").play();
      });

      videoRight.addEventListener("click", () => {
        // Update the current index to the next video
        v = v === data.length - 1 ? 0 : v + 1;

        // Set the new sources for the videos
        const prevVideoUrl =
          v === 0 ? data[data.length - 1].videoUrl : data[v - 1].videoUrl;
        const nextVideoUrl =
          v === data.length - 1 ? data[0].videoUrl : data[v + 1].videoUrl;

        // Update the video sources
        document.querySelector(".prevVideo").src = prevVideoUrl;
        document.getElementById("mainVideo").src = data[v].videoUrl;
        document.querySelector(".nextVideo").src = nextVideoUrl;

        // Play the new main video
        document.getElementById("mainVideo").play();
      });

      closebtn.addEventListener("click", () => {
        popup.style.display = "none";
        overlay.style.display = "none";
      });
    });
  }

  renderVideosDiv.appendChild(popup);
  renderVideosDiv.appendChild(leftBtn);
  renderVideosDiv.appendChild(videos);
  renderVideosDiv.appendChild(rightBtn);
  renderVideosDiv.appendChild(overlay);

  rightBtn.addEventListener("click", () => {
    videos.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });
  leftBtn.addEventListener("click", () => {
    videos.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });
};
renderVideos();
