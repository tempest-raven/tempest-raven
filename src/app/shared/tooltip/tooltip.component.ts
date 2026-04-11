import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  afterEveryRender,
  computed,
  inject,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { TooltipService } from "./tooltip.service";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

const CURSOR_OFFSET = 14;
const VIEWPORT_MARGIN = 8;

@Component({
  selector: "app-tooltip",
  standalone: true,
  imports: [NgTemplateOutlet, MatIcon, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./tooltip.component.html",
  styleUrl: "./tooltip.component.scss",
})
export class TooltipComponent {
  protected readonly service = inject(TooltipService);
  protected readonly boxRef = viewChild<ElementRef<HTMLElement>>("box");
  protected readonly left = signal(0);
  protected readonly top = signal(0);

  protected data = computed(() => {
    return this.service.data();
  });

  protected readonly isMobile =
    typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  constructor() {
    afterEveryRender({
      read: () => {
        const box = this.boxRef()?.nativeElement;
        if (!box) return;

        const data = untracked(() => this.service.data());
        if (!data) return;

        const bw = box.offsetWidth;
        const bh = box.offsetHeight;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let x = data.x + CURSOR_OFFSET;
        let y = data.y + CURSOR_OFFSET;

        if (x + bw + VIEWPORT_MARGIN > vw) x = data.x - CURSOR_OFFSET - bw;
        if (y + bh + VIEWPORT_MARGIN > vh) y = data.y - CURSOR_OFFSET - bh;

        x = Math.max(VIEWPORT_MARGIN, x);
        y = Math.max(VIEWPORT_MARGIN, y);

        untracked(() => {
          if (this.left() !== x) this.left.set(x);
          if (this.top() !== y) this.top.set(y);
        });
      },
    });
  }

  protected close(): void {
    this.service.hide();
  }

  protected navigateToLink(): void {
    const href = untracked(() => this.service.data()?.anchorHref);
    if (href) window.open(href, "_self");
    this.close();
  }

  @HostListener("document:keydown.escape")
  protected onEscape(): void {
    this.close();
  }
}
