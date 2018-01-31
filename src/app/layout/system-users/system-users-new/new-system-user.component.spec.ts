import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSystemUserComponent } from './new-system-user.component';

describe('NewSystemUserComponent', () => {
  let component: NewSystemUserComponent;
  let fixture: ComponentFixture<NewSystemUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSystemUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
