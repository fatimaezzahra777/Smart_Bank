import { addTransaction, getCurrentUser, saveSimulation } from "./storage.js";

let currentCreditForm = null;

export function Credit() {

    setTimeout(() => {

        const form = document.querySelector("#credit-form");

        if (form) {
            cleanCredit();

            form.addEventListener(
                "submit",
                handleCreditSimulation
            );

            currentCreditForm = form;
        }

    }, 0);


    return `
      
        <main class="credit-page">

            <div class="credit-container">

                <h1 class="credit-title">
                    Simulation de crédit
                </h1>

                <p class="credit-subtitle">
                    Simulez votre crédit et découvrez vos mensualités.
                </p>


                <div class="credit-content">

                    <!-- FORMULAIRE -->

                    <section class="credit-form-card">

                        <h2>
                            Votre simulation
                        </h2>

                        <form id="credit-form">

                            <div class="credit-field">

                                <label for="amount">
                                    Montant du crédit
                                </label>

                                <div class="input-with-unit">

                                    <input
                                        type="number"
                                        id="amount"
                                        min="1000"
                                        placeholder="Ex : 10000"
                                        required
                                    >

                                    <span>DH</span>

                                </div>

                            </div>


                            <div class="credit-field">

                                <label for="duration">
                                    Durée du crédit
                                </label>

                                <select id="duration" required>

                                    <option value="">
                                        Choisir une durée
                                    </option>

                                    <option value="12">
                                        12 mois
                                    </option>

                                    <option value="24">
                                        24 mois
                                    </option>

                                    <option value="36">
                                        36 mois
                                    </option>

                                    <option value="48">
                                        48 mois
                                    </option>

                                    <option value="60">
                                        60 mois
                                    </option>

                                </select>

                            </div>


                            <div class="credit-field">

                                <label for="rate">
                                    Taux d'intérêt annuel
                                </label>

                                <div class="input-with-unit">

                                    <input
                                        type="number"
                                        id="rate"
                                        value="5"
                                        min="0"
                                        step="0.1"
                                        required
                                    >

                                    <span>%</span>

                                </div>

                            </div>


                            <button
                                type="submit"
                                class="credit-button"
                            >
                                Simuler mon crédit
                            </button>

                        </form>

                    </section>


                    <!-- RESULTAT -->

                    <section class="credit-result-card">

                        <h2>
                            Résultat de la simulation
                        </h2>

                        <div
                            id="credit-result"
                            class="credit-result"
                        >

                            <p class="result-placeholder">
                                Remplissez le formulaire pour voir
                                votre simulation.
                            </p>

                        </div>

                    </section>

                </div>

            </div>

        </main>
    `;
}

function handleCreditSimulation(event) {

    event.preventDefault();

    const amount = Number(
        document.querySelector("#amount").value
    );

    const duration = Number(
        document.querySelector("#duration").value
    );

    const annualRate = Number(
        document.querySelector("#rate").value
    );


    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment;


    if (monthlyRate === 0) {

        monthlyPayment = amount / duration;

    } else {

        monthlyPayment =
            amount *
            monthlyRate *
            Math.pow(1 + monthlyRate, duration) /
            (
                Math.pow(1 + monthlyRate, duration) - 1
            );

    }

    const totalAmount =
        monthlyPayment * duration;

    const creditCost =
        totalAmount - amount;


    const currentUser = getCurrentUser();


    if (currentUser) {

        const simulation = {

            id: Date.now(),

            userEmail: currentUser.email,

            amount: amount,

            duration: duration,

            annualRate: annualRate,

            monthlyPayment: Number(
                monthlyPayment.toFixed(2)
            ),

            creditCost: Number(
                creditCost.toFixed(2)
            ),

            totalAmount: Number(
                totalAmount.toFixed(2)
            ),

            date: new Date().toISOString()

        };


        saveSimulation(simulation);

        addTransaction({
            id: Date.now() + 1,
            userId: currentUser.id,
            type: "Simulation crédit",
            description: `Simulation de ${amount} DH sur ${duration} mois`,
            amount: 0,
            date: new Date().toLocaleDateString("fr-FR")
        });


        console.log(
            "Simulation sauvegardée :",
            simulation
        );

    } else {

        console.log(
            "Aucun utilisateur connecté."
        );

    }

    const result =
        document.querySelector("#credit-result");


    result.innerHTML = `

        <div class="result-main">

            <span>
                Mensualité
            </span>

            <strong>
                ${monthlyPayment.toFixed(2)} DH
            </strong>

        </div>


        <div class="result-line">

            <span>
                Montant demandé
            </span>

            <strong>
                ${amount.toFixed(2)} DH
            </strong>

        </div>


        <div class="result-line">

            <span>
                Durée
            </span>

            <strong>
                ${duration} mois
            </strong>

        </div>


        <div class="result-line">

            <span>
                Taux d'intérêt
            </span>

            <strong>
                ${annualRate} %
            </strong>

        </div>


        <div class="result-line">

            <span>
                Coût du crédit
            </span>

            <strong>
                ${creditCost.toFixed(2)} DH
            </strong>

        </div>


        <div class="result-total">

            <span>
                Montant total à rembourser
            </span>

            <strong>
                ${totalAmount.toFixed(2)} DH
            </strong>

        </div>

    `;
}

export function cleanCredit() {
    if (currentCreditForm) {
        currentCreditForm.removeEventListener(
            "submit",
            handleCreditSimulation
        );
    }

    currentCreditForm = null;
}
