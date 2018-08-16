/**
 *  OpenLayers map init. and interaction
 */

declare var ol: any;
import { Component, OnInit } from '@angular/core';
import { Addr2coordService } from '../services/addr2coord.service';
import {Map, View} from 'ol';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {Coordinates} from '../classes/coordinates';
import {platformModifierKeyOnly} from 'ol/events/condition.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {DragBox, Select} from 'ol/interaction.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Polygon from 'ol/geom/Polygon.js';
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {transform} from 'ol/proj';

@Component({
 selector: 'app-map-search',
 templateUrl: './map-search.component.html',
 styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent implements OnInit {

  protected map:   any         = null;
  public    value: string      = null;
  protected coord: Coordinates = {
   latitude:  0,
   longitude: 0,
   zoom:      0
  };
  protected dragbox: DragBox   = null;

  constructor(
    private geoCoder: Addr2coordService
  )
  {
    // Bind method to $this
    this.handlerDragboxStart = this.handlerDragboxStart.bind(this);
    this.handlerDragboxEnd   = this.handlerDragboxEnd.bind(this);
  }

  ngOnInit() {

    // Init. Map
    let vectorSource = new VectorSource({
      url: 'data/geojson/countries.geojson',
      format: new GeoJSON()
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: vectorSource
        })
      ],
      target: 'map',
      view: new View({
        center: transform([134.489563, -25.734968], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4
      })
    });

    var select = new Select();
    this.map.addInteraction(select);
    var selectedFeatures = select.getFeatures();

    this.dragbox = new DragBox({
      condition: platformModifierKeyOnly
    });
    this.map.addInteraction(this.dragbox);

    // Bind event listeners
    this.dragbox.on('boxend', this.handlerDragboxEnd);
    this.dragbox.on('boxstart', this.handlerDragboxStart);
  }

  // Drag event handler - start
  handlerDragboxStart()
  {

  }

  // Drag event handler - end
  handlerDragboxEnd()
  {
    let geometry = this.dragbox.getGeometry();
    this.map.getView().fit(geometry)
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
    this.map.setView(
      new View({
        center:  ol.proj.transform([this.coord.longitude, this.coord.latitude], 'EPSG:4326', 'EPSG:3857'),
        zoom: this.coord.zoom
      })
    );
  }

};
