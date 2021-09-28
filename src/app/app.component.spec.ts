import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './Shared/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

class MockAuthService extends AuthenticationService {
  toLogOut(): void {
    sessionStorage.removeItem('auth');
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],

      providers: [
       MockAuthService
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'final-assesment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('final-assesment');
  });

  it('should render Portal Name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('ADM VAX Portal');
  });

  it('should call function logOut(), when Logout button is clicked', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance ;
    const btn = fixture.debugElement.nativeElement.querySelector('.btn');

    spyOn(component, 'logOut');
    btn.click();

    tick();

    expect(component.logOut).toHaveBeenCalled();

  }));
  it('should call function toLogOut(), when Logout button is clicked', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance ;
    const btn = fixture.debugElement.nativeElement.querySelector('.btn');
    const service = fixture.debugElement.injector.get(AuthenticationService);

    spyOn(service, 'toLogOut');
    btn.click();

    tick();

    expect(service.toLogOut).toHaveBeenCalled();

  }));
});
