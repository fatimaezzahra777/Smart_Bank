import { getCurrentUser, getUsers, saveUsers, setCurrentUser } from "./storage.js";

export function Profile() {

    const user = getCurrentUser();
    const username = escapeHtml(user?.username || "");
    const email = escapeHtml(user?.email || "");

    setTimeout(() => {
        const form = document.querySelector("#profile-form");
        const message = document.querySelector("#profile-message");

        if (!form || !message || typeof form.addEventListener !== "function") {
            return;
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.querySelector("#profile-username").value.trim();
            const email = document.querySelector("#profile-email").value.trim();
            const users = getUsers();
            const currentUser = getCurrentUser();

            const emailUsed = users.some(
                savedUser => savedUser.email === email && savedUser.id !== currentUser.id
            );

            if (emailUsed) {
                message.textContent = "Cet email est deja utilise.";
                message.className = "profile-message profile-message-error";
                return;
            }

            const updatedUsers = users.map(savedUser => {
                if (savedUser.id !== currentUser.id) {
                    return savedUser;
                }

                return {
                    ...savedUser,
                    username: username,
                    email: email
                };
            });

            const updatedCurrentUser = {
                ...currentUser,
                username: username,
                email: email
            };

            saveUsers(updatedUsers);
            setCurrentUser(updatedCurrentUser);

            message.textContent = "Profil mis a jour.";
            message.className = "profile-message profile-message-success";

            document.querySelector("#profile-name").textContent = username;
            document.querySelector("#profile-avatar").textContent = username.charAt(0).toUpperCase();
        });
    }, 0);

    if (!user) {
        return `

            <main class="profile-page">
                <div class="profile-container">
                <h1>Profil</h1>
                    <p>Utilisateur non connecte.</p>
                </div>
            </main>
        `;
    }

    return `
        

        <main class="profile-page">

            <div class="profile-container">

                <h1 class="profile-title">
                    Mon profil
                </h1>

                <p class="profile-subtitle">
                    Consultez et gerez vos informations personnelles.
                </p>


                <div class="profile-card">

                    <div class="profile-header">

                        <div class="profile-avatar" id="profile-avatar">
                            ${escapeHtml(getInitial(user.username))}
                        </div>

                        <div>
                            <h2 id="profile-name">
                                ${username}
                            </h2>

                            <p>
                                Client SmartBank
                            </p>
                        </div>

                    </div>


                    <form id="profile-form">

                        <div class="profile-info">

                            <div class="profile-field">
                                <label for="profile-username">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="profile-username"
                                    value="${username}"
                                    required
                                >
                            </div>


                            <div class="profile-field">
                                <label for="profile-email">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="profile-email"
                                    value="${email}"
                                    required
                                >
                            </div>


                            <div class="profile-field">
                                <label>
                                    Statut
                                </label>

                                <p>
                                    Client
                                </p>
                            </div>

                        </div>


                        <div class="profile-actions">

                            <p id="profile-message" class="profile-message"></p>

                            <button class="profile-button" type="submit">
                                Enregistrer
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </main>
    `;
}

function getInitial(username) {
    return username ? username.charAt(0).toUpperCase() : "U";
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("\"", "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
