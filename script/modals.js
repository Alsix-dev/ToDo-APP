import { configurarFormulario } from "../script/crearTarea.js";


/* ######################### MODAL DE AGREGAR TAREA ########################## */
/* ############################# APERTURA */
// const btn_openAddTask = document.querySelector('.btn-openAddTask');
const overlay_createTaskModal = document.querySelector('#overlays');
const createTaskModal = document.querySelector('.createTaskModal');

document.addEventListener('click', (e) => {
    let estadoModal = null; // EDITAR | CREAR --> Referenciando a editar/crear tareas

    if(e.target.closest('.btn-openAddTask')){
        estadoModal = 'crear';
        configurarFormulario(estadoModal);
        alternarAperturaCierreModal();
    }

    if(e.target.closest('.btn-Edit')){
        const tarea = e.target.closest('.taskItem');
        estadoModal = 'editar';
        configurarFormulario(estadoModal, tarea);
        alternarAperturaCierreModal();
    }
});

/* ############################# CIERRE */
overlay_createTaskModal.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-cancelMenu');
    if(btn || e.target === overlay_createTaskModal){
        alternarAperturaCierreModal();
    }
});

const alternarAperturaCierreModal = () => {
    overlay_createTaskModal.classList.toggle('activeModals');
    createTaskModal.classList.toggle('active');
    return;
}