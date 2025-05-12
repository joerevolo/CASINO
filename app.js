let cartaCasa1 = null; // carta visible de la casa
let cartaCasa2 = null; // carta oculta de la casa
let mazo = [];
let valorJugador = 0;
let valorCasa = 0;
let cartaJugadorImagen = document.getElementById("cartaJugadorImagen");
let cartaCasaImagen = document.getElementById("cartaCasaImagen");
let contenedorJugador = document.getElementById("contenedorJugador");
let contenedorCasa = document.getElementById("contenedorCasa");

function mostrarCarta(contenedor, carta) {
    let img = document.createElement("img");
    img.src = `img/${carta.simbolo}/${carta.valor}.jpg`;
    img.width = 50;
    img.style.marginRight = "5px";
    contenedor.appendChild(img);
}


function inicializarMazo() {
    mazo = [];
    for (let simbolo = 1; simbolo <= 4; simbolo++) {
        for (let valor = 1; valor <= 13; valor++) {
            mazo.push({ valor, simbolo });
        }
    }
    mazo = mazo.sort(() => Math.random() - 0.5); // Barajado aleatorio
    console.log(mazo)
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

    contenedorJugador.innerHTML = "";
    contenedorCasa.innerHTML = "";

    // Ocultar las cartas volteadas
    document.getElementById("cartaVolteadaJugador").style.display = "none";
    document.getElementById("cartaVolteadaCasa").style.display = "none";

    let carta1 = mazo.pop();
    let carta2 = mazo.pop();
    cartaCasa1 = mazo.pop(); // Quita el "let"
    cartaCasa2 = mazo.pop();

    valorJugador = valorCarta(carta1) + valorCarta(carta2);
    valorCasa = valorCarta(cartaCasa1) + valorCarta(cartaCasa2);

    mostrarCarta(contenedorJugador, carta1);
    mostrarCarta(contenedorJugador, carta2);
    mostrarCarta(contenedorCasa, cartaCasa1); // solo una visible

    document.getElementById("cartaJugador").innerHTML = valorJugador;
    document.getElementById("cartaCasa").innerHTML = valorCarta(cartaCasa1) + " (oculta)";

    if (valorJugador === 21) {
        document.getElementById("resultado").innerHTML = "¡Blackjack! Gana el Jugador";
    } else {
        document.getElementById("resultado").innerHTML = "Turno del Jugador";
    }

    // Hacer visibles los botones de "Pedir" y "Plantarse"
    document.getElementById("btnPedir").style.display = "inline-block";
    document.getElementById("btnPlantarse").style.display = "inline-block";

    // Ocultar el botón de jugar después de comenzar el juego
    document.querySelector("button[onclick='jugar()']").style.display = "none";
}




function mostrarSoloJugar() {
    // Ocultar los botones de pedir y plantarse
    document.getElementById("btnPedir").style.display = "none";
    document.getElementById("btnPlantarse").style.display = "none";
    // Mostrar el botón de jugar
    document.querySelector("button[onclick='jugar()']").style.display = "inline-block";
}

function pedirCartaJugador() {
    if (valorJugador >= 21) return;

    let nuevaCarta = mazo.pop();
    valorJugador += valorCarta(nuevaCarta);
    mostrarCarta(contenedorJugador, nuevaCarta);
    document.getElementById("cartaJugador").innerHTML = valorJugador;

    if (valorJugador > 21) {
        document.getElementById("resultado").innerHTML = "Te pasaste. Gana la Casa";
        mostrarSoloJugar();
    } else if (valorJugador === 21) {
        document.getElementById("resultado").innerHTML = "¡21 exacto! Plantarse o esperar resultado";
    }
}

function plantarse() {
    // Mostrar la carta oculta
    mostrarCarta(contenedorCasa, cartaCasa2);

    // Calcular el valor total de la casa: carta visible + carta oculta
    valorCasa = valorCarta(cartaCasa1) + valorCarta(cartaCasa2);

    // Mostrar el nuevo valor parcial
    document.getElementById("cartaCasa").innerHTML = valorCasa;

    // Si la casa tiene menos de 17, debe seguir sacando cartas
    while (valorCasa < 17) {
        let nuevaCarta = mazo.pop();
        valorCasa += valorCarta(nuevaCarta);
        mostrarCarta(contenedorCasa, nuevaCarta);
    }

    // Mostrar el valor final en pantalla
    document.getElementById("cartaCasa").innerHTML = valorCasa;

    // Evaluar quién gana
    if (valorCasa > 21 || valorJugador > valorCasa) {
        document.getElementById("resultado").innerHTML = "Gana el Jugador";
    } else if (valorJugador < valorCasa) {
        document.getElementById("resultado").innerHTML = "Gana la Casa";
    } else {
        document.getElementById("resultado").innerHTML = "Empate";
    }

    // Mostrar solo el botón de Jugar
    mostrarSoloJugar();
}

