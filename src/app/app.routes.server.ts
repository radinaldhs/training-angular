import { RenderMode, ServerRoute } from '@angular/ssr';
import axios from 'axios';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemon',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'submission',
    renderMode: RenderMode.Prerender,
  },
  // Dynamic Pokémon details route
  {
    path: 'pokemon/pokemon-detail/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        // Fetch Pokémon names from the API
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        const pokemonNames = response.data.results.map(
          (pokemon: any) => pokemon.name
        );
        return pokemonNames.map((name: string) => ({ name }));
      } catch (error) {
        console.error('Error fetching Pokémon names:', error);
        return [];
      }
    },
  },
  // Dynamic submission edit route
  {
    path: 'submission/edit-form-submission/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        // Replace with your backend endpoint for fetching submission IDs
        const response = await axios.get('https://example.com/api/submissions');
        const submissionIds = response.data.map(
          (submission: any) => submission.id
        );
        return submissionIds.map((id: any) => ({ id }));
      } catch (error) {
        console.error('Error fetching submission IDs:', error);
        return [];
      }
    },
  },
  // Fallback to server-side rendering for other routes
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
