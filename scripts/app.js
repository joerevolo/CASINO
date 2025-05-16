class Juego21 {
    constructor() {
        // Estado inicial del juego
        this.cartaCasa1 = null;
        this.mazo = [];
        this.valorJugador = 0;
        this.valorCasa = 0;

        // Referencias a elementos del DOM
        this.contenedorJugador = document.getElementById("contenedorJugador");
        this.contenedorCasa = document.getElementById("contenedorCasa");
        this.btnPedir = document.getElementById("btnPedir");
        this.btnPlantarse = document.getElementById("btnPlantarse");
        this.btnJugar = document.getElementById("btnJugar");
    }

    // Agrega la imagen de la carta al contenedor correspondiente
    mostrarCarta(contenedor, carta) {
        const img = document.createElement("img");
        img.src = `img/${carta.simbolo}/${carta.valor}.jpg`;
        img.width = 50;
        img.style.marginRight = "5px";
        contenedor.appendChild(img);
    }

    // Crea el mazo completo y lo baraja
    inicializarMazo() {
        this.mazo = [];
        for (let simbolo = 1; simbolo <= 4; simbolo++) {
            for (let valor = 1; valor <= 13; valor++) {
                this.mazo.push({ valor, simbolo });
            }
        }
        // Barajar el mazo
        this.mazo.sort(() => Math.random() - 0.5);
    }

    // Devuelve el valor numérico que tiene una carta para el juego
    valorCarta(carta) {
        if (carta.valor === 1) return 11; // As vale 11
        if (carta.valor >= 10) return 10; // J, Q, K valen 10
        return carta.valor; // Resto conservan su valor
    }

    // Inicia el juego: baraja, reparte cartas iniciales y actualiza la UI
    jugar() {
        this.inicializarMazo();

        this.valorJugador = 0;
        this.valorCasa = 0;
        this.contenedorJugador.innerHTML = "";
        this.contenedorCasa.innerHTML = "";

        // Mostrar carta volteada de la casa y ocultar la del jugador
        document.getElementById("cartaVolteadaCasa").style.display = "inline";
        document.getElementById("cartaVolteadaJugador").style.display = "none";

        // Repartir una carta al jugador y una a la casa
        const cartaJugador = this.mazo.pop();
        this.cartaCasa1 = this.mazo.pop();

        this.valorJugador = this.valorCarta(cartaJugador);
        this.valorCasa = this.valorCarta(this.cartaCasa1);

        this.mostrarCarta(this.contenedorJugador, cartaJugador);
        this.contenedorCasa.innerHTML = ""; // Carta casa oculta

        // Actualizar valores en pantalla
        document.getElementById("cartaJugador").innerText = this.valorJugador;
        document.getElementById("cartaCasa").innerText = "(oculta)";

        // Mostrar/ocultar botones para el turno del jugador
        this.btnPedir.style.display = "inline-block";
        this.btnPlantarse.style.display = "inline-block";
        this.btnJugar.style.display = "none";

        document.getElementById("resultado").innerText = "Turno del Jugador";

        // Si el jugador tiene 21 de entrada, plantarse automáticamente
        if (this.valorJugador === 21) this.plantarse();
    }

    // El jugador pide una carta nueva
    pedirCartaJugador() {
        if (this.valorJugador >= 21) return;

        const nuevaCarta = this.mazo.pop();
        this.valorJugador += this.valorCarta(nuevaCarta);
        this.mostrarCarta(this.contenedorJugador, nuevaCarta);

        document.getElementById("cartaJugador").innerText = this.valorJugador;

        // Si el jugador llega a 21, se termina el juego y gana el jugador
        if (this.valorJugador === 21) {
            document.getElementById("resultado").innerText = "¡21 exacto! Gana el Jugador";
            this.mostrarSoloJugar();  // Oculta los botones de pedir y plantarse
            this.mostrarCartasCasa();  // Muestra las cartas de la casa para finalizar el juego
        }
        // Si el jugador se pasa de 21, se determina que la casa gana
        else if (this.valorJugador > 21) {
            document.getElementById("resultado").innerText = "Te pasaste. Gana la Casa";
            this.mostrarCartasCasa();  // Muestra las cartas de la casa para finalizar el juego
            this.mostrarSoloJugar();   // Oculta los botones de pedir y plantarse
        }
    }

    // El jugador decide plantarse y le toca a la casa jugar
    plantarse() {
        document.getElementById("cartaVolteadaCasa").style.display = "none";
        this.contenedorCasa.innerHTML = "";
        this.mostrarCarta(this.contenedorCasa, this.cartaCasa1);

        // La casa juega hasta que su valor sea 21 o más
        this.jugarCasa();
    }

    // La casa juega automáticamente hasta que su valor sea 21 o más
    jugarCasa() {
        // La casa sigue jugando hasta que su valor sea 21 o más
        while (this.valorCasa < 17) {  // La casa sigue jugando hasta tener al menos 17
            const nuevaCarta = this.mazo.pop();
            this.valorCasa += this.valorCarta(nuevaCarta);
            this.mostrarCarta(this.contenedorCasa, nuevaCarta);
            document.getElementById("cartaCasa").innerText = this.valorCasa;
        }

        // Finaliza el juego y determina al ganador
        this.terminarJuego();
    }

    // Finaliza el juego y muestra el resultado final
    terminarJuego() {
        let resultado = "";

        if (this.valorJugador > 21) {
            resultado = "Te pasaste. Gana la Casa 😒";
        } else if (this.valorCasa > 21) {
            resultado = "Casa se pasó. Gana el Jugador😊";
        } else if (this.valorJugador === 21) {
            resultado = "¡21! Gana el Jugador😎";  // El jugador ya ha ganado al llegar a 21
        } else if (this.valorCasa === 21) {
            resultado = "Casa tiene 21. Gana la Casa😢";
        } else if (this.valorJugador > this.valorCasa) {
            resultado = "Gana el Jugador😁";
        } else if (this.valorCasa > this.valorJugador) {
            resultado = "Gana la Casa😒";
        } else {
            resultado = "Empate";
        }

        document.getElementById("resultado").innerText = resultado;
        this.mostrarSoloJugar();
    }

    // Muestra las cartas de la casa cuando termina el juego o jugador pierde
    mostrarCartasCasa() {
        // No mostrar la carta de la casa si el jugador ganó con 21 exacto
        if (this.valorJugador === 21) {
            this.contenedorCasa.innerHTML = "";
            document.getElementById("cartaCasa").innerText = "(oculta)";
        } else {
            document.getElementById("cartaVolteadaCasa").style.display = "none";
            this.contenedorCasa.innerHTML = "";
            this.mostrarCarta(this.contenedorCasa, this.cartaCasa1);
            document.getElementById("cartaCasa").innerText = this.valorCasa;
        }
    }

    // Oculta los botones pedir/plantarse y muestra solo el botón jugar
    mostrarSoloJugar() {
        this.btnPedir.style.display = "none";
        this.btnPlantarse.style.display = "none";
        this.btnJugar.style.display = "inline-block";
    }
}

// Crear instancia del juego
const juego21 = new Juego21();

// Conectar funciones globales a los botones para que llamen los métodos del juego
function jugar() {
    juego21.jugar();
}
function pedirCartaJugador() {
    juego21.pedirCartaJugador();
}
function plantarse() {
    juego21.plantarse();
}