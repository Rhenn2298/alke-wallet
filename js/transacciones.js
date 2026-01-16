let movimientos = JSON.parse(localStorage.getItem('transacciones')) || [];

const btn_depositar_dinero = document.getElementById('btn-depositar-dinero');
const input_monto = document.getElementById('monto');
const aviso_deposito = $('#alert-container-deposito');
const aviso_monto = $('#alert-container-deposito-monto');

if (btn_depositar_dinero) {
    btn_depositar_dinero.addEventListener('click', () => {
        const monto = parseFloat(input_monto.value);
        // limpiar avisos
        aviso_deposito.html('');
        aviso_monto.html('');

        // Validación
        if (isNaN(monto) || monto <= 0) {
            aviso_deposito.html('<div class="alert alert-danger">Monto inválido</div>');
            return;
        }
        // Actualizar saldo
        let saldo = parseFloat(localStorage.getItem("saldo")) || 10;
        saldo += monto;
        localStorage.setItem("saldo", saldo); 
        
        const saldo_actual = document.getElementById("saldo-actual");
            if (saldo_actual) {
                saldo_actual.innerHTML = "$" + saldo;
            }

        // Registrar transacción
        const registro = {
            nombre: 'Depósito',
            monto: monto,
            tipo: 'deposito'
        };
        movimientos.push(registro);
        localStorage.setItem('transacciones', JSON.stringify(movimientos));

        // aviso de deposito
        aviso_deposito.html('<div class="alert alert-success">Depósito realizado con éxito</div>');
        aviso_monto.html(`<div class="alert alert-primary">Depositado: $${monto}</div>`);

        input_monto.value = '';

        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 3000);
    });
}