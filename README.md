# Cyber Training - Révision TOSA

Une application web de quiz interactive pour s'entraîner à la cybersécurité et préparer la certification TOSA.

## 🚀 Fonctionnalités

- **Grand Test Complet** : Plus de 80 questions couvrant l'ensemble du programme.
- **Entraînement par Thème** : 8 thèmes spécifiques (Web, Phishing, Mots de passe, RGPD, etc.).
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
- **Ergonomie Matching** : Possibilité de modifier ou d'annuler une liaison dans les questions de type "Éléments à relier" par simple clic.

## 🛠 Installation

Aucune installation complexe n'est requise. L'application est composée de fichiers statiques (HTML, CSS, JS).

1. Clonez ou téléchargez le dépôt.
2. Ouvrez le fichier `index.html` dans n'importe quel navigateur moderne.

## 📂 Structure du projet

- `index.html` : Structure de l'application et conteneurs UI (gère le versioning des ressources).
- `app.js` : Logique de l'application (moteur de quiz, gestion d'état, rendu dynamique).
- `questions.js` : Base de données principale des questions et thèmes.
- `extra-content.js` : Extensions et questions additionnelles.
- `styles.css` : Design "Neubrutalism" et mise en page responsive.

## 🔄 Résumé des améliorations du mélange aléatoire

| Élément | Avant | Après |
| :--- | :--- | :--- |
| **Ordre des questions** | ❌ Toujours le même | ✅ Mélangé par quiz |
| **Ordre des réponses** | ❌ Toujours le même | ✅ Aléatoire pour chaque question |
| **Ordre matching (droite)** | ❌ Juste inversé | ✅ Aléatoire pour chaque question |
| **Ordre initial "remise en ordre"** | ❌ Toujours inversé | ✅ Complètement mélangé |

## ⚙️ Maintenance & Encodage

- **Encodage** : Tous les fichiers doivent être enregistrés en **UTF-8 sans BOM**.
- **Versioning** : Pour forcer la mise à jour des scripts chez les utilisateurs, le paramètre `?v=YYYY-MM-DD-X` est utilisé dans `index.html`.
- **Scripts de réparation** : En cas de corruption des caractères (mojibake), des scripts Python ont été utilisés pour restaurer l'intégrité des accents.

## 🚀 TODO - Nice to Have

- **API serveur obligatoire** : Pour éviter la lecture en direct de `questions.js` et mieux protéger les contenus des quiz.
- **Optimisation mobile** : Améliorer les interactions "drag and drop" sur tactile.

## 📝 Licence

Projet développé par Celio Miceli pour la formation CyberCitizen. 
