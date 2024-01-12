//elementos del DOM
let input=document.querySelector(".input")
let boton=document.querySelector(".boton")
let humedad=document.querySelector(".humedad")
let viento =document.querySelector(".viento")
let temperatura=document.querySelector(".temperatura")
let nubes=document.querySelector(".nubes")
let grado=document.querySelector(".grado")
let latitud=document.querySelector(".lat")
let longitud=document.querySelector(".long")

let cielo=document.querySelector(".ciudadName")
let loader = document.querySelectorAll('.lds-roller');

let body=document.getElementsByTagName("body")[0]

let nube =document.querySelector(".nube_imagen")

let icon = document.querySelector(".imagen");

//la llave del api 
let APIKEY="7b405c9842c202a1250e879699842e15"



//se le agrega un evento al input el cual es que al presionar la tecla enter llama a la funcion boton con el evento click

input.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
       boton.click()
   
    }

   })

   //se le da un evento al boton el cual es click 
boton.addEventListener("click", (event) => {
    event.preventDefault();

    //toma el valor escrito en el input
    let city = input.value;
    console.log(city);
    //activa el loader 
    loader[0].style.display="block"

   //se hace una funcion la cual es seria tanto la solicitud del api como el valor de los datos de esa solicitud
        async function solicitud(ciudad) {
            
            // se hace un bloque try/catch en el cual el en el try estara el codigo a ejecutar 
            //pero si llega haber un erro el catch capturara el error y mostrara lo escrito en esas lineas de codigo 
            try{
                let solicitud = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${APIKEY}&lang=es`);
                 let datos = await solicitud.json();
                 // se inactiva el loader
                loader[0].style.display="none"


        
                if (nube.firstChild) {
                    while (nube.firstChild) {
                        nube.removeChild(nube.firstChild);
                    }  
                }


                console.log(datos);
                
                const iconWeather = datos.weather[0].icon;
                icon.setAttribute('src', `https://openweathermap.org/img/wn/${iconWeather}@2x.png`);

                

               
                let imagen = document.createElement('img');
                imagen.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`;

               
                nube.appendChild(imagen);

                if(datos.weather[0].description.includes("nuboso")){
                    body.style.background = "url(fondos/lluvia-negro-abstracto-oscuro-poder_1127-2380.jpg)";
                    body.style.backgroundSize = "cover";
                    body.style.backgroundPosition = "center";
    
                }

                else if(datos.weather[0].description.includes("niebla")){
                    body.style.background = "url(fondos/lluvia-negro-abstracto-oscuro-poder_1127-2380.jpg)";
                    body.style.backgroundSize = "cover";
                    body.style.backgroundPosition = "center";
    
                }

                
             

                else if(datos.weather[0].description.includes("claro")){
                    body.style.background = "url(fondos/sky_clouds_blue_sky_clouds_form_blue_weather_background_image-602941.jpg!d)";
                    body.style.backgroundRepeat = "no-repeat"
                    body.style.backgroundPosition = "center";
                    body.style.backgroundSize = "cover";
                }
                else if(datos.weather[0].description.includes("nubes")){
                    body.style.background = "url(fondos/sky_clouds_blue_sky_clouds_form_blue_weather_background_image-602941.jpg!d)";
                    body.style.backgroundRepeat = "no-repeat"
                    body.style.backgroundPosition = "center";
                    body.style.backgroundSize = "cover";
                }
    
                else if(datos.weather[0].description.includes("lluvia")){
                    body.style.background = "url(fondos/el-tiempo-en-santiago-de-compostela-prevision-meteorologica-de-hoy-viernes-7-de-febrero-980x551.jpg)";
                    body.style.backgroundRepeat = "no-repeat"
                    body.style.backgroundPosition = "center";
                    body.style.backgroundSize = "cover";
    
                }
                
                humedad.innerHTML = (`${datos.main.humidity}%`);
                viento.innerHTML = (`${datos.wind.speed}m/s`);
                temperatura.innerHTML = (`${parseFloat(datos.main.temp - 273.15).toFixed(2)}°C`);
                nubes.innerHTML = (`${datos.weather[0].description}`);
                grado.innerHTML = (`${parseFloat(datos.main.temp - 273.15).toFixed(2)}°C`);
                cielo.innerHTML = (`${datos.name}`);
                latitud.innerHTML=(`latitud: ${datos.coord.lat}`)
                longitud.innerHTML=(`longitud: ${datos.coord.lon}`)

            }catch (error) {
                    loader[0].style.display="none"
                    console.log("Lo sentimos, hay un error");
                   setTimeout(() => {
                    alert("Lo sentimos, hay un error")
                   }, 1000);

            
                  }
       
         
                }
        solicitud(city);
    
       
    } );


