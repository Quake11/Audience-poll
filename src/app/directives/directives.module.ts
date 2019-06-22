import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeActionDirective } from '.';
import { RendererHelperService } from '../services';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';

declare var Hammer: any;
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}
@NgModule({
  declarations: [SwipeActionDirective],
  imports: [CommonModule],
  exports: [SwipeActionDirective],
  providers: [
    RendererHelperService,
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class DirectivesModule {}
