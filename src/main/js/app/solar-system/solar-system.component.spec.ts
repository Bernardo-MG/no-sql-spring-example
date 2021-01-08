import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SolarSystemComponent } from './solar-system.component';
import { Planet } from 'app/planet';

class MockedPlanetService {

  getPlanets(): Observable<Planet[]> {
    return of([]);
  }

  getPlanet(id: String): Observable<Planet> {
    return of(undefined);
  }

}

describe('SolarSystemComponent', () => {
  let component: SolarSystemComponent;
  let fixture: ComponentFixture<SolarSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolarSystemComponent],
      imports: [HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});