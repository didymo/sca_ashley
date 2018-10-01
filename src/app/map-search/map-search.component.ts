import { Component, OnInit } from '@angular/core';
import { Addr2coordService } from '../services/addr2coord.service';
import { CreateTMPService } from '../services/create-tmp.service';
import {Coordinates} from '../classes/coordinates';

@Component({
 selector: 'app-map-search',
 templateUrl: './map-search.component.html',
 styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent implements OnInit {

  protected map:   any         = null;
  protected coord: Coordinates = {
   latitude:  0,
   longitude: 0,
   zoom:      0
  };

  constructor(
    private geoCoder: Addr2coordService,
    private postTMP: CreateTMPService
  )
  {
    this.ngOnInit = this.ngOnInit.bind(this);
    this.createTMP  = this.createTMP.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.updateCoord = this.updateCoord.bind(this);
  }

  ngOnInit() {

    this.map = new L.Map('map', {selectArea: true });

  	var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  	var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  	var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 40, attribution: osmAttrib});

  	this.map.setView(new L.LatLng(-25.734968, 134.489563),4);
  	this.map.addLayer(osm);

    this.map.on('areaselected', (e) => {
      let coor = e.bounds.toBBoxString().split(','); // lon, lat, lon, lat
      let dragboxHeight = Math.abs(Number(coor[3]) - Number(coor[1]));
      let dragboxWidth  = Math.abs(Number(coor[2]) - Number(coor[0]));

      let mapDom = document.getElementById('map');
      let width  = mapDom.clientWidth;
      let height = mapDom.clientHeight;

      // Resize map
      // mapDom.setAttribute("style", `width: ${width}px; height: ${width*(dragboxHeight/dragboxWidth)}px;`);

      mapDom.style.width = width + 'px';
      mapDom.style.height = (width*(dragboxHeight/dragboxWidth)) + 'px';
      this.map.invalidateSize();
      this.map.fitBounds(e.bounds);

      let tmp = {
        'name': 'testerTMP',
        "leftTop":     {'latitude': Number(coor[1]), 'longitude': Number(coor[0])},
        "rightBottom": {'latitude': Number(coor[3]), 'longitude': Number(coor[2])}
      };
      this.createTMP(tmp);
    });
  }

  createTMP(tmp)
  {
    let res = null;
    this.postTMP.post(tmp).subscribe(res => {
      console.log(res);
    });
  }

  // Search bar input event listener
  handlerInput(event)
  {
    // Get coordinates
    let address = event.target.value;
    this.geoCoder.get(address).subscribe(res => {
      this.coord = {
        latitude:  Number(res[0].lat),
        longitude: Number(res[0].lon),
        zoom: 13
      };
      this.updateCoord();
    });
    event.preventDefault();
  }

  // Prevent Searchbar default submit action
  handlerSubmit(event)
  {
    event.preventDefault();
  }

  // Update map accroding to search bar
  updateCoord()
  {
    this.map.setView(new L.LatLng(this.coord.latitude, this.coord.longitude),this.coord.zoom);
  }

};
