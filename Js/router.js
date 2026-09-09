import { Login } from "./login.js";
import { Register } from "./register.js";
import { Dashboard } from "./Dashboard.js";
import { Credit } from "./Credit.js";
import { Historique } from "./Historique.js";
import { Offers } from "./Offers.js";
import { Recompenses } from "./recompenses.js";
import { Profile } from "./Profile.js";


const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/",
        component: Dashboard
    },
    {
        path: "/Credit",
        component: Credit
    },
    {
        path: "/Historique",
        component: Historique
    },
    {
        path: "/Offers",
        component: Offers
    },
    {
        path: "/Profile",
        component: Profile
    },
    {
        path: "/recompenses",
        component: Recompenses
    },
];

export function Router(){
    
    const root = document.querySelector("#root");

    const path = window.location.pathname;

    const route = routes.find(
        route => route.path === path
    );

    if(route){
        root.innerHTML = route.component();
    } else {
        root.innerHTML = `<h1> page not found <h1>`;
    }
}