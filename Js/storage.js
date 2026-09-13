const USERS = "smartbank_users";
const Current_user = "smartbank_current_user";
const TRANSACTIONS = "smartbank_transactions";
const SIMULATIONS_KEY = "smartbank_simulations";
const OFFERS_KEY = "smartbank_used_offers";
const REWARDS_KEY = "smartbank_rewards";

export function getUsers(){
    return JSON.parse(localStorage.getItem(USERS)) || [];
}

export function saveUsers(users){
    localStorage.setItem(USERS, JSON.stringify(users));
}

export function getCurrentUser(){
    return JSON.parse(localStorage.getItem(Current_user));
}

export function getCurrentusers(){
    return getCurrentUser();
}

export function setCurrentUser(user){
    localStorage.setItem(
        Current_user,JSON.stringify(user)
    );
}

export function logout(){
    localStorage.removeItem(Current_user);
}


export function getTransactions() {
    return JSON.parse(localStorage.getItem(TRANSACTIONS)) || [];
}

export function saveTransactions(transactions) {
    localStorage.setItem(
        TRANSACTIONS,
        JSON.stringify(transactions)
    );
}

export function addTransaction(transaction) {

    const transactions = getTransactions();

    transactions.push(transaction);

    saveTransactions(transactions);
}


export function getSimulations() {

    return JSON.parse(
        localStorage.getItem(SIMULATIONS_KEY)
    ) || [];

}


export function saveSimulation(simulation) {

    const simulations = getSimulations();

    simulations.push(simulation);

    localStorage.setItem(
        SIMULATIONS_KEY,
        JSON.stringify(simulations)
    );

}

export function getUsedOffers() {
    return JSON.parse(
        localStorage.getItem(OFFERS_KEY)
    ) || [];
}

export function saveUsedOffer(offer) {

    const offers = getUsedOffers();

    offers.push(offer);

    localStorage.setItem(
        OFFERS_KEY,
        JSON.stringify(offers)
    );
}

export function getRewards() {
    return JSON.parse(
        localStorage.getItem(REWARDS_KEY)
    ) || [];
}

export function saveReward(reward) {

    const rewards = getRewards();

    rewards.push(reward);

    localStorage.setItem(
        REWARDS_KEY,
        JSON.stringify(rewards)
    );
}
