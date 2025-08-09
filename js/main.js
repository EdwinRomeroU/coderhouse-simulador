
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
    let palabra = "Palabra: " + usuarioAdivina.join(" ");
    let aviso = "Intentos: " + usuarioIntentos + "\nLetras no adivinadas: " + usuarioNoAdivina.join(", ");
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
    document.getElementById("palabraOculta").innerText = palabra;
    document.getElementById("mensajeAvance").innerText = aviso;
}

/********************* Sección de código para habilitar el formulario ****************************/
function habilitarFormulario() {
    // Habilito el contenedor del formulario
    document.getElementById("simuladorContainer").style.display = "block";
    // Muestro la palabra oculta al usuario
    document.getElementById("palabraOculta").innerText = "Palabra: " + usuarioAdivina.join(" ");
}

/********************* Sección de código para deshabilitar el formulario ****************************/
function deshabilitarFormulario() {
    // Habilito el contenedor del formulario
    document.getElementById("simuladorContainer").style.display = "none";
}

function adivinarLetra() {

    // Obtengo la letra ingresada por el usuario
    let usuarioLetra = document.getElementById("letraInput").value.trim();

    // Si el usuario ingresa la palabra salir, se cancela el juego
        if (usuarioLetra === "salir") {
            deshabilitarFormulario();
            return;
        }

        // Validación para asegurarse de que el usuario ingrese una letra y no otro caracter
        let letravalida = /^[a-zA-Z]$/.test(usuarioLetra);

        // Verifico si la letra es válida
        if (!letravalida) {

            // Si la letra no es válida, muestro un mensaje de error
            document.getElementById("mostrarMensaje").innerText = "Por favor, ingresa una letra válida.";

        } else {

            if (letraEnPalabra(usuarioLetra)) {

                // Si la letra está en la palabra, verifico si ya ha sido adivinada
                if (!usuarioAdivina.includes(usuarioLetra)) {
                    // Si la letra está en la palabra, actualizo el arreglo de letras adivinadas
                    actualizarUsuarioAdivina(usuarioLetra);
                } else {
                    document.getElementById("mostrarMensaje").innerText = "Ya has adivinado esta letra.";
                    return;
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
                    document.getElementById("mostrarMensaje").innerText = "Ya has intentado con esta letra. La letra no está en la palabra.";
                    return;
                }
            }  

            console.log("Letras adivinadas:", usuarioAdivina);
            console.log("Letras No adivinadas:", usuarioNoAdivina);

            // Verifico si el usuario ha agotado sus intentos  
            if (usuarioIntentos >= cantidadIntentos) {
                mostrarAvance("fallo");
                document.getElementById("mensaje").innerText = "Haz superado la cantidad de intentos permitidos. La palabra era: " + palabraSeleccionada;
                document.getElementById("mensaje").style.color = "red";
                return;
            }

            // Incremento el contador de intentos del usuario
            usuarioIntentos++;
            // Limpio el campo de entrada de texto
            document.getElementById("letraInput").value = "";
            console.log("Intentos del usuario:", usuarioIntentos);

        }


}

/********************* Sección de Local Storage *********************************************/
function almacenarLocalStorage() {
    // Almaceno los datos del usuario en el Local Storage
    if(!usuarioAdivino && usuarioIntentos > 1){
        localStorage.setItem("palabraSeleccionada", palabraSeleccionada);
        localStorage.setItem("usuarioAdivina", JSON.stringify(usuarioAdivina));
        localStorage.setItem("usuarioNoAdivina", JSON.stringify(usuarioNoAdivina));
        localStorage.setItem("usuarioIntentos", usuarioIntentos);
    } else {
        localStorage.clear();
    }
}

/********************* Sección principal del simulador ****************************/
function iniciarSimulacion() {

    const datosGuardados = localStorage.getItem("palabraSeleccionada");
    if (datosGuardados) {
        const continuar = prompt("¡Bienvenido de nuevo! ¿Quieres continuar con el juego anterior? (Escribe 's' para continuar o 'n' para iniciar un nuevo juego)");
        
        if (continuar === "s") {
            // Si hay datos guardados, los cargo en las variables correspondientes
            palabraSeleccionada = localStorage.getItem("palabraSeleccionada");
            usuarioAdivina.push(...JSON.parse(localStorage.getItem("usuarioAdivina")));
            usuarioNoAdivina.push(...JSON.parse(localStorage.getItem("usuarioNoAdivina")));
            usuarioIntentos = parseInt(localStorage.getItem("usuarioIntentos"));
            
            // Muestro el mensaje inicial al usuario
            document.getElementById("mensaje").innerText = "¡¡¡ Bienvenido de nuevo !!! Continúa adivinando la palabra.";
            document.getElementById("mensaje").style.color = "black"; // Cambia el color
        } else if (continuar === "n") {
            // Si el usuario no quiere continuar, inicio un nuevo juego
            document.getElementById("mensajeAvance").innerText = "";
            document.getElementById("mensaje").innerText = "¡Nuevo juego iniciado!";
            localStorage.clear();
            iniciarJuego();
        } else {
            alert("Opción no válida. Por favor, escribe 's' para continuar o 'n' para iniciar un nuevo juego.");
            return; // Salgo de la función para que el usuario pueda intentar de nuevo
        }
    }
    else {
        // Si no hay datos guardados, inicio un nuevo juego
        iniciarJuego();
    }

    // Habilito el contenedor del formulario
    habilitarFormulario();

}

/********************* Sección salir ****************************/
function salir() {
    // Almaceno los datos del usuario en el Local Storage
    almacenarLocalStorage();
    // Deshabilito el formulario y muestro un mensaje de agradecimiento
    deshabilitarFormulario();
    let aviso = "Gracias por participar.";
}