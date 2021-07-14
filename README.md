# **Projet FishEyes**

## **VietteRoxanne_6_23122020**

---

### **GOAL**

---

> Mettre en place la methode pattern Factory;
> -ESLINT-
> Le test "AChecker" sans "knownIssues" |Conforme au WCAG|
> Utiliser un lecteur d'écran gratuit pour tester;

- [x] W3C HTML de "page.html";

  > warning à montrer au mentor;

- [x] W3C HTML de "index.html";
  > W3C CSS;
  > Fonctionne sur Google chrome et Firefox;
  > **[!]NOTE**: FIREFOX ISSUES:
  - la modale form, pb avec le btn close qui passe de 5 à 7 pour l'accessibilité;
  - problème de lisibilité de l'accessibilité des lien -ex avec fisheyes-
  - problème avec le btn select.

---

1. **Page d'accueil**

- [x] Liste de tout les photographes injectée dans des blocks dynamiques;
- [x] En cliquant sur une étiquette tag, la liste des photographes est filtrée;
- [x] Lorsque qu'un utilisateur clique sur la vignette d'un photographe, il va vers sa page;
- [x] Le btn pour remonter en haut de la page apparait lors du onscroll;

> A FAIRE:
> **[!]NOTE**: L'url fonctionne nulle part;

---

2. **Page des photographes**

- [x] Afficher la galerie de travail -les photos et vidéos injectées dynamiquement-;
- [x] Les photographes peuvent montrer photos et vidéos;
- [x] L'icone "like" est clicable, il doit incrémenter le nombre de "likes" au clic;
- [x] Le nombre total de "likes" doit être mis à jour, pour chaque clic;
- [x] Les médias peuvent être trié par popularité, date ou titres;
- [x] Lorsque qu'un utilisateur clique sur un média, la modale photo s'ouvre.

> **le block select:**

- [x] Essayé de modifier la flèche avec js lors du clic;
  > **[!]NOTE**: on garde le border visible si focus onclick;

---

3. La modal -view Photos-

- [x] La croix doit fermer la modal;
- [x] Les btns permettent de passer d'un média à un autre;
- [x] Les touches fléchées du clavier, permettent aussi de faire défiller les médias;

---

6. La modal -Form-

- [x] Le formulaire de contact est une modale qui s'affiche par-dessus le reste:
- [x] Il comprend des champs pour les noms, l'adresse éléctronique et le message;
- [x] Plus tard, le btn de contact enverra un msg au photographe.
- [x] Pour le moment, il faut afficher le contenu des trois champs dans les logs de la console;

---

5. Les Finitions
   > Il faut faire quelque chose de responsive -mobile et desktop uniquement-;
   > L'Accessibilité :

- [x] Toutes les photos doivent comporter des descriptions textuelles;
  > **[!]NOTE**: sauf vidéo, à voir comment cela peut se faire...;
- [x] L'utilisateur doit pouvoir utiliser les commandes du clavier + les touches fléchées pour la modal photo;
- [x] Utliser un max d'éléments sémantique;
- [x] Ajouter les attributs ARIA si nécessaire.
- [x] La gestion des évènement doit se faire au clavier;
- [x] les modales doivent recevoir le focus lors de leur ouvertures;
- Utiliser un lecteur d'écran gratuit pour tester;
- Le code devra passer le test "AChecker" sans "knownIssues" -Conforme au WCAG-

---

### **Data**

[.JSON](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json)
