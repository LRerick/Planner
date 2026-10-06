/**
 * MACMINING - PLATAFORMA DE CONTROL DE FLOTA Y VALORIZACIONES
 * Creado para la gestión integral de equipos en alquiler en mina.
 */

// 1. Matriz de Flota Maestra (Basada en tus contratos y notas directas)
const FLEET_DATABASE = [
  {
    id: 'SC-001',
    equipo: 'Scaler DIN 001',
    tipo: 'Scaler de Desate',
    cliente: 'Incimmet',
    mina: 'San Cristóbal',
    diaCierre: 22,
    horometroActual: 3412.5,
    ultimoPM: 3375.0,
    intervaloPM: 125,
    dispMecanica: 96.2,
    tecnicoAsignado: 'Técnico Especialista Scalers'
  },
  {
    id: 'JB-05',
    equipo: 'Jumbo DD321 JB05',
    tipo: 'Jumbo Frontonero',
    cliente: 'Nexa / Incimmet',
    mina: 'El Porvenir',
    diaCierre: 22,
    horometroActual: 4890.0,
    ultimoPM: 4770.0, // PM vencido o a punto
    intervaloPM: 125,
    dispMecanica: 91.5,
    tecnicoAsignado: 'Mecánico 3 años exp.'
  },
  {
    id: 'DE-07',
    equipo: 'Scaler DE07',
    tipo: 'Scaler de Desate',
    cliente: 'Nexa / Incimmet',
    mina: 'El Porvenir',
    diaCierre: 22,
    horometroActual: 2150.0,
    ultimoPM: 2100.0,
    intervaloPM: 125,
    dispMecanica: 95.0,
    tecnicoAsignado: 'Fred Peña Avila (Coord.)'
  },
  {
    id: 'RB-30.14',
    equipo: 'Robot 30.14',
    tipo: 'Robot Lanzador SPM',
    cliente: 'Antamina',
    mina: 'SPM',
    diaCierre: 26,
    horometroActual: 1820.0,
    ultimoPM: 1750.0,
    intervaloPM: 125,
    dispMecanica: 97.4,
    tecnicoAsignado: 'Anderson (Líder SPM)'
  },
  {
    id: 'MX-51',
    equipo: 'Mixer 51',
    tipo: 'Mixer Bajo Perfil (Huron 4)',
    cliente: 'JRC',
    mina: 'Parcoy Mina',
    diaCierre: 26,
    horometroActual: 5610.2,
    ultimoPM: 5500.0,
    intervaloPM: 125,
    dispMecanica: 93.8,
    tecnicoAsignado: 'Fernando / Moisés Calderón'
  },
  {
    id: 'MX-H2',
    equipo: 'Mixer Huron 2',
    tipo: 'Mixer de Concreto',
    cliente: 'Supermix',
    mina: 'Arcata Mina',
    diaCierre: 1,
    horometroActual: 3105.0,
    ultimoPM: 3000.0,
    intervaloPM: 125,
    dispMecanica: 94.0,
    tecnicoAsignado: 'Erick Blas / Edgar Makey'
  },
  {
    id: 'RB-18.9',
    equipo: 'Robot 18.9 (Huron 2)',
    tipo: 'Robot Lanzador de Shotcrete',
    cliente: 'Antamina / Mas Errázuriz',
    mina: 'Antamina',
    diaCierre: 1,
    horometroActual: 2450.0,
    ultimoPM: 2380.0,
    intervaloPM: 125,
    dispMecanica: 98.1,
    tecnicoAsignado: 'Cristian Avila'
  },
  {
    id: 'SB-99',
    equipo: 'Small Bolter 99 / Jumbo DD310',
    tipo: 'Empernador / Jumbo',
    cliente: 'CMC (Vis Hydraulics)',
    mina: 'Coricancha',
    diaCierre: 26,
    horometroActual: 1240.5,
    ultimoPM: 1150.0,
    intervaloPM: 125,
    dispMecanica: 92.0,
    tecnicoAsignado: 'Luis / Axel / Yelsin'
  }
];

// 2. Directorio Estratégico de Contactos (Mapeado exacto de tus notas)
const CONTACTS_DATABASE = [
  // Incimmet Porvenir
  { mina: 'El Porvenir', cliente: 'Incimmet', nombre: 'Fred Peña Ávila', rol: 'Asistente de Mantenimiento', contacto: 'Mina Porvenir' },
  { mina: 'El Porvenir', cliente: 'Incimmet', nombre: 'Grecia', rol: 'Compradora', contacto: 'Logística / Repuestos' },
  { mina: 'El Porvenir', cliente: 'Incimmet', nombre: 'Jordan Jumpa Miguel / Carlos Tipacti', rol: 'Oficina Técnica / Val., OC y HES', contacto: 'Facturación / Cierre 22' },
  { mina: 'El Porvenir', cliente: 'Incimmet', nombre: 'Rocío Cajachahua Vega', rol: 'Administración', contacto: 'Contratos / Gestión' },

  // Incimmet San Cristóbal
  { mina: 'San Cristóbal', cliente: 'Incimmet', nombre: 'Juana Rosales', rol: 'Administración Mina', contacto: 'Gestión Administrativa' },
  { mina: 'San Cristóbal', cliente: 'Incimmet', nombre: 'Incimmet Chauca', rol: 'Comprador', contacto: 'Logística / OC' },
  { mina: 'San Cristóbal', cliente: 'Incimmet', nombre: 'Elder / Hans Huanccaychuco', rol: 'Valorizaciones', contacto: 'HES / Cierre 22' },
  { mina: 'San Cristóbal', cliente: 'Incimmet', nombre: 'Mark Mujica (Jefe) / Jorch Deudor', rol: 'Jefatura de Mantenimiento', contacto: 'Operación Scaler 001' },
  { mina: 'San Cristóbal', cliente: 'Incimmet', nombre: 'Russ Espinoza / Daniela Hidalgo', rol: 'Planners de Mantenimiento', contacto: 'Coordinación Paradas' },

  // Antamina
  { mina: 'Antamina', cliente: 'SPM', nombre: 'Luis Pineda (Gte) / Anderson', rol: 'Gerente & Líder Mantenimiento', contacto: 'Robot 30.14' },
  { mina: 'Antamina', cliente: 'SPM', nombre: 'Merly Ramos', rol: 'Valorizaciones SPM', contacto: 'Cierre 26 cada mes' },
  { mina: 'Antamina', cliente: 'Mas Errázuriz', nombre: 'Ariel Mas Errázuriz', rol: 'Valorización y Mantenimiento', contacto: 'Cierre 01 cada mes' },
  { mina: 'Antamina', cliente: 'Mas Errázuriz', nombre: 'Yameli...', rol: 'Personal & Afiliaciones', contacto: 'Pases de Mina / SCTR' },
  { mina: 'Antamina', cliente: 'Mas Errázuriz', nombre: 'Cristian Avila', rol: 'Mantenimiento', contacto: 'Robot 18.9 Huron' },
  { mina: 'Antamina', cliente: 'Mas Errázuriz', nombre: 'Fiapo Chacón / Diego Martinez', rol: 'Compradores', contacto: 'Repuestos Mas Errázuriz' },

  // JRC Parcoy
  { mina: 'Parcoy Mina', cliente: 'JRC', nombre: 'Fernando / Moisés Calderón', rol: 'Jefatura de Mantenimiento', contacto: 'Mixer 51 (Huron 4)' },
  { mina: 'Parcoy Mina', cliente: 'JRC', nombre: 'Nilton Digno', rol: 'OT & Valorizaciones', contacto: 'Cierre 26 / HES' },
  { mina: 'Parcoy Mina', cliente: 'JRC', nombre: 'Alana / Katherine Ramirez', rol: 'Compras & Logística', contacto: 'Órdenes de Compra' },
  { mina: 'Parcoy Mina', cliente: 'JRC', nombre: 'Nora JRC', rol: 'Afiliación & Pases', contacto: 'SCTR / EMO Mina' },

  // Supermix Arcata
  { mina: 'Arcata Mina', cliente: 'Supermix', nombre: 'Erick Blas / Edgar Makey', rol: 'Jefes de Mantenimiento', contacto: 'Cerrar Valorización Cierre 01' },
  { mina: 'Arcata Mina', cliente: 'Supermix', nombre: 'Brian Ast / Diego Zavalaga / Kathia Ticona', rol: 'Equipo Planners', contacto: 'Programación Mixer Huron 2' },

  // CMC Coricancha
  { mina: 'Coricancha', cliente: 'CMC', nombre: 'Yimson Ortiz / Thalia / Edgar / Wiler', rol: 'Valorizaciones CMC', contacto: 'Cierre 26 / Small Bolter' },
  { mina: 'Coricancha', cliente: 'CMC', nombre: 'Luis / Axel / Yelsin', rol: 'Mantenimiento Mina', contacto: 'Jumbo DD310 / Bolter' },
  { mina: 'Coricancha', cliente: 'CMC', nombre: 'Médico Ocupacional CMC', rol: 'Aprobación de EMU', contacto: 'Visto Bueno de Salud' }
];

// 3. Matriz de Control de Personal Técnico (Yesenia / Afiliaciones)
const PERSONNEL_DATABASE = [
  { nombre: 'Rony Porras', mina: 'Coricancha / El Porvenir', emo: 'Aprobado', sctr: 'Vigente', culDni: 'En Regla', anexo16: 'Pendiente', estado: 'Próxima Afiliación Porvenir (Salida Small Bolter)' },
  { nombre: 'Wilmer (Técnico)', mina: 'Mina General', emo: 'Programado 08 Oct', sctr: 'En Trámite', culDni: 'Completo', anexo16: 'Pendiente', estado: 'Afiliación 8 Octubre' },
  { nombre: 'Diego Zavala', mina: 'Pendiente Evaluación', emo: 'En Revisión Correo', sctr: 'Por Generar', culDni: 'Completo', anexo16: 'Pendiente', estado: 'Esperando Aprobación de Apto para Pasaje' },
  { nombre: 'Mecánico Especialista 1', mina: 'San Cristóbal', emo: 'Aprobado', sctr: 'Vigente', culDni: 'En Regla', anexo16: 'Firmado', estado: 'Destacado en Mina (Scaler 001)' },
  { nombre: 'Mecánico Especialista 2', mina: 'El Porvenir', emo: 'Aprobado', sctr: 'Vigente', culDni: 'En Regla', anexo16: 'Firmado', estado: 'Destacado en Mina (Jumbo JB05)' }
];

// 4. Checklist Directo del Planner (Pendientes de tus notas)
const PLANNER_CHECKLIST = [
  { id: 1, texto: 'Valorización Setiembre Antamina (Enviar a Merly Ramos / Ariel)', done: false },
  { id: 2, texto: 'PM Antamina (Programar repuestos Robot 30.14 y Robot 18.9)', done: false },
  { id: 3, texto: 'Reenviar recordatorio y seguimiento a Jordan Jumpa / Tipacti (Incimmet Porvenir)', done: false },
  { id: 4, texto: 'El Porvenir: Plan de Mantenimiento 125h (Jumbo DD321 y Scaler DE07)', done: false },
  { id: 5, texto: 'San Cristóbal: Plan de Mantenimiento Scaler DIN 001 con Russ Espinoza', done: false },
  { id: 6, texto: 'CMC Coricancha: Presionar respuesta de valorización a Yimson Ortiz / Thalia', done: false },
  { id: 7, texto: 'Supermix: Informe de valorización - Esperar aprobación del Sr. Frank para enviar', done: false },
  { id: 8, texto: 'Consultar con Frank / Ricardo sobre facturación y dar de baja a Rony Porras', done: false }
];

let dailyReports = [];

// Inicialización de la Aplicación
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  loadData();
  renderFleetTable();
  renderContacts(CONTACTS_DATABASE);
  renderPersonnel();
  renderChecklist();
  setupReportForm();
  updateKPIs();
});

// Manejo de Pestañas
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
  });

  // Búsqueda en contactos
  document.getElementById('contactSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = CONTACTS_DATABASE.filter(c => 
      c.mina.toLowerCase().includes(q) || 
      c.cliente.toLowerCase().includes(q) || 
      c.nombre.toLowerCase().includes(q) || 
      c.rol.toLowerCase().includes(q)
    );
    renderContacts(filtered);
  });
}

// Carga de Datos y Persistencia
function loadData() {
  const storedReports = localStorage.getItem('macmining_daily_reports');
  if (storedReports) {
    dailyReports = JSON.parse(storedReports);
    renderDailyTable();
  }
  
  // Rellenar select de equipos en el formulario
  const sel = document.getElementById('repEquipo');
  sel.innerHTML = FLEET_DATABASE.map(eq => `<option value="${eq.id}">${eq.equipo} (${eq.mina})</option>`).join('');
  document.getElementById('repFecha').value = new Date().toISOString().split('T')[0];
}

// Renderizado de Tabla de Flota
function renderFleetTable() {
  const tbody = document.getElementById('fleetTableBody');
  tbody.innerHTML = '';

  FLEET_DATABASE.forEach(eq => {
    const horasDesdePM = eq.horometroActual - eq.ultimoPM;
    const proxPM = eq.ultimoPM + eq.intervaloPM;
    const horasRestantes = proxPM - eq.horometroActual;

    let pmBadge = `<span class="badge-status badge-ok">OK (${horasRestantes.toFixed(1)}h rest.)</span>`;
    if (horasRestantes <= 0) {
      pmBadge = `<span class="badge-status badge-danger">VENCIDO PM (${Math.abs(horasRestantes).toFixed(1)}h)</span>`;
    } else if (horasRestantes <= 25) {
      pmBadge = `<span class="badge-status badge-warn">ALERTA PM (${horasRestantes.toFixed(1)}h)</span>`;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${eq.id}</strong></td>
      <td>${eq.equipo}<br><small style="color:var(--text-muted)">${eq.tipo}</small></td>
      <td>${eq.cliente}</td>
      <td><strong>${eq.mina}</strong></td>
      <td><span class="badge-status badge-warn">Día ${eq.diaCierre}</span></td>
      <td><strong>${eq.horometroActual.toFixed(1)} h</strong></td>
      <td>${eq.ultimoPM.toFixed(1)} h</td>
      <td>${proxPM.toFixed(1)} h</td>
      <td>${pmBadge}</td>
      <td><strong>${eq.dispMecanica}%</strong></td>
      <td>
        <button class="btn btn-outline" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="quickUpdateHorometro('${eq.id}')">Act. Horómetro</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Actualización Rápida de Horómetro
window.quickUpdateHorometro = function(eqId) {
  const eq = FLEET_DATABASE.find(f => f.id === eqId);
  const nuevo = prompt(`Actualizar Horómetro para ${eq.equipo} (Actual: ${eq.horometroActual}):`, eq.horometroActual);
  if (nuevo && !isNaN(nuevo)) {
    eq.horometroActual = parseFloat(nuevo);
    renderFleetTable();
    updateKPIs();
  }
};

// Render Directorio de Contactos
function renderContacts(data) {
  const container = document.getElementById('contactDirectory');
  container.innerHTML = '';

  data.forEach(c => {
    const card = document.createElement('div');
    card.className = 'contact-card';
    card.innerHTML = `
      <div class="contact-mina">${c.mina} &bull; ${c.cliente}</div>
      <div class="contact-name">${c.nombre}</div>
      <div class="contact-role">${c.rol}</div>
      <div style="font-size:0.75rem; color:var(--accent-blue); margin-top:0.4rem;">${c.contacto}</div>
    `;
    container.appendChild(card);
  });
}

// Render Personal & Afiliaciones (Yesenia)
function renderPersonnel() {
  const tbody = document.getElementById('personnelTableBody');
  tbody.innerHTML = '';

  PERSONNEL_DATABASE.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${p.nombre}</strong></td>
      <td>${p.mina}</td>
      <td><span class="badge-status ${p.emo.includes('Aprobado') ? 'badge-ok' : 'badge-warn'}">${p.emo}</span></td>
      <td><span class="badge-status ${p.sctr.includes('Vigente') ? 'badge-ok' : 'badge-warn'}">${p.sctr}</span></td>
      <td>${p.culDni}</td>
      <td><span class="badge-status ${p.anexo16 === 'Firmado' ? 'badge-ok' : 'badge-danger'}">${p.anexo16}</span></td>
      <td><small>${p.estado}</small></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Checklist
function renderChecklist() {
  const container = document.getElementById('checklistPlanner');
  container.innerHTML = '';

  PLANNER_CHECKLIST.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="chk_${item.id}" ${item.done ? 'checked' : ''} onchange="toggleCheck(${item.id})">
      <label for="chk_${item.id}" style="${item.done ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${item.texto}</label>
    `;
    container.appendChild(li);
  });
}

window.toggleCheck = function(id) {
  const item = PLANNER_CHECKLIST.find(i => i.id === id);
  if (item) item.done = !item.done;
  renderChecklist();
};

// Formulario de Reporte Diario de Guardia
function setupReportForm() {
  const form = document.getElementById('dailyReportForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const eqId = document.getElementById('repEquipo').value;
    const hIni = parseFloat(document.getElementById('repHorometroIni').value);
    const hFin = parseFloat(document.getElementById('repHorometroFin').value);
    const horasOp = Math.max(0, hFin - hIni);

    const report = {
      id: Date.now(),
      fecha: document.getElementById('repFecha').value,
      guardia: document.getElementById('repGuardia').value,
      equipoId: eqId,
      hIni,
      hFin,
      horasOp,
      diesel: document.getElementById('repDiesel').value,
      estado: document.getElementById('repEstado').value,
      momentoParada: document.getElementById('repMomentoParada').value,
      horasParada: parseFloat(document.getElementById('repHorasParada').value) || 0,
      causaTipo: document.getElementById('repCausaTipo').value,
      trabajo: document.getElementById('repTrabajo').value,
      pendientes: document.getElementById('repPendientes').value
    };

    // Actualizar horómetro del equipo en la base de flota
    const eq = FLEET_DATABASE.find(f => f.id === eqId);
    if (eq && hFin > eq.horometroActual) {
      eq.horometroActual = hFin;
      renderFleetTable();
    }

    dailyReports.unshift(report);
    localStorage.setItem('macmining_daily_reports', JSON.stringify(dailyReports));
    renderDailyTable();
    updateKPIs();
    form.reset();
    document.getElementById('repFecha').value = new Date().toISOString().split('T')[0];
    alert('Parte diario registrado y horómetro de flota actualizado.');
  });

  // Exportar backup
  document.getElementById('btnQuickBackup').addEventListener('click', () => {
    const payload = {
      flota: FLEET_DATABASE,
      partes: dailyReports,
      contactos: CONTACTS_DATABASE,
      checklist: PLANNER_CHECKLIST,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `MACMINING_PLANNER_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  });
}

function renderDailyTable() {
  const tbody = document.getElementById('dailyLogTableBody');
  tbody.innerHTML = '';

  dailyReports.slice(0, 10).forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.fecha}<br><small>${r.guardia.includes('Día') ? 'DÍA' : 'NOCHE'}</small></td>
      <td><strong>${r.equipoId}</strong></td>
      <td>${r.horasOp.toFixed(1)} h</td>
      <td><span class="badge-status ${r.horasParada > 0 ? 'badge-danger' : 'badge-ok'}">${r.horasParada} h (${r.momentoParada})</span></td>
      <td><strong>${r.causaTipo}</strong><br><small>${r.trabajo || 'Sin notas'}</small></td>
    `;
    tbody.appendChild(tr);
  });
}

// Actualizar Tarjetas KPIs
function updateKPIs() {
  document.getElementById('kpiTotalEquipos').textContent = `${FLEET_DATABASE.length} Equipos`;
  
  // Conteo de alertas PM (<= 25h)
  const pmAlerts = FLEET_DATABASE.filter(f => (f.ultimoPM + f.intervaloPM - f.horometroActual) <= 25).length;
  document.getElementById('kpiPMCount').textContent = `${pmAlerts} Equipos`;
}
