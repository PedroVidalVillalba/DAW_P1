document.addEventListener("DOMContentLoaded", function () {
    let rootPath = sessionStorage.getItem("rootPath");
    let eventsList = document.getElementById("events-list");
    let markedDates = [];

    // Cargar eventos desde JSON
    async function loadEvents() {
        try {
            const response = await fetch(rootPath + "/data/events.json", { cache: "no-cache" });
            if (!response.ok) throw new Error("Error al cargar el JSON");

            const data = await response.json();
            if (!data.events || !Array.isArray(data.events)) throw new Error("Formato incorrecto del JSON");
            displayEvents(data.events);
            return data.events;
        } catch (error) {
            console.error("Error cargando eventos:", error);
            return [];
        }
    }

    function formatDate(dateString) {
        let date = new Date(dateString);
        let options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    function displayEvents(events) {
        eventsList.innerHTML = "";

        for (let i = 0; i < events.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = `${formatDate(events[i].date)}: <strong>${events[i].title}</strong>`;
            eventsList.appendChild(li);
            markedDates.push(events[i].date); // Almacenar la fecha del evento
        }
    }

    function formatLocalDate(dateString) {
        let date = new Date(dateString);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Asegura que el mes tenga 2 dígitos
        let day = ("0" + date.getDate()).slice(-2); // Asegura que el día tenga 2 dígitos
        return `${year}-${month}-${day}`;
    }

    // Crear calendario con eventos
    async function initCalendar(events) {

        flatpickr("#calendar", {
            locale: "es",
            altInput: true,
            altFormat: "j \\de F, Y",
            allowInput: true,
            enableTime: false,

            dateFormat: "Y-m-d",
            minDate: "2024-01-01",
            maxDate: "2030-12-31",
            defaultDate: "today",

            inline: true,
            noCalendar: false,
            firstDayOfWeek: 1, // Comienza en lunes
            onReady: function (selectedDates, dateStr, instance) {
                highlightEvents(instance, events);
            },
            onMonthChange: function (selectedDates, dateStr, instance) {
                highlightEvents(instance, events);
            },
            onChange: function (selectedDates, dateStr, instance) {
                highlightEvents(instance, events);
            }
        });
    }

    // Resaltar eventos en el calendario
    function highlightEvents(instance, events) {
        setTimeout(function () {

            let days = instance.calendarContainer.querySelectorAll(".flatpickr-day");

            days.forEach(function (day) {
                let date = formatLocalDate(day.dateObj); // Formato YYYY-MM-DD

                // Comprobar si la fecha está en la lista de eventos
                if (markedDates.includes(date)) {
                    day.classList.add("event-day");
                }
            });
        }, 100);

    }


    // Cargar eventos y mostrar calendario inicial
    loadEvents().then(function (events) {
        initCalendar(events);
    });
});
