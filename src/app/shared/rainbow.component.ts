import {Component, AfterViewInit, ElementRef} from '@angular/core';
import * as paper from "paper";
declare var Path: any;
declare var Point: any;



@Component({
  selector: 'rainbow',
  templateUrl: './rainbow.component.html',
})
export class RainbowComponent implements AfterViewInit {

  ngAfterViewInit() {
    paper.install(window);
    const canvas = document.getElementById('myCanvas');
    paper.setup('myCanvas');
    console.log(paper);
    var myCircle = new Path.Circle(new Point(100, 70), 50);
    myCircle.fillColor = 'black';
  }

}
