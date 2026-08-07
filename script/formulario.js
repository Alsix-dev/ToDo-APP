import { 
    obtenerEstadoFormulario
} from "../script/modals.js";

import { 
    crearTarea 
} from "../script/crearTarea.js";

import { 
    editarTarea,
    verificarSiHayTareas
} from "../script/operarTarea.js";

const contenedorLista = document.querySelector('#taskListItem');

/* ==========================================================================
   FORMULARIO PARA CONFIGURAR TAREA: CREAR O EDITAR TAREA
   ==========================================================================
   • (>) Si se presiona el boton de crear tarea, se creara un <li>
   • (>) Si se presiona el boton de editar, se cambiaran los datos en el <li>
   • [!] En ambos casos, se comparte el mismo modal, solo cambia el texto del
         titulo y boton, y como interactua el menu con la lista de tareas.

   • [!] CAPAS:
        . Funciones - Formulario
        . Eventos - Formulario
   ========================================================================== */

const formConfigTarea = {
    formConfgTarea: document.getElementById('creatTaskForm'),
    newTitle: document.getElementById('enterTitleTaskCreate'),
    newDetails: document.getElementById('enterDetailsTaskCreate'),
    newDate: document.getElementById('enterTaskDateCreate'),
    newCB: document.getElementById('enterTaskCbCreate')
}

/* ==========================================================================
    VALIDAR - Formulario
   ========================================================================== */

// const validarEntradaTitulo = () => {
//     let errores = [];
//     let titleInputValue = formConfigTarea.title.value;
//     titleInputValue = titleInputValue.trim();       // Borramos espacios en blancos inicio y fin

//     if(!titleInputValue){
//         errores.push("El titulo es obligatorio");
//     }

//     if((titleInputValue.length > 0 && titleInputValue.length < 3)){
//         errores.push("El mínimo permitido de titulo es de 3 caracteres");
//     }

//     if(titleInputValue.length > 100){
//         errores.push("El máximo permitido de titulo es de 100 caracteres");
//     }

//     return errores;
// }

// const validarEntradaDetalles = () => {
//     let errores = [];
//     let detailsInputValue = formConfigTarea.details.value;
//     detailsInputValue = detailsInputValue.trim();

//     if(detailsInputValue.length > 1000){
//         errores.push("El máximo permitido en descripción es de 1000 caracteres");
//     }

//     return errores;
// }

// // const validarEntradaFecha = () => {
// //     const fechaLocal = new Date().toLocaleDateString();
// //     const enterTaskDateCreate = document.getElementById('dateTask');
// //     let dateTaskInputInput = enterTaskDateCreate.value;
// //     dateTaskInputInput = dateTaskInputInput.split('-').reverse.join('-');
// // }

// const validarEntradaColaborador = () => {
//     let errores = [];
//     let CBValue = formConfigTarea.colabollator.value;
//     CBValue = CBValue.trim();

//     if(CBValue.length > 50){
//         errores.push("El máximo permitido en colaborador es de 50 caracteres");
//     }

//     return errores;
// }

// const acumularErrores = () => {
//     const listaErrores = [
//         ...validarEntradaTitulo(),
//         ...validarEntradaDetalles(),
//         ...validarEntradaColaborador()
//     ];

//     return {
//         hayError: listaErrores.length > 0,
//         ...(listaErrores.length > 0 && {errores: listaErrores})
//     };
// }

// function mostrarErrores(errores){
//     const reportError = document.querySelector('.reportError');
//     const MessageError = document.getElementById('MessageError');
//     MessageError.replaceChildren();

//     if(errores.length > 0){
//         reportError.classList.add('activeError');
//         errores.forEach(error => {
//             let li = document.createElement('li');
//             li.textContent = error;
//             MessageError.appendChild(li);
//         });
//     } else {
//         reportError.classList.remove('activeError');
//     }
// }

// const validarFormulario = () => {
//     const { 
//         hayError,
//         errores
//     } = acumularErrores();

//     if(hayError){
//         mostrarErrores(errores);
//         return;
//     }
// }
// const limpiarErrores = () => {
//     mostrarErrores([]);
// }

/* ==========================================================================
        FUNCIONES - Formulario
   ========================================================================== */

const leerFormulario = () => {
    return {
        newTitle: formConfigTarea.newTitle.value.trim(),
        newDetails: formConfigTarea.newDetails.value.trim(),
        newDate: formConfigTarea.newDate.value,
        newCB: formConfigTarea.newCB.value.trim()
    }
}

function submitFormulario(event){
    event.preventDefault();

    const modoFormulario = obtenerEstadoFormulario();
    let valoresInputs = leerFormulario();

    if(modoFormulario.estado === 'crear'){
        const nuevaTarea = crearTarea(valoresInputs);
        contenedorLista.appendChild(nuevaTarea);    
        verificarSiHayTareas();
    } 
    else {
        editarTarea(modoFormulario.tarea, valoresInputs);
    }
}

/* ==========================================================================
        EVENTOS - Formulario
   ========================================================================== */
formConfigTarea.formConfgTarea.addEventListener('submit', submitFormulario);
