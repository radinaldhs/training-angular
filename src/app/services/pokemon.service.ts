// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private apiSpeciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor() {
    console.log('PokemonService: Constructor called');
  }

  async getPokemonTypes(): Promise<string[]> {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    return response.data.results.map((type: any) => type.name);
  }

  async getPokemonList(limit: number = 20) {
    const response = await axios.get(`${this.apiUrl}?limit=${limit}`);
    return response.data.results;
  }

  async getPokemonDetails(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async getPokemonByName(name: string) {
    const response = await axios.get(`${this.apiUrl}/${name}`);
    return response.data;
  }

  async getPokemonSpecies(name: string) {
    const response = await axios.get(`${this.apiSpeciesUrl}/${name}`);
    return response.data;
  }

  async getPokemonEvolutionChain(url: string) {
    const response = await axios.get(url);
    const chain = response.data.chain;

    const evolutions = this.parseEvolutionChain(chain);
    const detailedEvolutions = await Promise.all(
      evolutions.map(async (evo) => {
        const details = await this.getPokemonByName(evo.name);
        return {
          ...evo,
          sprites: details.sprites,
        };
      })
    );

    return detailedEvolutions;
  }

  parseEvolutionChain(chain: any) {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        url: current.species.url,
      });
      current = current.evolves_to[0];
    }

    return evolutions;
  }
}
