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

  //Eliminar curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articuloCarrito = [] //Reseteamos el arreglo
    limpiarHtml(); //Eliminamos todo el Html
  })
}

/* ------------------ Funciones ------------------ */
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSelecionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSelecionado);
  }
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Eliminamos del arreglo de articuloCarrito po el data-id
    articuloCarrito = articuloCarrito.filter((curso) => curso.id !== cursoId);

    //Iteramos sobre el carrito y mostramos su Html
    carritoHtml();
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

  //Revisamos si un eleento ya existe en el carrito
  const existe = articuloCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Si existe el curso, actualizamos la cantidad
    const cursos = articuloCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el objeto actualizado
      } else {
        return curso; //Retorna los objetos que no son actualizados
      }
    });
    articuloCarrito = [...cursos];
  } else {
    //Agregamos elementos al arreglo de carrito
    articuloCarrito = [...articuloCarrito, infoCurso];
  }

  carritoHtml();
}

//Pintar el carrito de compras en el HTML
function carritoHtml() {
  //Limpiar el Html
  limpiarHtml();

  //Recorremos carrito para generar el Html
  articuloCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
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
