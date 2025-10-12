if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

const walker = document.getElementById('walker');
const labels = document.querySelectorAll('.walk-label');

let pos = 5;          // character position in %
let walking = false;

// Sprite sheet info
const sprite = new Image();
sprite.src = './assets/sprite_sheet.png';
sprite.onload = () => {
  const frameCount = 4; // change if your sheet has more frames
  const frameWidth = sprite.width / frameCount;
  const frameHeight = sprite.height / 2; // top row only
  walker.style.width = frameWidth + 'px';
  walker.style.height = frameHeight + 'px';

  // Create keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `
    @keyframes walkCycle {
      from { background-position: 0 0; }
      to { background-position: -${frameWidth * frameCount}px 0; }
    }
  `;
  document.head.appendChild(styleSheet);
};

// Key press handling
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    if (!walking) {
      walker.classList.add('walking');
      walking = true;
    }

    if (e.key === 'ArrowRight') {
      pos = Math.min(pos + 1, 90);
      walker.style.transform = 'scaleX(1)';
    } else {
      pos = Math.max(pos - 1, 0);
      walker.style.transform = 'scaleX(-1)';
    }

    walker.style.left = pos + '%';
    checkHighlights();
  }
});

document.addEventListener('keyup', () => {
  walker.classList.remove('walking');
  walking = false;
});

function checkHighlights() {
  labels.forEach(label => {
    const start = parseFloat(label.dataset.start);
    const end = parseFloat(label.dataset.end);
    if (pos >= start && pos <= end) {
      label.classList.add('highlight');
    } else {
      label.classList.remove('highlight');
    }
  });
}
