import { getCurrentUser, getTransactions } from "./storage.js";


export function Historique() {

    const user = getCurrentUser();

    const transactions = getTransactions();

    const userTransactions = transactions.filter(
        transaction => transaction.userId === user.id
    );

    const sortedTransactions = userTransactions.reverse();


    return `

        <main class="historique-page">

            <div class="historique-container">

                <h1 class="historique-title">
                    Historique
                </h1>

                <p class="historique-subtitle">
                    Consultez vos dernières transactions.
                </p>

                <div class="historique-summary">
                    <span>
                        Total activités : ${userTransactions.length}
                    </span>
                </div>


                <div class="historique-card">

                    ${
                        sortedTransactions.length === 0

                        ?

                        `
                            <div class="empty-history">
                                <p>
                                    Aucune transaction disponible.
                                </p>
                            </div>
                        `

                        :

                        `
                            <table class="transactions-table">

                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Montant</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    ${sortedTransactions.map(transaction => `

                                        <tr>

                                            <td>
                                                ${transaction.type}
                                            </td>

                                            <td>
                                                ${transaction.description}
                                            </td>

                                            <td class="${
                                                getAmountClass(transaction.amount)
                                            }">

                                                ${formatAmount(transaction.amount)}

                                            </td>

                                            <td>
                                                ${formatDate(transaction.date)}
                                            </td>

                                        </tr>

                                    `).join("")}

                                </tbody>

                            </table>
                        `
                    }

                </div>

            </div>

        </main>
    `;
}

function formatAmount(amount) {
    if (Number(amount) === 0) {
        return "Activité";
    }

    if (Number(amount) > 0) {
        return `+${amount} DH`;
    }

    return `${amount} DH`;
}

function getAmountClass(amount) {
    if (Number(amount) === 0) {
        return "amount-neutral";
    }

    if (Number(amount) > 0) {
        return "amount-positive";
    }

    return "amount-negative";
}

function formatDate(date) {
    if (!date) {
        return "-";
    }

    if (date.includes("/")) {
        return date;
    }

    return new Date(date).toLocaleDateString("fr-FR");
}
