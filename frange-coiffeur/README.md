# Frange — démo de réservation de coiffeurs

Site statique d’une seule page qui reprend le fonctionnement d’un annuaire de
réservation de coiffeurs en ligne : recherche par prestation et par ville, liste
de salons avec créneaux libres, puis réservation en trois étapes.

La marque, les textes et les visuels sont originaux. Les salons, avis, tarifs et
disponibilités sont **générés et fictifs**, et aucune réservation n’est envoyée.

## Lancer

Aucune dépendance ni étape de build. Ouvrez `index.html` dans un navigateur, ou
servez le dossier :

```bash
python3 -m http.server 8000 --directory frange-coiffeur
# puis http://localhost:8000
```

Les polices viennent de Google Fonts. Hors ligne, la page utilise les polices
système.

## Fonctionnalités

- **Accueil** : recherche « Que cherchez-vous ? / Où ? », villes principales avec
  leur numéro de département, prestations du moment, guide, recherches fréquentes,
  encart pour les professionnels.
- **Résultats** : filtres (disponible aujourd’hui, note, prix, ouvert le lundi ou
  le dimanche), tri, créneaux sur trois jours par salon.
- **Réservation** : prestation → date et heure → prénom, puis confirmation.
  Les rendez-vous sont gardés dans le `localStorage` du navigateur
  (« Mes rendez-vous »), où l’on peut aussi les annuler.
- **Nuancier** : compose un numéro de couleur (hauteur de ton + reflets, par
  exemple 7.43) et affiche son nom et un aperçu.
- **Formes de visage** : conseils de coupe selon la forme du visage.

## Structure du code

Tout est dans `index.html` : CSS en tête (couleurs définies comme variables, avec
thème clair et sombre), puis le HTML, puis un script sans dépendance.

Les salons sont produits par un générateur pseudo-aléatoire initialisé avec le
nom de la ville (`salonsFor`). Tout le monde voit donc les mêmes salons. Les
créneaux dépendent du salon et de la date (`slotsFor`, `fitting`).
