/**
 * Juego
 * Proyecto Final - Simon dice
 */

(async function(){
    const $celeste = document.getElementById('celeste');
    const $violeta = document.getElementById('violeta');
    const $naranja = document.getElementById('naranja');
    const $verde = document.getElementById('verde');
    const $btn = document.getElementById('btn');
    const $btnRepeat = document.getElementById('repeat');
    const $name = document.getElementById('name');
    const $points = document.getElementById('pts');
    const $level = document.getElementById('lvl');
    const $sequence = document.getElementById('sequence');
    const $instructions = document.getElementById('instrucciones');

    const LAST_LEVEL = 10;
    
    class Game{
        constructor(){
            this.repeatCont = 0;
            this.points = 0;
            this.init();
            this.generateSequence();
            setTimeout(this.nextLevel, 500);
        }
        
        init(){
            this.nextLevel = this.nextLevel.bind(this);
            this.chooseColor = this.chooseColor.bind(this);
            this.repeatSequenceColor = this.repeatSequenceColor.bind(this);
            $btn.removeEventListener('click',initGame);
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

            $btnRepeat.addEventListener('click',this.repeatSequenceColor);
        }
        
        removeEventClicks(){
            for(const element in this.colors){
                this.colors[element].removeEventListener('click',this.chooseColor);
            }

            $btnRepeat.addEventListener('click',this.repeatSequenceColor);
        }
        
        repeatSequenceColor(){
            this.repeatCont++;
            this.illuminateSequence();
            $sequence.textContent = this.repeatCont;
        }

        smsNextLevel(){
            Swal.fire({
                type: 'success',
                title: `Nivel ${this.level - 1} superado`
            })
            .then(this.nextLevel);
        }

        winGame(){
            Swal.fire({
                title: 'Felicidades Ganastes!',
                text: '¿Deseas jugar de nuevo?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result)=>{
                if(result.value) initGame();
                else $btn.addEventListener('click',initGame);
            })
        }

        loseGame(){
            Swal.fire({
                title: 'Lo siento, perdistes!',
                text: '¿Deseas jugar de nuevo?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result)=>{
                if(result.value) initGame();
                else $btn.addEventListener('click',initGame);
            })
        }

        chooseColor(event){
            const nameColor = event.target.dataset.color;
            const numberColor = this.transformColorNumber(nameColor);
            this.illuminateColor(nameColor);
            if(numberColor === this.sequence[this.subLevel]){
                this.subLevel++;
                if(this.subLevel === this.level){
                    this.level++;
                    if(this.repeatCont > 0){
                        this.points += (this.subLevel * 2) - this.repeatCont;
                    }else this.points = this.subLevel *2
                    this.repeatCont = 0;
                    $sequence.textContent = this.repeatCont;
                    $points.textContent = this.points < 0 ? 0 : this.points;
                    $level.textContent = this.level;
                    this.removeEventClicks();
                    if(this.level === (LAST_LEVEL + 1)){
                        this.winGame();
                    }else{
                        this.smsNextLevel();
                        //setTimeout(this.nextLevel, 1500);
                    }
                }
            }else{
                this.loseGame();
                //perdio    
            }
        }
    }
    
    const initGame = () => {
        const simonGame = new Game();
    }

    $btn.addEventListener('click',initGame);
    
    $instructions.addEventListener('click',()=>{
        Swal.fire({
            type: 'info',
            title: '¿Como Jugar?',
            html: `<div style="text-align: left;"><strong>1.-</strong> Cada acierto te suma 2 puntos.</div>
                   <div style="text-align: left;"><strong>2.-</strong> Acertar toda la secuencia de colores.</div>
                   <div style="text-align: left;"><strong>3.-</strong> Repetir la secuencia de colores de resta un punto.</div>
                   <div style="text-align: left;"><strong>4.-</strong> Completar los ${LAST_LEVEL} Niveles.</div>
                   `
        });
    });

    const {value: name } = await Swal.fire({
        title: 'Ingrese un nombre',
        input: 'text',
        inputPlaceholder: 'Ingrese un nombre',
        allowEscapeKey: false,
        allowOutsideClick: false,
        inputValidator: (value) =>{
            if(!value){
                return 'Necesitas ingresar un nombre'
            }
        }
    });
    $name.textContent = name;
})()