import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUsersHomeComponent } from './system-users-home.component';

describe('SystemUsersHomeComponent', () => {
  let component: SystemUsersHomeComponent;
  let fixture: ComponentFixture<SystemUsersHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUsersHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
