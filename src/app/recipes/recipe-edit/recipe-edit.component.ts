import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Recipe } from 'src/app/_models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  recipeForm!: FormGroup;
  id: number | any;
  private recipe!: Recipe

  //recipe: Recipe | any;
  constructor(private recipeService: RecipeService, private toastr: ToastrService,
    private route: ActivatedRoute,
    private datastorage: DataStorageService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.loadRecipe();
      this.initForm();
    });

    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    // this.editMode = this.id != null;
    // this.loadRecipe();
    // this.initForm();
  }

  loadRecipe() {
    if (!this.recipe?.id) return;
    this.recipeService.getRecipe(this.recipe.id).subscribe({
      next: recipe => this.recipe = recipe,
    })
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.editMode = id != null;
    console.log(this.recipe)
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value).subscribe({
        next: recipe => this.recipe = recipe,

      });
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // .subscribe({
      //   next: recipe => this.recipe = recipe,

      // });
    }
    this.datastorage.storeRecipes();
    console.log(this.recipe);
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        count: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  private initForm() {
    let recipeId = null;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipeService.getRecipe(this.id)
        .subscribe(
          (responce: Recipe) => {
            this.recipe = responce
            console.log(this.recipe)
            recipeId = this.recipe.id;
            recipeName = this.recipe.name;
            recipeImagePath = this.recipe.imagePath;
            recipeDescription = this.recipe.description;
            if (this.recipe['ingredients']) {
              for (let ingredient of this.recipe.ingredients) {
                (<FormArray><any>recipeIngredients).push(
                  new FormGroup({
                    name: new FormControl(ingredient.name, Validators.required),
                    count: new FormControl(ingredient.count, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
                  })
                );
              }
            }
            this.recipeForm = new FormGroup({
              id: new FormControl(recipeId),
              name: new FormControl(recipeName, Validators.required),
              imagePath: new FormControl(recipeImagePath, Validators.required),
              description: new FormControl(recipeDescription, Validators.required),
              ingredients: recipeIngredients
            });
          }
        );


    }
    this.recipeForm = new FormGroup({
      id: new FormControl(recipeId),
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  getingredient() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
