let movimientos = JSON.parse(localStorage.getItem('transacciones')) || [];
let listaContactos = JSON.parse(localStorage.getItem('contactos')) || [
    { nombre: "Placido Domingo", alias: "El Tenor", CBU: 19412184 },
    { nombre: "Luciano Pavarotti", alias: "El Payaso", CBU: 19351271 }
];

const btn_depositar_dinero = document.getElementById('btn-depositar-dinero');
const input_monto = document.getElementById('monto');
const aviso_deposito = $('#alert-container-deposito');
const aviso_monto = $('#alert-container-deposito-monto');


let contactoSeleccionado = null;

//================================================
// declaracion de funciones
// actualizacion de contactos
function actualizarContactos(lista) {
    const tbody = $('#tabla-body');
    tbody.empty(); // limpiar tabla
    lista.forEach((contacto, index) => {
        tbody.append(`
            <tr data-index="${index}">
                <td>${contacto.nombre}</td>
                <td>${contacto.alias}</td>
                <td>${contacto.CBU}</td>
            </tr>
        `);
    });
}

//actualizacion de historial de transacciones
function actualizarHistorial(filtro) {
    const tbody = $('#lista-transacciones');
    tbody.empty();
    
    movimientos.forEach(mov => {
        const movimientos = JSON.parse(localStorage.getItem('transacciones'))
        if(!filtro || mov.tipo === filtro){
            tbody.append(`
                <tr>
                    <td>${mov.nombre}</td>
                    <td>${mov.monto}</td>
                </tr>
                        `);
        }
        localStorage.setItem('transacciones', JSON.stringify(movimientos));
    });
};


//================================================
// Llamada a funciones
actualizarContactos(listaContactos);
actualizarHistorial();

//================================================
// acciones botones
// Funcionalidad de deposito
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
       // let saldo = parseFloat(localStorage.getItem("saldo")) || 10;
        saldo += monto;
        localStorage.setItem("saldo", saldo); 
        actualizarSaldo();
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

//Funcionalidad marcadod e contacto
$('#tabla-body').on('click', 'tr', function() {
    $('#tabla-body tr').removeClass('fila-seleccionada');
    $(this).addClass('fila-seleccionada');
    const index = $(this).data('index');
    contactoSeleccionado = listaContactos[index];
    $('#contacto-seleccionado-nombre').text(contactoSeleccionado.nombre);
    $('#contacto-seleccionado-enviar').text(contactoSeleccionado.nombre);
    $('#btn-enviar-dinero').prop('disabled', false);
});

//Funcionalidad nuevo contaxto
$('#btn-guardar-contacto').click(function() {
    const nombre = $('#nuevo-nombre').val().trim();
    const alias = $('#nuevo-alias').val().trim();
    const cbu = parseInt($('#nuevo-cbu').val());
    if (nombre && alias && !isNaN(cbu)){
        listaContactos.push({
            nombre: nombre, alias: alias, CBU: cbu
        });
        localStorage.setItem('contactos', JSON.stringify(listaContactos));
        actualizarContactos(listaContactos);
            $('#nuevo-nombre').val('');
            $('#nuevo-alias').val('');
            $('#nuevo-cbu').val('');

             $('#alert-container-contacto').html(
                    `<div class="alert alert-success" role="alert">
                        Contacto agregado correctamente.
                    </div>`
                );
        setTimeout(function(){
            $('#modalNuevoContacto').modal('hide');
        },2000);
    }else{
        $('#alert-container-contacto').html('<div class="alert alert-danger">Complete todos los campos</div>');
    }
});

//Logica de transferencias
$('#btn-confirmar-envio').click(function () {
    const montoEnvio = parseFloat($('#monto-confirmar').val());
    const alertContainer = $('#alert-container-envio');

    if (isNaN(montoEnvio) || montoEnvio <= 0 || montoEnvio > saldo) {
        alertContainer.html('<div class="alert alert-danger">Monto inválido</div>');
        return;
    }
     saldo -= montoEnvio;
    localStorage.setItem("saldo", saldo);
    actualizarSaldo();
    $('#modal-saldo-actual').text("$" + saldo);
    
    movimientos.push({
            nombre: contactoSeleccionado.nombre,
            monto: montoEnvio,
            tipo: "transferencia"
        });
    localStorage.setItem('transacciones', JSON.stringify(movimientos));
    alertContainer.html('<div class="alert alert-success">Envío realizado</div>');
    setTimeout(function(){
        $('#modalEnviarDinero').modal('hide');
    }, 2000);
})

//actualizacion saldo en modal enviar
$('#modal-saldo-actual').text(`$${saldo}`);

//asignacion filtro por tipo de movimiento
$('#tipo-movimiento').on('change', function () {
    let tipoFiltro = $(this).val();
    actualizarHistorial(tipoFiltro);
});

//buscador de contactos
$('#busqueda').on('keyup', function() {
    const textoBusqueda = $(this).val().toLowerCase().trim();
        $('#tabla-body').empty();
        listaContactos.forEach(function(c, index){
            if(c.nombre.toLowerCase().includes(textoBusqueda)){
                $('#tabla-body').append(
                    `<tr data-index="${index}">
                        <td>${c.nombre}</td>
                        <td>${c.alias}</td>
                        <td>${c.CBU}</td>
                    </tr>`
                );
            }
        });
        //texto notfound
    if($('#tabla-body tr').length === 0){
        $('#tabla-body').append(
            `<tr>
                <td colspan="3" class="text-center text-muted">
                    No se encontraron contactos
                </td>
            </tr>`
        );
    }

});
