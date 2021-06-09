function separadorDeMiles(numeroString){
    return  parseFloat(numeroString.replace(/,/g, ""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertirANumero(numeroString){
    let numeroInt;
    return numeroInt = parseInt(numeroString.replace(/,/g, ""));
}

function convertirAFecha(fecha){
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();

    let fecha_formateada;
    if (day < 10) {
        fecha_formateada = `${year}/0${month}/0${day}`;
    } else if (month < 10) {
        fecha_formateada = `${year}/0${month}/${day}`;
    } else{
        fecha_formateada = `${year}/${month}/${day}`;
    }
    return fecha_formateada;
}

module.exports = {
    separadorDeMiles,
    convertirANumero,
    convertirAFecha
}