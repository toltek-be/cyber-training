(() => {
  'use strict';

  const DATA = window.CYBER_TRAINING_DATA;
  if (!DATA) return;

  DATA.testModes = [
    {
      id: 'mock-tosa',
      title: 'Test blanc TOSA',
      description: 'Un entraînement équilibré avec des questions variées, proche de l’esprit certification.',
      button: 'Lancer le test blanc',
      kind: 'balanced',
      count: 50,
      emoji: '🧪',
      accent: 'purple',
      meta: '40 à 50 min'
    },
    {
      id: 'revision-express',
      title: 'Révision express',
      description: 'Une session courte de questions aléatoires dans l’ensemble des données.',
      button: 'Lancer 20 questions',
      kind: 'random',
      count: 20,
      emoji: '⚡',
      accent: 'yellow',
      meta: 'Rapide'
    },
    {
      id: 'scenario-drill',
      title: 'Mises en situation',
      description: 'Des cas concrets: email suspect, appareil perdu, ransomware, faux support, fuite de données.',
      button: 'Lancer les situations',
      kind: 'scenario',
      count: 25,
      emoji: '🎯',
      accent: 'pink',
      meta: 'Cas pratiques'
    }
  ];

  DATA.syntheses = [
    {
      id: 'bases-acteurs',
      title: 'Bases et acteurs de la cybersécurité',
      themeIds: ['web', 'network'],
      intro: 'La cybersécurité consiste à protéger les usages numériques du quotidien: navigation, emails, comptes, fichiers, appareils, données professionnelles et vie privée. L’objectif de la formation est surtout de construire des réflexes simples face aux risques rencontrés sur Internet et au travail.',
      definitions: ['Cybersécurité: ensemble des pratiques qui protègent les systèmes, les comptes, les données et les services numériques.', 'Sécurité de l’information: protection de la confidentialité, de l’intégrité et de la disponibilité des informations.', 'Menace: élément capable de provoquer un dommage, comme un fraudeur, un malware ou une erreur humaine.', 'Vulnérabilité: faiblesse exploitable, par exemple un logiciel non mis à jour ou un mot de passe réutilisé.', 'Risque: possibilité qu’une menace exploite une vulnérabilité et provoque un impact.', 'Incident: événement réel ou suspect qui peut affecter la sécurité.', 'Impact: conséquence possible, comme perte de données, fraude financière, indisponibilité ou atteinte à la réputation.'],
      keyPoints: ['Les risques numériques ne concernent pas uniquement les experts: email suspect, lien frauduleux, fuite de mot de passe ou appareil perdu peuvent toucher tout le monde.', 'La confidentialité signifie que seules les personnes autorisées accèdent aux informations.', 'L’intégrité signifie que les informations restent exactes et ne sont pas modifiées sans autorisation.', 'La disponibilité signifie que les services et données restent accessibles quand on en a besoin.', 'L’erreur humaine fait partie des risques: cliquer trop vite, cacher une erreur ou utiliser un outil non autorisé peut aggraver une situation.', 'Le RSSI pilote la politique de sécurité dans une organisation, tandis que les équipes IT et sécurité traitent les alertes et appliquent les mesures techniques.', 'Un CERT ou CSIRT aide à répondre aux incidents, partager des alertes et diffuser des conseils.', 'Safeonweb sensibilise et informe, notamment sur les arnaques, le phishing et les bons réflexes en Belgique.'],
      goodPractices: ['Lire attentivement une situation avant d’agir, surtout si elle paraît urgente.', 'Se demander: quel est le risque, quels éléments doivent m’alerter, que dois-je faire concrètement ?', 'Signaler rapidement une anomalie plutôt que tenter de la régler seul.', 'Conserver les informations utiles: heure, message reçu, capture, nom de fichier, action réalisée.', 'Appliquer les procédures internes, même si elles semblent plus lentes.', 'Ne pas partager d’informations personnelles ou professionnelles sans besoin clair.', 'Utiliser les ressources de sensibilisation et poser une question quand une notion reste floue.'],
      commonMistakes: ['Penser que la cybersécurité est uniquement une affaire d’antivirus ou de techniciens.', 'Attendre d’être certain avant de signaler un problème.', 'Effacer un message, reformater un support ou redémarrer une machine sans consigne alors que cela peut supprimer des preuves.', 'Croire qu’un outil technique suffit à supprimer le risque.', 'Confondre une situation simplement étrange avec une situation sans risque.'],
      scenario: 'Un ordinateur devient anormalement lent et affiche des comportements inhabituels. Le bon réflexe n’est pas de continuer comme si de rien n’était: il faut noter ce que l’on observe, prévenir le support ou la personne compétente et suivre les consignes de confinement.',
      remember: 'Le cœur de la formation est le réflexe: observer, ralentir, vérifier par un canal fiable, signaler et ne pas aggraver la situation.',
      trap: 'Un incident peut commencer par une petite action banale: ouvrir une pièce jointe, répondre à un message, brancher une clé USB ou repousser une mise à jour.',
      vocabulary: ['Confidentialité', 'Intégrité', 'Disponibilité', 'Menace', 'Vulnérabilité', 'Risque', 'Incident', 'RSSI', 'CERT/CSIRT', 'Safeonweb', 'Journalisation']
    },
    {
      id: 'attaques-motivations',
      title: 'Cyberattaques et motivations',
      themeIds: ['osint', 'malware'],
      intro: 'Les cyberattaques peuvent viser des particuliers, des associations, des entreprises ou des administrations. Les attaquants ne cherchent pas toujours la même chose: argent, données, espionnage, sabotage, revendication, notoriété ou simple opportunité.',
      definitions: ['Cyberattaque: action volontaire visant à compromettre un compte, un appareil, un service ou des données.', 'Attaque opportuniste: attaque automatisée ou peu ciblée qui cherche des victimes faciles.', 'Attaque ciblée: attaque préparée pour une personne ou une organisation précise.', 'Hacktivisme: attaque ou action numérique liée à une cause politique, sociale ou idéologique.', 'Espionnage industriel: collecte d’informations stratégiques d’une organisation.', 'Sabotage: action visant à perturber, détruire ou rendre indisponible un service.'],
      keyPoints: ['Le gain financier est très fréquent: fraude au paiement, rançon, revente de données ou arnaque bancaire.', 'Les attaquants peuvent rechercher des identifiants, des codes MFA, des informations client, des documents internes ou des accès à distance.', 'Une attaque peut aussi viser la réputation d’une organisation ou l’indisponibilité d’un service.', 'Les informations publiques peuvent aider à personnaliser une attaque: nom d’un collègue, fonction, fournisseur habituel, projet en cours.', 'Les attaques modernes utilisent parfois l’IA pour rendre les messages plus crédibles, mieux écrits ou plus adaptés à la cible.', 'Un attaquant peut combiner plusieurs techniques: OSINT, phishing, faux support, malware puis extorsion.', 'La cybercriminalité organisée fonctionne souvent comme une économie: outils vendus, données revendues, rançongiciels loués, accès compromis monétisés.'],
      goodPractices: ['Identifier le contexte: qui demande quoi, par quel canal, avec quelle urgence et pour quel impact ?', 'Vérifier les demandes sensibles par un canal connu, surtout lorsqu’il est question d’argent, d’accès ou de données.', 'Limiter les informations publiques qui facilitent les attaques ciblées.', 'Se méfier des demandes qui combinent autorité, secret, urgence et action inhabituelle.', 'Documenter les faits lors d’un incident pour aider l’analyse.'],
      commonMistakes: ['Croire que seules les grandes organisations sont ciblées.', 'Sous-estimer une attaque parce qu’elle paraît maladroite ou générique.', 'Penser qu’un message bien écrit est forcément légitime.', 'Oublier que les données volées aujourd’hui peuvent être utilisées plus tard.', 'Répondre à un attaquant pour “voir ce qu’il veut”.'],
      scenario: 'Un message prétend venir d’un responsable pressé, indique qu’il est en réunion, demande un paiement ou l’achat de cartes cadeaux et insiste sur la confidentialité. Cette situation combine autorité, urgence, secret et demande inhabituelle: ce sont des signaux d’alerte majeurs.',
      remember: 'Comprendre la motivation aide à choisir la bonne réaction: bloquer une fraude financière, protéger des données, contenir un malware ou préserver des preuves.',
      trap: 'Une attaque ciblée peut commencer avec des informations publiques très simples: un nom, une fonction, une photo ou une ancienne adresse email.',
      vocabulary: ['Cybercriminalité', 'Attaque opportuniste', 'Attaque ciblée', 'Spear phishing', 'Extorsion', 'Sabotage', 'Hacktivisme', 'Espionnage', 'OSINT']
    },
    {
      id: 'phishing-social',
      title: 'Phishing et ingénierie sociale',
      themeIds: ['phishing'],
      intro: 'Le phishing et l’ingénierie sociale cherchent à pousser une personne à cliquer, ouvrir une pièce jointe, payer, installer un logiciel, scanner un QR code ou communiquer une information sensible.',
      definitions: ['Phishing: tentative de tromperie visant à voler des informations ou provoquer une action risquée.', 'Spear phishing: phishing personnalisé grâce à des informations sur la cible.', 'Smishing: phishing par SMS.', 'Vishing: phishing par appel téléphonique.', 'Quishing: phishing utilisant un QR code.', 'Fraude au président: arnaque dans laquelle un faux responsable demande une action urgente et confidentielle.', 'Faux support: personne qui se fait passer pour l’assistance technique pour obtenir un accès ou un code.'],
      keyPoints: ['Le faux mail de compte bloqué met la pression avec une suspension rapide et un bouton de confirmation.', 'Le responsable pressé demande souvent une action inhabituelle: cartes cadeaux, paiement rapide ou envoi d’information sensible.', 'Le QR code suspect peut mener vers une fausse page de connexion ou de paiement.', 'Le changement d’IBAN doit toujours être vérifié par un canal indépendant connu à l’avance.', 'La pièce jointe inattendue peut contenir un malware ou un lien dangereux, même si son nom paraît professionnel.', 'Le faux appel du support peut demander un mot de passe, un code reçu par SMS ou l’installation d’un outil de prise en main à distance.', 'Un message crédible peut utiliser un logo, un ton professionnel, un nom réel ou peu de fautes.', 'Le bon raisonnement est toujours: risque principal, éléments d’alerte, action concrète.'],
      goodPractices: ['Ne pas cliquer sur le bouton d’un message urgent: ouvrir soi-même le site ou l’application officielle.', 'Vérifier l’adresse réelle de l’expéditeur et le domaine du lien.', 'Contacter l’organisation ou la personne par un canal indépendant déjà connu.', 'Ne jamais communiquer de mot de passe, de code MFA ou de code de prise en main à distance.', 'Signaler le message suspect selon la procédure.', 'Garder le message pour analyse si l’organisation le demande.', 'En cas de doute sur une pièce jointe, ne pas l’ouvrir et demander confirmation par un autre canal.', 'Pour un QR code, vérifier l’origine du support et l’adresse affichée avant toute saisie.'],
      commonMistakes: ['Répondre directement au message pour vérifier.', 'Cliquer “juste pour voir”.', 'Se fier uniquement au logo, au nom affiché ou au cadenas HTTPS.', 'Faire confiance à une demande parce qu’elle est polie et professionnelle.', 'Installer un outil demandé par téléphone sans vérification.', 'Traiter un changement d’IBAN comme une simple formalité administrative.', 'Penser qu’un QR code est plus sûr qu’un lien classique.'],
      scenario: 'Vous recevez une facture inattendue avec une pièce jointe et un message pressant. Avant d’ouvrir, il faut se demander si le document était attendu, si l’expéditeur est cohérent, si le domaine est correct et si une vérification par un canal sûr est possible.',
      remember: 'Urgence, secret, autorité, argent, pièce jointe inattendue, QR code non vérifié et demande de code sont des alertes fortes.',
      trap: 'Un phishing peut être parfaitement écrit. L’absence de fautes ne suffit pas à le rendre légitime.',
      vocabulary: ['Phishing', 'Spear phishing', 'Smishing', 'Vishing', 'Quishing', 'Fraude au président', 'Faux support', 'Changement d’IBAN', 'Canal indépendant']
    },
    {
      id: 'mots-de-passe',
      title: 'Mots de passe et authentification',
      themeIds: ['passwords'],
      intro: 'La sécurité d’un compte dépend d’un mot de passe unique, suffisamment long, stocké correctement et complété par une authentification multifacteur lorsque c’est possible.',
      definitions: ['Mot de passe unique: secret utilisé pour un seul service.', 'Phrase de passe: mot de passe long, souvent composé de plusieurs mots.', 'Credential stuffing: essais automatiques d’identifiants issus de fuites sur d’autres sites.', 'MFA: authentification multifacteur, par exemple mot de passe plus code ou application.', 'Gestionnaire de mots de passe: outil qui génère et conserve des secrets dans un coffre chiffré.', 'Code de récupération: code de secours à conserver pour récupérer un compte si le second facteur est perdu.'],
      keyPoints: ['La longueur du mot de passe est souvent plus importante que des substitutions compliquées mais prévisibles.', 'Réutiliser un mot de passe transforme une fuite sur un service en risque pour tous les autres comptes.', 'Have I Been Pwned permet de vérifier si une adresse email apparaît dans des fuites connues, sans fournir son mot de passe.', 'Si une adresse apparaît dans une fuite, il faut se demander quels comptes utilisaient le même mot de passe.', 'Un gestionnaire aide à créer des mots de passe uniques et à éviter la mémorisation impossible.', 'La MFA protège contre de nombreux vols de mot de passe mais ne doit pas être validée aveuglément.', 'Un code reçu par SMS ou une notification MFA ne doit jamais être communiqué à un prétendu support.'],
      goodPractices: ['Tester uniquement sa propre adresse sur Have I Been Pwned.', 'Ne jamais entrer son mot de passe dans un site de vérification de fuite.', 'Utiliser un mot de passe unique par service important.', 'Activer la MFA sur les comptes sensibles.', 'Refuser une demande MFA inattendue.', 'Changer un mot de passe compromis depuis un appareil et une adresse fiables.', 'Fermer les sessions inconnues après suspicion de compromission.', 'Conserver les codes de récupération dans un endroit sûr.'],
      commonMistakes: ['Utiliser le même mot de passe partout.', 'Choisir un mot de passe court avec une variante facile à deviner.', 'Enregistrer des mots de passe dans un fichier non protégé.', 'Communiquer un code de connexion par téléphone ou chat.', 'Valider une notification MFA pour faire disparaître l’alerte.', 'Changer seulement le compte compromis alors que le même mot de passe est utilisé ailleurs.'],
      scenario: 'Vous avez saisi votre mot de passe professionnel sur une fausse page. Il faut prévenir rapidement, changer le mot de passe depuis un canal officiel, fermer les sessions ouvertes, vérifier les règles de transfert de messagerie et traiter les autres comptes où le même mot de passe était utilisé.',
      remember: 'Un compte se protège avant tout par l’unicité du mot de passe et par la capacité à réagir vite après une fuite.',
      trap: 'La MFA ne protège pas si l’utilisateur transmet volontairement le code ou valide une connexion qu’il n’a pas initiée.',
      vocabulary: ['Phrase de passe', 'MFA', 'Credential stuffing', 'Gestionnaire de mots de passe', 'Mot de passe maître', 'Have I Been Pwned', 'Code de récupération', 'Session ouverte']
    },
    {
      id: 'navigation-web',
      title: 'Navigation web, HTTPS et cookies',
      themeIds: ['web'],
      intro: 'Naviguer en sécurité implique de savoir lire une adresse web, comprendre le rôle d’HTTPS, connaître les limites du cadenas et identifier les traces laissées par le navigateur.',
      definitions: ['URL: adresse complète d’une ressource web.', 'Nom de domaine: partie principale contrôlée par le titulaire, par exemple example.com.', 'Sous-domaine: partie placée avant le domaine, comme login.example.com.', 'HTTPS: protocole qui chiffre la connexion entre le navigateur et le site.', 'Certificat numérique: élément qui permet au navigateur de vérifier le domaine et de chiffrer la connexion.', 'Autorité de certification: organisme qui émet ou valide des certificats.', 'Cookie: petite donnée stockée par le navigateur pour une session, une préférence ou du suivi.', 'Navigation privée: mode qui limite surtout les traces locales après fermeture de la fenêtre.'],
      keyPoints: ['Le cadenas HTTPS indique une connexion chiffrée, pas que le site est honnête.', 'Un site frauduleux peut obtenir un certificat pour son propre domaine.', 'Le domaine important se lit juste avant l’extension: dans login.microsoft.example.com, le domaine principal est example.com.', 'Les attaquants utilisent le typosquatting et des domaines contenant une marque pour tromper.', 'Les cookies peuvent être nécessaires au fonctionnement, utiles au confort ou utilisés pour le suivi publicitaire.', 'La navigation privée ne rend pas anonyme: le site, le réseau ou le fournisseur peuvent toujours voir certaines informations.', 'Avant un paiement ou une connexion sensible, il faut vérifier le domaine, le contexte, la réputation et les mentions du site.'],
      goodPractices: ['Taper soi-même l’adresse d’un service important ou passer par un favori connu.', 'Examiner le domaine réel avant de saisir un mot de passe.', 'Vérifier la cohérence du site avant un achat: réputation, mentions légales, conditions, moyens de contact.', 'Télécharger les logiciels depuis les sources officielles.', 'Utiliser des outils d’analyse de lien ou de fichier quand un doute existe.', 'Limiter les cookies non nécessaires lorsque le choix est proposé.', 'Garder le navigateur à jour pour corriger des vulnérabilités.'],
      commonMistakes: ['Croire que le cadenas HTTPS garantit que le vendeur est fiable.', 'Confondre un sous-domaine trompeur avec un domaine officiel.', 'Cliquer sur un lien raccourci ou masqué sans vérifier.', 'Accepter tous les cookies par automatisme.', 'Penser que la navigation privée masque l’adresse IP ou protège contre le phishing.', 'Télécharger un logiciel depuis une publicité ou un site miroir inconnu.'],
      scenario: 'Une page de connexion ressemble à Microsoft mais l’adresse est microsoft-securite-verification.com. Le mot Microsoft est présent, mais le domaine n’est pas nécessairement contrôlé par Microsoft: il faut quitter la page et ouvrir le service officiel soi-même.',
      remember: 'HTTPS protège le transport; il ne prouve pas l’intention du site.',
      trap: 'Un faux site peut avoir un vrai certificat et un design crédible.',
      vocabulary: ['URL', 'Domaine', 'Sous-domaine', 'HTTPS', 'Certificat', 'Autorité de certification', 'Cookie de session', 'Cookie persistant', 'Typosquatting']
    },
    {
      id: 'reseaux-vpn',
      title: 'Réseaux, VPN, proxy et pare-feu',
      themeIds: ['network', 'web'],
      intro: 'Les outils réseau n’ont pas tous le même rôle. Le VPN, le proxy, le pare-feu et l’antivirus sont complémentaires, mais aucun ne rend l’utilisateur invulnérable.',
      definitions: ['VPN: tunnel chiffré ou protégé permettant d’accéder à un réseau ou à des services, souvent ceux de l’entreprise.', 'VPN d’entreprise: solution contrôlée par l’organisation pour accéder à des applications internes depuis l’extérieur.', 'Proxy: intermédiaire qui reçoit une requête puis la transmet, avec parfois cache, filtrage ou journalisation.', 'Pare-feu: outil qui autorise ou bloque des flux réseau selon des règles.', 'Wi-Fi public: réseau partagé dont l’identité ou la sécurité peut être incertaine.', 'Partage de connexion: utilisation du réseau mobile d’un appareil comme point d’accès personnel.'],
      keyPoints: ['Un VPN peut chiffrer le tunnel et faciliter l’accès distant à des ressources internes.', 'Le VPN ne remplace pas le mot de passe, la MFA, les mises à jour ou la vigilance face au phishing.', 'Un proxy peut filtrer des contenus, journaliser des requêtes, accélérer certains accès ou masquer l’adresse présentée au site.', 'Un pare-feu réduit certains flux indésirables mais n’empêche pas toutes les actions dangereuses d’un utilisateur.', 'Un Wi-Fi public peut être imité par un attaquant avec un nom crédible.', 'Sur un réseau inconnu, HTTPS reste important, mais il ne protège pas contre un faux site.', 'Un appareil compromis peut devoir être isolé en coupant le Wi-Fi ou en débranchant le câble réseau selon les consignes.'],
      goodPractices: ['Préférer un réseau connu, un partage de connexion ou le VPN professionnel pour les usages sensibles.', 'Vérifier auprès du lieu le nom exact d’un Wi-Fi public avant de s’y connecter.', 'Éviter les paiements et connexions sensibles sur un réseau douteux.', 'Respecter les consignes de l’entreprise pour le VPN.', 'Distinguer le rôle de chaque outil au lieu de penser qu’un seul protège tout.', 'Déconnecter un appareil suspect du réseau si la procédure le demande, puis prévenir rapidement.'],
      commonMistakes: ['Penser qu’un VPN rend anonyme ou invulnérable.', 'Croire qu’un pare-feu bloque les pièces jointes malveillantes ouvertes volontairement.', 'Confondre proxy, VPN, antivirus et pare-feu.', 'Faire confiance à un Wi-Fi uniquement parce que son nom semble officiel.', 'Utiliser un VPN personnel non autorisé pour accéder à des données professionnelles.'],
      scenario: 'En déplacement, vous devez consulter une information sensible. Le choix le plus prudent est d’utiliser un réseau connu, un partage de connexion ou le VPN professionnel prévu par l’organisation, plutôt qu’un Wi-Fi public dont l’origine n’est pas vérifiée.',
      remember: 'Un outil réseau réduit certains risques précis; il ne remplace jamais les bons réflexes.',
      trap: 'Un tunnel chiffré vers l’entreprise ne rend pas sûr un mot de passe réutilisé ni un clic sur une fausse page.',
      vocabulary: ['VPN', 'Proxy', 'Pare-feu', 'Tunnel', 'Filtrage', 'Journalisation', 'Wi-Fi public', 'Partage de connexion', 'Isolation réseau']
    },
    {
      id: 'malwares-pieces-jointes',
      title: 'Logiciels malveillants et pièces jointes',
      themeIds: ['malware'],
      intro: 'Les logiciels malveillants peuvent voler, espionner, chiffrer, se cacher, ouvrir un accès ou perturber un système. Ils arrivent souvent par liens, pièces jointes, logiciels piégés, faux supports ou supports externes.',
      definitions: ['Virus: malware souvent associé à un fichier ou programme hôte.', 'Ver: malware capable de se propager automatiquement.', 'Cheval de Troie: programme qui paraît légitime mais cache une fonction malveillante.', 'Ransomware: malware qui chiffre ou bloque des données et demande une rançon.', 'Spyware: logiciel espion.', 'Keylogger: outil qui capture les frappes clavier.', 'Rootkit: composant qui cherche à dissimuler une présence malveillante.', 'Backdoor: accès caché maintenu par l’attaquant.', 'Botnet: ensemble de machines compromises contrôlées à distance.'],
      keyPoints: ['Une pièce jointe inattendue est un risque même si son nom paraît banal: facture, contrat, bon de commande, relance paiement.', 'Les documents Office, PDF, archives ZIP, scripts, faux PDF ou fichiers exécutables peuvent être dangereux.', 'Les macros dans les documents Office peuvent exécuter du code.', 'Un outil de prise en main à distance est légitime dans un cadre vérifié, mais dangereux s’il est demandé par un faux support.', 'Un ransomware peut chiffrer des fichiers locaux, partagés et parfois des sauvegardes accessibles.', 'L’antivirus aide mais ne détecte pas toutes les menaces, surtout les attaques récentes ou ciblées.', 'L’ouverture d’une pièce jointe suspecte suivie de fichiers illisibles doit être traitée comme un incident urgent.'],
      goodPractices: ['Vérifier le contexte d’une pièce jointe avant ouverture.', 'Ne pas activer les macros d’un document inattendu.', 'Ne pas installer un logiciel demandé par téléphone sans validation officielle.', 'Analyser un fichier suspect avec les outils autorisés.', 'Isoler rapidement la machine si des signes de ransomware apparaissent.', 'Prévenir le service compétent et conserver les messages ou fichiers suspects.', 'Ne pas payer immédiatement une rançon: suivre la procédure de crise et évaluer les sauvegardes.'],
      commonMistakes: ['Se fier uniquement à l’extension ou à l’icône du fichier.', 'Ouvrir une pièce jointe pour identifier l’expéditeur.', 'Activer les macros parce que le document le demande.', 'Redémarrer ou nettoyer soi-même une machine suspecte.', 'Payer rapidement en espérant régler le problème.', 'Supposer qu’une image ou un PDF est toujours inoffensif.'],
      scenario: 'Après ouverture d’une pièce jointe, plusieurs fichiers deviennent impossibles à ouvrir et un message exige une rançon. La priorité est d’arrêter les manipulations inutiles, isoler l’appareil selon la procédure, prévenir rapidement et préserver les preuves.',
      remember: 'Un malware moderne peut combiner plusieurs fonctions: espionnage, vol de mots de passe, chiffrement et accès caché.',
      trap: 'Un fichier dangereux peut avoir une icône rassurante ou être contenu dans une archive.',
      vocabulary: ['Virus', 'Ver', 'Cheval de Troie', 'Ransomware', 'Spyware', 'Adware', 'Keylogger', 'Rootkit', 'Backdoor', 'Botnet', 'Macro', 'Quarantaine']
    },
    {
      id: 'protection-appareils',
      title: 'Mises à jour et protection des appareils',
      themeIds: ['devices'],
      intro: 'La protection d’un appareil repose sur des mesures simples mais régulières: mises à jour, verrouillage, antivirus, pare-feu, chiffrement, sauvegarde et réaction rapide en cas de perte ou de vol.',
      definitions: ['Système d’exploitation: logiciel principal de l’appareil, comme Windows, macOS, Android ou iOS.', 'Correctif de sécurité: mise à jour qui corrige une faille.', 'Vulnérabilité: défaut pouvant être exploité.', 'Architecture 32/64 bits: caractéristique technique utile pour installer les bons logiciels ou correctifs.', 'Chiffrement du disque: protection qui rend les données difficilement lisibles sans clé ou mot de passe.', 'Verrouillage automatique: blocage de l’écran après une période d’inactivité.'],
      keyPoints: ['Repousser une mise à jour importante pendant des semaines laisse des failles connues exploitables.', 'Un navigateur, un système ou un logiciel obsolète peut être ciblé par une page ou un fichier malveillant.', 'Un verrouillage par code PIN, mot de passe ou biométrie limite l’accès physique.', 'Un simple balayage sans verrouillage réel ne protège pas les données.', 'Le chiffrement du disque réduit fortement le risque en cas de vol d’ordinateur.', 'La localisation et l’effacement à distance peuvent aider pour un téléphone ou ordinateur professionnel, selon les règles de l’organisation.', 'Un appareil perdu ou volé doit être signalé rapidement pour bloquer les accès et évaluer les données présentes.'],
      goodPractices: ['Activer les mises à jour automatiques lorsque c’est possible.', 'Installer rapidement les correctifs de sécurité.', 'Verrouiller son écran dès que l’on quitte son poste.', 'Utiliser un code ou mot de passe robuste sur smartphone et ordinateur.', 'Activer le chiffrement quand l’organisation le prévoit.', 'Ne pas laisser un ordinateur sans surveillance, surtout en déplacement.', 'Signaler sans délai la perte ou le vol d’un appareil professionnel.', 'Faire une sauvegarde avant un voyage ou une intervention risquée.'],
      commonMistakes: ['Reporter indéfiniment les mises à jour par confort.', 'Laisser une session ouverte pendant une pause.', 'Stocker des documents sensibles sur un appareil non chiffré.', 'Croire que l’antivirus suffit si le système n’est pas à jour.', 'Attendre plusieurs jours avant de déclarer un appareil perdu.', 'Noter le code PIN sur ou près de l’appareil.'],
      scenario: 'Votre smartphone professionnel propose une mise à jour importante. La repousser pendant des semaines augmente le risque qu’une faille connue soit exploitée. Le bon réflexe est de planifier rapidement l’installation, en respectant les consignes internes.',
      remember: 'Un appareil bien protégé est un appareil à jour, verrouillé, sauvegardé et signalé rapidement en cas de problème.',
      trap: 'Le mot de passe de session ne remplace pas le chiffrement du disque en cas de vol physique.',
      vocabulary: ['Correctif', 'Vulnérabilité', 'Windows 32/64 bits', 'Verrouillage automatique', 'Chiffrement', 'Antivirus', 'Pare-feu', 'Effacement à distance']
    },
    {
      id: 'sauvegardes-cloud',
      title: 'Sauvegardes, cloud et supports externes',
      themeIds: ['network', 'devices'],
      intro: 'Sauvegarder ses données permet de récupérer des fichiers après une erreur, une panne, une perte, un vol ou un ransomware. Synchroniser un dossier ou utiliser le cloud ne suffit pas toujours.',
      definitions: ['Sauvegarde: copie destinée à restaurer des données après incident.', 'Synchronisation: reproduction automatique des changements entre appareils ou services.', 'Restauration: opération qui récupère les données depuis une sauvegarde.', 'Règle 3-2-1: conserver trois copies, sur deux types de supports, avec une copie hors site ou hors ligne.', 'Support externe: clé USB, disque externe, carte mémoire ou autre support amovible.', 'Copie hors ligne: sauvegarde déconnectée du poste ou du réseau après création.'],
      keyPoints: ['Une synchronisation peut aussi synchroniser une suppression ou un chiffrement par ransomware.', 'Une sauvegarde doit être régulière, automatique si possible, et testée.', 'Plusieurs copies sur plusieurs supports réduisent le risque de tout perdre en même temps.', 'Une copie hors ligne protège mieux contre les ransomwares qui chiffrent les lecteurs accessibles.', 'Le cloud professionnel doit être utilisé selon les règles internes, surtout pour les données personnelles ou confidentielles.', 'Les droits de partage dans le cloud peuvent exposer des dossiers à trop de personnes.', 'Une clé USB perdue contenant des documents professionnels peut devenir une violation de données si elle n’est pas chiffrée.'],
      goodPractices: ['Mettre en place des sauvegardes régulières.', 'Tester périodiquement la restauration.', 'Conserver au moins une copie isolée ou hors ligne pour les données importantes.', 'Chiffrer les supports externes contenant des données sensibles.', 'Limiter les droits de partage aux personnes qui en ont réellement besoin.', 'Ne pas brancher une clé USB trouvée.', 'Signaler la perte d’un support contenant des documents professionnels.', 'Sauvegarder les données importantes avant un voyage ou une intervention.'],
      commonMistakes: ['Croire qu’un dossier synchronisé est automatiquement une vraie sauvegarde.', 'Ne jamais tester la restauration.', 'Laisser le disque de sauvegarde branché en permanence.', 'Partager un dossier cloud par lien public sans nécessité.', 'Stocker des fichiers personnels sensibles dans un espace professionnel partagé.', 'Transporter une clé USB non chiffrée avec des copies de documents d’identité.'],
      scenario: 'Une clé USB contenant des listes clients, contrats et copies de documents d’identité est perdue dans les transports. Il faut prévenir rapidement, identifier les données concernées, évaluer le risque et vérifier si l’incident constitue une violation de données.',
      remember: 'Une sauvegarde n’est utile que si elle est récupérable, protégée et séparée de l’incident principal.',
      trap: 'Le cloud peut être une partie de la stratégie, mais il ne remplace pas automatiquement une sauvegarde testée.',
      vocabulary: ['Sauvegarde', 'Synchronisation', 'Restauration', '3-2-1', 'Hors ligne', 'Hors site', 'Support chiffré', 'Cloud professionnel']
    },
    {
      id: 'teletravail-mdm',
      title: 'Télétravail, voyages et appareils professionnels',
      themeIds: ['devices', 'network'],
      intro: 'En mobilité et en télétravail, les risques changent: réseau inconnu, regard des autres, vol, perte, appareil personnel, cloud professionnel, MDM et séparation entre vie privée et travail.',
      definitions: ['Télétravail: activité professionnelle réalisée hors des locaux habituels.', 'MDM: Mobile Device Management, solution de gestion centralisée des appareils.', 'Données minimales: uniquement les informations nécessaires à la mission ou au déplacement.', 'Filtre de confidentialité: accessoire limitant la visibilité latérale de l’écran.', 'Effacement à distance: suppression de données sur un appareil perdu ou volé, si la fonction est prévue.'],
      keyPoints: ['Avant un déplacement, il est prudent de sauvegarder et d’emporter seulement les données nécessaires.', 'Un ordinateur laissé dans une voiture ou sans surveillance peut exposer des données professionnelles.', 'Un écran visible dans le train, un café ou un coworking peut révéler des informations sensibles.', 'Un MDM peut imposer des politiques de sécurité, installer des applications professionnelles, gérer les mises à jour et aider à effacer à distance.', 'L’utilisation personnelle d’un appareil professionnel dépend des règles internes.', 'L’organisation peut administrer certains espaces professionnels, mais cela doit respecter un cadre légal et proportionné.', 'Les chargeurs, clés USB et périphériques inconnus peuvent être risqués.'],
      goodPractices: ['Verrouiller l’écran systématiquement.', 'Éviter de travailler sur des documents sensibles dans un lieu exposé.', 'Utiliser un filtre de confidentialité si nécessaire.', 'Utiliser les outils et VPN autorisés par l’organisation.', 'Transporter les appareils de façon sécurisée.', 'Ne pas laisser un ordinateur dans une voiture.', 'Séparer données privées et professionnelles.', 'Signaler immédiatement une perte, un vol ou un accès suspect.'],
      commonMistakes: ['Utiliser un outil personnel non autorisé pour contourner une contrainte.', 'Stocker des données privées dans un dossier professionnel partagé.', 'Considérer un appareil professionnel comme totalement privé.', 'Travailler sur des données sensibles avec l’écran visible de tous.', 'Brancher un périphérique trouvé ou emprunté sans vérification.', 'Emporter plus de données que nécessaire en voyage.'],
      scenario: 'Dans un train, un document RH est visible sur votre écran. Même sans attaque technique, la confidentialité peut être compromise. Il faut réduire l’affichage, changer d’emplacement, utiliser un filtre ou attendre un contexte plus adapté.',
      remember: 'La sécurité en mobilité commence avant de partir: sauvegarder, limiter les données, protéger l’appareil et connaître la procédure.',
      trap: 'Le MDM n’autorise pas tout: il protège et administre selon un cadre, mais ne supprime pas les limites liées à la vie privée.',
      vocabulary: ['Télétravail', 'MDM', 'VPN professionnel', 'Filtre de confidentialité', 'Effacement à distance', 'Données minimales', 'Appareil professionnel']
    },
    {
      id: 'vie-privee-osint',
      title: 'Vie privée, réseaux sociaux et OSINT',
      themeIds: ['osint'],
      intro: 'L’OSINT consiste à rechercher et analyser des informations accessibles publiquement. Dans la formation, l’objectif est de comprendre ses propres traces numériques, pas d’enquêter sur d’autres personnes.',
      definitions: ['OSINT: Open Source Intelligence, recherche d’informations dans des sources ouvertes.', 'Trace numérique: information laissée ou publiée en ligne.', 'E-réputation: image que les traces publiques donnent d’une personne.', 'Recherche exacte: recherche entre guillemets pour trouver une expression précise.', 'Croisement d’informations: utilisation de plusieurs indices séparés pour obtenir une information plus précise.', 'Navigation privée: utile pour réduire la personnalisation locale des résultats, mais pas pour devenir anonyme.'],
      keyPoints: ['Les sources OSINT peuvent être moteurs de recherche, réseaux sociaux, anciens comptes, forums, annuaires, documents publics, photos, vidéos et commentaires.', 'L’exercice doit être fait uniquement sur soi-même, jamais sur un autre stagiaire, collègue ou proche.', 'Un nom peut mener à un ancien pseudo, un pseudo à un forum, une photo à un lieu, un profil professionnel à une entreprise.', 'Les guillemets permettent de chercher précisément un nom, un pseudo, une adresse email ou un numéro.', 'Les images peuvent révéler un domicile, une école, un travail, un badge, une plaque, un écran ou des habitudes.', 'Une même photo réutilisée sur plusieurs plateformes peut relier plusieurs comptes.', 'Il ne faut pas mettre ses vraies données personnelles exactes dans le rapport d’exercice.'],
      goodPractices: ['Faire l’audit dans une fenêtre privée ou un navigateur non connecté pour voir ce qu’un visiteur extérieur verrait plus facilement.', 'Lister ses variantes d’identité: prénom nom, nom prénom, pseudo, email, ville, métier, école, ancienne entreprise.', 'Rechercher ses anciens pseudos et anciens comptes.', 'Observer les informations visibles sans être connecté.', 'Décrire les types d’informations retrouvées sans les recopier précisément.', 'Identifier comment les informations se croisent.', 'Réduire son exposition: supprimer, corriger, passer en privé, dissocier des pseudos, limiter les photos et vérifier les anciens comptes.'],
      commonMistakes: ['Faire des recherches sur quelqu’un d’autre sans autorisation.', 'Partager des captures contenant des informations sensibles.', 'Mentionner dans le rapport une adresse complète, un numéro ou des données exactes.', 'Penser qu’une information ancienne n’a plus d’importance.', 'Réutiliser partout le même pseudo ou la même photo.', 'Confondre navigation privée et anonymat complet.', 'Oublier les anciennes publications et anciens comptes.'],
      scenario: 'Vous trouvez un ancien pseudo sur un vieux profil public. En cherchant ce pseudo entre guillemets, vous retrouvez un compte de forum avec une photo similaire et un centre d’intérêt. C’est exactement le principe du croisement OSINT.',
      remember: 'Une information seule paraît parfois anodine; plusieurs informations croisées peuvent créer un profil précis.',
      trap: 'Le but d’un audit OSINT personnel n’est pas de publier ce que vous trouvez, mais de comprendre ce qui est visible et de réduire l’exposition.',
      vocabulary: ['OSINT', 'Source ouverte', 'Pseudo', 'Recherche exacte', 'Croisement', 'E-réputation', 'Navigation privée', 'Métadonnées', 'Ancien compte']
    },
    {
      id: 'rgpd-travail',
      title: 'RGPD au travail: employeur, travailleur et vie privée',
      themeIds: ['data', 'devices', 'network'],
      intro: 'Dans une entreprise, la frontière entre vie privée et vie professionnelle peut devenir floue: ordinateur professionnel, messagerie, cloud, GSM, télétravail, véhicule géolocalisé, journaux de connexion et outils collaboratifs. L’employeur dispose d’un pouvoir de direction et de contrôle, mais ce pouvoir n’autorise pas une surveillance illimitée.',
      definitions: ['Donnée de travailleur: information qui concerne un salarié, candidat, ancien salarié, intérimaire ou collaborateur identifiable.', 'Pouvoir de contrôle: possibilité pour l’employeur de vérifier le travail et l’usage des outils professionnels, dans un cadre légal et proportionné.', 'Vie privée au travail: droit du travailleur à une sphère personnelle, même lorsqu’il utilise des outils mis à disposition par l’entreprise.', 'Finalité: raison précise du contrôle, par exemple sécurité informatique, continuité du service ou protection d’intérêts économiques.', 'Proportionnalité: limitation du contrôle à ce qui est strictement nécessaire.', 'Transparence: information claire et préalable du travailleur sur les contrôles possibles.', 'Individualisation: passage d’un contrôle global à l’identification d’un travailleur déterminé.', 'Cloud d’entreprise: espace professionnel de stockage et de collaboration administré par l’organisation.'],
      keyPoints: ['L’employeur peut contrôler certains usages des outils professionnels, mais il doit respecter les principes RGPD: finalité, minimisation, proportionnalité, transparence, sécurité et durée de conservation limitée.', 'Le consentement du travailleur est rarement une bonne base juridique pour la surveillance, car la relation employeur/travailleur crée une situation de subordination.', 'La surveillance d’Internet et de la messagerie doit en principe rester globale; l’identification d’un travailleur précis doit être encadrée et justifiée.', 'Les règles doivent être annoncées clairement: règlement de travail, politique ICT, contrat, charte informatique ou autre document accessible.', 'Un employeur ne devrait pas lire librement le contenu de messages ou fichiers personnels simplement parce qu’ils sont dans un outil professionnel.', 'Si l’entreprise interdit l’usage personnel des outils, elle doit le dire clairement; si elle le tolère, elle doit prévoir comment les éléments privés sont identifiés et protégés.', 'Dans un cloud d’entreprise, l’organisation peut administrer, sécuriser, sauvegarder et gérer les accès, mais l’ouverture d’un fichier clairement personnel doit rester exceptionnelle, justifiée et proportionnée.', 'Le télétravail ne permet pas une surveillance permanente du domicile, de l’écran, de la webcam ou de l’activité minute par minute.', 'La géolocalisation d’un véhicule professionnel peut être légitime pour la sécurité, la gestion de tournées, la protection du véhicule ou certaines prestations, mais pas pour suivre en permanence la vie privée.', 'Un système de géolocalisation doit pouvoir être désactivé en dehors du temps de travail lorsque le véhicule est utilisé à titre privé.', 'Le GSM professionnel peut être géré et sécurisé par l’entreprise, mais les données privées ou communications personnelles ne deviennent pas automatiquement accessibles à tout moment.', 'Les journaux techniques, historiques de connexion et traces cloud sont des données personnelles dès qu’ils permettent d’identifier un travailleur.'],
      goodPractices: ['Pour l’employeur: définir une finalité précise avant tout contrôle.', 'Informer les travailleurs à l’avance: outils concernés, données collectées, objectifs, durée, personnes ayant accès, procédure en cas d’anomalie.', 'Préférer des contrôles globaux ou statistiques avant de cibler une personne.', 'Limiter l’accès au contenu des emails ou fichiers aux situations réellement nécessaires: continuité du service, incident de sécurité, absence prolongée, soupçon sérieux ou obligation légale.', 'Prévoir une procédure pour les fichiers explicitement personnels dans le cloud professionnel, par exemple dossier nommé Personnel ou Privé si l’usage personnel est toléré.', 'Ne pas fouiller un espace cloud ou une messagerie par curiosité ou simple confort managérial.', 'Utiliser des comptes, dossiers partagés et boîtes fonctionnelles pour éviter de dépendre de la messagerie personnelle d’un travailleur absent.', 'Pour le travailleur: éviter de stocker des fichiers privés dans le cloud de l’entreprise, surtout s’ils sont sensibles.', 'Identifier clairement ce qui est privé si les règles internes l’autorisent.', 'Ne pas mélanger données clients, documents professionnels et fichiers personnels.', 'En télétravail, utiliser les outils autorisés, verrouiller son écran et protéger les documents visibles par les proches ou colocataires.', 'En cas de doute sur un contrôle ou une demande d’accès, consulter la politique ICT, le règlement de travail, le DPO, les RH ou un représentant compétent.'],
      commonMistakes: ['Croire que tout ce qui se trouve sur un ordinateur ou cloud d’entreprise peut être lu librement par l’employeur.', 'Croire à l’inverse qu’un dossier nommé personnel dans un outil professionnel est totalement inaccessible en toutes circonstances.', 'Mettre des documents médicaux, administratifs ou familiaux dans un cloud professionnel partagé.', 'Utiliser la messagerie professionnelle comme boîte privée principale.', 'Installer un outil de surveillance très intrusif sans information claire des travailleurs.', 'Contrôler en permanence la localisation d’un véhicule, y compris pendant les pauses, trajets domicile-travail ou usages privés.', 'Utiliser la géolocalisation pour contrôler la vitesse ou calculer le temps de travail alors qu’un autre dispositif existe déjà.', 'Activer webcam, capture d’écran ou suivi de frappe en télétravail sans nécessité forte et sans information claire.', 'Demander le consentement du travailleur pour justifier un contrôle qui devrait reposer sur une autre base et respecter un cadre strict.', 'Oublier que les logs, métadonnées, historiques d’accès et noms de fichiers sont aussi des données personnelles.'],
      scenario: 'Un travailleur place dans le cloud de l’entreprise un dossier nommé “Personnel” avec des documents familiaux. Un manager veut l’ouvrir pour “vérifier ce qu’il y a dedans”. Le bon raisonnement n’est pas “c’est le cloud de l’entreprise donc tout est lisible”. Il faut vérifier la politique interne, la finalité, la nécessité, l’existence d’une alternative moins intrusive et le caractère clairement personnel du dossier. Dans la plupart des cas, l’employeur doit éviter d’ouvrir le contenu personnel et privilégier une procédure encadrée.',
      remember: 'Au travail, la vie privée ne disparaît pas. L’employeur peut contrôler, mais seulement pour un objectif légitime, annoncé, proportionné et limité.',
      trap: 'La propriété de l’outil ne donne pas un droit automatique de lire tous les contenus. Inversement, utiliser un outil professionnel pour des fichiers privés n’offre pas une confidentialité absolue.',
      vocabulary: ['Vie privée au travail', 'Pouvoir de contrôle', 'Politique ICT', 'Règlement de travail', 'Finalité', 'Proportionnalité', 'Transparence', 'Individualisation', 'Cloud d’entreprise', 'Géolocalisation', 'Télétravail', 'Logs']
    },
    {
      id: 'rgpd-donnees',
      title: 'RGPD et données personnelles',
      themeIds: ['data'],
      intro: 'Le RGPD encadre la collecte et l’utilisation des données personnelles. Il n’interdit pas tout traitement, mais impose une finalité claire, des données nécessaires, de la transparence, des droits et des mesures de sécurité.',
      definitions: ['Donnée personnelle: information qui identifie directement ou indirectement une personne.', 'Donnée sensible: donnée nécessitant une protection renforcée, comme une donnée de santé.', 'Traitement: collecte, consultation, stockage, partage, modification ou suppression de données.', 'Finalité: objectif précis pour lequel les données sont utilisées.', 'Minimisation: collecter uniquement ce qui est nécessaire.', 'Durée de conservation: période pendant laquelle les données peuvent être gardées.', 'Base légale: justification permettant le traitement.', 'Droit à l’effacement: droit de demander la suppression, avec certaines limites.'],
      keyPoints: ['Une liste de participants avec noms, emails, téléphones, présences et résultats ne doit pas être visible par tout le groupe sans raison.', 'Une newsletter commerciale ne peut pas être envoyée simplement parce qu’une personne a créé un compte si elle n’a pas été clairement informée ou si la base légale n’est pas adaptée.', 'Une photo permettant d’identifier une personne est une donnée personnelle; la publication doit être encadrée.', 'Des CV non retenus ne doivent pas être conservés indéfiniment sans information et justification.', 'Les données médicales des employés sont particulièrement sensibles et doivent être strictement limitées et protégées.', 'Un formulaire d’événement qui demande situation familiale, copie d’identité ou données inutiles pose un problème de minimisation.', 'Le droit à l’effacement existe, mais certaines obligations légales peuvent imposer de conserver des informations.'],
      goodPractices: ['Toujours se demander quelles données personnelles sont concernées.', 'Vérifier si la pratique est autorisée, interdite ou autorisée sous conditions.', 'Limiter l’accès aux seules personnes qui en ont besoin.', 'Informer les personnes au moment de la collecte.', 'Prévoir une désinscription simple pour une newsletter.', 'Définir une durée de conservation proportionnée.', 'Protéger davantage les données sensibles.', 'Utiliser des sources officielles pour répondre à une question RGPD.'],
      commonMistakes: ['Collecter des données “au cas où”.', 'Rendre visibles des résultats ou présences individuelles à tout un groupe.', 'Publier des photos de formation sans information préalable.', 'Conserver des CV pendant des années sans cadre.', 'Donner accès à des données médicales à trop de personnes.', 'Répondre “nous ne supprimons jamais les données” à une demande d’effacement.', 'Confondre consentement, information et base légale.'],
      scenario: 'Un document partagé avec tous les stagiaires contient téléphones, emails, présences et résultats d’exercices. Il faut se demander quelles informations sont réellement nécessaires au groupe et réserver les données sensibles ou individuelles aux personnes autorisées.',
      remember: 'La question centrale est toujours: quelles données, pour quelle finalité, visibles par qui, pendant combien de temps et avec quelles protections ?',
      trap: 'Le RGPD n’est pas seulement une question de consentement: d’autres bases légales existent, mais elles doivent être justifiées.',
      vocabulary: ['Donnée personnelle', 'Donnée sensible', 'Finalité', 'Minimisation', 'Base légale', 'Transparence', 'Durée de conservation', 'Droit d’accès', 'Rectification', 'Effacement']
    },
    {
      id: 'ia-confidentialite',
      title: 'Intelligence artificielle et confidentialité',
      themeIds: ['data'],
      intro: 'Les outils d’intelligence artificielle peuvent aider à rédiger, reformuler ou analyser, mais ils posent un risque si l’on y copie des données personnelles, professionnelles, confidentielles ou inutiles.',
      definitions: ['Anonymisation: transformation qui empêche raisonnablement de réidentifier une personne.', 'Pseudonymisation: remplacement d’identifiants directs par des codes, sans supprimer tout risque.', 'Minimisation: retrait des informations inutiles avant utilisation.', 'Donnée client: information liée à une personne ou organisation cliente.', 'Règle interne: consigne de l’organisation sur les outils IA autorisés ou interdits.', 'Validation humaine: contrôle de la réponse produite avant usage.'],
      keyPoints: ['On ne peut pas transmettre n’importe quelle information à un outil d’IA.', 'Une réclamation client peut contenir nom, adresse, email, numéro de commande et détails sensibles.', 'Certaines données peuvent être supprimées, remplacées par des variables ou généralisées sans nuire à la demande.', 'Les outils d’IA peuvent conserver, traiter ou réutiliser des informations selon leurs conditions.', 'Les règles de l’organisation déterminent quels outils sont autorisés et pour quels types de données.', 'Il ne faut jamais copier d’identifiants, mots de passe, secrets professionnels ou données médicales dans un outil non prévu pour cela.', 'Une réponse IA peut être fausse, incomplète ou inadaptée: elle doit être relue.'],
      goodPractices: ['Supprimer les noms, emails, adresses, numéros de commande et détails non nécessaires.', 'Utiliser des exemples fictifs ou des variables: Client A, commande X, date approximative.', 'Vérifier les règles internes avant d’utiliser un outil IA.', 'Limiter la demande à ce qui est strictement utile.', 'Relire et corriger la réponse générée.', 'Ne pas transmettre de secret professionnel, d’identifiants ou de données sensibles.', 'Choisir un outil validé par l’organisation si le contenu est professionnel.'],
      commonMistakes: ['Coller une réclamation client complète pour obtenir une réponse plus précise.', 'Penser que pseudonymiser un nom suffit toujours.', 'Oublier qu’un numéro de commande ou un contexte précis peut réidentifier une personne.', 'Copier un fichier interne entier dans une IA publique.', 'Utiliser un outil non autorisé parce qu’il est pratique.', 'Faire confiance à la réponse sans vérification humaine.'],
      scenario: 'Un employé veut rédiger une réponse à un client. Au lieu de copier le nom, l’adresse, l’email, le numéro de commande et tout le détail de la réclamation, il peut résumer le problème avec des données fictives ou anonymisées et vérifier la réponse avant de l’envoyer.',
      remember: 'Moins l’IA reçoit de données réelles, plus le risque de fuite ou de réutilisation non maîtrisée diminue.',
      trap: 'Une donnée apparemment anodine, comme un numéro de commande ou une combinaison de détails, peut suffire à réidentifier une personne.',
      vocabulary: ['IA générative', 'Anonymisation', 'Pseudonymisation', 'Minimisation', 'Données client', 'Secret professionnel', 'Outil autorisé', 'Validation humaine']
    },
    {
      id: 'incidents-violations',
      title: 'Réaction aux incidents et violations de données',
      themeIds: ['malware', 'data'],
      intro: 'Face à un incident, le but n’est pas de devenir technicien, mais de prendre les bonnes premières décisions: réagir vite, ne pas cacher l’erreur, limiter les dégâts, prévenir et conserver les informations utiles.',
      definitions: ['Incident de sécurité: situation réelle ou suspecte pouvant compromettre un compte, un appareil, un service ou des données.', 'Violation de données: perte, vol, accès non autorisé, divulgation, modification ou destruction de données personnelles.', 'Confinement: action qui limite la propagation ou l’exposition.', 'Preuve: élément utile à l’analyse, comme email, heure, capture, fichier, journal ou action réalisée.', 'Compte compromis: compte utilisé ou consulté par une personne non autorisée.', 'Notification: information éventuelle à une autorité ou aux personnes concernées selon le risque.'],
      keyPoints: ['Mot de passe transmis sur une fausse page: il faut agir vite, changer depuis un canal fiable, fermer les sessions et vérifier les règles de transfert.', 'Mauvais destinataire: demander la suppression peut limiter l’impact, mais il faut aussi prévenir en interne et évaluer la violation.', 'Ordinateur professionnel volé: l’absence de chiffrement et un mot de passe simple augmentent le risque.', 'Ransomware: ne pas continuer à utiliser la machine, isoler, prévenir et évaluer les sauvegardes.', 'Clé USB perdue: listes clients, contrats et copies d’identité non chiffrées peuvent constituer une violation.', 'Faux support informatique: couper la connexion à distance, isoler si nécessaire et informer le vrai support.', 'Compte email piraté: prévenir les destinataires, vérifier sessions, règles de transfert et méthodes de récupération.', 'Base de données publique: limiter l’exposition sans effacer les traces, déterminer depuis quand elle était accessible et si elle a pu être téléchargée.'],
      goodPractices: ['Prévenir rapidement le service informatique, sécurité, responsable ou personne prévue par la procédure.', 'Noter l’heure de l’incident et les actions déjà réalisées.', 'Conserver les messages, fichiers, captures et informations utiles.', 'Limiter l’exposition sans détruire les preuves.', 'Isoler un appareil du réseau si la procédure le demande.', 'Changer les mots de passe depuis un appareil sûr.', 'Révoquer les sessions et contrôler les règles de transfert de messagerie.', 'Analyser quelles données personnelles sont concernées et qui pourrait être affecté.'],
      commonMistakes: ['Attendre de voir si quelque chose se passe.', 'Cacher une erreur par peur d’être jugé.', 'Supprimer le lien public et considérer l’incident terminé.', 'Continuer à utiliser un ordinateur potentiellement infecté.', 'Payer immédiatement une rançon.', 'Effacer les journaux ou reformater avant analyse.', 'Communiquer publiquement sans autorisation.', 'Oublier de prévenir les destinataires lorsque le compte compromis a envoyé des messages.'],
      scenario: 'Un fichier contenant noms, adresses et informations de facturation est envoyé au mauvais destinataire. Il faut essayer de limiter l’accès, demander la suppression, prévenir les personnes internes compétentes, évaluer les données concernées et documenter les décisions.',
      remember: 'Un signalement rapide vaut mieux qu’un signalement parfait mais tardif.',
      trap: 'Corriger l’apparence du problème ne suffit pas: il faut aussi comprendre l’impact, conserver les preuves et décider des obligations éventuelles.',
      vocabulary: ['Incident', 'Violation de données', 'Confinement', 'Preuve', 'Journal', 'Révocation de session', 'Règle de transfert', 'Notification', 'DPO']
    },
    {
      id: 'cert-iso',
      title: 'CERT, RSSI et ISO 27001',
      themeIds: ['network'],
      intro: 'La cybersécurité d’une organisation repose sur des rôles, des procédures et une amélioration continue. Le RSSI, les équipes sécurité, les CERT/CSIRT, Safeonweb et les normes comme ISO 27001 structurent cette démarche.',
      definitions: ['RSSI: responsable de la sécurité des systèmes d’information.', 'CERT/CSIRT: équipe chargée de coordonner la réponse aux incidents et de diffuser des informations de sécurité.', 'Safeonweb: initiative belge de sensibilisation et d’alerte sur les risques numériques.', 'Norme ISO: référentiel international définissant des exigences ou bonnes pratiques.', 'ISO 27001: norme de management de la sécurité de l’information.', 'SMSI: système de management de la sécurité de l’information.', 'Audit: vérification structurée du respect d’exigences ou de pratiques.'],
      keyPoints: ['Le RSSI définit la politique de sécurité, coordonne les risques, les règles, la prévention et la réaction aux incidents.', 'Une équipe sécurité peut analyser les alertes, isoler les machines touchées, conserver les preuves et coordonner la communication de crise.', 'Un CERT peut fournir assistance, alertes, informations sur les vulnérabilités et coopération avec d’autres acteurs.', 'Safeonweb s’adresse notamment aux citoyens et organisations pour signaler ou comprendre certaines arnaques et campagnes.', 'ISO 27001 vise la protection de l’information par la gestion des risques, des politiques, des responsabilités, des audits et l’amélioration continue.', 'Une certification ISO 27001 montre une démarche structurée, pas l’impossibilité d’un incident.', 'Les utilisateurs restent essentiels: signalement, vigilance et respect des procédures.'],
      goodPractices: ['Connaître les contacts internes à prévenir en cas d’incident.', 'Comprendre ce que l’on peut signaler à Safeonweb ou à un acteur compétent.', 'Conserver quelques notes personnelles sur CERT et Safeonweb pour savoir à qui ils s’adressent.', 'Suivre les procédures de signalement et de crise.', 'Participer aux retours d’expérience après un incident ou un exercice.', 'Ne pas attendre du RSSI ou du CERT qu’ils compensent un manque total de réflexes utilisateurs.', 'Documenter les incidents pour améliorer les mesures.'],
      commonMistakes: ['Penser qu’un CERT remplace le support interne dans toutes les situations.', 'Croire qu’ISO 27001 garantit zéro incident.', 'Voir la sécurité comme une certification administrative plutôt qu’un système vivant.', 'Oublier la communication de crise.', 'Ne pas savoir qui prévenir parce que les contacts n’ont jamais été identifiés.', 'Traiter la sensibilisation comme secondaire alors que les attaques ciblent souvent les utilisateurs.'],
      scenario: 'Après une attaque, l’organisation doit comprendre ce qui s’est passé, contenir, préserver les preuves, communiquer de manière coordonnée, restaurer, puis améliorer les politiques et procédures.',
      remember: 'La sécurité mature se pilote dans la durée: responsabilités claires, gestion des risques, procédures, audits, exercices et amélioration continue.',
      trap: 'La conformité aide, mais elle ne remplace pas les bons réflexes quotidiens ni la réaction rapide.',
      vocabulary: ['RSSI', 'CERT', 'CSIRT', 'Safeonweb', 'ISO 27001', 'SMSI', 'Audit', 'Gestion des risques', 'Politique de sécurité', 'Amélioration continue']
    }
  ];

  const extraQuestions = [
    {
      id: 'web-risk-triad',
      theme: 'web',
      subtheme: 'bases',
      difficulty: 'facile',
      type: 'matching',
      prompt: 'Reliez chaque notion de base à sa définition.',
      pairs: [
        ['menace', 'Menace', 'cause', 'Cause possible d’un événement indésirable'],
        ['vuln', 'Vulnérabilité', 'weakness', 'Faiblesse exploitable'],
        ['risk', 'Risque', 'combo', 'Probabilité et impact d’un événement'],
        ['incident', 'Incident', 'event', 'Événement réel ou suspect affectant la sécurité']
      ].map(([leftId, left, rightId, right]) => ({ leftId, left, rightId, right })),
      explanation: 'Ces notions structurent l’analyse de sécurité: une menace exploite une vulnérabilité, ce qui crée un risque, puis parfois un incident.',
      visual: '🧩',
      certification: true
    },
    {
      id: 'web-cia-grid',
      theme: 'web',
      subtheme: 'bases',
      difficulty: 'facile',
      type: 'tf-grid',
      prompt: 'Pour chaque affirmation, indiquez si le pilier de sécurité de l’information identifié est correct.',
      statements: [
        { id: 's1', text: 'Un fichier confidentiel est consulté par une personne non autorisée.', correct: true, explanation: 'C’est une atteinte à la confidentialité.' },
        { id: 's2', text: 'Une facture est modifiée sans autorisation.', correct: true, explanation: 'C’est une atteinte à l’intégrité.' },
        { id: 's3', text: 'Un service est indisponible pendant une attaque.', correct: true, explanation: 'C’est une atteinte à la disponibilité.' }
      ],
      explanation: 'Les trois affirmations décrivent bien un pilier de la sécurité de l’information.',
      visual: '🔺',
      certification: false
    },
    {
      id: 'web-cia-matching',
      theme: 'web',
      subtheme: 'bases',
      difficulty: 'facile',
      prompt: 'Reliez chaque exemple au pilier de la sécurité de l’information le plus concerné.',
      type: 'matching',
      pairs: [
        { leftId: 'conf', left: 'Un fichier confidentiel est consulté par une personne non autorisée', rightId: 'confidentialite', right: 'Confidentialité' },
        { leftId: 'integ', left: 'Une facture est modifiée sans autorisation', rightId: 'integrite', right: 'Intégrité' },
        { leftId: 'dispo', left: 'Un service est indisponible pendant une attaque', rightId: 'disponibilite', right: 'Disponibilité' }
      ],
      visual: '🔺',
      certification: false
    },
    {
      id: 'web-url-subdomain',
      theme: 'web',
      subtheme: 'navigation',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'Dans l’adresse https://login.microsoft.com.security-check.example.net, quel est le domaine réellement contrôlé par le titulaire principal ?',
      options: [
        { id: 'a', label: 'microsoft.com' },
        { id: 'b', label: 'example.net' },
        { id: 'c', label: 'login.microsoft.com' },
        { id: 'd', label: 'https' }
      ],
      correct: 'b',
      explanation: 'Le domaine principal est juste avant l’extension effective : example.net, avec le sous-domaine security-check. Les mots placés avant (login.microsoft.com.security-check) peuvent être choisis pour tromper l’utilisateur en imitant un site de confiance.',
      visual: '🔗',
      certification: true
    },
    {
      id: 'web-cert-limits',
      theme: 'web',
      subtheme: 'certificat',
      difficulty: 'moyen',
      type: 'multiple',
      prompt: 'Que peut-on raisonnablement déduire d’un certificat HTTPS valide ?',
      options: [
        { id: 'a', label: 'La connexion avec ce site est chiffrée.' },
        { id: 'b', label: 'Le certificat a été émis par une autorité de certification reconnue par le navigateur.' },
        { id: 'c', label: 'Le site est forcément honnête.' },
        { id: 'd', label: 'Le domaine affiché doit tout de même être vérifié.' }
      ],
      correct: ['a', 'b', 'd'],
      explanation: 'HTTPS protège le transport et s’appuie sur une autorité de certification, mais un fraudeur peut aussi obtenir un certificat pour son propre domaine.',
      visual: '📜',
      certification: true
    },
    {
      id: 'web-cookie-types',
      theme: 'web',
      subtheme: 'cookies',
      difficulty: 'facile',
      type: 'matching',
      prompt: 'Reliez chaque type de cookie à son usage typique.',
      pairs: [
        { leftId: 'session', left: 'Cookie de session', rightId: 'login', right: 'Maintenir une connexion pendant la visite' },
        { leftId: 'pref', left: 'Cookie de préférence', rightId: 'settings', right: 'Mémoriser une langue ou un choix d’affichage' },
        { leftId: 'ad', left: 'Cookie publicitaire', rightId: 'tracking', right: 'Contribuer au suivi ou au ciblage publicitaire' }
      ],
      explanation: 'Les cookies ont des usages variés: certains sont nécessaires au fonctionnement, d’autres relèvent du confort ou du suivi.',
      visual: '🍪',
      certification: false
    },
    {
      id: 'phishing-vishing',
      theme: 'phishing',
      subtheme: 'vishing',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Un appel prétend venir du support informatique et vous demande votre code MFA. De quel type d’attaque s’agit-il principalement ?',
      options: [
        { id: 'a', label: 'Vishing' },
        { id: 'b', label: 'Sauvegarde hors ligne' },
        { id: 'c', label: 'Chiffrement du disque' },
        { id: 'd', label: 'Mise à jour corrective' }
      ],
      correct: 'a',
      explanation: 'Le vishing est une forme d’ingénierie sociale par téléphone. Un support légitime ne doit pas demander un code MFA.',
      visual: '☎️',
      certification: true,
      scenario: true
    },
    {
      id: 'phishing-email-alerts',
      theme: 'phishing',
      subtheme: 'email',
      difficulty: 'facile',
      type: 'multiple',
      prompt: 'Quels éléments doivent vous alerter dans un email de sécurité de compte ?',
      options: [
        { id: 'a', label: 'Une menace de suppression dans quelques minutes.' },
        { id: 'b', label: 'Un lien dont le domaine ne correspond pas au service officiel.' },
        { id: 'c', label: 'Une demande de mot de passe ou de code.' },
        { id: 'd', label: 'La présence d’une formule de politesse.' }
      ],
      correct: ['a', 'b', 'c'],
      explanation: 'L’urgence, le domaine incohérent et la demande de secret sont des signaux forts. La politesse ne prouve ni fraude ni légitimité.',
      visual: '🚨',
      certification: true,
      scenario: true
    },
    {
      id: 'phishing-iban-order',
      theme: 'phishing',
      subtheme: 'fraude',
      difficulty: 'moyen',
      type: 'order',
      prompt: 'Remettez dans l’ordre une réaction prudente à un changement d’IBAN reçu par email.',
      items: [
        ['hold', 'Suspendre le paiement ou la modification automatique'],
        ['verify', 'Vérifier par un canal connu et indépendant'],
        ['record', 'Conserver l’email et les informations utiles'],
        ['apply', 'Appliquer le changement seulement après validation interne']
      ],
      correctOrder: ['hold', 'verify', 'record', 'apply'],
      explanation: 'On évite d’abord le paiement risqué, puis on vérifie et on documente. La modification ne vient qu’après validation conforme à la procédure.',
      visual: '🏦',
      certification: true,
      scenario: true
    },
    {
      id: 'phishing-qr-scenario',
      theme: 'phishing',
      subtheme: 'quishing',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'Un QR code collé sur une borne de paiement redirige vers une page demandant vos identifiants bancaires. Quel réflexe est le meilleur ?',
      options: [
        { id: 'a', label: 'Saisir les identifiants si la page affiche un cadenas.' },
        { id: 'b', label: 'Fermer la page et utiliser l’application ou le site officiel ouvert soi-même.' },
        { id: 'c', label: 'Scanner une deuxième fois pour confirmer.' },
        { id: 'd', label: 'Envoyer le QR code à tous ses contacts.' }
      ],
      correct: 'b',
      explanation: 'Un QR code masque l’adresse jusqu’au scan. Il faut privilégier un canal officiel et signaler l’anomalie si le contexte est professionnel ou public.',
      visual: '▦',
      certification: true,
      scenario: true
    },
    {
      id: 'phishing-faux-support',
      theme: 'phishing',
      subtheme: 'faux support',
      difficulty: 'moyen',
      type: 'multiple',
      prompt: 'Un faux support vous pousse à installer un outil de contrôle à distance. Quelles actions sont correctes ?',
      options: [
        { id: 'a', label: 'Refuser de communiquer le code de prise en main.' },
        { id: 'b', label: 'Vérifier l’identité via le canal officiel de support.' },
        { id: 'c', label: 'Installer l’outil pour gagner du temps.' },
        { id: 'd', label: 'Signaler la tentative.' }
      ],
      correct: ['a', 'b', 'd'],
      explanation: 'Le contrôle à distance donne un accès direct à l’appareil. Il doit être utilisé seulement dans un cadre vérifié et autorisé.',
      visual: '🖥️',
      certification: true,
      scenario: true
    },
    {
      id: 'password-passphrase',
      theme: 'passwords',
      subtheme: 'robustesse',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Quel exemple illustre le mieux une phrase de passe robuste pour un usage personnel ?',
      options: [
        { id: 'a', label: 'SoleilTableTrain!42 très longue et unique' },
        { id: 'b', label: 'Azerty123' },
        { id: 'c', label: 'Le prénom de son enfant' },
        { id: 'd', label: 'Le même mot de passe que sa messagerie' }
      ],
      correct: 'a',
      explanation: 'Une phrase longue, unique et difficile à deviner est préférable. Les informations personnelles et la réutilisation augmentent le risque.',
      visual: '🔑',
      certification: false
    },
    {
      id: 'password-mfa-prompt',
      theme: 'passwords',
      subtheme: 'mfa',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'Vous recevez une notification MFA alors que vous n’essayez pas de vous connecter. Que faire ?',
      options: [
        { id: 'a', label: 'Valider pour faire disparaître la notification.' },
        { id: 'b', label: 'Refuser, changer le mot de passe depuis un canal fiable et signaler.' },
        { id: 'c', label: 'Ignorer définitivement sans autre action.' },
        { id: 'd', label: 'Envoyer le code à un collègue.' }
      ],
      correct: 'b',
      explanation: 'Une demande MFA non initiée peut indiquer qu’un mot de passe est connu. Il faut refuser et sécuriser le compte.',
      visual: '📲',
      certification: true,
      scenario: true
    },
    {
      id: 'password-manager-roles',
      theme: 'passwords',
      subtheme: 'gestionnaire',
      difficulty: 'facile',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur un gestionnaire de mots de passe est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'Il peut générer des mots de passe uniques.', correct: true, explanation: 'C’est l’un de ses rôles principaux.' },
        { id: 's2', text: 'Il supprime le besoin d’un mot de passe maître robuste.', correct: false, explanation: 'Le mot de passe maître reste critique.' },
        { id: 's3', text: 'Il peut réduire la réutilisation des mots de passe.', correct: true, explanation: 'Il évite de devoir mémoriser chaque secret.' },
        { id: 's4', text: 'Il autorise à partager ses mots de passe par email.', correct: false, explanation: 'Le partage doit être encadré par des fonctions sûres ou évité.' }
      ],
      explanation: 'Un gestionnaire est utile, mais il doit lui-même être bien protégé.',
      visual: '🗄️',
      certification: true
    },
    {
      id: 'password-leak-order',
      theme: 'passwords',
      subtheme: 'fuite',
      difficulty: 'moyen',
      type: 'order',
      prompt: 'Après confirmation qu’un mot de passe réutilisé a fuité, classez les actions prioritaires.',
      items: [
        ['critical', 'Changer en priorité les comptes sensibles concernés'],
        ['unique', 'Remplacer par des mots de passe uniques'],
        ['mfa', 'Activer ou vérifier la MFA'],
        ['sessions', 'Fermer les sessions inconnues']
      ],
      correctOrder: ['critical', 'unique', 'mfa', 'sessions'],
      explanation: 'Les comptes sensibles doivent être protégés immédiatement. La MFA et la fermeture de sessions réduisent le maintien d’accès.',
      visual: '🧯',
      certification: false,
      scenario: true
    },
    {
      id: 'password-recovery-codes',
      theme: 'passwords',
      subtheme: 'mfa',
      difficulty: 'facile',
      type: 'single',
      prompt: 'À quoi servent les codes de récupération MFA ?',
      options: [
        { id: 'a', label: 'À récupérer l’accès si le second facteur principal est perdu.' },
        { id: 'b', label: 'À remplacer définitivement le mot de passe.' },
        { id: 'c', label: 'À être envoyés au support par chat.' },
        { id: 'd', label: 'À rendre le compte public.' }
      ],
      correct: 'a',
      explanation: 'Les codes de récupération sont des secours sensibles. Ils doivent être conservés dans un endroit sûr et ne jamais être communiqués.',
      visual: '🧾',
      certification: false
    },
    {
      id: 'devices-windows-version',
      theme: 'devices',
      subtheme: 'système',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Pourquoi connaître la version de Windows et l’architecture 32/64 bits peut-il être utile ?',
      options: [
        { id: 'a', label: 'Pour vérifier la compatibilité des logiciels et des correctifs.' },
        { id: 'b', label: 'Pour rendre l’appareil anonyme.' },
        { id: 'c', label: 'Pour désactiver automatiquement les malwares.' },
        { id: 'd', label: 'Pour remplacer la sauvegarde.' }
      ],
      correct: 'a',
      explanation: 'La version et l’architecture aident à installer les bons logiciels, pilotes et mises à jour de sécurité.',
      visual: '🪟',
      certification: true
    },
    {
      id: 'devices-lost-phone',
      theme: 'devices',
      subtheme: 'perte',
      difficulty: 'moyen',
      type: 'multiple',
      prompt: 'Vous perdez un téléphone professionnel. Quelles actions sont pertinentes ?',
      options: [
        { id: 'a', label: 'Prévenir rapidement le service compétent.' },
        { id: 'b', label: 'Déclencher localisation ou effacement à distance selon la procédure.' },
        { id: 'c', label: 'Attendre plusieurs jours pour voir s’il réapparaît.' },
        { id: 'd', label: 'Changer les accès exposés si nécessaire.' }
      ],
      correct: ['a', 'b', 'd'],
      explanation: 'Le signalement rapide permet de bloquer l’appareil, limiter l’accès aux données et évaluer l’impact.',
      visual: '📱',
      certification: true,
      scenario: true
    },
    {
      id: 'devices-mdm-limits',
      theme: 'devices',
      subtheme: 'mdm',
      difficulty: 'moyen',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur le MDM est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'Il peut imposer des règles de sécurité sur un téléphone professionnel.', correct: true, explanation: 'C’est un usage courant.' },
        { id: 's2', text: 'Il autorise automatiquement l’employeur à activer la caméra sans limite.', correct: false, explanation: 'Les usages doivent respecter le cadre légal et interne.' },
        { id: 's3', text: 'Il peut aider à effacer des données professionnelles à distance.', correct: true, explanation: 'C’est utile en cas de perte ou départ.' },
        { id: 's4', text: 'Il remplace totalement la vigilance de l’utilisateur.', correct: false, explanation: 'Les comportements restent déterminants.' }
      ],
      explanation: 'Le MDM est un outil d’administration et de protection, pas un passe-droit illimité.',
      visual: '📋',
      certification: true
    },
    {
      id: 'devices-usb-found',
      theme: 'devices',
      subtheme: 'usb',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Vous trouvez une clé USB sur le parking de l’entreprise. Quel réflexe est le plus sûr ?',
      options: [
        { id: 'a', label: 'La brancher pour identifier son propriétaire.' },
        { id: 'b', label: 'La remettre selon la procédure interne sans la connecter.' },
        { id: 'c', label: 'La formater sur votre poste.' },
        { id: 'd', label: 'Copier son contenu dans le cloud.' }
      ],
      correct: 'b',
      explanation: 'Une clé trouvée peut être piégée. Elle ne doit pas être branchée sur un poste de travail ordinaire.',
      visual: '💾',
      certification: true,
      scenario: true
    },
    {
      id: 'devices-lock-screen',
      theme: 'devices',
      subtheme: 'poste',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Pourquoi verrouiller son écran en quittant son poste ?',
      options: [
        { id: 'a', label: 'Pour empêcher un accès physique non autorisé pendant l’absence.' },
        { id: 'b', label: 'Pour chiffrer automatiquement Internet.' },
        { id: 'c', label: 'Pour supprimer les fichiers temporaires.' },
        { id: 'd', label: 'Pour désactiver les mises à jour.' }
      ],
      correct: 'a',
      explanation: 'Le verrouillage limite les actions possibles par une personne présente physiquement: lecture, envoi d’emails, copie de fichiers ou modification.',
      visual: '🔒',
      certification: false
    },
    {
      id: 'malware-ransomware-signs',
      theme: 'malware',
      subtheme: 'ransomware',
      difficulty: 'facile',
      type: 'multiple',
      prompt: 'Quels signes peuvent évoquer un rançongiciel ?',
      options: [
        { id: 'a', label: 'Des fichiers deviennent illisibles ou changent d’extension.' },
        { id: 'b', label: 'Un message demande une rançon.' },
        { id: 'c', label: 'Le fond d’écran ou des notes expliquent un chiffrement.' },
        { id: 'd', label: 'Le clavier est plus propre que d’habitude.' }
      ],
      correct: ['a', 'b', 'c'],
      explanation: 'Un ransomware cherche souvent à rendre les fichiers inaccessibles puis à exercer une pression. Il faut isoler et signaler rapidement.',
      visual: '🧨',
      certification: true,
      scenario: true
    },
    {
      id: 'malware-types-match',
      theme: 'malware',
      subtheme: 'familles',
      difficulty: 'facile',
      type: 'matching',
      prompt: 'Reliez chaque logiciel malveillant à son comportement principal.',
      pairs: [
        { leftId: 'keylogger', left: 'Keylogger', rightId: 'keys', right: 'Capture les frappes clavier' },
        { leftId: 'spyware', left: 'Spyware', rightId: 'spy', right: 'Espionne l’activité ou les données' },
        { leftId: 'worm', left: 'Ver', rightId: 'spread', right: 'Se propage souvent automatiquement' },
        { leftId: 'adware', left: 'Adware', rightId: 'ads', right: 'Affiche ou injecte de la publicité' }
      ],
      explanation: 'Les familles décrivent un comportement dominant; un malware réel peut combiner plusieurs fonctions.',
      visual: '🧬',
      certification: true
    },
    {
      id: 'malware-macro',
      theme: 'malware',
      subtheme: 'documents',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'Un document Office inattendu demande d’activer les macros pour afficher une facture. Que faire ?',
      options: [
        { id: 'a', label: 'Activer les macros pour lire le document.' },
        { id: 'b', label: 'Ne pas activer, vérifier le contexte et signaler si nécessaire.' },
        { id: 'c', label: 'Désactiver l’antivirus avant ouverture.' },
        { id: 'd', label: 'Renvoyer le fichier à toute l’équipe.' }
      ],
      correct: 'b',
      explanation: 'Les macros peuvent exécuter du code. Une demande inattendue d’activation est un signal d’alerte classique.',
      visual: '📄',
      certification: true,
      scenario: true
    },
    {
      id: 'malware-remote-tool',
      theme: 'malware',
      subtheme: 'prise en main',
      difficulty: 'moyen',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur les outils de prise en main à distance est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'Ils peuvent être légitimes dans un cadre support validé.', correct: true, explanation: 'Le contexte et l’autorisation font la différence.' },
        { id: 's2', text: 'Ils sont toujours malveillants.', correct: false, explanation: 'Ce sont des outils dual-use.' },
        { id: 's3', text: 'Un attaquant peut les détourner pour contrôler un poste.', correct: true, explanation: 'C’est une technique fréquente de faux support.' },
        { id: 's4', text: 'Communiquer le code de session ne présente aucun risque.', correct: false, explanation: 'Le code peut donner accès à l’appareil.' }
      ],
      explanation: 'Un outil légitime devient dangereux lorsqu’il est installé ou partagé avec une personne non vérifiée.',
      visual: '🕹️',
      certification: true,
      scenario: true
    },
    {
      id: 'malware-isolate-order',
      theme: 'malware',
      subtheme: 'incident',
      difficulty: 'moyen',
      type: 'order',
      prompt: 'Classez les premières actions raisonnables face à un poste fortement suspect.',
      items: [
        ['stop', 'Arrêter les manipulations non indispensables'],
        ['isolate', 'Isoler du réseau selon la consigne'],
        ['report', 'Prévenir le support ou l’équipe sécurité'],
        ['note', 'Noter l’heure et les symptômes observés']
      ],
      correctOrder: ['stop', 'isolate', 'report', 'note'],
      explanation: 'Il faut limiter la propagation, obtenir de l’aide et conserver des informations utiles. Les consignes internes peuvent préciser l’ordre exact.',
      visual: '🧯',
      certification: false,
      scenario: true
    },
    {
      id: 'data-personal-sensitive',
      theme: 'data',
      subtheme: 'rgpd',
      difficulty: 'facile',
      type: 'matching',
      prompt: 'Reliez chaque exemple à la catégorie RGPD la plus adaptée.',
      pairs: [
        { leftId: 'email', left: 'Adresse email nominative', rightId: 'personal', right: 'Donnée personnelle' },
        { leftId: 'health', left: 'Diagnostic médical', rightId: 'sensitive', right: 'Donnée sensible' },
        { leftId: 'anon', left: 'Statistique réellement anonymisée', rightId: 'notpersonal', right: 'Pas une donnée personnelle si la réidentification est empêchée' },
        { leftId: 'photo', left: 'Photo reconnaissable', rightId: 'image', right: 'Donnée personnelle' }
      ],
      explanation: 'Une donnée est personnelle dès qu’elle permet d’identifier directement ou indirectement une personne.',
      visual: '🪪',
      certification: true
    },
    {
      id: 'data-minimisation-form',
      theme: 'data',
      subtheme: 'minimisation',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Un formulaire pour recevoir une brochure demande le numéro national et la situation médicale. Quel principe est le plus en cause ?',
      options: [
        { id: 'a', label: 'Minimisation des données' },
        { id: 'b', label: 'Disponibilité du service' },
        { id: 'c', label: 'Typosquatting' },
        { id: 'd', label: 'Authentification forte' }
      ],
      correct: 'a',
      explanation: 'Les données demandées doivent être nécessaires à la finalité. Ici, ces informations semblent excessives pour l’envoi d’une brochure.',
      visual: '📋',
      certification: true
    },
    {
      id: 'data-ai-redaction',
      theme: 'data',
      subtheme: 'ia',
      difficulty: 'moyen',
      type: 'multiple',
      prompt: 'Avant de coller une réclamation client dans un outil d’IA, quelles précautions sont pertinentes ?',
      options: [
        { id: 'a', label: 'Supprimer les noms, emails et numéros de commande inutiles.' },
        { id: 'b', label: 'Utiliser uniquement un outil autorisé par l’organisation.' },
        { id: 'c', label: 'Copier les identifiants pour que l’IA comprenne mieux.' },
        { id: 'd', label: 'Relire humainement la réponse générée.' }
      ],
      correct: ['a', 'b', 'd'],
      explanation: 'La minimisation, l’outil autorisé et la vérification humaine réduisent le risque de fuite ou d’erreur.',
      visual: '🤖',
      certification: true,
      scenario: true
    },
    {
      id: 'data-breach-order',
      theme: 'data',
      subtheme: 'violation',
      difficulty: 'moyen',
      type: 'order',
      prompt: 'Classez les actions après découverte d’un fichier client public sur Internet.',
      items: [
        ['limit', 'Limiter l’exposition sans détruire les traces'],
        ['inform', 'Prévenir les responsables internes compétents'],
        ['assess', 'Évaluer les données, personnes et risques concernés'],
        ['document', 'Documenter les décisions et notifications éventuelles']
      ],
      correctOrder: ['limit', 'inform', 'assess', 'document'],
      explanation: 'La limitation immédiate réduit le risque, puis l’organisation évalue et documente l’incident pour décider des suites.',
      visual: '📣',
      certification: true,
      scenario: true
    },
    {
      id: 'data-right-erasure',
      theme: 'data',
      subtheme: 'droits',
      difficulty: 'moyen',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur le droit à l’effacement est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'Il peut s’appliquer dans certains cas.', correct: true, explanation: 'Le RGPD prévoit ce droit.' },
        { id: 's2', text: 'Il impose toujours tout effacer immédiatement.', correct: false, explanation: 'Des obligations légales ou intérêts légitimes peuvent limiter ce droit.' },
        { id: 's3', text: 'L’organisation doit répondre et expliquer sa décision.', correct: true, explanation: 'Une réponse claire est attendue.' },
        { id: 's4', text: 'Il ne concerne jamais les données numériques.', correct: false, explanation: 'Il concerne bien les traitements de données personnelles.' }
      ],
      explanation: 'Les droits des personnes sont importants mais doivent être analysés selon le contexte.',
      visual: '🧽',
      certification: false
    },
    {
      id: 'data-work-cloud-personal-file',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'Un manager voit dans le cloud de l’entreprise un dossier clairement nommé “Personnel” appartenant à un travailleur. Peut-il l’ouvrir librement parce que l’espace cloud appartient à l’entreprise ?',
      options: [
        { id: 'a', label: 'Oui, tout ce qui est dans le cloud de l’entreprise peut être lu librement.' },
        { id: 'b', label: 'Non, il faut une finalité légitime, une nécessité réelle, une information préalable et une procédure proportionnée.' },
        { id: 'c', label: 'Oui, mais uniquement si le fichier est récent.' },
        { id: 'd', label: 'Non, un fichier personnel est toujours totalement inaccessible, même en cas d’incident grave.' }
      ],
      correct: 'b',
      explanation: 'La propriété de l’outil ne donne pas un droit illimité de lecture. Un contrôle doit être justifié, proportionné, annoncé et encadré. Un contenu clairement personnel doit être protégé autant que possible, sauf situation exceptionnelle et procédure adaptée.',
      visual: '☁️',
      certification: true,
      scenario: true
    },
    {
      id: 'data-work-monitoring-principles',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'multiple',
      prompt: 'Quels principes doivent encadrer une surveillance des outils professionnels par l’employeur ?',
      options: [
        { id: 'a', label: 'Une finalité précise et légitime.' },
        { id: 'b', label: 'Une surveillance proportionnée au risque ou à l’objectif.' },
        { id: 'c', label: 'Une information claire et préalable des travailleurs.' },
        { id: 'd', label: 'La possibilité de tout surveiller sans limite parce que l’employeur paie les outils.' }
      ],
      correct: ['a', 'b', 'c'],
      explanation: 'Le contrôle au travail doit respecter les principes RGPD: finalité, proportionnalité, transparence, minimisation et sécurité. Le fait que l’outil soit professionnel ne supprime pas toute vie privée.',
      visual: '📋',
      certification: true
    },
    {
      id: 'data-work-email-control',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur la messagerie professionnelle est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'L’employeur peut prévoir des règles d’usage de la messagerie professionnelle.', correct: true, explanation: 'Une politique ICT ou un règlement peut encadrer l’usage de la messagerie.' },
        { id: 's2', text: 'L’employeur peut lire tous les emails personnels par curiosité ou confort managérial.', correct: false, explanation: 'Un accès au contenu doit être justifié, proportionné et encadré.' },
        { id: 's3', text: 'Une boîte fonctionnelle ou partagée peut réduire la dépendance à la boîte individuelle d’un travailleur absent.', correct: true, explanation: 'C’est une bonne pratique de continuité qui limite les accès intrusifs.' },
        { id: 's4', text: 'Le travailleur ne garde aucune vie privée dès qu’il utilise une adresse professionnelle.', correct: false, explanation: 'La vie privée ne disparaît pas au travail.' }
      ],
      explanation: 'La messagerie professionnelle peut être encadrée, mais le contenu personnel ou individualisé reste sensible. Les règles doivent être connues et les accès limités.',
      visual: '✉️',
      certification: true,
      scenario: true
    },
    {
      id: 'data-work-geolocation',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'multiple',
      prompt: 'Une entreprise équipe ses véhicules professionnels d’un système de géolocalisation. Quelles précautions sont pertinentes ?',
      options: [
        { id: 'a', label: 'Informer clairement les travailleurs sur l’objectif, les données collectées et la durée de conservation.' },
        { id: 'b', label: 'Limiter la géolocalisation à des finalités légitimes, comme sécurité, organisation des tournées ou protection du véhicule.' },
        { id: 'c', label: 'Prévoir une désactivation ou une protection hors temps de travail si le véhicule peut être utilisé à titre privé.' },
        { id: 'd', label: 'Suivre en permanence tous les déplacements privés sans information, car le véhicule appartient à l’entreprise.' }
      ],
      correct: ['a', 'b', 'c'],
      explanation: 'La géolocalisation est très intrusive. Elle doit être justifiée, proportionnée, transparente et limitée. Un suivi permanent de la vie privée serait disproportionné.',
      visual: '📍',
      certification: true,
      scenario: true
    },
    {
      id: 'data-work-telework-surveillance',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'En télétravail, une entreprise veut activer en continu la webcam et prendre des captures d’écran automatiques toutes les minutes. Quelle analyse est la plus correcte ?',
      options: [
        { id: 'a', label: 'C’est automatiquement autorisé car le travail est payé.' },
        { id: 'b', label: 'C’est très intrusif et doit être évité sauf justification exceptionnelle, information claire et proportionnalité stricte.' },
        { id: 'c', label: 'C’est autorisé si les images ne sont pas jolies.' },
        { id: 'd', label: 'C’est obligatoire pour tout télétravail.' }
      ],
      correct: 'b',
      explanation: 'Le télétravail ne transforme pas le domicile en espace de surveillance permanente. Les contrôles doivent rester nécessaires, proportionnés et transparents, avec des alternatives moins intrusives quand elles existent.',
      visual: '🏠',
      certification: true,
      scenario: true
    },
    {
      id: 'data-work-gsm-mdm',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur un GSM professionnel est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'L’entreprise peut appliquer certaines règles de sécurité sur un GSM professionnel.', correct: true, explanation: 'Par exemple via MDM, code de verrouillage, applications autorisées ou effacement professionnel à distance.' },
        { id: 's2', text: 'L’entreprise peut lire sans limite toutes les conversations privées présentes sur le téléphone.', correct: false, explanation: 'Les communications privées restent protégées; tout contrôle doit être justifié et proportionné.' },
        { id: 's3', text: 'Les règles d’usage personnel doivent être clarifiées autant que possible.', correct: true, explanation: 'L’ambiguïté augmente les conflits et les risques.' },
        { id: 's4', text: 'Un téléphone professionnel ne peut jamais contenir de donnée personnelle.', correct: false, explanation: 'Il peut contenir des données de travailleurs, contacts, clients ou traces d’usage.' }
      ],
      explanation: 'Un GSM professionnel reste un outil de travail administrable, mais les données personnelles et privées doivent être traitées avec prudence.',
      visual: '📱',
      certification: true,
      scenario: true
    },
    {
      id: 'data-work-control-order',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'order',
      prompt: 'Classez les étapes raisonnables avant de mettre en place un contrôle des usages Internet au travail.',
      items: [
        ['purpose', 'Définir la finalité précise du contrôle'],
        ['necessity', 'Vérifier la nécessité et chercher une solution moins intrusive'],
        ['inform', 'Informer clairement les travailleurs et documenter les règles'],
        ['limit', 'Limiter les accès, la durée de conservation et l’individualisation']
      ],
      correctOrder: ['purpose', 'necessity', 'inform', 'limit'],
      explanation: 'Le contrôle doit partir d’un objectif légitime, puis être limité à ce qui est nécessaire. L’information préalable et les limites techniques/organisationnelles sont essentielles.',
      visual: '🪜',
      certification: true
    },
    {
      id: 'data-work-employee-good-practice',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'facile',
      type: 'multiple',
      prompt: 'Comme travailleur, quels réflexes limitent les problèmes de vie privée dans les outils professionnels ?',
      options: [
        { id: 'a', label: 'Éviter de stocker des documents privés sensibles dans le cloud de l’entreprise.' },
        { id: 'b', label: 'Lire la politique ICT ou les règles internes.' },
        { id: 'c', label: 'Séparer autant que possible fichiers personnels et professionnels.' },
        { id: 'd', label: 'Mettre ses documents médicaux dans un dossier partagé avec toute l’équipe.' }
      ],
      correct: ['a', 'b', 'c'],
      explanation: 'Le travailleur garde une vie privée, mais il doit aussi éviter les mélanges risqués. Les outils professionnels sont administrés, sauvegardés et parfois contrôlés selon des règles.',
      visual: '🧭',
      certification: false,
      scenario: true
    },
    {
      id: 'data-work-personal-folder-trap',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'moyen',
      type: 'single',
      prompt: 'Quelle phrase résume le mieux la situation d’un fichier personnel stocké dans un outil professionnel ?',
      options: [
        { id: 'a', label: 'Il est toujours totalement privé et l’entreprise ne peut jamais intervenir.' },
        { id: 'b', label: 'Il est toujours public pour l’employeur.' },
        { id: 'c', label: 'Il reste protégé, mais l’entreprise peut devoir intervenir dans certains cas justifiés et encadrés.' },
        { id: 'd', label: 'Il cesse d’être une donnée personnelle.' }
      ],
      correct: 'c',
      explanation: 'C’est la nuance importante: l’outil professionnel ne supprime pas toute vie privée, mais il n’offre pas non plus une confidentialité absolue dans toutes les situations.',
      visual: '⚖️',
      certification: true
    },
    {
      id: 'data-work-logs',
      theme: 'data',
      subtheme: 'rgpd-travail',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Pourquoi les journaux de connexion ou historiques d’accès d’un outil professionnel sont-ils concernés par le RGPD ?',
      options: [
        { id: 'a', label: 'Parce qu’ils peuvent permettre d’identifier un travailleur et son activité.' },
        { id: 'b', label: 'Parce qu’ils ne contiennent jamais aucune information.' },
        { id: 'c', label: 'Parce qu’ils remplacent une sauvegarde.' },
        { id: 'd', label: 'Parce qu’ils sont toujours anonymes.' }
      ],
      correct: 'a',
      explanation: 'Un log qui indique quel compte a accédé à quel service, à quelle heure ou depuis quel appareil peut être une donnée personnelle.',
      visual: '📊',
      certification: false
    },
    {
      id: 'network-vpn-limits',
      theme: 'network',
      subtheme: 'vpn',
      difficulty: 'facile',
      type: 'multiple',
      prompt: 'Quelles affirmations sur un VPN d’entreprise sont correctes ?',
      options: [
        { id: 'a', label: 'Il peut sécuriser l’accès à des ressources internes.' },
        { id: 'b', label: 'Il remplace les mots de passe et la MFA.' },
        { id: 'c', label: 'Il peut chiffrer le tunnel entre l’appareil et l’organisation.' },
        { id: 'd', label: 'Il n’empêche pas de cliquer sur un phishing.' }
      ],
      correct: ['a', 'c', 'd'],
      explanation: 'Le VPN protège l’accès réseau, mais il ne corrige pas les mauvais réflexes ni les comptes faibles.',
      visual: '🛡️',
      certification: true
    },
    {
      id: 'network-proxy-firewall-match',
      theme: 'network',
      subtheme: 'outils',
      difficulty: 'facile',
      type: 'matching',
      prompt: 'Reliez chaque outil à son rôle principal.',
      pairs: [
        { leftId: 'vpn', left: 'VPN', rightId: 'tunnel', right: 'Crée un tunnel protégé vers un réseau ou service' },
        { leftId: 'proxy', left: 'Proxy', rightId: 'intermediary', right: 'Sert d’intermédiaire pour des requêtes' },
        { leftId: 'fw', left: 'Pare-feu', rightId: 'filter', right: 'Filtre des flux selon des règles' },
        { leftId: 'av', left: 'Antivirus', rightId: 'detect', right: 'Aide à détecter ou bloquer des programmes malveillants' }
      ],
      explanation: 'Ces outils sont complémentaires et ne protègent pas les mêmes couches.',
      visual: '🧭',
      certification: true
    },
    {
      id: 'network-backup-321-fill',
      theme: 'network',
      subtheme: 'sauvegarde',
      difficulty: 'facile',
      type: 'fill',
      prompt: 'Complétez la règle de sauvegarde 3-2-1.',
      template: 'Conserver {{copies}} copies, sur {{supports}} types de supports, avec {{outside}} copie hors site ou hors ligne.',
      blanks: [
        { id: 'copies', correct: '3', choices: ['1', '2', '3', '10'], shuffleChoices: false },
        { id: 'supports', correct: '2', choices: ['1', '2', '5', 'aucun'], shuffleChoices: false },
        { id: 'outside', correct: '1', choices: ['0', '1', '4', 'toutes les'], shuffleChoices: false }
      ],
      explanation: 'La règle 3-2-1 réduit le risque qu’un seul incident détruise toutes les copies.',
      visual: '💽',
      certification: true
    },
    {
      id: 'network-cert-role',
      theme: 'network',
      subtheme: 'cert',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Quel est un rôle typique d’un CERT ou CSIRT ?',
      options: [
        { id: 'a', label: 'Aider à traiter les incidents et diffuser des alertes.' },
        { id: 'b', label: 'Garantir que personne ne fera jamais d’erreur.' },
        { id: 'c', label: 'Vendre obligatoirement des assurances.' },
        { id: 'd', label: 'Remplacer tous les utilisateurs.' }
      ],
      correct: 'a',
      explanation: 'Un CERT coordonne l’assistance, l’analyse, la prévention et le partage d’informations sur les incidents et vulnérabilités.',
      visual: '📡',
      certification: true
    },
    {
      id: 'network-iso27001',
      theme: 'network',
      subtheme: 'iso',
      difficulty: 'moyen',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque affirmation sur ISO 27001 est vraie ou fausse.',
      statements: [
        { id: 's1', text: 'La norme concerne un système de management de la sécurité de l’information.', correct: true, explanation: 'C’est son objectif central.' },
        { id: 's2', text: 'Une certification signifie qu’aucun incident ne peut arriver.', correct: false, explanation: 'Elle montre une démarche structurée, pas une invulnérabilité.' },
        { id: 's3', text: 'La gestion des risques est importante dans cette approche.', correct: true, explanation: 'L’analyse et le traitement des risques sont essentiels.' },
        { id: 's4', text: 'Elle supprime le besoin d’amélioration continue.', correct: false, explanation: 'L’amélioration continue fait partie de la logique.' }
      ],
      explanation: 'ISO 27001 aide à organiser la sécurité, les responsabilités, les audits et l’amélioration.',
      visual: '🏛️',
      certification: true
    },
    {
      id: 'osint-private-window',
      theme: 'osint',
      subtheme: 'audit personnel',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Pourquoi réaliser un audit OSINT personnel dans un navigateur non connecté ?',
      options: [
        { id: 'a', label: 'Pour voir plus facilement ce qu’un visiteur extérieur pourrait trouver.' },
        { id: 'b', label: 'Pour supprimer automatiquement les informations publiées.' },
        { id: 'c', label: 'Pour devenir invisible aux sites.' },
        { id: 'd', label: 'Pour contourner les droits des autres personnes.' }
      ],
      correct: 'a',
      explanation: 'Un navigateur non connecté donne une vision moins personnalisée. Il ne rend pas anonyme et ne supprime rien en ligne.',
      visual: '🔎',
      certification: false
    },
    {
      id: 'osint-photo-risks',
      theme: 'osint',
      subtheme: 'photos',
      difficulty: 'facile',
      type: 'multiple',
      prompt: 'Quels éléments visibles sur une photo publique peuvent créer un risque ?',
      options: [
        { id: 'a', label: 'Un badge professionnel lisible.' },
        { id: 'b', label: 'Un document confidentiel à l’arrière-plan.' },
        { id: 'c', label: 'Une plaque ou un lieu identifiable.' },
        { id: 'd', label: 'Le fait que la photo soit lumineuse.' }
      ],
      correct: ['a', 'b', 'c'],
      explanation: 'Les détails visuels peuvent révéler identité, employeur, localisation ou informations confidentielles.',
      visual: '🖼️',
      certification: true,
      scenario: true
    },
    {
      id: 'osint-reputation-order',
      theme: 'osint',
      subtheme: 'e-réputation',
      difficulty: 'moyen',
      type: 'order',
      prompt: 'Classez une démarche simple pour réduire son exposition publique.',
      items: [
        ['search', 'Rechercher son nom, email et pseudos'],
        ['review', 'Identifier les contenus inutiles ou trop exposés'],
        ['settings', 'Ajuster confidentialité ou demander suppression'],
        ['monitor', 'Recontrôler périodiquement']
      ],
      correctOrder: ['search', 'review', 'settings', 'monitor'],
      explanation: 'On commence par constater, puis on corrige et on maintient une veille raisonnable.',
      visual: '🧹',
      certification: false
    },
    {
      id: 'osint-social-settings',
      theme: 'osint',
      subtheme: 'réseaux sociaux',
      difficulty: 'facile',
      type: 'tf-grid',
      prompt: 'Indiquez si chaque réglage de réseau social peut aider à limiter un risque.',
      statements: [
        { id: 's1', text: 'Limiter la visibilité des anciennes publications.', correct: true, explanation: 'Cela réduit l’exposition de contenus passés.' },
        { id: 's2', text: 'Activer les alertes de connexion.', correct: true, explanation: 'Cela aide à détecter un accès inhabituel.' },
        { id: 's3', text: 'Rendre publique sa liste d’amis sans besoin.', correct: false, explanation: 'Cela peut aider au ciblage social.' },
        { id: 's4', text: 'Bloquer un compte usurpateur ou malveillant.', correct: true, explanation: 'Le blocage peut limiter interactions et visibilité.' }
      ],
      explanation: 'Les paramètres doivent être revus régulièrement, surtout sur les anciens comptes.',
      visual: '👥',
      certification: true
    },
    {
      id: 'osint-ethics',
      theme: 'osint',
      subtheme: 'éthique',
      difficulty: 'facile',
      type: 'single',
      prompt: 'Dans un exercice de sensibilisation OSINT, quelle limite est la plus importante ?',
      options: [
        { id: 'a', label: 'Travailler sur ses propres traces ou sur des exemples autorisés.' },
        { id: 'b', label: 'Rechercher la vie privée d’un autre stagiaire.' },
        { id: 'c', label: 'Publier les résultats individuels du groupe.' },
        { id: 'd', label: 'Contourner les paramètres privés.' }
      ],
      correct: 'a',
      explanation: 'L’objectif est la prise de conscience, pas l’intrusion dans la vie privée d’autrui.',
      visual: '⚖️',
      certification: false
    }
  ];

  const existingIds = new Set(DATA.questions.map(q => q.id));
  DATA.questions.push(...extraQuestions.filter(q => !existingIds.has(q.id)));
})();
