# Qoutur — Template du site vitrine

Site vitrine statique de **Qoutur**, la plateforme qui digitalise le métier de tailleur :
fiches clients, prise de mesures, suivi des commandes et encaissement par Mobile Money.

Ce dépôt contient uniquement le **template front-end** (HTML/CSS/JS statique). Il n'y a
ni back-end, ni base de données, ni build : les pages s'ouvrent telles quelles dans un
navigateur. Les formulaires (inscription, contact, mesures, paiement) sont des maquettes
d'interface et ne sont pas encore connectés à un service.

## Aperçu des pages

| Fichier | Rôle |
| --- | --- |
| `index.html` | Page d'accueil : hero, fonctionnalités, « Comment ça marche » (3 étapes), tarifs, FAQ, appel à l'inscription |
| `mesures.html` | Formulaire de prise de mesures (30 mesures, en centimètres) à remplir par le client |
| `paiement.html` | Paiement Mobile Money : choix de l'opérateur, numéro, récapitulatif de commande |
| `contactez-nous.html` | Formulaire de contact |
| `mentions-legales.html` | Mentions légales |
| `termes-conditions.html` | Conditions générales d'utilisation |
| `politique-confidentialite.html` | Politique de confidentialité |

Modèle commercial mis en avant : **paiement à la commande**, 100 FCFA facturés à chaque
commande créée. Ni abonnement, ni frais fixes.

Opérateurs Mobile Money présentés sur `paiement.html` : MTN Mobile Money, Moov Money,
et Celtis Money (annoncé « Bientôt »).

## Structure du projet

```
.
├── index.html                    # Accueil
├── mesures.html                  # Prise de mesures
├── paiement.html                 # Paiement Mobile Money
├── contactez-nous.html           # Contact
├── mentions-legales.html         # Pages légales
├── termes-conditions.html
├── politique-confidentialite.html
├── css/style.css                 # Feuille de style unique (variables de marque, composants)
├── js/main.js                    # JS commun : i18n FR/EN, navbar, défilement fluide
├── images/                       # Logos, favicons, visuels des opérateurs Mobile Money
├── admin/                        # Espace d'administration (vide pour l'instant)
└── docs/                         # Captures d'écran de référence (non versionnées)
```

## Stack technique

- **HTML5** statique, sans générateur de site ni étape de build.
- **Bootstrap 5.3.3** + **Bootstrap Icons 1.11.3**, chargés depuis le CDN jsDelivr.
- **Montserrat** (Google Fonts), poids 400 à 800.
- **CSS maison** dans `css/style.css`, construit autour de variables CSS.
- **JavaScript vanilla** (IIFE, `"use strict"`), sans dépendance ni bundler.

Comme Bootstrap et les polices viennent du CDN, une connexion internet est nécessaire pour
que les pages s'affichent correctement.

## Lancer le projet en local

Le projet est prévu pour un environnement **WAMP** (`C:\wamp64\www\qoutur-template`) : une fois
WAMP démarré, le site est accessible sur <http://localhost/qoutur-template/>.

Aucun serveur n'est réellement requis — un double-clic sur `index.html` fonctionne aussi.
Pour servir les pages sans WAMP :

```bash
python -m http.server 8000
# puis ouvrir http://localhost:8000/
```

## Charte graphique

Les couleurs de marque sont définies comme variables CSS dans `:root` (`css/style.css`) :

| Variable | Valeur | Usage |
| --- | --- | --- |
| `--q-navy` | `#0D2845` | Bleu nuit principal (fonds, texte) |
| `--q-navy-700` | `#0A1F36` | Navy foncé (survol) |
| `--q-gold` | `#EACE81` | Or clair / crème doré |
| `--q-gold-600` | `#B38842` | Or bronze (accent, liens survolés) |
| `--q-cream` | `#F1ECE2` | Fond crème |
| `--q-beige` | `#D9D0BF` | Beige / sable |

S'y ajoutent des gris utilitaires (`--q-gray-100/400/500`), les rayons (`--q-radius`,
`--q-radius-sm`) et les ombres (`--q-shadow`, `--q-shadow-sm`). Utilisez ces variables plutôt
que des valeurs codées en dur : changer la palette doit rester une modification d'un seul endroit.

## Internationalisation (FR / EN)

`js/main.js` embarque un système de traduction léger, sans dépendance. Le principe : chaque
élément traduisible porte l'attribut `data-i18n` et ses deux versions de texte.

```html
<a href="#tarifs" data-i18n data-fr="Tarifs" data-en="Pricing">Tarifs</a>
```

Pour les champs de formulaire, les placeholders utilisent `data-i18n-ph` avec `data-ph-fr` et
`data-ph-en`.

La langue choisie est conservée dans `localStorage` sous la clé `qoutur_lang`, et le français
est la langue par défaut. Deux fonctions sont exposées globalement pour les scripts de page :
`window.qSetLang(lang)` et `window.qGetLang()`. Un événement `qlangchange` est également émis sur
`document` à chaque changement, ce qui permet aux composants générés dynamiquement (FAQ,
cartes de fonctionnalités) de se retraduire.

**Ajouter un texte traduisible :** ajoutez `data-i18n` et les deux attributs `data-fr` / `data-en`
sur l'élément. Aucun fichier de traduction à mettre à jour.

## Ce que `js/main.js` prend aussi en charge

- **Navbar** : ombre portée appliquée dès que la page défile de plus de 10 px.
- **Ancres** : défilement fluide vers les sections, et fermeture automatique du menu mobile.

## Prochaines étapes

- Brancher les formulaires (inscription, contact, mesures, paiement) sur un back-end.
- Construire l'espace d'administration dans `admin/`, aujourd'hui vide.
- Intégrer réellement les API Mobile Money.

## Licence et propriété

Projet propriétaire — **NAKOD**. Voir `mentions-legales.html` et `termes-conditions.html`.
