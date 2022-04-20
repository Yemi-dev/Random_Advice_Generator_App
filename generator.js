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
    }
    updateAdvice(advice){
        this.adviceID.innerHTML = `${advice.id}`;
        this.adviceContent.innerHTML =`"${advice.advice}"`
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
          }
      })
   }
}

document.querySelector('.dice').addEventListener('click', generateAdvice);


