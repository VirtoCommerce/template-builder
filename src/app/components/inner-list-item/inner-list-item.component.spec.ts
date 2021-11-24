import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerListItemComponent } from './inner-list-item.component';

describe('InnerListItemComponent', () => {
  let component: InnerListItemComponent;
  let fixture: ComponentFixture<InnerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
