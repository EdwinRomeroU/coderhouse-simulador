// Arreglo de palabras para el simulador
const palabras = ["javascript", "algoritmos", "desarrollo", "componente", "navegador", "procesador", "aplicacion", "funcion", "variable", "programacion"];

// Palabra seleccionada al azar para que el usuario la adivine
const palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
console.log("Palabra seleccionada:", palabraSeleccionada);

// Arreglo para almacenar las letras adivinadas por el usuario
const usuarioAdivina = [];

// Inicializo el arreglo de letras adivinadas con guiones bajos
rellenarUsuarioAdivina();

//Arreglo para almacenar las letras que el usuario ingresó y que no están en la palabra
const usuarioNoAdivina = [];

// Variable para controlar si el usuario ha adivinado la palabra
let usuarioAdivino = false;

// Función para validar si la letra existe en la palabra seleccionada
const letraEnPalabra = (letra) => palabraSeleccionada.includes(letra);

// Función para inicializar el arreglo de letras adivinadas
function rellenarUsuarioAdivina() {
    // Rellenar el arreglo de letras adivinadas con guiones bajos
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        usuarioAdivina[i] = "_";
    }
}

// Función para verificar si el usuario ha adivinado la palabra
const usuarioAdivinoPalabra = () => usuarioAdivina.join("") === palabraSeleccionada;

// Ciclo principal del simulador
do {
    
    // Prompt para capturar la letra ingresada por el usuario
    let usuarioLetra = prompt("Ingresa una letra:");

    // Convierto la letra en minúscula para mejorar la comparación
    usuarioLetra = usuarioLetra.toLowerCase();

    // Si el usuario ingresa la palabra salir, se cancela el juego
    if (usuarioLetra === "salir") {
        alert("Juego cancelado.");
        break; // Salir del ciclo si el usuario cancela
    }

    // Validación para asegurarse de que el usuario ingrese una letra y no otro caracter
    let letravalida = /^[a-zA-Z]$/.test(usuarioLetra);

    // Verifico si la letra es válida
    if (!letravalida) {
        alert("Por favor, ingresa una letra válida.");
  //      continue;
    } else {

        if (letraEnPalabra(usuarioLetra)) {
            // Si la letra está en la palabra, actualizo el arreglo de letras adivinadas
            for (let i = 0; i < palabraSeleccionada.length; i++) {
                if (palabraSeleccionada[i] === usuarioLetra) {
                    usuarioAdivina[i] = usuarioLetra;
                }
            }
            // Verifico si el usuario ha adivinado la palabra
            if (usuarioAdivinoPalabra()) {
                usuarioAdivino = true;
                alert("¡Felicidades! Has adivinado la palabra: " + palabraSeleccionada);
            } else {
                alert("¡Bien hecho! La letra está en la palabra.");
            }
        } else {
            // Si la letra no está en la palabra, la agrego al arreglo de letras no adivinadas
            usuarioNoAdivina.push(usuarioLetra);
            alert("Lo siento, la letra no está en la palabra.");
        }  

    }

    console.log("Letras adivinadas:", usuarioAdivina);
    console.log("Letras No adivinadas:", usuarioNoAdivina);

} while (!usuarioAdivino);
