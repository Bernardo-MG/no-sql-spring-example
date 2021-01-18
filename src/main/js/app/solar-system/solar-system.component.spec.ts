import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { SolarSystemComponent } from './solar-system.component';
import { Planet } from 'app/planet';
import { PlanetsService } from '../planets.service';

class MockedPlanetsService {

  getPlanets(): Observable<Planet[]> {
    return of([]);
  }

  getPlanet(id: String): Observable<Planet> {
    return of({} as Planet);
  }

}

describe('SolarSystemComponent', () => {
  let component: SolarSystemComponent;
  let fixture: ComponentFixture<SolarSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolarSystemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provides: PlanetsService, useClass: MockedPlanetsService }
      ]
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