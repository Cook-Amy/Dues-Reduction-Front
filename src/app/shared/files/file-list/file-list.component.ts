import { VenueService } from './../../../venues/venue.service';
import { FileService } from './../file.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  currentVenueID: number;

  public fileListPnc$: Observable<string[]> = this.fileService.listPnc();
  public fileListWc$: Observable<string[]> = this.fileService.listWc();
  public fileListCf$: Observable<string[]> = this.fileService.listCf();
  public fileListAdmin$: Observable<string[]> = this.fileService.listAdmin();


  constructor(private fileService: FileService,
              private venueService: VenueService) { }

  ngOnInit() {
    this.currentVenueID = this.venueService.getCurrentVenue().idvenue;
  }

  public download(fileName: string): void {
    if(this.currentVenueID == 1) {
      this.fileService.downloadPnc(fileName);
    }
    else if(this.currentVenueID == 2) {
      this.fileService.downloadWc(fileName);
    }
    else if(this.currentVenueID == 3) {
      this.fileService.downloadCf(fileName);
    }
    else if(this.currentVenueID == 99) {
      this.fileService.downloadAdmin(fileName);
    }
  }

  public remove(fileName: string): void {
    if(this.currentVenueID == 1) {
      this.fileService.removePnc(fileName);
    }
    else if(this.currentVenueID == 2) {
      this.fileService.removeWc(fileName);
    }
    else if(this.currentVenueID == 3) {
      this.fileService.removeCf(fileName);
    }
    else if(this.currentVenueID == 99) {
      this.fileService.removeAdmin(fileName);
    }
  }
}

