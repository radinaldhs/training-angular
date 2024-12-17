import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPurchaseDrawerComponent } from './pokemon-purchase-drawer.component';

describe('PokemonPurchaseDrawerComponent', () => {
  let component: PokemonPurchaseDrawerComponent;
  let fixture: ComponentFixture<PokemonPurchaseDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonPurchaseDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPurchaseDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
