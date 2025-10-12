if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

document.addEventListener("DOMContentLoaded", function() {
  const walker = document.getElementById("walker");
  if (!walker) return;

  const sprite = new Image();
  sprite.src = './assets/sprite_sheet.png';

  sprite.onload = function() {
    const rows = 2;            // your sprite sheet has 2 rows
    const cols = 4;            // 4 frames per row
    const walkCycleRows = 2;   // both rows are part of the walk cycle
    const totalFrames = cols * walkCycleRows; // 8 frames
    const frameWidth = sprite.width / cols;
    const frameHeight = sprite.height / rows;

    // --- scale sprite to section height ---
    const desiredHeight = 128; 
    const scale = desiredHeight / (frameHeight * walkCycleRows);
    walker.style.width = frameWidth * scale + "px";
    walker.style.height = frameHeight * walkCycleRows * scale + "px";
    walker.style.backgroundSize = sprite.width * scale + "px " + sprite.height * scale + "px";

    let pos = 5;        // horizontal % in section
    let frame = 0;      // current frame index
    let direction = 1;  // 1 = right, -1 = left
    let keys = { left: false, right: false };
    let lastFrameTime = 0;
    const frameInterval = 150; // ms per frame (~6 FPS)

    function update(timestamp) {
      // --- move walker ---
      if (keys.right) {
        pos = Math.min(pos + 0.8, 95);
        direction = 1;
      }
      if (keys.left) {
        pos = Math.max(pos - 0.8, 0);
        direction = -1;
      }
      walker.style.left = pos + "%";
      walker.style.transform = `scaleX(${direction})`;

      // --- animate frames ---
      if (keys.left || keys.right) {
        if (!lastFrameTime) lastFrameTime = timestamp;
        if (timestamp - lastFrameTime > frameInterval) {
          frame = (frame + 1) % totalFrames;
          lastFrameTime = timestamp;
        }
      } else {
        frame = 0; // idle frame
      }

      const row = Math.floor(frame / cols); // 0 or 1
      const col = frame % cols;
      const bgX = -col * frameWidth * scale;
      const bgY = -row * frameHeight * scale;
      walker.style.backgroundPosition = `${bgX}px ${bgY}px`;

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    // --- keyboard events ---
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") keys.right = true;
      if (e.key === "ArrowLeft") keys.left = true;
    });
    document.addEventListener("keyup", e => {
      if (e.key === "ArrowRight") keys.right = false;
      if (e.key === "ArrowLeft") keys.left = false;
    });
  };
});
