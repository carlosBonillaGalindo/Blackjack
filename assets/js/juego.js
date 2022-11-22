let deck = [];
let puntosJugardor = 0;
let puntosComputadora = 0;

//Referencias HTML

btnPedir   = document.querySelector('#btnPedir');
btnDetener = document.querySelector('#btnDetener');
btnNuevo   = document.querySelector('#btnNuevo');

puntosHTML = document.querySelectorAll('small');
divCartasJugador = document.querySelector('#jugador-cartas');
divCartasComputadora = document.querySelector('#computadora-cartas');

const tipos =  ['C','D','H','S'];
const especiales =  ['A','J','Q','K'];

const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for (let tipo of tipos){
            deck.push ( i + tipo );
        }
    }
    for ( let tipo of tipos ){
        for( let especial of especiales){
            deck.push( especial+ tipo )
        }
    }
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

crearDeck();

// Esta funcion permite pedir una carta

const pedirCarta  = () => {

    if (deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    let carta = deck.pop();
    return carta
}


//Valor de la carta 

const valorCarta = ( carta ) =>{
    const valor = carta.substring(0, carta.length - 1 );
    return (isNaN( valor )) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

//Turno Computadora

const turnoComputadora = ( puntosMinimos ) =>{
    do{
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }
    }while( puntosComputadora < puntosMinimos );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ){
            alert('Nadie Gana');
        }else if ( puntosMinimos > 21 ){
            alert('Computadora gana');
        }else if ( puntosComputadora > 21){
            alert('Jugador gana');
        }else{
            alert('Computadora gana');
        }
    }, 500);
    


}

//Turno Jugador

btnPedir.addEventListener('click', () => {
     const carta = pedirCarta();

     puntosJugardor = puntosJugardor + valorCarta( carta );
     puntosHTML[0].innerText = puntosJugardor;

    //  <img class="carta" src="./assets/cartas/10C.png" alt="">

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugardor > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugardor );
    }else if(puntosJugardor === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugardor );
    }

});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugardor );
});

btnNuevo.addEventListener('click', () =>{
    console.clear();
    deck = [];
    deck = crearDeck();
    
    btnPedir.disabled   = false;
    btnDetener.disabled = false;

    puntosJugardor    = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = '';
    
});