import { mostrarClima } from "./app.js";
import { limpiarHTML, notificacion, spinner } from "./ui.js";


export class API {
    constructor() {
        this.apiKey = 'ec8eba13fc62a53c94faadfc7fca657f';
    }

    //Sirve para conseguir las coordenadas del lugar
    async getGeoCoding(pais,ciudad) {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${this.apiKey}` 

        try {
            const consulta = await fetch(url);
            const resultado = await consulta.json();

            if (!resultado[0]) {
                limpiarHTML();
                spinner();
                notificacion("No hay resultados");
                return;
            };

            this.getClima(resultado[0])
        } catch (error) {
            console.log(error)
            limpiarHTML();
            spinner();
        }   

    }

    //Busca el clima según la latitúd y la longitúd 
    async getClima({lat, lon}) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        
        try {
            const consulta = await fetch(url);
            const resultado = await consulta.json();
            mostrarClima(resultado);
        } catch (error) {
           console.log(error); 
        }
    }
}