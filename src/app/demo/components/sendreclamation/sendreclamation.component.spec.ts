import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendreclamationComponent } from './sendReclamation.component';

describe('SendreclamationComponent', () => {
  let component: SendreclamationComponent;
  let fixture: ComponentFixture<SendreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendreclamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
