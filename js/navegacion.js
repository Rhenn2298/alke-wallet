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
const texto_carga = document.getElementById("texto-carga");
const modalCarga = new bootstrap.Modal(document.getElementById("modalCarga"));

//================================================
// creacion de funciones
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
        textoCarga.textContent = 'Cargando "Depósito"';
        modalCarga.show();
        setTimeout(() => {
      window.location.href = "deposit.html";
    }, 1000);
    });
}

if (btn_Transferir) {
    btn_Transferir.addEventListener("click", () => {
        window.location.href = "sendmoney.html";
    });
}

if (btn_Historial) {
    btn_Historial.addEventListener("click", () => {
        window.location.href = "transactions.html";
    });
}

if (btn_Menu) {
    btn_Menu.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
}