/**
 * Juego
 * Proyecto Final - Simon dice
 */

const $celeste = document.getElementById('celeste');
const $violeta = document.getElementById('violeta');
const $naranja = document.getElementById('naranja');
const $verde = document.getElementById('verde');
const $btn = document.getElementById('btn');

class Game{
    constructor(){
        this.init();
        this.generateSequence();
        this.nextLevel();
    }

    init(){
        this.chooseColor = this.chooseColor.bind(this);
        $btn.classList.add('btn--game');
        this.level = 1;
        this.colors = {
            celeste: $celeste,
            violeta: $violeta,
            naranja: $naranja,
            verde: $verde
        }
    }

    generateSequence(){
        this.sequence = new Array(10).fill(0).map(number =>  Math.floor(Math.random()*4));
    }

    transformNumberColor(number){
        switch(number){
            case 0: return 'celeste';
            case 1: return 'violeta';
            case 2: return 'naranja';
            case 3: return 'verde';
        }
    }

    illuminateColor(color){
        this.colors[color].classList.add('light');
        setTimeout(() => {
            this.colors[color].classList.remove('light');
        }, 350);
    }

    illuminateSequence(){
        for (let index = 0; index < this.level; index++) {
            const color = this.transformNumberColor(this.sequence[index]);
            setTimeout(() => {
                this.illuminateColor(color)
            }, 1000 * index);
        }
    }
    
    chooseColor(event){
        
        console.log(this);
    }

    addEventClicks(){
        for(const element in this.colors){
            this.colors[element].addEventListener('click',this.chooseColor);
        }
    }

    nextLevel(){
        this.illuminateSequence();
        this.addEventClicks();
    }
}

$btn.addEventListener('click',()=>{
    const simonGame = new Game();
});