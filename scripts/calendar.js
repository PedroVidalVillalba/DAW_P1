document.addEventListener("DOMContentLoaded", function () {
    let rootPath = sessionStorage.getItem("rootPath");
    let selectedDate = new Date();
    let calendarInstance;

    // Cargar eventos desde JSON
    async function loadEvents() {
        try {
            const response = await fetch(rootPath + "/data/events.json");
            return await response.json();
        } catch (error) {
            console.error("Error cargando eventos:", error);
            return [];
        }
    }

    // Inicializar Flatpickr en el input
    flatpickr("#datepicker", {
        locale: "es",
        altInput: true,
        altFormat: "j \\de F, Y",
        allowInput: true,
        enableTime: false,

        dateFormat: "Y-m-d",
        minDate: "2024-01-01",
        maxDate: "2030-12-31",
        defaultDate: "today",
        onChange: async function (selectedDates) {
            selectedDate = selectedDates[0];

            if (calendarInstance) {
                calendarInstance.destroy(); // Destruye el calendario previo
            }

            const events = await loadEvents();
            initCalendar(events);
        }
    });

    // Crear calendario con eventos
    function initCalendar(events) {
        calendarInstance = flatpickr("#calendar", {
            inline: true,
            defaultDate: selectedDate,
            dateFormat: "Y-m-d",
            noCalendar: false,
            locale: "es",
            firstDayOfWeek: 1, // Comienza en lunes
            onReady: function (selectedDates, dateStr, instance) {
                // Obtiene la fecha seleccionada
                let selectedDate = selectedDates[0];

                // Calcula el primer y último día del mes seleccionado
                let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                let lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

                instance.set("minDate", firstDayOfMonth);
                instance.set("maxDate", lastDayOfMonth);
                highlightEvents(instance, events);
            },
            onChange: function(selectedDates, dateStr, instance) {
                // Obtiene la fecha seleccionada
                let selectedDate = selectedDates[0];

                // Calcula el primer y último día del mes seleccionado
                let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                let lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

                // Establece el minDate y maxDate en los primeros y últimos días del mes
                instance.set("minDate", firstDayOfMonth);
                instance.set("maxDate", lastDayOfMonth);
                highlightEvents(instance, events);
            }

        });
    }

    // Resaltar eventos en el calendario
    function highlightEvents(instance, events) {
        events.forEach(event => {
            let dateStr = event.date;
            let eventDay = instance.calendarContainer.querySelector(`[aria-label="${dateStr}"]`);
            if (eventDay) {
                eventDay.classList.add("event-day");
            }
        });
    }

    // Cargar eventos y mostrar calendario inicial
    loadEvents().then(events => initCalendar(events));
});
