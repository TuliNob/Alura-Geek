export function validarFormulario() {
    const nombreInput = document.getElementById("nombre");
    const precioInput = document.getElementById("precio");
    const imagenInput = document.getElementById("imagen");
    const errorNombre = document.getElementById("errorNombre");
    const errorPrecio = document.getElementById("errorPrecio");
    const errorImagen = document.getElementById("errorImagen");
    const btnEnviar = document.getElementById("btnEnviar");
    const btnLimpiar = document.getElementById("btnLimpiar");

    function validarNombre() {
        if (nombreInput.value.length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 caracteres";
        } else {
            errorNombre.textContent = "";
        }
        toggleBotonEnviar();
    }

    function validarPrecio() {
        const precio = parseFloat(precioInput.value);
        if (isNaN(precio)) {
            errorPrecio.textContent = "El precio debe ser un número.";
        } else {
            if (!/^\d+\.\d{2}$/.test(precioInput.value)) {
                precioInput.value = precio.toFixed(2);
            }
            errorPrecio.textContent = "";
        }
        toggleBotonEnviar();
    }

    function validarImagen() {
        const imagenRegex = /\.(jpg|jpeg|png|gif)$/i;
        if (!imagenRegex.test(imagenInput.value)) {
            errorImagen.textContent = "Debe ingresar una URL de imagen válida (jpg, jpeg, png, gif)";
        } else {
            errorImagen.textContent = "";
        }
        toggleBotonEnviar();
    }

    function toggleBotonEnviar() {
        if (nombreInput.value.trim() !== "" && precioInput.value.trim() !== "" && imagenInput.value.trim() !== "" &&
            errorNombre.textContent === "" && errorPrecio.textContent === "" && errorImagen.textContent === "") {
            btnEnviar.disabled = false;
        } else {
            btnEnviar.disabled = true;
        }
    }

    nombreInput.addEventListener("blur", validarNombre);
    precioInput.addEventListener("blur", validarPrecio);
    imagenInput.addEventListener("input", validarImagen);

    btnLimpiar.addEventListener("click", function(event) {
        event.preventDefault();
        nombreInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        errorNombre.textContent = "";
        errorPrecio.textContent = "";
        errorImagen.textContent = "";
        toggleBotonEnviar();
    });

    toggleBotonEnviar();
}
