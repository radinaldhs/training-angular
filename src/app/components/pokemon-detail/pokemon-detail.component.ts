import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', [animate('0.5s ease-in-out')]),
    ]),
  ],
  standalone: false,
})
export class PokemonDetailComponent {
  @Input() pokemon: any = null;
  @Input() theme: 'light' | 'dark' = 'light';

  evolutionChain: any[] = [];
  currentEvolutionIndex: number = 0;

  constructor(private pokemonService: PokemonService) {}

  async ngOnChanges() {
    if (this.pokemon) {
      const species = await this.pokemonService.getPokemonSpecies(
        this.pokemon.name
      );
      const evolutionChainUrl = species.evolution_chain.url;
      this.evolutionChain = await this.pokemonService.getPokemonEvolutionChain(
        evolutionChainUrl
      );

      this.currentEvolutionIndex = this.evolutionChain.findIndex(
        (evo) => evo.name === this.pokemon.name
      );
    }
  }

  async evolve() {
    if (this.currentEvolutionIndex < this.evolutionChain.length - 1) {
      this.currentEvolutionIndex++;
      const nextEvolution = this.evolutionChain[this.currentEvolutionIndex];
      this.pokemon = await this.pokemonService.getPokemonByName(
        nextEvolution.name
      );
    }
  }

  async devolve() {
    if (this.currentEvolutionIndex > 0) {
      this.currentEvolutionIndex--;
      const previousEvolution = this.evolutionChain[this.currentEvolutionIndex];
      this.pokemon = await this.pokemonService.getPokemonByName(
        previousEvolution.name
      );
    }
  }
}
