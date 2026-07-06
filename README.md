# Cyber Training - Révision TOSA

![GitHub last commit](https://img.shields.io/github/last-commit/toltek-be/cyber-training)
![GitHub repo size](https://img.shields.io/github/repo-size/toltek-be/cyber-training)
[![Issues Welcome](https://img.shields.io/badge/issues-welcome-brightgreen)](https://github.com/toltek-be/cyber-training/issues)
![GitHub license](https://img.shields.io/github/license/toltek-be/cyber-training)
![No backend](https://img.shields.io/badge/backend-none-blue)
![Made with JavaScript](https://img.shields.io/badge/made%20with-JavaScript-yellow)

---

Une application web de quiz interactive pour s'entraîner à la cybersécurité et préparer la certification TOSA.

## 🚀 Fonctionnalités

- **Modes de Test Variés** :
  - **Grand Test Complet** : 186 questions couvrant l'ensemble du programme.
  - **Test Blanc TOSA** : 50 questions équilibrées pour simuler l'examen.
  - **Mises en situation** : Focus sur les scénarios concrets (emails, phishing, incidents).
  - **Révision Express** : Session rapide de 20 questions aléatoires.
  - **Niveaux de difficulté** : Facile, Moyen ou Difficile pour une progression adaptée.
- **Entraînement par Thème** : 8 thèmes spécifiques (Web, Phishing, Mots de passe, RGPD, OSINT, etc.).
- **Synthèses de cours** : Plus de 50 fiches récapitulatives interactives sur des sujets variés (RGPD, IA, IoT, Cryptographie, etc.).
- **Personnalisation** : 3 thèmes graphiques au choix (**SecOps**, **Neobrutalism**, **Corpo**) pour une expérience adaptée à vos préférences.
- **Support Multimédia** : Intégration d'images et de vidéos pour illustrer les questions, avec fonction de zoom (modale) pour les visuels.
- **Types de Questions Variés** :
  - Choix unique et multiple.
  - Vrai / Faux.
  - Texte à trous.
  - Éléments à relier (Matching).
  - Remise en ordre.
- **Correction Immédiate** : Explications détaillées pour chaque question après validation.
- **Progression Persistante** : Sauvegarde automatique de l'avancement dans le navigateur (`LocalStorage`).
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
- `data/` : Dossier centralisant les ressources de données JSON :
    - `questions.json` : Base de données des questions (format JSON strict).
    - `test-modes.json` : Configuration des différents modes de test.
    - `syntheses.json` : Fiches pédagogiques et synthèses de cours.
    - `organismes.json` : Liste des autorités et organismes de cybersécurité.
    - `tools.json` : Catalogue d'outils et de ressources recommandés.
- `styles/` : Dossier contenant les feuilles de style (SecOps, Neobrutalism, Corpo).
- `favicon/` : Ressources graphiques et manifest de l'application.

## 🔄 Résumé des améliorations du mélange aléatoire

| Élément | Avant | Après |
| :--- | :--- | :--- |
| **Ordre des questions** | ❌ Toujours le même | ✅ Mélangé par quiz |
| **Ordre des réponses** | ❌ Toujours le même | ✅ Aléatoire pour chaque question |
| **Ordre matching (droite)** | ❌ Juste inversé | ✅ Aléatoire pour chaque question |
| **Ordre initial "remise en ordre"** | ❌ Toujours inversé | ✅ Complètement mélangé |
| **Doublons en matching** | ❌ Identifiants uniques stricts | ✅ Validation par libellé textuel |

## ⚙️ Maintenance & Fiabilisation

### Format des Questions (JSON)

Chaque question dans `data/questions.json` peut inclure un champ `media` optionnel pour afficher une image ou une vidéo :

```json
"media": {
  "type": "image",
  "src": "media/nom-du-fichier.png",
  "alt": "Texte alternatif pour l'accessibilité",
  "caption": "Légende affichée sous le média"
}
```

*Note : Pour une vidéo, utilisez `"type": "video"`. Les formats supportés dépendent des capacités du navigateur (généralement MP4/WebM).*

### Architecture & Sécurité

- **Architecture** : Séparation totale entre le code (`app.js`) et les données (`.json`).
- **Sécurité** : Utilisation d'une **Content Security Policy (CSP)** stricte pour protéger l'exécution.
- **Chargement** : Utilisation de l'API `fetch` pour un chargement asynchrone et performant.
- **Encodage** : Tous les fichiers sont en **UTF-8 sans BOM**.
- **Robustesse** : Le moteur `app.js` intègre des sécurités (ex: `hashCode` sécurisé) et les questions disposent d'identifiants uniques.
- **Versioning** : Paramètre `?v=YYYY-MM-DD-X` utilisé pour forcer le rafraîchissement du cache des scripts et données.

## 🚀 TODO - Nice to Have

- **Statistiques globales** : Visualisation de la progression globale par thème.
- **Mode sombre automatique** : Bascule basée sur les préférences système.
- **Optimisation mobile** : Améliorer les interactions tactiles sur les types Matching/Order.



## 📝 Licence

Ce projet est distribué sous licence **MIT** — libre à vous de l'utiliser, le modifier et le redistribuer, y compris à des fins commerciales, en conservant la mention de copyright.

Développé initialement par [Celio Miceli](https://www.linkedin.com/in/celio-miceli-57285a1b5) pour la formation CyberCitizen, puis repris et poursuivi par Toltek après la formation. 