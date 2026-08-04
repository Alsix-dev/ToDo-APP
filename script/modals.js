/* ######################### MODAL DE AGREGAR TAREA ########################## */
/* ############################# APERTURA */
// const btn_openAddTask = document.querySelector('.btn-openAddTask');
const overlay_createTaskModal = document.querySelector('#overlays');
const createTaskModal = document.querySelector('.createTaskModal');

document.addEventListener('click', (e) => {
    if(e.target.closest('.btn-openAddTask')){
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