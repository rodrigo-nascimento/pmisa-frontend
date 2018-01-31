import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUsersEditComponent } from './system-users-edit.component';

describe('UserEditComponent', () => {
  let component: SystemUsersEditComponent;
  let fixture: ComponentFixture<SystemUsersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUsersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
