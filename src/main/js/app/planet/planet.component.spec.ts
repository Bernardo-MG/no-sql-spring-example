import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlanetComponent } from './planet.component';
import { Planet } from 'app/planet';

class MockedPlanetService {

  getPlanets(): Observable<Planet[]> {
    return of([]);
  }

  getPlanet(id: String): Observable<Planet> {
    return of(undefined);
  }

}

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;
  let service: MockedPlanetService;

  beforeEach(async(() => {
    service = new MockedPlanetService();
    TestBed.configureTestingModule({
      declarations: [PlanetComponent],
      imports: [HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});