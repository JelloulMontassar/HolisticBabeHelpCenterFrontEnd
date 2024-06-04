import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../services/forum.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    categories: any[] = [];
    loading: boolean = true;
    displayModal: boolean = false;
    dialogHeader: string = '';
    selectedCategory: any | null = null;
    categoryForm: FormGroup;

    constructor(private forumService: ForumService, private fb: FormBuilder) {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.forumService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.loading = false;
        });
    }

    clear(table: any) {
        table.clear();
    }

    onGlobalFilter(table: any, event: any) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    addCategory() {
        this.dialogHeader = 'Add Category';
        this.categoryForm.reset();
        this.selectedCategory = null;
        this.displayModal = true;
    }

    viewCategory(categoryId: number) {
        this.dialogHeader = 'Edit Category';
        this.selectedCategory = this.categories.find(c => c.id === categoryId) || null;
        if (this.selectedCategory) {
            this.categoryForm.patchValue(this.selectedCategory);
            this.displayModal = true;
        }
    }

    onSave() {
        if (this.categoryForm.valid) {
            const categoryData = this.categoryForm.value;
            if (this.selectedCategory) {
                const updatedCategory = { ...this.selectedCategory, ...categoryData };
                this.forumService.updateCategory(updatedCategory).subscribe(
                    () => {
                        this.selectedCategory = null;
                        this.displayModal = false;
                        this.refreshCategories();
                        Swal.fire('Success', 'Category updated successfully!', 'success');
                    },
                    (error) => {
                        Swal.fire('Error', 'Failed to update category.', 'error');
                    }
                );
            } else {
                this.forumService.createCategory(categoryData.name).subscribe(
                    () => {
                        this.displayModal = false;
                        this.refreshCategories();
                        Swal.fire('Success', 'Category created successfully!', 'success');
                    },
                    (error) => {
                        Swal.fire('Error', 'Failed to create category.', 'error');
                    }
                );
            }
        }
    }

    refreshCategories() {
        this.forumService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }
}
