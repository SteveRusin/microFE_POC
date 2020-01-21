import { TestBed, async } from '@angular/core/testing';
import { SubAppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SubAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sub-app'`, () => {
    const fixture = TestBed.createComponent(SubAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('sub-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SubAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('sub-app app is running!');
  });
});
