# 🔗 CivicLink: El Waze para la Gestión Urbana

## 💡 Visión General

**CivicLink** transforma el reporte ciudadano pasivo en una red de detección urbana en tiempo real. Resolvemos la "ceguera operativa" municipal permitiendo que los ciudadanos reporten incidencias en segundos, la comunidad valide la señal y la Inteligencia Artificial automatice la priorización, garantizando una respuesta eficiente y transparente de los servicios públicos.

> **Frase de Anclaje:** *"CivicLink es el Waze de la ciudad: los ciudadanos reportan en segundos lo que pasa en la calle, la comunidad valida en tiempo real, y el ayuntamiento recibe incidencias ya priorizadas y geolocalizadas con trazabilidad hasta su resolución."*

## ✨ El Sistema de Impacto (Ciclo Cerrado)

El valor de CivicLink reside en la interconexión de sus tres componentes, creando un ciclo continuo de feedback y acción:


| Componente | Rol Principal | Impacto Clave |
| :--- | :--- | :--- |
| **A. Interfaz Ciudadano** | Detección y Generación de Señal | Reporte instantáneo con selección de **Gravedad** y seguimiento tipo "paquete". |
| **B. Capa de Verificación** | Inteligencia Colectiva | Valida la Confianza de los reportes y permite visualizar **Mapas de Densidad (Heatmaps)**. |
| **C. Consola Servicios Públicos** | Ejecución Estratégica | Bandeja de entrada con incidencias **deduplicadas y priorizadas por riesgo**, no por orden de llegada. |

## 🚀 Características Clave del Prototipo

Este repositorio contiene una demo funcional del sistema completo, enfocada en la interacción en tiempo real y la persistencia básica de datos.

### Funcionalidades Demostrables:

* **Reporte Dinámico con Persistencia:** El formulario permite seleccionar la **Categoría** y la **Gravedad** del problema. Todos los reportes se guardan en el `incidentsDataset` (simulación de base de datos).
* **Priorización con Gravedad:** La gravedad definida por el ciudadano influye en el cálculo inicial de **Prioridad (Riesgo)** de la IA.
* **Validación Activa:** La Pestaña B muestra una lista dinámica de incidencias pendientes de validación. La comunidad puede **Confirmar** o marcar como **Duplicado/Inválido**, ajustando el Score de Confianza del incidente.
* **Tracking en Vivo:** La Pestaña A muestra el estado del último reporte enviado (`Recibido` → `Asignado` → `En Curso` → `Resuelto`) a medida que el operador municipal avanza el caso.
* **Diseño Moderno y Limpio:** La interfaz sigue una estética minimalista, priorizando el espacio en blanco y la tipografía limpia para una presentación profesional de PC.

## 🛠️ Tecnología

El proyecto es un prototipo *frontend-only* diseñado para ser una demo rápida y convincente:

* **HTML5/CSS3:** Estructura y diseño.
* **CSS Minimalista Moderno:** Estilo limpio y profesional (inspirado en la estética moderna de Apple).
* **JavaScript (ES6):** Maneja toda la lógica de estado (`incidentsDataset`), manipulación de datos, cálculo de prioridad, y la actualización dinámica de las tres pestañas.
* **Google Maps Iframe:** Utilizado como prototipo visual para la densidad de incidencias (heatmap) en la Pestaña B.

## ⚙️ Cómo Ejecutar el Proyecto

Este proyecto no requiere servidor.

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/Raulax54/HACKATHON1212.git
    cd civiclink
    ```
2.  **Abrir:** Abre el archivo `index.html` directamente en tu navegador (Chrome, Firefox, etc.).

## 🧭 Flujo de Demostración Recomendado

Utiliza este flujo para mostrar el valor de **CivicLink** en minutos:

1.  **Pestaña A (Reporte):**
    * Reporta una nueva incidencia seleccionando **Gravedad Alta**.
    * Muestra cómo el **Tracking** se activa inmediatamente en `Recibido`.

2.  **Pestaña B (Validación):**
    * Muestra la **lista de validación** y cómo la nueva incidencia aparece para ser validada.
    * Haz clic en **"Confirmar Incidencia"** para subir la confiabilidad del reporte.

3.  **Pestaña C (Consola):**
    * Muestra la incidencia recién creada en la parte superior de la tabla con una alta **Prioridad (Riesgo)**.
    * Usa los botones de acción para avanzar el estado: `Asignar` → `En Curso` → `Resolver`.

4.  **Cierre del Ciclo (Pestaña A):**
    * Regresa a la Pestaña A y observa la alerta de confirmación de que la incidencia ha sido **Resuelta**.

> **Conclusión:** "CivicLink garantiza que cada reporte ciudadano se transforma en una acción priorizada, trazable y transparente, redefiniendo la eficiencia municipal."
