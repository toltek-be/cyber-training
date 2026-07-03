# Cyber Training - Révision TOSA

Une application web de quiz interactive pour s'entraîner à la cybersécurité et préparer la certification TOSA.

## 🚀 Fonctionnalités

- **Grand Test Complet** : 174 questions couvrant l'ensemble du programme.
- **Entraînement par Thème** : 8 thèmes spécifiques (Web, Phishing, Mots de passe, RGPD, etc.).
- **Synthèses de cours** : Fiches récapitulatives interactives sur les sujets clés (RGPD, IA, Incidents).
- **Types de Questions Variés** :
  - Choix unique et multiple.
  - Vrai / Faux.
  - Texte à trous.
  - Éléments à relier (Matching).
  - Remise en ordre.
- **Correction Immédiate** : Explications détaillées pour chaque question après validation.
- **Progression Persistante** : Sauvegarde automatique de l'avancement dans le navigateur (LocalStorage).
- **Zéro Data** : Fonctionne entièrement côté client, aucune donnée personnelle n'est collectée ou envoyée à un serveur.
- **Expérience Dynamique** : Mélange aléatoire des réponses à chaque session pour éviter le par cœur visuel.
- **Ergonomie Matching** : Gestion intelligente des doublons (plusieurs réponses à droite peuvent avoir le même libellé) et possibilité de modifier ou d'annuler une liaison par simple clic.
- **Support des Questions d'Examen** : Adaptations spécifiques pour les questions complexes du TOSA (catégorisations RGPD, etc.).

## 🛠 Installation

Aucune installation complexe n'est requise. L'application est composée de fichiers statiques (HTML, CSS, JS).

1. Clonez ou téléchargez le dépôt.
2. Ouvrez le fichier `index.html` dans n'importe quel navigateur moderne.

## 📂 Structure du projet

- `index.html` : Point d'entrée de l'application (gère le versioning des ressources).
- `app.js` : Logique de l'application (moteur de quiz, gestion d'état, chargement asynchrone des données).
- `questions.json` : Base de données des questions (format JSON strict).
- `extra-content.json` : Modes de test et synthèses pédagogiques (format JSON strict).
- `styles/` : Dossier contenant les feuilles de style (Neobrutalism, Corpo, etc.).

## 🔄 Résumé des améliorations du mélange aléatoire

| Élément | Avant | Après |
| :--- | :--- | :--- |
| **Ordre des questions** | ❌ Toujours le même | ✅ Mélangé par quiz |
| **Ordre des réponses** | ❌ Toujours le même | ✅ Aléatoire pour chaque question |
| **Ordre matching (droite)** | ❌ Juste inversé | ✅ Aléatoire pour chaque question |
| **Ordre initial "remise en ordre"** | ❌ Toujours inversé | ✅ Complètement mélangé |
| **Doublons en matching** | ❌ Identifiants uniques stricts | ✅ Validation par libellé textuel |

## ⚙️ Maintenance & Fiabilisation

- **Architecture** : Séparation totale entre le code (`app.js`) et les données (`.json`).
- **Chargement** : Utilisation de l'API `fetch` pour un chargement asynchrone et performant.
- **Encodage** : Tous les fichiers sont en **UTF-8 sans BOM**.
- **Robustesse** : Le moteur `app.js` intègre des sécurités (ex: `hashCode` sécurisé) et les questions disposent d'identifiants uniques.
- **Versioning** : Paramètre `?v=YYYY-MM-DD-X` utilisé pour forcer le rafraîchissement du cache.

## 🚀 TODO - Nice to Have

- **API serveur** : Pour une gestion dynamique des contenus.
- **Optimisation mobile** : Améliorer les interactions tactiles.

## 📝 Licence

Projet développé par Celio Miceli pour la formation CyberCitizen. 
