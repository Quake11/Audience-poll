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
import { swipeActionConfig } from './swipe-action.config';

@Directive({
  selector: '[appSwipeAction]'
})
export class SwipeActionDirective implements OnInit {
  @Output() swipeAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() swipeActionConfig;

  private _currentOffsetX = 0;
  private _isDeleting: boolean; // true if gonna emit delete event

  config: any = swipeActionConfig;

  deleteActionButton: ElementRef;
  deleteActionIcon: ElementRef;
  deleteActionIconText: ElementRef;

  @HostListener('panstart')
  onPanStart() {
    this.setTransition(false);
  }

  @HostListener('panleft', ['$event'])
  onPanLeft(event) {
    const { deltaX } = event;
    const { minOffsetX } = this.config;

    if (this.isPan(event) || this.currentOffsetX) {
      if (!this.deleteActionButton || !this.deleteActionButton.nativeElement) {
        this.initDeleteActionElement();
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
      // trigger delete event
      this.swipeAction.emit(true);
    }

    this.currentOffsetX = 0;
    this.setTransition(true);
    this.removeActionElements();
  }

  get isDeleting(): boolean {
    return this._isDeleting;
  }

  set isDeleting(val: boolean) {
    this._isDeleting = val;
    if (val) {
      this.initDeleteActionIcon('delete_forever');
      this.renderer.addClass(this.deleteActionIcon, 'active');
    } else {
      this.initDeleteActionIcon('delete');
    }
  }

  get currentOffsetX(): number {
    return this._currentOffsetX;
  }

  set currentOffsetX(val: number) {
    const { minOffsetX, maxOffsetX } = this.config;

    if (val >= minOffsetX && val <= maxOffsetX) {
      this._currentOffsetX = val;
    }

    this.isDeleting = val <= minOffsetX;

    this.updateDeleteActionElementStyles();
    this.updateElementTranslateX(this._currentOffsetX);
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private rendererHelper: RendererHelperService
  ) {}

  ngOnInit() {
    // this.initDeleteActionElement();
  }

  // determine if user really trying pan or just scrolling
  isPan(event) {
    const { deltaX, deltaY } = event;
    const { panThresholdY, panThresholdX } = this.config;

    return Math.abs(deltaY) < panThresholdY && Math.abs(deltaX) > panThresholdX;
  }

  getPanPercent(offsetX: number) {
    const { minOffsetX } = this.config;
    return offsetX / minOffsetX;
  }

  initDeleteActionElement() {
    this.initDeleteActionButton();
    this.initDeleteActionIcon('delete');
  }

  updateDeleteActionElementStyles() {
    const percent = this.getPanPercent(this.currentOffsetX);
    const width = Math.abs(this.currentOffsetX);
    this.rendererHelper.setManySylesToElement(this.deleteActionButton, [
      { name: 'width', value: `${width}px` },
      {
        name: 'right',
        value: `-${width + 16}px`
      },
      {
        name: 'opacity',
        value: `${percent}`
      }
    ]);

    this.rendererHelper.setManySylesToElement(this.deleteActionIcon, [
      {
        name: 'transform',
        value: `scale(${1 + percent})`
      }
    ]);
  }

  initDeleteActionButton() {
    if (this.deleteActionButton) {
      this.removeActionButton();
    }

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'position',
      'relative'
    );

    this.deleteActionButton = this.renderer.createElement('div');

    this.renderer.addClass(this.deleteActionButton, 'swipe-action-button');

    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.deleteActionButton
    );
  }

  initDeleteActionIcon(text: string) {
    if (this.deleteActionIcon) {
      this.removeActionIcon();
    }
    this.deleteActionIcon = this.renderer.createElement('mat-icon');
    this.deleteActionIconText = this.renderer.createText(text);
    this.rendererHelper.setManyClassesToElement(this.deleteActionIcon, [
      'mat-icon',
      'material-icons'
    ]);

    this.renderer.appendChild(this.deleteActionIcon, this.deleteActionIconText);
    this.renderer.appendChild(this.deleteActionButton, this.deleteActionIcon);
  }

  updateElementTranslateX(x) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `translate3d(${x}px, 0, 0)`
    );
  }

  removeActionElements() {
    const { transitionTime } = this.config;
    // remove after transition animation
    setTimeout(() => {
      this.removeActionButton();
      this.removeActionIcon();
    }, transitionTime);
  }
  removeActionButton() {
    this.renderer.removeChild(
      this.elementRef.nativeElement,
      this.deleteActionButton
    );
  }

  removeActionIcon() {
    this.renderer.removeChild(
      this.elementRef.nativeElement,
      this.deleteActionIcon
    );
  }

  setTransition(bool) {
    const { transitionTime } = this.config;
    const value = bool ? `${transitionTime}ms ease-out` : 'none';
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', value);
  }
}
