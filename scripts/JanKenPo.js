let juego;

class JuegoJanKenPo {
  constructor(usuarioScoreElementId, computadoraChoiceElementId, resultadoElementId, puntuacionElementId) {
    this.puntuacionUsuario = 0;
    this.puntuacionComputadora = 0;
    this.opciones = ["piedra", "papel", "tijera"];
    this.usuarioScoreElement = document.getElementById(usuarioScoreElementId);
    this.computadoraChoiceElement = document.getElementById(computadoraChoiceElementId);
    this.resultadoElement = document.getElementById(resultadoElementId);
    this.puntuacionElement = document.getElementById(puntuacionElementId);
    this.inicializarPuntuacion();
    this.mostrarEleccionInicialCasa();
  }

  obtenerJugadaComputadora() {
    const indice = Math.floor(Math.random() * this.opciones.length);
    return this.opciones[indice];
  }

  determinarGanador(jugador, computadora) {
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

  mostrarEleccionComputadora(eleccion) {
    this.computadoraChoiceElement.innerHTML = `Casa: <img src="img/${eleccion}.png" alt="${eleccion}">`;
  }

  mostrarEleccionInicialCasa() {
    this.computadoraChoiceElement.textContent = "Casa: ?";
  }

  actualizarResultado(resultado) {
    this.resultadoElement.textContent = `Resultado: ${resultado}`;
  }

  actualizarPuntuacion() {
    this.puntuacionElement.textContent = `Tu: ${this.puntuacionUsuario} - Casa: ${this.puntuacionComputadora}`;
    if (this.usuarioScoreElement) {
      this.usuarioScoreElement.textContent = this.puntuacionUsuario;
    }
  }

  inicializarPuntuacion() {
    this.actualizarPuntuacion();
  }

  jugar(jugadaUsuario) {
    const jugadaComputadora = this.obtenerJugadaComputadora();
    this.mostrarEleccionComputadora(jugadaComputadora);

    const resultado = this.determinarGanador(jugadaUsuario, jugadaComputadora);
    this.actualizarResultado(resultado);

    if (resultado === "¡Ganaste!") {
      this.puntuacionUsuario++;
    } else if (resultado === "¡La casa gana!") {
      this.puntuacionComputadora++;
    }

    this.actualizarPuntuacion();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  juego = new JuegoJanKenPo("usuario-score", "houseChoice", "roundResult", "score");
});