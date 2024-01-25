/*Asigna texto a un elemento HTML

let titulo = document.querySelector('h1');
parrafo.innerHTML = 'Juego del número secreto'

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';*/

//creación de función inicial para optimizar codigo

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

 function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    //alert('Clic desde el botón');
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
  
    /*console.log(typeof(numeroDeUsuario));//saber que tipo de variable es el input (string, int..)
    console.log(numeroDeUsuario);
    console.log(typeof(numeroSecreto));//saber que tipo de variable es el input (string, int..)
    console.log(numeroSecreto);
    console.log(numeroDeUsuario === numeroSecreto);*/

    //console.log(intentos);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}` );
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        }else{
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

//función limpia caja

function limpiarCaja(){
    /*let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';*/ //Forma larga 
    document.querySelector('#valorUsuario').value = '';
}

//Encapsulamiento

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //return numeroSecreto;  variable con alcance de bloque

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    //si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números')
    }else{
            //Si el numero generado está incluido en la lista 
    if (listaNumerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto();
    }else{
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
    }

    //si el número generado esta incluido en la lista 
    //recursividad
    if (listaNumerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto();
    }else{
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();

    //Indicar mensaje de inicio
    //generar el número aleatorio
    //Inicializar número de intentos
    condicionesIniciales();

    //Deshabilitar botón nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

}

condicionesIniciales();