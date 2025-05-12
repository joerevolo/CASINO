const cartas = [
  "img/1/1.jpg", "img/1/2.jpg", "img/1/3.jpg", "img/1/4.jpg", "img/1/5.jpg",
  "img/1/6.jpg", "img/1/7.jpg", "img/1/8.jpg", "img/1/9.jpg", "img/1/10.jpg",
  "img/1/11.jpg", "img/1/12.jpg", "img/1/13.jpg"
];

function obtenerValorCarta(path) {
  const nombre = path.split("/").pop().split(".")[0];
  return parseInt(nombre);
}

function jugar() {
  const carta1 = cartas[Math.floor(Math.random() * cartas.length)];
  const carta2 = cartas[Math.floor(Math.random() * cartas.length)];

  document.getElementById("card1").src = carta1;
  document.getElementById("card2").src = carta2;

  const valor1 = obtenerValorCarta(carta1);
  const valor2 = obtenerValorCarta(carta2);

  let resultado = "";
  if (valor1 > valor2) {
    resultado = "¡Jugador 1 gana!";
  } else if (valor2 > valor1) {
    resultado = "¡Jugador 2 gana!";
  } else {
    resultado = "¡Empate!";
  }

  document.getElementById("resultado").innerText = resultado;
}