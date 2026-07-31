/* ######################### MODAL DE AGREGAR TAREA ########################## */
/* ############################# APERTURA */
// const btn_openAddTask = document.querySelector('.btn-openAddTask');
const overlay_modalAddTask = document.querySelector('#overlays');
const modalAddTask = document.querySelector('.modalAddTask');

document.addEventListener('click', (e) => {
    if(e.target.closest('.btn-openAddTask')){
        alternarAperturaCierreModal();
    }
});

/* ############################# CIERRE */
overlay_modalAddTask.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-cancelMenu');
    if(btn || e.target === overlay_modalAddTask){
        alternarAperturaCierreModal();
    }
});

const alternarAperturaCierreModal = () => {
    overlay_modalAddTask.classList.toggle('activeModals');
    modalAddTask.classList.toggle('active');
    return;
}