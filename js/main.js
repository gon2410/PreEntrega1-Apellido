let id = 0;
class Auto{
    constructor(id, marca, modelo, color, precio, coloresDisponibles, motores, transmisiones, motor, transmision) {
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
const azul = {color: "Azul", hex: "#021742"};
const beige = {color: "Beige", hex: "#b7b3a7"};
const blanco = {color: "Blanco", hex: "#ffffff"};
const gris = {color: "Gris", hex: "#cdc9c8"};
const negro = {color: "Negro", hex: "#000000"};
const gris_oscuro = {color: "Gris_Oscuro", hex: "#333333"};
const rojo = {color: "Rojo", hex: "#823839"};

// creando autos
const renaultDuster = new Auto(null, "Renault", "Duster", "Negro", 1_500_000, [azul, beige, blanco, gris], [{motor: "1.6", hp: 115, torque: 150}, {motor: "1.3T", hp: 155, torque: 250}]);
const renaultSandero = new Auto(null, "Renault", "Sandero", "Negro", 1_150_000, [azul, blanco, gris, gris_oscuro, rojo], [{motor: "1.6", hp: 115, torque: 150}]);
const renaultCaptur = new Auto(null, "Renault", "Captur", "Negro", 1_250_000, [blanco, gris, gris_oscuro, rojo], [{motor: "1.6", hp: 115, torque: 156},{motor: "2.0", hp: 143, torque: 193}]);

const volkswagenVirtus = new Auto(null,"Volkswagen", "Virtus", "Negro", 2_000_000, [azul, blanco, gris, gris_oscuro, negro], [{motor: "1.6", hp: 110, torque: 155}, {motor: "1.4T", hp: 150, torque: 250}]);
const volkswagenPolo = new Auto(null,"Volkswagen", "Polo", "Negro", 1_500_000, [azul, blanco, gris, gris_oscuro, negro, rojo], [{motor: "1.6", hp: 110, torque: 155}, {motor: "1.4T", hp: 150, torque: 250}]);
const volkswagenAmarok = new Auto(null,"Volkswagen", "Amarok", "Negro", 3_250_000, [azul, beige, blanco, gris, gris_oscuro, negro], [{motor: "2.0", hp: 140, torque: 340}, {motor: "2.0", hp: 180, torque: 420}, {motor: "3.0 V6", hp: 260, torque: 580}]);

const chevroletS10 = new Auto(null,"Chevrolet", "S10", "Negro", 2_500_000, [azul, blanco, gris, negro,], [{motor: "2.8", hp: 200, torque: 500}]);
const chevroletOnix = new Auto(null,"Chevrolet", "Onix", "Negro", 1_050_000, [blanco, negro, rojo], [{motor: "1.0", hp: 116, torque: 160}]);
const chevroletCruze = new Auto(null,"Chevrolet", "Cruze", "Negro", 1_700_000, [azul, blanco, gris, negro], [{motor: "1.4", hp: 153, torque: 245}]);


// agrego los autos creados a la lista
const arrayAutos = [renaultDuster, renaultSandero, renaultCaptur,
                volkswagenVirtus, volkswagenPolo, volkswagenAmarok,
                chevroletS10, chevroletOnix, chevroletCruze];
let carrito = [];

// guardo autos en localStorage
for (let i = 0; i < arrayAutos.length; i++) {
    let item = JSON.stringify(arrayAutos[i]);

    localStorage.setItem(arrayAutos[i].modelo, item);
}

// creo el objeto Auto final (el que elige el usuario)
let autoFinal = new Auto();
let imagenDiv = document.querySelector("#imagen");
let infoDiv = document.querySelector("#texto");
let btnComprar = document.querySelector("#botonComprar");
let dropdownCarrito = document.querySelector("#dropdownCarrito");

let divAutos = document.querySelector("#div_autos")
let select = document.createElement("select");
select.className = "form-select";


// creo el select de opciones obteniendo los datos del sessionStorage

deshacer();
for (let i = 0; i < arrayAutos.length; i++) {
    let option = document.createElement("option");
    let autoJson = localStorage.getItem(arrayAutos[i].modelo);
    let auto = JSON.parse(autoJson);

    option.innerHTML = auto.marca + " " + auto.modelo;
    option.value = auto.modelo;
    select.append(option);
}

// llamo al sessionStorage y le pido el objeto con la key elegida en el select y llamo a la funcion autoElegido()
select.addEventListener("change", () => {
    let autoJson = localStorage.getItem(select.value);   
    let auto = JSON.parse(autoJson);
    autoElegido(auto); 
})

divAutos.append(select);




// renderizo imagen inicial e informacion del auto
function autoElegido(auto) {

    autoFinal.id = id;
    id += 1;
    autoFinal.marca = auto.marca;
    autoFinal.modelo = auto.modelo;
    autoFinal.precio = auto.precio;

    imagenDiv.innerHTML = "";
    infoDiv.innerHTML = "";
    btnComprar.style.display = "block";

    btnComprar.setAttribute("disabled", "");

    let imagen = document.createElement("img");

    let modeloAutoElegido = document.createElement("h5");
    modeloAutoElegido.innerHTML = auto.marca + " " + auto.modelo;

    imagen.src = "./media/" + auto.marca + "_" + auto.modelo + "_Blanco.png";
    imagen.className = "img-fluid";
    imagen.width = 500;

    imagenDiv.append(imagen);
    infoDiv.append(modeloAutoElegido, eleccionDeMotor(auto), eleccionDeColor(auto, imagen));
}


// renderizo los motores disponibles y la eleccion de uno
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
            btnComprar.removeAttribute("disabled", "");

        })

        motorForm.append(motorInput, motorLabel);
        motoresDiv.append(motorForm);
    }

    return motoresDiv
}

// renderizo los colores disponibles y eleccion
function eleccionDeColor(auto, imagen) {
    let coloresDiv = document.createElement("div")
    let titulo = document.createElement("h6");
    titulo.className = "text-muted";
    titulo.innerHTML = "Colores (seleccionar)"

    autoFinal.color = "Blanco";

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

// boton comprar
btnComprar.addEventListener("click", () => {
    carrito.push(autoFinal)
    deshacer();
    autoFinal = new Auto()
    btnComprar.setAttribute("disabled", "");
    actualizarCarrito()
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#3B71CA"
        }
    }).showToast()
})

function actualizarCarrito() {
    dropdownCarrito.innerHTML = "";
    let count = 0;
    for (let i = 0; i < carrito.length; i++) {
        count += carrito[i].precio;
        const image = document.createElement("img");
        image.style.width = "4rem";
        image.src = "./media/" + carrito[i].marca + '_' + carrito[i].modelo + "_" + carrito[i].color + '.png';

        const dropdownItem = document.createElement("li");
        dropdownItem.className = "dropdown-item";

        dropdownItem.append(image)
        dropdownItem.innerHTML += carrito[i].marca + " " + carrito[i].modelo;

        const itemButton = document.createElement("button");
        itemButton.className = "btn btn-sm btn-link";
        itemButton.innerHTML = `<i class="fa fa-close"></i>`;

        
        // console.log(carrito[i].id);
        itemButton.addEventListener("click", () => {
            for (let j = 0; j < carrito.length; j++) {
                if (carrito[i].id == carrito[j].id) {
                    carrito.splice(i, 1);
                    // console.log(carrito)
                    actualizarCarrito();
                    break;
                }
            }
            
        })

        dropdownItem.append(itemButton);
        dropdownCarrito.append(dropdownItem);
        
    }
    const buttonComprar = document.createElement("button");
    buttonComprar.className = "btn btn-sm btn-light m-1";
    buttonComprar.innerHTML = "Finalizar Compra";

    buttonComprar.addEventListener("click", () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2dd76d74b7msh04af7126e4df225p178eabjsna49132436769',
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        fetch('https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=ARS&want=USD&amount=' + count.toString(), options)
            .then(response => response.json())
            .then((data) => {
                //console.log('Success:', data);
                swal({
                    title: "Felicitaciones!",
                    text: "Monto total ARS: $" + count + " - USD: $" + data.new_amount,
                    icon: "success",
                    button: "Pagar",
                });
            })
            .catch(err => console.error(err));


        // carrito = []
        // actualizarCarrito();
    })
    dropdownCarrito.append(buttonComprar);
}

// funcion deshacer inicial para que no quede en blanco la pagina
function deshacer() {
    imagenDiv.innerHTML = ""
    infoDiv.innerHTML = "";

    btnComprar.style.display = "none";

    let imagen = document.createElement("img");

    imagen.src = "./media/loading_car.png";
    imagen.width = 500;

    let imagenInfoCargando = document.createElement("img");
    imagenInfoCargando.src = "./media/loading_info.png";
    imagenInfoCargando.width = 500;

    imagenDiv.append(imagen);
    infoDiv.append(imagenInfoCargando);
}
