(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", function () {
    // Toggle header class on scroll
    function toggleScrolled() {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector("#header");

      if (
        !selectHeader ||
        (!selectHeader.classList.contains("scroll-up-sticky") &&
          !selectHeader.classList.contains("sticky-top") &&
          !selectHeader.classList.contains("fixed-top"))
      ) {
        return;
      }

      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    }

    window.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    // Mobile nav toggle
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    function mobileNavToggle() {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
      }
    }

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
    }

    // Close mobile nav on nav link click
    document.querySelectorAll("#navmenu a").forEach((navmenuLink) => {
      navmenuLink.addEventListener("click", () => {
        if (
          document.querySelector("body").classList.contains("mobile-nav-active")
        ) {
          mobileNavToggle();
        }
      });
    });

    // Dropdown toggle inside nav menu
    document
      .querySelectorAll(".navmenu .toggle-dropdown")
      .forEach((dropdownToggle) => {
        dropdownToggle.addEventListener("click", function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
          const nextDropdown = this.parentNode.nextElementSibling;
          if (nextDropdown) {
            nextDropdown.classList.toggle("dropdown-active");
          }
          e.stopImmediatePropagation();
        });
      });

    const preloader = document.querySelector("#preloader");

    function removePreloader() {
      if (preloader) {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 600); // matches CSS transition
      }
    }

    if (preloader) {
      window.addEventListener("load", removePreloader);
      setTimeout(removePreloader, 5000); // mobile fallback
    }

    // Scroll to top button
    const scrollTop = document.querySelector(".scroll-top");

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      }
    }

    if (scrollTop) {
      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      window.addEventListener("scroll", toggleScrollTop);
      window.addEventListener("load", toggleScrollTop);
    }

    // Smooth scroll on load if hash exists
    window.addEventListener("load", function () {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
          setTimeout(() => {
            const scrollMarginTop =
              getComputedStyle(section).scrollMarginTop || "0";
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: "smooth",
            });
          }, 100);
        }
      }
    });

    // Nav menu scrollspy
    const navmenuLinks = document.querySelectorAll(".navmenu a");

    function navmenuScrollspy() {
      const scrollPosition = window.scrollY + 200;
      navmenuLinks.forEach((link) => {
        if (!link.hash) return;

        const section = document.querySelector(link.hash);
        if (!section) return;

        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition <= section.offsetTop + section.offsetHeight
        ) {
          document
            .querySelectorAll(".navmenu a.active")
            .forEach((el) => el.classList.remove("active"));
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    window.addEventListener("scroll", navmenuScrollspy);
    window.addEventListener("load", navmenuScrollspy);
  });
})();
