/**
 * Juego
 * Proyecto Final - Simon dice
 */

const $celeste = document.getElementById('celeste');
const $violeta = document.getElementById('violeta');
const $naranja = document.getElementById('naranja');
const $verde = document.getElementById('verde');
const $btn = document.getElementById('btn');

const LAST_LEVEL = 10;

class Game{
    constructor(){
        this.init();
        this.generateSequence();
        setTimeout(this.nextLevel, 500);
    }

    init(){
        this.nextLevel = this.nextLevel.bind(this);
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
        this.sequence = new Array(LAST_LEVEL).fill(0).map(number =>  Math.floor(Math.random()*4));
    }

    nextLevel(){
        this.subLevel = 0;
        this.illuminateSequence();
        this.addEventClicks();
    }

    transformNumberColor(number){
        switch(number){
            case 0: return 'celeste';
            case 1: return 'violeta';
            case 2: return 'naranja';
            case 3: return 'verde';
        }
    }

    transformColorNumber(color){
        switch(color){
            case 'celeste': return 0;
            case 'violeta': return 1;
            case 'naranja': return 2;
            case 'verde': return 3;
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

    addEventClicks(){
        for(const element in this.colors){
            this.colors[element].addEventListener('click',this.chooseColor);
        }
    }
    
    removeEventClicks(){
        for(const element in this.colors){
            this.colors[element].removeEventListener('click',this.chooseColor);
        }
    }

    chooseColor(event){
        const nameColor = event.target.dataset.color;
        const numberColor = this.transformColorNumber(nameColor);
        this.illuminateColor(nameColor);
        if(numberColor === this.sequence[this.subLevel]){
            this.subLevel++;
            if(this.subLevel === this.level){
                this.level++;
                this.removeEventClicks();
                if(this.level === (LAST_LEVEL + 1)){
                    //gano juego
                }else{
                    setTimeout(this.nextLevel, 1500);
                }
            }
        }else{
            //perdio    
        }
    }
}

$btn.addEventListener('click',()=>{
    const simonGame = new Game();
});