import { validarFormulario } from './validarFormulario.js';
import { conexionAPI } from './conexionAPI.js';

document.addEventListener("DOMContentLoaded", () => {
    validarFormulario();
    listarProductos();

    const formulario = document.querySelector("[data-formulario]");
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        crearProducto();
    });
});

async function crearProducto() {
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    await conexionAPI.enviarProducto(nombre, precio, imagen);
    listarProductos(); // Actualizar la lista de productos después de crear uno nuevo
}

async function listarProductos() {
    const productos = await conexionAPI.listarProductos();
    const lista = document.querySelector("[data-lista]");
    lista.innerHTML = ''; // Limpiar la lista antes de actualizar

    productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        lista.appendChild(li);
    });
}