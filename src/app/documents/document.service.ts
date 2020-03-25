import { FileLink } from './../models/fileLink.model';
import { GlobalVariables } from './../shared/GlobalVariables';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient) { }

  getFileList(id: number) {
    const params = new HttpParams().set('venueID', id.toString());
    const filesReturned = this.http.get<FileLink[]>(this.serverUrl + 'getFiles', {params});
    return filesReturned;
  }

  removeFile(fileID: number, venueID: number) {
    const params = {fileID: fileID, venueID: venueID};
    const removeFile = this.http.post<FileLink[]>(this.serverUrl + 'removeFile', params);
    return removeFile;
  }

  saveFile(file: FileLink) {
    const params = {file: file};
    const saveFile = this.http.post<FileLink[]>(this.serverUrl + 'saveFile', params);
    return saveFile;
  }
}
