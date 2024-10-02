// VARIABLES
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
  // Agregar curso al carrito
  listaCursos.addEventListener("click", agregarCurso);
  //   Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // VACIAR EL CARRITO
  vaciarCarritoBtn.addEventListener("click", () => {
    // Reseteamnos el carrito
    articulosCarrito = [];
    // Eliminamos todo el HTML
    limpiarHTML();
  });
}

// FUNCIONES
function agregarCurso(e) {
  e.preventDefault;
  // Detectar si es el boton de agregar carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito

function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del arreglo articulosCarrito POR EL DATA ID

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    actualizarCarrito();
  }
}

// Lee el contenido del HTML al que le dimos click y extrae info del curso

function leerDatosCurso(curso) {
  //   Crear un objeto con el contenido

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //   COMPROBAR SI EXISTE EL ARTICULO EN EL CARRITO

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // ACTUALIZAMOS LA CANTIDAD
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  actualizarCarrito();
}

// Muestra el carrito de compras en el HTML

function actualizarCarrito() {
  // Limpiar el HTML
  limpiarHTML();
  // Recorre el cartito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100"/>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// ELIMINA LOS CURSOS DEL TBODY

function limpiarHTML() {
  // Forma lente de borrar HTML
  //   contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
