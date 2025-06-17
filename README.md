# Eval Js - Exo 04 | Heroes Brawl

## Description


Vous devez créer une mini-arène de combat entre héros. L’utilisateur peut créer différentes classes de personnages ayant chacun leurs caractéristiques propres. Ces héros peuvent ensuite s’attaquer les uns les autres, avec des effets spécifiques selon leur classe.


---

## Fonctionnalités

--Consignes

-Création dynamique de Héro via un formulaire (Nom + Type de héro, portrait)
-Les Types de héro (ou classes) sont : 
  Guerrier
  Mage
  Vampire
  
-On affiche dans un autre conteneur les Héros créés avec leur vie (représentée sous forme de LifeBar + points de vie écrits par dessus ) et leur force

-Le système d’attaque est le suivant : 
  Chaque héro peut en attaquer un autre

-Les effets varient selon la classe : 
  Guerrier : attaque standard
  Mage : attaque standard + sort magique (-5pv supplémentaire)
  Vampire : attaque rapide (attaque 2 fois si la cible survit à la 1ere attaque)

-Vous devez aussi détecter la mort d’un héro et appliquer un état visuel clair montrant qu’il est mort (et désactiver ce qu’il pouvait faire quand il était en vie)

--Structure de classe de base
-La classe de base contient les propriétés suivantes : 
  nom
  vie
  force
  type
  emoji
  portrait

-La classe de base contient la méthode suivante :
  attaquer : Si la cible est toujours en vie, on va retirer la force du héro en cours à la vie de la cible.

--Structure de la classe héritée Guerrier
-Les guerriers ont, de base, les propriétés particulières suivantes : 
  100PV, 30 force, emoji : 🗡️
  Les guerriers n’ont pas d’attaque spécifique et vont donc employer la méthode générique pour dispenser leurs dégâts.

--Structure de la classe héritée Mage
-Les mages ont, de base, les propriétés particulières suivantes : 
  80PV, 20 force, emoji : 🔮
  Les mages utilisent l’attaque de base sur la cible à laquelle ils vont ajouter 5 points de dégâts supplémentaires si le      cible est toujours en vie à la suite de l’attaque de base.

--Structure de la classe héritée Vampire
-Les vampires ont, de base, les propriétés particulières suivantes : 
  60PV, 15 force, emoji : 🧛🏼‍♂️
  Les vampires utilisent l’attaque de base sur la cible.
  Si la cible a survécu, les vampires vont avoir droit à une attaque de base supplémentaire.
  
🎁 Bonus possibles (non obligatoires)
✨ Animation visuelle sur la carte de la créature attaquée
🔊 Lecture d’un effet sonore à chaque attaque (<audio> fourni)


---

## Technologies

- HTML5
- CSS3
- JavaScript Vanilla

---

## Démo

[Lien vers la démo](https://loicdupong.github.io/04-heroes-brawl/)

---

## Auteur

Projet réalisé dans le cadre d’un exercice personnel / formation JS Fullstack
