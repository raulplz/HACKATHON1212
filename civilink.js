// script.js

// Función para simular el inicio de un reporte
function startReport() {
    const appScreen = document.getElementById('appScreen');
    const reportBox = document.getElementById('reportBox');
    
    // Simula la apertura de la ventana de reporte
    alert("Iniciando Reporte: 📸 Tomar Foto + 🏷️ Seleccionar Categoría (Bache, Farola, Basura) + 📍 Ubicación Confirmada (Automática).");
    
    // Simula el envío del reporte y la activación del seguimiento
    reportBox.innerHTML = '<p style="color:red; font-weight:bold;">✅ Reporte Enviado. Asignando Prioridad (IA)...</p>';
    
    setTimeout(() => {
        // Muestra el seguimiento de paquete simulado después de la 'recepción'
        showTracking();
    }, 2000); // 2 segundos para simular la IA
}

// Función para simular el seguimiento tipo "paquete"
function showTracking() {
    const trackingPopup = document.getElementById('trackingPopup');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    // Activa la ventana emergente de seguimiento
    trackingPopup.classList.add('active');

    // Simulación de Trazabilidad: La IA lo procesa (ya está en Recibido) y pasa a Asignado
    setTimeout(() => {
        step2.classList.add('active');
        console.log("Incidencia Asignada a 'Mantenimiento Vial'.");
    }, 1500);

    // Simulación de "En Ruta / Ejecución"
    setTimeout(() => {
        step3.classList.add('active');
        console.log("Equipo de mantenimiento en ruta.");
    }, 4000);

    // Simulación de "Resuelto"
    setTimeout(() => {
        step4.classList.add('active');
        alert("🎉 ¡Incidencia #0045 Resuelta! Gracias por participar en CivicLink.");
        closeTracking();
    }, 7000);
}

// Función para cerrar el seguimiento
function closeTracking() {
    const trackingPopup = document.getElementById('trackingPopup');
    trackingPopup.classList.remove('active');
    
    // Restablecer los pasos y el botón de reporte para la siguiente simulación
    const steps = document.querySelectorAll('.status-step');
    steps.forEach((step, index) => {
        if (index > 0) step.classList.remove('active');
    });

    const reportBox = document.getElementById('reportBox');
    reportBox.innerHTML = '<button class="report-button" onclick="startReport()">+</button><p>Toca para **Reportar Incidencia**</p>';
}

// Asignar el evento al botón inicial
document.addEventListener('DOMContentLoaded', () => {
    // Si tienes un botón inicial de demo en el HTML, asegúrate de que llama a 'startReport()'
});