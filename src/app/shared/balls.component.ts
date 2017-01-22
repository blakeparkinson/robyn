import {Component, AfterViewInit, ElementRef} from '@angular/core';
import * as paper from "paper";
import * as jQuery from "jquery";
declare var Path: any;
declare var view: any;
declare var Color: any;
declare var Group: any;


@Component({
  selector: 'balls',
  template: '<canvas id="ballsCanvas" resize width="400px" height="400px"></canvas>',
})
export class BallsComponent implements AfterViewInit {

  ngAfterViewInit() {
    const canvas = document.getElementById('ballsCanvas');
    (function($){

	"use strict";

	$(document).ready(function( ){
		initMagnetField();
	});


	function initMagnetField() {

		var p = paper;
    p.install(window);
    p.setup('ballsCanvas');

		// adjustable variables
		var force = 0.3,
			threshold = 500,
			spacing = 5,
			radius = 50;

		// other variables
		var mousePoint = new p.Point( p.view.size.width / 2, p.view.size.height/ 2),
			isTouch = 'ontouchstart' in window,
			magnets = [];

		function Magnet(pos, rad, force, hue) {
			this.centerPoint = pos;
			this.radius = rad;
			this.force = force;
			this.hue = hue;

			// elasticity
			this.momentumX = 0;
			this.momentumY = 0;
			this.momentum = new p.Point(0,0);

			this.center = new p.Shape.Circle( this.centerPoint, this.radius + 2 );

			this.magnet = new p.Shape.Ellipse({
				point: this.centerPoint,
				size: [this.radius * 2, this.radius * 2]
			});
			this.magnet.fillColor = {
				hue: this.hue,
				saturation: 1,
				brightness: 1
			};
			this.magnet.blendMode = 'difference';

		}


		Magnet.prototype = {
			avoidPoint: function( thePoint ) {

				var mouseOffset = new p.Point( mousePoint.subtract(this.centerPoint) );

				var mouseDistance = mousePoint.getDistance( this.centerPoint );
				var newDistance = 0;

				if( mouseDistance < threshold ) {
					newDistance = (mouseDistance - threshold) * this.force;
				}

				var newOffset = new p.Point(0, 0);
				if(mouseDistance !== 0){
					newOffset = new p.Point(mouseOffset.x / mouseDistance * newDistance, mouseOffset.y / mouseDistance * newDistance);
				}
				var newPosition = new p.Point( this.centerPoint.add( newOffset ) );

				var distanceToNewPosition = new p.Point( this.magnet.position.subtract(newPosition) );

				this.momentum = this.momentum.subtract( distanceToNewPosition.divide( 3 ) );
				this.momentum = this.momentum.multiply( 0.8 );

				this.magnet.position = this.magnet.position.add( this.momentum );

				var newHue = this.hue - newDistance * 3;
				this.magnet.fillColor.hue = newHue;

			},
			clear: function() {
				this.magnet.remove();
				this.center.remove();
			}

		};

		function clearDots() {
			for(var i = 0; i < magnets.length; i++) {
				magnets[i].clear();
			}
			magnets = [];
		}

		function printDots() {

			var stepSize = radius * 2 + spacing;
			var topRight = new p.Point(-100, -100);
			var amountX = Math.ceil(p.view.size.width / stepSize) + 3;
			var amountY = Math.ceil(p.view.size.height / stepSize) + 3;
			var count = 0;
			for( var i=0; i <= amountX; i++ ) {
				for( var j=0; j <= amountY; j++ ) {
					count ++;
					var center = new p.Point(topRight.x + i * stepSize, topRight.y + j * stepSize );
					var hue = 300 + center.getDistance( new p.Point( 0, 0 ) ) / 4;
					magnets.push( new Magnet(center, radius, force, hue) );
				}
			}
		}

		p.view.onFrame = function(event) {
			for( var i=0; i<magnets.length; i++ ) {
				magnets[i].avoidPoint( mousePoint );
			}

		};

		var tool = new p.Tool();
		tool.onMouseMove = function(event) {
			mousePoint = event.lastPoint;
		};

		function buildStage() {
			clearDots();
			printDots();
		}
		buildStage();

		p.view.onResize = function(event) {
			buildStage();
		};
		function resizeCanvas() {
			p.view.viewSize = new p.Size( $(window).width(), $(window).height() );
		}

		$(window).resize(function() {
			resizeCanvas();
		});

	}

})(jQuery);
}
}
