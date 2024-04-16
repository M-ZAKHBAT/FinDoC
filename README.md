**Projet de Gestion de Rendez-vous Médicaux (FinDoC)

Ce projet est une application web développée avec la pile MERN (MongoDB, Express.js, React.js, Node.js) pour gérer les rendez-vous médicaux des patients avec les médecins. Il permet également aux utilisateurs de laisser des avis et de procéder au paiement des consultations.

**Fonctionnalités Principales :
- **Authentification** : Système d'inscription et de connexion pour les utilisateurs et les médecins.
- **Recherche de Médecins** : Possibilité de rechercher des médecins par spécialité ou par nom.
- **Gestion des Rendez-vous** : Planification, modification et annulation de rendez-vous avec les médecins.
- **Paiement** : Intégration de Stripe pour le paiement sécurisé des consultations médicales.
- **Avis et Évaluations** : Permet aux utilisateurs de laisser des avis et des évaluations sur les médecins après les consultations.

**Technologies Utilisées :
- **Frontend** : React.js, react-toastify, react-spinners, Cloudinary, react-router-dom, react-icons.
- **Backend** : Node.js, Express.js, MongoDB (Mongoose), jsonwebtoken.
- **Tests** : Jest (avec jest.mock pour les mocks), babelrc.
- **Déploiement** : Docker (Dockerfile).

 **Installation :
1. Cloner le dépôt : `git clone https://github.com/M-ZAKHBAT/FinDoC.git`
2. Accéder au répertoire du projet : `cd FinDoC`
3. Installer les dépendances : `npm install`
4. Configurer les variables d'environnement en créant un fichier `.env` à la racine du projet avec les variables suivantes :
   - **`PORT=5000`
   - **`MONGO_URL=<votre-uri-mongodb>`
   - **`JWT_SECRET_KEY=<votre-clé-secrète-pour-jwt>`
   - **`STRIPE_SECRET_KEY=<votre-clé-secrete-stripe>`
   - **`CLIENT_SITE_URL=http://localhost:5173`

**Utilisation :
Une fois le serveur en cours d'exécution, vous pouvez interagir avec les différentes fonctionnalités de l'API en utilisant des outils comme Postman ou tout autre client REST. L'API fournit des points de terminaison pour créer, lire, mettre à jour et supprimer des rendez-vous médicaux. Assurez-vous de fournir des données valides conformément aux règles de validation spécifiées. De plus, vous pouvez laisser des avis sur les médecins et effectuer des paiements pour les consultations médicales.
**Tests :
Des tests unitaires sont mis en œuvre avec Jest. Pour exécuter les tests, utilisez la commande suivante : `npm test`

** Ce projet se lance en concurrence avec "npm run dev".

**Auteur :
Ce projet a été créé par **ZAKHBAT Mohammed**.

Pour plus d'informations, consultez le dépôt GitHub : 
[https://github.com/M-ZAKHBAT/FinDoC.git]

