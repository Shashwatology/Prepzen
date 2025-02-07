// Navbar Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// Dynamic Typing Effect
const words = ["Studying!", "Exploring!", "Connecting!", "Developing!"];
let wordIndex = 0;
let charIndex = 0;
const dynamicText = document.getElementById('dynamic-text');

function typeEffect() {
    if (charIndex < words[wordIndex].length) {
        dynamicText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1000);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        dynamicText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();

// Mode Toggle
const modeButton = document.getElementById('mode-button');
const body = document.body;
let mode = "light";

modeButton.addEventListener("click", () => {
    if (mode === "light") {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        mode = "dark";
    } else if (mode === "dark") {
        body.classList.remove("dark-mode");
        body.classList.add("gradient-mode");
        mode = "gradient";
    } else {
        body.classList.remove("gradient-mode");
        body.classList.add("light-mode");
        mode = "light";
    }
});

// Analytics Update
var _paq = window._paq = window._paq || [];
_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
    var u="https://prepzenvercelapp.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://cdn.matomo.cloud/prepzenvercelapp.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
})();
