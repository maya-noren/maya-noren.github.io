if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.previousElementSibling;
      text.classList.toggle("expanded");
      btn.textContent = text.classList.contains("expanded") ? "Read less" : "Read more";
    });
  });
});

