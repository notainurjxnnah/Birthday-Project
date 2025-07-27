(function () {
  const bubbles = Array.from(document.querySelectorAll(".typing-text"));
  const nextBtn = document.getElementById("next-btn"); // optional
  const autoPlay = !nextBtn; // if no button, autoplay
  let current = 0;

  function type(el, text, speed, done) {
    el.textContent = "";
    let i = 0;
    (function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        setTimeout(tick, speed);
      } else {
        done && done();
      }
    })();
  }

  function play(index) {
    if (index >= bubbles.length) {
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.textContent = "✔ Done";
      }
      return;
    }

    const el = bubbles[index];
    const text = el.getAttribute("data-text") || el.textContent.trim();
    const speed = Number(el.getAttribute("data-speed")) || 35;

    // reset in case you had pre-filled content
    el.textContent = "";

    type(el, text, speed, () => {
      current++;
      if (autoPlay) {
        setTimeout(() => play(current), 600);
      } else {
        nextBtn.disabled = false;
      }
    });
  }

  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.addEventListener("click", () => {
      nextBtn.disabled = true;
      play(current);
    });
  }

  // kick off
  play(current);
})();