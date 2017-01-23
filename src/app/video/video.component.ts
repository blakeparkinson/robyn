import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Video');
  }

}
