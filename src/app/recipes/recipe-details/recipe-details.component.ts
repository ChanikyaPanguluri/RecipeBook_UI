import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeService.getRecipe(this.id).subscribe({
            next: value => this.recipe = value
          });
        }
      );
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id, 0);
    this.router.navigate(['/recipes']);
  }
}
