/* ############################# AGREGAR TAREA ############################# */
/* ######################################################################### */

/* ############################# APERTURA/CIERRE ############################# */
/* ############################# APERTURA */
const btn_openAddTask = document.querySelector('#btn-openAddTask');
const overlay_modalAddTask = document.querySelector('#overlays');
const modalAddTask = document.querySelector('.modalAddTask');

btn_openAddTask.addEventListener('click', () => {
    alternarAperturaCierre();
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
