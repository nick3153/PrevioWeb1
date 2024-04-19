document.addEventListener('DOMContentLoaded', function() {
    var gustos = [];
    var filaEnEdicion = null;

    function agregarGusto(gusto) {
        gustos.push({ nombre: gusto, porcentaje: '0' });
        mostrarGustos();
    }

    function mostrarGustos() {
        var tabla = document.getElementById('tabla-gustos');
        var tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';

        gustos.forEach(function(gusto, index) {
            var fila = document.createElement('tr');
            fila.innerHTML = `
                <td><span class="gusto" data-index="${index}">${gusto.nombre}</span><input type="text" class="gusto-input" data-index="${index}" style="display: none;"></td>
                <td><span class="porcentaje" data-index="${index}">${gusto.porcentaje}</span><input type="text" class="porcentaje-input" data-index="${index}" style="display: none;"></td>
                <td><a href="#" class="editar-gusto" style="color: blue; text-decoration: underline;">Editar</a></td>
            `;
            tbody.appendChild(fila);
        });
    }

    function activarEdicion(index) {
        var gustoSpan = document.querySelector(`.gusto[data-index="${index}"]`);
        var gustoInput = document.querySelector(`.gusto-input[data-index="${index}"]`);
        var porcentajeSpan = document.querySelector(`.porcentaje[data-index="${index}"]`);
        var porcentajeInput = document.querySelector(`.porcentaje-input[data-index="${index}"]`);

        if (gustoSpan && gustoInput && porcentajeSpan && porcentajeInput) {
            gustoSpan.style.display = 'none';
            gustoInput.style.display = 'inline';
            gustoInput.value = gustoSpan.textContent;

            porcentajeSpan.style.display = 'none';
            porcentajeInput.style.display = 'inline';
            porcentajeInput.value = porcentajeSpan.textContent;
        }
    }

    function desactivarEdicion(index) {
        var gustoSpan = document.querySelector(`.gusto[data-index="${index}"]`);
        var gustoInput = document.querySelector(`.gusto-input[data-index="${index}"]`);
        var porcentajeSpan = document.querySelector(`.porcentaje[data-index="${index}"]`);
        var porcentajeInput = document.querySelector(`.porcentaje-input[data-index="${index}"]`);

        if (gustoSpan && gustoInput && porcentajeSpan && porcentajeInput) {
            gustoSpan.style.display = 'inline';
            gustoInput.style.display = 'none';
            gustoSpan.textContent = gustoInput.value.trim();

            porcentajeSpan.style.display = 'inline';
            porcentajeInput.style.display = 'none';
            porcentajeSpan.textContent = porcentajeInput.value.trim();
        }
    }

    function mostrarConfirmacion() {
        var confirmacionDiv = document.getElementById('confirmacion');
        confirmacionDiv.style.display = 'block';
    }

    function ocultarConfirmacion() {
        var confirmacionDiv = document.getElementById('confirmacion');
        confirmacionDiv.style.display = 'none';
    }

    document.getElementById('agregar-gusto').addEventListener('click', function() {
        var inputGusto = document.getElementById('gusto');
        var nuevoGusto = inputGusto.value.trim();
        if (nuevoGusto !== '') {
            agregarGusto(nuevoGusto);
            inputGusto.value = ''; 
        }
    });

    document.getElementById('tabla-gustos').addEventListener('click', function(event) {
        if (event.target.classList.contains('editar-gusto')) {
            if (filaEnEdicion !== null) {
                mostrarAlertaError('Solo se puede editar una línea. Recargue la página para poder editar otra.');
                return;
            }

            var index = event.target.parentNode.parentNode.rowIndex - 1;
            activarEdicion(index);
            filaEnEdicion = index;

            event.target.textContent = 'En edición';
            event.target.style.color = 'gray';
            event.target.style.textDecoration = 'none';

            mostrarConfirmacion();
        }
    });

    document.getElementById('aceptar').addEventListener('click', function() {
        var nombre = encodeURIComponent(document.getElementById('nombre_usuario').value.trim());
        var email = encodeURIComponent(document.getElementById('email').value.trim());
        var telefono = encodeURIComponent(document.getElementById('telefono').value.trim());

        if (filaEnEdicion !== null) {
            var index = filaEnEdicion;
            var gusto = encodeURIComponent(document.querySelector(`.gusto-input[data-index="${index}"]`).value.trim());
            var porcentaje = encodeURIComponent(document.querySelector(`.porcentaje-input[data-index="${index}"]`).value.trim());
        } else {
            var gusto = '';
            var porcentaje = '';
        }

        var urlDestino = `resivido2.html?&nombre=${nombre}&email=${email}&telefono=${telefono}&gusto=${gusto}&porcentaje=${porcentaje}`;

        window.location.href = urlDestino;

        ocultarConfirmacion();
    });

    function cancelarCambios() {
        desactivarEdicion(filaEnEdicion);
        filaEnEdicion = null;
        ocultarConfirmacion();
    }

    document.getElementById('cancelar').addEventListener('click', cancelarCambios);

    document.getElementById('formulario-afiliacion').addEventListener('submit', function(event) {
        event.preventDefault();
    });
});
