import { NgxSwipeActionConfig } from './ngx-swipe-action-config.interface';

export const swipeActionConfig: NgxSwipeActionConfig = {
  icons: {
    default: 'delete',
    active: 'delete_forever'
  },
  transitionTime: 200, // transition time in ms for css animations
  minOffsetX: -250, // minimum X transform value
  maxOffsetX: 0, // maximum X transform value
  panThresholdX: 30, //  threshold for pan to start (to distinguish from scroll)
  panThresholdY: 50 //  threshold for pan to start (to distinguish from scroll)
};
