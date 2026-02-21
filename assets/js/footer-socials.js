document.addEventListener("DOMContentLoaded", function () {
  const markup = `
    <a
      class="footer-social"
      href="https://www.youtube.com/@Boxfox1industry"
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="YouTube"
      ><i class="bi bi-youtube"></i
    ></a>
    <a
      class="footer-social"
      href="https://www.facebook.com/boxfox1industria/"
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="Facebook"
      ><i class="bi bi-facebook"></i
    ></a>
    <a
      class="footer-social"
      href="https://x.com/Boxfox1industry"
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="X (Twitter) Boxfox1"
      ><i class="bi bi-twitter-x"></i
    ></a>
    <a
      class="footer-social"
      href="https://www.instagram.com/boxfox1industry/"
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="Instagram"
      ><i class="bi bi-instagram"></i
    ></a>
    <a
      class="footer-social"
      href="https://www.pinterest.com/boxfox1/"
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="Pinterest"
      ><i class="bi bi-pinterest"></i
    ></a>
    <a
      class="footer-social"
      href="https://www.linkedin.com/company/boxfox1industry/"
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="LinkedIn"
      ><i class="bi bi-linkedin"></i
    ></a>
  `;

  document.querySelectorAll(".shared-footer-socials").forEach(function (el) {
    el.innerHTML = markup;
  });
});
