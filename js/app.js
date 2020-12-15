/* ------------------ Variables ------------------ */
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articuloCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Agregamos un curso al presionar el btn "Agregar Al Carrito"
  listaCursos.addEventListener("click", agregarCurso);
}

/* ------------------ Funciones ------------------ */
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSelecionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSelecionado);
  }
}

// Leer el contenido del HTML al que dmos click para extraer la información del curso
function leerDatosCurso(curso) {
  //Crear objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  // console.log(infoCurso);
  //Agregamos elementos al arreglo de carrito
  articuloCarrito = [...articuloCarrito, infoCurso];
  console.log(articuloCarrito);

  carritoHtml();
}

//Pintar el carrito de compras en el HTML
function carritoHtml() {
  //Limpiar el Html
  limpiarHtml();

  //Recorremos carrito para generar el Html
  articuloCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        ${curso.titulo}
      </td>
    `;

    //Agregamosel Html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Función para eliminar los cursos del tbody
function limpiarHtml() {
  //Forma no óptima de eliminar elementos del html
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
