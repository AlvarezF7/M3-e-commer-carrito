//Carrito y catalogo

const catalogo = [
    {id:1, nombre:"Bandeja", precio:10000, descuentoAplicado:false},
    {id:2, nombre:"Boquillas reposteras", precio:7000, descuentoAplicado:false},
    {id:3, nombre:"Mesquinos", precio:10000, descuentoAplicado:false},
    {id:4, nombre:"Cortadores de Galletas", precio:10000, descuentoAplicado:false},
    {id:5, nombre:"Molde desmontable", precio:9000, descuentoAplicado:false},
    {id:6, nombre:"Set de Boquillas", precio:4000, descuentoAplicado:false},
    {id:7, nombre:"Capsulas Cupcake", precio:3000, descuentoAplicado:false},
    {id:8, nombre:"Mangas Pasteleras", precio:4000, descuentoAplicado:false},
];

let carrito = [];
const PASSWORD_MAESTRA = "1234";
let usuarioLogueado = false;

//-----funciones del carrito--------
function addProducto(idProducto){
    const prod = catalogo.find(p => p.id === idProducto);
    if(prod) carrito.push({...prod}); // copia el obj  solo en el objeto
    renderizarCarrito();
}

function deleteProducto(idProducto){
    const borrarProd = carrito.findIndex(p => p.id === idProducto);
    if(borrarProd >= 0)carrito.splice(borrarProd,1);
    renderizarCarrito();
}

function aplicarDescuento(codigo){
    if (codigo === "DESC15"){ 
        carrito.forEach(p => p.descuentoAplicado = true);
        return 0.85; //este es factor de 15% 
    }
    return 1; //sin descuento
}

function calcularTotal(codigo){
    const factor = aplicarDescuento(codigo);
    const total = carrito.reduce((accumulador, p) => accumulador + p.precio,0);
    return Math.round(total * factor);

}

function renderizarCarrito(){
    const contenedor = document.getElementById('contenedorCarrito');
    contenedor.innerHTML = ""; // limpia contenido

    if(carrito.length === 0){
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped");

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acción</th>
        </tr>
    `;
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");
    carrito.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td><button class="btn btn-danger btn-sm" onclick="borrarProducto(${p.id})">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);

    // Total
    let totalDiv = document.getElementById("total");
    if(!totalDiv){
        totalDiv = document.createElement("div");
        totalDiv.id = "total";
        contenedor.appendChild(totalDiv);
    }
    totalDiv.textContent = "Total: $" + calcularTotal("DESC15");
}

// ---- Event listener para botones "Agregar" ----
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-outline-success"); // crea clase solo para agregar
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener("click", e => {
            e.preventDefault();
            addProducto(index + 1); // asume mismo orden que catalogo
        });
    });

// Botón para mostrar/ocultar carrito
   const btnCarrito = document.getElementById('btnCarrito');
   const contenedor = document.getElementById("contenedorCarrito");

  btnCarrito.addEventListener("click", () => {
    contenedor.classList.toggle("d-none"); // muestra u oculta el carrito
    renderizarCarrito(); // actualiza la tabla cada vez que se abre
  });
});
//LOGIN

function iniciarSesion(){
    const userInput = document.getElementById('user').value.trim();
    const passInput = document.getElementById('password').value.trim();

    if (userInput === "admin" && passInput === PASSWORD_MAESTRA){
        usuarioLogueado = true;
        alert("¡Bienvenido admin!")
        console.log("usuario y contraseña  validados");
    
        const modalElement = document.getElementById('loginModal');
        const loginModal = bootstrap.Modal.getInstance(modalElement);
        loginModal.hide();
    }else{ alert("Clave incorrecta, Intenta nuevamente");
        console.log("Credenciales incorrectas");
    }
   
    //limpia in puts
    document.getElementById("user").value = "";
    document.getElementById('password').value ="";
    }



// eventos del DOM
    document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");

    btnLogin.addEventListener("click", iniciarSesion);
});
