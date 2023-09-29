import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/_models/ingredients';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shoppinglist-edit',
  templateUrl: './shoppinglist-edit.component.html',
  styleUrls: ['./shoppinglist-edit.component.css']
})
export class ShoppinglistEditComponent {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  id!: number;

  constructor(private slService: ShoppingListService, private route: ActivatedRoute,) { }

  ngOnInit() {

    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            id: this.editedItem.id,
            name: this.editedItem.name,
            count: this.editedItem.count,
          })
          this.id = this.editedItem.id;
        }
      );

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    // const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.id, value);
    }
    else {
      this.slService.addIngredient(value);
      console.log(value);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.id, this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
