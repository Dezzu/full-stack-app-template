import {
    Directive,
    ElementRef,
    Renderer2,
    OnInit,
    Input,
    inject,
    booleanAttribute,
    OnDestroy,
    Injector,
    ViewContainerRef,
    NgZone
} from '@angular/core';
import { AuthService } from '@/service/auth.service';
import { Tooltip } from 'primeng/tooltip';

@Directive({
    selector: '[needAdminPermission]'
})
export class NeedAdminPermissionDirective implements OnInit, OnDestroy {
    @Input() tooltipMessage: string = 'Permessi di amministratore richiesti';

    @Input({ transform: booleanAttribute })
    showTooltip: boolean = true;

    private tooltipDirective?: Tooltip;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private authService: AuthService,
        private zone: NgZone,
        private containerRef: ViewContainerRef
    ) {}

    ngOnInit(): void {
        if (!this.authService.isAdmin()) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', true);

            if (this.showTooltip) {
                this.createTooltip();
            }

            this.renderer.addClass(this.elementRef.nativeElement, 'admin-permission-required');
        }
    }

    private createTooltip(): void {
        this.tooltipDirective = new Tooltip(this.zone, this.containerRef);

        this.tooltipDirective.content = this.tooltipMessage;
        this.tooltipDirective.tooltipPosition = 'top';

        this.tooltipDirective.ngOnInit();
    }

    ngOnDestroy(): void {
        if (this.tooltipDirective) {
            this.tooltipDirective.ngOnDestroy();
        }
    }
}
