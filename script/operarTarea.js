import { 
    capitalizarTexto 
} from "../script/genericas.js";

import { 
    crearDetalles 
} from "../script/crearTarea.js";

import { 
    crearHistoriaTarea 
} from "../script/historial.js"

const contenedorLista = document.querySelector('#taskListItem');

/* ==========================================================================
   OPERAR TAREA
   ==========================================================================
   • [!] Si hay detalles se crea el boton de detalles, caso contrario no 
         aparece. Detallaes son: fecha o colaborador o descripcion.
   • [!] CAPAS:
        . FUNCIONES - MODIFICAR - TAREA
        . FUNCIONES - CREAR - TAREA
        . EVENTOS - TAREA
   ========================================================================== */

function obtenerHistoriaTarea(){
    return historiaTarea;
}

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

/* ==========================================================================
   FUNCIONES - OPERAR - TAREA
   ========================================================================== */
function iniciarTarea(tarea){
    tarea.classList.remove('taskIsPause', 'taskIsComplete');
    tarea.classList.add('taskInProgress');

    const checkbox = tarea.querySelector('.checkTask');
    checkbox.checked = false;
    checkbox.disabled = false;

    const tituloTarea = tarea.querySelector('.isTaskTitle > h2').textContent;
    crearHistoriaTarea(tituloTarea, 'Entro en progreso');
}

function completarTarea(tarea){
    tarea.classList.remove('taskIsPause', 'taskInProgress');
    tarea.classList.add('taskIsComplete');

    const tituloTarea = tarea.querySelector('.isTaskTitle > h2').textContent;
    crearHistoriaTarea(tituloTarea, 'Se a completado');
}

function pausarTarea(tarea){
    tarea.classList.remove('taskIsComplete', 'taskInProgress');
    tarea.classList.add('taskIsPause');

    const tituloTarea = tarea.querySelector('.isTaskTitle > h2').textContent;
    crearHistoriaTarea(tituloTarea, 'Se ha pausado');
}

function eliminarTarea(tarea){
    tarea.remove();
    const tituloTarea = tarea.querySelector('.isTaskTitle > h2').textContent;
    crearHistoriaTarea(tituloTarea, 'Se ha eliminado');
    verificarSiHayTareas();
}

/* ==========================================================================
   MODIFICAR - TAREA
   ========================================================================== */
// Siempre que se modifique, se desactiva el activeDetails para ocultar los detalles automaticamente.
function editarTarea(tarea, datos){
    const btn_Detalles = tarea.querySelector('.btn-Details');
    const { 
        buttonTask, 
        detailsTask } = crearDetalles(
        datos.newDetails, 
        datos.newDate, 
        datos.newCB
    );

    // Caso 1: Solo edita el titulo, pero no ingresa nada mas.
    if(datos.newTitle){
        tarea.querySelector('.isTaskTitle > h2').textContent = datos.newTitle;
    }
    
    // Caso 2: No hay boton inicialmente. Pero, se agregan datos como para crear uno.
    if(!btn_Detalles && buttonTask){
        tarea.querySelector('.disabledBtn-Details')
            .innerHTML = buttonTask;

        tarea.querySelector('.contentDetailsTask')
            .innerHTML = detailsTask;
    }

    // Caso 3: Si hay boton inicialmente. Si hay detalles, se actualizan los detalles.
    if(btn_Detalles && detailsTask){
        tarea.querySelector('.contentDetailsTask')
            .innerHTML = detailsTask;
    }

    // Caso 4: Si hay boton inicialmente. Pero, no hay detalles, se debe borrar el
    //          boton y la descripcion.
    if(btn_Detalles && !detailsTask){
        tarea.querySelector('.disabledBtn-Details')
            .innerHTML = buttonTask;

        tarea.querySelector('.contentDetailsTask')
            .innerHTML = detailsTask;
    }   
}

/* ==========================================================================
        EVENTOS - TAREA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    verificarSiHayTareas();                                             // Verificamos si hay o no tareas en lista, sino mostrmaos TAREA 0.
});

contenedorLista.addEventListener('click', (event) => {
    if(event.target.closest('.btn-Details')){
        event.target.closest('.taskItem')
            .querySelector('.contentDetailsTask')
            .classList.toggle('activeDetails');
    }

    /* ################################# HABILITAR POR BTN START ################################# */
    if(event.target.closest('.btn-Start')){
        const tarea = event.target.closest('.taskItem');
        iniciarTarea(tarea);
    }

    /* ############################# HABILITAR/DESHABILITAR CHECKBOX ############################# */
    if(event.target.closest('.checkTask')){
        const tarea = event.target.closest('.taskItem');
        if(tarea.classList.contains('taskIsComplete')){
            iniciarTarea(tarea);
        } else {
            completarTarea(tarea);
        }
    }

    /* ################################# HABILITAR POR BTN PAUSE ################################# */
    if(event.target.closest('.btn-Pause')){
        const tarea = event.target.closest('.taskItem');
        if(tarea.classList.contains('taskInProgress')){
            pausarTarea(tarea);
        }
    }
    /* ################################# HABILITAR POR BTN delete ################################# */
    if(event.target.closest('.btn-Delete')){
        const tarea = event.target.closest('.taskItem');
        eliminarTarea(tarea);
    }
});

export {
    verificarSiHayTareas,
    editarTarea
}