public enum Jugada {
    PIEDRA, PAPEL, TIJERA;

    public static String determinarGanador(Jugada jugador, Jugada computadora) {
        if (jugador == computadora) {
            return "EMPATE";
        } else if ((jugador == PIEDRA && computadora == TIJERA) ||
                   (jugador == PAPEL && computadora == PIEDRA) ||
                   (jugador == TIJERA && computadora == PAPEL)) {
            return "GANASTE";
        } else {
            return "PERDISTE";
        }
    }
}