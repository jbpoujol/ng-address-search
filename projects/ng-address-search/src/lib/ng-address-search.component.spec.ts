import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAddressSearchComponent } from './ng-address-search.component';

describe('NgAddressSearchComponent', () => {
  let component: NgAddressSearchComponent;
  let fixture: ComponentFixture<NgAddressSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgAddressSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
