import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { RendererHelperService } from 'src/app/services';
import { swipeActionConfig } from './ngx-swipe-action.config';
import {
  NgxSwipeActionConfig,
  SwipeActionState
} from './ngx-swipe-action-config.interface';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[ngxSwipeAction]'
})
export class NgxSwipeActionDirective implements OnInit {
  @Output() ngxSwipeActionDone: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  // @Input() ngxSwipeActionConfig: SwipeActionConfig;
  @Input() ngxSwipeActionConfig: NgxSwipeActionConfig = swipeActionConfig;

  private actionWrapper: ElementRef;
  private actionIcon: ElementRef;
  private actionIconText: ElementRef;

  private config: NgxSwipeActionConfig;

  private state = new BehaviorSubject<SwipeActionState>({
    isActive: false, // true if gonna emit event
    currentOffsetX: 0
  });

  updateState(newValues: SwipeActionState) {
    this.state.next({ ...this.state.value, ...newValues });
  }

  @HostListener('panstart')
  onPanStart() {
    this.setTransition(this.elementRef.nativeElement, false);
  }

  @HostListener('panleft', ['$event'])
  onPanLeft(event) {
    const { deltaX } = event;
    const { minOffsetX } = this.config;

    if (this.isPan(event) || this.currentOffsetX) {
      if (!this.actionWrapper) {
        this.initActionElements();
      }
      if (minOffsetX <= deltaX) {
        this.currentOffsetX = deltaX;
      } else {
        this.currentOffsetX = minOffsetX;
      }
    }
  }

  @HostListener('panright', ['$event'])
  onPanRight(event) {
    const { deltaX } = event;
    const { minOffsetX } = this.config;

    if (this.isPan(event) || this.currentOffsetX) {
      if (minOffsetX <= deltaX) {
        this.currentOffsetX = deltaX;
      }
    }
  }

  @HostListener('panend')
  onPanEnd() {
    const { minOffsetX } = this.config;

    if (this.currentOffsetX <= minOffsetX) {
      // trigger action event
      this.ngxSwipeActionDone.emit(true);
    }

    this.currentOffsetX = 0;
    this.setTransition(this.elementRef.nativeElement, true);
    this.removeActionWrapper();
  }

  get isActive(): boolean {
    return this.state.value.isActive;
  }

  set isActive(val: boolean) {
    const { icons } = this.config;
    if (val !== this.isActive) {
      this.updateState({ isActive: val });

      if (val) {
        this.reInitActionIcon(icons.active);
        this.renderer.addClass(this.actionIcon, 'active');
      } else {
        console.log('not active, init action icon');

        this.reInitActionIcon(icons.default);
      }
    }
  }

  get currentOffsetX(): number {
    return this.state.getValue().currentOffsetX;
  }

  set currentOffsetX(val: number) {
    const { minOffsetX, maxOffsetX } = this.config;

    if (val >= minOffsetX && val <= maxOffsetX) {
      this.updateState({ currentOffsetX: val });
    }

    this.isActive = val <= minOffsetX;

    this.updateActionElementStyles();
    this.updateElementTranslateX(this.currentOffsetX);
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private rendererHelper: RendererHelperService
  ) {}

  ngOnInit() {
    this.config = { ...swipeActionConfig, ...this.ngxSwipeActionConfig };
    // this.config = this.ngxSwipeActionConfig || swipeActionConfig;
  }

  // determine if user really trying pan or just scrolling
  isPan(event) {
    const { deltaX, deltaY } = event;
    const { panThresholdY, panThresholdX } = this.config;

    return Math.abs(deltaY) < panThresholdY && Math.abs(deltaX) > panThresholdX;
  }

  getPanPercent(offsetX: number) {
    const { minOffsetX } = this.config;
    console.log(offsetX / minOffsetX);

    return offsetX / minOffsetX;
  }

  initActionElements() {
    console.log('initActionElements');

    const { icons } = this.config;
    this.initActionWrapper();
    this.initActionIcon(icons.default);
  }

  updateActionElementStyles() {
    const percent = this.getPanPercent(this.currentOffsetX);
    const width = Math.abs(this.currentOffsetX);

    this.renderer.setStyle(
      this.actionWrapper,
      'will-change',
      'transform, width, right, opacity'
    );

    this.rendererHelper.setManySylesToElement(this.actionWrapper, [
      // TODO: don't animate width, because of performance issues
      { name: 'transform', value: `scaleX(${percent})` },
      { name: 'width', value: `${-this.config.minOffsetX}px` },
      {
        name: 'right',
        value: `-${width}px`
      },
      {
        name: 'opacity',
        value: `${percent}`
      }
    ]);

    this.rendererHelper.setManySylesToElement(this.actionIcon, [
      {
        name: 'transform',
        value: `scale(${1 + percent})`
      }
    ]);
  }

  initActionWrapper() {
    console.log('initActionWrapper');

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'position',
      'relative'
    );

    this.actionWrapper = this.renderer.createElement('div');

    this.renderer.addClass(this.actionWrapper, 'swipe-action-wrapper');

    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.actionWrapper
    );
  }

  reInitActionWrapper() {
    if (this.actionWrapper) {
      this.removeActionWrapper();
    }
    this.initActionWrapper();
  }

  initActionIcon(text: string) {
    console.log('initActionIcon');

    this.actionIcon = this.renderer.createElement('mat-icon');
    this.actionIconText = this.renderer.createText(text);
    this.rendererHelper.setManyClassesToElement(this.actionIcon, [
      'mat-icon',
      'material-icons'
    ]);

    this.renderer.appendChild(this.actionIcon, this.actionIconText);
    if (this.actionWrapper) {
      this.renderer.appendChild(this.actionWrapper, this.actionIcon);
    }
  }

  reInitActionIcon(text: string) {
    console.log('reInitActionIcon');

    if (this.actionIcon) {
      this.removeActionIcon();
    }
    this.initActionIcon(text);
  }

  updateElementTranslateX(x) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `translate3d(${x}px, 0, 0)`
    );
  }

  removeActionWrapper() {
    console.log('removeActionWrapper');
    const { transitionTime } = this.config;
    this.setTransition(this.actionWrapper, true);
    if (this.actionWrapper) {
      setTimeout(() => {
        console.log('removing');
        this.renderer.removeChild(
          this.elementRef.nativeElement,
          this.actionWrapper
        );
        this.actionWrapper = null;
      }, transitionTime);
    }
  }

  removeActionIcon() {
    console.log('removeActionIcon');

    if (this.actionIcon) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.actionIcon);
      this.actionIcon = null;
    }
  }

  setTransition(element: ElementRef, bool: boolean): void {
    const { transitionTime } = this.config;
    const value = bool ? `all ${transitionTime}ms ease-in-out` : 'none';
    this.renderer.setStyle(element, 'transition', value);
  }
}
