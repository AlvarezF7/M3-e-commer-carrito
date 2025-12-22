
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

//carrito
function addProducto(idProducto){
    const prod = catalogo.find(p => p.id === idProducto);
    if(prod) carrito.push({...prod}); // copia el obj  solo en el objeto
    renderizarCarrito();
}

function borrarProducto(idProducto){
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

function renderizarCarrito (){

    const tbody = getElementById('btnCarrito');
     tbody.innerHTML= "";

     carrito.forEach(p =>{
        const tr = document.createElement("tr");
        tr.inneHTML =`
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>
                <button onclick="borrarProducto(${p.id})")> Eliminar</button>
            </td>
            `;
            tbody.appenChild(tr);
});

document.getElementById("total").textContent =
"$"+calcularTotal("DESC15");
    
    //ejemplo document.querySelector("#total").textContent = "$"+ calcularTotal("DESC15");

    console.log("carrito:", carrito);
}

//LOGIN

function mostrarModal(tipo){
    
 //usa boostrap modal para abrir "login/Registro"
 //new boostrap.Modal (document.getElementById(`nodalAuth`)).show();
}

function iniciarSesion(usuario, password){
    if (password === PASSWORD_MAESTRA){
        usuarioLogueado = true;
        console.log("Usuario logueado:", usuario);
        //actualiza UI( mensaje en navbar, cerrar modal,ect)
    } else{
        console.warn("Credenciales inválidas");
      }
    }
