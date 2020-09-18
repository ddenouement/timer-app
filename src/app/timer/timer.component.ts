import { Component, OnInit } from '@angular/core';
import {timer,Observable , Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  stopCountingSignal = new  Subject();
  MAX_INTERVAL_DBLCLICK = 300;
  isWait: boolean;
  isStop: boolean;
  private lastClick: number;
  timeElapsedInSeconds:number;

 // private subscriptions = new Subscription();
  constructor() { }

  ngOnInit(): void {
   this.isWait = false;
   this.isStop = true;
  }

  ngOnDestroy():void {
    //this.subscriptions.unsubscribe();
  }

  startTimer(  ){
    this.isWait = false;
    this.isStop = false;
    this.stopCountingSignal = new  Subject();
    var numbers = timer(1000, 1000); //1 sec delay
       numbers
          .pipe(takeUntil( this.stopCountingSignal ))
          .subscribe(x =>{
               this.timeElapsedInSeconds++;
            });
  }

  resetTimer(){
    this.timeElapsedInSeconds = 0;
  }

  stopTimer(){
      this.timeElapsedInSeconds = 0;
      this.isStop = true;
      this.emitStopCountingSignal();
  }

  waitTimer(){
    const now = Date.now()
    if (now - this.lastClick < this.MAX_INTERVAL_DBLCLICK) {
        this.isWait = true;
        this.emitStopCountingSignal();
    }
    else {
        this.lastClick = now;
    }
  }

  emitStopCountingSignal(){
    this.stopCountingSignal.next();
  }

  checkStartStopTimer(){
    if(this.isStop || this.isWait){
      this.startTimer();
    }
    else this.stopTimer();
  }

  getStartStopTooltip(){
    if(this.isWait){
       return "Click to resume the timer";
    }
    else if(this.isStop){
       return "Click to start";
    }
    else return "Click to stop the timer";
  }

}
