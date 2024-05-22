import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

 async function crearProducto(){
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    await conexionAPI.enviarProducto(nombre,precio,imagen);
    listarProductos(); // Actualizar la lista de productos después de crear uno nuevo
}

//formulario.addEventListener("submit", (evento)=> crearProducto(evento));
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    crearProducto(evento);
});