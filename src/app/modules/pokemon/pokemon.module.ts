import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonDetailPageComponent } from '../../components/pokemon-detail-page/pokemon-detail-page.component';
import { PokemonDetailComponent } from '../../components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonPurchaseDrawerComponent } from '../../components/pokemon-purchase-drawer/pokemon-purchase-drawer.component';
import { PurchaseSuccessModalComponent } from '../../components/purchase-success-modal/purchase-success-modal.component';
import { PokemonRoutingModule } from '../../routing/pokemon-routing.module';

@NgModule({
  declarations: [
    PokemonDetailPageComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PurchaseSuccessModalComponent,
    PokemonPurchaseDrawerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PokemonRoutingModule,
  ],
})
export class PokemonModule {}
