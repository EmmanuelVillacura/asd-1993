import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProfeComponent } from './eliminar-profe.component';

describe('EliminarProfeComponent', () => {
  let component: EliminarProfeComponent;
  let fixture: ComponentFixture<EliminarProfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarProfeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
