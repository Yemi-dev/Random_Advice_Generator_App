class Generator {
getAdvice(){
    async function run(){
        const adviceResponse = await fetch(`https://api.adviceslip.com/advice`);
        const advice = await adviceResponse.json();
        return advice.slip
    }
    return run()
    }
}

class UI {
    constructor(){
        this.adviceID = document.querySelector('.advice-id');
        this.adviceContent = document.querySelector('.advice-content');
        this.loader = document.querySelector('.loader');
    }
    updateAdvice(advice){
        this.adviceID.innerHTML = `ADVICE #${advice.id}`;
        this.adviceContent.innerHTML =`"${advice.advice}"`
    }
    load(){
        this.loader.classList.remove('d-none')
    }
    stopLoad(){
        this.loader.classList.add('d-none')
    }
}

const generator = new Generator;
const ui = new UI;
 function generateAdvice(e){
 const rollDice = e.target;
   if (rollDice){
      generator.getAdvice().then ( data => {
          if (data){
              ui.updateAdvice(data)
          } else{
              ui.load();
          }
      })
   }
}

function getResponse(){
    let currentAdvice = localStorage.getItem('id');
    console.log(currentAdvice);
    ui.load();
    generator.getAdvice().then ( data => {
        if (data){
            ui.stopLoad();
            localStorage.setItem('id' , data.id)
            ui.updateAdvice(data);
        } else{
            ui.load();
        }
    })
}

document.querySelector('.dice').addEventListener('click', generateAdvice);
window.document.addEventListener('DOMContentLoaded', getResponse)


