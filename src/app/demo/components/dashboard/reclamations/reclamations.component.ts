import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../api/product";
import {Table} from "primeng/table";
import {ReclamationService} from "./reclamtions.service";
import {Router} from "@angular/router";


@Component({
    templateUrl: './reclamations.component.html',
})
export class ReclamationsComponent implements OnInit {

    reclamations: any[] = [];
    statuses: any[] = [];
    products: Product[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private reclamationService:ReclamationService, private router: Router) { }

    ngOnInit() {
        this.fetchReclamations()
    }
    fetchReclamations(){
        this.reclamationService.getReclamations().subscribe(reclamations => {
            this.reclamations = reclamations;
            this.loading = false;
        });
    }







    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    viewReclamation(id) {
        this.router.navigate(['/admin/reclamations/', id]);

    }
}
