let navigationLinks = [];

export function navigate(path) {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("app:navigate"));
}

export function initNavigation() {

    navigationLinks.forEach(link => {
        link.removeEventListener("click", handleNavigation);
    });

    const links = document.querySelectorAll("[data-link]");

    links.forEach(link => {

        link.addEventListener("click", handleNavigation);

    });

    navigationLinks = Array.from(links);
}

function handleNavigation(event) {

    event.preventDefault();

    const path = event.currentTarget.getAttribute("href");

    navigate(path);
}
