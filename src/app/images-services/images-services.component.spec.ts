import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesServicesComponent } from './images-services.component';

describe('ImagesServicesComponent', () => {
  let component: ImagesServicesComponent;
  let fixture: ComponentFixture<ImagesServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
