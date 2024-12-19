export interface CartItem {
  pokemon: any; // Replace `any` with a specific type if you have a defined Pokémon model
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};
