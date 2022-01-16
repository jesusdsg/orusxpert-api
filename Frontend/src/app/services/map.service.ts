import { Injectable, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  cbAddress: EventEmitter<any> = new EventEmitter<any>();

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/light-v10';

  //Starting in Medellin xd
  lat = 6.281282;
  lng = -75.558638;

  zoom = 3;

  constructor(private http: HttpClient) {
    this.mapbox.accessToken = environment.mapK;
  }

  buildMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat],

        });

        //control navigation
        this.map.addControl(new mapboxgl.NavigationControl());
        //input address search
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
          marker: false,
        });

        //Onresult
        geocoder.on('result', (e) => {
          const { result } = e;
          geocoder.clear(); //clear input 
          console.log('Evento', e);
          this.cbAddress.emit(result);
        })

        resolve({
          map: this.map,
          geocoder
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  loadCords(coords): void {
    console.log('coords', coords);
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.mapK}`,
    ].join('');

    this.http.get(url).subscribe((res: any) => {
      const routes = res.routes[0].geometry.coordinates;
      //Creating the final route
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routes
          }
        }
      });

      //Painting the route
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'green',
          'line-width': 3
        }
      });

    })






    console.log(url);

  }


}
