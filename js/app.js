import { limpiarHTML, notificacion, spinner } from "./ui.js";
import { API } from "./api.js";


const inputCiudad = document.querySelector('#ciudad');
const selectPais = document.querySelector('#pais');

document.addEventListener('DOMContentLoaded',() => {

    document.addEventListener('submit',obtenerClima);
    
})


//Obtenemos el clima
function obtenerClima(e) {
    e.preventDefault();
    if (inputCiudad.value === "") return notificacion('Ciudad incorrecta...');
    if (selectPais.value === "") return notificacion('Selecciona un país...');

    const ciudad = inputCiudad.value;
    const pais = selectPais.value;

    const api = new API();

    spinner();
    api.getGeoCoding(pais,ciudad);
}

//Muestra el clima en pantalla
export function mostrarClima(obj) {
    const {temp,temp_max, temp_min} = obj.main;
    const zonaResultado = document.querySelector('#resultado');

    limpiarHTML();

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
