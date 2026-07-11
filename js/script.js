const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a, .footer-links a");
const themeToggle = document.getElementById("themeToggle");
const typedText = document.getElementById("typedText");

if (localStorage.getItem("portfolioTheme") === "dark") {
    document.body.classList.add("theme-dark");
}

if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("theme-dark") ? "Light" : "Dark";

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("theme-dark");
        const isDark = document.body.classList.contains("theme-dark");
        localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
        themeToggle.textContent = isDark ? "Light" : "Dark";
    });
}

if (typedText) {
    const phrases = ["Frontend Builder", "Backend Developer", "Problem Solver", "Web Developer"];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
        const current = phrases[phraseIndex];

        typedText.textContent = deleting
            ? current.substring(0, charIndex - 1)
            : current.substring(0, charIndex + 1);

        charIndex += deleting ? -1 : 1;

        if (!deleting && charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1200);
            return;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(typeLoop, deleting ? 45 : 85);
    }

    typeLoop();
}

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });
}

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
    });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach((card) => {
            const tags = card.dataset.tags.split(",");
            card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
        });
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector(".fill");
            if (fill) {
                fill.style.width = `${entry.target.dataset.percent}%`;
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".skill").forEach((skill) => {
    skillObserver.observe(skill);
});
