// Arreglo de palabras para el simulador
const palabras = ["javascript", "algoritmos", "desarrollo", "componente", "navegador", "procesador", "aplicacion", "funcion", "variable", "programacion"];

// Palabra seleccionada al azar para que el usuario la adivine
const palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
console.log("Palabra seleccionada:", palabraSeleccionada);

// Arreglo para almacenar las letras adivinadas por el usuario
const usuarioAdivina = [];

//Arreglo para almacenar las letras que el usuario ingresó y que no están en la palabra
const usuarioNoAdivina = [];

// Variable para controlar si el usuario ha adivinado la palabra
let usuarioAdivino = rellenarUsuarioAdivina();

// Función para validar si la letra existe en la palabra seleccionada
function letraEnPalabra(letra) {
    return palabraSeleccionada.includes(letra);
}

// Función para inicializar el arreglo de letras adivinadas
function rellenarUsuarioAdivina() {
    // Rellenar el arreglo de letras adivinadas con guiones bajos
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        usuarioAdivina[i] = "_";
    }
}

// Ciclo principal del simulador
//do {
    
    // Prompt para capturar la letra ingresada por el usuario
    let usuarioLetra = prompt("Ingresa una letra:");

    // Validación para asegurarse de que el usuario ingrese una letra y no otro caracter
    let letravalida = /^[a-zA-Z]$/.test(usuarioLetra);



    // Verifico si la letra es válida
    if (!letravalida) {
        alert("Por favor, ingresa una letra válida.");
  //      continue;
    } else {
        usuarioLetra = usuarioLetra.toLowerCase();

        if (letraEnPalabra(usuarioLetra)) {
            // Si la letra está en la palabra, actualizo el arreglo de letras adivinadas
            for (let i = 0; i < palabraSeleccionada.length; i++) {
                if (palabraSeleccionada[i] === usuarioLetra) {
                    usuarioAdivina[i] = usuarioLetra;
                }
            }
        }   

    }

    console.log("Letras adivinadas:", usuarioAdivina);

//} while (!usuarioAdivino);
