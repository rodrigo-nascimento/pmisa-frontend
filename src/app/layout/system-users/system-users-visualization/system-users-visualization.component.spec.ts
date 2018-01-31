import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUsersVisualizationComponent } from './system-users-visualization.component';

describe('SystemUsersVisualizationComponent', () => {
  let component: SystemUsersVisualizationComponent;
  let fixture: ComponentFixture<SystemUsersVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUsersVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
