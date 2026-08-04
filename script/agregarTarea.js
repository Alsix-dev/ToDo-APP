document.addEventListener('DOMContentLoaded', () => {
    verificarSiHayTareas();                         // Verificamos si hay o no tareas en lista, sino mostrmaos TAREA 0.
});

/* ############################# AGREGAR TAREA ############################# */
/* ######################################################################### */
const contenedorLista = document.querySelector('#taskListItem');            // <UL> - Contenedor lista de tareas
const titleTaskInput = document.getElementById('titleTask');
const detailsTaskInput = document.getElementById('detailsTask');
const dateTaskInput = document.getElementById('dateTask');
const Collaborator = document.getElementById('CollaboratorTask');

function crearTarea(){
    let valuetitleTaskInput = titleTaskInput.value;
    let detailsTaskInputInput = detailsTaskInput.value;
    let dateTaskInputInput = dateTaskInput.value;
    let CollaboratorInput = Collaborator.value;

    const { buttonDetalles, contentDetalles } = devolverDetalles(
        detailsTaskInputInput,
        dateTaskInputInput, 
        CollaboratorInput 
    );

    const li = document.createElement('li');
    li.className = 'taskItem taskIsCreate';
    li.innerHTML = `
        <div class="dataTaskItem">
            <div class="mainTask">
                <input type="checkbox" class="todo-checkbox">
                <h2 class="titleh2">${titleTaskInput.value}</h2>
            </div>

            
            <div class="controlsRootTask">
                <button class="btn-Star">
                    <span class="material-symbols-outlined">play_circle</span>
                </button>
                <button class="btn-Pause">
                    <span class="material-symbols-outlined">pause_circle</span>
                </button>
                <button class="btn-Edit">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="btn-Delete">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>

        ${contentDetalles}
    `;

    return li;
}

/* ############################# TAREA 0: NO HAY TAREAS EN LISTA ############################# */
/* ###### Si no existen tareas, entonces se muestra el boton agregar tarea como un item ###### */
/* ########################################################################################### */
const verificarSiHayTareas = () => {
    const listaTareas = document.querySelectorAll('.taskItem');
    const emptyTask = document.querySelector('.emptyTask');
    if(listaTareas.length === 0 && !emptyTask){
        const li = document.createElement('li');
        li.className = 'emptyTask';
        li.innerHTML = `
            <div class="dataTaskItem">
                <button class="btn-openAddTask" data-btn-event="addTask">
                    <h2 class="titleh2">Agregar tarea</h2>
                    <span class="material-symbols-outlined iconoAddTask">list_alt_add</span>
                </button>
            </div>
        `;
        contenedorLista.appendChild(li);
    } else if (emptyTask){
        emptyTask.remove();
    }
}


/* ########################################### BOTON DETALLES ################################################# */
/* ###### Si no hay detalles, no mostramos el boton de detalles. Por ende, tampoco hay caja de detalles. ###### */
/* ############################################################################################################ */
/* ####################### NO/MOSTRAR BOTON DETALLES ######################## */
function verificarSiHayDetalles(...detalles){
    return detalles.some(detalle => detalle.trim());
}

const devolverDetallesExtras = (fecha, colaborador) => {
    if(fecha.trim() || colaborador.trim()){
        return `
            <div class="detailsInfo-Extra">
                ${fecha.trim() ? `<p>Fecha límite: ${
                    fecha.split('-').reverse().join('-')
                }</p>` : ``}
                ${colaborador.trim() ? `<p>Colaborador: ${colaborador}</p>` : ``}
            </div>
        `
    } else {
        return ``;
    }
}

function devolverDetalles(...detalles){
    // detalles[0]: descripcion | [1]: fecha | [2]: colaborador
    if(verificarSiHayDetalles(...detalles)){
        return {
            buttonDetalles: `
                <button class="btn-Details">
                    <span class="material-symbols-outlined">description</span>
                    Detalles
                </button>
            `,

            contentDetalles: `
                <div class="detailsInfoTask">
                    ${devolverDetallesExtras(detalles[1], detalles[2])}
                    ${detalles[0].trim() ? `<p class="detailsInfo-Descripcion">${detalles[0]}</p>` : ``}
                </div>
            `
        };
    } else {
        return {
            buttonDetalles: ``,
            contentDetalles: ``
        }
    }
}

/* ####################### ABRIR/CERRAR CAJA DETALLES ######################## */
contenedorLista.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-Details')
    if(!btn) return;
    e.target.closest('.taskItem')
        .querySelector('.detailsInfoTask')
        .classList.toggle('activeDetails');
});


/* ############################ VALIDACIONES DE INPUTS ############################# */
/* ###### Validamos la entrada de datos de cada input del boton agregar tarea ###### */
/* ################################################################################# */
const validarEntradaTitulo = () => {
    let errores = [];
    let valuetitleTaskInput = titleTaskInput.value;
    valuetitleTaskInput = valuetitleTaskInput.trim();       // Borramos espacios en blancos inicio y fin

    if(!valuetitleTaskInput){
        errores.push("El titulo es obligatorio");
    }

    if((valuetitleTaskInput.length > 0 && valuetitleTaskInput.length < 3)){
        errores.push("El mínimo permitido de titulo es de 3 caracteres");
    }

    if(valuetitleTaskInput.length > 100){
        errores.push("El máximo permitido de titulo es de 100 caracteres");
    }

    return errores;
}

const validarEntradaDetalles = () => {
    let errores = [];
    let detailsTaskInputInput = detailsTaskInput.value;
    detailsTaskInputInput = detailsTaskInputInput.trim();

    if(detailsTaskInputInput.length > 1000){
        errores.push("El máximo permitido en descripción es de 1000 caracteres");
    }

    return errores;
}

// const validarEntradaFecha = () => {
//     const fechaLocal = new Date().toLocaleDateString();
//     const dateTaskInput = document.getElementById('dateTask');
//     let dateTaskInputInput = dateTaskInput.value;
//     dateTaskInputInput = dateTaskInputInput.split('-').reverse.join('-');
// }

const validarEntradaColaborador = () => {
    let errores = [];
    let CollaboratorInput = Collaborator.value;
    CollaboratorInput = CollaboratorInput.trim();

    if(CollaboratorInput.length > 50){
        errores.push("El máximo permitido en colaborador es de 50 caracteres");
    }

    return errores;
}

const acumularErrores = () => {
    const listaErrores = [
        ...validarEntradaTitulo(),
        ...validarEntradaDetalles(),
        ...validarEntradaColaborador()
    ];

    return {
        hayError: listaErrores.length > 0,
        ...(listaErrores.length > 0 && {errores: listaErrores})
    };
}

function mostrarErrores(errores){
    const reportError = document.querySelector('.reportError');
    const MessageError = document.getElementById('MessageError');
    MessageError.replaceChildren();

    if(errores.length > 0){
        reportError.classList.add('activeError');
        errores.forEach(error => {
            let li = document.createElement('li');
            li.textContent = error;
            MessageError.appendChild(li);
        });
    } else {
        reportError.classList.remove('activeError');
    }
}

/* ################################### CREAR TAREA #################################### */
/* ###### Evento que ejecuta todas las funciones anteriores para crear una tarea ###### */
/* #################################################################################### */
const formAddTask = document.getElementById('formAddTask');
formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const {hayError, errores} = acumularErrores();
    if(hayError){
        mostrarErrores(errores);
        return
    }
    
    mostrarErrores([]);
    verificarSiHayTareas();
    const getNewTask = crearTarea();
    contenedorLista.appendChild(getNewTask);
});

// TaskInProgress, TaskIsPause, TaskIsComplete --> Falta TaskIsCreate (verde) y el boton de aceptar tarea 
                                                //  para que entre en progreso
// Si no hay datos extras, oslo el titulo. No habilitar el boton detalles.