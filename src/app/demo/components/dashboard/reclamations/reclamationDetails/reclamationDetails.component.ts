import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ReclamationService} from "../reclamtions.service";
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
@Component({
    templateUrl: './reclamationDetails.component.html',
})
export class ReclamationDetailsComponent implements OnInit {

    reclamation: any;
    statuses: any[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private route: ActivatedRoute,private reclamationService:ReclamationService) { }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('reclamationId');

        this.fetchReclamation(id)
    }
    fetchReclamation(id:string){
        this.reclamationService.getReclamation(id).subscribe(reclamation => {
            this.reclamation = reclamation;
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

    resolveReclamation(id) {
        this.reclamationService.resolveReclamation(id).subscribe(reclamation => {
            this.reclamation = reclamation;
            this.loading = false;
            Swal.fire({
                toast: true,
                showConfirmButton: false,
                timer: 5000,
                position: "top-right",
                text: "Reclamation resolved successfully",
                icon: 'success'
            });
        });
    }
}
