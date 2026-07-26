document.querySelectorAll("[data-tarjeta]").forEach(btnRoot => {
    btnRoot.addEventListener("click", () => {
        const valorBtnRoot = btnRoot.dataset.tarjeta;

        document.querySelectorAll(".vistaMenu").forEach(view => view.classList.remove("activa"));
        if(valorBtnRoot !== "volverInicio"){
            const title = document.querySelector(".volverInicio h1");
            title.textContent = "VOLVER AL INICIO";
        } else {
            const title = document.querySelector(".volverInicio h1");
            title.textContent = "MENU";
        }

        if(valorBtnRoot === "estado")
        {
            document.querySelectorAll(".mostrarMain").forEach(view => view.classList.remove("activaMain"));
            document.getElementById(valorBtnRoot).classList.add("activaMain");
        } 
        else 
        {
            document.getElementById(valorBtnRoot).classList.add("activa");
        }
    });
});
