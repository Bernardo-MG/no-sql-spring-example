import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SolarSystemComponent } from './solar-system.component';
import { Planet } from 'app/planet';
import { PlanetsService } from 'app/planets.service';

class MockedPlanetService extends PlanetsService {

  getPlanets(): Observable<Planet[]> {
    return of([]);
  }

}

describe('SolarSystemComponent', () => {
  let component: SolarSystemComponent;
  let fixture: ComponentFixture<SolarSystemComponent>;
  let service: MockedPlanetService;

  beforeEach(async(() => {
    service = new MockedPlanetService();
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
