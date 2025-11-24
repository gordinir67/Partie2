## PARTIE 1 Problèmes détectés :

### 1) Composants trop long

CountryComponent et HomeComponent contiennent trop de données et mélangent tout. 
Home : 
-charge les données

-calcule les totaux

-crée le graphique

-gère les événements de clic

Country : mélange de logique + UI + chart + navigation.

Il faudrait créer des éléments enfants, pour plus de lisibilité et plus de maintenabilité.

### 1) Usage de `any`

Fichiers contenant `any` (absence de typage strict):

- `country.component.ts`
- `home.component.ts`

### 2) console.log / code à supprimer

Fichiers avec `console.log`:

- `home/home.component.ts`

### 3) Appels HTTP dans les composants

Fichiers avec appel `HTTP` :

- `country.component.ts`
- `home.component.ts`

### 4) Mauvaise gestion des observables

Pas de mutualisation du chargement des données (multiples requêtes)

Pas de shareReplay

Logique RxJS dispersée dans les composants

Navigation dans un subscribe mélangé avec la logique métier

### 5) Services mal placés

- Absence de dossier `services`, et appel au fichier JSON directement dans les components.


### 6) Gestion de données directement dans composants

Création d'un fichier models plutôt que de gérer les données dans:

- `country.component.ts`
- `home.component.ts`

### 7) Code dupliquée

Calculs de totaux et participations répétés

Création/destroy de charts répétée

Extraction manuelle des mêmes champs dans plusieurs composants

#### PARTIE 2 : Nouvelle arborescence propre et explications:


- `pages/`  
  Composants qui représentes les différents écrans : `home`, `country`, `not-found`.

- `components/`  
  Composants réutilisables (`country-card` et `medal-chart`).

- `services/`  
  Accès aux données et logique métier. Tous les accès aux données doivent passer par ce dossier. 

- `models/`  
  Modèles métiers (`OlympicCountry`, `Participation`.)

Cette séparation permet un code plus maintenanble et évolutif.

## Nouvelle arborescence cible

src/
  app/
    app.component.ts
    app.component.html
    app.component.scss
    app.component.spec.ts
    app.module.ts
    app-routing.module.ts

    pages/
      home/
        home.page.ts
        home.page.html
        home.page.scss
        home.page.spec.ts
      country/
        country.page.ts
        country.page.html
        country.page.scss
        country.page.spec.ts
      not-found/
        not-found.page.ts
        not-found.page.html
        not-found.page.scss
        not-found.page.spec.ts

    components/
      shared/
        country-card/
          country-card.component.ts
          country-card.component.html
          country-card.component.scss
        stats-summary/
          stats-summary.component.ts
          stats-summary.component.html
          stats-summary.component.scss
        medals-chart/
          medals-chart.component.ts
          medals-chart.component.html
          medals-chart.component.scss

    services/
      olympic/
        olympic.service.ts

    models/
      olympic/
        olympic-country.model.ts
        participation.model.ts

medal-chart : affiche le graphique en camembert

country-card : carte récapitulative d’un pays

Service ajouté suivant le pattern singleton, gère le chargement des données JSON et facilement évolutif vers une API, le cache des données (shareReplay), les calculs globaux (totaux, années, médailles…)

Supression des any, console.log()...

HomeComponent et CountryComponent ont été refactorisés.
