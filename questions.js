window.CYBER_TRAINING_DATA = {
  "version": 1,
  "appName": "Cyber Training",
  "themes": {
    "web": {
      "name": "Web, navigation et notions de base",
      "description": "Cookies, HTTPS, domaines, navigateurs, proxy et bonnes pratiques de navigation.",
      "emoji": "🌐",
      "accent": "cyan"
    },
    "phishing": {
      "name": "Phishing et ingénierie sociale",
      "description": "Emails suspects, quishing, fraude au président, faux support et bons réflexes.",
      "emoji": "🎣",
      "accent": "pink"
    },
    "passwords": {
      "name": "Mots de passe et comptes",
      "description": "Gestionnaires, MFA, fuites de données, récupération et protection des comptes.",
      "emoji": "🔐",
      "accent": "yellow"
    },
    "devices": {
      "name": "Appareils et sécurité au travail",
      "description": "Smartphones, postes professionnels, MDM, déplacements, mises à jour et supports amovibles.",
      "emoji": "💻",
      "accent": "mint"
    },
    "malware": {
      "name": "Logiciels malveillants et incidents",
      "description": "Malwares, rançongiciels, compromission, réaction, preuves et continuité.",
      "emoji": "🦠",
      "accent": "red"
    },
    "data": {
      "name": "RGPD, données et intelligence artificielle",
      "description": "Données personnelles, minimisation, consentement, violations et usages de l’IA.",
      "emoji": "🗂️",
      "accent": "purple"
    },
    "network": {
      "name": "Réseaux, sauvegardes et acteurs",
      "description": "VPN, CERT, Safeonweb, ISO 27001, sauvegardes et protections réseau.",
      "emoji": "🛡️",
      "accent": "blue"
    },
    "osint": {
      "name": "OSINT, réseaux sociaux et e-réputation",
      "description": "Traces publiques, croisement d’informations, confidentialité et réputation numérique.",
      "emoji": "🔎",
      "accent": "orange"
    }
  },
  "questions": [
    {
      "id": "web-rssi",
      "theme": "web",
      "type": "single",
      "prompt": "Que signifie l’acronyme RSSI ?",
      "options": [
        {
          "id": "a",
          "label": "Responsable supérieur des systèmes d’information"
        },
        {
          "id": "b",
          "label": "Responsable de la sécurité des systèmes d’information"
        },
        {
          "id": "c",
          "label": "Référent de supervision des systèmes d’information"
        },
        {
          "id": "d",
          "label": "Responsable des services et solutions informatiques"
        }
      ],
      "correct": "b",
      "explanation": "Le RSSI pilote la politique de sécurité des systèmes d’information d’une organisation. Il ne se limite pas à la supervision technique : il coordonne les risques, les règles, la prévention et la réaction aux incidents.",
      "visual": "🧑‍💼",
      "certification": true,
      "title": null
    },
    {
      "id": "web-cookie",
      "theme": "web",
      "type": "single",
      "prompt": "Dans le contexte d’un site web, qu’est-ce qu’un cookie ?",
      "options": [
        {
          "id": "a",
          "label": "Un fichier du serveur contenant toutes les données personnelles des visiteurs"
        },
        {
          "id": "b",
          "label": "Une petite information enregistrée par le navigateur pour mémoriser une session ou des préférences"
        },
        {
          "id": "c",
          "label": "Le fichier qui garantit que le site utilise HTTPS"
        },
        {
          "id": "d",
          "label": "Un système permettant obligatoirement le paiement en ligne"
        }
      ],
      "correct": "b",
      "explanation": "Un cookie est une petite donnée déposée ou lue par un site dans le navigateur. Il peut mémoriser une session, un panier ou des préférences. Il ne constitue ni un certificat de sécurité ni un moyen de paiement, et il ne contient pas forcément toutes les données du visiteur.",
      "visual": "🍪",
      "certification": true,
      "title": null
    },
    {
      "id": "web-https",
      "theme": "web",
      "type": "single",
      "prompt": "Que prouve réellement le cadenas HTTPS affiché dans le navigateur ?",
      "options": [
        {
          "id": "a",
          "label": "Que le site appartient forcément à une entreprise honnête"
        },
        {
          "id": "b",
          "label": "Que la connexion entre le navigateur et le site est chiffrée"
        },
        {
          "id": "c",
          "label": "Que le site ne contient aucun logiciel malveillant"
        },
        {
          "id": "d",
          "label": "Que tous les produits vendus seront livrés"
        }
      ],
      "correct": "b",
      "explanation": "HTTPS protège les échanges contre l’écoute et l’altération pendant le transport. Un site frauduleux peut lui aussi obtenir un certificat HTTPS : il faut donc également vérifier le nom de domaine, le contexte et la réputation du site.",
      "visual": "🔒",
      "certification": false,
      "title": null
    },
    {
      "id": "web-ca-google",
      "theme": "web",
      "type": "single",
      "prompt": "Dans la capture de certification fournie, quelle autorité de certification est indiquée pour le certificat HTTPS de google.com ?",
      "options": [
        {
          "id": "a",
          "label": "Google Trust Services LLC / GTS CA"
        },
        {
          "id": "b",
          "label": "Microsoft Root Authority"
        },
        {
          "id": "c",
          "label": "Meta Certificate Service"
        },
        {
          "id": "d",
          "label": "Safeonweb Belgium CA"
        }
      ],
      "correct": "a",
      "explanation": "Dans l’exemple fourni, le certificat est délivré par Google Trust Services. Une autorité de certification vérifie certains éléments d’identité et signe le certificat ; elle ne garantit toutefois pas à elle seule la fiabilité de tout le contenu du site.",
      "visual": "📜",
      "certification": true,
      "title": null
    },
    {
      "id": "web-domain",
      "theme": "web",
      "type": "single",
      "prompt": "Quel nom de domaine doit le plus vous alerter pour une prétendue page de connexion Microsoft ?",
      "options": [
        {
          "id": "a",
          "label": "login.microsoftonline.com"
        },
        {
          "id": "b",
          "label": "account.microsoft.com"
        },
        {
          "id": "c",
          "label": "microsoft-securite-verification.com"
        },
        {
          "id": "d",
          "label": "support.microsoft.com"
        }
      ],
      "correct": "c",
      "explanation": "Le domaine important se lit juste avant l’extension. Ici, « microsoft-securite-verification.com » appartient à celui qui a enregistré ce nom et non nécessairement à Microsoft. Le simple fait de contenir une marque dans l’adresse ne rend pas le site officiel.",
      "visual": "🔗",
      "certification": false,
      "title": null
    },
    {
      "id": "web-private",
      "theme": "web",
      "type": "single",
      "prompt": "À quoi sert principalement la navigation privée ?",
      "options": [
        {
          "id": "a",
          "label": "À devenir anonyme sur Internet"
        },
        {
          "id": "b",
          "label": "À empêcher le fournisseur d’accès de voir les sites consultés"
        },
        {
          "id": "c",
          "label": "À éviter de conserver localement une partie de l’historique et des cookies après la session"
        },
        {
          "id": "d",
          "label": "À bloquer automatiquement tous les sites frauduleux"
        }
      ],
      "correct": "c",
      "explanation": "La navigation privée limite surtout les traces conservées sur l’appareil après fermeture de la fenêtre. Elle ne masque pas l’adresse IP à l’entreprise, au fournisseur d’accès ou aux sites, et elle ne remplace pas les outils de sécurité.",
      "visual": "🕶️",
      "certification": false,
      "title": null
    },
    {
      "id": "web-download",
      "theme": "web",
      "type": "multiple",
      "prompt": "Avant de télécharger un logiciel, quels contrôles sont pertinents ?",
      "options": [
        {
          "id": "a",
          "label": "Télécharger depuis le site officiel ou une source reconnue"
        },
        {
          "id": "b",
          "label": "Vérifier l’adresse du site et la réputation de la source"
        },
        {
          "id": "c",
          "label": "Désactiver l’antivirus pour accélérer l’installation"
        },
        {
          "id": "d",
          "label": "Éviter les versions piratées ou les installateurs inconnus"
        }
      ],
      "correct": [
        "a",
        "b",
        "d"
      ],
      "explanation": "Une source officielle, une adresse cohérente et une bonne réputation réduisent les risques. Désactiver les protections ou utiliser une copie piratée augmente au contraire le risque d’installer un logiciel modifié ou accompagné d’un malware.",
      "visual": "⬇️",
      "certification": false,
      "title": null
    },
    {
      "id": "web-public-wifi",
      "theme": "web",
      "type": "single",
      "prompt": "Vous devez consulter une information sensible en déplacement. Quel choix est le plus prudent ?",
      "options": [
        {
          "id": "a",
          "label": "Utiliser n’importe quel Wi-Fi public sans mot de passe"
        },
        {
          "id": "b",
          "label": "Utiliser le partage de connexion du téléphone ou un réseau de confiance"
        },
        {
          "id": "c",
          "label": "Se connecter au premier réseau portant le nom de l’hôtel"
        },
        {
          "id": "d",
          "label": "Désactiver HTTPS pour éviter les erreurs"
        }
      ],
      "correct": "b",
      "explanation": "Le partage de connexion ou un réseau connu limite le risque de se connecter à un faux point d’accès. Un Wi-Fi portant un nom crédible peut être créé par un attaquant. HTTPS et, selon les règles de l’entreprise, un VPN restent utiles.",
      "visual": "📶",
      "certification": false,
      "title": null
    },
    {
      "id": "web-proxy",
      "theme": "web",
      "type": "fill",
      "prompt": "Complétez ces affirmations concernant l’utilité d’un proxy.",
      "template": "Un proxy peut {{b1}} la navigation grâce à la mise en cache et à la compression. Il peut également {{b2}} les requêtes pour conserver une trace des événements. En tant qu’intermédiaire, il peut {{b3}} l’adresse IP directement visible par le site et {{b4}} certains contenus.",
      "blanks": [
        {
          "id": "b1",
          "choices": [
            "accélérer",
            "détruire",
            "débrancher"
          ],
          "correct": "accélérer"
        },
        {
          "id": "b2",
          "choices": [
            "enregistrer",
            "oublier",
            "imprimer"
          ],
          "correct": "enregistrer"
        },
        {
          "id": "b3",
          "choices": [
            "masquer",
            "publier",
            "supprimer définitivement"
          ],
          "correct": "masquer"
        },
        {
          "id": "b4",
          "choices": [
            "filtrer l’accès à",
            "sauvegarder hors ligne",
            "traduire automatiquement"
          ],
          "correct": "filtrer l’accès à"
        }
      ],
      "explanation": "Un proxy reçoit les requêtes à la place de l’utilisateur, puis les transmet. Selon sa configuration, il peut accélérer certains chargements, journaliser, masquer l’adresse directement présentée au site et filtrer des contenus. Cela ne garantit toutefois pas un anonymat absolu.",
      "visual": "🚦",
      "certification": true,
      "title": null
    },
    {
      "id": "web-update-browser",
      "theme": "web",
      "type": "single",
      "prompt": "Pourquoi faut-il maintenir son navigateur à jour ?",
      "options": [
        {
          "id": "a",
          "label": "Uniquement pour changer son apparence"
        },
        {
          "id": "b",
          "label": "Pour corriger des failles et améliorer la compatibilité avec les sites"
        },
        {
          "id": "c",
          "label": "Pour empêcher toute collecte de données par tous les sites"
        },
        {
          "id": "d",
          "label": "Parce qu’un navigateur ancien n’affiche jamais de pages web"
        }
      ],
      "correct": "b",
      "explanation": "Les mises à jour corrigent notamment des vulnérabilités pouvant être exploitées par une page malveillante. Elles améliorent aussi la compatibilité. Elles ne suppriment pas automatiquement tout suivi publicitaire et ne rendent pas l’utilisateur invulnérable.",
      "visual": "🔄",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-blocked",
      "theme": "phishing",
      "type": "single",
      "prompt": "Un email annonce que votre compte sera bloqué dans 24 heures et exige une connexion immédiate via un bouton. Quel est le meilleur premier réflexe ?",
      "options": [
        {
          "id": "a",
          "label": "Cliquer rapidement pour éviter la fermeture"
        },
        {
          "id": "b",
          "label": "Répondre avec son mot de passe pour vérifier son identité"
        },
        {
          "id": "c",
          "label": "Ne pas utiliser le lien et ouvrir le service depuis l’adresse habituelle ou l’application officielle"
        },
        {
          "id": "d",
          "label": "Transférer le message à tous ses collègues sans commentaire"
        }
      ],
      "correct": "c",
      "explanation": "L’urgence est un levier classique du phishing. Il vaut mieux ouvrir soi-même le site ou l’application officielle et vérifier les notifications. Répondre ou cliquer depuis le message peut conduire vers une fausse page.",
      "visual": "⏰",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-boss",
      "theme": "phishing",
      "type": "multiple",
      "prompt": "Un prétendu responsable demande en urgence et en secret l’achat de cartes cadeaux. Quels éléments doivent vous alerter ?",
      "options": [
        {
          "id": "a",
          "label": "La demande inhabituelle d’argent ou de cartes cadeaux"
        },
        {
          "id": "b",
          "label": "L’interdiction de téléphoner ou de vérifier"
        },
        {
          "id": "c",
          "label": "Le caractère urgent et confidentiel"
        },
        {
          "id": "d",
          "label": "Le fait que le message contient une formule de politesse"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "La fraude au président combine autorité, urgence, secret et demande inhabituelle. Une formule polie ne prouve rien. Il faut vérifier par un canal indépendant, par exemple en appelant le responsable avec un numéro connu.",
      "visual": "🎁",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-iban",
      "theme": "phishing",
      "type": "single",
      "prompt": "Un fournisseur habituel vous communique un nouvel IBAN par email. Que faut-il faire avant tout paiement ?",
      "options": [
        {
          "id": "a",
          "label": "Modifier immédiatement la fiche fournisseur"
        },
        {
          "id": "b",
          "label": "Vérifier la demande par un canal connu et selon la procédure interne"
        },
        {
          "id": "c",
          "label": "Répondre à l’email en demandant simplement « êtes-vous sûr ? »"
        },
        {
          "id": "d",
          "label": "Effectuer un petit paiement test sans prévenir personne"
        }
      ],
      "correct": "b",
      "explanation": "La boîte du fournisseur ou celle d’un collègue peut être compromise. Une vérification par un numéro déjà connu et une procédure à deux personnes permettent de détecter une fraude au changement d’IBAN.",
      "visual": "🏦",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-quishing",
      "theme": "phishing",
      "type": "single",
      "prompt": "Qu’est-ce que le quishing ?",
      "options": [
        {
          "id": "a",
          "label": "Une attaque par appel téléphonique uniquement"
        },
        {
          "id": "b",
          "label": "Une tentative de phishing utilisant un QR code"
        },
        {
          "id": "c",
          "label": "Un logiciel qui accélère les paiements"
        },
        {
          "id": "d",
          "label": "Une méthode de sauvegarde dans le cloud"
        }
      ],
      "correct": "b",
      "explanation": "Le QR code masque l’adresse vers laquelle il redirige et peut mener à une fausse page de connexion ou de paiement. Il faut vérifier sa provenance et examiner l’adresse affichée avant de saisir des informations.",
      "visual": "🔳",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-support",
      "theme": "phishing",
      "type": "multiple",
      "prompt": "Un faux technicien vous demande d’installer un outil de prise en main à distance et de lui donner un code. Quels réflexes sont corrects ?",
      "options": [
        {
          "id": "a",
          "label": "Refuser et interrompre l’appel"
        },
        {
          "id": "b",
          "label": "Contacter le vrai support avec les coordonnées habituelles"
        },
        {
          "id": "c",
          "label": "Donner le code si la personne connaît votre nom"
        },
        {
          "id": "d",
          "label": "Signaler la tentative selon la procédure de l’organisation"
        }
      ],
      "correct": [
        "a",
        "b",
        "d"
      ],
      "explanation": "Un nom, un service ou du vocabulaire technique peuvent être obtenus publiquement. Un code de connexion ou de MFA ne doit pas être communiqué. Il faut vérifier l’identité par un canal indépendant et signaler l’incident.",
      "visual": "☎️",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-spear",
      "theme": "phishing",
      "type": "single",
      "prompt": "Quelle différence caractérise le mieux le spear phishing ?",
      "options": [
        {
          "id": "a",
          "label": "Il vise une personne ou une organisation avec un message personnalisé"
        },
        {
          "id": "b",
          "label": "Il ne contient jamais de lien"
        },
        {
          "id": "c",
          "label": "Il est forcément envoyé par SMS"
        },
        {
          "id": "d",
          "label": "Il ne cherche jamais à voler d’informations"
        }
      ],
      "correct": "a",
      "explanation": "Le spear phishing utilise des informations ciblées — fonction, collègues, projets ou habitudes — pour paraître crédible. Il peut prendre la forme d’un email, d’un message ou d’un appel.",
      "visual": "🎯",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-attachment",
      "theme": "phishing",
      "type": "multiple",
      "prompt": "Vous recevez une facture inattendue en pièce jointe. Quelles actions sont prudentes ?",
      "options": [
        {
          "id": "a",
          "label": "Vérifier l’expéditeur et le contexte par un autre canal"
        },
        {
          "id": "b",
          "label": "Ouvrir la pièce jointe uniquement parce qu’elle est au format PDF"
        },
        {
          "id": "c",
          "label": "Analyser le fichier avec les outils autorisés par l’organisation"
        },
        {
          "id": "d",
          "label": "Signaler le message s’il reste suspect"
        }
      ],
      "correct": [
        "a",
        "c",
        "d"
      ],
      "explanation": "Aucun format n’est automatiquement inoffensif : des documents peuvent contenir des liens, des scripts ou exploiter des failles. La vérification du contexte et l’analyse avec les outils autorisés sont plus fiables que l’extension seule.",
      "visual": "📎",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-smishing",
      "theme": "phishing",
      "type": "single",
      "prompt": "Un SMS prétend qu’un colis est bloqué et demande 1,99 € via un lien. Quelle attaque est la plus probable ?",
      "options": [
        {
          "id": "a",
          "label": "Du smishing"
        },
        {
          "id": "b",
          "label": "Une sauvegarde automatique"
        },
        {
          "id": "c",
          "label": "Un audit OSINT"
        },
        {
          "id": "d",
          "label": "Une mise à jour du téléphone"
        }
      ],
      "correct": "a",
      "explanation": "Le smishing est du phishing par SMS. La petite somme sert souvent à récupérer des données bancaires ou à pousser vers un abonnement frauduleux. Il vaut mieux consulter directement le site ou l’application du transporteur.",
      "visual": "📱",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-mfa-code",
      "theme": "phishing",
      "type": "single",
      "prompt": "Une personne vous demande le code à six chiffres reçu par SMS pour « confirmer votre compte ». Que devez-vous faire ?",
      "options": [
        {
          "id": "a",
          "label": "Le communiquer si la personne travaille au support"
        },
        {
          "id": "b",
          "label": "Ne jamais le communiquer et interrompre la démarche"
        },
        {
          "id": "c",
          "label": "Le publier dans le canal d’équipe pour demander conseil"
        },
        {
          "id": "d",
          "label": "Le communiquer uniquement s’il expire dans moins d’une minute"
        }
      ],
      "correct": "b",
      "explanation": "Un code de MFA sert précisément à prouver que vous possédez le second facteur. Le transmettre permet à l’attaquant de finaliser une connexion. Un support légitime n’a normalement pas besoin de ce code.",
      "visual": "6️⃣",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-display-name",
      "theme": "phishing",
      "type": "single",
      "prompt": "Pourquoi le nom affiché de l’expéditeur ne suffit-il pas à prouver l’origine d’un email ?",
      "options": [
        {
          "id": "a",
          "label": "Parce qu’il peut être facilement modifié ou imité"
        },
        {
          "id": "b",
          "label": "Parce qu’un email n’a jamais d’adresse réelle"
        },
        {
          "id": "c",
          "label": "Parce que tous les messages professionnels sont anonymes"
        },
        {
          "id": "d",
          "label": "Parce que le nom affiché est toujours supprimé par l’antivirus"
        }
      ],
      "correct": "a",
      "explanation": "Le champ visible peut afficher « Direction », « Microsoft » ou le nom d’un collègue alors que l’adresse réelle est différente. Il faut examiner l’adresse complète et le contexte, sans se fier uniquement au nom.",
      "visual": "📨",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-report-order",
      "theme": "phishing",
      "type": "order",
      "prompt": "Remettez dans un ordre logique les premières actions face à un email suspect non ouvert.",
      "items": [
        [
          "o1",
          "Ne pas cliquer et ne pas ouvrir la pièce jointe"
        ],
        [
          "o2",
          "Vérifier le contexte et l’adresse de l’expéditeur"
        ],
        [
          "o3",
          "Signaler le message avec le canal prévu"
        ],
        [
          "o4",
          "Supprimer ou classer le message selon les consignes reçues"
        ]
      ],
      "correctOrder": [
        "o1",
        "o2",
        "o3",
        "o4"
      ],
      "explanation": "On évite d’abord toute interaction risquée. On vérifie ensuite les éléments disponibles, puis on signale afin que l’organisation puisse protéger les autres utilisateurs. La suppression vient après le signalement lorsqu’une procédure existe.",
      "visual": "🧭",
      "certification": false,
      "title": null
    },
    {
      "id": "phish-urgent-language",
      "theme": "phishing",
      "type": "single",
      "prompt": "Quel message doit être considéré comme le plus suspect ?",
      "options": [
        {
          "id": "a",
          "label": "Le rapport mensuel est disponible dans l’espace habituel"
        },
        {
          "id": "b",
          "label": "ACTION IMMÉDIATE : votre compte sera supprimé dans 15 minutes, confirmez votre mot de passe ici"
        },
        {
          "id": "c",
          "label": "La réunion est déplacée à demain, vérifiez votre calendrier"
        },
        {
          "id": "d",
          "label": "Votre collègue vous remercie pour un document attendu"
        }
      ],
      "correct": "b",
      "explanation": "L’urgence extrême, la menace et la demande de mot de passe sont des indicateurs forts. Un message légitime peut être urgent, mais il ne faut jamais laisser la pression remplacer la vérification.",
      "visual": "🚨",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-manager",
      "theme": "passwords",
      "type": "multiple",
      "prompt": "Quels sont les rôles habituels d’un gestionnaire de mots de passe ?",
      "options": [
        {
          "id": "a",
          "label": "Saisir automatiquement des identifiants lorsque l’utilisateur l’autorise"
        },
        {
          "id": "b",
          "label": "Stocker de nombreux mots de passe sous forme chiffrée"
        },
        {
          "id": "c",
          "label": "Générer des mots de passe robustes"
        },
        {
          "id": "d",
          "label": "Sauvegarder sans protection tous les mots de passe d’une organisation sur un serveur public"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "Un gestionnaire sérieux chiffre le coffre, génère des secrets uniques et facilite leur saisie. Il ne doit pas exposer les mots de passe en clair sur un serveur public. Le mot de passe maître et la MFA restent essentiels.",
      "visual": "🗝️",
      "certification": true,
      "title": null
    },
    {
      "id": "pass-reuse-grid",
      "theme": "passwords",
      "type": "tf-grid",
      "prompt": "Indiquez si chaque affirmation sur la réutilisation des mots de passe est vraie ou fausse.",
      "statements": [
        {
          "id": "s1",
          "text": "Un mot de passe très fort peut être réutilisé sur plusieurs services sans risque supplémentaire.",
          "correct": false,
          "explanation": "Une fuite sur un seul service peut permettre des tentatives sur tous les autres comptes utilisant le même secret."
        },
        {
          "id": "s2",
          "text": "Le stockage dans un gestionnaire chiffré ne justifie pas de réutiliser le même mot de passe.",
          "correct": true,
          "explanation": "Le gestionnaire permet justement d’utiliser un mot de passe unique par service sans devoir tous les mémoriser."
        },
        {
          "id": "s3",
          "text": "Plusieurs mots de passe faibles sont préférables à un seul mot de passe fort réutilisé partout.",
          "correct": true,
          "explanation": "L’unicité limite l’effet domino, mais chaque mot de passe doit malgré tout être suffisamment robuste. L’idéal est unique et fort."
        }
      ],
      "visual": "♻️",
      "certification": true,
      "title": null,
      "explanation": "Chaque affirmation doit être évaluée séparément. Consulte le détail ligne par ligne ci-dessous."
    },
    {
      "id": "pass-mfa",
      "theme": "passwords",
      "type": "single",
      "prompt": "Quel est l’intérêt principal de l’authentification multifacteur ?",
      "options": [
        {
          "id": "a",
          "label": "Remplacer toutes les mises à jour"
        },
        {
          "id": "b",
          "label": "Ajouter une preuve supplémentaire en plus du mot de passe"
        },
        {
          "id": "c",
          "label": "Rendre le mot de passe visible au support"
        },
        {
          "id": "d",
          "label": "Empêcher toute erreur humaine"
        }
      ],
      "correct": "b",
      "explanation": "La MFA exige au moins deux catégories de preuves, par exemple un mot de passe et une application d’authentification. Si le mot de passe fuite, l’attaquant doit encore obtenir le second facteur. Elle réduit le risque sans le supprimer totalement.",
      "visual": "🧩",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-phrase",
      "theme": "passwords",
      "type": "single",
      "prompt": "Laquelle de ces options constitue généralement la meilleure base pour un mot de passe maître ?",
      "options": [
        {
          "id": "a",
          "label": "12345678"
        },
        {
          "id": "b",
          "label": "Celio2026"
        },
        {
          "id": "c",
          "label": "Une longue phrase de passe unique composée de plusieurs mots imprévisibles"
        },
        {
          "id": "d",
          "label": "Le prénom de son animal suivi de sa date de naissance"
        }
      ],
      "correct": "c",
      "explanation": "La longueur et l’imprévisibilité sont déterminantes. Une phrase de passe longue, unique et non liée à des informations publiques résiste mieux aux devinettes et aux attaques automatisées que des variantes prévisibles.",
      "visual": "🧠",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-hibp",
      "theme": "passwords",
      "type": "single",
      "prompt": "À quoi sert le service Have I Been Pwned dans l’exercice de la formation ?",
      "options": [
        {
          "id": "a",
          "label": "À tester le mot de passe d’une autre personne"
        },
        {
          "id": "b",
          "label": "À vérifier si une adresse email apparaît dans des fuites de données connues"
        },
        {
          "id": "c",
          "label": "À supprimer automatiquement toutes les données volées"
        },
        {
          "id": "d",
          "label": "À installer un antivirus"
        }
      ],
      "correct": "b",
      "explanation": "Le service permet de rechercher une adresse email dans des bases de fuites connues. Il ne faut pas y saisir son mot de passe dans le champ de recherche d’adresse, ni tester les informations d’autrui sans autorisation.",
      "visual": "💥",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-breach",
      "theme": "passwords",
      "type": "multiple",
      "prompt": "Vous apprenez qu’un service que vous utilisez a subi une fuite. Quelles actions sont pertinentes ?",
      "options": [
        {
          "id": "a",
          "label": "Changer le mot de passe de ce service"
        },
        {
          "id": "b",
          "label": "Changer aussi les autres comptes où le même mot de passe a été réutilisé"
        },
        {
          "id": "c",
          "label": "Activer la MFA si elle est disponible"
        },
        {
          "id": "d",
          "label": "Ignorer la fuite si le compte fonctionne encore"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "La priorité est de rendre les identifiants volés inutilisables. La réutilisation impose de sécuriser tous les comptes concernés. La MFA et la surveillance des connexions ajoutent une protection supplémentaire.",
      "visual": "🚿",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-security-question",
      "theme": "passwords",
      "type": "single",
      "prompt": "Pourquoi les réponses aux questions secrètes comme « nom de jeune fille » peuvent-elles être faibles ?",
      "options": [
        {
          "id": "a",
          "label": "Parce qu’elles sont toujours chiffrées"
        },
        {
          "id": "b",
          "label": "Parce que les réponses peuvent être devinées ou retrouvées publiquement"
        },
        {
          "id": "c",
          "label": "Parce qu’elles remplacent la MFA"
        },
        {
          "id": "d",
          "label": "Parce qu’elles empêchent toute récupération de compte"
        }
      ],
      "correct": "b",
      "explanation": "Des informations familiales, scolaires ou personnelles peuvent apparaître sur les réseaux sociaux ou être connues de proches. Lorsqu’un service l’autorise, une réponse aléatoire stockée dans le gestionnaire est plus sûre qu’une réponse réelle et prévisible.",
      "visual": "❓",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-session",
      "theme": "passwords",
      "type": "multiple",
      "prompt": "Vous vous êtes connecté à un réseau social depuis un ordinateur qui ne vous appartient pas. Que pouvez-vous faire ensuite ?",
      "options": [
        {
          "id": "a",
          "label": "Fermer la session à distance depuis les paramètres de sécurité"
        },
        {
          "id": "b",
          "label": "Vérifier les appareils et sessions connectés"
        },
        {
          "id": "c",
          "label": "Changer le mot de passe si vous pensez que les identifiants ont été exposés"
        },
        {
          "id": "d",
          "label": "Attendre que la session disparaisse d’elle-même"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "Les services proposent souvent une liste des sessions et une déconnexion à distance. Si l’ordinateur était public ou suspect, changer le mot de passe et vérifier la MFA réduit le risque de maintien d’accès.",
      "visual": "🚪",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-recovery-codes",
      "theme": "passwords",
      "type": "single",
      "prompt": "Comment conserver des codes de récupération MFA ?",
      "options": [
        {
          "id": "a",
          "label": "Dans une publication publique pour ne pas les perdre"
        },
        {
          "id": "b",
          "label": "Dans un emplacement sûr, séparé du téléphone principal"
        },
        {
          "id": "c",
          "label": "Dans le nom du fichier affiché sur le bureau"
        },
        {
          "id": "d",
          "label": "En les envoyant à tous ses contacts"
        }
      ],
      "correct": "b",
      "explanation": "Les codes de récupération permettent de contourner le second facteur en cas de perte du téléphone. Ils doivent donc être protégés comme des mots de passe et idéalement conservés dans un coffre ou un support sécurisé distinct.",
      "visual": "🧾",
      "certification": false,
      "title": null
    },
    {
      "id": "pass-alert",
      "theme": "passwords",
      "type": "single",
      "prompt": "Vous recevez une alerte de connexion depuis un appareil inconnu. Quel réflexe est le plus approprié ?",
      "options": [
        {
          "id": "a",
          "label": "Ignorer l’alerte si aucun argent n’a disparu"
        },
        {
          "id": "b",
          "label": "Vérifier l’activité, fermer les sessions inconnues et sécuriser le compte"
        },
        {
          "id": "c",
          "label": "Répondre à l’email avec le mot de passe"
        },
        {
          "id": "d",
          "label": "Publier une capture contenant le code de sécurité"
        }
      ],
      "correct": "b",
      "explanation": "Une alerte inconnue peut signaler une tentative ou une compromission. Il faut passer par l’application ou le site officiel, révoquer les sessions, changer le mot de passe si nécessaire et vérifier les méthodes de récupération.",
      "visual": "👀",
      "certification": false,
      "title": null
    },
    {
      "id": "device-phone-lock",
      "theme": "devices",
      "type": "multiple",
      "prompt": "Quelles méthodes offrent un véritable verrouillage de smartphone ?",
      "options": [
        {
          "id": "a",
          "label": "Un code PIN suffisamment robuste"
        },
        {
          "id": "b",
          "label": "Un mot de passe"
        },
        {
          "id": "c",
          "label": "Une empreinte digitale"
        },
        {
          "id": "d",
          "label": "La reconnaissance faciale sécurisée"
        },
        {
          "id": "e",
          "label": "Un simple balayage sans verrouillage"
        }
      ],
      "correct": [
        "a",
        "b",
        "c",
        "d"
      ],
      "explanation": "Un balayage seul ne contrôle pas l’identité. PIN, mot de passe et biométrie peuvent protéger l’accès, à condition que la configuration et la technologie soient adaptées. Un code de secours robuste reste important.",
      "visual": "📲",
      "certification": true,
      "title": null
    },
    {
      "id": "device-mdm",
      "theme": "devices",
      "type": "multiple",
      "prompt": "Dans un cadre professionnel et avec des règles clairement définies, quelles actions peuvent relever d’un MDM ?",
      "options": [
        {
          "id": "a",
          "label": "Vérifier les applications installées selon la politique de l’entreprise"
        },
        {
          "id": "b",
          "label": "Forcer l’installation d’une application professionnelle requise"
        },
        {
          "id": "c",
          "label": "Intercepter sans limite toutes les communications privées"
        },
        {
          "id": "d",
          "label": "Maintenir la caméra frontale allumée pour surveiller l’employé"
        },
        {
          "id": "e",
          "label": "Appliquer des paramètres de sécurité ou effacer à distance les données professionnelles"
        }
      ],
      "correct": [
        "a",
        "b",
        "e"
      ],
      "explanation": "Un MDM sert à configurer, sécuriser et gérer les appareils selon une politique connue. La surveillance permanente et l’interception généralisée seraient disproportionnées et soulèveraient de graves problèmes de vie privée et de légalité.",
      "visual": "📡",
      "certification": true,
      "title": null
    },
    {
      "id": "device-travel",
      "theme": "devices",
      "type": "fill",
      "prompt": "Complétez les bonnes pratiques avant et pendant un voyage d’affaires.",
      "template": "Avant de partir, je pense à {{b1}} mon ordinateur. Je n’emporte que les {{b2}} nécessaires à ma mission. Pendant le voyage, j’évite autant que possible {{b3}}.",
      "blanks": [
        {
          "id": "b1",
          "choices": [
            "sauvegarder",
            "désactiver définitivement",
            "partager publiquement"
          ],
          "correct": "sauvegarder"
        },
        {
          "id": "b2",
          "choices": [
            "données",
            "câbles",
            "publicités"
          ],
          "correct": "données"
        },
        {
          "id": "b3",
          "choices": [
            "le Wi-Fi public",
            "les mises à jour",
            "le verrouillage de l’écran"
          ],
          "correct": "le Wi-Fi public"
        }
      ],
      "explanation": "Une sauvegarde limite les conséquences d’une perte ou d’un vol. La minimisation réduit la quantité d’informations exposées. Les réseaux publics inconnus doivent être évités ou utilisés avec les protections et consignes prévues par l’organisation.",
      "visual": "✈️",
      "certification": true,
      "title": null
    },
    {
      "id": "device-usb",
      "theme": "devices",
      "type": "single",
      "prompt": "Vous trouvez une clé USB inconnue dans le parking de l’entreprise. Que faire ?",
      "options": [
        {
          "id": "a",
          "label": "La brancher pour identifier son propriétaire"
        },
        {
          "id": "b",
          "label": "La remettre au service compétent sans la connecter"
        },
        {
          "id": "c",
          "label": "La tester d’abord sur l’ordinateur d’un collègue"
        },
        {
          "id": "d",
          "label": "L’emporter chez soi pour l’examiner"
        }
      ],
      "correct": "b",
      "explanation": "Une clé peut exploiter automatiquement l’ordinateur ou contenir des fichiers piégés. La curiosité est précisément le levier recherché. Il faut suivre la procédure interne sans la brancher.",
      "visual": "💾",
      "certification": false,
      "title": null
    },
    {
      "id": "device-lock-screen",
      "theme": "devices",
      "type": "single",
      "prompt": "Vous quittez votre bureau pour quelques minutes. Quel réflexe adopter ?",
      "options": [
        {
          "id": "a",
          "label": "Laisser la session ouverte si les collègues sont connus"
        },
        {
          "id": "b",
          "label": "Verrouiller la session"
        },
        {
          "id": "c",
          "label": "Éteindre uniquement l’écran"
        },
        {
          "id": "d",
          "label": "Poser un papier sur le clavier"
        }
      ],
      "correct": "b",
      "explanation": "Le verrouillage empêche une personne d’utiliser votre session ou de consulter les informations affichées. Éteindre l’écran ne ferme pas la session et la confiance dans les collègues ne remplace pas une mesure simple de sécurité.",
      "visual": "🪟",
      "certification": false,
      "title": null
    },
    {
      "id": "device-cloud-personal",
      "theme": "devices",
      "type": "multiple",
      "prompt": "Quels risques existent lorsque des documents personnels sont stockés dans un cloud professionnel ?",
      "options": [
        {
          "id": "a",
          "label": "Des collègues ou administrateurs peuvent y avoir accès selon les droits"
        },
        {
          "id": "b",
          "label": "Les données peuvent être touchées par un incident visant l’entreprise"
        },
        {
          "id": "c",
          "label": "L’accès peut être perdu en quittant l’organisation"
        },
        {
          "id": "d",
          "label": "Aucun risque n’existe car le compte est professionnel"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "Le compte et l’espace appartiennent au contexte professionnel. Les droits, la conservation et l’accès peuvent changer, notamment au départ de l’employé. Il faut respecter les règles internes et séparer les usages personnels et professionnels.",
      "visual": "☁️",
      "certification": true,
      "title": null
    },
    {
      "id": "device-windows-version",
      "theme": "devices",
      "type": "single",
      "prompt": "L’écran « Informations système » indique : Édition = Windows Server 2022 Datacenter ; Type du système = système d’exploitation 64 bits. Quelle réponse faut-il sélectionner ?",
      "options": [
        {
          "id": "a",
          "label": "Windows 10 Famille – 32 bits"
        },
        {
          "id": "b",
          "label": "Windows Server 2022 Datacenter – 64 bits"
        },
        {
          "id": "c",
          "label": "Windows 11 Pro – 64 bits"
        },
        {
          "id": "d",
          "label": "macOS Server – 64 bits"
        }
      ],
      "correct": "b",
      "explanation": "La réponse reprend exactement l’édition et l’architecture affichées dans les informations système. Ce type de question vérifie la capacité à retrouver une information technique dans l’interface plutôt qu’à la deviner.",
      "visual": "🪟",
      "certification": true,
      "title": null
    },
    {
      "id": "device-updates",
      "theme": "devices",
      "type": "single",
      "prompt": "Pourquoi ne faut-il pas repousser indéfiniment les mises à jour importantes ?",
      "options": [
        {
          "id": "a",
          "label": "Elles corrigent souvent des vulnérabilités connues"
        },
        {
          "id": "b",
          "label": "Elles suppriment toujours les fichiers personnels"
        },
        {
          "id": "c",
          "label": "Elles rendent obligatoirement l’appareil plus lent"
        },
        {
          "id": "d",
          "label": "Elles servent uniquement à changer les icônes"
        }
      ],
      "correct": "a",
      "explanation": "Lorsqu’une faille est publiée, les attaquants peuvent rapidement chercher les appareils non corrigés. Les mises à jour doivent être installées selon les règles de l’organisation, après sauvegarde ou validation lorsque cela est nécessaire.",
      "visual": "🩹",
      "certification": false,
      "title": null
    },
    {
      "id": "device-screen",
      "theme": "devices",
      "type": "multiple",
      "prompt": "Vous travaillez dans un train avec des données professionnelles. Quelles précautions sont utiles ?",
      "options": [
        {
          "id": "a",
          "label": "Éviter d’afficher des informations inutiles"
        },
        {
          "id": "b",
          "label": "Se placer de façon à limiter les regards indiscrets"
        },
        {
          "id": "c",
          "label": "Utiliser un filtre de confidentialité si nécessaire"
        },
        {
          "id": "d",
          "label": "Lire à voix haute les informations sensibles"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "La sécurité physique inclut le risque de « shoulder surfing », c’est-à-dire l’observation de l’écran. Limiter les données visibles et l’angle de vue réduit ce risque ; lire les informations à voix haute l’augmente.",
      "visual": "🚆",
      "certification": false,
      "title": null
    },
    {
      "id": "device-bluetooth",
      "theme": "devices",
      "type": "single",
      "prompt": "Que faire du Bluetooth lorsqu’il n’est pas utilisé ?",
      "options": [
        {
          "id": "a",
          "label": "Le laisser toujours visible pour faciliter les connexions"
        },
        {
          "id": "b",
          "label": "Le désactiver ou limiter la visibilité selon le besoin"
        },
        {
          "id": "c",
          "label": "Accepter toutes les demandes d’association"
        },
        {
          "id": "d",
          "label": "Partager le code d’association publiquement"
        }
      ],
      "correct": "b",
      "explanation": "Réduire les interfaces actives limite la surface d’attaque et les connexions accidentelles. Il faut refuser les associations inattendues et maintenir l’appareil à jour.",
      "visual": "🔵",
      "certification": false,
      "title": null
    },
    {
      "id": "device-lost",
      "theme": "devices",
      "type": "order",
      "prompt": "Un ordinateur professionnel est volé. Remettez les actions dans un ordre de priorité raisonnable.",
      "items": [
        [
          "o1",
          "Prévenir immédiatement l’organisation ou le support"
        ],
        [
          "o2",
          "Faire bloquer l’accès et révoquer les sessions ou appareils"
        ],
        [
          "o3",
          "Identifier les données et comptes potentiellement exposés"
        ],
        [
          "o4",
          "Suivre les démarches complémentaires : plainte, analyse et notification si nécessaire"
        ]
      ],
      "correctOrder": [
        "o1",
        "o2",
        "o3",
        "o4"
      ],
      "explanation": "Le signalement rapide permet de lancer le verrouillage à distance et la révocation des accès. L’analyse des données présentes détermine ensuite l’impact et les obligations éventuelles. Attendre augmente le temps disponible pour un attaquant.",
      "visual": "💼",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-match",
      "theme": "malware",
      "type": "matching",
      "prompt": "Reliez chaque technique malveillante à sa description.",
      "pairs": [
        {
          "leftId": "l1",
          "left": "Backdoor",
          "rightId": "r1",
          "right": "Maintient un accès caché ou un canal de communication dans le système."
        },
        {
          "leftId": "l2",
          "left": "Rootkit",
          "rightId": "r2",
          "right": "Dissimule des programmes ou activités malveillantes pour les rendre difficiles à détecter."
        },
        {
          "leftId": "l3",
          "left": "Keylogger",
          "rightId": "r3",
          "right": "Enregistre les frappes au clavier, notamment des identifiants ou données bancaires."
        }
      ],
      "explanation": "Une backdoor fournit un accès caché, un rootkit cherche surtout à dissimuler la présence malveillante et un keylogger capture les frappes. Ces techniques peuvent être combinées dans une même attaque.",
      "visual": "🧬",
      "certification": true,
      "title": null
    },
    {
      "id": "malware-ransomware",
      "theme": "malware",
      "type": "single",
      "prompt": "Des fichiers deviennent illisibles et un message exige une rançon. Quelle réaction immédiate est la plus appropriée ?",
      "options": [
        {
          "id": "a",
          "label": "Payer immédiatement"
        },
        {
          "id": "b",
          "label": "Déconnecter l’appareil du réseau et prévenir le service compétent"
        },
        {
          "id": "c",
          "label": "Continuer à travailler pour vérifier si le problème disparaît"
        },
        {
          "id": "d",
          "label": "Supprimer toutes les sauvegardes"
        }
      ],
      "correct": "b",
      "explanation": "L’isolement peut limiter la propagation et le chiffrement de ressources partagées. Il faut prévenir rapidement pour préserver les preuves et lancer le plan de réponse. Le paiement ne garantit ni la récupération ni l’absence de nouvelle extorsion.",
      "visual": "💸",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-trojan",
      "theme": "malware",
      "type": "single",
      "prompt": "Qu’est-ce qu’un cheval de Troie informatique ?",
      "options": [
        {
          "id": "a",
          "label": "Un programme malveillant déguisé en logiciel ou fichier légitime"
        },
        {
          "id": "b",
          "label": "Une sauvegarde stockée hors ligne"
        },
        {
          "id": "c",
          "label": "Une norme de sécurité"
        },
        {
          "id": "d",
          "label": "Un protocole de chiffrement du Wi-Fi"
        }
      ],
      "correct": "a",
      "explanation": "Le cheval de Troie trompe l’utilisateur afin qu’il l’installe ou l’exécute. Contrairement à un ver, il ne se propage pas nécessairement tout seul ; il peut ensuite télécharger d’autres charges ou ouvrir un accès.",
      "visual": "🐴",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-types",
      "theme": "malware",
      "type": "matching",
      "prompt": "Reliez le type de logiciel malveillant à sa caractéristique principale.",
      "pairs": [
        {
          "leftId": "l1",
          "left": "Virus",
          "rightId": "r1",
          "right": "S’attache généralement à un fichier ou programme et se propage lorsqu’il est exécuté."
        },
        {
          "leftId": "l2",
          "left": "Ver",
          "rightId": "r2",
          "right": "Peut se propager automatiquement sur un réseau sans action répétée de l’utilisateur."
        },
        {
          "leftId": "l3",
          "left": "Spyware",
          "rightId": "r3",
          "right": "Collecte discrètement des informations sur l’utilisateur ou l’appareil."
        },
        {
          "leftId": "l4",
          "left": "Rançongiciel",
          "rightId": "r4",
          "right": "Bloque ou chiffre des données afin d’exiger un paiement."
        }
      ],
      "explanation": "Les familles se distinguent par leur comportement principal, même si un malware moderne peut cumuler plusieurs fonctions : propagation, espionnage, vol d’identifiants et chiffrement.",
      "visual": "🧪",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-attachments-grid",
      "theme": "malware",
      "type": "tf-grid",
      "prompt": "Indiquez si chaque affirmation sur les pièces jointes est vraie ou fausse.",
      "statements": [
        {
          "id": "s1",
          "text": "Seuls les fichiers portant l’extension .exe sont risqués.",
          "correct": false,
          "explanation": "Documents Office, PDF, archives, scripts et raccourcis peuvent aussi être dangereux ou contenir des liens malveillants."
        },
        {
          "id": "s2",
          "text": "Le poids du fichier suffit à déterminer s’il est dangereux.",
          "correct": false,
          "explanation": "Un fichier malveillant peut être minuscule ou volumineux ; la taille ne constitue pas une preuve."
        },
        {
          "id": "s3",
          "text": "Un pare-feu actif supprime tout risque lié aux pièces jointes.",
          "correct": false,
          "explanation": "Le pare-feu filtre certains échanges réseau mais n’empêche pas toutes les actions dangereuses d’un fichier ouvert."
        },
        {
          "id": "s4",
          "text": "Un antivirus peut analyser certaines pièces jointes, sans garantir une détection parfaite.",
          "correct": true,
          "explanation": "Les outils détectent de nombreuses menaces mais peuvent manquer une attaque nouvelle ou spécialement conçue."
        },
        {
          "id": "s5",
          "text": "Une image jointe est toujours inoffensive.",
          "correct": false,
          "explanation": "Une image peut exploiter une faille, masquer une extension ou contenir des éléments trompeurs ; aucun format n’est garanti sans contexte."
        }
      ],
      "visual": "📎",
      "certification": true,
      "title": null,
      "explanation": "Chaque affirmation doit être évaluée séparément. Consulte le détail ligne par ligne ci-dessous."
    },
    {
      "id": "malware-slow",
      "theme": "malware",
      "type": "multiple",
      "prompt": "Après une pause, votre ordinateur professionnel est devenu anormalement lent. Quelles actions sont pertinentes ?",
      "options": [
        {
          "id": "a",
          "label": "Informer le responsable ou le service informatique"
        },
        {
          "id": "b",
          "label": "Déconnecter temporairement l’appareil des réseaux si une compromission est suspectée"
        },
        {
          "id": "c",
          "label": "Publier une photo de l’écran sur les réseaux sociaux"
        },
        {
          "id": "d",
          "label": "Redémarrer immédiatement avant de conserver toute information"
        },
        {
          "id": "e",
          "label": "Noter les symptômes et l’heure d’apparition"
        }
      ],
      "correct": [
        "a",
        "b",
        "e"
      ],
      "explanation": "Le signalement, l’isolement et la conservation des observations aident l’équipe à analyser l’incident. Un redémarrage peut parfois effacer des traces utiles ou déclencher d’autres actions ; il doit suivre les consignes du support.",
      "visual": "🐢",
      "certification": true,
      "title": null
    },
    {
      "id": "malware-rssi-actions",
      "theme": "malware",
      "type": "multiple",
      "prompt": "Quelles actions sont attendues d’un RSSI ou d’une équipe de sécurité pendant une cyberattaque ?",
      "options": [
        {
          "id": "a",
          "label": "Faire l’état des lieux et enregistrer l’activité détaillée du système et du réseau"
        },
        {
          "id": "b",
          "label": "Isoler les ordinateurs affectés du réseau"
        },
        {
          "id": "c",
          "label": "Effacer immédiatement tous les disques sans analyse"
        },
        {
          "id": "d",
          "label": "Coordonner la communication avec les personnes habilitées, y compris le public si nécessaire"
        }
      ],
      "correct": [
        "a",
        "b",
        "d"
      ],
      "explanation": "L’équipe doit comprendre, contenir et documenter l’incident. Une communication de crise peut être nécessaire, mais elle doit être coordonnée. Effacer les disques trop tôt détruirait des preuves et pourrait rendre la récupération plus difficile.",
      "visual": "🧯",
      "certification": true,
      "title": null
    },
    {
      "id": "malware-evidence",
      "theme": "malware",
      "type": "single",
      "prompt": "Pourquoi faut-il préserver les journaux et autres preuves lors d’un incident ?",
      "options": [
        {
          "id": "a",
          "label": "Pour comprendre ce qui s’est passé et soutenir l’analyse"
        },
        {
          "id": "b",
          "label": "Pour ralentir volontairement le travail"
        },
        {
          "id": "c",
          "label": "Pour les publier immédiatement sur Internet"
        },
        {
          "id": "d",
          "label": "Pour éviter de prévenir le service informatique"
        }
      ],
      "correct": "a",
      "explanation": "Les journaux, heures, messages et captures peuvent révéler l’origine, l’étendue et la chronologie. Ils aident aussi à prendre des décisions juridiques ou organisationnelles. Ils doivent être conservés de manière contrôlée.",
      "visual": "🧾",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-report-fast",
      "theme": "malware",
      "type": "single",
      "prompt": "Pourquoi ne faut-il pas cacher une erreur ayant provoqué un incident ?",
      "options": [
        {
          "id": "a",
          "label": "Parce qu’un signalement rapide permet de limiter les conséquences"
        },
        {
          "id": "b",
          "label": "Parce que chaque erreur entraîne automatiquement un licenciement"
        },
        {
          "id": "c",
          "label": "Parce que l’incident disparaît si plusieurs personnes le connaissent"
        },
        {
          "id": "d",
          "label": "Parce que le mot de passe sera publié"
        }
      ],
      "correct": "a",
      "explanation": "Les premières minutes peuvent permettre de bloquer un compte, rappeler un email ou isoler un appareil. Retarder le signalement donne davantage de temps à l’attaquant et complique l’analyse.",
      "visual": "📣",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-phished-password",
      "theme": "malware",
      "type": "order",
      "prompt": "Vous avez saisi votre mot de passe professionnel sur une fausse page. Remettez les actions dans l’ordre.",
      "items": [
        [
          "o1",
          "Quitter la page et contacter immédiatement l’organisation"
        ],
        [
          "o2",
          "Changer le mot de passe depuis un appareil ou une page de confiance"
        ],
        [
          "o3",
          "Révoquer les sessions et vérifier les méthodes de MFA ou de récupération"
        ],
        [
          "o4",
          "Changer les autres comptes où le même mot de passe a été réutilisé et surveiller l’activité"
        ]
      ],
      "correctOrder": [
        "o1",
        "o2",
        "o3",
        "o4"
      ],
      "explanation": "Le signalement permet de lancer les mesures internes. Le mot de passe doit être changé depuis un environnement fiable, puis les sessions et méthodes de récupération contrôlées. La réutilisation étend l’urgence à d’autres comptes.",
      "visual": "🪤",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-mail-compromised",
      "theme": "malware",
      "type": "multiple",
      "prompt": "Des collègues reçoivent des messages étranges depuis votre compte. Quelles vérifications sont prioritaires ?",
      "options": [
        {
          "id": "a",
          "label": "Fermer les sessions inconnues"
        },
        {
          "id": "b",
          "label": "Changer le mot de passe et vérifier la MFA"
        },
        {
          "id": "c",
          "label": "Contrôler les règles de transfert automatique"
        },
        {
          "id": "d",
          "label": "Prévenir les destinataires et le support"
        },
        {
          "id": "e",
          "label": "Continuer à utiliser le compte sans rien modifier"
        }
      ],
      "correct": [
        "a",
        "b",
        "c",
        "d"
      ],
      "explanation": "Un attaquant peut maintenir l’accès via une session, une méthode de récupération ou une règle de transfert cachée. Prévenir les destinataires évite qu’ils ne fassent confiance aux messages envoyés pendant la compromission.",
      "visual": "📤",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-public-db",
      "theme": "malware",
      "type": "single",
      "prompt": "Une base de données clients est accessible publiquement sans mot de passe. Quelle est la priorité ?",
      "options": [
        {
          "id": "a",
          "label": "Bloquer l’accès tout en conservant les informations nécessaires à l’analyse"
        },
        {
          "id": "b",
          "label": "Supprimer le lien et oublier l’incident"
        },
        {
          "id": "c",
          "label": "Attendre qu’un client se plaigne"
        },
        {
          "id": "d",
          "label": "Publier la base pour demander de l’aide"
        }
      ],
      "correct": "a",
      "explanation": "Il faut contenir l’exposition sans détruire les preuves : durée, journaux, données concernées et téléchargements possibles. L’organisation doit ensuite évaluer la violation et les notifications éventuelles.",
      "visual": "🗄️",
      "certification": false,
      "title": null
    },
    {
      "id": "malware-backup",
      "theme": "malware",
      "type": "single",
      "prompt": "Quel rôle jouent les sauvegardes face à un rançongiciel ?",
      "options": [
        {
          "id": "a",
          "label": "Elles peuvent permettre de restaurer les données après nettoyage et sécurisation"
        },
        {
          "id": "b",
          "label": "Elles empêchent automatiquement toute infection"
        },
        {
          "id": "c",
          "label": "Elles remplacent l’antivirus et les mises à jour"
        },
        {
          "id": "d",
          "label": "Elles doivent rester connectées en permanence au poste infecté"
        }
      ],
      "correct": "a",
      "explanation": "Des sauvegardes testées et isolées facilitent la reprise. Si elles sont accessibles en permanence depuis le poste, le rançongiciel peut aussi les chiffrer. Elles complètent la prévention mais ne la remplacent pas.",
      "visual": "🛟",
      "certification": false,
      "title": null
    },
    {
      "id": "data-rgpd",
      "theme": "data",
      "type": "single",
      "prompt": "Quel est l’objectif principal du RGPD ?",
      "options": [
        {
          "id": "a",
          "label": "Mieux protéger les données personnelles et les droits des personnes"
        },
        {
          "id": "b",
          "label": "Interdire à toutes les entreprises de traiter des données"
        },
        {
          "id": "c",
          "label": "Créer une version européenne de chaque site"
        },
        {
          "id": "d",
          "label": "Protéger uniquement les lanceurs d’alerte"
        }
      ],
      "correct": "a",
      "explanation": "Le RGPD encadre le traitement des données personnelles et renforce les droits des personnes. Il n’interdit pas tout traitement : il exige une base légale, de la transparence, de la sécurité et une utilisation proportionnée.",
      "visual": "🇪🇺",
      "certification": true,
      "title": null
    },
    {
      "id": "data-categories",
      "theme": "data",
      "type": "matching",
      "prompt": "Reliez chaque exemple à la catégorie la plus appropriée.",
      "pairs": [
        {
          "leftId": "l1",
          "left": "Adresse email nominative",
          "rightId": "r1",
          "right": "Donnée personnelle"
        },
        {
          "leftId": "l2",
          "left": "Diagnostic médical",
          "rightId": "r2",
          "right": "Donnée particulièrement sensible"
        },
        {
          "leftId": "l3",
          "left": "Statistique réellement anonymisée ne permettant plus d’identifier une personne",
          "rightId": "r3",
          "right": "Donnée non personnelle dans ce contexte"
        },
        {
          "leftId": "l4",
          "left": "Adresse IP liée à un utilisateur",
          "rightId": "r4",
          "right": "Donnée personnelle potentielle"
        }
      ],
      "explanation": "Une donnée est personnelle lorsqu’elle permet d’identifier directement ou indirectement une personne. Les données de santé bénéficient d’une protection renforcée. Une anonymisation réelle doit empêcher raisonnablement la réidentification.",
      "visual": "🏷️",
      "certification": false,
      "title": null
    },
    {
      "id": "data-minimization",
      "theme": "data",
      "type": "single",
      "prompt": "Une inscription à une conférence gratuite demande le nom, l’email, la situation familiale, une copie de carte d’identité et le dossier médical. Quel principe est manifestement ignoré ?",
      "options": [
        {
          "id": "a",
          "label": "La minimisation des données"
        },
        {
          "id": "b",
          "label": "La mise en cache"
        },
        {
          "id": "c",
          "label": "Le chiffrement du Wi-Fi"
        },
        {
          "id": "d",
          "label": "La sauvegarde 3-2-1"
        }
      ],
      "correct": "a",
      "explanation": "Il faut collecter uniquement les informations adéquates, pertinentes et nécessaires à l’objectif annoncé. La situation familiale, le dossier médical ou une copie d’identité semblent excessifs pour une simple inscription, sauf justification exceptionnelle.",
      "visual": "✂️",
      "certification": false,
      "title": null
    },
    {
      "id": "data-newsletter",
      "theme": "data",
      "type": "single",
      "prompt": "Une entreprise utilise les emails de tous ses clients pour une newsletter commerciale sans les avoir clairement informés. Quel problème principal apparaît ?",
      "options": [
        {
          "id": "a",
          "label": "Le manque de transparence et de base appropriée pour cette utilisation"
        },
        {
          "id": "b",
          "label": "L’absence obligatoire d’un logo"
        },
        {
          "id": "c",
          "label": "Le fait que les emails sont trop courts"
        },
        {
          "id": "d",
          "label": "L’utilisation d’un navigateur moderne"
        }
      ],
      "correct": "a",
      "explanation": "La finalité commerciale doit être annoncée et reposer sur une base légale adaptée. Les personnes doivent notamment pouvoir s’opposer ou se désinscrire facilement. La création d’un compte ne permet pas automatiquement tous les usages futurs.",
      "visual": "📬",
      "certification": false,
      "title": null
    },
    {
      "id": "data-photos",
      "theme": "data",
      "type": "single",
      "prompt": "Une photo reconnaissable d’un participant à une formation est-elle une donnée personnelle ?",
      "options": [
        {
          "id": "a",
          "label": "Oui, si elle permet d’identifier la personne"
        },
        {
          "id": "b",
          "label": "Non, une image n’est jamais une donnée"
        },
        {
          "id": "c",
          "label": "Uniquement si elle est imprimée"
        },
        {
          "id": "d",
          "label": "Uniquement si la personne porte un badge"
        }
      ],
      "correct": "a",
      "explanation": "Une image permettant d’identifier une personne constitue une donnée personnelle. La prise et surtout la publication doivent être encadrées : information, base légale, respect du droit à l’image et précautions selon le contexte.",
      "visual": "📸",
      "certification": false,
      "title": null
    },
    {
      "id": "data-cv",
      "theme": "data",
      "type": "single",
      "prompt": "Une entreprise conserve sans information tous les CV non retenus pendant dix ans « au cas où ». Quelle approche serait plus conforme ?",
      "options": [
        {
          "id": "a",
          "label": "Définir une durée justifiée, informer les candidats et supprimer les CV devenus inutiles"
        },
        {
          "id": "b",
          "label": "Conserver tous les CV pour toujours"
        },
        {
          "id": "c",
          "label": "Publier les CV sur le site de l’entreprise"
        },
        {
          "id": "d",
          "label": "Envoyer les CV aux autres candidats"
        }
      ],
      "correct": "a",
      "explanation": "La durée de conservation doit être liée à la finalité. Une conservation pour de futures opportunités peut être possible avec information et cadre approprié, mais pas indéfiniment ni sans transparence.",
      "visual": "📄",
      "certification": false,
      "title": null
    },
    {
      "id": "data-erasure",
      "theme": "data",
      "type": "single",
      "prompt": "Une personne demande la suppression de ses données. L’organisation doit-elle toujours tout effacer immédiatement ?",
      "options": [
        {
          "id": "a",
          "label": "Oui, sans aucune exception"
        },
        {
          "id": "b",
          "label": "Non, elle doit analyser la demande car certaines obligations peuvent imposer une conservation"
        },
        {
          "id": "c",
          "label": "Non, le droit à l’effacement n’existe jamais"
        },
        {
          "id": "d",
          "label": "Uniquement si la personne téléphone trois fois"
        }
      ],
      "correct": "b",
      "explanation": "Le droit à l’effacement existe mais n’est pas absolu. Des obligations légales, la défense de droits ou d’autres motifs peuvent imposer la conservation de certaines données. L’organisation doit répondre clairement et justifier sa décision.",
      "visual": "🧹",
      "certification": false,
      "title": null
    },
    {
      "id": "data-ai",
      "theme": "data",
      "type": "multiple",
      "prompt": "Avant de copier une réclamation client dans un outil d’IA, que faut-il faire ?",
      "options": [
        {
          "id": "a",
          "label": "Vérifier les règles de l’organisation et l’outil autorisé"
        },
        {
          "id": "b",
          "label": "Supprimer ou anonymiser les données inutiles"
        },
        {
          "id": "c",
          "label": "Copier toutes les informations pour obtenir une réponse plus précise"
        },
        {
          "id": "d",
          "label": "Évaluer si l’objectif peut être atteint avec moins de données"
        }
      ],
      "correct": [
        "a",
        "b",
        "d"
      ],
      "explanation": "Un service d’IA peut conserver, traiter ou transférer les informations selon ses conditions. La minimisation et l’anonymisation limitent l’exposition. Les règles de l’organisation déterminent quels outils et quelles données peuvent être utilisés.",
      "visual": "🤖",
      "certification": false,
      "title": null
    },
    {
      "id": "data-wrong-recipient",
      "theme": "data",
      "type": "order",
      "prompt": "Un fichier client est envoyé au mauvais destinataire. Remettez les premières actions dans un ordre logique.",
      "items": [
        [
          "o1",
          "Prévenir immédiatement le responsable ou le canal prévu"
        ],
        [
          "o2",
          "Tenter de rappeler le message ou demander au destinataire de supprimer le fichier"
        ],
        [
          "o3",
          "Identifier les données, les personnes concernées et les protections du fichier"
        ],
        [
          "o4",
          "Évaluer la violation et les notifications éventuelles"
        ]
      ],
      "correctOrder": [
        "o1",
        "o2",
        "o3",
        "o4"
      ],
      "explanation": "Une réaction immédiate peut encore limiter l’accès. L’analyse de la nature et de la sensibilité des données permet ensuite de mesurer le risque et de décider des obligations de notification.",
      "visual": "📩",
      "certification": false,
      "title": null
    },
    {
      "id": "data-privacy-design",
      "theme": "data",
      "type": "single",
      "prompt": "Que signifie « protection des données dès la conception » ?",
      "options": [
        {
          "id": "a",
          "label": "Intégrer la protection des données dès le début d’un projet"
        },
        {
          "id": "b",
          "label": "Ajouter une politique de confidentialité uniquement après un incident"
        },
        {
          "id": "c",
          "label": "Collecter toutes les données avant de définir l’objectif"
        },
        {
          "id": "d",
          "label": "Rendre toutes les données publiques par défaut"
        }
      ],
      "correct": "a",
      "explanation": "La protection doit être pensée dans les choix fonctionnels et techniques : données minimales, accès limités, durées de conservation, sécurité et paramètres protecteurs par défaut. Elle ne doit pas être ajoutée à la fin.",
      "visual": "🏗️",
      "certification": false,
      "title": null
    },
    {
      "id": "data-shared-folder",
      "theme": "data",
      "type": "tf-grid",
      "prompt": "Vous stockez des informations personnelles dans un dossier professionnel partagé. Indiquez si les affirmations sont vraies ou fausses.",
      "statements": [
        {
          "id": "s1",
          "text": "L’entreprise et certains administrateurs ne peuvent jamais accéder aux fichiers hébergés sur son système.",
          "correct": false,
          "explanation": "Selon les droits et les besoins légitimes, l’organisation peut administrer, sauvegarder ou accéder à l’espace professionnel."
        },
        {
          "id": "s2",
          "text": "C’est recommandé car l’entreprise garantit la protection de toutes mes données personnelles.",
          "correct": false,
          "explanation": "Un espace professionnel n’est pas conçu comme coffre personnel et peut être touché par un incident ou une règle de conservation."
        },
        {
          "id": "s3",
          "text": "Un pirate ou un employé malveillant pourrait accéder à mes données si l’espace est compromis ou mal configuré.",
          "correct": true,
          "explanation": "Les droits excessifs et les compromissions peuvent exposer les fichiers."
        },
        {
          "id": "s4",
          "text": "Utiliser un dossier de travail pour des fichiers personnels est toujours illégal dans tous les pays et toutes les situations.",
          "correct": false,
          "explanation": "Cela dépend des règles, du contexte et des fichiers ; ce n’est pas une interdiction universelle, mais c’est généralement déconseillé."
        }
      ],
      "visual": "📁",
      "certification": true,
      "title": null,
      "explanation": "Chaque affirmation doit être évaluée séparément. Consulte le détail ligne par ligne ci-dessous."
    },
    {
      "id": "data-medical",
      "theme": "data",
      "type": "multiple",
      "prompt": "Un fichier contient les diagnostics, traitements et coordonnées des médecins de tous les employés. Quelles mesures sont nécessaires ?",
      "options": [
        {
          "id": "a",
          "label": "Limiter strictement les accès aux personnes habilitées"
        },
        {
          "id": "b",
          "label": "Collecter uniquement ce qui est réellement nécessaire"
        },
        {
          "id": "c",
          "label": "Renforcer la sécurité et la traçabilité"
        },
        {
          "id": "d",
          "label": "Le rendre accessible à tous les collègues"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "Les données de santé sont particulièrement sensibles. Leur collecte doit être justifiée et minimale, avec des accès restreints et des mesures de sécurité adaptées. Un partage général serait disproportionné.",
      "visual": "🩺",
      "certification": false,
      "title": null
    },
    {
      "id": "network-vpn",
      "theme": "network",
      "type": "single",
      "prompt": "Quel outil peut permettre de se connecter à une application interne de l’entreprise depuis l’extérieur ?",
      "options": [
        {
          "id": "a",
          "label": "Un VPN d’entreprise"
        },
        {
          "id": "b",
          "label": "Un filtre de confidentialité pour écran"
        },
        {
          "id": "c",
          "label": "Un gestionnaire de fichiers"
        },
        {
          "id": "d",
          "label": "Un cookie publicitaire"
        }
      ],
      "correct": "a",
      "explanation": "Le VPN crée un tunnel protégé vers le réseau ou les services de l’organisation et peut appliquer des contrôles d’accès. Il ne remplace pas le mot de passe, la MFA ni les mises à jour.",
      "visual": "🛣️",
      "certification": true,
      "title": null
    },
    {
      "id": "network-cert",
      "theme": "network",
      "type": "fill",
      "prompt": "Complétez les rôles habituels d’un CERT.",
      "template": "Un CERT centralise les demandes d’assistance liées à des {{b1}}, traite les alertes et réagit aux {{b2}}, maintient des informations sur des {{b3}} et diffuse des recommandations afin de {{b4}} les incidents et leurs conséquences.",
      "blanks": [
        {
          "id": "b1",
          "choices": [
            "incidents de sécurité",
            "commandes commerciales",
            "congés"
          ],
          "correct": "incidents de sécurité"
        },
        {
          "id": "b2",
          "choices": [
            "attaques informatiques",
            "réunions",
            "campagnes publicitaires"
          ],
          "correct": "attaques informatiques"
        },
        {
          "id": "b3",
          "choices": [
            "vulnérabilités",
            "menus de restaurant",
            "factures privées"
          ],
          "correct": "vulnérabilités"
        },
        {
          "id": "b4",
          "choices": [
            "prévenir et minimiser",
            "cacher",
            "multiplier"
          ],
          "correct": "prévenir et minimiser"
        }
      ],
      "explanation": "Un CERT ou CSIRT coordonne l’assistance, l’analyse et l’échange d’informations concernant les incidents. Il contribue également à la prévention en publiant des alertes, des conseils et des informations sur les vulnérabilités.",
      "visual": "🚑",
      "certification": true,
      "title": null
    },
    {
      "id": "network-safeonweb",
      "theme": "network",
      "type": "single",
      "prompt": "Quel est le rôle principal de Safeonweb en Belgique ?",
      "options": [
        {
          "id": "a",
          "label": "Informer et conseiller le public et les organisations sur la cybersécurité"
        },
        {
          "id": "b",
          "label": "Vendre des ordinateurs"
        },
        {
          "id": "c",
          "label": "Créer tous les mots de passe des citoyens"
        },
        {
          "id": "d",
          "label": "Remplacer la police et les services informatiques"
        }
      ],
      "correct": "a",
      "explanation": "Safeonweb diffuse des alertes, des conseils et des outils de sensibilisation. Il permet notamment de transmettre certains messages suspects. Il ne remplace pas les autorités, les banques ou le support interne lorsque leur intervention est nécessaire.",
      "visual": "🇧🇪",
      "certification": false,
      "title": null
    },
    {
      "id": "network-iso27001",
      "theme": "network",
      "type": "single",
      "prompt": "Que concerne principalement la norme ISO 27001 ?",
      "options": [
        {
          "id": "a",
          "label": "La mise en place d’un système de management de la sécurité de l’information"
        },
        {
          "id": "b",
          "label": "La taille minimale des écrans"
        },
        {
          "id": "c",
          "label": "La création de publicités en ligne"
        },
        {
          "id": "d",
          "label": "Le design des réseaux sociaux"
        }
      ],
      "correct": "a",
      "explanation": "ISO 27001 aide une organisation à gérer les risques liés à la confidentialité, l’intégrité et la disponibilité de l’information dans une démarche structurée et d’amélioration continue.",
      "visual": "📘",
      "certification": false,
      "title": null
    },
    {
      "id": "network-backup-321",
      "theme": "network",
      "type": "order",
      "prompt": "Classez les éléments pour représenter la règle de sauvegarde 3-2-1.",
      "items": [
        [
          "o1",
          "Conserver au moins 3 copies des données"
        ],
        [
          "o2",
          "Utiliser au moins 2 types de supports ou emplacements"
        ],
        [
          "o3",
          "Garder au moins 1 copie hors site ou isolée"
        ]
      ],
      "correctOrder": [
        "o1",
        "o2",
        "o3"
      ],
      "explanation": "La règle 3-2-1 réduit le risque qu’un même incident détruise toutes les copies. Elle doit être complétée par des tests de restauration, du chiffrement lorsque nécessaire et des accès limités.",
      "visual": "3️⃣",
      "certification": false,
      "title": null
    },
    {
      "id": "network-firewall",
      "theme": "network",
      "type": "single",
      "prompt": "Quel énoncé décrit le mieux un pare-feu ?",
      "options": [
        {
          "id": "a",
          "label": "Il filtre des communications réseau selon des règles"
        },
        {
          "id": "b",
          "label": "Il garantit qu’aucun utilisateur ne cliquera sur un lien"
        },
        {
          "id": "c",
          "label": "Il sauvegarde automatiquement tous les fichiers"
        },
        {
          "id": "d",
          "label": "Il remplace toutes les autres protections"
        }
      ],
      "correct": "a",
      "explanation": "Le pare-feu autorise ou bloque certains flux selon des règles. Il ne détecte pas toutes les attaques et n’empêche pas une personne d’exécuter un fichier malveillant ; il fait partie d’un ensemble de mesures.",
      "visual": "🧱",
      "certification": false,
      "title": null
    },
    {
      "id": "network-backup-test",
      "theme": "network",
      "type": "single",
      "prompt": "Pourquoi faut-il tester régulièrement la restauration des sauvegardes ?",
      "options": [
        {
          "id": "a",
          "label": "Pour vérifier qu’elles sont lisibles, complètes et réellement restaurables"
        },
        {
          "id": "b",
          "label": "Pour les rendre publiques"
        },
        {
          "id": "c",
          "label": "Pour supprimer les anciennes données sans contrôle"
        },
        {
          "id": "d",
          "label": "Parce qu’une sauvegarde testée empêche toute cyberattaque"
        }
      ],
      "correct": "a",
      "explanation": "Une sauvegarde peut être corrompue, incomplète ou protégée par des identifiants perdus. Un test de restauration confirme que l’organisation pourra réellement reprendre ses activités le jour où elle en aura besoin.",
      "visual": "✅",
      "certification": false,
      "title": null
    },
    {
      "id": "osint-definition",
      "theme": "osint",
      "type": "single",
      "prompt": "Que signifie OSINT ?",
      "options": [
        {
          "id": "a",
          "label": "Recherche et analyse d’informations accessibles publiquement"
        },
        {
          "id": "b",
          "label": "Installation secrète d’un logiciel espion"
        },
        {
          "id": "c",
          "label": "Suppression automatique de toutes les traces en ligne"
        },
        {
          "id": "d",
          "label": "Type de mot de passe à usage unique"
        }
      ],
      "correct": "a",
      "explanation": "L’Open Source Intelligence exploite des sources ouvertes : moteurs de recherche, profils publics, documents, forums ou images. Dans la formation, l’objectif est de comprendre ses propres traces et non d’enquêter sur les autres.",
      "visual": "🔎",
      "certification": false,
      "title": null
    },
    {
      "id": "osint-self",
      "theme": "osint",
      "type": "single",
      "prompt": "Dans l’exercice de la formation, sur qui les recherches OSINT doivent-elles être réalisées ?",
      "options": [
        {
          "id": "a",
          "label": "Uniquement sur soi-même"
        },
        {
          "id": "b",
          "label": "Sur un autre stagiaire choisi au hasard"
        },
        {
          "id": "c",
          "label": "Sur le formateur sans l’informer"
        },
        {
          "id": "d",
          "label": "Sur n’importe quel voisin"
        }
      ],
      "correct": "a",
      "explanation": "L’exercice vise la prise de conscience personnelle tout en respectant la vie privée. Rechercher et croiser les informations d’une autre personne sans raison ni autorisation peut être intrusif et contraire aux consignes.",
      "visual": "🪞",
      "certification": false,
      "title": null
    },
    {
      "id": "osint-private",
      "theme": "osint",
      "type": "single",
      "prompt": "Pourquoi effectuer l’audit personnel dans une fenêtre privée ou un navigateur non connecté ?",
      "options": [
        {
          "id": "a",
          "label": "Pour limiter la personnalisation des résultats par ses comptes et son historique"
        },
        {
          "id": "b",
          "label": "Pour devenir invisible aux moteurs de recherche"
        },
        {
          "id": "c",
          "label": "Pour supprimer les informations déjà publiées"
        },
        {
          "id": "d",
          "label": "Pour contourner les lois sur la vie privée"
        }
      ],
      "correct": "a",
      "explanation": "Une session non connectée donne une vision plus proche de celle d’un visiteur extérieur. Elle ne rend pas anonyme et ne supprime aucune donnée en ligne.",
      "visual": "🕵️",
      "certification": false,
      "title": null
    },
    {
      "id": "osint-cross",
      "theme": "osint",
      "type": "single",
      "prompt": "Pourquoi le croisement de plusieurs petites informations publiques peut-il être risqué ?",
      "options": [
        {
          "id": "a",
          "label": "Parce qu’il permet de construire un profil beaucoup plus précis"
        },
        {
          "id": "b",
          "label": "Parce qu’il chiffre automatiquement les données"
        },
        {
          "id": "c",
          "label": "Parce qu’il empêche les moteurs de recherche de fonctionner"
        },
        {
          "id": "d",
          "label": "Parce qu’une information publique ne peut jamais être utilisée"
        }
      ],
      "correct": "a",
      "explanation": "Un pseudo peut mener à un ancien compte, une photo à un lieu et un profil professionnel à une entreprise. Réunies, ces informations facilitent le ciblage, l’usurpation ou le spear phishing.",
      "visual": "🧩",
      "certification": false,
      "title": null
    },
    {
      "id": "osint-photo",
      "theme": "osint",
      "type": "multiple",
      "prompt": "Quelles informations une photo publique peut-elle révéler ?",
      "options": [
        {
          "id": "a",
          "label": "Un lieu ou une adresse visible à l’arrière-plan"
        },
        {
          "id": "b",
          "label": "Un badge, un écran ou un document"
        },
        {
          "id": "c",
          "label": "Des habitudes ou déplacements"
        },
        {
          "id": "d",
          "label": "Jamais aucune information si la photo est jolie"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "Les détails visuels et parfois les métadonnées peuvent révéler bien plus que le sujet principal. Il faut vérifier les arrière-plans, plaques, badges, documents et paramètres de publication avant de partager.",
      "visual": "🖼️",
      "certification": false,
      "title": null
    },
    {
      "id": "osint-facebook",
      "theme": "osint",
      "type": "tf-grid",
      "prompt": "Indiquez si les affirmations sur les paramètres de sécurité d’un réseau social sont vraies ou fausses.",
      "statements": [
        {
          "id": "s1",
          "text": "Il est généralement possible de fermer à distance une session ouverte sur un appareil inconnu.",
          "correct": true,
          "explanation": "Les grands services proposent une gestion des appareils et sessions actives."
        },
        {
          "id": "s2",
          "text": "Il est possible de recevoir une alerte lorsqu’un nouvel appareil se connecte.",
          "correct": true,
          "explanation": "Les alertes de connexion constituent un signal utile, à configurer dans les paramètres de sécurité."
        },
        {
          "id": "s3",
          "text": "Accepter une personne comme amie lui donne toujours accès à toutes les informations du profil.",
          "correct": false,
          "explanation": "La visibilité dépend des paramètres, des listes et de chaque publication ; elle n’est pas forcément totale."
        },
        {
          "id": "s4",
          "text": "Il est possible de bloquer certains utilisateurs.",
          "correct": true,
          "explanation": "Le blocage réduit les interactions et la visibilité selon les règles du service."
        },
        {
          "id": "s5",
          "text": "Aimer une marque peut contribuer à la personnalisation des publicités visibles par soi-même ou ses contacts.",
          "correct": true,
          "explanation": "Les interactions peuvent être utilisées comme signaux publicitaires ou apparaître dans des recommandations sociales."
        }
      ],
      "visual": "👍",
      "certification": true,
      "title": null,
      "explanation": "Chaque affirmation doit être évaluée séparément. Consulte le détail ligne par ligne ci-dessous."
    },
    {
      "id": "osint-hacktivists",
      "theme": "osint",
      "type": "multiple",
      "prompt": "Quelles motivations peuvent généralement être associées à des groupes d’hacktivistes ?",
      "options": [
        {
          "id": "a",
          "label": "Des revendications politiques ou idéologiques"
        },
        {
          "id": "b",
          "label": "Informer ou attirer l’attention du public"
        },
        {
          "id": "c",
          "label": "Uniquement le gain financier"
        },
        {
          "id": "d",
          "label": "L’espionnage industriel comme motivation principale de tous les groupes"
        }
      ],
      "correct": [
        "a",
        "b"
      ],
      "explanation": "L’hacktivisme cherche souvent à défendre une cause, protester ou rendre une information visible. Le gain financier et l’espionnage industriel existent dans d’autres profils d’attaquants, mais ne définissent pas l’hacktivisme.",
      "visual": "📢",
      "certification": true,
      "title": null
    },
    {
      "id": "osint-reduce",
      "theme": "osint",
      "type": "multiple",
      "prompt": "Quelles actions peuvent réduire votre exposition publique en ligne ?",
      "options": [
        {
          "id": "a",
          "label": "Revoir la confidentialité des anciens comptes"
        },
        {
          "id": "b",
          "label": "Supprimer ou corriger les informations devenues inutiles"
        },
        {
          "id": "c",
          "label": "Utiliser le même pseudo et la même photo partout sans réflexion"
        },
        {
          "id": "d",
          "label": "Vérifier régulièrement ce qui apparaît dans les moteurs de recherche"
        }
      ],
      "correct": [
        "a",
        "b",
        "d"
      ],
      "explanation": "Un nettoyage périodique, des paramètres adaptés et une veille sur son nom ou ses pseudos réduisent les traces inutiles. Réutiliser systématiquement les mêmes identifiants facilite au contraire le rapprochement entre comptes.",
      "visual": "🧽",
      "certification": false,
      "title": null
    }
  ]
};
