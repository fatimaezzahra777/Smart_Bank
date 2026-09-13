import { hashPass } from "./Securite.js";
import { getUsers, saveUsers, setCurrentUser } from "./storage.js";
import { navigate } from "./navigation.js";

export function Register() {

    setTimeout(() => {

        const form = document.querySelector("#register-form");

        const loginLink = document.querySelector("#login-link");

        if (
            !form ||
            !loginLink ||
            typeof form.addEventListener !== "function" ||
            typeof loginLink.addEventListener !== "function"
        ) {
            return;
        }

            loginLink.addEventListener("click", (event) => {

                event.preventDefault();

                navigate("/login");

            });

        form.addEventListener("submit", async (event) => {

            event.preventDefault();

            const username = document.querySelector("#username").value.trim();
            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value;
            const message = document.querySelector("#register-message");

            message.textContent = "";

            const users = getUsers();

            const existingUser = users.find(
                user => user.email === email
            );

            if (existingUser) {
                message.textContent = "Cet email existe déjà.";
                return;
            }

            const hashedPassword = await hashPass(password);

            const newUser = {
                id: Date.now(),
                username: username,
                email: email,
                password: hashedPassword
            };

            users.push(newUser);

            saveUsers(users);

            setCurrentUser({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            });
            navigate("/dashboard");

        });

    }, 0);

    return `
        <div class="register-container">

            <div class="register-image"></div>

            <div class="register-form">

                <div class="register-content">

                    <h1>Create account</h1>

                    <form id="register-form">

                        <div class="form-group">
                            <label for="username">Username</label>

                            <input
                                type="text"
                                id="username"
                                placeholder="Your username"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>

                            <div class="password-container">

                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Your password"
                                    required
                                >

                            </div>
                        </div>

                        <button
                            type="submit"
                            class="register-button"
                        >
                            Create account
                        </button>

                        <p id="register-message" class="auth-message"></p>

                    </form>

                    <p class="login-link">
                        Already have an account?
                        <a href="/login" id="login-link">
                            Login
                        </a>
                    </p>

                </div>

            </div>

        </div>
    `;
}
