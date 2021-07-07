# **Projet FishEyes**

## **VietteRoxanne_6_23122020**

---

### **GOAL**

---

> Mettre en place la methode pattern Factory;
> -ESLINT-

---

1. **Page d'accueil**

- [x] Liste de tout les photographes injectée dans des blocks dynamiques;
- [x] En cliquant sur une étiquette tag, la liste des photographes est filtrée;
- [x] Lorsque qu'un utilisateur clique sur la vignette d'un photographe, il va vers sa page;
- [x] Le btn pour remonter en haut de la page apparait lors du onscroll;

> A FAIRE:
> L'url ne fonctionne pas si je fais un copier collé sur un nouvel onglet, le filtre des tags n'est pas pris en compte;

---

2. **Page des photographes**

- [x] Afficher la galerie de travail -les photos et vidéos injectées dynamiquement-;
- [x] Les photographes peuvent montrer photos et vidéos;
- [x] L'icone "like" est clicable, il doit incrémenter le nombre de "likes" au clic;
- [x] Le nombre total de "likes" doit être mis à jour, pour chaque clic;
- [x] Les médias peuvent être trié par popularité, date ou titres;
- [x] Lorsque qu'un utilisateur clique sur un média, la modale photo s'ouvre.

> **QUESTIONS:**

1. Je pense que le code de mes filtres n'est pas bien construit;
2. idem que pour la page des index; si nouvel ongel, les filtres ou le changement de médias n'est pas mémorisé;

> **le block select:**

- [x] Essayé de modifier la flèche avec js lors du clic;
  > Petit souci de transition avec le border si onclikc ou non;

---

3. La modal -view Photos-

- [x] La croix doit fermer la modal;
- [x] Les btns permettent de passer d'un média à un autre;
- [x] Les touches fléchées du clavier, permettent aussi de faire défiller les médias;

  > **IMPORTANT** : problème avec les filtres, si changement répéter des valeurs sans refresh de la page;

---

6. La modal -Form-

- [x] Le formulaire de contact est une modale qui s'affiche par-dessus le reste:
- [x] Il comprend des champs pour les noms, l'adresse éléctronique et le message;
- [x] Plus tard, le btn de contact enverra un msg au photographe.
  > Pour le moment, il faut afficher le contenu des trois champs dans les logs de la console;

---

5. Les Finitions
   > Il faire quelque chose de responsive -mobile et desktop uniquement-;
   > L'Accessibilité :

- Toutes les photos doivent comporter des descriptions textuelles;
- L'utilisateur doit pouvoir utiliser les commandes du clavier + les touches fléchées pour la modal photo;
- Utliser un max d'éléments sémantique;
- Ajouter les attributs ARIA si nécessaire.
- Le code devra passer le test "AChecker" sans "knownIssues" -Conforme au WCAG-
- La gestion des évènement doit se faire au clavier;
- Utiliser un lecteur d'écran gratuit pour tester;
- les modales doivent recevoir le focus lors de leur ouvertures;

---

### **Data**

[.JSON](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json)
