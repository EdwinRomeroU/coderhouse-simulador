const palabras = ["javascript", "algoritmos", "desarrollo", "componente", "navegador", "procesador", "aplicacion", "funcion", "variable", "programacion"];

const palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
let usuarioAdivino = false;

do {
    
    let usuarioLetra = prompt("Ingresa una letra:");

    let letravalida = /^[a-zA-Z]$/.test(usuarioLetra);

    if (!letravalida) {
        console.log("Por favor, ingresa una letra válida.");
        continue;
    } else {
        usuarioLetra = usuarioLetra.toLowerCase();
    }


} while (!usuarioAdivino);
const letraUsuario = prompt
