async function loadVideos() { 
  const res = await fetch('data.json');
  const videos = await res.json();
  displayVideos(videos);

  // Adjust sliding text animation speed
  const slidingText = document.querySelector('.sliding-text');
  function adjustAnimationSpeed() {
    const textWidth = slidingText.scrollWidth;
    const containerWidth = slidingText.parentElement.offsetWidth;
    const duration = Math.max(5, (textWidth / containerWidth) * 5); // minimum 5 seconds
    slidingText.style.animationDuration = `${duration}s`;
  }
  window.addEventListener('resize', adjustAnimationSpeed);
  adjustAnimationSpeed(); // initial call

  // Search input event - auto search + highlight
  const searchInput = document.getElementById("videoSearch");
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const videoCards = document.querySelectorAll(".video-card");

    videoCards.forEach(card => {
      const titleElement = card.querySelector('h4');
      const titleText = titleElement.textContent;
      const titleTextLower = titleText.toLowerCase();

      if (titleTextLower.includes(query)) {
        card.style.display = "block";

        // Highlight matched text
        if (query.length > 0) {
          // Create a regex with global and case-insensitive flags
          const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
          titleElement.innerHTML = titleText.replace(regex, '<mark>$1</mark>');
        } else {
          // Remove highlight if search box empty
          titleElement.textContent = titleText;
        }
      } else {
        card.style.display = "none";
      }
    });
  });
}

const socialIcons = document.getElementById("socialIcons");
window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;
  if (currentScroll > 100) {
    socialIcons.classList.add("active");
  } else {
    socialIcons.classList.remove("active");
  }
});

function displayVideos(videoList) {
  const container = document.getElementById('videoContainer');
  container.innerHTML = '';

  if (videoList.length === 0) {
    container.innerHTML = '<p>No videos found.</p>';
    return;
  }

  videoList.forEach(video => {
    container.innerHTML += `
      <div class="video-card">
        <iframe width="60%" height="150px" src="${video.embed || video.video}" frameborder="0" allowfullscreen></iframe>
        <h4>${video.title}</h4>
        <p>Release Date: ${video.release}</p>
        
        <div class="social-links">
          <a href="${video.youtube}" target="_blank" class="social-btn youtube">YouTube</a>
          <a href="${video.facebook}" target="_blank" class="social-btn facebook">Facebook</a>
          <a href="${video.tiktok}" target="_blank" class="social-btn tiktok">TikTok</a>
        </div>
      </div>
    `;
  });
}

loadVideos();
