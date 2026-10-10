# Frange — module de réservation client

Module de prise de rendez-vous en ligne pour **un** salon de coiffure, côté
client. C’est tout : pas de page d’accueil, pas d’annuaire.

Parcours :

1. **Prestation** : liste par catégorie, avec durée et prix.
2. **Créneau** : choix du coiffeur (ou « sans préférence »), du jour, puis de
   l’heure. Seuls les horaires où la prestation tient en entier sont proposés.
3. **Coordonnées** : prénom, nom et téléphone obligatoires, e-mail et message
   facultatifs.
4. **Confirmation** avec une référence de rendez-vous.

L’onglet **Mes rendez-vous** liste les rendez-vous à venir et passés. On peut y
annuler un rendez-vous jusqu’à `cancelHours` heures avant (24 h par défaut).

## Lancer

Aucune dépendance ni étape de build. Ouvrez `index.html` dans un navigateur, ou
servez le dossier :

```bash
python3 -m http.server 8000 --directory frange-coiffeur
```

## Adapter au salon

Tout se règle dans l’objet `CONFIG`, en tête du script de `index.html` :

| Clé | Rôle |
|---|---|
| `salon` | nom, type et adresse affichés en en-tête |
| `hours` | horaires par jour (0 = dimanche), en minutes depuis minuit ; `null` = fermé |
| `closedDates` | jours de fermeture exceptionnelle (`AAAA-MM-JJ`) |
| `slotStep`, `minNotice`, `daysAhead` | pas des créneaux, délai minimum, horizon de réservation |
| `cancelHours` | délai d’annulation en ligne |
| `staff` | équipe et jours travaillés de chacun |
| `categories` | prestations : `id`, nom, `note`, durée `m` (min), prix `p` (€), `from: true` pour un prix « dès » |

## Limites de la démo

- Les rendez-vous sont enregistrés dans le `localStorage` du navigateur
  (objet `store`) : le salon ne les reçoit pas. Pour un vrai service,
  remplacez `store.load`, `store.add` et `store.remove` par des appels à
  votre serveur.
- `demoAgenda()` simule des rendez-vous déjà pris, pour que l’agenda ne soit
  pas vide. Remplacez-le par l’agenda réel du salon.
