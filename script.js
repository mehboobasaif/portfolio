// Navbar shadow + back-to-top button
const nav = document.getElementById("mainNav");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
  toTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Keep the navigation highlight in sync with the section currently in view.
const menu = document.getElementById("navMenu");
const navLinks = Array.from(document.querySelectorAll("#navMenu .nav-link"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNavLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + sectionId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveNavLink() {
  const marker = window.scrollY + nav.offsetHeight + 40;
  let currentSection = navSections[0];

  navSections.forEach((section) => {
    if (section.offsetTop <= marker) {
      currentSection = section;
    }
  });

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    currentSection = navSections[navSections.length - 1];
  }

  if (currentSection) {
    setActiveNavLink(currentSection.id);
  }
}

let navUpdatePending = false;
function scheduleNavUpdate() {
  if (navUpdatePending) return;
  navUpdatePending = true;
  window.requestAnimationFrame(() => {
    updateActiveNavLink();
    navUpdatePending = false;
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      setActiveNavLink(target.id);
    }

    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

window.addEventListener("scroll", scheduleNavUpdate, { passive: true });
window.addEventListener("resize", scheduleNavUpdate);
window.addEventListener("hashchange", scheduleNavUpdate);
updateActiveNavLink();

// Show projects in pairs and slide between the two pairs.
const projectsCarousel = document.getElementById("projectsCarousel");
if (projectsCarousel) {
  const projectsTrack = projectsCarousel.querySelector(".projects-track");
  const projectItems = Array.from(projectsTrack.querySelectorAll(".project-item"));
  const projectButtons = Array.from(projectsCarousel.querySelectorAll(".project-nav-button[data-project-direction]"));
  const projectPageCount = projectsCarousel.querySelector(".project-page-count");
  let firstVisibleProject = 0;
  let isAnimating = false;

  function updateProjects() {
    projectItems.forEach((item, index) => {
      const isVisible = index === firstVisibleProject || index === firstVisibleProject + 1;
      item.setAttribute("aria-hidden", String(!isVisible));
      item.inert = !isVisible;
    });

    const firstItem = projectItems[firstVisibleProject];
    projectsTrack.style.transform = `translateX(-${firstItem.offsetLeft}px)`;
    projectPageCount.innerHTML =
      `${String(firstVisibleProject + 1).padStart(2, "0")}–${String(firstVisibleProject + 2).padStart(2, "0")} <span>/</span> ${String(projectItems.length).padStart(2, "0")}`;
    projectButtons.forEach((button) => {
      const direction = Number(button.dataset.projectDirection);
      button.disabled = isAnimating ||
        (direction < 0 && firstVisibleProject === 0) ||
        (direction > 0 && firstVisibleProject === projectItems.length - 2);
    });
  }

  function moveProjectWindow(direction) {
    if (isAnimating) return;
    const nextIndex = firstVisibleProject + direction * 2;
    if (nextIndex < 0 || nextIndex > projectItems.length - 2) return;

    firstVisibleProject = nextIndex;
    isAnimating = true;
    updateProjects();
    window.setTimeout(() => {
      isAnimating = false;
      updateProjects();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 720);
  }

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moveProjectWindow(Number(button.dataset.projectDirection));
    });
  });

  window.addEventListener("resize", updateProjects);
  updateProjects();
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}
// Contact form
// Opens the visitor's email app with the message filled in.

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    status.textContent = "Please fill in your name, a valid email, and a message.";
    status.style.color = "#b42318";
    return;
  }

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(
    message + "\n\nFrom: " + name + " (" + email + ")"
  );

  window.location.href =
    "mailto:mehboobasaif@gmail.com?subject=" + subject + "&body=" + body;

  status.textContent = "Opening your email app to send the message.";
  status.style.color = "#0d1b36";

  form.reset();
});