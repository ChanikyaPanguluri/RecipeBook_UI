import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipesComponent } from "./recipes/recipes.component";

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipeDetailsComponent
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent
            }
        ]
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {

}