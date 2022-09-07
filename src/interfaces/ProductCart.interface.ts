import type { ProductInterface } from "./product.interface";
//Déclaration d'une nouvelle interface qui herite de toutes les caractéristiiques de productInterface plus la notion de quantité
export interface ProductCartInterface extends ProductInterface {
quantity: number;
}