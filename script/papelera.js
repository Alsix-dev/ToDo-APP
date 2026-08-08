/* ==========================================================================
   APERTURA/CIERRE - PAPELERA
   ==========================================================================
   • [>] Si apretamos ELIMINAR se abre la opcion de arrastrar tarea y mover
        la tarea a la papelera.
   • [!] CAPAS:
        . FUNCIONES - PAPELERA
        . EVENTOS - PAPELERA
   ========================================================================== */

/* ==========================================================================
   FUNCIONES - PAPELERA
   ========================================================================== */
const navRoot2 = document.querySelector('.navRoot2');
function alternarMenu(contenedor){
    contenedor.querySelector('.btn-deleteNav2')
    .classList.toggle('activeNav');

    contenedor.querySelector('.btn-backNav2')
    .classList.toggle('activeNav');

    contenedor.querySelector('.papelera')
    .classList.toggle('activeTrash');
}

/* ==========================================================================
   EVENTOS - PAPELERA
   ========================================================================== */

navRoot2.addEventListener('click', (event) => {
    if(!event.target.closest('button')) return

    if(event.target.closest('.btn-deleteNav2')){
        const contPadre = event.target.closest('.navContent');
        alternarMenu(contPadre);
    }

    if(event.target.closest('.btn-backNav2')){
        const contPadre = event.target.closest('.navContent');
        alternarMenu(contPadre);
    }
});
