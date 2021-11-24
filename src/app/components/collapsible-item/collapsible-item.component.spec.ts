import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleItemComponent } from './collapsible-item.component';

describe('CollapsibleItemComponent', () => {
  let component: CollapsibleItemComponent;
  let fixture: ComponentFixture<CollapsibleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsibleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
