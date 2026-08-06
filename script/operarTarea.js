import { capitalizarTexto } from "../script/genericas.js";

/* ########################################################################################### */
/* ########################################################################################### */
document.addEventListener('DOMContentLoaded', () => {
    verificarSiHayTareas();                                             // Verificamos si hay o no tareas en lista, sino mostrmaos TAREA 0.
});

/* ########################################################################################### */
/* ########################################################################################### */
const contenedorLista = document.querySelector('#taskListItem');

/* ############################### HABILITAR BOTONES DE TAREA ################################ */
/* ###### Si la tarea esta creada/pausada/completa puede pasarse a progreso nuevamente  ###### */
/* ###### La tarea solo puede pausarse si esta se encuentra en progreso unicamente      ###### */
/* ########################################################################################### */
function iniciarTarea(tarea){
    tarea.classList.remove('taskIsPause', 'taskIsComplete');
    tarea.classList.add('taskInProgress');

    const checkbox = tarea.querySelector('.checkTask');
    checkbox.checked = false;
    checkbox.disabled = false;
}

function completarTarea(tarea){
    tarea.classList.remove('taskIsPause', 'taskInProgress');
    tarea.classList.add('taskIsComplete');
}

function pausarTarea(tarea){
    tarea.classList.remove('taskIsComplete', 'taskInProgress');
    tarea.classList.add('taskIsPause');
}

function eliminarTarea(tarea){
    tarea.remove();
    verificarSiHayTareas();
}

// modificar el addEventListener de form en crearTarea.js asi verifico por titulo si es para editar o crear.
function modificarTarea(tarea){
    const contenedorLista = document.querySelector('#taskListItem');
    const enterTitleTaskCreate = document.getElementById('enterTitleTaskCreate');
    const enterDetailsTaskCreate = document.getElementById('enterDetailsTaskCreate');
    const enterTaskDateCreate = document.getElementById('enterTaskDateCreate');
    const enterTaskCbCreate = document.getElementById('enterTaskCbCreate');

    let titleInputValue = capitalizarTexto(enterTitleTaskCreate.value);
    let detailsInputValue = enterDetailsTaskCreate.value;
    let dateInputValue = enterTaskDateCreate.value;
    let CBValue = enterTaskCbCreate.value;

    tarea.querySelector('.isTaskTitle > h2').textContent = titleInputValue;
    tarea.querySelector('.detailsInfo-Descripcion').textContent = detailsInputValue;
    tarea.querySelector('.taskDate').textContent = dateInputValue;
    tarea.querySelector('.taskCB').textContent = CBValue;
}

contenedorLista.addEventListener('click', (e) => {
    /* ################################# HABILITAR POR BTN START ################################# */
    if(e.target.closest('.btn-Start')){
        const tarea = e.target.closest('.taskItem');
        iniciarTarea(tarea);
    }

    /* ############################# HABILITAR/DESHABILITAR CHECKBOX ############################# */
    if(e.target.closest('.checkTask')){
        const tarea = e.target.closest('.taskItem');
        if(tarea.classList.contains('taskIsComplete')){
            iniciarTarea(tarea);
        } else {
            completarTarea(tarea);
        }
    }

    /* ################################# HABILITAR POR BTN PAUSE ################################# */
    if(e.target.closest('.btn-Pause')){
        const tarea = e.target.closest('.taskItem');
        if(tarea.classList.contains('taskInProgress')){
            pausarTarea(tarea);
        }
    }

    if(e.target.closest('.btn-Delete')){
        const tarea = e.target.closest('.taskItem');
        eliminarTarea(tarea);
    }
});


function verificarSiHayTareas(){
    const listaTareas = document.querySelectorAll('.taskItem');
    const emptyTask = document.querySelector('.emptyTask');

    if(listaTareas.length === 0 && !emptyTask){
        const li = document.createElement('li');
        li.className = 'taskItem emptyTask';
        li.innerHTML = `
            <div class="dataTaskItem">
                <button class="btn-openAddTask">
                    <h2>Agregar tarea</h2>
                    <span class="material-symbols-outlined">list_alt_add</span>
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
const verificarSiHayDetalles = (...detalles) => {
    return detalles.some(detalle => detalle.trim());
}

const devolverDetallesExtras = (fecha, colaborador) => {
    if(fecha.trim() || colaborador.trim()){
        return `
            <div class="detailsInfo-Extra">
                ${fecha.trim() ? `<p class='taskDate'>Fecha límite: ${
                    fecha.split('-').reverse().join('-')
                }</p>` : ``}
                ${colaborador.trim() ? `<p class="taskCB">Colaborador: ${colaborador}</p>` : ``}
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

export {
    devolverDetalles,
    verificarSiHayTareas,
    modificarTarea
}