import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { WayPoints } from 'src/app/models/waypoints';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  start: boolean = true;
  @ViewChild('asGeocoder') asGeocoder: ElementRef | any;
  wayPoints: WayPoints = {origin: null, destination: null};

  constructor(private mapService: MapService, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.mapService.buildMap()
      .then(({geocoder, map}) => {
        this.renderer2.appendChild(this.asGeocoder.nativeElement, 
          geocoder.onAdd(map)
          );
        console.log('Map Loaded');
      })
      .catch((error) => {
        console.error(error);
      })

    this.mapService.cbAddress.subscribe((getPoint) => {
      //Setting the start point to get the route
      if(this.start) {
        this.wayPoints.origin = getPoint;
        Notify.success('Starts in ' + getPoint.place_name);
        this.start = false;
      }
      else {
        this.wayPoints.destination = getPoint;
        Notify.success('Ends in ' + getPoint.place_name);
        this.start = true;
      }
    })
  }

  getRoute(): void {
    const coords = [
      this.wayPoints.origin.center,
      this.wayPoints.destination.center
    ]
    this.mapService.loadCords(coords);
  }



}
