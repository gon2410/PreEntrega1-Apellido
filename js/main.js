// listas
const listadeColores = ["Blanco Perla", "Negro", "Azul", "Rojo", "Gris", "Verde"];
const listadeColoresAsientos = ["Negro", "Gris", "Verde", "Rojo"];
const listaLlantas = ["Aleacion", "Chapa(Tazas)"]

class Auto{
    constructor(id, marca, modelo, color, colorAsientos, llantas, precio) {
        this.id = id
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.colorAsientos = colorAsientos;
        this.llantas = llantas;
        this.precio = precio
    }

    display() {
        return "\nMarca: " + this.marca + "\n - Modelo: " +
                this.modelo + "\n - Color: " + this.color +
                "\n - Color de Asientos: " + this.colorAsientos +
                "\n - Llantas: " + this.llantas + "\n - Precio: $" +
                this.precio;
    }

    verificar() {
        if (this.llantas == "Aleacion") {
            this.precio += 100_000;
        }
    }
}

let renaultDuster = new Auto(0, "Renault", "Duster", "Negro", "Negro", "Chapa", 1_000_000);
let renaultSandero = new Auto(1, "Renault", "Sandero", "Negro", "Negro", "Chapa", 950_000);
let renaultCaptur = new Auto(2, "Renault", "Captur", "Negro", "Negro", "Chapa", 1_100_000);

let volkswagenVento = new Auto(3, "Volkswagen", "Vento", "Negro", "Negro", "Chapa", 2_000_000);
let volkswagenGol = new Auto(4, "Volkswagen", "Gol", "Negro", "Negro", "Chapa", 800_000);
let volkswagenGolf = new Auto(5, "Volkswagen", "Golf", "Negro", "Negro", "Chapa", 1_250_000);

let chevroletS10 = new Auto(6, "Chevrolet", "S10", "Negro", "Negro", "Chapa", 1_500_000);
let chevroletOnix = new Auto(7, "Chevrolet", "Onix", "Negro", "Negro", "Chapa", 850_000);
let chevroletCorsa = new Auto(8, "Chevrolet", "Corsa", "Negro", "Negro", "Chapa", 700_000);

let arrayAutos = [renaultDuster, renaultSandero, renaultCaptur,
                volkswagenVento, volkswagenGol, volkswagenGolf,
                chevroletS10, chevroletOnix, chevroletCorsa];

// eleccion inicial. Lista de autos.
function elegirAuto(lista) {
    let promptString = " ";
    for (let i = 0; i < lista.length; i++) {
        promptString += "\n" + i + " - " + lista[i].display() + "\n";
    }

    // validando ingreso
    let eleccionUsuario = prompt(promptString + "\n Elegir un vehiculo:");
    while ((eleccionUsuario.length == 0) || (!isNaN(eleccionUsuario) == false) || (parseInt(eleccionUsuario) < 0) || (parseInt(eleccionUsuario) > lista.length-1)) {
        eleccionUsuario = prompt(promptString + "\n Respuesta invalida. Intente de nuevo:");
    }

    return lista[eleccionUsuario];
}

// toma una lista como parametro y el tipo (Marca, Modelo o Color) e imprime cada item
function eleccionDeUsuario(lista, tipo) {
    let tipoListaString = ("Lista de " + tipo + ":");

    let listaString = ""

    for (let i = 0; i < lista.length; i++) {
        listaString += i + " - " + lista[i] + "\n";
    }

    let eleccionUsuario = prompt(tipoListaString + "\n\n" + listaString + "\nEliga una opcion: ")

    // validando ingreso
    while ((eleccionUsuario.length == 0) || (!isNaN(eleccionUsuario) == false) || (parseInt(eleccionUsuario) < 0) || (parseInt(eleccionUsuario) > lista.length-1)) {
        eleccionUsuario = prompt(tipoListaString + "\n\n" + listaString + "\nRespuesta invalida. Intente de nuevo: ")
    }

    return lista[parseInt(eleccionUsuario)]
}

// eligiendo auto
let autoElegido = elegirAuto(arrayAutos);

// eligiendo color
let colorElegido = eleccionDeUsuario(listadeColores, "Colores");
autoElegido.color = colorElegido;

// eligiendo color de asientos
let colorAsientosElegido = eleccionDeUsuario(listadeColoresAsientos, "Colores de Asientos");
autoElegido.colorAsientos = colorAsientosElegido;

// eligiendo llantas
let llantasElegidas = eleccionDeUsuario(listaLlantas, "Llantas");
autoElegido.llantas = llantasElegidas;
autoElegido.verificar();

alert("VEHICULO FINAL ELEGIDO: " + autoElegido.display());