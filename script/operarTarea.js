/* ########################################################################################### */
/* ########################################################################################### */
document.addEventListener('DOMContentLoaded', () => {
    verificarSiHayTareas();                                             // Verificamos si hay o no tareas en lista, sino mostrmaos TAREA 0.
});

/* ########################################################################################### */
/* ########################################################################################### */
const contenedorLista = document.querySelector('#taskListItem');

/* ############################# HABILITAR/DESHABILITAR CHECKBOX ############################# */
/* ###### Si es solo completada/pausa/en progreso se habilita el checkbox, si no, no    ###### */
/* ########################################################################################### */

// Debo habilitarlo cuando este en progreso.

// taskItem.addEventListener('click', () => {
//     const taskCheckBox = classList.closest('.checkTask');
        // si esta en progreso, se habilita el disabled a true.
// });

/* ############################# TAREA 0: NO HAY TAREAS EN LISTA ############################# */
/* ###### Si no existen tareas, entonces se muestra el boton agregar tarea como un item ###### */
/* ########################################################################################### */

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
                ${fecha.trim() ? `<p>Fecha límite: ${
                    fecha.split('-').reverse().join('-')
                }</p>` : ``}
                ${colaborador.trim() ? `<p>Colaborador: ${colaborador}</p>` : ``}
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


/* ############################### ENTRAR A TAREA EN PROGRESO ################################ */
/* ###### Si la tarea esta creada/pausada/completa puede pasarse a progreso nuevamente  ###### */
/* ########################################################################################### */

contenedorLista.addEventListener('click', (e) => {
    if(e.target.closest('.btn-Start')){
        const tarea = e.target.closest('.taskItem');
        tarea.classList.add('taskInProgress');
    }
});









export {
    devolverDetalles,
    verificarSiHayTareas
}