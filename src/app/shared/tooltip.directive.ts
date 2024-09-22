import { ApplicationRef, Component, ComponentRef, createComponent, Directive, ElementRef, HostListener, Input, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective<T extends typeof Component> {
  @Input({required: true}) tooltip!: Type<T>;
  @Input() tooltipData: Partial<T> = {};
  private tooltipEl: HTMLElement;
  private containedComponent!: ComponentRef<T>;

  posX = 0;
  posY = 0;

  constructor(private el: ElementRef<HTMLElement>, private applicationRef: ApplicationRef) {
    let tooltipEl = document.getElementById("tooltip");
    if (tooltipEl === null){
      tooltipEl = document.createElement("div");
      tooltipEl.id = "tooltip";
      tooltipEl.classList.add("hidden");
      document.body.appendChild(tooltipEl);
    }
    this.tooltipEl = tooltipEl;
    console.log("constructed");
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.tooltipEl.textContent = "Loading...";
    this.tooltipEl.classList.remove("hidden");
    const injector = this.applicationRef.injector;
    this.containedComponent = createComponent(this.tooltip, {environmentInjector: injector, hostElement: this.tooltipEl});
    Object.assign(this.containedComponent.instance, this.tooltipData);
    
    this.applicationRef.attachView(this.containedComponent.hostView);
    this.containedComponent.changeDetectorRef.detectChanges();
  }
  @HostListener('click')
  @HostListener('mouseleave') onMouseLeave(){
    //this.containedComponent.changeDetectorRef.detach()
    //this.applicationRef.detachView(this.containedComponent.hostView);
    //this.containedComponent.destroy();
    this.tooltipEl.classList.add("hidden");
  }

  @HostListener('mousemove', ['$event']) onMouseMove(ev: MouseEvent){
    const x = ev.clientX;
    const y = ev.clientY;
    //console.log(x, y);
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (x / windowWidth < 0.8){
        this.tooltipEl.style.left = x + 10 + "px";
        this.tooltipEl.style.right = "";
    } else {
        this.tooltipEl.style.left = "";
        this.tooltipEl.style.right = windowWidth - (x + 10) + "px";
    }

    if (y / windowHeight < 0.8){
        this.tooltipEl.style.top = y + 10 + "px";
        this.tooltipEl.style.bottom = "";
    } else {
        this.tooltipEl.style.top = "";
        this.tooltipEl.style.bottom = windowHeight - (y + 10) + "px";
    }
  }

  /*private highlight(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }*/

}
