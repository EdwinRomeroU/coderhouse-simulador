
/********************* Sección de código para definir los arreglos ****************************/

// Arreglo de palabras para el simulador
const palabras = ["javascript", "algoritmos", "desarrollo", "componente", "navegador", "procesador", "aplicacion", "funcion", "variable", "programacion"];

// Palabra seleccionada al azar para que el usuario la adivine
let palabraSeleccionada = [];

// Arreglo para almacenar las letras adivinadas por el usuario
const usuarioAdivina = [];

//Arreglo para almacenar las letras que el usuario ingresó y que no están en la palabra
const usuarioNoAdivina = [];


/********************* Sección de código para definir las variables ****************************/

// Cantidad de intentos que el usuario tiene para adivinar la palabra
const cantidadIntentos = 15;

// Variable para contar los intentos del usuario
let usuarioIntentos;

// Variable para controlar si el usuario ha adivinado la palabra
let usuarioAdivino = false;


/********************* Sección de código para definir las funciones ****************************/

// Funciòn para inicializar el juego
function iniciarJuego() {
    // Selecciono la palabra al azar del arreglo de palabras
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    console.log("Palabra seleccionada:", palabraSeleccionada);
    // Intentos en 1
    usuarioIntentos = 1;
    // Inicializo el arreglo de letras adivinadas con guiones bajos
    usuarioAdivina.splice(0, usuarioAdivina.length);
    rellenarUsuarioAdivina();
    // Listado de letras no adivinadas en blanco
    usuarioNoAdivina.splice(0, usuarioNoAdivina.length);
    // Reinicio el estado de adivinanza del usuario
    usuarioAdivino = false;
    // Muestro el mensaje inicial al usuario
    document.getElementById("mensaje").innerText = "¡¡¡ Buena Suerte !!!";
}

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

// Función para actualizar el arreglo de letras adivinadas con la letra ingresada por el usuario
function actualizarUsuarioAdivina(letra) {
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
            usuarioAdivina[i] = letra;
        }
    }
}

function mostrarAvance(mensaje){
    let aviso = "Avance del usuario:\nPalabra: " + usuarioAdivina.join(" ") + "\nIntentos: " + usuarioIntentos + "\nLetras no adivinadas: " + usuarioNoAdivina.join(", ");
    switch (mensaje) {
        case "adivino":
            aviso = "¡¡¡ FELICIDADES !!! Has adivinado la palabra: " + palabraSeleccionada + "\n" + aviso;
            break;
        case "esta":
            aviso = "¡Bien hecho! La letra está en la palabra.\n\n" + aviso;
            break;
        case "noesta":
            aviso = "Lo siento, la letra no está en la palabra.\n\n" + aviso;
            break;
        case "fallo":
            aviso = "Has agotado tus intentos. La palabra era: " + palabraSeleccionada + "\n\n" + aviso;
            break;
        default:
            aviso = "\n\nAún no has adivinado la palabra.";
    }
    alert(aviso);
}


/********************* Sección principal del simulador ****************************/
function iniciarSimulacion() {

    // Inicializo el juego
    iniciarJuego();

    // Ciclo principal del simulador
    do {

        // Prompt para capturar la letra ingresada por el usuario
        let usuarioLetra = prompt("Palabra: " + usuarioAdivina.join(" ") + "\n\nIngresa una letra:");

        // Convierto la letra en minúscula para mejorar la comparación
        usuarioLetra = usuarioLetra.toLowerCase();

        // Si el usuario ingresa la palabra salir, se cancela el juego
        if (usuarioLetra === "salir") {
            alert("Juego cancelado.");
            break;
        }

        // Validación para asegurarse de que el usuario ingrese una letra y no otro caracter
        let letravalida = /^[a-zA-Z]$/.test(usuarioLetra);

        // Verifico si la letra es válida
        if (!letravalida) {

            // Si la letra no es válida, muestro un mensaje de error
            alert("Por favor, ingresa una letra válida.");
            continue;

        } else {

            if (letraEnPalabra(usuarioLetra)) {

                // Si la letra está en la palabra, verifico si ya ha sido adivinada
                if (!usuarioAdivina.includes(usuarioLetra)) {
                    // Si la letra está en la palabra, actualizo el arreglo de letras adivinadas
                    actualizarUsuarioAdivina(usuarioLetra);
                } else {
                    alert("Ya has adivinado esta letra.");
                    continue;
                }

                // Verifico si el usuario ha adivinado la palabra
                if (usuarioAdivinoPalabra()) {
                    usuarioAdivino = true;
                     // felicita al usuario por ganar y muentra el avance final
                    mostrarAvance("adivino");
                    document.getElementById("mensaje").innerText = "¡Felicidades! Has adivinado la palabra: " + palabraSeleccionada;
                    document.getElementById("mensaje").style.color = "blue"; // Cambia el color del texto a verde
                } else {
                    // Muestra el avance actual del usuario
                    mostrarAvance("esta");
                }

            } else {

                // Si la letra no está en la palabra, verifico si ya ha sido intentada
                if (!usuarioNoAdivina.includes(usuarioLetra)) {
                    // Si la letra no está en la palabra, la agrego al arreglo de letras no adivinadas
                    usuarioNoAdivina.push(usuarioLetra);
                    // Muestra el avance actual del usuario
                    mostrarAvance("noesta"); 
                }
                else {
                    alert("Ya has intentado con esta letra. La letra no está en la palabra");
                    continue;
                }
            }  

        }

        console.log("Letras adivinadas:", usuarioAdivina);
        console.log("Letras No adivinadas:", usuarioNoAdivina);

        // Verifico si el usuario ha agotado sus intentos  
        if (usuarioIntentos >= cantidadIntentos) {
            mostrarAvance("fallo");
            document.getElementById("mensaje").innerText = "Haz superado la cantidad de intentos permitidos. La palabra era: " + palabraSeleccionada;
            document.getElementById("mensaje").style.color = "red";
            break;
        }

        // Incremento el contador de intentos del usuario
        usuarioIntentos++;
        console.log("Intentos del usuario:", usuarioIntentos);

    } while (!usuarioAdivino);
}