$(document).ready(function() {
    let rootPath = sessionStorage.getItem("rootPath");

    $.ajax({
        url: rootPath + "/html/descubre/destinations.xml",
        type: "GET",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('destination').each(function() {
                let imageSrc = $(this).find('image > src').text().trim();
                let imageAlt = $(this).find('image > alt').text().trim();
                let width = $(this).find('image > width').text().trim();
                let height = $(this).find('image > height').text().trim();
                let name = $(this).find('details > name').text().trim();
                let description = $(this).find('details > description').text().trim();
                let lowerPrice = $(this).find('details > price > lower').text().trim();
                let upperPrice = $(this).find('details > price > upper').text().trim();
                let locationURL = $(this).find('location').text().trim();

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

                /* Cuando se pase el ratón por encima de la carta,
                * cambiar la localización del mapa interactivo. */
                card.hover(function() {
                    $('#interactive-map').attr('src', locationURL);
                });
            });
        },
        error: function() {
            console.error('Error cargando el archivo XML');
        }
    });
});
