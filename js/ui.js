

export function notificacion(mensaje) {

    if (document.querySelector('.alerta')) return;
    
    const zona = document.querySelector('form').firstElementChild;

    const divAlerta = document.createElement('div');
    divAlerta.classList.add('text-center','alerta','font-bold','bg-red-100','border', 'border-red-400','text-red-700','px-4','py-3','rounded','relative');

    const mensajeAlerta = document.createElement('p');
    mensajeAlerta.classList.add('font-bold');
    mensajeAlerta.textContent = mensaje;

    divAlerta.appendChild(mensajeAlerta);

    document.querySelector('form').insertBefore(divAlerta,zona);

    setTimeout(() => {
        divAlerta.remove();

        //Muestra el texto por defecto
        if (!document.querySelector('#resultado p')) {
            const zona = document.querySelector('#resultado');
            const texto = document.createElement('p');
            texto.textContent = "Agrega tu ciudad y país, el resultado se mostrará aquí";
            texto.classList.add('text-center','text-white','mt-6');
            
            zona.appendChild(texto);
        }     
    }, 3000);
}

export function limpiarHTML() {
    if (document.querySelector('#resultado p')) document.querySelector('#resultado p').remove();
}

export function spinner() {
    const spinner = document.querySelector('.spinner');

    spinner.classList.contains('oculto') ? spinner.classList.remove('oculto') : spinner.classList.add('oculto')
}