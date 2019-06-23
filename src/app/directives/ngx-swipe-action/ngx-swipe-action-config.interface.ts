export interface NgxSwipeActionConfig {
  icons?: {
    default: string;
    active: string;
  };
  transitionTime?: number; // for css animation
  minOffsetX?: number; // minimum X transform value
  maxOffsetX?: number; // maximum X transform value
  panThresholdX?: number; //  threshold for pan to start (to distinguish from scroll)
  panThresholdY?: number; //  threshold for pan to start (to distinguish from scroll)
}

export interface SwipeActionState {
  isActive?: boolean;
  currentOffsetX?: number;
}
