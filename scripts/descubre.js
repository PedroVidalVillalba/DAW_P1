let map, markerGroup;
$(document).ready(function() {
    /* Inicializar el mapa de Leaflet */
    map = L.map('map').setView([0, 0], 2);  /* Vista por defecto */

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markerGroup = L.layerGroup().addTo(map);

    /* Cargar los destinos por defecto */
    loadDestinations($('.nav-link').eq(0).addClass('active').data('xml'));

    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        let xmlFile = $(this).data('xml');
        loadDestinations(xmlFile);

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    /* Evento para Enter en el input */
    $('.search input').on('keypress', function(e) {
        if (e.which === 13) {   /* Tecla Enter */
            showSearchPopup(this);
        }
    });

    /* Evento para click en el icono de la lupa */
    $('.search img').on('click', function() {
        showSearchPopup($(this).siblings('input'));
    });
});

function loadDestinations(xmlFile) {
    let rootPath = sessionStorage.getItem("rootPath");

    $.ajax({
        url: rootPath + "/data/descubre/" + xmlFile,
        type: "GET",
        dataType: "xml",
        success: function(xml) {
            /* Eliminar el contenido previo */
            $('#destinations').empty();

            /* Borrar los marcadores que hubiera en el mapa */
            markerGroup.clearLayers();
            map.setView([0, 0], 2);

            /* Procesar cada destino del archivo XML */
            $(xml).find('destination').each(function() {
                let imageSrc = $(this).find('image > src').text().trim();
                let imageAlt = $(this).find('image > alt').text().trim();
                let width = $(this).find('image > width').text().trim();
                let height = $(this).find('image > height').text().trim();
                let name = $(this).find('details > name').text().trim();
                let description = $(this).find('details > description').text().trim();
                let lowerPrice = $(this).find('details > price > lower').text().trim();
                let upperPrice = $(this).find('details > price > upper').text().trim();
                let latitude = parseFloat($(this).find('location > latitude').text().trim());
                let longitude = parseFloat($(this).find('location > longitude').text().trim());

                /* Construir la tarjeta del destino */
                let card = $('<div>', { class: 'destination-card' });

                /* Crear la imagen */
                let img = $('<img>', {
                    src: rootPath + "/images/" + imageSrc,
                    alt: imageAlt,
                    width: width,
                    height: height,
                    class: "destination-image"
                });

                let detailsDiv = $('<div>', { class: 'destination-details' });
                let title = $('<h2>').text(name);
                let descP = $('<p>').html('<strong>Descripción:</strong> ' + description);
                let priceP = $('<p>').html('<strong>Rango de precio:</strong> ' + lowerPrice + ' - ' + upperPrice + ' €');
                let reserveBtn = $('<button>', { class: 'reserve' }).text('Reserva');

                /* Ensamblar los detalles y la carta */
                detailsDiv.append(title, descP, priceP, reserveBtn);
                card.append(img, detailsDiv);

                /* Añadir a la sección de destinos */
                $('#destinations').append(card);

                /* Crear marcador en el mapa */
                let marker = L.marker([latitude, longitude], { riseOnHover: true }).addTo(markerGroup).bindPopup(name);

                /* Guardar referencias para hacerlo interactivo */
                card.data('marker', marker);
                marker.card = card;

                /* Eventos en la carta */
                card.hover(
                    function() {
                        marker.openPopup();
                        marker.setZIndexOffset(1000);
                        map.setView([latitude, longitude], 5);
                    },
                    function() {
                        marker.closePopup();
                        marker.setZIndexOffset(0);
                    }
                );
                card.on('click', function() {
                    map.setView([latitude, longitude], 12);
                });

                /* Eventos en el mapa */
                marker.on('mouseover', function() {
                    this.openPopup();
                    this.setZIndexOffset(1000);
                    this.card.addClass('highlight');
                });
                marker.on('mouseout', function() {
                    this.closePopup();
                    this.setZIndexOffset(0);
                    this.card.removeClass('highlight');
                });
                marker.on('click', function() {
                    map.setView([latitude, longitude], 12);
                });

                /* Popup de error si se pulsa en reservar */
                reserveBtn.click(function() {
                    /* Eliminar popups previos */
                    $(".popup-error").remove();

                    /* Crear y posicionar el popup */
                    let popup = $('<div class="popup-error">').text('Reserva no disponible en este momento');

                    /* Posicionar respecto al botón */
                    let btnPos = $(this).offset();
                    popup.css({
                        top: btnPos.top - 40,
                        left: btnPos.left + $(this).outerWidth()/2 - popup.outerWidth()/2,
                    });
                    $('body').append(popup);

                    setTimeout(() => popup.remove(), 3000);
                });
            });
        },
        error: function() {
            console.error('Error cargando el archivo XML');
        }
    });
}

function showSearchPopup(inputElement) {
    let input = $(inputElement);
    let popup = $('<div class="popup-error">').text("Búsqueda no disponible en este momento");

    /* Posicionamiento relativo al input */
    let offset = input.offset();
    popup.css({
        top: offset.top + input.outerHeight() + 10,
        left: offset.left,
    });

    $('body').append(popup);
    input.val('');  /* Vaciar el texto */

    setTimeout(() => popup.remove(), 3000);
}
