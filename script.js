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
