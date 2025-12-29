
import data from './data.js';

let carrito = []; 
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
                <p class="price">$${producto.precio}</p>
                <a href="./detalleProducto.html" class="btn btn-outline-primary" >Ver</a>
                <button class="btn btn-outline-success" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        catalogo.appendChild(card);

//asigna el listener al botón recién creado
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
//---------HASTA AQUI FUNCIONA       
// 1- DEFINIR LAS  5 FX DE ADD CARRITO /DELETE-CARRITO /APLICAR-DESCUENTO/ CAULCULAR-TOTAL/RENDERIZA-CARRITO

function addProducto(idProducto){
   
    const prod = data.find(p => parseInt(p.id) === idProducto);
    if(prod) carrito.push({...prod});
    console.log("carrito actual:", carrito)
    renderizarCarrito();
}
function deleteProducto(idProducto){
    const index = carrito.findIndex(p => p.id === idProducto);
    if(index >= 0) carrito.splice(index,1);
    renderizarCarrito();
}

function descuento(codigo){
    if (codigo === "DESC15"){
        carrito.forEach(p => p.descuentoAplicado = true);   
    }
    return 0.85; //descuento del 15%
}

function calcularTotal (codigo) {
    const factor = descuento(codigo);
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
      return Math.round(total* factor);
    
}



function renderizarCarrito(){

   //document.getElementById("totalCarrito").textContent = "$" + calcularTotal("DESC15");
    const tbody = document.getElementById("carritoBody");  
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
                <td class="table__precio"><p>$ ${item.precio}</p></td>
                <td class="table__cantidad">
                    <input type="number" min="1" value="${item.cantidad}"> 
                    <button class="delete btn btn-danger" data-id="${item.id}">Eliminar</button>
                </td>            
             `;
             tbody.appendChild(tr);
        });

   //mostrar en carrito el subtotal y el descto     
    const subtotal = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const descuento = subtotal * 0.15;
   
    document.getElementById("subtotal").textContent = `Subtotal: $ ${subtotal.toLocaleString("es-AR")}`;
    document.getElementById("descuento").textContent = `Descuento: $ ${descuento.toLocaleString("es-AR")}`;

}


//--------------------------------------------------------------------


//2.  registro de usuarios e login autenticaciones basicas
// requiere dos funciones  
//  YA FUNCIONA   funcion modal para cambio de modales Login Sesion
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

function iniciarSesion(){
    const userInput = document.getElementById('user').value.trim();
    const passInput = document.getElementById('password').value.trim();

    if (userInput === "admin" && passInput === PASSWORD_MAESTRA){
        usuarioLogueado = true;
        alert("¡Bienvenido admin!");
        console.log("usuario logueado: bienvenido admin", usuarioLogueado);

        const modalElement = document.getElementById('loginModal');
        const loginModal = bootstrap.Modal.getInstance(modalElement);
        loginModal.hide();
    } else {
        alert("Clave incorrecta, intenta nuevamente");
        console.log("Credenciales incorrectas");
    }

    document.getElementById("user").value = "";
    document.getElementById('password').value = "";

    
}

//Evento btn iniciar session  ESTE DEJO DE FUNCIONAR
    const btnLogin = document.getElementById("btnIniciarSesion");
    console.log("Botón login:", btnLogin);
    if(btnLogin) btnLogin.addEventListener("click", iniciarSesion);


 
 


