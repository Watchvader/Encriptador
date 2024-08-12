const textArea = document.querySelector(".entrada_texto");
const mensaje = document.querySelector(".mensaje_encriptado");
const seccionTexto = document.querySelector(".seccion_texto");
const mensajeSalida = document.querySelector(".mensaje_salida");
const info = document.querySelector(".info");
const botonEncriptar = document.querySelector(".boton_encriptar");

let codigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];


function procesarTexto(funcion){
    const textoIngresado = textArea.value; //obtiene el texto ingresado
    const textoProcesado = funcion(textoIngresado); //se usa otra funcion para encriptar o desencriptar
    mensaje.innerText = textoProcesado; //muestra el mensaje en el elemento html
    textArea.value = "";
}


function btnEncriptar(){
    if (validarTexto()){
        procesarTexto(encriptar);
        seccionTexto.style.display = 'block';
        mensajeSalida.style.display = 'none';
    }

}
function btnDesencriptar(){
    if (validarTexto()){
        procesarTexto(desencriptar);
        seccionTexto.style.display = 'block';
        mensajeSalida.style.display = 'none';
    }
}


function transformarTexto(textoentrada, option){
    textoentrada = textoentrada.toLowerCase();
    for(i=0; i < codigo.length; i++){
        let original = codigo[i][0];
        let reemplazo = codigo[i][1];
        if(option){
            textoentrada = textoentrada.replaceAll(original, reemplazo);
        }else{
            textoentrada = textoentrada.replaceAll(reemplazo, original);
        }
    }
    return textoentrada;
}

function encriptar(textoentrada){
    return transformarTexto(textoentrada, true);
}

function desencriptar(textoentrada){
    return transformarTexto(textoentrada, false);
}

function copiar(){
    let texto = mensaje.innerText;
    if (texto != ""){
        navigator.clipboard.writeText(texto);
        alert("Texto copiado al portapapeles!");
    }
    else{
        alert("no se a ingresado texto!");
    }
    
}

function validarTexto(){
    const texto = textArea.value;
    const Mayus = /[ÁÉÍÓÚáéíóú]/.test(texto) || /[A-Z]/.test(texto);

    if(Mayus){
        
        info.style.color = "red";
        botonEncriptar.disabled = true;
        return false;
    }
    else{
        info.style.color = "";
        botonEncriptar.disabled = false;
        return true;
    }
}

seccionTexto.style.display = "none";
textArea.addEventListener("input",validarTexto);


