import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { toast } from 'wc-toast'
import { shuffle } from 'lodash'


class Card {
    /**
     * 
     * @param {string} tipo_carta 
     * @param {string} nombre 
     * @param {string} img 
     */
    constructor(tipo_carta, nombre, img) {
     
       this.tipo = tipo_carta
       this.nombre = nombre
       this.img = img;
    }
}

function createDeck() {
    let tipos = ['E', 'B', 'C', 'O'];

    let mazo = []
    for (let tipo of tipos) {
        for (let i = 1; i <= 12; i++ ) {
            let carta = new Card(tipo, `${i}${tipo}`, `/cards/${i}${tipo}.jpg`)
            mazo.push(carta)
        }

    }


    return mazo;
}

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>el Caballo</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
     <div class="card">
      <button id="toast" type="button">Tostada</button>
    </div>
    
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

const toastBtn = document.querySelector('#toast')

toastBtn.addEventListener('click', () => {
    toast('click!')
})

const originalDeck = createDeck()
const horses = originalDeck.filter(c => c.nombre.includes('11'))
const deck = shuffle(originalDeck.filter(c => !c.nombre.includes('11')))

console.log(deck)

//for (let i = 0; i < deck.length; i++) {
//}



setupCounter(document.querySelector('#counter'))
