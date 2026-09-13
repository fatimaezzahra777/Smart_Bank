let currentMenuButton = null;

export function Navbar() {

    setTimeout(() => {

        const menuButton = document.querySelector("#menu-button");
        const navbarLinks = document.querySelector(".navbar-links");

        if (menuButton && navbarLinks) {
            cleanNavbar();

            menuButton.addEventListener("click", handleMenuClick);

            currentMenuButton = menuButton;

        }

    }, 0);

    return `
        <nav class="navbar">

            <div class="navbar-logo">
                <span>Smart</span>
                <span>Bank</span>
            </div>

            <!-- Burger -->
            <button id="menu-button" class="menu-button">
                ☰
            </button>

            <!-- Links -->
            <div class="navbar-links">

                <a href="/dashboard" data-link>
                    Dashboard
                </a>

                <a href="/offers" data-link>
                    Offers
                </a>

                <a href="/credit" data-link>
                    Credit
                </a>

                <a href="/recompenses" data-link>
                    Recompenses
                </a>

                <a href="/historique" data-link>
                    Historique
                </a>

                <a href="/profile" data-link>
                    Profile
                </a>

            </div>

            <button id="logout-btn" class="logout-btn">
                Logout
            </button>

        </nav>
    `;
}

export function cleanNavbar() {
    if (currentMenuButton) {
        currentMenuButton.removeEventListener("click", handleMenuClick);
    }

    currentMenuButton = null;
}

function handleMenuClick() {
    const navbarLinks = document.querySelector(".navbar-links");

    if (navbarLinks) {
        navbarLinks.classList.toggle("active");
    }
}
