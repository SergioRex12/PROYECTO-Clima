

const inputCiudad = document.querySelector('#ciudad');
const selectPais = document.querySelector('#pais');
const apiKey = 'ec8eba13fc62a53c94faadfc7fca657f';

document.addEventListener('DOMContentLoaded',() => {

    document.addEventListener('submit',obtenerClima);
    
})


//Obtenemos el clima
function obtenerClima(e) {
    e.preventDefault();
    if (inputCiudad.value === "" || selectPais.value === "" ) return console.log("Hay un error");

    const ciudad = inputCiudad.value;
    const pais = selectPais.value;

    spinner();
    getGeoCoding(pais,ciudad);
}

//Sirve para conseguir las coordenadas del lugar
function getGeoCoding(pais,ciudad) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${apiKey}`
    
    fetch(url)
        .then(resultado => resultado.json() )
        .then (res => getClima(res[0]))
        .catch(error => {
            
            console.log(`Codigo: ${error.cod}  Mensaje: ${error.message} `)
            if (document.querySelector('#resultado p')) document.querySelector('#resultado p').remove();
            spinner();

        })   
}

//Busca el clima según la latitúd y la longitúd 
function getClima({lat, lon}) {
    console.log(`Lat: ${lat}   Lon: ${lon}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(resultado => resultado.json()) 
    .then(res => mostrarClima(res))
}

//Muestra el clima en pantalla
function mostrarClima(obj) {
    const {temp,temp_max, temp_min} = obj.main;
    const zonaResultado = document.querySelector('#resultado');

    if (document.querySelector('#resultado p')) document.querySelector('#resultado p').remove();

    const item = document.createElement('p');
    item.innerHTML = `
        <p class = "tituloClima">Clima en ${obj.name} </p>
        <p class = "tempActual"> ${Math.round(temp)}ºC </p>
        <p class = "temp"> Max: ${Math.round(temp_max)} ºC </p>
        <p class = "temp"> Min: ${Math.round(temp_min)} ºC </p>
    `;

    zonaResultado.appendChild(item);
    spinner();
 
}

function spinner() {
    const spinner = document.querySelector('.spinner');

    spinner.classList.contains('oculto') ? spinner.classList.remove('oculto') : spinner.classList.add('oculto')
}
