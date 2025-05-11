let mazo = [];
let valorJugador = 0;
let valorCasa = 0;
let cartaJugadorImagen = document.getElementById("cartaJugadorImagen");
let cartaCasaImagen = document.getElementById("cartaCasaImagen");

function inicializarMazo() {
    mazo = [];
    for (let simbolo = 1; simbolo <= 4; simbolo++) {
        for (let valor = 1; valor <= 13; valor++) {
            mazo.push({ valor, simbolo });
        }
    }
    mazo = mazo.sort(() => Math.random() - 0.5); // Baraja
}

function valorCarta(carta) {
    if (carta.valor === 1) return 11; // As
    if (carta.valor >= 10) return 10;
    return carta.valor;
}

function jugar() {
    inicializarMazo();

    valorJugador = 0;
    valorCasa = 0;

    let carta1 = mazo.pop();
    let carta2 = mazo.pop();
    let cartaCasa1 = mazo.pop();
    let cartaCasa2 = mazo.pop();

    valorJugador = valorCarta(carta1) + valorCarta(carta2);
    valorCasa = valorCarta(cartaCasa1) + valorCarta(cartaCasa2);

    cartaJugadorImagen.src = `img/${carta1.simbolo}/${carta1.valor}.jpg`;
    cartaCasaImagen.src = `img/${cartaCasa1.simbolo}/${cartaCasa1.valor}.jpg`;

    document.getElementById("cartaJugador").innerHTML = valorJugador;
    document.getElementById("cartaCasa").innerHTML = valorCarta(cartaCasa1) + " (oculta)";

    if (valorJugador === 21) {
        document.getElementById("resultado").innerHTML = "¡Blackjack! Gana el Jugador";
    } else {
        document.getElementById("resultado").innerHTML = "Turno del Jugador";
    }
}

function pedirCartaJugador() {
    if (valorJugador >= 21) return;

    let nuevaCarta = mazo.pop();
    valorJugador += valorCarta(nuevaCarta);
    cartaJugadorImagen.src = `img/${nuevaCarta.simbolo}/${nuevaCarta.valor}.jpg`;
    document.getElementById("cartaJugador").innerHTML = valorJugador;

    if (valorJugador > 21) {
        document.getElementById("resultado").innerHTML = "Te pasaste. Gana la Casa";
    } else if (valorJugador === 21) {
        document.getElementById("resultado").innerHTML = "¡21 exacto! Plantarse o esperar resultado";
    }
}

function plantarse() {
    while (valorCasa < 17) {
        let nuevaCarta = mazo.pop();
        valorCasa += valorCarta(nuevaCarta);
    }

    document.getElementById("cartaCasa").innerHTML = valorCasa;

    if (valorCasa > 21 || valorJugador > valorCasa) {
        document.getElementById("resultado").innerHTML = "Gana el Jugador";
    } else if (valorJugador < valorCasa) {
        document.getElementById("resultado").innerHTML = "Gana la Casa";
    } else {
        document.getElementById("resultado").innerHTML = "Empate";
    }
}
