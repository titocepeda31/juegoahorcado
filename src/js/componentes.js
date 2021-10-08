export const init = () => {


  // Variables

const palabras = ['marioneta','huracan','copihue','condor','paralelepipedo','piramide','egipto','viajero'],  
      palabra = palabras[Math.floor(Math.random() * palabras.length)],
      arrayPalabra = Array.from(palabra),
      arrayPalabrasDisponibles = Array.from(palabra),
      palabraConGuiones = palabra.replace(/./g,"_ "),
      arrayPalabraConGuiones = [...palabraConGuiones];

let   intentosFallidos = 0,
      vidasJuego = 4;
 


// REFERENCIAS HTML

const letra = document.querySelector("#letra"),
      divImgAhoracado = document.querySelector("#ahorcado"),
      contadorDeFallos = document.querySelector(".ContadorDeFallos"),
      textoPalabra = document.querySelector("#palabra"),
      darPista = document.querySelector("#darPista"),
      reiniciar = document.querySelector("#reiniciar");


// FUNCIONES JS      


 const focusInput = () =>{
    letra.focus();
 }     



const playSoundGame = (e) =>{
  let audio = e,
      sound = new Howl({
        src: [`src/sound/${audio}.mp3`],
        volume: 1.0,   
      });
      sound.play();
}

  
const muestraVidas = (n) =>{  
  let div = document.createElement('div');  
  for(let i = 0; i < n; i++){
    div.innerHTML+= `<span class="heart"></span>`;      
  }
  contadorDeFallos.appendChild(div); 
}



const eliminaVida = () =>{
  const span = document.querySelectorAll(".ContadorDeFallos div .heart")[0];
  document.querySelector('.ContadorDeFallos div').removeChild(span); 
  playSoundGame('fallo');   
} 



// init 

  textoPalabra.innerText = palabraConGuiones; 
  muestraVidas(vidasJuego);
  focusInput();    



  letra.addEventListener('keyup',(event) => {  

    let haPerdido = true;   

    if (event.keyCode === 13) {  

      for(const i in arrayPalabra){       
        if(arrayPalabra[i] == letra.value){
          arrayPalabraConGuiones[i*2] = letra.value;   
          delete arrayPalabrasDisponibles[i];      
          haPerdido = false;
        }      
      }  

      if(haPerdido){

        intentosFallidos++;
        divImgAhoracado.style.backgroundPosition = `-${(207 * intentosFallidos)}px`;     
        if(intentosFallidos == vidasJuego){
          textoPalabra.innerText = palabra;
          textoPalabra.style.color = "red";
          textoPalabra.style.textDecoration = 'line-through'; 
          playSoundGame('findeljuego');       
          alert("Perdiste"); 
        }

        eliminaVida();
        

      }else{
        textoPalabra.innerText = arrayPalabraConGuiones.join('');      
        !arrayPalabraConGuiones.includes('_') ? playSoundGame('ganar') : playSoundGame('bien');        
      }   

      letra.value ='';

    }
      
  });




  //let nuevaPalabra = Array.from(palabra); 

  darPista.addEventListener('click',()=>{
    

    // la letra debe crearse con la condicion 

    for(let i = 0; i < arrayPalabra.length ; i++){
        if(arrayPalabrasDisponibles[i]){
          arrayPalabraConGuiones[i*2] = arrayPalabrasDisponibles[i];  
          delete arrayPalabrasDisponibles[i];
          break;
        }
    }

    textoPalabra.innerText = arrayPalabraConGuiones.join('');    
    !arrayPalabraConGuiones.includes('_') ? playSoundGame('ganar') : playSoundGame('abucheo');   
    
    focusInput();

  });



  reiniciar.addEventListener('click',() => {
    location.reload();
  });





}