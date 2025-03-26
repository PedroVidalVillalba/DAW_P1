document.addEventListener("DOMContentLoaded", function () {
    // Se busca si ya se ha obtenido la ruta base. Solo se calcula la primera vez
    let rootPath = localStorage.getItem("rootPath");

    if (!rootPath) {
        const currentPath = window.location.pathname;

        if (currentPath.endsWith("/index.html")) {
            // Caso habitual: abrir la página en index.html
            rootPath = currentPath.replace("/index.html", "");
        } else {
            // Si estamos en otra página, buscar la parte del path antes de "/html/"
            const match = currentPath.match(/^(.*?\/)html\//);
            rootPath = match ? match[1].slice(0, -1) : "."; // Si no encuentra "/html/", usar "."
        }

        // Guardar la ruta para futuras cargas
        localStorage.setItem("rootPath", rootPath);
    }


    const navContainer = document.createElement("nav");
    navContainer.className = "main-nav";
    navContainer.innerHTML = `
        <a href="${rootPath}/index.html" class="logo-container" title="Inicio">
            <img src="${rootPath}/images/logo.svg" width="100" height="100" alt="Logo">
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
    const menuSidebar = document.createElement("div");
    menuSidebar.id = "mobile-menu-sidebar";
    menuSidebar.innerHTML = `
        <button id="close-menu">➡</button>
        <ul id="menu-content" class="nav-links">
            <li> <a href="${rootPath}/html/descubre/descubre.html"> Descubre </a></li>
            <li> <a href="${rootPath}/html/planifica/planifica.html"> Planifica </a></li>
            <li> <a href="${rootPath}/html/reserva/reserva.html"> Reserva </a></li>
            <li> <a href="${rootPath}/html/about_us/about_us.html"> About us </a></li>
        </ul>
    `;

    document.body.appendChild(menuSidebar);
    const closeButton = document.getElementById("close-menu");


    mobileMenu.addEventListener("click", function () {
        menuSidebar.classList.add("open"); // Muestra el menú
    });
    closeButton.addEventListener("click", function () {
        menuSidebar.classList.remove("open"); // Oculta el menú
    });


    const menuLinks = document.querySelector(".nav-links");
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