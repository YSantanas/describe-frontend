document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("miFormulario");
  const btnDescargar = document.getElementById("btnDescargar");

  // Controlador de eventos para el envío del formulario
  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Capturar los valores de los campos del formulario
    var termino = document.getElementById("termino").value;

    // Enviar los datos al servidor
    $.ajax({
      url: "http://127.0.0.1:5000/handle_data",
      type: "POST",
      contentType: "application/json", // Especifica el tipo de medio de los datos
      data: JSON.stringify({ termino: termino }), // Convierte los datos a una cadena JSON
      success: function (response) {
        var datosDiv = document.getElementById("datos");
        var datosDiv2 = document.getElementById("datos2");

        // Limpiar el contenido actual del div
        datosDiv.innerHTML = "";
        datosDiv2.innerHTML = "";

        // Agregar los resultados de la búsqueda al div
        response.results.forEach(function (resultado) {
          var resultadoDiv = document.createElement("div");
          resultadoDiv.innerHTML = `
            <div class="contenedor-titulo">
            <div class="formaDos"></div>
            <h2>${resultado.title}</h2>
            </div>

            <a href="${resultado.url}">${resultado.url}</a>
            <p>${resultado.description}</p>
          `;
          datosDiv.appendChild(resultadoDiv);
        });
      },
    });

 // Enviar los datos al servidor para el segundo conjunto de resultados
 $.ajax({
  url: "http://127.0.0.1:5000/casos",
  type: "POST",
  contentType: "application/json", // Especifica el tipo de medio de los datos
  data: JSON.stringify({ termino: termino }), // Convierte los datos a una cadena JSON
  success: function (response) {
    var datosDiv2 = document.getElementById("datos2");

    // Limpiar el contenido actual del div
    datosDiv2.innerHTML = "";

    // Agregar los resultados de la búsqueda al div
    response.results2.forEach(function (resultado2) {
      var resultadoDiv2 = document.createElement("div");
      resultadoDiv2.innerHTML = `
        <div class="contenedor-titulo">
        <div class="formaDos"></div>
        <h2>${resultado2.title}</h2>
        </div>

        <a href="${resultado2.url}">${resultado2.url}</a>
        <p>${resultado2.description}</p>
      `;
      datosDiv2.appendChild(resultadoDiv2);
    });
  },
});

    // Limpiar el formulario
    formulario.reset();
  });

  /*
=========================================================================
===========================  Boton de Descargar =========================
=========================================================================
  */

  btnDescargar.addEventListener("click", function() {
        // Capturar los valores de los campos del formulario
        var termino = document.getElementById("termino").value;
    // Realizar la llamada AJAX
    $.ajax({
      url: "http://127.0.0.1:5000/handle_data",
      type: "POST",
      contentType: "application/json", // Especifica el tipo de medio de los datos
      data: JSON.stringify({ termino: termino }), // Convierte los datos a una cadena JSON
      success: function (response) {
        var datosDiv = document.getElementById("datos");
    
        // Limpiar el contenido actual del div
        datosDiv.innerHTML = "";
    
        // Crear una cadena con todos los resultados que deseas guardar
        var informacion = '';
        response.results.forEach(function (resultado) {
          informacion += resultado.title + '\n';
          informacion += resultado.url + '\n';
          informacion += resultado.description + '\n';
        });
        informacionDescarga = informacion;

        var enlace = document.createElement('a');

        // Crear un objeto Blob a partir de la información de envío
        var blob = new Blob([informacionDescarga], {type: 'text/plain'});
       
        // Crear una URL para el objeto Blob
        var url = URL.createObjectURL(blob);
       
        // Configurar el enlace de descarga
        enlace.href = url;
        enlace.download = 'informacion_de_envio.txt';
       
        // Añadir el enlace al documento
        document.body.appendChild(enlace);
       
        // Simular un clic en el enlace de descarga
        enlace.click();
       
        // Eliminar el enlace del documento
        document.body.removeChild(enlace);
     },
    });
   });
   
   
 });
