import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Observable, of } from 'rxjs';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { PlanetComponent } from './planet.component';
import { Planet } from 'app/planet';
import { PlanetsService } from '../planets.service';

class MockedPlanetsService {

  getPlanets(): Observable<Planet[]> {
    return of([]);
  }

  getPlanet(id: String): Observable<Planet> {
    return of({ name: '' } as Planet);
  }

}

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PlanetComponent],
      imports: [RouterTestingModule, ApolloTestingModule],
      providers: [
        { provides: PlanetsService, useClass: MockedPlanetsService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});