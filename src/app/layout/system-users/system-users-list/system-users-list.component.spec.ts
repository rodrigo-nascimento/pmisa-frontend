import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUsersListComponent } from './system-users-list.component';

describe('SystemUsersListComponent', () => {
  let component: SystemUsersListComponent;
  let fixture: ComponentFixture<SystemUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
