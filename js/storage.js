

document.addEventListener('DOMContentLoaded', function() {
    cargarHistorial();
    crearBotonesOrdenar();
});

function crearBotonesOrdenar() {
    const seccionHistorial = document.querySelector('.historial');
    if (!seccionHistorial) return;

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'historial-ordenar'; 

    const btnOrdenarFecha = document.createElement('button');
    btnOrdenarFecha.textContent = 'Ordenar por Fecha (Más nuevas primero)';
    btnOrdenarFecha.className = 'btn'; 
    
    const btnOrdenarGanador = document.createElement('button');
    btnOrdenarGanador.textContent = 'Ordenar por Ganador (A-Z)';
    btnOrdenarGanador.className = 'btn'; 
    contenedorBotones.appendChild(btnOrdenarFecha);
    contenedorBotones.appendChild(btnOrdenarGanador);
    seccionHistorial.insertBefore(contenedorBotones, seccionHistorial.children[1]);
    btnOrdenarFecha.addEventListener('click', function() {
        ordenarHistorial('fecha');
    });
    btnOrdenarGanador.addEventListener('click', function() {
        ordenarHistorial('ganador');
    });
}

function obtenerHistorial() {
    const historialGuardado = localStorage.getItem('historialPartidas');
    
    if (historialGuardado) {
        return JSON.parse(historialGuardado);
    } else {
        return [];
    }
}

function guardarHistorialEnStorage(historial) {
    localStorage.setItem('historialPartidas', JSON.stringify(historial));
}
function guardarPartida(datosPartida) {
    const historial = obtenerHistorial();
    historial.unshift(datosPartida);
    guardarHistorialEnStorage(historial);
    cargarHistorial(); 
}

function cargarHistorial() {
    const historial = obtenerHistorial();
    const seccionHistorial = document.querySelector('.historial');
    const partidasViejas = document.querySelectorAll('.historial-partida');
    partidasViejas.forEach(function(partida) {
        partida.remove();
    });

    historial.forEach(function(partida, indice) {
        const divPartida = crearDivPartida(partida, indice);
        seccionHistorial.appendChild(divPartida);
    });
}

function crearDivPartida(partida, indice) {

    const divPartida = document.createElement('div');
    divPartida.className = 'historial-partida';
    const jugadoresDiv = document.createElement('div');
    jugadoresDiv.className = 'historial-jugadores';
    
    let htmlJugadores = '';
    
    if (partida.resultado === 'Empate') {
        htmlJugadores = `
            <h4>Empate</h4>
            <div class="ganador">
                <span>${partida.nombreX} (X)</span>
            </div>
            <h4>Empate</h4>
            <div class="perdedor">
                <span>${partida.nombreO} (O)</span>
            </div>
        `;
    } else if (partida.resultado === 'X') { 
        htmlJugadores = `
            <h4>Ganador</h4>
            <div class="ganador">
                <span>${partida.nombreX} (X)</span>
            </div>
            <h4>Perdedor</h4>
            <div class="perdedor">
                <span>${partida.nombreO} (O)</span>
            </div>
        `;
    } else { 
        htmlJugadores = `
            <h4>Ganador</h4>
            <div class="ganador">
                <span>${partida.nombreO} (O)</span>
            </div>
            <h4>Perdedor</h4>
            <div class="perdedor">
                <span>${partida.nombreX} (X)</span>
            </div>
        `;
    }

    jugadoresDiv.innerHTML = htmlJugadores;

    const datosDiv = document.createElement('div');
    datosDiv.className = 'historial-datos'; 
    datosDiv.innerHTML = `
        <p><strong>Fecha:</strong> ${partida.fecha}</p>
        <p><strong>Duración:</strong> ${partida.tiempo}</p>
        <p><strong>Movimientos:</strong> ${partida.movimientosTotales} 
        (X: ${partida.movimientosX}, O: ${partida.movimientosO})
        </p>
    `;

    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar Partida';
    btnBorrar.className = 'btn'; 
    btnBorrar.addEventListener('click', function() {
        borrarPartida(indice);
    });
    divPartida.appendChild(jugadoresDiv);
    divPartida.appendChild(datosDiv);
    divPartida.appendChild(btnBorrar);
    return divPartida;
}

function borrarPartida(indiceABorrar) {

    const historial = obtenerHistorial();
    historial.splice(indiceABorrar, 1);
    guardarHistorialEnStorage(historial);
    cargarHistorial();
}

function ordenarHistorial(criterio) {
    const historial = obtenerHistorial();
    
    if (criterio === 'fecha') {
        historial.sort(function(a, b) {
            return new Date(b.fechaISO) - new Date(a.fechaISO);
        });
    } else if (criterio === 'ganador') {
        historial.sort(function(a, b) {
            let ganadorA = 'Empate'; 
            if (a.resultado === 'X') {
                ganadorA = a.nombreX;
            } else if (a.resultado === 'O') {
                ganadorA = a.nombreO;
            }
            
            let ganadorB = 'Empate';
            if (b.resultado === 'X') {
                ganadorB = b.nombreX;
            } else if (b.resultado === 'O') {
                ganadorB = b.nombreO;
            }
            return ganadorA.localeCompare(ganadorB);
        });
    }
    guardarHistorialEnStorage(historial);
    cargarHistorial();
}