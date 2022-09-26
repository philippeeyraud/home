export type Category = 'art contemporain' | 'classique' | 'art singulier'|'all';

export interface FiltersInterface {
    search: string;
    priceRange: [number, number];
    category: Category
}
export interface FilterUpdate {
    search?: string;
    priceRange?: [number, number];
    category?: Category
}