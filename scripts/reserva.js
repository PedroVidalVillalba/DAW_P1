$(document).ready(async function(){
    const rootPath = sessionStorage.getItem("rootPath");
    /* Cargar datos desde JSON */
    let services = await fetch(rootPath + "/data/services.json", { cache: "no-cache" }).then(response => response.json());
    let currentFilters = {
        type: 'all',
        rating: 0,
        destination: '',
        travelers: 1,
        services: [],
        dateRange: {start: null, end: null},
    }
    /* Inicializar Flatpickr en los inputs de fecha con el formato deseado */
    flatpickr("#start-date-filter", {
        dateFormat: "d/m/Y"
    });
    flatpickr("#end-date-filter", {
        dateFormat: "d/m/Y"
    });

    applyFilters();

    /* Eventos para cada filtro */
    $('.type-filter').on('click', function(e) {
        e.preventDefault();
        currentFilters.type = $(this).data('type');
        $('.type-filter').removeClass('active');
        $(this).addClass('active');
        applyFilters();
    });

    $('#destination-filter').on('input', function() {
        currentFilters.destination = $(this).val();
        applyFilters();
    });

    $('#travelers-filter').on('input', function() {
        currentFilters.travelers = +$(this).val() || 1;
        applyFilters();
    });

    $('#start-date-filter, #end-date-filter').on('change', function() {
        currentFilters.dateRange = {
            start: $('#start-date-filter').val(),
            end: $('#end-date-filter').val(),
        };
        applyFilters();
    })

    $('#rating-filter span').on('click', function(){
        let rating = parseInt($(this).data('value'));
        // Actualizar todas las estrellas según el rating seleccionado
        $('#rating-filter span').each(function(){
            let starVal = parseInt($(this).data('value'));
            if(starVal <= rating){
                $(this).addClass('filled').html('&#9733;'); // estrella rellena
            } else {
                $(this).removeClass('filled').html('&#9734;'); // estrella vacía
            }
        });
        $('#rating-filter input[name="rating"]').val(rating);
        currentFilters.rating = rating;
        applyFilters();
    });

    $('.service-checkbox').on('change', function() {
        const service = $(this).data('service');
        currentFilters.services = $('.service-checkbox:checked')
            .map((i, el) => $(el).data('service')).get();
        applyFilters();
    });

    function applyFilters() {
        const filtered = filterServices(services);
        renderCards(filtered);
        updateServiceFilters(filtered);
    }

    function filterServices(data) {
        return data.filter(service => {
            return (
                (currentFilters.type === 'all' || service.tipo === currentFilters.type) &&
                service.puntuacion >= currentFilters.rating &&
                service.destino.toLowerCase().includes(currentFilters.destination.toLowerCase()) &&
                service.capacidad >= currentFilters.travelers &&
                (currentFilters.services.length === 0 ||
                    currentFilters.services.every(s => service.servicios.includes(s))) &&
                (checkDateAvailability(service.disponibilidad, currentFilters.dateRange))
            );
        });
    }

    function renderCards(filteredServices) {
        $('#service-cards').empty().html(
            filteredServices.map(createCardElement).join('')
        );
        attachReserveHandlers();
    }


    function createCardElement(service) {
        return `
        <div class="service-card" data-id="${service.id}" data-type="${service.tipo}" 
             data-punctuation="${service.puntuacion}">
          <h3>${service.nombre} ${'★'.repeat(service.puntuacion)}${'☆'.repeat(5 - service.puntuacion)}</h3>
          <p>${service.destino} · ${service.capacidad} personas</p>
          <p class="price">Desde ${service.precio}€</p>
          <button class="reserve">Reservar</button>
        </div>
        `;
    }

    function attachReserveHandlers() {
        $('.reserve').off('click').on('click', function() {
            showPopup('Reserva no disponible', $(this));
        });
    }

    function showPopup(message, anchor) {
        $(".popup-error").remove();
        const popup = $(`<div class="popup-error">${message}</div>`);
        const pos = anchor.offset();
        popup.css({
            top: pos.top - 40,
            left: pos.left + anchor.outerWidth()/2 - popup.outerWidth()/2
        });
        $('body').append(popup);
        setTimeout(() => popup.remove(), 3000);
    }

    /* Función para parsear fechas en formato dd/mm/yyyy */
    function parseDMY(dateStr) {
        const parts = dateStr.split('/');
        if (parts.length !== 3) return new Date(dateStr);
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Meses en JS van de 0 a 11
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    function checkDateAvailability(disponibilidad, selected) {
        // Si no se ha seleccionado ninguna fecha, el servicio está disponible
        if (!selected.start && !selected.end) return true;

        let startAvailable = new Date(disponibilidad.inicio);
        let endAvailable = new Date(disponibilidad.fin);

        // Si se selecciona solo la fecha de inicio
        if (selected.start && !selected.end) {
            let startSelected = parseDMY(selected.start);
            return (startSelected.getTime() >= startAvailable.getTime());
        }

        // Si se selecciona solo la fecha de fin
        if (!selected.start && selected.end) {
            let endSelected = parseDMY(selected.end);
            return (endSelected.getTime() <= endAvailable.getTime());
        }

        // Si se seleccionan ambas fechas, se verifica que el rango completo esté dentro de la disponibilidad
        if (selected.start && selected.end) {
            let startSelected = parseDMY(selected.start);
            let endSelected = parseDMY(selected.end);
            return (startSelected.getTime() >= startAvailable.getTime() &&
                endSelected.getTime() <= endAvailable.getTime());
        }

        return false;
    }

    /* Función para generar checkboxes de servicios */
    function updateServiceFilters(visibleServices) {
        const allServices = visibleServices
            .flatMap(service => service.servicios)
            .filter((value, index, self) => self.indexOf(value) === index); // Servicios únicos

        const container = $('.checkbox-group');
        container.empty();

        allServices.forEach(service => {
            const label = service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
            container.append(`
            <label>
                <input type="checkbox" 
                       class="service-checkbox" 
                       data-service="${service}"
                       ${currentFilters.services.includes(service) ? 'checked' : ''}>
                ${label}
            </label>
        `);
        });

        // Re-asignar eventos
        $('.service-checkbox').off('change').on('change', function() {
            currentFilters.services = $('.service-checkbox:checked')
                .map((i, el) => $(el).data('service')).get();
            applyFilters();
        });
    }

});