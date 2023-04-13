import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsDetailsComponent } from './locations-details.component';

describe('LocationsComponent', () => {
  let component: LocationsDetailsComponent;
  let fixture: ComponentFixture<LocationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
