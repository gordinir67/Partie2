## Nouvelle arborescence 

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
        error-banner/
          error-banner.ts
        header/
          header.component.ts
          header.component.html
          header.component.scss
        linechart/
          linechart.component.ts
          linechart.component.html
          linechart.component.scss
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

linechart : affiche le diagramme en ligne

header: Permet de reprendre les données communes (nombre de participations, médailles...)

Service ajouté suivant le pattern singleton, gère le chargement des données JSON et facilement évolutif vers une API, les calculs globaux (totaux, années, médailles…)

Plus aucun calcul dans les vues.

Création de models, permettant une interface propre et utilis&é par le service.

Supression des any, console.log()...


