---
title: DAW Práctica 1
author:
  - Falgueras Casarejos, Yago
  - Vidal Villalba, Pedro
date: 2025-02-09
---
# *El problema del viajante*
![Logo](images/logo.webp)

Vamos a crear una agencia de viajes ficticia en la que se ofrecerán todo tipo de servicios relacionados con la planificación y la gestión de viajes, incluyendo transporte, alojamiento, lugares de interés para visitar, ocio, restauración, etc.

## Sitios en los que nos hemos inspirado
- [Experience travel group](https://experiencetravelgroup.com)
- [Booking](https://booking.com)
- [Tripadvisor](https://tripadvisor.es)
- [Skyscanner](https://skyscanner.es)
- [Google Calendar](https://calendar.google.com/calendar/u/0/r)

## Tormenta de ideas
- Reserva de hoteles.
- Reserva de aviones.
- Reserva de otros medios de transporte. En general, cómo ir al lugar desde donde estés tú.
- Lugares de interés para visitar, con su foto, web, ubicación, etc. 
- Lugares de ocio, restauración, y otro tipo de tiendas conocidas en la zona.
- Calendario con planificación del viaje, desde el que acceder a la información sobre el medio de transporte elegido, alojamiento, etc. y que permita organizar los lugares de visita de cada día.
- Lista de lugares y tiendas favoritos, junto a un mapa integrado en donde aparezcan destacados.
- Experiencias exclusivas, con planificaciones de viajes realizadas previamente por expertos.

**Otros elementos**:
-  **Audiencia**: público genérico, ya que cada vez más personas viajan de forma relativamente habitual, y resulta de gran utilidad una página web desde la que poder gestionar todo el viaje.
-  **Elementos visuales**: principalmente imágenes y vídeos de cada lugar, mapas. Logo generado con IA que sea característico de la empresa.
-  **Financiación**: se podrían obtener beneficios a través de anuncios en la página. También se podría incluir un sistema de suscripción o mecenazgo con descuentos dentro de la página web, para clientes habituales.


## Inventario de contenido
- Presentación de la página
- Destinos de moda/recomendados
- Exploración (lugares menos conocidos, o aleatorios)
- About us: quiénes somos, nuestra historia, qué nos diferencia 
- Búsqueda de hoteles
- Búsqueda de medios de transporte (avión, tren, autobús, etc.)
- Lugares de visita, ocio, restauración, etc.
- Alquiler de coches
- Experiencias exclusivas
- Calendario para la planificación del viaje
- Mapa de lugares favoritos
- Newsletter con novedades
- FAQ
- Mecanismos de reserva con seguridad
- Seguro de viajes
- Consejos generales para viajes al extranjero
- Nuestro sistema de puntuación
- Experiencias exclusivas
- Opiniones de expertos 
- Certificados de calidad, premios
- Redes sociales
- Términos de uso, política de cookies, política de privacidad

## Arquitectura de información
- Página principal: Presentación de la página que llame la atención, newsletter, valoraciones, opiniones de expertos.
- Descubre: búsqueda de lugares visita, ocio, restauración etc., destinos de moda/recomendados, exploración, mapa de lugares favoritos.
- Planifica: calendario, consejos generales para viajes al extranjero, seguro de viajes, mecanismos de reserva con seguridad.
- Reserva: Búsqueda de hoteles, búsqueda de aviones y otros medios de transporte, alquiler de coches, reserva de restaurantes, experiencias exclusivas.
- About us: quiénes somos, nuestra historia, qué nos diferencia, FAQ, redes sociales, nuestro sistema de puntuación, certificados de calidad, premios
- Términos de uso, política de cookies, política de privacidad


```mermaid
---
title: Arquitectura de información
---
graph LR
    main["Página Principal"] 
    descubre["Descubre"] 
    planifica["Planifica"] 
    reserva["Reserva"] 
    about-us["About Us"] 
    legales["Legales"] 

    main -->|Explora| descubre
    main -->|Organiza| planifica
    main -->|Reserva| reserva
    main -->|Sobre nosotros| about-us
    main -->|Legales| legales

    %% Secciones de Descubre
    descubre -->|Búsqueda de lugares| descubre-lugares["Lugares"]
    descubre -->|Destinos recomendados| descubre-destinos["Destinos de moda"]
    descubre -->|Exploración| descubre-exploracion["Explora el mapa"]

    %% Secciones de Planifica
    planifica -->|Calendario de viajes| planifica-calendario["Calendario"]
    planifica -->|Consejos para viajar| planifica-consejos["Consejos"]
    planifica -->|Seguro de viaje| planifica-seguro["Seguro"]
    planifica -->|Reservas seguras| planifica-reservas["Seguridad en reservas"]

    %% Secciones de Reserva
    reserva -->|Hoteles| reserva-hoteles["Hoteles"]
    reserva -->|Vuelos y transporte| reserva-vuelos["Vuelos y Transporte"]
    reserva -->|Alquiler de coches| reserva-coches["Alquiler de coches"]
    reserva -->|Restaurantes| reserva-restaurantes["Restaurantes"]
    reserva -->|Experiencias exclusivas| reserva-experiencias["Experiencias"]

    %% Secciones de About Us
    about-us -->|Quiénes somos| about-quienes["Nuestra historia"]
    about-us -->|Sistema de puntuación| about-puntuacion["Sistema de puntuación"]
    about-us -->|Redes sociales| about-redes["Redes Sociales"]
    about-us -->|Certificaciones y premios| about-premios["Certificados y premios"]
    about-us -->|FAQ| about-faq["FAQ"]

    %% Secciones de Legales
    legales -->|Términos de uso| legales-terminos["Términos de Uso"]
    legales -->|Política de cookies| legales-cookies["Política de Cookies"]
    legales -->|Política de privacidad| legales-privacidad["Política de Privacidad"]
```
## Mapa de navegación
- Página principal: Presentación de la página que llame la atención, newsletter, opiniones de expertos.
- Reservas: Búsqueda de hoteles, búsqueda de aviones y otros medios de transporte, alquiler de coches, reserva de restaurantes, experiencias exclusivas.
- Destinos: búsqueda de lugares visita, ocio, restauración etc., destinos de moda/recomendados, exploración, mapa de lugares favoritos.
- Calendario de planificación: calendario, consejos generales para viajes al extranjero, seguro de viajes, mecanismos de reserva con seguridad.
- About us: quiénes somos, nuestra historia, qué nos diferencia, FAQ, redes sociales, nuestro sistema de puntuación, certificados de calidad, premios
- Términos de uso, política de cookies, política de privacidad

## Prototipo manual

![Página principal](images/1-principal.jpg)

![Descubre](images/2-descubre.jpg)

![Planifica](images/3-planifica.jpg)

![Reserva](images/4-reserva.jpg)

![About us](images/5-about_us.jpg)

## Esqueleto digital

## Diseño final
Paleta de colores: Catppuccin.
Fuente: Helvetica.
 
## Storyboard

## Estructura de ficheros
```mermaid
graph LR
project --> documentation & images & index[/index.html/] & html & scripts & styles
documentation --> doc-images[images]
```
