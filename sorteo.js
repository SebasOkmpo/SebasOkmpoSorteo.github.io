document.getElementById('sortear').addEventListener('click', function() {
    const usuarios = document.getElementById('usuarios').value.trim().split('\n');
    const equipos = document.getElementById('equipos').value.trim().split('\n');

    if (usuarios.length !== equipos.length || usuarios.length % 2 !== 0) {
        alert('La cantidad de usuarios y equipos debe ser par e igual.');
        return;
    }

    // Asignar equipos aleatoriamente
    const asignacion = [];
    const equiposRestantes = [...equipos];

    usuarios.forEach(usuario => {
        const randomIndex = Math.floor(Math.random() * equiposRestantes.length);
        const equipoAsignado = equiposRestantes.splice(randomIndex, 1)[0];
        asignacion.push(`${usuario} - ${equipoAsignado}`);
    });

    // Barajar la lista de asignaciones para hacer los cruces aleatorios
    const asignacionBarajada = asignacion
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // Crear cruces
    const cruce = [];
    for (let i = 0; i < asignacionBarajada.length; i += 2) {
        cruce.push(`${asignacionBarajada[i]} vs ${asignacionBarajada[i + 1]}`);
    } 

    document.getElementById('asignacionEquipo').innerHTML = asignacionBarajada.join('<br>');
    document.getElementById('cruce').innerHTML = cruce.join('<br>');
});

document.getElementById('limpiar').addEventListener('click', function() {
    document.getElementById('usuarios').value = '';
    document.getElementById('equipos').value = '';
    document.getElementById('asignacionEquipo').innerHTML = '';
    document.getElementById('cruce').innerHTML = '';
});

document.getElementById('exportar').addEventListener('click', function() {
    const usuarios = document.getElementById('usuarios').value.trim().split('\n');
    const equipos = document.getElementById('equipos').value.trim().split('\n');
    const asignacion = document.getElementById('asignacionEquipo').innerHTML.split('<br>');
    const cruce = document.getElementById('cruce').innerHTML.split('<br>');

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Usuarios,Equipos,Asignacion Equipo,Cruce\n";

    for (let i = 0; i < usuarios.length; i++) {
        const asignacionEquipo = asignacion[i] ? asignacion[i] : '';
        const crucePartido = cruce[i] ? cruce[i] : '';
        csvContent += `${usuarios[i] || ''},${equipos[i] || ''},${asignacionEquipo},${crucePartido}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sorteo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
