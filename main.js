const url = 'http://localhost:3000/vermedicamentos';
const contenedor = document.querySelector('tbody');
let modalArticulo;
let opcion

document.addEventListener("DOMContentLoaded", function () {
    modalArticulo = new bootstrap.Modal(document.getElementById('agregarmedicamento'));
    const agregar = document.getElementById('agregar');
    const nombre = document.getElementById('nombre');
    const dosis = document.getElementById('dosis');
    const tiempo = document.getElementById('tiempo');
    const dias = document.getElementById('dias');
    const comentario = document.getElementById('comentario');
    const tipo = document.getElementById('hora_toma');

    // Limpia el formulario al salir
    agregar.addEventListener('click', () => {
        nombre.value = '';
        dosis.value = '';
        tiempo.value = '';
        dias.value = '';
        comentario.value = '';
        tipo.value = '';
        modalArticulo.show();
        opcion = 'crear';
        console.log(opcion);
    });

    cargarMedicamentos();

    const agregarMedicamentoBtn = document.getElementById('agregarMedicamento');
    agregarMedicamentoBtn.addEventListener('click', function () {
        
        console.log('aqui va')
        const nombre = document.getElementById('nombre').value;
        const dosis = document.getElementById('dosis').value;
        const tiempo = document.getElementById('tiempo').value;
        const dias = document.getElementById('dias').value;
        const comentario = document.getElementById('comentario').value;
        const tipo = document.getElementById('hora_toma').value;

        const data = {
            NombreMedicamento: nombre,
            DosisMedicamento: dosis,
            Frecuencia: tiempo,
            DuracionDias: dias,
            ComentarioMedicamento: comentario,
            MomentoDia: tipo
        };

        // Agrega medicamentos
      
        if (opcion == 'crear') { 
            fetch('http://localhost:3000/crearmedicamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Medicamento agregado correctamente', result);
                    cargarMedicamentos();
                })
                .catch(error => console.error('Error al agregar medicamento:', error));
            modalArticulo.hide();
        }
        // Editar medicamentos
        if (opcion == 'editar') {
            console.log("modificado")
            fetch(`http://localhost:3000/editarmedicamentos${idForm}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Medicamento editado correctamente', result);
                    cargarMedicamentos();

                })
                .catch(error => console.error('Error al agregar medicamento:', error));
            modalArticulo.hide();
        }
        //Tomar medicamento
        if (opcion == 'tomar') {
            console.log("modificado")
            fetch(`http://localhost:3000/editarmedicamentos${idForm}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Medicamento editado correctamente', result);
                    cargarMedicamentos();

                })
                .catch(error => console.error('Error al agregar medicamento:', error));
            modalArticulo.hide();
        }
    })


});

function cargarMedicamentos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrar(data);
        })
        .catch(error => console.log(error));
}

// Muestra la info de la tabla
function mostrar(articulos) {
    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    articulos.forEach(medicamento => {
        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${medicamento.MomentoDia}</td>
            <td data-id="${medicamento.ID}" style="display: none;">${medicamento.ID}</td>
            <td>${medicamento.NombreMedicamento}</td>
            <td>${medicamento.DosisMedicamento}</td>
            <td>${medicamento.Frecuencia}</td>
            <td>${medicamento.DuracionDias}</td>
            <td>${medicamento.hora_toma}</td>
            <td>${medicamento.ComentarioMedicamento}</td>
            
            <td class="text-center">
                <a type="submit" id="btnTomar" class="btnTomar btn btn-success">Tomar</a>
                <a type="submit" class="btnEditar btn btn-secondary">Editar</a>
                <a class="btnEliminar btn btn-danger">Eliminar</a>ck
            </td>
        `
    });
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Para eliminar
on(document, 'click', '.btnEliminar', e => {
    const fila = e.target.parentNode.parentNode;
    const ID = fila.querySelector('[data-id]').dataset.id;
    console.log(ID);
    alertify.confirm("Seguro que quieres eliminar el medicamento?",
        function () {
            fetch('http://localhost:3000/eliminarmedicamentos/' + ID, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload());
        },
        function () {
            alertify.error('Proceso cancelado');
        });
});

// Muestra para editar
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    const tipoform = fila.children[0].innerHTML
    idForm = fila.children[1].innerHTML;
    const nombreform = fila.children[2].innerHTML;
    const dosisform = fila.children[3].innerHTML;
    const tiempoform = fila.children[4].innerHTML;
    const diasform = fila.children[5].innerHTML;
    const comentarioform = fila.children[7].innerHTML;
    nombre.value = nombreform;
    dosis.value = dosisform;
    tiempo.value = tiempoform;
    dias.value = diasform;
    comentario.value = comentarioform;
    hora_toma.value = tipoform;
    modalArticulo.show();
    opcion = 'editar';
    console.log(`ID: ${idForm}, Nombre: ${nombreform}, Dosis: ${dosisform}, Tiempo: ${tiempoform}, Dias: ${diasform}, Comentario: ${comentarioform}, Tipo: ${tipoform}, opcion: ${opcion}`);
});

//setea opcion en editar
on(document, 'click', '.btnTomar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[1].innerHTML;
    opcion = 'tomar'
    console.log(opcion, `, La id es: ${idForm}` );

}) 