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



const originalDeck = createDeck()
const horses = originalDeck.filter(c => c.nombre.includes('11'))
const deck = shuffle(originalDeck.filter(c => !c.nombre.includes('11')))

console.log(deck)

  const mesa = document.getElementById('mesa');
  const btn = document.getElementById('barajearBtn');

  const totalCartas = 20;
  const cartas = [];

  for (let i = 0; i < totalCartas; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta', 'reverso');
    carta.style.zIndex = i;
    mesa.appendChild(carta);
    cartas.push(carta);
  }

  function barajear() {
    btn.disabled = true; 
    const mitad = Math.floor(totalCartas / 2);
    const izquierda = cartas.slice(0, mitad);
    const derecha = cartas.slice(mitad);


    izquierda.forEach((carta, i) => {
      carta.style.transform = `translateX(-60px)`;
    });
    derecha.forEach((carta, i) => {
      carta.style.transform = `translateX(60px)`;
    });

    setTimeout(() => {
      izquierda.forEach((carta, i) => {
        carta.style.transform = `translateX(-20px)`;
      });
      derecha.forEach((carta, i) => {
        carta.style.transform = `translateX(20px)`;
      });
    }, 800);

  setTimeout(() => {
      let delay = 0;
      for (let i = 0; i < mitad; i++) {
        const cartaIzq = izquierda[i];
        const cartaDer = derecha[i];

        setTimeout(() => {
          cartaIzq.style.transform = 'translate(0, 0)';
          cartaIzq.style.top = `${60 + i * 2}px`;
          cartaIzq.style.zIndex = totalCartas + i;

          setTimeout(() => {
            cartaDer.style.transform = 'translate(0, 0)';
            cartaDer.style.top = `${65 + i * 2}px`;
            cartaDer.style.zIndex = totalCartas + i + 1;
          }, 150);
        }, delay);

        delay += 200;
      }
    }, 1600);

    setTimeout(() => {
      cartas.forEach((carta, i) => {
        carta.style.transition = 'transform 0.5s ease, top 0.5s ease';
        carta.style.transform = 'translate(0, 0) rotate(0deg)';
        carta.style.top = '40px';
        carta.style.zIndex = i;
      });
      btn.disabled = false; 
    }, 3700);
  }

  btn.addEventListener('click', barajear);