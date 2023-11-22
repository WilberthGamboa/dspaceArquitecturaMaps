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

  async buscarInformacion(valor:string){
    console.log(valor)
    const url = 'http://148.209.67.83/rest/items/find-by-metadata-field';
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
  } catch (error:any) {
    console.error('Error al realizar la petición:', error.message);
  }
  }
 }

