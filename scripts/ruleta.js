class Ruleta {
    constructor() {
        this.numeros = Array.from({ length: 37 }, (_, i) => i);
        this.coloresR = this.generarColores();
    }

    girar() {
        const index = Math.floor(Math.random() * this.numeros.length);
        const numero = this.numeros[index];
        const color = this.coloresR[numero];
        return { numero, color };
    }

    generarColores() {
        const rojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        const negros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        const colores = {};
        for (let i = 0; i <= 36; i++) {
            if (i === 0) colores[i] = "verde";
            else if (rojos.includes(i)) colores[i] = "rojo";
            else colores[i] = "negro";
        }
        return colores;
    }
}

class Jugador {
    constructor(saldo = 1000) {
        this.saldo = saldo;
    }

    apostar(monto) {
        if (monto > this.saldo) return false;
        this.saldo -= monto;
        return true;
    }

    ganar(monto) {
        this.saldo += monto;
    }
}

class Apuesta {
    constructor(tipo, valor, monto) {
        this.tipo = tipo;
        this.valor = valor;
        this.monto = monto;
    }

    evaluar(resultado) {
        if (this.tipo === "numero") return resultado.numero == this.valor;
        if (this.tipo === "color") return resultado.color === this.valor.toLowerCase();
        if (this.tipo === "paridad") {
            if (resultado.numero === 0) return false;
            return (resultado.numero % 2 === 0 && this.valor === "par") ||
                   (resultado.numero % 2 !== 0 && this.valor === "impar");
        }
        return false;
    }

    multiplicador() {
        if (this.tipo === "numero") return 36;
        if (this.tipo === "color" || this.tipo === "paridad") return 2;
        return 0;
    }
}

class JuegoRuleta {
    constructor() {
        this.jugador = null;
        this.ruleta = new Ruleta();

        document.getElementById("tipo").addEventListener("change", () => this.act());
        window.onload = () => {
            document.getElementById("valor").style.display = "none";
        };
    }

    iniciarJuego() {
        const saldoInicial = parseInt(document.getElementById("saldoInicial").value);
        if (isNaN(saldoInicial) || saldoInicial <= 0) {
            alert("Ingresa un saldo válido.");
            return;
        }

        this.jugador = new Jugador(saldoInicial);
        document.getElementById("saldo").textContent = this.jugador.saldo;
        document.getElementById("inicio").style.display = "none";
        document.getElementById("juego").style.display = "block";
    }

    act() {
        const tipo = document.getElementById("tipo").value;
        const valorTexto = document.getElementById("valorTxt");
        const valorSelect = document.getElementById("valor");

        if (tipo === "color") {
            valorSelect.style.display = "inline";
            valorTexto.style.display = "none";
            valorSelect.innerHTML = `
                <option value="rojo">Rojo</option>
                <option value="negro">Negro</option>
            `;
        } else if (tipo === "paridad") {
            valorSelect.style.display = "inline";
            valorTexto.style.display = "none";
            valorSelect.innerHTML = `
                <option value="par">Par</option>
                <option value="impar">Impar</option>
            `;
        } else {
            valorSelect.style.display = "none";
            valorTexto.style.display = "inline";
        }
    }

    apostar() {
        const monto = parseInt(document.getElementById("monto").value);
        const tipo = document.getElementById("tipo").value;

        let valor;
        if (tipo === "color" || tipo === "paridad") {
            valor = document.getElementById("valor").value.toLowerCase();
        } else {
            valor = document.getElementById("valorTxt").value.toLowerCase();
        }

        if (isNaN(monto) || monto <= 0 || valor === "") {
            this.mostrarMensaje("Ingresa un monto y un valor válidos.");
            return;
        }

        if (monto > this.jugador.saldo || !this.jugador.apostar(monto)) {
            this.mostrarMensaje("No tienes suficiente saldo.");
            return;
        }

        const apuesta = new Apuesta(tipo, valor, monto);
        const resultado = this.ruleta.girar();
        const gano = apuesta.evaluar(resultado);

        let mensaje = `Salió el ${resultado.numero} (${resultado.color}). `;
        let ganancia = 0;

        if (gano) {
            ganancia = monto * apuesta.multiplicador();
            this.jugador.ganar(ganancia);
            mensaje += `¡Ganaste ${ganancia - monto}!`;
        } else {
            mensaje += `Perdiste ${monto}.`;
        }

        document.getElementById("saldo").textContent = this.jugador.saldo;
        this.mostrarMensaje(mensaje);
    }

    mostrarMensaje(msg) {
        document.getElementById("resultado").textContent = msg;
    }
}

//instancia
const juego = new JuegoRuleta();
//vinculacion
function iniciarJuego() {
    juego.iniciarJuego();
}

function apostar() {
    juego.apostar();
}

