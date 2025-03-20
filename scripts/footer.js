document.addEventListener("DOMContentLoaded", function () {
    let rootPath = localStorage.getItem("rootPath");

    const footerContainer = document.createElement("footer");
    footerContainer.className = "footer-container";
    footerContainer.innerHTML = `
        <p>&copy; El Problema del Viajante S.L.</p>
        <p>Registrado en España, Santiago de Compostela | CIF: X123456789</p>
        <p>
            <a href="${rootPath}/html/about_us/terms.html">Términos de uso</a> |
            <a href="${rootPath}/html/about_us/privacy.html">Política de privacidad</a>
        </p>
    `;

    document.querySelector("body").appendChild(footerContainer);

});