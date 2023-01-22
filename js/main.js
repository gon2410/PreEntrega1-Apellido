// listas
const listadeMarcas = ["Renault", "Volkswagen", "Chevrolet"];

const listadeRenault = ["Duster", "Sandero", "Captur"];
const listadeVolkswagen = ["Vento", "Gol", "Golf"];
const listadeChevrolet = ["S10", "Onix", "Corsa"];

const listadeColores = ["Blanco Perla", "Negro", "Azul", "Rojo", "Gris", "Verde"];

const listadeColoresAsientos = ["Negro", "Gris", "Verde", "Rojo"];

const listaLlantas = ["Aleacion", "Chapa(Tazas)"]

class Auto{
    constructor(marca, modelo, color, colorAsientos, llantas) {
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.colorAsientos = colorAsientos;
        this.llantas = llantas;
    }

    display() {
        return "Marca: " + this.marca + " - Modelo: " + this.modelo + " - Color: " + this.color + " - Color de Asientos: " + this.colorAsientos + " - Llantas: " + this.llantas;
    }
}

// objeto final
let vehiculoFinal = new Auto();

// toma una lista como parametro y el tipo (Marca, Modelo o Color) e imprime cada item
function eleccionDeUsuario(lista, tipo) {
    let tipoListaString = ("Lista de " + tipo + ":");

    let listaString = ""

    for (let i = 0; i < lista.length; i++) {
        listaString += i + " - " + lista[i] + "\n";
    }

    let eleccionUsuario = prompt(tipoListaString + "\n\n" + listaString + "\nEliga una opcion: ")

    // validando que el ingreso del usuario sea un numero y que no sea mayor que el largo de la lista.
    while ((eleccionUsuario.length == 0) || (!isNaN(eleccionUsuario) == false) || (parseInt(eleccionUsuario) < 0) || (parseInt(eleccionUsuario) > lista.length-1)) {
        eleccionUsuario = prompt(tipoListaString + "\n\n" + listaString + "\nRespuesta invalida. Intente de nuevo: ")
    }

    return lista[parseInt(eleccionUsuario)]
}

// eligiendo marca
let marcaElegida = eleccionDeUsuario(listadeMarcas, "Marca");
vehiculoFinal.marca = marcaElegida;


// eligiendo modelo
let modeloElegido;

switch (marcaElegida) {
    case "Renault":
        modeloElegido = eleccionDeUsuario(listadeRenault, "Modelos")
        break;
    case "Volkswagen":
        modeloElegido = eleccionDeUsuario(listadeVolkswagen, "Modelos")
        break;
    case "Chevrolet":
        modeloElegido = eleccionDeUsuario(listadeChevrolet, "Modelos")
        break;
    default:
        break;
}

vehiculoFinal.modelo = modeloElegido;

// eligiendo color
let colorElegido = eleccionDeUsuario(listadeColores, "Colores");
vehiculoFinal.color = colorElegido;

// eligiendo color de asientos
let colorAsientosElegido = eleccionDeUsuario(listadeColoresAsientos, "Colores de Asientos");
vehiculoFinal.colorAsientos = colorAsientosElegido;

// eligiendo llantas
let llantasElegidas = eleccionDeUsuario(listaLlantas, "Llantas");
vehiculoFinal.llantas = llantasElegidas;

alert("VEHICULO FINAL ELEGIDO: " + vehiculoFinal.display());