// ==========================================
// 1. IMPORTACIONES DE FIREBASE
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    push, 
    onValue, 
    update, 
    get, 
    child 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ==========================================
// 2. CONFIGURACIÓN (REEMPLAZA CON TUS DATOS)
// ==========================================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHkfRM61WTLnXJbTWxn9aL7OD2Qit_no8",
  authDomain: "hogarjj.firebaseapp.com",
  databaseURL: "https://hogarjj-default-rtdb.firebaseio.com",
  projectId: "hogarjj",
  storageBucket: "hogarjj.firebasestorage.app",
  messagingSenderId: "753078919009",
  appId: "1:753078919009:web:8eb572b41f20671dc1af20",
  measurementId: "G-8LGV84ZE5T"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const USER_ID = "usuario_demo"; // ID Temporal

// ==========================================
// 3. REFERENCIAS AL DOM (HTML)
// ==========================================

// --- Navegación ---
const navItems = {
    home: document.getElementById('nav-home'),
    gastos: document.getElementById('nav-gastos'),
    ingresos: document.getElementById('nav-ingresos'), // NUEVO
    traslados: document.getElementById('nav-traslados'),
    bolsillos: document.getElementById('nav-bolsillos'),
    categorias: document.getElementById('nav-categorias')
};

const vistas = {
    home: document.getElementById('view-home'),
    gastos: document.getElementById('view-gastos'),
    ingresos: document.getElementById('view-ingresos'), // NUEVO
    traslados: document.getElementById('view-traslados'),
    bolsillos: document.getElementById('view-bolsillos'),
    categorias: document.getElementById('view-categorias')
};

// --- Dashboard ---
const dashboardGrid = document.getElementById('dashboard-grid');

// --- Formularios Configuración ---
const inputBolsilloName = document.getElementById('nombreBolsillo');
const inputBolsilloSaldo = document.getElementById('saldoInicial');
const btnCrearBolsillo = document.getElementById('btnCrearBolsillo');
const listaBolsillosConfig = document.getElementById('listaBolsillos');

const inputCatName = document.getElementById('nombreCategoria');
const inputCatLimit = document.getElementById('presupuestoLimite');
const btnCrearCategoria = document.getElementById('btnCrearCategoria');
const listaCategoriasConfig = document.getElementById('listaCategorias');

// --- Formularios Transacciones ---

// 1. Gastos
const selectGastoCat = document.getElementById('gasto-categoria');
const selectGastoBol = document.getElementById('gasto-bolsillo');
const inputGastoMonto = document.getElementById('gasto-monto');
const inputGastoDesc = document.getElementById('gasto-desc');
const btnGuardarGasto = document.getElementById('btnGuardarGasto');

// 2. Ingresos (NUEVO)
const selectIngresoBol = document.getElementById('ingreso-bolsillo');
const inputIngresoMonto = document.getElementById('ingreso-monto');
const inputIngresoDesc = document.getElementById('ingreso-desc');
const btnGuardarIngreso = document.getElementById('btnGuardarIngreso');

// 3. Traslados
const selectTrasladoOrigen = document.getElementById('traslado-origen');
const selectTrasladoDestino = document.getElementById('traslado-destino');
const inputTrasladoMonto = document.getElementById('traslado-monto');
const btnGuardarTraslado = document.getElementById('btnGuardarTraslado');


// ==========================================
// 4. SISTEMA DE NAVEGACIÓN
// ==========================================
function navegar(destino) {
    // Ocultar todas las vistas
    Object.values(vistas).forEach(v => {
        if(v) v.classList.add('hidden');
    });
    // Quitar active del menú
    Object.values(navItems).forEach(n => {
        if(n) n.classList.remove('active');
    });

    // Mostrar destino
    if(vistas[destino]) vistas[destino].classList.remove('hidden');
    if(navItems[destino]) navItems[destino].classList.add('active');
}

// Asignar eventos clic (si el elemento existe en el HTML)
Object.keys(navItems).forEach(key => {
    if(navItems[key]) {
        navItems[key].addEventListener('click', () => navegar(key));
    }
});


// ==========================================
// 5. LÓGICA DE LECTURA (LISTENERS)
// ==========================================

// --- A. ESCUCHAR CATEGORÍAS (Para Dashboard y Selects) ---
const categoriasRef = ref(db, `users/${USER_ID}/categorias`);

onValue(categoriasRef, (snapshot) => {
    const data = snapshot.val();
    
    // Limpieza de UI
    dashboardGrid.innerHTML = "";
    selectGastoCat.innerHTML = '<option value="">Selecciona Categoría...</option>';
    listaCategoriasConfig.innerHTML = "";

    if (data) {
        Object.keys(data).forEach(key => {
            const cat = data[key];
            const porcentaje = (cat.gastado_actual / cat.presupuesto_limite) * 100;

            // Semáforo
            let color = "var(--success)";
            if (porcentaje >= 90) color = "var(--warning)";
            if (porcentaje >= 100) color = "var(--danger)";

            // Tarjeta Home
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.style.borderLeftColor = color;
            card.innerHTML = `
                <div class="card-title">${cat.nombre}</div>
                <div class="card-info">
                    Gastado: $${cat.gastado_actual.toLocaleString()} <br>
                    Límite: $${cat.presupuesto_limite.toLocaleString()}
                </div>
                <div class="card-bar">
                    <div class="card-progress" style="width: ${Math.min(porcentaje, 100)}%; background: ${color}"></div>
                </div>
                <div style="text-align:right; font-size:0.8rem; margin-top:5px; color:${color}">
                    ${porcentaje.toFixed(1)}%
                </div>
            `;
            dashboardGrid.appendChild(card);

            // Select Gasto
            selectGastoCat.innerHTML += `<option value="${key}">${cat.nombre}</option>`;

            // Lista Config
            const li = document.createElement('li');
            li.innerHTML = `<b>${cat.nombre}</b> - Tope: $${cat.presupuesto_limite.toLocaleString()}`;
            listaCategoriasConfig.appendChild(li);
        });
    } else {
        dashboardGrid.innerHTML = "<p style='padding:10px'>No hay datos. Crea categorías primero.</p>";
    }
});

// --- B. ESCUCHAR BOLSILLOS (Para Saldos y Selects) ---
const bolsillosRef = ref(db, `users/${USER_ID}/bolsillos`);

onValue(bolsillosRef, (snapshot) => {
    const data = snapshot.val();

    // Limpieza
    selectGastoBol.innerHTML = '<option value="">Selecciona Bolsillo...</option>';
    selectIngresoBol.innerHTML = '<option value="">Selecciona Bolsillo...</option>'; // NUEVO
    selectTrasladoOrigen.innerHTML = '<option value="">Origen...</option>';
    selectTrasladoDestino.innerHTML = '<option value="">Destino...</option>';
    listaBolsillosConfig.innerHTML = "";

    if (data) {
        Object.keys(data).forEach(key => {
            const bol = data[key];
            const texto = `${bol.nombre} ($${bol.saldo.toLocaleString()})`;
            const option = `<option value="${key}">${texto}</option>`;

            // Llenar todos los selects
            selectGastoBol.innerHTML += option;
            selectIngresoBol.innerHTML += option; // NUEVO
            selectTrasladoOrigen.innerHTML += option;
            selectTrasladoDestino.innerHTML += option;

            // Lista Config
            const li = document.createElement('li');
            li.innerHTML = `<b>${bol.nombre}</b>: $${bol.saldo.toLocaleString()}`;
            listaBolsillosConfig.appendChild(li);
        });
    }
});


// ==========================================
// 6. LÓGICA DE ESCRITURA (CREAR DATOS)
// ==========================================

// Crear Bolsillo
btnCrearBolsillo.addEventListener('click', () => {
    const nombre = inputBolsilloName.value;
    const saldo = parseFloat(inputBolsilloSaldo.value);

    if (nombre && !isNaN(saldo)) {
        push(bolsillosRef, { nombre, saldo });
        inputBolsilloName.value = '';
        inputBolsilloSaldo.value = '';
        alert("Bolsillo creado!");
    } else {
        alert("Datos inválidos");
    }
});

// Crear Categoría
btnCrearCategoria.addEventListener('click', () => {
    const nombre = inputCatName.value;
    const limite = parseFloat(inputCatLimit.value);

    if (nombre && limite > 0) {
        push(categoriasRef, { 
            nombre, 
            presupuesto_limite: limite,
            gastado_actual: 0 
        });
        inputCatName.value = '';
        inputCatLimit.value = '';
        alert("Categoría creada!");
    } else {
        alert("Datos inválidos");
    }
});


// ==========================================
// 7. LÓGICA TRANSACCIONAL
// ==========================================

// --- A. REGISTRAR GASTO ---
btnGuardarGasto.addEventListener('click', async () => {
    const catId = selectGastoCat.value;
    const bolId = selectGastoBol.value;
    const monto = parseFloat(inputGastoMonto.value);
    const desc = inputGastoDesc.value;

    if (!catId || !bolId || isNaN(monto) || monto <= 0) {
        alert("Completa todos los campos.");
        return;
    }

    try {
        const snapshotBolsillo = await get(child(ref(db), `users/${USER_ID}/bolsillos/${bolId}`));
        const snapshotCat = await get(child(ref(db), `users/${USER_ID}/categorias/${catId}`));

        if (snapshotBolsillo.exists() && snapshotCat.exists()) {
            const saldoActual = snapshotBolsillo.val().saldo;
            const gastadoActual = snapshotCat.val().gastado_actual;

            if (saldoActual < monto) {
                alert(`Fondos insuficientes. Tienes $${saldoActual}`);
                return;
            }

            const updates = {};
            // Restar Bolsillo
            updates[`users/${USER_ID}/bolsillos/${bolId}/saldo`] = saldoActual - monto;
            // Sumar Categoría
            updates[`users/${USER_ID}/categorias/${catId}/gastado_actual`] = gastadoActual + monto;
            // Historial
            const newTxKey = push(child(ref(db), `users/${USER_ID}/transacciones`)).key;
            updates[`users/${USER_ID}/transacciones/${newTxKey}`] = {
                tipo: 'gasto',
                monto: monto,
                descripcion: desc,
                fecha: Date.now(),
                categoriaId: catId,
                bolsilloId: bolId
            };

            await update(ref(db), updates);
            
            inputGastoMonto.value = '';
            inputGastoDesc.value = '';
            alert("Gasto registrado");
            navegar('home');
        }
    } catch (error) {
        console.error(error);
        alert("Error al guardar gasto");
    }
});

// --- B. REGISTRAR INGRESO (NUEVO) ---
btnGuardarIngreso.addEventListener('click', async () => {
    const bolId = selectIngresoBol.value;
    const monto = parseFloat(inputIngresoMonto.value);
    const desc = inputIngresoDesc.value;

    if (!bolId || isNaN(monto) || monto <= 0) {
        alert("Completa los datos del ingreso.");
        return;
    }

    try {
        // Leer saldo actual
        const snapshot = await get(child(ref(db), `users/${USER_ID}/bolsillos/${bolId}`));
        
        if (snapshot.exists()) {
            const saldoActual = snapshot.val().saldo;

            const updates = {};
            // SUMAR al bolsillo
            updates[`users/${USER_ID}/bolsillos/${bolId}/saldo`] = saldoActual + monto;

            // Historial
            const newTxKey = push(child(ref(db), `users/${USER_ID}/transacciones`)).key;
            updates[`users/${USER_ID}/transacciones/${newTxKey}`] = {
                tipo: 'ingreso',
                monto: monto,
                descripcion: desc,
                fecha: Date.now(),
                bolsilloId: bolId
            };

            await update(ref(db), updates);
            
            inputIngresoMonto.value = '';
            inputIngresoDesc.value = '';
            alert("¡Dinero recibido! 🤑");
            navegar('bolsillos'); // Ir a ver el saldo
        }
    } catch (error) {
        console.error(error);
        alert("Error al registrar ingreso");
    }
});

// --- C. REGISTRAR TRASLADO ---
btnGuardarTraslado.addEventListener('click', async () => {
    const origenId = selectTrasladoOrigen.value;
    const destinoId = selectTrasladoDestino.value;
    const monto = parseFloat(inputTrasladoMonto.value);

    if (!origenId || !destinoId || isNaN(monto) || monto <= 0) return;
    if (origenId === destinoId) {
        alert("Origen y destino son iguales.");
        return;
    }

    try {
        const snapOrigen = await get(child(ref(db), `users/${USER_ID}/bolsillos/${origenId}`));
        const snapDestino = await get(child(ref(db), `users/${USER_ID}/bolsillos/${destinoId}`));

        if (snapOrigen.exists() && snapDestino.exists()) {
            const saldoOrigen = snapOrigen.val().saldo;
            const saldoDestino = snapDestino.val().saldo;

            if (saldoOrigen < monto) {
                alert("Saldo insuficiente para trasladar.");
                return;
            }

            const updates = {};
            updates[`users/${USER_ID}/bolsillos/${origenId}/saldo`] = saldoOrigen - monto;
            updates[`users/${USER_ID}/bolsillos/${destinoId}/saldo`] = saldoDestino + monto;
            
            const newTxKey = push(child(ref(db), `users/${USER_ID}/transacciones`)).key;
            updates[`users/${USER_ID}/transacciones/${newTxKey}`] = {
                tipo: 'traslado',
                monto: monto,
                descripcion: `Traslado interno`,
                fecha: Date.now(),
                origenId: origenId,
                destinoId: destinoId
            };

            await update(ref(db), updates);
            
            inputTrasladoMonto.value = '';
            alert("Traslado exitoso");
            navegar('bolsillos');
        }
    } catch (error) {
        console.error(error);
        alert("Error en traslado");
    }
});