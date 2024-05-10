
let historialCalculos = [];


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

    if (total < 30000) {
        total *= 1.1;
    }

    let cuotaMensual = total / meses;
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = "La cuota mensual es: $" + cuotaMensual.toFixed(2);

    // Agregar el cálculo al historial
    historialCalculos.push({ total: total, meses: meses, cuotaMensual: cuotaMensual });
    actualizarHistorial();

    // Guardar el historial en localStorage
    localStorage.setItem('historialCalculos', JSON.stringify(historialCalculos));
};

function actualizarHistorial() {
    const historialBody = document.getElementById('historial-body');
    historialBody.innerHTML = '';

    historialCalculos.forEach((calculo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>$${calculo.total}</td>
            <td>${calculo.meses}</td>
            <td>$${calculo.cuotaMensual.toFixed(2)}</td>
        `;
        historialBody.appendChild(row);
    });
}