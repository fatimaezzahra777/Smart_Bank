import {
    getCurrentUser,
    getRewards,
    getSimulations,
    getTransactions,
    getUsedOffers
} from "./storage.js";

export function Dashboard(){
    const user = getCurrentUser();
    const data = getDashboardData(user);

    return `
        <main class="dashboard">

            <div class="dashboard-content">

                <h1 class="dashboard-title">
                    Bonjour ${user.username}
                </h1>

                <div class="dashboard-grid">

                    ${createStatCard("Solde fictif", formatAmount(data.balance), "/historique")}
                    ${createStatCard("Offres utilisées", padNumber(data.usedOffers.length), "/offers")}
                    ${createStatCard("Recompenses", padNumber(data.rewards.points), "/recompenses")}
                    ${createStatCard("Credits simules", padNumber(data.credits.length), "/credit")}

                </div>

                <div class="dashboard-info">

                    <section class="dashboard-info-card">
                        <h2>Dernière simulation</h2>
                        ${createLastSimulation(data.credits)}
                    </section>

                    <section class="dashboard-info-card">
                        <h2>Dernière transaction</h2>
                        ${createLastTransaction(data.transactions)}
                    </section>

                </div>

            </div>

        </main>
    `;
}

function createStatCard(label, value, path) {
    return `
        <a class="dashboard-card" href="${path}" data-link>
            <p>${label}</p>
            <span>${value}</span>
        </a>
    `;
}

function getDashboardData(user) {
    const transactions = getTransactions();
    const rewards = getRewards();
    const simulations = getSimulations();
    const usedOffers = getUsedOffers();

    const userTransactions = transactions.filter(
        transaction => transaction.userId === user.id
    );

    const userSimulations = simulations.filter(
        simulation => simulation.userEmail === user.email
    );

    const userUsedOffers = usedOffers.filter(
        offer => offer.userEmail === user.email
    );

    const userRewards = rewards.filter(
        reward => reward.userEmail === user.email
    );

    let balance = 2450;
    let rewardPoints = 0;

    userTransactions.forEach(transaction => {
        balance = balance + Number(transaction.amount);
    });

    userRewards.forEach(reward => {
        rewardPoints = rewardPoints + getRewardPoints(reward.reward);
    });

    return {
        balance: balance,
        usedOffers: userUsedOffers,
        rewards: {
            points: rewardPoints
        },
        credits: userSimulations,
        transactions: userTransactions
    };
}

function formatAmount(amount) {
    return `${amount} MAD`;
}

function padNumber(value) {
    return String(value).padStart(2, "0");
}

function createLastSimulation(simulations) {
    if (simulations.length === 0) {
        return `
            <p>Aucune simulation sauvegardée.</p>
        `;
    }

    const lastSimulation = simulations[simulations.length - 1];

    return `
        <p>
            Montant : ${lastSimulation.amount} DH
        </p>

        <p>
            Durée : ${lastSimulation.duration} mois
        </p>

        <strong>
            Mensualité : ${lastSimulation.monthlyPayment} DH
        </strong>
    `;
}

function createLastTransaction(transactions) {
    if (transactions.length === 0) {
        return `
            <p>Aucune transaction disponible.</p>
        `;
    }

    const lastTransaction = transactions[transactions.length - 1];

    return `
        <p>
            ${lastTransaction.description}
        </p>

        <strong>
            ${lastTransaction.amount} DH
        </strong>
    `;
}

function getRewardPoints(reward) {
    if (reward.includes("pts")) {
        return Number(reward.replace(" pts", ""));
    }

    return 0;
}
