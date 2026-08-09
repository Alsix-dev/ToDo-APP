/* ==========================================================================
   APERTURA/CIERRE - HISTORIAL
   ==========================================================================
   • [>] Si apretamos HISTORIAL se abre el historial de tareas que indican
        titulo y que accion ocurrio (se pauso, completo, elimino, etc).
   • [!] CAPAS:
        . FUNCIONES - HISTORIAL
        . EVENTOS - HISTORIAL
   ========================================================================== */

const navRoot1 = document.querySelector('.navRoot1');
const historial = document.querySelector('.historial');

/* ==========================================================================
   FUNCIONES - HISTORIAL
   ========================================================================== */

function alternarMenu(contenedor){
    contenedor.querySelector('.btn-historyNav1')
    .classList.toggle('activeNav');

    contenedor.querySelector('.btn-backNav1')
    .classList.toggle('activeNav');

    historial.classList.toggle('activeHistory');
}

function crearHistoriaTarea(titulo, estado){
    const historyList = document.querySelector('.historyList');
    const li = document.createElement('li');
    li.className = 'historyItem';
    li.innerHTML = `
        <p>${titulo}</p>
        <p>${estado}</p>
    `;
 
    historyList.appendChild(li);
}

/* ==========================================================================
   EVENTOS - HISTORIAL
   ========================================================================== */

navRoot1.addEventListener('click', (event) => {
    if(!event.target.closest('button')) return

    if(event.target.closest('.btn-historyNav1')){
        const contPadre = event.target.closest('.navContent');
        alternarMenu(contPadre);
    }

    if(event.target.closest('.btn-backNav1')){
        const contPadre = event.target.closest('.navContent');
        alternarMenu(contPadre);    
    }
});

export {
    crearHistoriaTarea
}
