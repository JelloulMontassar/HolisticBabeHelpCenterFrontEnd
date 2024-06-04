import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CommonModule} from "@angular/common";
import {FileUploadEvent} from "primeng/fileupload";

@Component({
  selector: 'app-sendreclamation',
  templateUrl: './sendreclamation.component.html',
  styleUrl: './sendreclamation.component.scss'
})
export class SendreclamationComponent {
    statusOptions = [
        { label: 'Not urgent', value: 'Not urgent' },
        { label: 'Urgent', value: 'Urgent' },
        // Add more options as needed
    ];

    status = { value: null };
    description = { value: '' };
    selectedFile: File | null = null;

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        console.log('File selected:', this.selectedFile);
        // Additional file handling logic here
    }

    onSubmit() {
        const formData = {
            status: this.status.value,
            description: this.description.value,
            screenshot: this.selectedFile
        };
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    }

    onUpload($event: FileUploadEvent) {

    }
}
