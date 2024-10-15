import { ApplicationRef, Component, ComponentRef, createComponent, Directive, ElementRef, HostListener, Input, Type, ViewContainerRef } from '@angular/core';
export type tooltipObj<T> = {
  component: Type<T>,
  data: Partial<T>
}
@Directive({
  selector: '[tooltips]',
  standalone: true
})
export class TooltipDirective<T extends any[]> { 
  @Input({required: true}) tooltips!: {[K in keyof T]: tooltipObj<T[K]>};
  private tooltipEl: HTMLElement;
  private containedComponents!: {[K in keyof T]: ComponentRef<T[K]>};

  posX = 0;
  posY = 0;

  constructor(private el: ElementRef<HTMLElement>, private applicationRef: ApplicationRef) {
    let tooltipEl = document.getElementById("tooltip");
    if (tooltipEl === null){
      tooltipEl = document.createElement("div");
      tooltipEl.id = "tooltip";
      document.body.appendChild(tooltipEl);
    }
    this.tooltipEl = tooltipEl;
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(ev: MouseEvent){
    
    const injector = this.applicationRef.injector;
    let containedComponents = [];
    for (const tooltip of this.tooltips){
      let tmpDiv = document.createElement("div");
      
      let containedComponent = createComponent(tooltip.component, {environmentInjector: injector, hostElement: tmpDiv});
      Object.assign(containedComponent.instance, tooltip.data);
      
      this.applicationRef.attachView(containedComponent.hostView);
      containedComponent.changeDetectorRef.detectChanges();
      containedComponents.push(containedComponent);
      this.tooltipEl.appendChild(tmpDiv);
    }
    this.containedComponents = containedComponents as typeof this.containedComponents;
    ev.stopPropagation();
    ev.preventDefault();
  }

  @HostListener('click')
  @HostListener('mouseleave') onMouseLeave(){
    this.containedComponents.forEach(containedComponent => {
      containedComponent.changeDetectorRef.detach()
      this.applicationRef.detachView(containedComponent.hostView);
      containedComponent.destroy();
    })
    this.hideTooltip();
    while (this.tooltipEl.lastChild){
      this.tooltipEl.removeChild(this.tooltipEl.lastChild);
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(ev: MouseEvent){
    const mouseX = ev.clientX;
    const mouseY = ev.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const tooltipSize = this.tooltipEl.getBoundingClientRect();
    const tooltipWidth = tooltipSize.width;
    const tooltipHeight = tooltipSize.height;
    if (tooltipWidth === 0 || tooltipHeight === 0){
      requestAnimationFrame(_ => this.onMouseMove(ev));
      return;
    }
    if (mouseX + tooltipWidth + 10 < windowWidth){
        this.tooltipEl.style.left = mouseX + 10 + "px";
        this.tooltipEl.style.right = "";
    } else {
        this.tooltipEl.style.left = "";
        this.tooltipEl.style.right = windowWidth - Math.max(mouseX - 10, tooltipWidth) + "px";
    }

    if (mouseY + tooltipHeight + 10 < windowHeight){
        this.tooltipEl.style.top = mouseY + 10 + "px";
        this.tooltipEl.style.bottom = "";
    } else {
        this.tooltipEl.style.top = "";
        this.tooltipEl.style.bottom = windowHeight - Math.max(mouseY - 10, tooltipHeight) + "px";
    }
    this.showTooltip();
  }

  /**
   * Show the tooltip into view
   */
  showTooltip() {
    this.tooltipEl.style.visibility = "";
  }

  /** 
   * Hide the tooltip from view
   */
  hideTooltip() {
    /**
     * We use `visibility: hidden` and not `display: none` because 
     * `.getBoundingClientRect()` would return a width and height of 0
     */
    this.tooltipEl.style.visibility = "hidden";
  }

}
