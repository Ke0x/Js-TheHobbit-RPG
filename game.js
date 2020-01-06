class Player {
    constructor(classe, vie, force, magie, intelligence, attaques) {
      this.classe = classe;
      this.vie = vie;
      this.force = force;
      this.magie = magie;
      this.intelligence = intelligence;
      this.attaques = attaques
    }
  }

let locate = null;
let enemy = null;
let enleveLocation = null;
let periode = 1;

let hobbit = {
    classe: "hobbit",
    vie: 60,
    force: 10,
    magie: 10,
    intelligence: 80,
    attaques: [
        {nom: "Coup d'épée", degats: 20, mana: false, img: "./img/attaques/epée.png"},
        {nom: "Anneau", degats: 80, mana: true, manaCost: 10 , img: "./img/attaques/anneau.png"},
    ],
    description: "Représentant d'un peuple imaginaire, variété de petite taille de l'espèce humaine, qui donnait à ses membres ce nom (signifiant « habitant des trous »), membres qui étaient toutefois appelés Semi-Hommes par les autres peuples, puisque leur taille atteignait la moitié de celle d'un homme ordinaire."
}

let nain = {
    classe: "nain",
    vie: 60,
    force: 60,
    magie: 0,
    intelligence: 30,
    attaques: [
        {nom: "Coup d'épée", degats: 25, mana: false, img: "./img/attaques/epée.png"},
        {nom: "Lancer de hache", degats: 30, mana: false, img: "./img/attaques/hache.png"},
    ],
    description: "Ce sont des créatures robustes de petite taille, qui se distinguent par leurs talents de forgerons, de mineurs et de bâtisseurs. Ils sont moins en évidence dans les récits que les Hommes et les Elfes, et s'opposent souvent à ces derniers, parfois avec violence."
}

let magicien = {
    classe: "magicien",
    vie: 50,
    force: 20,
    magie: 100,
    intelligence: 60,
    attaques: [
        {nom: "Boule de feu", degats: 50, mana: true, manaCost: 30, img: "./img/attaques/fireball.png"},
        {nom: "Givre", degats: 20, mana: true, manaCost: 10, img: "./img/attaques/ice.png"},
    ],
    description: "Ce mystérieux vieillard est décrit comme étant un magicien."
}

let elf = {
    classe: "elf",
    vie: 100,
    force: 30,
    magie: 0,
    intelligence: 80,
    attaques: [
        {nom: "Coup de dague", degats: 20, mana: false, img: "./img/attaques/dagger.png"},
        {nom: "Flèche", degats: 20, mana: false, img: "./img/attaques/arc.png"},
    ],
    description: "Les Elfes ont leurs propres travaux et leurs propres peines, et ils se soucient peu des voies des hobbits ou de toute autre créature sur terre."
}

let mirkwood = {
    name: "Mirkwood",
    description: "Mirkwood est une grande forêt de la Terre du Milieu située dans la région orientale de Rhovanion entre les Montagnes Grises et le Gondor.",
    enemy: [
        {classe: "araignée", vie: 20, force: 5, magie: 0, intelligence: 10},

    ]
}

let esgaroth = {
    name: "Esgaroth",
    description: "Esgaroth, également connue sous le nom de Lake-town sur le grand lac, est la ville des hommes.",
    enemy: [
        {classe: "orc", vie: 30, force: 7, magie: 0, intelligence: 10},
        {classe: "warg", vie: 20, force: 10, magie: 0, intelligence: 0},
    ]
}

let dale = {
    name: "Dale",
    description: "Dale est une cité d'Hommes située en Rhovanion, au pied de la Montagne Solitaire.",
    enemy: [
        {classe: "orcgeant", vie: 60, force: 5, magie: 0, intelligence: 0},
        {classe: "orc", vie: 30, force: 7, magie: 0, intelligence: 10},
    ]
}

let ereborext = {
    name: "Ereborext",
    description: "L'Erebor est une montagne située au Rhovanion, au nord du Long Lac, où fut construite la cité humaine de Dale et qui abrita le Royaume des nains sous la Montagne. Elle domine très largement les autres montagnes plus proches.",
    enemy: [
        {classe: "Smaug", vie: 100, force: 10, magie: 0, intelligence: 60},
    ]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function setStats(classe) {
    document.getElementById("sClasse").innerHTML = "Classe : " + classe.classe;
    document.getElementById("sVie").innerHTML = "Vie : " + classe.vie;
    document.getElementById("sForce").innerHTML = "Force : " + classe.force;
    document.getElementById("sMagie").innerHTML = "Magie : " + classe.magie;
    document.getElementById("sIntelligence").innerHTML = "Intelligence : " + classe.intelligence;
    document.getElementById("sDescription").innerHTML = classe.description;
}

function setStatsLocation(location) {
    document.getElementById("statsContain").style.visibility = "visible";
    document.getElementById("sDescription").innerHTML = location.description;
    if (location.enemy.length == 1) {
        document.getElementById("enemies").innerHTML = ' <img class="enemyImg" src="./img/players/' + location.enemy[0].classe + '.jpg"> '
    } else {
        document.getElementById("enemies").innerHTML = ' <img class="enemyImg" src="./img/players/' + location.enemy[0].classe + '.jpg"> <img class="enemyImg" src="./img/players/' + location.enemy[1].classe + '.jpg"> '
    }
}

function attaquesOver(atq) {
    document.getElementById("descAtq").style.visibility = "visible";
    let getInterface = document.getElementById("descAtq");
    if (!atq.mana) {
        getInterface.innerHTML = atq.nom + ': ' + atq.degats
    } else {
        getInterface.innerHTML = getInterface.innerHTML = atq.nom + ': ' + atq.degats + ', Mana: ' + atq.manaCost
    }
}

function attaquesOff() {
    document.getElementById("descAtq").style.visibility = "hidden";
}

function attaquer(atq) {
    let vieEnemie = document.getElementById("vieEnemie");
    let viePlayer = document.getElementById("viePlayer");
    let manaPlayer = document.getElementById("manaPlayer");
    let titre = document.getElementById("titre");
    if (!atq.mana && enemy.vie != 0) {
        enemy.vie = enemy.vie - atq.degats
        detectMort()
        vieEnemie.innerHTML = enemy.vie
        viePlayer.innerHTML = player.vie
        if (enemy.vie == 0) {enemy = null}
    } else {
        if (player.magie >= atq.manaCost && enemy.vie != 0) {
            enemy.vie = enemy.vie - atq.degats
            player.magie = player.magie - atq.manaCost
            detectMort()
            vieEnemie.innerHTML = enemy.vie
            manaPlayer.innerHTML = player.magie
            viePlayer.innerHTML = player.vie
            if (enemy.vie == 0) {enemy = null}
        }
    }
}

function detectMort() {
let titre = document.getElementById("titre");
let fight = document.getElementById("fight");
let interface = document.getElementById("interface");
    if (enemy.vie <= 0) {
        enemy.vie = 0
        if (periode == 1) {
            titre.innerHTML = "Bravo vous avez réussi à le vaincre ! <br> Un objet brille sur son corp allons voir"
            fight.innerHTML = `
            <img class="imgFight" src="./img/players/` + enemy.classe + `.jpg">
            <div onclick="clickItem()" id="vieEnemie" class="keyBtn"> <img class="keyImg" src="img/key.png"> </div>
            `
        } else if (periode == 2) {
            titre.innerHTML = "Bravo vous avez réussi à le vaincre ! <br> La voila c'est l'Arkenstone !"
            fight.innerHTML = `
            <img class="imgFight" src="./img/players/` + enemy.classe + `.jpg">
            <div onclick="clickItem()" id="vieEnemie" class="keyBtn"> <img class="keyImg" src="img/arkenstone.png"> </div>
            `
        } else if (periode == 3) {
            titre.innerHTML = "Vous avez réussi a reconquérir Erebor ! <br> Bravo votre quête est terminé maintenant"
            fight.innerHTML = ``
            audio.src="./songs/the-hobbit-theme.mp3";
            audio.play();
        }
        document.getElementById("attaques").style.visibility = "hidden";    
    } else {
        player.vie = player.vie - enemy.force
        titre.innerHTML = "Attention il riposte !"

    }
}

function clickItem() {
let getInterface = document.getElementById("all");
if (periode == 1) {
    periode = 2;
    fight.innerHTML = ``
    interface.innerHTML = `
    <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
    <div id="viePlayer" class="vieinterface">` + player.vie + `</div>
    <div id="manaPlayer" class="magieinterface">` + player.magie + `</div>
    <div class="keyInventaire"> <img class="keyImg" src="img/key.png"> </div>
    `
    getInterface.innerHTML = `
        <div id="interface" class="interface">
          <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
          <div id="viePlayer" class="vieinterface">` + player.vie + `</div>
          <div id="manaPlayer" class="magieinterface">` + player.magie + `</div>
          <div class="keyInventaire"> <img class="keyImg" src="img/key.png"> </div>
        </div> 
        
        <div class="conteneur">
            <div class="divtitre">
                <h3 id="titre" class="titre">C'est la clée du royaume des nains, il ne <br> nous manque plus qu'une chose, allons la chercher</h3> 
            </div>
        </div>
        
        <div id="persocontainer" class="persocontainer">
            
        </div>
        
        <div id="statsContain" class="statsContainer">
            <div class="stats">
                <h5 id="sDescription"></h5>
                <h5> Enemie(s) probables : </h5>
                <div id="enemies">  </div>
        </div>
            
        </div>
    
        `
        persocontainer = document.getElementById("persocontainer")
        if (locate == mirkwood) {
            persocontainer.innerHTML = `
            <div class="perso" id="esgaroth" onmouseover="setStatsLocation(esgaroth)" onclick="newLocation(esgaroth)">
                <h3 class="persotitre">Esgaroth</h3>
                <img class="imgperso" draggable="false" src="./img/players/esgaroth.jpg">
            </div>
            <div class="perso" id="esgaroth" onmouseover="setStatsLocation(dale)" onclick="newLocation(dale)">
                <h3 class="persotitre">Dale</h3>
                <img class="imgperso" draggable="false" src="./img/players/dale.jpg">
            </div>
        `
        } else {
            persocontainer.innerHTML = `
            <div class="perso" id="mirkwood" onmouseover="setStatsLocation(mirkwood)" onclick="newLocation(mirkwood)">
                <h3 class="persotitre">mirkwood</h3>
                <img class="imgperso" draggable="false" src="./img/players/mirkwood.jpg">
            </div>
            <div class="perso" id="dale" onmouseover="setStatsLocation(dale)" onclick="newLocation(dale)">
                <h3 class="persotitre">Dale</h3>
                <img class="imgperso" draggable="false" src="./img/players/dale.jpg">
            </div>
        `
        }
} else if (periode == 2) {
    periode = 3;
getInterface.innerHTML = `
    <div id="interface" class="interface">
    </div> 
    
    <div class="conteneur">
        <div class="divtitre">
            <h3 id="titre" class="titre"></h3> 
        </div>
    </div>
    
    <div id="persocontainer" class="persocontainer">
        

    `
titre.innerHTML = "Rendons nous maintenant à Erebor !<br> "
let interface = document.getElementById("interface");
interface.innerHTML = `
    <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
    <div id="viePlayer" class="vieinterface">` + player.vie + `</div>
    <div id="manaPlayer" class="magieinterface">` + player.magie + `</div>
    <div class="keyInventaire"> <img class="keyImg" src="img/key.png"> </div>
    <div class="pierreInventaire"> <img class="keyImg" src="img/arkenstone.png"> </div>
    `
persocontainer = document.getElementById("persocontainer")
persocontainer.innerHTML = `
            <div class="perso" id="ereborext" onclick="newLocation(ereborext)">
                <h3 class="persotitre">Erebor</h3>
                <img class="imgperso" draggable="false" src="./img/players/ereborext.jpg">
            </div>
        `
}
console.log()

}

function setPlayer(theplayer) {
    player = new Player(theplayer.classe, theplayer.vie, theplayer.force, theplayer.magie, theplayer.intelligence, theplayer.attaques)
    let getInterface = document.getElementById("all");
    getInterface.innerHTML = `
    <div id="interface" class="interface">
      <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
      <div class="vieinterface">` + player.vie + `</div>
      <div class="magieinterface">` + player.magie + `</div>
    </div> 
    
    <div class="conteneur">
        <div class="divtitre">
            <h3 id="titre" class="titre">Très bon choix !<br/>Ou allons nous maintenant ?</h3> 
        </div>
    </div>
    
    <div class="persocontainer">
        <div class="perso" id="mirkwood" onmouseover="setStatsLocation(mirkwood)" onclick="newLocation(mirkwood)">
            <h3 class="persotitre">Mirkwood</h3>
            <img class="imgperso" draggable="false" src="./img/players/mirkwood.jpg">
        </div>
        <div class="perso" id="esgaroth" onmouseover="setStatsLocation(esgaroth)" onclick="newLocation(esgaroth)">
            <h3 class="persotitre">Esgaroth</h3>
            <img class="imgperso" draggable="false" src="./img/players/esgaroth.jpg">
        </div>
    </div>
    
    <div id="statsContain" class="statsContainer">
        <div class="stats">
            <h5 id="sDescription"></h5>
            <h5> Enemie(s) probables : </h5>
            <div id="enemies">  </div>
        </div>
        
    </div>

    `
    document.getElementById("statsContain").style.visibility = "hidden";
}

function newLocation(location) {
    locate = location;
    document.body.style.backgroundImage = "url('./img/backgrounds/"+ location.name +".jpg')";
    audio.src="./songs/"+ location.name +".mp3";
    audio.play();
    audio.loop = true

    random = getRandomInt(locate.enemy.length)
    enemy = locate.enemy[random]
    let getInterface = document.getElementById("all");
    getInterface.innerHTML = `
    <div id="interface" class="interface">

    </div> 
    
    <div class="conteneur">
        <div class="divtitre">
            <h3 id="titre" class="titre">Oh non c'est une embuscade !<br/>Que devons nous faire ?</h3> 
        </div>
    </div>
    
    <div id="fight" class="fightInterface">
      <img class="imgFight" src="./img/players/` + enemy.classe + `.jpg">
      <div id="vieEnemie" class="vieFight">` + enemy.vie + `</div>
    </div>

    <div id="descAtq" class="descriptionAttaques"> 

    </div>

    <div id="attaques" class="panelAttaques">
        <div onclick="attaquer(player.attaques[0])" onmouseover="attaquesOver(player.attaques[0])" onmouseout="attaquesOff()" class="buttonAttaques"> <img class="imgAttaques" src="`+ player.attaques[0].img +`" > </div>
        <div onclick="attaquer(player.attaques[1])" onmouseover="attaquesOver(player.attaques[1])" onmouseout="attaquesOff()" class="buttonAttaques"> <img class="imgAttaques" src="`+ player.attaques[1].img +`" > </div>
    </div>

    `
    let Uinterface = document.getElementById("interface")
    let titre = document.getElementById("titre");
    if (periode == 1) {
        Uinterface.innerHTML = `     
        <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
        <div id="viePlayer" class="vieinterface">` + player.vie + `</div>
        <div id="manaPlayer" class="magieinterface">` + player.magie + `</div>
        `
    } else if (periode == 2) {
        Uinterface.innerHTML = `
        <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
        <div id="viePlayer" class="vieinterface">` + player.vie + `</div>
        <div id="manaPlayer" class="magieinterface">` + player.magie + `</div>
        <div class="keyInventaire"> <img class="keyImg" src="img/key.png"> </div>
        `
    } else if (periode == 3) {
        Uinterface.innerHTML = `
        <img class="imginterface" src="./img/players/` + player.classe + `.jpg">
        <div id="viePlayer" class="vieinterface">` + player.vie + `</div>
        <div id="manaPlayer" class="magieinterface">` + player.magie + `</div>
        <div class="keyInventaire"> <img class="keyImg" src="img/key.png"> </div>
        <div class="pierreInventaire"> <img class="keyImg" src="img/arkenstone.png"> </div>
        `
        titre.innerHTML = "Oh non c'est Smaug le dragon légendaire !"
    }
}
