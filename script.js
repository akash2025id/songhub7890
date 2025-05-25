async function loadVideos() {
  const res = await fetch('data.json');
  const videos = await res.json();
  displayVideos(videos);

  document.getElementById('searchInput').addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const filtered = videos.filter(v => v.title.toLowerCase().includes(keyword));
    displayVideos(filtered);
  });
}

// টেক্সট এলিমেন্ট সিলেক্ট করুন
const slidingText = document.querySelector('.sliding-text');

// টেক্সটের দৈর্ঘ্য অনুযায়ী গতি অটো সেট
function adjustAnimationSpeed() {
  const textWidth = slidingText.scrollWidth;
  const containerWidth = slidingText.parentElement.offsetWidth;
  const duration = Math.max(5, (textWidth / containerWidth) * 5); // মিনিমাম 5সেকেন্ড
  
  slidingText.style.animationDuration = `${duration}s`;
}

// রেসাইজ ইভেন্টে কল করুন
window.addEventListener('resize', adjustAnimationSpeed);
adjustAnimationSpeed(); // প্রথম লোডে কল



const autoSearch = document.getElementById('autoSearch');

// ডেবাউন্স ফাংশন (অতিরিক্ত রিকোয়েস্ট প্রতিরোধ)
function debounce(func, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

// অটো সার্চ ইমপ্লিমেন্টেশন
autoSearch.addEventListener('input', debounce(function() {
  const searchTerm = this.value.toLowerCase();
  const videos = document.querySelectorAll('.video-item');
  
  videos.forEach(video => {
    const title = video.querySelector('h3').textContent.toLowerCase();
    video.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
}, 300)); // 300ms ডিলে



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
        <iframe width="100%" height="250" src="${video.embed || video.video}" frameborder="0" allowfullscreen></iframe>
        <h2>${video.title}</h2>
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
