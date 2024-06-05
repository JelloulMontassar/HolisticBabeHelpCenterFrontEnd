import { Component } from '@angular/core';
import { FileUploadEvent } from 'primeng/fileupload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sendreclamation',
    templateUrl: './sendreclamation.component.html',
    styleUrls: ['./sendreclamation.component.scss']
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
    screenshotBase64: string | null = null;

    constructor(private http: HttpClient) {}

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            this.convertFileToBase64(this.selectedFile);
        }
        console.log('File selected:', this.selectedFile);
    }

    convertFileToBase64(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1]; // Strip the prefix
            this.screenshotBase64 = base64String;
            console.log('Base64 String:', this.screenshotBase64);
        };
        reader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
        };
    }

    onSubmit() {
        if (!this.status.value || !this.description.value || !this.screenshotBase64) {
            Swal.fire({
                title: 'Error',
                text: 'All fields are required!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = {
            status: this.status.value,
            description: this.description.value,
            screenshot: this.screenshotBase64
        };

        const accessToken = localStorage.getItem("accessToken");
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

        this.http.post('http://localhost:8080/reclamations/create/', formData, { headers })
            .subscribe(response => {
                Swal.fire({
                    title: 'Success',
                    text: 'Form submitted successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                console.log('Form submitted successfully', response);
            }, error => {
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error submitting the form',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error('Error submitting form', error);
            });
    }
}
