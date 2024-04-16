# Définition de l'image de base
FROM node:latest

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie du contenu local dans le conteneur
COPY . .

# Mise à jour de npm
RUN npm install -g npm@10.5.0

# Installation des dépendances en utilisant npm ci
RUN npm install --force

# Exposition du port nécessaire
EXPOSE 5173

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
