

const listaProductos = document.getElementById('productos');
let carrito = [];
let numeroCompras = [];
let carritoLleno = [];


function agregarItem(objeto){

    Object.defineProperty(objeto, 'cant', {value: 1, writable: true});
    carritoLleno.push(objeto);
}

/* Lista de Productos*/

productos.forEach(prod => {
    let card = document.createElement('div')
    card.classList.add('col-lg-4')
    card.classList.add('col-md-6')
    card.classList.add('portfolio-item')
    card.classList.add(prod.filtro)
    card.innerHTML = `
        
            <div class="portfolio-wrap">
                <img src= ${prod.imagen} class="img-fluid" alt="">
                <div class="portfolio-links">
                <a href=${prod.imagen} data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3"><i class="bx bx-plus"></i></a>
                <a id="prod-${prod.id}"  data-bs-toggle="modal" data-bs-target="#carritoModal"class="comprar" title="Detalles"><i class="bi bi-cart-plus-fill"></i></i></a>
                </div>
            </div>
        
    `
    listaProductos.appendChild(card)

    /* Fin lista de Productos*/


    let botonAgregar = document.getElementById('prod-' + prod.id)
        botonAgregar.addEventListener("click", () =>{ 
            numeroCompras.push(+1)
            $("#bntCarrito").append(`<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> ${numeroCompras.length} </span>`)
            
            carrito.push(productos[prod.id - 1])
            
            localStorage.setItem("carrito", JSON.stringify(carrito));
            
            obetenerComprasLS()

            
           

            
        })
    })

    function obetenerComprasLS(){

        if(localStorage.getItem("carrito") === null){

            carrito = [];
        }else{
            carrito = JSON.parse(localStorage.getItem("carrito"))
            console.log(carrito)

            sumarAlLs();

            function sumarAlLs(){
            Object.values(carrito).forEach(produ => {
                $("#cuerpoTabla").append(`
    
                <tr>
                <td>${produ.cant}</td>
                <td>${produ.marca}</td>
                <td>${produ.modelo}</td>
                <td>${valorDolar}</td>
                <td>${produ.precio}</td>
                <td>${produ.precio*2}</td>
                </tr>
                `
                )
                
                })    
            }

         $("#finCompra").click(function (e) { 
             
             localStorage.removeItem("carrito")
             carrito = [];
             numeroCompras = [];
             $("#bntCarrito").append(`<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> ${numeroCompras.length} </span>`)            
            
            });
            
        }

    }    
    
    
    
    localStorage.removeItem("carrito")