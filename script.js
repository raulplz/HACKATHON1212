// ====================================
// === DATASET DE INCIDENCIAS (SIMULACIÓN DE DB) ===
// ====================================

// El array almacena las incidencias con todos sus metadatos.
let incidentsDataset = [
    { 
        id: 44, 
        category: 'Bache Vial', 
        severity: 'Alta', 
        priority: '9/10 (Cerca de Escuela)', 
        confidence: 95, 
        status: 'RESUELTO',
        user: 'CitizenOne',
        location: { lat: 40.425, lng: -3.715 }
    },
    // Incidencia que usaremos para la demo interactiva
    { 
        id: 45, 
        category: 'Farola Rota', 
        severity: 'Media', 
        priority: '7/10 (Noche / Peligro)', 
        confidence: 80, 
        status: 'RECIBIDO',
        user: 'CitizenZero',
        location: { lat: 40.410, lng: -3.700 }
    }
];

// Contador para asignar IDs a nuevas incidencias
let nextIncidentId = 46;
let currentSeverity = null; // Para guardar la gravedad seleccionada

// ====================================
// === Funciones de Vista General ===
// ====================================

function showTab(tabId) {
    document.querySelectorAll('.app-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('active');

    // Al cambiar a la Consola, forzamos la recarga de la tabla
    if (tabId === 'municipal-console') {
        renderMunicipalTable();
    }
}

// ====================================
// === Lógica de Pestaña C: Consola Municipal ===
// ====================================

function calculatePriority(severity, confidence) {
    let baseScore = 0;
    if (severity === 'Alta') baseScore = 7;
    else if (severity === 'Media') baseScore = 5;
    else baseScore = 3;

    const priorityScore = Math.min(10, Math.round(baseScore + (confidence / 100) * 3));
    return `${priorityScore}/10`;
}

function renderMunicipalTable() {
    const tableBody = document.getElementById('incidentTableBody');
    tableBody.innerHTML = ''; 

    const sortedIncidents = [...incidentsDataset].sort((a, b) => b.id - a.id);

    sortedIncidents.forEach(incident => {
        const priorityText = incident.priority || calculatePriority(incident.severity, incident.confidence);
        const row = tableBody.insertRow();
        row.id = `row${incident.id}`;
        
        if (priorityText.startsWith('9') || priorityText.startsWith('10')) {
            row.className = 'high-priority';
        } else if (priorityText.startsWith('7') || priorityText.startsWith('8')) {
            row.className = 'medium-priority';
        }

        row.innerHTML = `
            <td>${incident.id}</td>
            <td>${incident.category}</td>
            <td class="severity-${incident.severity.toLowerCase()}">${incident.severity.toUpperCase()}</td>
            <td>${priorityText}</td>
            <td id="conf${incident.id}">${incident.confidence}%</td>
            <td id="status${incident.id}" class="status-${incident.status.toLowerCase()}">${incident.status.toUpperCase()}</td>
            <td>
                <button 
                    class="action-button small-button primary-btn ${incident.status === 'RESUELTO' ? 'secondary-color' : ''}" 
                    onclick="updateStatus(${incident.id}, 'ASIGNADO')"
                    ${incident.status === 'RESUELTO' ? 'disabled' : ''}>
                    ${incident.status === 'RECIBIDO' ? 'Asignar' : incident.status === 'ASIGNADO' ? 'En Curso' : incident.status === 'EN CURSO' ? 'Resolver' : 'Completado'}
                </button>
            </td>
        `;

        const button = row.querySelector('button');
        if (incident.status === 'RECIBIDO') button.onclick = () => updateStatus(incident.id, 'ASIGNADO');
        else if (incident.status === 'ASIGNADO') button.onclick = () => updateStatus(incident.id, 'EN CURSO');
        else if (incident.status === 'EN CURSO') button.onclick = () => updateStatus(incident.id, 'RESUELTO');
    });
}


function updateStatus(id, newStatus) {
    const incidentIndex = incidentsDataset.findIndex(i => i.id === id);
    if (incidentIndex === -1) return;

    incidentsDataset[incidentIndex].status = newStatus;
    
    if (document.getElementById('municipal-console').classList.contains('active')) {
        renderMunicipalTable();
    }
    
    // Si es la incidencia activa, actualiza el tracking
    if (id === 45 || id === nextIncidentId - 1) {
        updateCitizenTracking(newStatus, id);
    }
}


// ====================================
// === Lógica de Pestaña A: Reporte y Tracking ===
// ====================================

// El botón de reporte rápido está integrado directamente, sin modal.
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gravedad
    document.querySelectorAll('.severity-btn').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active-severity'));
            this.classList.add('active-severity');
            currentSeverity = this.getAttribute('data-severity');
        };
    });
});

function submitNewReport() {
    const category = document.getElementById('category').value;
    const severity = currentSeverity;
    const sendButton = document.querySelector('.report-panel .primary-btn');

    if (!severity) {
        alert("Por favor, selecciona la gravedad antes de enviar.");
        return;
    }
    
    sendButton.disabled = true;
    sendButton.textContent = 'Enviando...';

    const newId = nextIncidentId++;
    const newIncident = {
        id: newId,
        category: category,
        severity: severity,
        confidence: 90, 
        priority: calculatePriority(severity, 90),
        status: 'RECIBIDO',
        user: 'CitizenTest',
        location: { lat: 40.418, lng: -3.705 }
    };

    incidentsDataset.push(newIncident);
    
    // Simular el envío y el inicio del tracking
    setTimeout(() => {
        sendButton.disabled = false;
        sendButton.textContent = 'Enviar Reporte con Gravedad';
        
        // Resetear la selección visual
        document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active-severity'));
        currentSeverity = null;
        
        startReportTracking(newId);
    }, 1000); // 1 segundo de simulación de envío
}

function startReportTracking(id) {
    const trackingPopup = document.getElementById('trackingPopup');
    
    alert(`🟢 Reporte #${id} enviado (${incidentsDataset.find(i => i.id === id).severity}). La IA está procesando...`);
    
    document.getElementById('trackingId').textContent = `#${id}`;
    trackingPopup.classList.add('active');
    
    updateCitizenTracking('RECIBIDO', id);
}


function updateCitizenTracking(status, id) {
    const trackingIdElement = document.getElementById('trackingId');
    // Asegura que solo se actualiza si es el reporte que estamos siguiendo
    if (trackingIdElement && trackingIdElement.textContent !== `#${id}`) {
        trackingIdElement.textContent = `#${id}`; // Si no es el que seguimos, lo actualizamos.
    }
    
    document.querySelectorAll('.status-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step1').classList.add('active'); 

    if (status === 'ASIGNADO' || status === 'EN CURSO' || status === 'RESUELTO') {
        document.getElementById('step2').classList.add('active');
    }
    if (status === 'EN CURSO' || status === 'RESUELTO') {
        document.getElementById('step3').classList.add('active');
    }
    if (status === 'RESUELTO') {
        document.getElementById('step4').classList.add('active');
        alert(`🎉 ¡CivicLink NOTIFICACIÓN! Incidencia #${id} Resuelta. Gracias por participar.`);
    }
}


// ====================================
// === Lógica de Pestaña B: Comunidad ===
// ====================================

function validateIncident(id, change) {
    const incidentIndex = incidentsDataset.findIndex(i => i.id === id);
    if (incidentIndex === -1) return;

    let incident = incidentsDataset[incidentIndex];

    if (change > 0) { 
        incident.confidence = Math.min(100, incident.confidence + 5);
        alert("👍 ¡Gracias! Su confirmación sube la confianza del reporte.");
    } else { 
        incident.confidence = Math.max(50, incident.confidence - 10); 
        alert("👎 Reporte marcado como duplicado/inválido. La IA ajustará la prioridad.");
    }

    const currentScore = parseInt(document.getElementById('trustScore').innerText.replace('%', ''));
    document.getElementById('trustScore').innerText = `${Math.min(100, currentScore + 1)}%`;

    incident.priority = calculatePriority(incident.severity, incident.confidence);

    if (document.getElementById('municipal-console').classList.contains('active')) {
        renderMunicipalTable();
    } else {
        if (id === 45) {
             document.getElementById('currentReportId').textContent = `#${id}`;
        }
    }
}


// ====================================
// === Inicialización ===
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    renderMunicipalTable();
    showTab('citizen-app');
    updateCitizenTracking(incidentsDataset.find(i => i.id === 45).status, 45);
});