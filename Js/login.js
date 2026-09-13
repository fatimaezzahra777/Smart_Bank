import { hashPass } from "./Securite.js";
import { getUsers, setCurrentUser } from "./storage.js";
import { navigate } from "./navigation.js";

export function Login() {

    setTimeout(() => {
        const form = document.querySelector("#login-form");
        const message = document.querySelector("#login-message");
        const registerLink = document.querySelector("#register-link");

        if (!form || !message || typeof form.addEventListener !== "function") {
            return;
        }

        if (
            registerLink &&
            typeof registerLink.addEventListener === "function"
        ) {
            registerLink.addEventListener("click", (event) => {
                event.preventDefault();
                navigate("/register");
            });
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.querySelector("#login-email").value.trim();
            const password = document.querySelector("#login-password").value;
            const hashedPassword = await hashPass(password);
            const users = getUsers();

            const user = users.find(
                user => user.email === email && user.password === hashedPassword
            );

            if (!user) {
                message.textContent = "Email ou mot de passe incorrect.";
                return;
            }

            const currentUser = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            setCurrentUser(currentUser);
            navigate("/dashboard");
        });
    }, 0);

    return `
        <div class="login-container">

            <!-- Image -->
            <div class="login-image"></div>

            <!-- Formulaire -->
            <div class="login-form-container">

                <div class="login-content">

                    <h1>Log in</h1>

                    <form id="login-form">

                        <div class="login-form-group">

                            <label for="login-email">
                                Email address
                            </label>

                            <input
                                type="email"
                                id="login-email"
                                placeholder=""
                                required
                            >

                        </div>

                        <div class="login-form-group">

                            <label for="login-password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="login-password"
                                placeholder=""
                                required
                            >

                        </div>

                        <button
                            type="submit"
                            class="login-button"
                        >
                            Log in
                        </button>

                        <p id="login-message" class="auth-message"></p>

                    </form>

                    <p class="login-link">
                        Don't have an account?
                        <a href="/register" id="register-link">
                            Create account
                        </a>
                    </p>

                </div>

            </div>

        </div>
    `;
}
