import { 
    verificarSiHayTareas 
} from "../script/operarTarea.js";

/* ==========================================================================
   APERTURA/CIERRE - PAPELERA
   ==========================================================================
   • [>] Si apretamos ELIMINAR se abre la opcion de arrastrar tarea y mover
        la tarea a la papelera.
   • [!] CAPAS:
        . FUNCIONES - PAPELERA
        . EVENTOS - PAPELERA
   ========================================================================== */
const listaTareas = document.getElementById('taskListItem');
const navRoot2 = document.querySelector('.navRoot2');
const papelera = document.querySelector('.papelera');

const movimientoTarea = {
    offsetX: 0,
    offsetY: 0,
    placeholder: null,
    arrastrando: false,
    tarea: null,
    estaSobrePapelera: false
}

/* ==========================================================================
   FUNCIONES - PAPELERA
   ========================================================================== */

function alternarMenu(contenedor){
    contenedor.querySelector('.btn-deleteNav2')
    .classList.toggle('activeNav');

    contenedor.querySelector('.btn-backNav2')
    .classList.toggle('activeNav');

    papelera.classList.toggle('activeTrash');
}

function crearFalsaTarea(tarea, coordenadas){
    movimientoTarea.placeholder = document.createElement('li');
    movimientoTarea.placeholder.classList.add('activarFalsaTarea');
    movimientoTarea.placeholder.style.height = `${coordenadas.height}px`;
    movimientoTarea.placeholder.style.width = `${coordenadas.width}px`;

    tarea.parentNode.insertBefore(
        movimientoTarea.placeholder,
        tarea
    );
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

listaTareas.addEventListener('pointerdown', (event) => {
    if(!papelera.classList.contains('activeTrash')) return

    const tarea = event.target.closest('.taskItem');
    if(!tarea || tarea.classList.contains('emptyTask')) return

    // Aqui empieza a tratarse el grap/drop.
    movimientoTarea.arrastrando = true;
    const movItem = tarea.getBoundingClientRect();
    movimientoTarea.offsetX = event.clientX - movItem.left;
    movimientoTarea.offsetY = event.clientY - movItem.top;

    const elementos = document.elementsFromPoint(event.clientX, event.clientY);
    if(elementos.includes(papelera)){
        movimientoTarea.estaSobrePapelera = true;
    }

    crearFalsaTarea(tarea, movItem);

    tarea.style.position = 'fixed';
    tarea.style.width = `${movItem.width}px`;
    tarea.style.height = `${movItem.height}px`;
    tarea.style.left = `${movItem.left}px`;
    tarea.style.top = `${movItem.top}px`;
    movimientoTarea.tarea = tarea;
});

document.addEventListener('pointermove', (event) => {
    if(!movimientoTarea.arrastrando) return 

    movimientoTarea.tarea.style.left =
    `${event.clientX - movimientoTarea.offsetX}px`;
    movimientoTarea.tarea.style.top = 
    `${event.clientY - movimientoTarea.offsetY}px`;

    const elementos = document.elementsFromPoint(
        event.clientX,
        event.clientY
    );

    movimientoTarea.estaSobrePapelera =
        elementos.includes(papelera);
});

papelera.addEventListener('pointerenter', (event) => {
    movimientoTarea.estaSobrePapelera = true;
});

papelera.addEventListener('pointerleave', (event) => {
    movimientoTarea.estaSobrePapelera = false;
});

document.addEventListener('pointerup', (event) => {
    if(!movimientoTarea.arrastrando) return
    movimientoTarea.arrastrando = false;

    if(movimientoTarea.estaSobrePapelera){
        movimientoTarea.tarea.remove();
        movimientoTarea.placeholder.remove();
        verificarSiHayTareas();
    } else {
        movimientoTarea.placeholder.replaceWith(movimientoTarea.tarea);
        movimientoTarea.tarea.style.position = "";
        movimientoTarea.tarea.style.left = "";
        movimientoTarea.tarea.style.top = "";
        movimientoTarea.tarea.style.width = "";
        movimientoTarea.tarea.style.height = "";
    }
    movimientoTarea.placeholder = null;
});
