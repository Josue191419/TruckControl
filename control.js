let viajes = [];

function agregar() {

    let fecha = document.getElementById("fecha").value;
    let chofer = document.getElementById("chofer").value;
    let viaje = document.getElementById("viaje").value;

    let kmInicio = parseFloat(document.getElementById("kmInicio").value);
    let kmFinal = parseFloat(document.getElementById("kmFinal").value);

    let litros = parseFloat(document.getElementById("litros").value);
    let tanque = parseFloat(document.getElementById("tanque").value);
    let combustible = parseFloat(document.getElementById("combustible").value);

    let salario = parseFloat(document.getElementById("salario").value);
    let otros = parseFloat(document.getElementById("otros").value);

    // VALIDACIÓN
    if (!fecha || !chofer || !viaje) {
        alert("Complete los campos");
        return;
    }

    if (kmFinal <= kmInicio) {
        alert("KM incorrectos");
        return;
    }

    let km = kmFinal - kmInicio;
    let litrosKm = litros / km;
    let total = tanque + combustible + salario + otros;

    let dato = {
        fecha,
        chofer,
        viaje,
        km,
        litros,
        litrosKm,
        tanque,
        combustible,
        salario,
        otros,
        total
    };

    viajes.push(dato);

    mostrar();
}

function mostrar() {

    let tabla = document.getElementById("tablaViajes");
    tabla.innerHTML = "";

    let totalGeneral = 0;

    viajes.forEach((v, i) => {

        tabla.innerHTML += `
        <tr>
            <td>${v.fecha}</td>
            <td>${v.chofer}</td>
            <td>${v.viaje}</td>
            <td>${v.km}</td>
            <td>${v.litros}</td>
            <td>${v.litrosKm.toFixed(2)}</td>
            <td>₡${v.tanque}</td>
            <td>₡${v.combustible}</td>
            <td>₡${v.salario}</td>
            <td>₡${v.otros}</td>
            <td>₡${v.total}</td>
            <td><button onclick="eliminar(${i})">❌</button></td>
        </tr>
        `;

        totalGeneral += v.total;
    });

    document.getElementById("total").innerText =
        "Total general: ₡" + totalGeneral;
}

function eliminar(i) {
    viajes.splice(i, 1);
    mostrar();
}




function generarPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Reporte de Camión", 20, 20);

    let datos = viajes.map(v => [
        v.fecha,
        v.viaje,
        v.km,
        v.litros,


         "CRC " + v.total.toLocaleString()
    ]);

    doc.autoTable({
        head: [["Fecha", "Viaje", "KM", "Litros", "Total"]],
        body: datos,
        startY: 30
    });

    doc.save("reporte_tabla.pdf");
}