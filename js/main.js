class Auto{
    constructor(id, marca, modelo, color, precio, coloresDisponibles, motores, motor) {
        this.id = id
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;

        this.precio = precio
        this.coloresDisponibles = coloresDisponibles;

        this.motores = motores;
        this.motor = motor;
    }

    display() {
        return "\n- Marca: " + this.marca + "\n - Modelo: " +
                this.modelo + "\n - Color: " + this.color +
                "\n - Motor: " + this.motor + "\n - Precio: $" + this.precio;
    }
}

// colores
let azul = {color: "Azul", hex: "#021742"};
let beige = {color: "Beige", hex: "#b7b3a7"};
let blanco = {color: "Blanco", hex: "#ffffff"};
let gris = {color: "Gris", hex: "#cdc9c8"};
let negro = {color: "Negro", hex: "#000000"};
let gris_oscuro = {color: "Gris_Oscuro", hex: "#333333"};
let rojo = {color: "Rojo", hex: "#823839"};


let renaultDuster = new Auto(0, "Renault", "Duster", "Negro", 1_000_000, [azul, beige, blanco, gris], [{motor: "1.6", hp: 115, torque: 150}, {motor: "1.3T", hp: 155, torque: 250}]);
let renaultSandero = new Auto(1, "Renault", "Sandero", "Negro", 950_000, [azul, blanco, gris, gris_oscuro, rojo], [{motor: "1.6", hp: 115, torque: 150}]);
let renaultCaptur = new Auto(2, "Renault", "Captur", "Negro", 1_100_000, [blanco, gris, gris_oscuro, rojo], [{motor: "1.6", hp: 115, torque: 156},{motor: "2.0", hp: 143, torque: 193}]);

let volkswagenVirtus = new Auto(3, "Volkswagen", "Virtus", "Negro", 2_000_000, [azul, blanco, gris, gris_oscuro, negro], [{motor: "1.6", hp: 110, torque: 155}, {motor: "1.4T", hp: 150, torque: 250}]);
let volkswagenPolo = new Auto(4, "Volkswagen", "Polo", "Negro", 800_000, [azul, blanco, gris, gris_oscuro, negro, rojo], [{motor: "1.6", hp: 110, torque: 155}, {motor: "1.4T", hp: 150, torque: 250}]);
let volkswagenAmarok = new Auto(5, "Volkswagen", "Amarok", "Negro", 1_250_000, [azul, beige, blanco, gris, gris_oscuro, negro], [{motor: "2.0", hp: 140, torque: 340}, {motor: "2.0", hp: 180, torque: 420}, {motor: "3.0 V6", hp: 260, torque: 580}]);

let chevroletS10 = new Auto(6, "Chevrolet", "S10", "Negro", 1_500_000, [azul, blanco, gris, negro,], [{motor: "2.8", hp: 200, torque: 500}]);
let chevroletOnix = new Auto(7, "Chevrolet", "Onix", "Negro", 850_000, [blanco, negro, rojo], [{motor: "1.0", hp: 116, torque: 160}]);
let chevroletCruze = new Auto(8, "Chevrolet", "Cruze", "Negro", 700_000, [azul, blanco, gris, negro], [{motor: "1.4", hp: 153, torque: 245}]);


let arrayAutos = [renaultDuster, renaultSandero, renaultCaptur,
                volkswagenVirtus, volkswagenPolo, volkswagenAmarok,
                chevroletS10, chevroletOnix, chevroletCruze];

for (let i = 0; i < arrayAutos.length; i++) {
    let item = JSON.stringify(arrayAutos[i]);

    sessionStorage.setItem(arrayAutos[i].modelo, item);
}

let autoFinal = new Auto();


let imagenDiv = document.querySelector("#imagen");
let infoDiv = document.querySelector("#texto");

deshacer();

let divAutos = document.querySelector("#div_autos")
let select = document.createElement("select");
select.className = "form-select";

for (let i = 0; i < arrayAutos.length; i++) {
    let option = document.createElement("option");
    let autoJson = sessionStorage.getItem(arrayAutos[i].modelo);
    let auto = JSON.parse(autoJson);
    option.innerHTML = auto.marca + " " + auto.modelo;

    option.addEventListener("click", () => {
        autoElegido(auto);
    })

    select.append(option);
}

divAutos.append(select);

function autoElegido(auto) {

    autoFinal.marca = auto.marca;
    autoFinal.modelo = auto.modelo;

    imagenDiv.innerHTML = ""
    infoDiv.innerHTML = "";

    let imagen = document.createElement("img");

    let modeloAutoElegido = document.createElement("h5");
    modeloAutoElegido.innerHTML = auto.marca + " " + auto.modelo;

    imagen.src = "./media/" + auto.marca + "_" + auto.modelo + "_Blanco.png";
    imagen.width = 500;

    imagenDiv.append(imagen);
    infoDiv.append(modeloAutoElegido, eleccionDeMotor(auto), eleccionDeColor(auto, imagen));
}



function eleccionDeMotor(auto) {
    let motoresDiv = document.createElement("div")
    motoresDiv.className = "row";
    let titulo = document.createElement("h6");
    titulo.className = "text-muted";
    titulo.innerHTML = "Motores (seleccionar)"

    motoresDiv.append(titulo);

    for (let i = 0; i < auto.motores.length; i++) {
        let motorForm = document.createElement("div");
        let motorInput = document.createElement("input");
        let motorLabel = document.createElement("label");

        motorForm.className = "form-check";

        motorInput.className = "form-check-input"
        motorInput.type = "radio"
        motorInput.name = "motorElegido";
        motorInput.value = auto.motores[i].motor + " " + auto.motores[i].hp + "HP " +  auto.motores[i].torque + "Nm";
        motorInput.id = "motorElegido" + i;

        motorLabel.className = "form-check-label";
        motorLabel.htmlFor = "motorElegido" + i;

        motorLabel.innerHTML = `<ul>
                                    <li>${auto.motores[i].motor}</li>
                                    <li>${auto.motores[i].hp}HP</li>
                                    <li>${auto.motores[i].torque}Nm</li>
                                </ul>`

        motorInput.addEventListener("click", () => {
            autoFinal.motor = motorInput.value;

        })

        motorForm.append(motorInput, motorLabel);
        motoresDiv.append(motorForm);
    }

    return motoresDiv
}

function eleccionDeColor(auto, imagen) {
    let coloresDiv = document.createElement("div")
    let titulo = document.createElement("h6");
    titulo.className = "text-muted";
    titulo.innerHTML = "Colores (seleccionar)"

    coloresDiv.append(titulo);
    let listaDeColores = document.createElement("ul");
    
    for (let i = 0; i < auto.coloresDisponibles.length; i++) {
        let item = document.createElement("li");
        let span = document.createElement("span");
        span.style.background = auto.coloresDisponibles[i].hex;

        item.append(span);


        item.addEventListener("click", () => {
            imagen.src = "./media/" + auto.marca + "_" + auto.modelo + "_" + auto.coloresDisponibles[i].color + ".png";
            autoFinal.color = auto.coloresDisponibles[i].color;
        })
        listaDeColores.append(item);
    }

    coloresDiv.append(listaDeColores);

    return coloresDiv
}

function deshacer() {
    imagenDiv.innerHTML = ""
    infoDiv.innerHTML = "";

    let imagen = document.createElement("img");

    imagen.src = "./media/loading_car.png";
    imagen.width = 500;

    let imagenInfoCargando = document.createElement("img");
    imagenInfoCargando.src = "./media/loading_info.png";
    imagenInfoCargando.width = 500;

    imagenDiv.append(imagen);
    infoDiv.append(imagenInfoCargando);
}

let btnComprar = document.querySelector("#botonComprar");
btnComprar.addEventListener("click", () => {
        swal({
        title: "Felicitaciones!",
        text: "Has adquirido el suiguiente vehiculo!" + autoFinal.display(),
        icon: "success",
        button: "OK",
    });
})

