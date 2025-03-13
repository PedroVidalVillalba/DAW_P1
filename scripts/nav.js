document.addEventListener("DOMContentLoaded", function () {
    const ROOT_NAME = "/P1/"
    // Obtener la ruta base del archivo actual
    const currentPath = window.location.pathname;
    // Localizar el directorio raíz
    const rootPath = currentPath.substring(0, currentPath.search(ROOT_NAME) + ROOT_NAME.length - 1);

    const navContainer = document.createElement("nav");
    navContainer.className = "main-nav";
    navContainer.innerHTML = `
        <a href="${rootPath}/index.html" class="logo-container" title="Inicio">
            <img src="${rootPath}/images/logo.png" width="100" height="100" alt="Logo">
            <p> El Problema del Viajante </p>
        </a>

        <p id="mobile-menu">&#9776;</p>
        
        <ul class="nav-links">
            <li> <a href="${rootPath}/html/descubre/descubre.html"> Descubre </a></li>
            <li> <a href="${rootPath}/html/planifica/planifica.html"> Planifica </a></li>
            <li> <a href="${rootPath}/html/reserva/reserva.html"> Reserva </a></li>
            <li> <a href="${rootPath}/html/about_us/about_us.html"> About us </a></li>
        </ul>

        <a href="${rootPath}/html/login/login.html" class="login" title="Login">
          <img id="login-icon" src="${rootPath}/images/login_icon.svg" width="80" height="80" alt="Login">
        </a>
    `;

    document.querySelector("header").appendChild(navContainer);

    // Gestionar el menú móvil manualmente en JavaScript
    const mobileMenu = document.getElementById("mobile-menu");
    const menuLinks = document.querySelector(".nav-links");

    mobileMenu.addEventListener("click", () => {
        menuLinks.style.display = (menuLinks.style.display === "none" ? "flex" : "none");
    })

    // document.querySelectorAll(".nav-links a").forEach(link => {
    //     link.addEventListener("click", () => {
    //         menuCheckbox.checked = false;
    //         () => menuLinks.style.display = menuCheckbox.checked ? "flex" : "none";
    //     });
    // });

    function checkScreenSize() {
        menuLinks.style.display = window.innerWidth > 900 ? "flex" : "none";
    }

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();
});