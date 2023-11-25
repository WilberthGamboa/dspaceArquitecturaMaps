import { CommonModule } from '@angular/common';
import {Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// cloud api AIzaSyDal8gWT9yatkSmST52fylAj0QGtf51tD4
@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './maps.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],

})

export class MapsComponent implements OnInit  {
  safeUrl: SafeResourceUrl; // Change the type to SafeResourceUrl
  latitudCliente:number = 0
  longitudCliente:number = -0
  constructor(private sanitizer: DomSanitizer) {
    const unsafeUrl = 'your-unsafe-url'; // Replace 'your-unsafe-url' with the actual URL
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
  dataMaps:any = []
  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitudCliente = position.coords.latitude;
          this.longitudCliente = position.coords.longitude;
          console.log('Latitude: ' + position.coords.latitude);
          console.log('Longitude: ' + position.coords.longitude);

          // Puedes hacer lo que necesites con la ubicación aquí
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  async buscarInformacion(valor:string){
    this.dataMaps=[]
    valor = valor.trim()
    console.log(valor)
    const url = 'http://148.209.67.83/rest/items/find-by-metadata-field'
    console.log(url)
  const datos = {
    key: 'arq.Nombre',
    value: valor
  };

  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'JSESSIONID=8A999C4F62B2A0D0B88D2AD28D0CCFAD'
    },
    body: JSON.stringify(datos)
  };

  try {
    const respuesta = await fetch(url, opciones);
    
    if (!respuesta.ok) {
      console.log("Respuesta no ok")
      throw new Error(`Error en la petición: ${respuesta.statusText}`);
    }

    const datosRespuesta = await respuesta.json();
    console.log('Respuesta:', datosRespuesta);
    for (const iterator of datosRespuesta) {
      const item = await fetch(`http://148.209.67.83${iterator.link}/metadata`)
      const itemResponse= await item.json()
      console.log(itemResponse)
      let data = {
        title:'',
        latitud:'',
        longitud:''
      }
      for (const iterator of itemResponse) {
      
        console.log(iterator.key)
        if (iterator.key==="dc.title") {
         
           data.title = iterator.value
          console.log(iterator.value)
          console.log({data})
          
          
        }
        if (iterator.key==="arq.Latitud") {
          data.latitud=iterator.value
          console.log(iterator.value)
          console.log({data})
         
       }
       if (iterator.key==="arq.Longitud") {
       
         
         data.longitud=iterator.value

      
       
       this.dataMaps.push(data)
       console.log({data})
     }
       
      }
     
    }
    console.log(this.dataMaps)
  } catch (error:any) {
    console.error('Error al realizar la petición:', error.message);
  }
  }

  generateUrl(latitud: string, longitud: string): SafeResourceUrl {
    // Lógica para generar la URL en función del id
    const apiKey = 'AIzaSyDal8gWT9yatkSmST52fylAj0QGtf51tD4'; // Replace with your Google Maps API key
    const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${this.latitudCliente},${this.longitudCliente}&destination=${latitud},${longitud}&avoid=tolls|highways`;
   

    // Use the sanitizer to make the URL safe
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
 }

