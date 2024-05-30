let historialCalculos = [];


function verificarNumeros(total, meses) {
    return new Promise((resolve, reject) => {
        if (!isNaN(total) && !isNaN(meses) && total > 0 && meses > 0) {
            resolve();
        } else {
            reject("Por favor, ingrese montos válidos y mayores que cero.");
        }
    });
}


function cargarHistorialDesdeLocalStorage() {
    const historialGuardado = localStorage.getItem('historialCalculos');
    if (historialGuardado) {
        historialCalculos = JSON.parse(historialGuardado);
        actualizarHistorial();
    }
}

cargarHistorialDesdeLocalStorage();


const calcular = document.getElementById('calcular');
calcular.addEventListener('click', compraAñadida);

function compraAñadida() {
    let total = parseInt(document.getElementById('total').value);
    let meses = parseInt(document.getElementById('meses').value);


    verificarNumeros(total, meses)
        .then(() => {

            let cuotaMensual = total / meses;
            let resultado = document.getElementById('resultado');
            resultado.innerHTML = "La cuota mensual es: $" + cuotaMensual.toFixed(2);

            historialCalculos.push({ total: total, meses: meses, cuotaMensual: cuotaMensual });
            actualizarHistorial();

            localStorage.setItem('historialCalculos', JSON.stringify(historialCalculos));
        })
        .catch((error) => {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        });
}


function actualizarHistorial() {
    const historialBody = document.getElementById('historial-body');
    historialBody.innerHTML = '';

    historialCalculos.forEach((calculo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>$${calculo.total}</td>
            <td>${calculo.meses}</td>
            <td>$${calculo.cuotaMensual}</td>
        `;
        historialBody.appendChild(row);
    });
}
