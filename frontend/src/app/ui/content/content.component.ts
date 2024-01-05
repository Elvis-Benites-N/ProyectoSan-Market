import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/internal/operators/filter';
import { fadeIn } from 'src/app/app.route-animation';
import { CarritoManager } from 'src/app/core/controllers/managers/carrito/carrito.manager';
// import { ContentHandler } from './content.handler';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeIn],
})
export class ContentPage implements OnInit, OnDestroy {

  public cargandoRuta = true;

  private scrollSub?: Subscription;
  private routeChangeSub: Subscription;

  constructor(
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
    private readonly carritoManager: CarritoManager,
  ) {
    this.routeChangeSub = this.router.events
      .pipe(
        filter(
          (evento) =>
            evento instanceof NavigationStart || evento instanceof NavigationEnd
        )
      )
      .subscribe(
        (evento) => (this.cargandoRuta = evento instanceof NavigationStart)
      );
  }

  ngOnInit(): void { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.carritoManager.closeCarrito();
    this.scrollSub?.unsubscribe();
    this.routeChangeSub?.unsubscribe();
  }

}
