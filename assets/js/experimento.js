//array con los objetos a exportar
export default [
  {
    "id": "1",
    "producto": "Cortador de Galletas",
    "Descripcion": "Set cortadores de galletas de aluminio.",
    "Precio": "10000",
    "img": "./assets/img/producto2.jpg", 
  },
   
  {
    "id": "2",
    "producto": "Mesquinos",
    "Descripcion": "Set mesquinos de silicona.",
    "Precio": "10000",
    "img": "./assets/img/espatulas.webp ", 
  },
 {
    "id": "3",
    "producto": "Bandeja",
    "Descripcion": "Bandeja soporte para cupcake.",
    "Precio": "10000",
    "img": "./assets/img/Soporte-cup.webp ", 
  },
   {
    "id": "4 ",
    "producto":"Boquillas Reposteras",
    "Descripcion": "Set de boquillas pasteleras.",
    "Precio": "7000",
    "img": "./assets/img//boquillas.webp ", 
  },
 {
    "id": "5",
    "producto": "Molde Desmoldable",
    "Descripcion": "Molde desmontable de aluminio aro de 20cm.",
    "Precio": "9000",
    "img": "./assets/img/cake2.webp", 
  },
 {
    "id": "6 ",
    "producto": "Set de Boquillas",
    "Descripcion": "Set de boquillas para flores 4 unid.",
    "Precio": "4000",
    "img": "./assets/img/boquillas1.jpg", 
  },
 {
    "id": "7 ",
    "producto": "Capsulas Cupcake",
    "Descripcion": "Set de 30 capsulas para cupcake o muffing.",
    "Precio": "3000",
    "img": "./assets/img/capsula2.webp", 
  },
 {
    "id": "8",
    "producto": "Mangas Pasteleras",
    "Descripcion": "Mangas pasteleras desechables 50 unid..",
    "Precio": "4000",
    "img": "./assets/img/mangas1.jpg", 
  }        
]

//TARJETAS DE PROMOCION HOME

function createCard (){
    const container = document.getElementById('cards');
     
     `<img src="./assets/img/boquillas.webp" class="imgProduct" alt="img2">
                 <h3>Boquillas Reposteras </h3>
                 <p> Set de boquillas pasteleras</p>
                 <p class="price">$7.000</p>
                 <a href="./producto.html">
                <button class="btnBuy">Agregar</button>`
}