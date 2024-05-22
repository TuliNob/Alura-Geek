import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

// Function para crear una tarjeta de producto
function crearCard(nombre, precio, imagen, id) {
    const producto = document.createElement("li");
    producto.className = "card";
    producto.innerHTML = `
        <img class="card__image" src="${imagen}">
        <div class="descripcion">
            <h3 class="card__title">${nombre}</h3>
        </div>          
        <div class="precio__trash">
            <p class="card__price">&#36; ${precio}</p>
            <button class="delete-button" data-id="${id}">
                <img class="card__trash" src="img/🦆 icon _trash 2_trash.png" alt="Eliminar producto">
            </button>
        </div>`;
    return producto;
}

// Function para mostrar un mensaje vacio
function mostrarMensajeVacio() {
    const mensajeVacio = document.createElement("p");
    mensajeVacio.className = "mensaje-vacio";
    mensajeVacio.textContent = "No se han agregado productos";
    lista.appendChild(mensajeVacio);
}

// Function para listar productos
async function listarProductos(){
    const listAPI = await conexionAPI.listarProductos()
    if (listAPI.length === 0) {
        mostrarMensajeVacio();
    } else {
        listAPI.forEach(producto => lista.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen, producto.id)));
    }
}

// nuevo codigo para eliminar productos
// "parentElement"
// Agregar un event listener al contenedor de la lista para delegar el clic en las imágenes
lista.addEventListener("click", function(event) {
    if (event.target.classList.contains("card__trash")) {
        event.preventDefault(); // Asegúrate de prevenir el comportamiento por defecto
        // Obtener el ID del producto asociado al botón
        const id = event.target.closest(".delete-button").dataset.id;
        // Llamar a la función para borrar el producto
        eliminarProducto(id);
    }
});

// Función para eliminar un producto
//linea 47 (`[data-id="${id}"]`)
//linea 48 productoAEliminar.closest('li').remove();
async function eliminarProducto(id) {
    try {
        // Llamar a la función de la API para eliminar el producto
        await conexionAPI.eliminarProducto(id);
        // Eliminar el elemento de la lista en el DOM
        const productoAEliminar = document.querySelector(`button[data-id="${id}"]`).closest("li");
        if (productoAEliminar) {
            productoAEliminar.remove();
        }
        // Verificar si la lista está vacía después de eliminar el producto
        if (lista.children.length === 0) {
            mostrarMensajeVacio();
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

listarProductos()
