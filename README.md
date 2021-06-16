# Projet FishEyes

## VietteRoxanne_6_23122020

---

### 22.05.2021

- [x] Mise en place de la 'branch components';
- [x] Mise en place de Sass;
- [x] Début de la réalisation des composants:
  > ---> la modal + formulaire ok;
  > ---> les boutons: en cours de réalisation;

---

### 25.05.2021

- [x] Continuation sur la réalisation des composants:
  > le Logo **FishEyes** ----> - [x] ok;
  > la liste déroulante ----> - [ ] ok pour le moment, revenir dessus plus tard;

---

### 28.05.2021

> Résumé des composants réalisés à ce jour:[^1]

- La modal form;
- Keyframe de la modal form;
- INDEX-Blocks Présentations des photographes;
- Les Boutons;
- Les tags;
- Blocks photos;
- La liste <-select-> déroulante;

[^1]: Mettre en place la liste à puce des tags pour les block présentations photographes.

---

### 03.06.2021

> Fin des composants. Il manque juste l'icone photo sur le composant présentation des pages individuel;

---

- [x] Index : Mise en place du header, avec la nav et du block main + le contenu du main
- [x] Index : Ajout des composants qui présentent les photographes
- [x] Page : Création de la page HTML "page" et Déplacement des composants à l'intérieur

---

### 07.06.2021

- Récupération des données du fichier.json avec fetch;
- Injection du htlm des données avec un `.map()`;
- Il reste a injecter les #tags de façon dynamique.

---

### 08.06.2021

- [x] injecter les tags dynamiquement;

---

### 15.06.2021

- [x] La page des photographes a été mise en place, les données sont statiques pour le moment;
- [x] les données des tags sont injectées et retirées dynamiquement lors du click, dans l'url;
- [x] Début: essayer de filter les photographes en fonctions des tags sélectionnés;
- [x] Lors d'un click sur un tag: un nouveau tableau de données est crée dynamiquement, en fonction du filtre;

> Notes:
> Essayer d'injecter dynamiquement ces nouvelles données dans le bloc `<ul>`;
> nouveau pb à régler : certain photographes risquent d'être duppliquer...

### 16.06.2021

- [x] Un nouveau tableau, vient ranger chaque données 'photographes', dynamiquement en fonction des tags ciblés;
- [x] les photographes apparaissent en fonction des tags cliqués ou non, dans le bloc `<ul></ul>`;

> Il reste à mettre en place la disparition des photographes liés au tag, si celui-ci est décoché;

## Data

[.JSON](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json)
