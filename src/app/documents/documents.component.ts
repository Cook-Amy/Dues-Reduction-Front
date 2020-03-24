import { Observable } from 'rxjs';
import { FileService } from './../shared/files/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  public displayLoader: Observable<boolean> = this.fileService.isLoading();

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

}
