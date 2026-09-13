import {
    addTransaction,
    getCurrentUser,
    getUsedOffers,
    saveUsedOffer
} from "./storage.js";

let currentOfferButtons = [];

const offers = [
    {
        id: 1,
        title: "Cashback Shopping",
        description: "Profitez de 10% de cashback sur vos achats.",
        discount: "10%",
        expiration: "30 Septembre 2026"
    },

    {
        id: 2,
        title: "Restaurant",
        description: "Bénéficiez de 20% de réduction dans les restaurants partenaires.",
        discount: "20%",
        expiration: "15 Octobre 2026"
    },

    {
        id: 3,
        title: "Shopping",
        description: "Une réduction exclusive sur vos achats en ligne.",
        discount: "15%",
        expiration: "20 Octobre 2026"
    }
];

export function Offers() {

    const currentUser = getCurrentUser();
    const usedOffers = getUsedOffers();

    setTimeout(() => {
        const buttons = document.querySelectorAll(".offer-button");

        cleanOffers();

        buttons.forEach(button => {
            button.addEventListener("click", handleOfferClick);
        });

        currentOfferButtons = Array.from(buttons);
    }, 0);

    return `

        <main class="offers-page">

            <div class="offers-container">

                <h1 class="offers-title">
                    Mes offres
                </h1>

                <p class="offers-subtitle">
                    Découvrez nos offres et profitez de vos avantages.
                </p>

                <div class="offers-grid">

                    ${offers.map(offer => {
                        const isUsed = usedOffers.some(
                            usedOffer =>
                                usedOffer.userEmail === currentUser.email &&
                                usedOffer.offerId === offer.id
                        );

                        return `
                        
                        <div class="offer-card">

                            <div class="offer-card-header">

                                <span class="offer-badge">
                                    Offre
                                </span>

                                <span class="offer-discount">
                                    ${offer.discount}
                                </span>

                            </div>

                            <h2>
                                ${offer.title}
                            </h2>

                            <p class="offer-description">
                                ${offer.description}
                            </p>

                            <div class="offer-footer">

                                <span class="offer-expiration">
                                    Jusqu'au ${offer.expiration}
                                </span>

                                <button
                                    class="offer-button ${isUsed ? "offer-button-used" : ""}"
                                    data-offer-id="${offer.id}"
                                    ${isUsed ? "disabled" : ""}
                                >
                                    ${isUsed ? "Déjà utilisée" : "Profiter"}
                                </button>

                            </div>

                        </div>

                    `;
                    }).join("")}

                </div>

                <p id="offer-message" class="offer-message"></p>

            </div>

        </main>
    `;
}

function handleOfferClick(event) {
    const button = event.currentTarget;
    const offerId = Number(button.dataset.offerId);
    const currentUser = getCurrentUser();
    const selectedOffer = offers.find(
        offer => offer.id === offerId
    );

    if (!currentUser || !selectedOffer) {
        return;
    }

    const usedOffers = getUsedOffers();
    const alreadyUsed = usedOffers.some(
        offer =>
            offer.userEmail === currentUser.email &&
            offer.offerId === offerId
    );

    if (alreadyUsed) {
        return;
    }

    const usedOffer = {
        id: Date.now(),
        userEmail: currentUser.email,
        offerId: selectedOffer.id,
        title: selectedOffer.title,
        discount: selectedOffer.discount,
        date: new Date().toLocaleDateString("fr-FR")
    };

    saveUsedOffer(usedOffer);

    addTransaction({
        id: Date.now() + 1,
        userId: currentUser.id,
        type: "Offre",
        description: `Offre utilisée : ${selectedOffer.title}`,
        amount: 0,
        date: new Date().toLocaleDateString("fr-FR")
    });

    button.textContent = "Déjà utilisée";
    button.disabled = true;
    button.classList.add("offer-button-used");

    showOfferMessage(selectedOffer.title);
}

function showOfferMessage(title) {
    const message = document.querySelector("#offer-message");

    if (message) {
        message.textContent = `Offre "${title}" enregistrée avec succès.`;
    }
}

export function cleanOffers() {
    currentOfferButtons.forEach(button => {
        button.removeEventListener("click", handleOfferClick);
    });

    currentOfferButtons = [];
}
