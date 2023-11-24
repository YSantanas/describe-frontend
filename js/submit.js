async function submitForm() {
  const textInput = document.getElementById('termino').value;

  try {
    // Enviar los datos al servidor
    const res = await fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ termino: textInput }),
    });
    const data = await res.json();

    const { results_definiciones, results_casos, results_funcion } = data;

    const divDefiniciones = document.getElementById('datos');
    const divCasos = document.getElementById('datos2');
    const divFuncion = document.getElementById('datos3');

    // Limpiar el contenido de los divs
    // divDefiniciones.innerHTML = '';
    divDefiniciones.querySelectorAll('div').forEach((n) => n.remove());
    divDefiniciones.style.display = 'none';
    // divCasos.innerHTML = '';
    divCasos.querySelectorAll('div').forEach((n) => n.remove());
    divCasos.style.display = 'none';
    // divFuncion.innerHTML = '';
    divFuncion.querySelectorAll('div').forEach((n) => n.remove());
    divFuncion.style.display = 'none';

    // Recorrer los resultados de las definiciones
    results_definiciones.forEach((resultado) => {
      // Crear un div por cada resultado
      const div = document.createElement('div');

      // Agregar el contenido al div
      div.innerHTML += `<div class="contenedor-titulo">
          <div class="formaDos"></div>
          <a href="${resultado.url}">
            ${resultado.description}
          </a>
        </div>
    `;
      // Agregar el div al contenedor
      divDefiniciones.appendChild(div);
      divDefiniciones.style.display = 'block';
    });

    // Recorrer los resultados de los casos
    results_casos.forEach((resultado) => {
      // Crear un div por cada resultado
      const div = document.createElement('div');

      // Agregar el contenido al div
      div.innerHTML += `<div class="contenedor-titulo">
          <div class="formaDos"></div>
          <a href="${resultado.url}">
            ${truncate(resultado.description.replace('Web', ''), 100)}
          </a>
        </div>
    `;
      // Agregar el div al contenedor
      divCasos.appendChild(div);
      divCasos.style.display = 'block';
    });

    // Recorrer los resultados de las funciones
    results_funcion.forEach((resultado) => {
      // Crear un div por cada resultado
      const div = document.createElement('div');

      // Agregar el contenido al div
      div.innerHTML += `<div class="contenedor-titulo">
          <div class="formaDos"></div>
          <a href="${resultado.url}">
            ${truncate(resultado.description.replace('Web', ''), 100)}
          </a>
        </div>
    `;
      // Agregar el div al contenedor
      divFuncion.appendChild(div);
      divFuncion.style.display = 'block';
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
}

function enviarDatos() {
  submitForm();
}
