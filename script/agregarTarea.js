/* ############################# AGREGAR TAREA ############################# */
/* ######################################################################### */

/* ########################## ITEM AGREGAR TAREA ########################### */
// Si no existen tareas, entonces se muestra el boton agregar tarea como un item

const verificarSiHayTareas = () => {
    const contenedorLista = document.querySelector('#taskListItem');
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
    } else {
        emptyTask.remove();
    }
}



/* ############################# APERTURA/CIERRE ############################# */
/* ############################# APERTURA */
// const btn_openAddTask = document.querySelector('.btn-openAddTask');
const overlay_modalAddTask = document.querySelector('#overlays');
const modalAddTask = document.querySelector('.modalAddTask');

document.addEventListener('click', (e) => {
    if(e.target.closest('.btn-openAddTask')){
        alternarAperturaCierre();
    }
});

/* ############################# CIERRE */
overlay_modalAddTask.addEventListener('click', (e) => {
    if(e.target.closest('.btn-cancelMenu')) {
        alternarAperturaCierre();
    }

    if(e.target === overlay_modalAddTask){
        alternarAperturaCierre();
    }
});

const alternarAperturaCierre = () => {
    overlay_modalAddTask.classList.toggle('activeModals');
    modalAddTask.classList.toggle('active');
    return;
}

verificarSiHayTareas();