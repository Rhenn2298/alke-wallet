// ========================================
// logica inicial de inicio de sesion
// Maneja: index.html y login.html
// ========================================
// Credenciales válidas
const USUARIO_VALIDO = "stevenstone@alke.com";
const CONTRASENA_VALIDA = "qwerty";
// ========================================
// FUNCIONES ALERTAS
// ========================================
// FUNCION PARA MOSTRAR ALERTAS
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
// ========================================
// LÓGICA INDEX
// ========================================
const btnIngresar = document.getElementById("btn-ingresar");
if (btnIngresar) {
    btnIngresar.addEventListener("click", function() {
        location.href = "login.html";
    });
}
// ========================================
// LÓGICA Login
// ========================================
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
       
    //obtencion de datos de login
    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value;
    
    //reseteo de alertas
    limpiarAlertas("alert-container-login");
    
    // Validacion de datos
    if (email === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA) {
        //Aviso datos correctos
        mostrarAlerta("alert-container-login", "Iniciando sesión...", "success");
        // Guardar email en localStorage para mostrar en el menu
        localStorage.setItem("usuarioEmail", email);
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 1000);
    } else {
        // Alerta datos incorrectos
        mostrarAlerta("alert-container-login", "Email o contraseña incorrectos", "danger");
    }
});
