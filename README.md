# SmartBank

SmartBank est une application web bancaire simple développée avec HTML, CSS et JavaScript vanilla. Elle permet de créer un compte, se connecter, consulter un tableau de bord, simuler un crédit, afficher des offres, gérer un profil et utiliser une page de récompenses.

## Fonctionnalités

- Création de compte avec stockage local des utilisateurs
- Connexion avec mot de passe haché en SHA-256
- Navigation entre les pages sans rechargement complet
- Protection des pages privées si aucun utilisateur n'est connecté
- Tableau de bord avec solde fictif, offres, récompenses et crédits simulés
- Simulation de crédit avec calcul de mensualité
- Consultation d'offres promotionnelles
- Historique des transactions
- Modification du profil utilisateur
- Roue de récompenses interactive
- Déconnexion

## Technologies utilisées

- HTML5
- CSS3
- JavaScript ES Modules
- LocalStorage
- Web Crypto API pour le hachage du mot de passe

## Structure du projet

```text
SmartBank/
├── Components/
│   └── Navbar.js
├── Js/
│   ├── Credit.js
│   ├── Dashboard.js
│   ├── Historique.js
│   ├── Offers.js
│   ├── Profile.js
│   ├── Securite.js
│   ├── login.js
│   ├── navigation.js
│   ├── recompenses.js
│   ├── register.js
│   ├── router.js
│   └── storage.js
├── images/
│   ├── login.png
│   └── register.png
├── index.html
├── main.js
├── style.css
└── README.md
```

## Installation et lancement

Ce projet ne nécessite pas d'installation de dépendances.

1. Cloner le projet ou ouvrir le dossier `SmartBank`.
2. Lancer un serveur local depuis la racine du projet :

```bash
python3 -m http.server 4173
```

3. Ouvrir l'application dans le navigateur :

```text
http://localhost:4173/
```

## Utilisation

1. Créer un compte depuis la page d'inscription.
2. Se connecter avec l'email et le mot de passe choisis.
3. Accéder aux pages privées depuis la barre de navigation :
   - Dashboard
   - Offers
   - Credit
   - Recompenses
   - Historique
   - Profile
4. Cliquer sur `Logout` pour se déconnecter.

## Données locales

L'application utilise `localStorage` pour sauvegarder les données dans le navigateur :

- `smartbank_users` : liste des utilisateurs
- `smartbank_current_user` : utilisateur connecté
- `smartbank_transactions` : transactions
- `smartbank_dashboard_data` : données du tableau de bord

Pour réinitialiser l'application, il suffit de vider le stockage local du navigateur.

## Notes

SmartBank est un projet front-end éducatif. Les données sont stockées uniquement dans le navigateur et ne sont pas envoyées vers un serveur.
