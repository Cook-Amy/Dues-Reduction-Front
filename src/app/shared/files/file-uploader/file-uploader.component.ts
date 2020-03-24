import { VenueService } from './../../../venues/venue.service';
import { FileService } from './../file.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  currentVenueID: number; 

  public fileUploadForm = this.fb.group({
    file: [null, Validators.required]
  });

  private fileName;

  constructor(private fb: FormBuilder,
              private fileService: FileService,
              private venueService: VenueService) { }

  ngOnInit() {
    this.currentVenueID = this.venueService.getCurrentVenue().idvenue;
    console.log("current Venue ID: " + this.currentVenueID);
  }

  public onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileUploadForm.patchValue({
          file: reader.result
        });
      };
    }
  }

  public onSubmit(): void {
    if(this.currentVenueID == 1) {
      console.log("file being uploaded");
      this.fileService.uploadPnc(this.fileName, this.fileUploadForm.get('file').value);
    }
    else if(this.currentVenueID == 2) {
      this.fileService.uploadWc(this.fileName, this.fileUploadForm.get('file').value);
    }
    else if(this.currentVenueID == 3) {
      this.fileService.uploadCf(this.fileName, this.fileUploadForm.get('file').value);
    }
    if(this.currentVenueID == 99) {
      this.fileService.uploadAdmin(this.fileName, this.fileUploadForm.get('file').value);
    }
  }

}

