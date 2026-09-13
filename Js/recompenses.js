import { addTransaction, getCurrentUser, getRewards, saveReward } from "./storage.js";

let currentSpinButton = null;
let currentSpinHandler = null;
let currentRotation = 0;

export function Recompenses() {
    const user = getCurrentUser();
    const savedRewards = getSavedRewardsCount(user);

    return `
        <div class="rewards-page">

            <h1>Rewards</h1>

            <p class="rewards-description">
                Spin the wheel and try your luck!
            </p>

            <p class="rewards-total">
                Récompenses gagnées : ${savedRewards}
            </p>

            <div class="spinner-container">

                <div class="spinner-arrow">
                    ▼
                </div>

                <div id="wheel" class="wheel">

                    <div class="wheel-item item-1">
                        10 pts
                    </div>

                    <div class="wheel-item item-2">
                        20 pts
                    </div>

                    <div class="wheel-item item-3">
                        50 pts
                    </div>

                    <div class="wheel-item item-4">
                        100 pts
                    </div>

                    <div class="wheel-item item-5">
                        5%
                    </div>

                    <div class="wheel-item item-6">
                        10%
                    </div>

                    <div class="wheel-item item-7">
                        20 pts
                    </div>

                    <div class="wheel-item item-8">
                        🎁
                    </div>

                </div>

            </div>

            <button id="spin-btn" class="spin-button">
                SPIN
            </button>

            <p id="reward-result" class="reward-result">
                Spin the wheel to win a reward!
            </p>

        </div>
    `;
}

export function initRecompenses() {
    const spinButton = document.querySelector("#spin-btn");
    const wheel = document.querySelector("#wheel");
    const result = document.querySelector("#reward-result");

    if (!spinButton || !wheel || !result) {
        return;
    }

    cleanRecompenses();

    const rewards = [
        "10 pts",
        "20 pts",
        "50 pts",
        "100 pts",
        "5%",
        "10%",
        "20 pts",
        "Cadeau"
    ];

    currentSpinHandler = () => {
        const rewardIndex = Math.floor(Math.random() * rewards.length);
        const segmentSize = 360 / rewards.length;
        const targetRotation = 360 - (rewardIndex * segmentSize);

        currentRotation += 1440 + targetRotation;
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        spinButton.disabled = true;
        result.textContent = "La roue tourne...";

        setTimeout(() => {
            const user = getCurrentUser();
            const reward = rewards[rewardIndex];

            if (user) {
                saveReward({
                    id: Date.now(),
                    userEmail: user.email,
                    reward: reward,
                    date: new Date().toLocaleDateString("fr-FR")
                });

                addTransaction({
                    id: Date.now() + 1,
                    userId: user.id,
                    type: "Récompense",
                    description: `Récompense gagnée : ${reward}`,
                    amount: 0,
                    date: new Date().toLocaleDateString("fr-FR")
                });
            }

            result.textContent = `Vous avez gagne : ${reward}`;
            spinButton.disabled = false;
        }, 4000);
    };

    spinButton.addEventListener("click", currentSpinHandler);
    currentSpinButton = spinButton;
}

export function cleanRecompenses() {
    if (currentSpinButton && currentSpinHandler) {
        currentSpinButton.removeEventListener("click", currentSpinHandler);
    }

    currentSpinButton = null;
    currentSpinHandler = null;
}

function getSavedRewardsCount(user) {
    if (!user) {
        return 0;
    }

    const rewards = getRewards();

    const userRewards = rewards.filter(
        reward => reward.userEmail === user.email
    );

    return userRewards.length;
}
