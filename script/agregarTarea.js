document.addEventListener('DOMContentLoaded', () => {
    verificarSiHayTareas();                         // Verificamos si hay o no tareas en lista, sino mostrmaos TAREA 0.
});

/* ############################# AGREGAR TAREA ############################# */
/* ######################################################################### */
const contenedorLista = document.querySelector('#taskListItem');            // <UL> - Contenedor lista de tareas

function crearTarea(){
    const titleTaskInput = document.getElementById('titleTask');
    const detailsTaskInput = document.getElementById('detailsTask');
    const dateTaskInput = document.getElementById('dateTask');
    const Collaborator = document.getElementById('CollaboratorTask');

    let valuetitleTaskInput = titleTaskInput.value;
    let detailsTaskInputInput = detailsTaskInput.value;
    let dateTaskInputInput = dateTaskInput.value;
    let CollaboratorInput = Collaborator.value;

    const { buttonDetalles, contentDetalles } = devolverDetalles(detailsTaskInputInput, dateTaskInputInput, CollaboratorInput );

    const li = document.createElement('li');
    li.className = 'taskItem taskInProgress';
    li.innerHTML = `
        <div class="dataTaskItem">
            <div class="mainTask">
                <input type="checkbox" class="todo-checkbox">
                <h2 class="titleh2">${titleTaskInput.value}</h2>
            </div>
            
            ${buttonDetalles}
            
            <div class="controlsRootTask">
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

const formAddTask = document.getElementById('formAddTask');
formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();
    verificarSiHayTareas();
    const getNewTask = crearTarea();
    contenedorLista.appendChild(getNewTask);
});

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
                    <span class="material-symbols-outlined iconoAddTask">add_circle</span>
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
                    ${detalles[1].trim() ? `<p>Fecha límite: ${detalles[1]}</p>` : ``}
                    ${detalles[2].trim() ? `<p>Colaborador: ${detalles[2]}</p>` : ``}
                    ${detalles[0].trim() ? `<p>${detalles[0]}</p>` : ``}
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


// TaskInProgress, TaskIsPause, TaskIsComplete --> Falta TaskIsCreate (verde) y el boton de aceptar tarea 
                                                //  para que entre en progreso
// Si no hay datos extras, oslo el titulo. No habilitar el boton detalles.