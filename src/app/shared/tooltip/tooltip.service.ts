import { Injectable, TemplateRef, signal, computed } from '@angular/core';

export interface TooltipData {
  content: TemplateRef<unknown>;
  context?: unknown;
  x: number;
  y: number;
  anchorHref?: string | null;
}

@Injectable({ providedIn: 'root' })
export class TooltipService {
  private readonly _data = signal<TooltipData | null>(null);

  readonly data       = this._data.asReadonly();
  readonly isVisible  = computed(() => this._data() !== null);

  show(data: TooltipData): void {
    this._data.set(data);
  }

  move(x: number, y: number): void {
    const current = this._data();
    if (current !== null && (current.x !== x || current.y !== y)) {
      this._data.set({ ...current, x, y });
      this._data.update((d) => {
        d!.x = x;
        d!.y = y;
        return d!;
      })
    }
  }

  hide(): void {
    this._data.set(null);
  }
}