// == 💛💛 Déclaration de variables
const inputName = document.getElementById('name');
const selectClass = document.getElementById('class');

const wrapperHeroes = document.querySelector('.wrapper__heroes');
const heroAvatarImg = document.querySelectorAll('.hero__img');
const containerArena = document.querySelector('.container__arena');

const btnAdd = document.querySelector('.btn--add');

const heroesTab = [];

// == 💛💛 Création de la classe Hero et de ses extends
class Hero {
    constructor(name, image){
        this.name = name;
        this.type;
        this.image = image;
        this.hp = 100;
        this.hpMax = 100;
        this.strength = 15;
    }
// == 💛💛 Attack la target en paramètre et réduit son hp en fonction des dégats
    attack(target){
        if (target.hp >= 0) {
            target.hp = Math.max(0, target.hp - this.strength)
        } 
    }
// == 💛💛 Met à jour la barre de HP (???? FONCTIONNE PAS A PART POUR LE PREMIER HERO ??????)
    updateHpBarBg(position) {
        const heroDiv = document.querySelector(`[data-name="${position}"]`)
        const bar = heroDiv?.querySelector('.hero__hp__inner');
        if (bar) bar.style.width = `${Math.max(0, this.hp)}%`;
    }
// == 💛💛 Boolean pour vérifier si le héro est mort
    isDead() {
        if (this.hp === 0) {
            return this.hp <= 0;   
        }
    }
}
// == 💛💛 Extends de la classe Hero
class Warrior extends Hero{
    constructor(name, image){
        super(name, image)
        this.type = "Warrior"
        this.strength = 30;
        this.emoji = '🗡';
    }
}
// == 💛💛 Extends de la classe Hero
class Mage extends Hero{
    constructor(name, image){
        super(name, image)
        this.type = "Mage";
        this.hp = 80;
        this.hpMax = 80;
        this.strength = 20;
        this.emoji = '🔮'
    }

    attack(target){
       if(target.hp === 0) {
            target.hp = Math.max(0, target.hp - (this.strength + 5))
       } 
    }
}
// == 💛💛 Extends de la classe Hero
class Vampire extends Hero{
    constructor(name, image){
        super(name, image)
        this.type = "Vampire";
        this.hp = 60;
        this.hpMax = 60;
        this.strength = 15;
        this.emoji = '🧛‍♂️';
    }

    attack(target){
        if(target.hp >= 0) {
            target.hp = Math.max(0, target.hp - this.strength * 2)
        } 
     }
}

// == 💛💛 Créé un nouveau hero et push dans le tableau des heros
function newHero() {
    let img;
    const type = selectClass.value;
    for (const avatar of heroAvatarImg) {
        avatar.classList.contains('hero__img--active') ? img = avatar.getAttribute('src') : null
    }

    if (type == "Warrior") {
        heroesTab.push(new Warrior(inputName.value, img))
    } else if (type == "Mage") {
        heroesTab.push(new Mage(inputName.value, img))
    } else if (type == "Vampire"){
        heroesTab.push(new Vampire(inputName.value, img))
    }
}
// == 💛💛 Affiche les Héros créés dans l'arène
function displayArena() {
    containerArena.innerHTML = "";
    heroesTab.forEach((hero, index) =>{
        const heroCard = document.createElement('div');
        heroCard.classList.add('hero__card');
        heroCard.setAttribute('data-index', index);
        heroCard.setAttribute('data-name', hero.name);
        heroCard.innerHTML += `
        <div class="hero__img-container"><img src="${hero.image}" alt="avatar ${hero.type}" class="hero__img hero__img--arena"></div>
        <div class="hero__infos hero__infos--${(hero.type).toLowerCase()}">
                ${hero.emoji} ${hero.name} (${hero.type})
        </div>
        <div class="hero__hp">
        <div class="hp__info">💖 ${hero.hp} / ${hero.hpMax}</div>
        <div class="hero__hp__inner" style="width: ${(hero.hp * 10) / (hero.hp / 10)}%"></div></div>
        <div class="hero__strength">💪 Force : ${hero.strength}</div>      
        `
        const heroBtns = document.createElement('div');
        heroBtns.classList.add('hero__btns');
        heroCard.append(heroBtns);

        const filteredTab = heroesTab.filter((_, i) => i !== index);

        for (const hero of filteredTab) {
            const heroBtn = document.createElement('div');
            heroBtn.setAttribute('class', 'btn btn--attack');
            heroBtn.setAttribute('data-name', hero.name);
            heroBtn.textContent = `⚔ ${hero.name}`
            heroBtns.append(heroBtn);
        }
        containerArena.append(heroCard);
    })
}
// == 💛💛 Met à jour les points de vie (la barre de hp se met pas à jour je vais tout casser 💀💀💀💀💀💀💀)
function updateDisplayHp(element, target) {
    const hpNumber = target.querySelector('.hp__info');
    hpNumber.textContent = `💖 ${element.hp} / ${element.hpMax}`
    if (element.hp === 0) {
        target.classList.add('hero__card--is-dead')
    }
}

// == 💛💛 Event listener pour sélectioner les avatars
wrapperHeroes.addEventListener('click', (e)=>{
    if (e.target.classList.contains('hero__img')) {
        if (e.target.classList.contains('hero__img--active')) {
            e.target.classList.toggle('hero__img--active');
        } else {
            for (const img of heroAvatarImg) {
                img.classList.contains('hero__img--active') ?  img.classList.remove('hero__img--active') : null
            }
            e.target.classList.add('hero__img--active');
        }
    }
})

// == 💛💛 Event Listener pour ajouter un héro créé
btnAdd.addEventListener('click', (e) =>{
    newHero();
    displayArena();
    inputName.value = "";
    inputName.select();
})

// == 💛💛 Event Listener pour les attaques
containerArena.addEventListener('click', (e)=>{
    if (e.target.classList.contains('btn--attack')) {
        const btnData = e.target.dataset.name;
        const attackFrom = e.target.closest('.hero__card').dataset.index;
        const attackToIndex = (element) => element.name === btnData;
        const attackTo = heroesTab.findIndex(attackToIndex)
        const heroCardTarget = document.querySelector(`.hero__card[data-index="${attackTo}"]`)

        if (!heroesTab[attackTo].isDead() && !heroesTab[attackFrom].isDead()) {
            heroesTab[attackFrom].attack(heroesTab[attackTo]);
            heroesTab[attackTo].updateHpBarBg(btnData);
            updateDisplayHp(heroesTab[attackTo], heroCardTarget);
            heroCardTarget.classList.add('bounce');
            setTimeout(() => {
                heroCardTarget.classList.remove('bounce');
            }, "150");
        } else if (heroesTab[attackTo].isDead()) {
            heroCardTarget.classList.add('hero__card--is-dead')
        }
        
    }
})
