if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

document.addEventListener("DOMContentLoaded", function() {
  // --- Smooth scroll ---
  var myWorkLink = document.getElementById('my-work-link');
  if (myWorkLink) {
    myWorkLink.addEventListener('click', function() {
      document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"});
    });
  }

  // --- Walking sprite ---
  var walker = document.getElementById("walker");
  if (!walker) return;

  var pos = 5;
  var walking = false;

  var sprite = new Image();
  sprite.src = "./assets/sprite_sheet.png";
  sprite.onload = function() {
    var frameCount = 4; // adjust if needed
    var frameWidth = sprite.width / frameCount;
    var frameHeight = sprite.height / 2; // top row only
    walker.style.width = frameWidth + "px";
    walker.style.height = frameHeight + "px";

    var styleSheet = document.createElement("style");
    styleSheet.innerHTML = "@keyframes walkCycle { from { background-position: 0 0; } to { background-position: -" + (frameWidth * frameCount) + "px 0; } }";
    document.head.appendChild(styleSheet);
  };

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (!walking) {
        walker.classList.add("walking");
        walking = true;
      }

      if (e.key === "ArrowRight") {
        pos = Math.min(pos + 1, 90);
        walker.style.transform = "scaleX(1)";
      } else {
        pos = Math.max(pos - 1, 0);
        walker.style.transform = "scaleX(-1)";
      }

      walker.style.left = pos + "%";
    }
  });

  document.addEventListener("keyup", function() {
    walker.classList.remove("walking");
    walking = false;
  });
});
