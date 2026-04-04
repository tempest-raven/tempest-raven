import {
  Component,
  Directive,
  ElementRef,
  OnDestroy,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
import { TooltipService } from './tooltip.service';

export interface TooltipContext<T> {
  $implicit: T;
}
@Directive({
  selector: '[appTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter($event)',
    '(mousemove)':  'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
    '(touchstart)': 'onTouchStart($event)',
  },
})
export class TooltipDirective<T> implements OnDestroy {
  readonly appTooltip      = input.required<TemplateRef<TooltipContext<T>>>();
  readonly tooltipData  = input<T | null>(null);
  readonly tooltipDisabled = input(false);

  private readonly el      = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly service = inject(TooltipService);

  private readonly isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // ─── Mouse events (desktop) ──────────────────────────────────────────

  onMouseEnter(event: MouseEvent): void {
    if (this.tooltipDisabled() || this.isTouchDevice) return;
    this.service.show({
      content:    this.appTooltip(),
      context:    { $implicit: this.tooltipData()},
      x:          event.clientX,
      y:          event.clientY,
      anchorHref: this.anchorHref,
    });
  }

  onMouseMove(event: MouseEvent): void {
    if (this.tooltipDisabled() || this.isTouchDevice) return;
    this.service.move(event.clientX, event.clientY);
  }

  onMouseLeave(): void {
    if (this.isTouchDevice) return;
    this.service.hide();
  }

  // ─── Touch events (mobile) ─────────────────────────────────────────

  onTouchStart(event: TouchEvent): void {
    if (this.tooltipDisabled()) return;
    // Prevent immediate navigation on links
    if (this.anchorHref) event.preventDefault();
    const touch = event.touches[0];
    this.service.show({
      content:    this.appTooltip(),
      context:    { $implicit: this.tooltipData()},
      x:          touch.clientX,
      y:          touch.clientY,
      anchorHref: this.anchorHref,
    });
  }

  ngOnDestroy(): void {
    this.service.hide();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private get anchorHref(): string | null {
    const host = this.el.nativeElement;
    
    if (host.tagName === 'A') return (host as HTMLAnchorElement).href || null;
    return host.closest('a')?.href ?? null;
  }
}
