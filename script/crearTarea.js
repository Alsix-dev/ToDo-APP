import { 
    capitalizarTexto 
} from "../script/genericas.js";

/* ==========================================================================
   OPERAR TAREA
   ==========================================================================
   • [!] Si hay detalles se crea el boton de detalles, caso contrario no 
         aparece. Detallaes son: fecha o colaborador o descripcion.
   • [!] CAPAS:
        . FUNCIONES - CREAR - TAREA
   ========================================================================== */

const crearBotonesTarea = () => {
    return `
        <div class="taskRootControls">
            <button class="btn-Start">
                <span class="material-symbols-outlined">play_circle</span>
            </button>
            <button class="btn-Pause">
                <span class="material-symbols-outlined">pause_circle</span>
            </button>
            <button class="btn-Edit">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn-Delete">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `
}

const devolverFecha = (fecha) => {
    if(fecha){
        return `
            <p class='taskDate'>
                Fecha límite: ${fecha.split('-').reverse().join('-')}
            </p>`
    } else return ``;
}

const devolverColaborador = (colaborador) => {
    if(colaborador){
        return `
            <p class='taskCB'>
                Colaborador: ${colaborador}
            </p>`
    } else return ``;
}

const devolverDescripcion = (descripcion) => {
    if(descripcion){
        return `
            <p class='detailsInfo-Descripcion'>
                ${descripcion}
            </p>`
    } else return ``;
}

function verificarDetalles(...detalles){
    return detalles.some(detalle => detalle);
}

function habilitadBoton(){
    return `
    <button class="btn-Details">
        <span class="material-symbols-outlined">description</span>
        Detalles
    </button>`;
}

function crearDetalles(descripcion, fecha, colaborador){
    const flag = {
        buttonTask: ``,
        detailsTask: ``
    }

    let hayCajaDeDetalles = verificarDetalles(descripcion, fecha, colaborador);
    if(hayCajaDeDetalles){
        const tarea_Descripcion = devolverDescripcion(descripcion);
        const tarea_Fecha = devolverFecha(fecha);
        const tarea_Colaborador = devolverColaborador(colaborador);
        let acumularContenido = "";
        flag.buttonTask = habilitadBoton();

        if(fecha || colaborador){
            acumularContenido += `
                <div class="detailsInfo-Extra">
                    ${devolverFecha(fecha)}
                    ${devolverColaborador(colaborador)}
                </div>
            `
        }
        if(descripcion){
            acumularContenido += `
                <div class="detailsInfoTask">
                    ${devolverDescripcion(descripcion)}
                </div>
            `
        }

        flag.detailsTask = `
        <div class="detailsInfoTask">
            ${acumularContenido}
        </div>
        `;
    }
    return flag;
}

function crearTarea(datos){
    const { 
        buttonTask, 
        detailsTask } = crearDetalles(
        datos.newDetails, 
        datos.newDate, 
        datos.newCB
    );

    let titleCapitalize = capitalizarTexto(datos.newTitle);
    
    const li = document.createElement('li');
    li.className = 'taskItem taskIsCreate';
    li.innerHTML = `
        <div class="dataTaskItem">

            <div class="checkCompleteTask">
                <input type="checkbox" class="checkTask" disabled>
            </div>

            <div class="isTaskTitle">
                <h2>${titleCapitalize}</h2>
            </div>

            <div class="disabledBtn-Details">
                ${buttonTask}
            </div>

            ${crearBotonesTarea()}
        </div>

        <div class="contentDetailsTask">
            ${detailsTask}
        </div>
    `;
    return li;
}

export {
    crearDetalles,
    crearTarea
}
