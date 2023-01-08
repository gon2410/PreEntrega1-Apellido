// listas
const listadeMarcas = ["Renault", "Volkswagen", "Chevrolet"]

const listadeRenault = ["Duster", "Sandero", "Captur"]
const listadeVolkswagen = ["Vento", "Gol", "Golf"]
const listadeChevrolet = ["S10", "Onix", "Corsa"]

const listadeColores = ["Blanco Perla", "Negro", "Azul", "Rojo", "Gris", "Verde"]

// array final
let vehiculoFinal = [];

// toma una lista como parametro y el tipo (Marca, Modelo o Color) e imprime cada item
function mostrarLista(lista, tipo) {
    console.log("Lista de " + tipo + ":");

    for (let i = 0; i < lista.length; i++) {
        console.log(lista[i])
    }
}

// pide entrada a usuario y verifica si existe en la lista que toma como parametro
function eleccionDeUsuario(lista, tipo) {
    let entrada = "Elegir " + tipo + ":";

    let eleccionUsuario = prompt(entrada)
    while (lista.includes(eleccionUsuario) == false) {
        console.log("Respuesta inválida. Recuerde las mayusculas.")
        eleccionUsuario = prompt(entrada);
    }

    return eleccionUsuario;
}

// mostrando lista de marcas
mostrarLista(listadeMarcas, "Marcas")

let marcaElegida = eleccionDeUsuario(listadeMarcas, "Marca")
console.log("Marca elegida: " + marcaElegida)
vehiculoFinal.push(marcaElegida);

let modeloElegido;

switch (marcaElegida) {
    case "Renault":
        mostrarLista(listadeRenault, "Modelos")
        modeloElegido = eleccionDeUsuario(listadeRenault, "Modelo")
        break;
    case "Volkswagen":
        mostrarLista(listadeVolkswagen, "Modelos")
        modeloElegido = eleccionDeUsuario(listadeVolkswagen, "Modelo")
        break;
    case "Chevrolet":
        mostrarLista(listadeChevrolet, "Modelos")
        modeloElegido = eleccionDeUsuario(listadeChevrolet, "Modelo")
        break;
    default:
        break;
}

console.log("Modelo elegido: " + modeloElegido);
vehiculoFinal.push(modeloElegido);

mostrarLista(listadeColores, "Colores");

let colorElegido = eleccionDeUsuario(listadeColores, "Color");
console.log("Color elegido: " + colorElegido);
vehiculoFinal.push(colorElegido);

alert("VEHICULO FINAL ELEGIDO: Marca: " + vehiculoFinal[0] + " - Modelo: " + vehiculoFinal[1] + " - Color: " + vehiculoFinal[2]);