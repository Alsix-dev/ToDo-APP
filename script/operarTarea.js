const contenedorLista           = document.querySelector('#taskListItem');

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

export function devolverDetalles(...detalles){
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