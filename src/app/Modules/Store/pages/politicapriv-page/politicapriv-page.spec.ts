import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaprivPage } from './politicapriv-page';

describe('PoliticaprivPage', () => {
  let component: PoliticaprivPage;
  let fixture: ComponentFixture<PoliticaprivPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticaprivPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PoliticaprivPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
