import {
  Injectable,
  Renderer2,
  RendererFactory2,
  ElementRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendererHelperService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setManySylesToElement(
    element: ElementRef,
    styles: { name: string; value: string }[]
  ) {
    styles.forEach(s => {
      this.renderer.setStyle(element, s.name, s.value);
    });
  }

  setManyClassesToElement(element: ElementRef, classes: string[]) {
    classes.forEach(c => {
      this.renderer.addClass(element, c);
    });
  }
}
