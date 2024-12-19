import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { addToCart } from '../../state/cart/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
  styleUrls: ['./pokemon-detail-page.component.css'],
  standalone: false,
})
export class PokemonDetailPageComponent implements OnInit {
  pokemon: any = null;
  evolutionChain: any[] = [];
  currentEvolutionIndex: number = 0;
  pokemonCryUrl: string | null = null;
  isDrawerOpen: boolean = false;
  showSuccessModal: boolean = false;
  isFrontSprite: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
    private store: Store
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const name = params.get('name');
      if (name) {
        await this.loadPokemonDetails(name);
      }
    });

    setInterval(() => {
      this.isFrontSprite = !this.isFrontSprite;
    }, 2000);
  }

  private async loadPokemonDetails(name: string): Promise<void> {
    try {
      this.pokemon = await this.pokemonService.getPokemonByName(name);

      if (this.pokemon) {
        const species = await this.pokemonService.getPokemonSpecies(
          this.pokemon.name
        );
        const evolutionChainUrl = species.evolution_chain.url;

        const [evolutionChain] = await Promise.all([
          this.pokemonService.getPokemonEvolutionChain(evolutionChainUrl),
        ]);

        this.evolutionChain = evolutionChain;
        this.currentEvolutionIndex = this.evolutionChain.findIndex(
          (evo) => evo.name === this.pokemon.name
        );

        if (this.pokemon.cries && this.pokemon.cries.latest) {
          this.pokemonCryUrl = this.pokemon.cries.latest;
        } else {
          this.pokemonCryUrl = null;
        }
      }
    } catch (error) {
      console.error('Error loading Pokémon details:', error);
    }
  }

  playPokemonCry(): void {
    if (!this.pokemonCryUrl) {
      console.error('No cry available for this Pokémon.');
      return;
    }

    const audio = new Audio(this.pokemonCryUrl);
    audio.play().catch((error) => {
      console.error('Error playing Pokémon cry:', error);
    });
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  openSuccessModal(): void {
    this.showSuccessModal = true;
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  navigateToSubmission(): void {
    this.router.navigate(['/submission']);
  }

  addToCart(pokemon: any): void {
    const cartItem = { pokemon, quantity: 1 };
    alert(`Pokemon ${cartItem.pokemon.name} has been added to your cart!`);
    this.store.dispatch(addToCart(cartItem));
  }
}
