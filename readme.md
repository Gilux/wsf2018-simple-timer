# Timer WSF18 - Version entraînement

## Consignes :
- Permettre de rendre le message personnalisable à la création du timer :
```js
new Timer(document.querySelector("#test"), 3600, "Mon Super Timer")
```

- Rendre le "Ajouter x mn" dynamique avec un champ de formulaire, pour pouvoir ajouter entre 1s et 12h.

- Changer l'onglet de la page (le title) en "🔔 15mn left !" durant 15 secondes lorsqu'un timer atteint 15mn restantes, puis revenir au titre standard.

- Utiliser le localStorage pour conserver le timer dans l'état lors d'un refresh de la page (s'il est en pause, le laisser en pause, et garder le temps imparti)

- Modifier le HTML/CSS et le JS pour pouvoir superposer plusieurs timers sur la page, chacun ayant son propre compte à rebours. Adapter le localStorage pour qu'il stocke les timers de la même façon (voir la consigne sur le localStorage)

> Indice : se renseigner sur `<template>` !

- Ajouter un bouton pour supprimer un timer, persister la suppression en localStorage