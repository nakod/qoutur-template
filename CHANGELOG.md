# Changelog

Toutes les modifications notables de ce projet sont consignées dans ce fichier.

Le format s'inspire de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le projet suit le [versionnage sémantique](https://semver.org/lang/fr/).

## [Non publié]

Évolutions et correctifs identifiés, pas encore implémentés.

### À implémenter

- **Back-office d'administration** (`admin/`, aujourd'hui vide en dehors de la maquette).
  Le design de référence est `admin/Qoutur Admin Export.html` — une maquette interactive
  autonome (page « bundled », assets encodés en base64), à traduire en pages HTML/CSS/JS
  suivant les conventions du site. Six vues :
  - **Dashboard** — indicateurs clés (ateliers actifs, commandes du mois, volume / GMV),
    activité récente et raccourcis vers les actions en attente.
  - **Ateliers** — liste filtrable (Tous / Actifs / En attente / Suspendus), avec validation
    des inscriptions, et une vue **Détail atelier**.
  - **Commandes** — liste filtrable par statut de règlement (Tous / Impayé / Partiel / Payé).
  - **Clients** — annuaire des clients finaux.
  - **Finances** — transactions (dont les frais de plateforme de 100 FCFA par commande),
    demandes de retrait avec leur statut (en attente, rejetée) et leur opérateur Mobile Money,
    solde total détenu par les tailleurs et frais en attente de régularisation.
  - **Support** — fils de discussion avec les tailleurs, avec compteur de messages non lus.

### À corriger

- **Sélecteur de langue** (toutes les pages) : remplacer le menu déroulant FR/EN de l'en-tête
  par un simple lien vers l'autre langue — sur une page en français, on affiche « EN »
  cliquable, et inversement. Modèle : <https://emploi.cnrs.fr/default.aspx?lang=FR>.
  Un clic au lieu de deux, et l'action est visible sans ouvrir de menu.
- **En-tête** : remplacer le libellé texte « Contact » par une icône.
- **`contactez-nous.html`** : l'en-tête ne doit plus porter la navigation complète, mais un
  unique bouton « Accueil », comme sur `mentions-legales.html` et les autres pages légales.
  Ajouter également le numéro de téléphone et le pays dans les coordonnées.
- **Pied de page** (toutes les pages) : revoir la présentation en s'inspirant de la maquette
  `images/qoutur-bottom.png`.

## [1.1.0] — 2026-07-14

Première évolution du template : mise en place des sources de contenu de référence,
correction de la page de paiement et documentation du projet.

### Ajouté

- `README.md` : documentation du template (structure, stack, charte graphique, i18n, démarrage local).
- `CHANGELOG.md` : ce fichier.
- `docs/references/` : sources de contenu de référence, bilingues FR/EN, qui font foi pour
  le contenu des sections du site.
  - `features_fr-en.json` — 6 fonctionnalités, toutes actives.
  - `faq-fr-en.json` — 15 questions, dont 12 actives. Les entrées `"active": false`
    (multi-employés, choix du livreur, zones de livraison) restent à arbitrer et ne sont
    pas affichées sur le site.
- `docs/screenshots/` : captures de l'Espace Tailleur et maquettes des popups
  (client, tailleur, paiement).
- `imagelogo/` : nouveau jeu de logos (horizontal, vertical, versions blanches) et de
  favicons. Pas encore référencé par les pages, qui continuent d'utiliser `images/`.

### Modifié

- **Changement de modèle tarifaire** (`index.html`, section « Tarifs ») : l'abonnement annuel
  unique de 10 000 FCFA / an (soit moins de 850 FCFA par mois) est remplacé par un
  **paiement à la commande de 100 FCFA**. Ni abonnement, ni frais fixes : sans commande,
  le tailleur ne paie rien. Libellés mis à jour en FR et EN ; README aligné.
  La mention de réassurance sous le bouton passe de « Sans engagement · Annulable à tout
  moment » à « Inscription gratuite · Aucune carte bancaire requise » : l'absence
  d'abonnement était déjà dite trois fois sur la carte, et « sans engagement » n'a plus
  d'objet dès lors qu'il n'y a plus de contrat à résilier.
- Liste des fonctionnalités de la section « Tarifs » (`index.html`), révisée d'après les
  captures de l'Espace Tailleur (`docs/screenshots/`) :
  - « Prise de mesures digitale (30 mesures) » → « Prise de mesures guidée, haut et bas
    du corps ». Le chiffre est retiré : l'application en compte aujourd'hui 38, et ce
    nombre est susceptible d'évoluer.
  - « Paiement Mobile Money » → « Paiement Mobile Money & retrait de vos fonds »
    (le Portefeuille permet le retrait vers le Mobile Money du tailleur).
  - « Rappels automatiques aux clients » → **supprimé**. Aucun écran ne confirme l'envoi
    d'un rappel au client final ; la promesse n'était pas tenue.
  - Ajout de « Comptes pour votre équipe » (module « Mon équipe »).
  - « Clients & fiches illimités » → « Clients & commandes illimités ».
- `paiement.html` : la mention « Transaction chiffrée et sécurisée » est désormais centrée
  sur toute la largeur de la carte. Elle était centrée à l'intérieur de la colonne du
  formulaire (`col-lg-7`), et apparaissait donc décalée vers la gauche sur grand écran.

### Corrigé

- `docs/references/features_fr-en.json` : virgule manquante après la description française de
  la fonctionnalité « Paiement Mobile Money ». Le fichier était un JSON invalide et ne
  pouvait pas être parsé.

### Notes

Les sections « Fonctionnalités » et « FAQ » d'`index.html` reprennent le contenu de
`docs/references/*.json`, mais les données sont **recopiées en dur** dans un tableau JavaScript :
les fichiers JSON ne sont pas chargés à l'exécution. Toute modification d'un JSON doit donc
être reportée manuellement dans `index.html` (et inversement). Les deux sources sont
synchronisées à ce jour.

### À venir

- Connexion des formulaires (inscription, contact, mesures, paiement) à un back-end.
- Espace d'administration dans `admin/`, actuellement vide.
- Intégration réelle des API Mobile Money.
- Bascule des favicons des 7 pages vers `imagelogo/favicon/`.
- Refonte de `contactez-nous.html` d'après la maquette `contact-template` (non fournie à ce jour).

## [1.0.0] — 2026-07-11

Version initiale du template : le site vitrine statique complet, en français et en anglais.

### Ajouté

- **Page d'accueil** (`index.html`) avec navbar collante, hero, section fonctionnalités,
  « Comment ça marche » en 3 étapes, tarifs, FAQ et appel à l'inscription.
- **Offre Atelier** : abonnement annuel unique (moins de 850 FCFA par mois), sans engagement,
  clients illimités, 30 mesures, suivi des commandes, rappels automatiques.
- **Page de prise de mesures** (`mesures.html`) : formulaire des 30 mesures en centimètres.
- **Page de paiement** (`paiement.html`) : choix de l'opérateur Mobile Money
  (MTN Mobile Money, Moov Money, Celtis Money annoncé « Bientôt »), saisie du numéro,
  récapitulatif de commande et total.
- **Page de contact** (`contactez-nous.html`).
- **Pages légales** : mentions légales, termes et conditions, politique de confidentialité.
- **Internationalisation FR/EN** (`js/main.js`) : traduction par attributs `data-fr` / `data-en`,
  placeholders via `data-ph-fr` / `data-ph-en`, langue mémorisée dans `localStorage`
  (clé `qoutur_lang`), API `window.qSetLang()` / `window.qGetLang()` et événement `qlangchange`
  pour les composants dynamiques.
- **Navigation** : ombre de navbar au défilement, défilement fluide des ancres et fermeture
  automatique du menu mobile.
- **Charte graphique** (`css/style.css`) : palette de marque en variables CSS
  (navy `#0D2845`, or `#EACE81`, bronze `#B38842`, crème `#F1ECE2`, beige `#D9D0BF`),
  rayons et ombres partagés, typographie Montserrat.
- **Ressources** (`images/`) : logos Qoutur (horizontal, vertical, blanc, icône), jeu complet
  de favicons et visuels des opérateurs Mobile Money.
- Bootstrap 5.3.3 et Bootstrap Icons 1.11.3 chargés depuis le CDN jsDelivr.

[Non publié]: https://github.com/
[1.1.0]: https://github.com/
[1.0.0]: https://github.com/
