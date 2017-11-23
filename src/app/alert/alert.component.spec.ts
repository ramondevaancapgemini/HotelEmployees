import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from '../service/alert.service';
import { AlertType } from '../model/AlertType';
import { Alert } from '../model/Alert';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      providers: [AlertService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when requesting a css class', () => {
    it('should return nothing if no alert given', () => {
      expect(component.cssClass(undefined)).toBeUndefined();
    });
    it('should return the correct class', () => {
      const alert = { type: AlertType.Error, message: 'test' };
      expect(component.cssClass(alert)).toBe('alert alert-danger');
    });
  });

  describe('when the array of alerts', () => {
    it('is initialized it should be empty', () => {
      expect(component.alerts.length).toBe(0);
    });
    describe('contains a new alert', () => {
      let alert;
      beforeEach(() => {
        alert = { type: AlertType.Error, message: 'test' };
        component.alerts.push(alert);
      });
      it('the size should be 1', () => {
        expect(component.alerts.length).toBe(1);
      });
      it('the size should be 1 after removing another alert', () => {
        const anotherAlert = { type: AlertType.Warning, message: 'test2' };
        component.removeAlert(anotherAlert);
        expect(component.alerts.length).toBe(1);
      });
      it('the size should be 0 after removing the alert', () => {
        component.removeAlert(alert);
        expect(component.alerts.length).toBe(0);
      });
    });
  });

});
