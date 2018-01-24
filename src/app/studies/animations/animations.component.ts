import { Component, OnInit, NgModule } from '@angular/core';
import { animate, state, style, transition, trigger }from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    // OPEN BOX
    trigger(
      'openClose',[
        state('collapsed', style({
          height: '0px',
          color: 'maroon',
          borderColor: 'maroon'
        })),
        state('expanded', style({
          height: '*', 
          borderColor: 'green',
          color: 'green'
        })),
        transition(
          'collapsed <=> expanded', [animate(500, style({
            height: '250px'
          })), animate(500)]
        )
      ]
    )
    // END OF OPEN BOX
  ]
})

export class AnimationsComponent implements OnInit {

  stateExpression: string;


  constructor() { 
    
  }
  expand(){
    this.stateExpression ="expanded";
  }
  collapse(){
    this.stateExpression = "collapsed";
  }

  ngOnInit() {
    this.collapse();
  }

}
