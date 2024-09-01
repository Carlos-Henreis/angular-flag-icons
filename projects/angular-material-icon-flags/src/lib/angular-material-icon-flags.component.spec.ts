import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialIconFlagsComponent } from './angular-material-icon-flags.component';

describe('AngularMaterialIconFlagsComponent', () => {
  let component: AngularMaterialIconFlagsComponent;
  let fixture: ComponentFixture<AngularMaterialIconFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMaterialIconFlagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularMaterialIconFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
