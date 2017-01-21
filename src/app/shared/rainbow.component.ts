import {Component, AfterViewInit, ElementRef} from '@angular/core';
declare var paper: any;

@Component({
  selector: 'rainbow',
  templateUrl: './rainbow.component.html',
})
export class RainbowComponent implements AfterViewInit {

  ngAfterViewInit(){
    paper.install(window);
    const canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    console.log(paper);
  }

}
