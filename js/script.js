document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.gallery-image');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let current = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      current = (current + 1) % images.length;
      showImage(current);
    } else if (e.key === 'ArrowLeft') {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    }
  });

  // Clickable arrows
  leftArrow.addEventListener('click', function() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  rightArrow.addEventListener('click', function() {
    current = (current + 1) % images.length;
    showImage(current);
  });
});

