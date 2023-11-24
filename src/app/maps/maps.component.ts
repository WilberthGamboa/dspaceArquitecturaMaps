import { CommonModule } from '@angular/common';
import {Component } from '@angular/core';

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

export class MapsComponent {
  dataMaps:any = []
  async buscarInformacion(valor:string){
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
 }

