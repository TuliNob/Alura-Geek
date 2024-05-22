export const conexionAPI = {
    listarProductos,
    enviarProducto,
    eliminarProducto
}

async function listarProductos() {
    try {
        const conexion = await fetch("http://localhost:3001/productos");
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error("Error al listar productos:", error);
    }
}

async function enviarProducto(nombre, precio, imagen) {
    try {
        const conexion = await fetch("http://localhost:3001/productos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ nombre, precio: `${precio}`, imagen })
        });
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error("Error al enviar producto:", error);
    }
}

async function eliminarProducto(id) {
    try {
        const conexion = await fetch(`http://localhost:3001/productos/${id}`, {
            method: "DELETE"
        });

        if (!conexion.ok) {
            throw new Error("Error al eliminar el producto");
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}