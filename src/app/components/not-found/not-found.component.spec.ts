import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule para pruebas

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule // Añade RouterTestingModule en las importaciones para simular navegación
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when goHome is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Espía el método navigate del Router
    component.goHome(); // Llama al método
    expect(routerSpy).toHaveBeenCalledWith(['/']); // Verifica que la navegación haya sido correcta
  });
});
