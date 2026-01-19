//================================================
// inicializacion de variable
let saldo = parseFloat(localStorage.getItem("saldo")) || 10;
const usuario = localStorage.getItem("usuarioEmail") || "sin inicio de sesion";
// variables de elementos
const saldo_actual = document.getElementById("saldo-actual");
const usuario_email = document.getElementById("usuario-email");
// variables de botones 
const btn_Depositar = document.getElementById("btn-depositar");
const btn_Transferir = document.getElementById("btn-transferir");
const btn_Historial = document.getElementById("btn-historial");
const btn_Menu = document.getElementById("btn-menu");

let alertContainerMenu = "alert-container-menu";

//================================================
// creacion de funciones
// ========================================
// FUNCIONES ALERTAS
function mostrarAlerta(containerId, mensaje, tipo) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}
// FUNCION PARA RESETEAR ALERTAS
function limpiarAlertas(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

// se usa el if como protccion de errores y buena practica
function actualizarSaldo() {
    if (saldo_actual) {
        saldo_actual.innerHTML = "$" + saldo;
    }
    localStorage.setItem("saldo", saldo);
}

function mostrarUsuario() {
    if (usuario_email){
        usuario_email.innerHTML = usuario;
    }
}



//================================================
// Llamada a funciones
actualizarSaldo();
mostrarUsuario();
//
//================================================
// botones
if (btn_Depositar) {
    btn_Depositar.addEventListener("click", () => {
        limpiarAlertas(alertContainerMenu);
        mostrarAlerta(alertContainerMenu, "Redirigiendo a Depósitos...", "info");
        setTimeout(() => {
            window.location.href = "deposit.html";
        }, 1500);
    });
}

if (btn_Transferir) {
    btn_Transferir.addEventListener("click", () => {
        limpiarAlertas(alertContainerMenu);
        mostrarAlerta(alertContainerMenu, "Redirigiendo a Transferencias...", "info");
        setTimeout(() => {
            window.location.href = "sendmoney.html";
        }, 1000);
    });
}

if (btn_Historial) {
    btn_Historial.addEventListener("click", () => {
        limpiarAlertas(alertContainerMenu);
        mostrarAlerta(alertContainerMenu, "Abriendo Historial...", "info");
        setTimeout(() => {
            window.location.href = "transactions.html";
        }, 1000);
    });
}

if (btn_Menu) {
    btn_Menu.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
}