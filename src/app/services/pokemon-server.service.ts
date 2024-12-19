import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private serverApiUrl = 'http://localhost:4001'; // Server-side API base URL

  constructor(private http: HttpClient) {
    console.log('PokemonService: Constructor called');
  }

  async getPokemonTypes(): Promise<string[]> {
    const response = await firstValueFrom(
      this.http.get<string[]>(`${this.serverApiUrl}/get-types`)
    );
    return response;
  }

  async getPokemonList(limit: number = 20): Promise<any[]> {
    const response = await firstValueFrom(
      this.http.get<any[]>(`${this.serverApiUrl}/get-list?limit=${limit}`)
    );
    return response;
  }

  async getPokemonDetails(url: string): Promise<any> {
    const response = await firstValueFrom(
      this.http.post<any>(`${this.serverApiUrl}/get-details`, { url })
    );
    return response;
  }

  async getPokemonByName(name: string): Promise<any> {
    const response = await firstValueFrom(
      this.http.get<any>(`${this.serverApiUrl}/get-pokemon/${name}`)
    );
    return response;
  }

  async getPokemonSpecies(name: string): Promise<any> {
    const response = await firstValueFrom(
      this.http.get<any>(`${this.serverApiUrl}/get-species/${name}`)
    );
    return response;
  }

  async getPokemonEvolutionChain(url: string): Promise<any[]> {
    const response = await firstValueFrom(
      this.http.post<any[]>(`${this.serverApiUrl}/get-evolution-chain`, { url })
    );
    return response;
  }
}
