import { Ingredient } from "./ingredients"


export interface Recipe {
    id: number,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
}
