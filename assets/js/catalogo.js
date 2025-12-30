
import data from './data.js';

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //inici el carrito desde el localstorage



const PASSWORD_MAESTRA = "1234";
let usuarioLogueado;


function renderizaCard (lista){
    const catalogo = 
        document.getElementById('cardCatalogo') || document.getElementById('cardMuestra');
    if(!catalogo) return;  
    catalogo.innerHTML ="";

    lista.forEach(producto => {
        const card = document.createElement("article");
        card.classList.add("card");
        card.style.width = "16rem";

        card.innerHTML = `
            <img src="${producto.img}" class="imgProduct card-img-top" alt="${producto.producto}">
            <div class="card-body">
                <h5 class="card-title">${producto.producto}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="price">$${producto.precio.toLocaleString("es-Ar")}</p>
                <a href="./detalleProducto.html" class="btn btn-outline-primary" >Ver</a>
                <button class="btn btn-outline-success" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        catalogo.appendChild(card);

//asigna el evento al botón 
        const btnAgregar = card.querySelector(".btn-outline-success");
        btnAgregar.addEventListener("click", () => {
            const idProducto = Number(btnAgregar.dataset.id);
            console.log("Botón agregar clickeado, id:", idProducto);
            addProducto(idProducto);
        });
       
    });
}

function cardsIndex(lista){
    const mitad = Math.ceil(lista.length/2);
    return lista.slice(0,mitad);
}
   
const vistaActual = window.location.pathname; //muestra las card segun la pagina q este

    if(vistaActual.includes("index.html")){
        renderizaCard(cardsIndex(data));
    }else if (vistaActual.includes("catalogo.html")){
        renderizaCard(data);
   
    }

function addProducto(idProducto){
    const prod = data.find(p => parseInt(p.id) === idProducto);
    if(prod) carrito.push({...prod});

    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log("carrito actual:", carrito);
    renderizarCarrito();
}
function deleteProducto(idProducto){
    const index = carrito.findIndex(p => p.id === idProducto);
    if(index >= 0) carrito.splice(index,1);

    localStorage.setItem("carrito",JSON.stringify(carrito));
    renderizarCarrito();
}

function descuento(codigo){
    if (codigo === "DESC15"){
        carrito.forEach(p => p.descuentoAplicado = true);   
    }
    return 0.85; //valor con descuento 
}

function calcularTotal (codigo) {
    const factor = descuento(codigo);
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
      return Math.round(total* factor);  
}

function renderizarCarrito(){
    const tbody = document.getElementById("carritoBody") ;  
    tbody.innerHTML = ""; 
    
    document.getElementById("total").textContent =`Total a pagar : $${calcularTotal("DESC15").toLocaleString("es-AR")}`;

    carrito.forEach(item =>{
        const tr = document.createElement('tr');
        tr.classList.add("itemCarrito");

        tr.innerHTML=`
            <td class="table__productos d-flex align-items-center gap-2"> 
                <img src="${item.img}" alt="${item.producto}">
                <h6 class="tittle">${item.producto}</h6>
            </td>
            <td class="table__precio"><p>$ ${item.precio.toLocaleString("es-Ar")}</p></td>
            <td class="table__cantidad">
                <input type="number" min="1" value="${item.cantidad}"> 
                <button class="delete btn btn-danger" data-id="${item.id}">Eliminar</button>
            </td>            
         `;
         tbody.appendChild(tr);
        
        const btnEliminar = tr.querySelector(".delete");
        btnEliminar.addEventListener("click", () => {
        deleteProducto(item.id)
        
        });
    });
   //mostrar en carrito el subtotal y el descto     
    const subtotal = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const descuento = subtotal * 0.15;
   
    document.getElementById("subtotal").textContent = `Subtotal: $ ${subtotal.toLocaleString("es-AR")}`;
    document.getElementById("descuento").textContent = `Descuento: $ ${descuento.toLocaleString("es-AR")}`;
}
 
//funcion modal para cambio de modales Login Sesion
function mostrarModal(tipo) {
    let modalId;

    if(tipo === "login") {
        modalId = "loginModal";
    } else if(tipo === "registro") {
        modalId = "modalRegistrarse";
    } else {
        console.error("Tipo de modal inválido:", tipo);
        return;
    }

    const modalElement = document.getElementById(modalId);
    if(!modalElement){
        console.log("No se encontró el modal con id:", modalId);
        return;
    }

    const modalBootstrap = new bootstrap.Modal(modalElement);
    modalBootstrap.show();
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function iniciarSesion(){
    const userInput = document.getElementById('user').value.trim();
    const passInput = document.getElementById('password').value.trim();

    let usuario = null;

    if (userInput === "admin" && passInput === PASSWORD_MAESTRA){
        usuario = { user: userInput };

    } else {
        usuario = usuarios.find(u => u.user === userInput && u.pass === passInput);
    }

    if (usuario) {
        usuarioLogueado = true;
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        document.getElementById("usuarioLogueado").textContent = usuario.user;
        alert("¡Bienvenido " + usuario.user + "!");
        const modalElement = document.getElementById('loginModal');
        const loginModal = bootstrap.Modal.getInstance(modalElement);
        loginModal.hide();
    } else {
        alert("Usuario o contraseña incorrectos");
    }

    document.getElementById("user").value = "";
    document.getElementById('password').value = "";
}


function cerrarSesion() {
    usuarioLogueado = null;
    localStorage.removeItem("usuarioActivo");
    document.getElementById("usuarioLogueado").textContent = "";
    if (spanUsuario) spanUsuario.textContent = "";
    alert("Sesión cerrada correctamente");
    window.location.href = "index.html"; // opcional
}

//Eventos btn iniciar  y cerrar session  
const btnLogin = document.getElementById("btnIniciarSesion");
    console.log("Botón login:", btnLogin);
    if(btnLogin) btnLogin.addEventListener("click", iniciarSesion);

const btnCerrar = document.getElementById("btnCerrarSession");
if (btnCerrar) btnCerrar.addEventListener("click", cerrarSesion);


// Funcionalidad de registrar usuarios

function emailValido(email) {
    return email.includes("@") && !email.includes(" ");
}

function RegistrarUsuario (){
    const user = document.getElementById('nameUser').value.trim();
    const pass = document.getElementById('createPass').value.trim();
    const mail = document.getElementById('email').value.trim();
    // Validación
    if (!user || !pass || !mail) {
        alert("Completa todos los campos");
        return;
    }
    // Evitar usuarios duplicados
    const existe = usuarios.some(u => u.user === user);
    if (existe) {
        alert("El usuario ya existe");
        return;
    }
    if (pass.length < 4) {
    alert("La contraseña debe tener almenos 4 caracteres");
    return;
}
    if (!emailValido(mail)) {
        alert("Ingresa un correo electrónico válido");
        return;
    }

    usuarios.push({user,pass,  mail });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Usuarios registrados:", usuarios);
    alert("¡Usuario registrado!");

   

    // Cerrar modal
    const modalElement = document.getElementById('modalRegistrarse');
    const modalRegistrarse = bootstrap.Modal.getInstance(modalElement);
    modalRegistrarse.hide();
}

const btnRegistarse = document.getElementById("createAcount");
    console.log("Botón registrarse:", btnRegistarse);
    if(btnRegistarse) btnRegistarse.addEventListener("click", RegistrarUsuario);

