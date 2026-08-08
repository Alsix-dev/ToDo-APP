import { 
    verificarSiHayTareas
} from "../script/operarTarea.js";

const input_BuscarTarea = document.getElementById('searchTaskInput');

input_BuscarTarea.addEventListener('input', (event) => {
    const listaVacia = document.querySelector('.emptyTask');
    if(!listaVacia){
        const tareas = [...document.querySelectorAll('.taskItem')];
        if(tareas.length > 0){
            let valorEntradaInput = event.target.value.toLowerCase();
            let tareasFiltradas = tareas.forEach(tarea => {
                const tituloTarea = tarea.querySelector('.isTaskTitle > h2').textContent.toLowerCase();

                tarea.style.display = tituloTarea.includes(valorEntradaInput) ? '' : 'none';
            });
        } else verificarSiHayTareas();
    }
});
