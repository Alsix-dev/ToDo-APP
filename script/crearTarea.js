import { 
    devolverDetalles
} from "../script/operarTarea.js";

document.addEventListener('DOMContentLoaded', () => {
    verificarSiHayTareas();                         // Verificamos si hay o no tareas en lista, sino mostrmaos TAREA 0.
});

/* ############################# AGREGAR TAREA ############################# */
/* ######################################################################### */
const contenedorLista           = document.querySelector('#taskListItem');            // <UL> - Contenedor lista de tareas
const enterTitleTaskCreate      = document.getElementById('enterTitleTaskCreate');
const enterDetailsTaskCreate    = document.getElementById('enterDetailsTaskCreate');
const enterTaskDateCreate       = document.getElementById('enterTaskDateCreate');
const enterTaskCbCreate         = document.getElementById('enterTaskCbCreate');

/* ############################# TAREA 0: NO HAY TAREAS EN LISTA ############################# */
/* ###### Si no existen tareas, entonces se muestra el boton agregar tarea como un item ###### */
/* ########################################################################################### */
function verificarSiHayTareas(){
    const listaTareas = document.querySelectorAll('.taskItem');
    const emptyTask = document.querySelector('.emptyTask');
    if(listaTareas.length === 0 && !emptyTask){
        const li = document.createElement('li');
        li.className = 'taskItem emptyTask';
        li.innerHTML = `
            <div class="dataTaskItem">
                <button class="btn-openAddTask">
                    <h2 class="titleh2">Agregar tarea</h2>
                    <span class="material-symbols-outlined">list_alt_add</span>
                </button>
            </div>
        `;
        contenedorLista.appendChild(li);
    } else if (emptyTask){
        emptyTask.remove();
    }
}

/* ############################ VALIDACIONES DE INPUTS ############################# */
/* ###### Validamos la entrada de datos de cada input del boton agregar tarea ###### */
/* ################################################################################# */
const validarEntradaTitulo = () => {
    let errores = [];
    let titleInputValue = enterTitleTaskCreate.value;
    titleInputValue = titleInputValue.trim();       // Borramos espacios en blancos inicio y fin

    if(!titleInputValue){
        errores.push("El titulo es obligatorio");
    }

    if((titleInputValue.length > 0 && titleInputValue.length < 3)){
        errores.push("El mínimo permitido de titulo es de 3 caracteres");
    }

    if(titleInputValue.length > 100){
        errores.push("El máximo permitido de titulo es de 100 caracteres");
    }

    return errores;
}

const validarEntradaDetalles = () => {
    let errores = [];
    let detailsInputValue = enterDetailsTaskCreate.value;
    detailsInputValue = detailsInputValue.trim();

    if(detailsInputValue.length > 1000){
        errores.push("El máximo permitido en descripción es de 1000 caracteres");
    }

    return errores;
}

// const validarEntradaFecha = () => {
//     const fechaLocal = new Date().toLocaleDateString();
//     const enterTaskDateCreate = document.getElementById('dateTask');
//     let dateTaskInputInput = enterTaskDateCreate.value;
//     dateTaskInputInput = dateTaskInputInput.split('-').reverse.join('-');
// }

const validarEntradaColaborador = () => {
    let errores = [];
    let CBValue = enterTaskCbCreate.value;
    CBValue = CBValue.trim();

    if(CBValue.length > 50){
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

function capitalizarTexto(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const crearTarea = () => {
    let titleInputValue     = enterTitleTaskCreate.value;
    let detailsInputValue   = enterDetailsTaskCreate.value;
    let dateInputValue      = enterTaskDateCreate.value;
    let CBValue             = enterTaskCbCreate.value;

    const { 
        buttonDetalles, 
        contentDetalles } = devolverDetalles(
        detailsInputValue,
        dateInputValue, 
        CBValue 
    );

    let titleCapitalizado = capitalizarTexto(titleInputValue);

    const li = document.createElement('li');
    li.className = 'taskItem taskIsCreate';
    li.innerHTML = `
        <div class="dataTaskItem">

            <div class="checkCompleteTask">
                <input type="checkbox" class="checkTask">
            </div>

            <div class="isTaskTitle">
                <h2 class="titleh2">${titleCapitalizado}</h2>
            </div>
            
            ${buttonDetalles}

            <div class="taskRootControls">
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

const creatTaskForm = document.getElementById('creatTaskForm');
creatTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const {
        hayError, 
        errores
    } = acumularErrores();

    if(hayError){
        mostrarErrores(errores);
        return
    }

    mostrarErrores([]);
    verificarSiHayTareas();

    const getNewTask = crearTarea();
    contenedorLista.appendChild(getNewTask);
});
