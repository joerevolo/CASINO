let puntuacionUsuario = 0;
let puntuacionComputadora = 0;

function obtenerJugadaUsuario() {
     // Esta función ya no es necesaria con botones en HTML
        return null;
    }

    function obtenerJugadaComputadora() {
        const opciones = ["piedra", "papel", "tijera"];
        const indice = Math.floor(Math.random() * opciones.length);
        return opciones[indice];
    }

    function determinarGanador(jugador, computadora) {
        if (jugador === computadora) {
            return "Empate";
        } else if (
            (jugador === "piedra" && computadora === "tijera") ||
            (jugador === "papel" && computadora === "piedra") ||
            (jugador === "tijera" && computadora === "papel")
        ) {
            return "¡Ganaste!";
        } else {
            return "¡La casa gana!";
        }
    }

    function mostrarEleccionCasa(eleccion) {
        const houseChoiceDiv = document.getElementById("houseChoice");
        houseChoiceDiv.innerHTML = `<img src="img/${eleccion}.png" alt="${eleccion}">`;
    }

    function actualizarResultado(resultado) {
        const roundResultDiv = document.getElementById("roundResult");
        roundResultDiv.textContent = `Resultado: ${resultado}`;
    }

    function actualizarPuntuacion() {
        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Tu: ${puntuacionUsuario} - Casa: ${puntuacionComputadora}`;
    }

    function jugar(jugadaUsuario) {
        const jugadaComputadora = obtenerJugadaComputadora();
        mostrarEleccionCasa(jugadaComputadora);

        const resultado = determinarGanador(jugadaUsuario, jugadaComputadora);
        actualizarResultado(resultado);

        if (resultado === "¡Ganaste!") {
            puntuacionUsuario++;
        } else if (resultado === "¡La casa gana!") {
            puntuacionComputadora++;
        }

        actualizarPuntuacion();
    }

    // Inicializar la puntuación al cargar la página
    actualizarPuntuacion();