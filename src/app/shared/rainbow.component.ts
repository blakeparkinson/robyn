import {Component, AfterViewInit, ElementRef} from '@angular/core';
import * as paper from "paper";
declare var Path: any;
declare var view: any;
declare var Color: any;
declare var Group: any;





@Component({
  selector: 'rainbow',
  templateUrl: './rainbow.component.html',
})
export class RainbowComponent implements AfterViewInit {

  ngAfterViewInit() {
    paper.install(window);
    const canvas = document.getElementById('myCanvas');
    paper.setup('myCanvas');
    function Radiate () {

  this.radius_centre = 25;
  this.radius_stepscale = 1.5;
  this.radius_decay = 0.95;
  this.steps = 6;
  this.spokes_centre = 42;
  this.spoke_thickness = 3;

  this.centerX = view.size.width/2;
  this.centerY = view.size.height/2;

  this.hot = new Color();
  this.hot.red = 1;
  this.hot.green = 195/255;
  this.hot.blue = 84/255;

  this.cold = new Color();
  this.cold.red = 1;
  this.cold.green = 84/255;
  this.cold.blue = 84/255;

  this.symbol = undefined;
  this.rings = [];

  this.r = 1;

}

Radiate.prototype = {

  constructor: Radiate,
  update: function() {

    console.log("update");

   for(var i=0;i<app.rings.length;i++) {
     app.rings[i].data.fade = -i/5;
     app.rings[i].opacity = 0;
   }

   view.onFrame = function (event) {
      for(var i=0;i<app.rings.length;i++) {

        app.rings[i].rotation+=0.01*(i+1);
        app.rings[i].data.fade += 0.01;
        app.rings[i].opacity = Math.max(0,app.rings[i].data.fade);
        //console.log(i+ " " +app.rings[i].data.fade)

      }

      //app.symbol.definition.rotate(app.r, new Point(app.radius_centre,0));

      //app.r+=0.1;


    }

     setTimeout(app.update,10000);


  },
  start: function() {

    var offset = this.radius_centre;
    var spokes = this.spokes_centre;
    var thickness = this.spoke_thickness;
    var step_scale = this.radius_stepscale;
    var length = offset / 2 * step_scale;
    var colour = this.hot.clone();

    var path = new Path.Line({
        from: [offset, 0],
        to: [offset+length, 0],
        strokeColor: 0xFFFFFF,
        strokeWidth: thickness
      });

    this.symbol = new Symbol(path);

    //this.xx = this.symbol.place();
    //this.xx.position = view.center;

    for (var s=0; s<this.steps; s++) {


      //var length = offset / 2 * this.radius_stepscale;
      var g = new Group({position: view.center});
      g.opacity = 0;
      g.data.fade = -s/5;
      var ringColor = colour.clone();

    for(var i=0; i<spokes; i++) {

      var theta = (Math.PI * 2 / spokes) * i;
      theta-=Math.PI/2;


      /*
      1. Using lines
      */


      var x1 = view.center.x + (Math.cos(theta)*offset);
      var y1 = view.center.y + (Math.sin(theta)*offset);
      var x2 = view.center.x + (Math.cos(theta)*(offset+length));
      var y2 = view.center.y + (Math.sin(theta)*(offset+length));

      var line = new Path.Line({
        from: [x1, y1],
        to: [x2, y2],
        strokeColor: ringColor,
        strokeWidth: thickness
      });


      /*
      2. Using symbols
      */

      /*
      var line = this.symbol.place(new Point(view.center.x, view.center.y));

      line.strokeScaling = false;
      line.scale(Math.pow(1.75,s), view.center);
      line.rotate(theta/Math.PI*180, view.center);

      line.strokeColor = ringColor;

      */

      g.addChild(line);

    }

      this.rings.push(g);

      offset += length;
      spokes-=5;
      thickness*=1.2;
      step_scale*=this.radius_decay;
      length*=step_scale;

      var p = (s)/this.steps;
      colour.red -= (this.hot.red-this.cold.red) * p;
      colour.green -= (this.hot.green-this.cold.green) * p;
      colour.blue -= (this.hot.blue-this.cold.blue) * p;

    }


    view.draw();

    this.update();



  }
};

var app;


  app = new Radiate();
  app.start();

}
}
