import { Login } from "./login.js";
import { Register } from "./register.js";
import { Dashboard } from "./Dashboard.js";
import { Credit } from "./Credit.js";
import { Historique } from "./Historique.js";
import { Offers } from "./Offers.js";
import { Recompenses, initRecompenses } from "./recompenses.js";
import { Profile } from "./Profile.js";
import { getCurrentUser, logout } from "./storage.js";
import { initNavigation } from "./navigation.js";
import { Navbar } from "../Components/Navbar.js";


const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/",
        component: Register
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/credit",
        component: Credit
    },
    {
        path: "/historique",
        component: Historique
    },
    {
        path: "/offers",
        component: Offers
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/recompenses",
        component: Recompenses
    }
];


let currentLogoutBtn = null;

export function Router() {
    const root = document.querySelector("#root");
    const path = window.location.pathname;
    const protectedRoutes = [
        "/dashboard",
        "/credit",
        "/historique",
        "/offers",
        "/profile",
        "/recompenses"
    ];
   
    if (protectedRoutes.includes(path) && !getCurrentUser()) {
        history.pushState({}, "", "/login");
        root.innerHTML = Login();
        initNavigation();
        return;
    }

    const route = routes.find(
        route => route.path === path
    );
    if (route) {
        const pageContent = route.component() || "";
        if (protectedRoutes.includes(path)) {
            root.innerHTML = Navbar() + pageContent;
            initNavigation();
            initLogout();

            if (path === "/recompenses") {
                initRecompenses();
            }

        } else {
            root.innerHTML = pageContent;
            initNavigation();
        }

    } else {

        root.innerHTML = `
            <h1>Page not found</h1>
        `;
    }
}


function initLogout() {
    if (currentLogoutBtn) {
        currentLogoutBtn.removeEventListener(
            "click",
            handleLogout
        );
    }
    const logoutBtn = document.querySelector("#logout-btn");
    if (!logoutBtn) {
        currentLogoutBtn = null;
        return;
    }
    logoutBtn.addEventListener(
        "click",
        handleLogout
    );
    currentLogoutBtn = logoutBtn;
}


function handleLogout() {

    logout();
    history.pushState({}, "", "/login");
    Router();
}

window.addEventListener("popstate", Router);
window.addEventListener("app:navigate", Router);
