import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentService } from './document.service';
import { FileLink } from './../models/fileLink.model';
import { VenueService } from './../venues/venue.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  currentVenueID: number;
  fileList: FileLink[];
  newFileInfo: Boolean = false;
  newFileForm: FormGroup;
  documentNameToDelete: string = "";
  documentIdToDelete: number = 0;
  confirmDeleteMsg = false;

  constructor(private venueService: VenueService,
              private documentService: DocumentService) { }

  ngOnInit() {
    this.currentVenueID = this.venueService.getCurrentVenue().idvenue;
    this.initForm();
    this.documentService.getFileList(this.currentVenueID).subscribe(list => {
      this.fileList = this.sortList(list);
    });
   }

   initForm() {
     let name: string = '';
     let link: string = '';
     let description: string = '';

     this.newFileForm = new FormGroup({
       'name': new FormControl(name, Validators.required),
       'link': new FormControl(link, Validators.required),
       'description': new FormControl(description, Validators.required)
     });
   }

   checkForNull(string) {
    if(string == null)
      return '';
    else  
      return string;
  }

  removeFile(fileID, fileName) {
    this.documentNameToDelete = fileName;
    this.documentIdToDelete = fileID;
    this.confirmDeleteMsg = true;

  }

  onDeleteNo() {
    this.confirmDeleteMsg = false;
  }

  onDeleteYes() {
    this.documentService.removeFile(this.documentIdToDelete, this.currentVenueID).subscribe(list => {
      this.fileList = this.sortList(list);
      this.confirmDeleteMsg = false;
    });
  }

  addNewFile() {
    this.newFileInfo = true;
  }

  onCancel() {
    this.newFileInfo = false;
  }

  onSave() {
    var newFile = new FileLink(
      0,
      this.currentVenueID,
      this.newFileForm.value['name'],
      this.newFileForm.value['link'],
      this.newFileForm.value['description']
    );

    this.documentService.saveFile(newFile).subscribe(list => {
      this.fileList = this.sortList(list);
      this.newFileInfo = false;
      this.initForm();
    });
  }

  sortList(list) {
    if(!list) {list = [];}
    return list.sort((val1, val2) => {
      if(val1.Name < val2.Name) return -1;
      else if(val1.Name > val2.Name) return 1;
      return 0;
    });
  }
}
