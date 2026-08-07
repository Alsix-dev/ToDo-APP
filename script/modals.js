/* ==========================================================================
   MODAL PARA CONFIGURAR TAREA: CREAR O EDITAR TAREA
   ==========================================================================
   • (>) Si se presiona el boton de agregar, se abrira el modal de crear tarea.
   • (>) Si se presiona el boton de editar, se abrira el modal de editar tarea.
   • [!] En ambos casos, se comparte el mismo modal, solo cambia el texto del
         titulo y boton, y como interactua el menu con la lista de tareas.

   • [!] CAPAS:
        . Funciones - Modal
        . Eventos - Modal
   ========================================================================== */

const overlay = document.getElementById('overlays');
const modal = document.getElementById('createTaskModal');

const estadoFormulario = {
    estado: '',
    tarea: null
}

/* ==========================================================================
        FUNCIONES - Modal
   ========================================================================== */

const abrirFormulario = () => {
    overlay.classList.add('activeModals');
    modal.classList.add('active');
}

const cerrarFormulario = () => {
    overlay.classList.remove('activeModals');
    modal.classList.remove('active');
}

function abrirFormularioCrearTarea(){
    configurarFormulario('crear');
    abrirFormulario();
}

function abrirFormularioEditarTarea(tarea){
    configurarFormulario('editar', tarea);
    abrirFormulario();
}

function configurarFormulario(estado, tarea = null){
    estadoFormulario.estado = estado;
    estadoFormulario.tarea = tarea;

    const titulo = modal.querySelector('.createTaskMenuTitle > h2');
    const boton = modal.querySelector('#btn-addTask');
    
    if(estado === 'crear'){
        titulo.textContent = 'NUEVA TAREA';
        boton.textContent = 'CREAR TAREA';
    } else {
        titulo.textContent = 'EDITAR TAREA';
        boton.textContent = 'EDITAR TAREA';
    }
}

function obtenerEstadoFormulario(){
    return estadoFormulario;
}

/* ==========================================================================
        EVENTOS - Modal
   ========================================================================== */
document.addEventListener('click', (event) => {
    const btn_Abrir = event.target.closest('.btn-openAddTask');
    if(btn_Abrir){
        abrirFormularioCrearTarea();
    }
    
    const btn_Editar = event.target.closest('.btn-Edit');
    if(btn_Editar){
        const tarea = event.target.closest('.taskItem');
        abrirFormularioEditarTarea(tarea);
    }
});

overlay.addEventListener('click', (event) => {
    const btn_Cerrar = event.target.closest('.btn-cancelMenu');
    const isOverlay = event.target;

    if(btn_Cerrar || isOverlay === overlay){
        cerrarFormulario();
    }
});

export {
    obtenerEstadoFormulario
}