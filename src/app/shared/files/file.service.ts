import { GlobalVariables } from './../GlobalVariables';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  serverUrl = GlobalVariables.serverUrl;

  private fileListPnc: string[] = new Array<string>();
  private fileListPnc$: Subject<string[]> = new Subject<string[]>();

  private fileListWc: string[] = new Array<string>();
  private fileListWc$: Subject<string[]> = new Subject<string[]>();

  private fileListCf: string[] = new Array<string>();
  private fileListCf$: Subject<string[]> = new Subject<string[]>();

  private fileListAdmin: string[] = new Array<string>();
  private fileListAdmin$: Subject<string[]> = new Subject<string[]>();

  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public isLoading(): Observable<boolean> {
    return this.displayLoader$;
  }

  /***********************************************************************
   * PNC Files
  ***********************************************************************/
  public uploadPnc(fileName: string, fileContent: string): void {
    this.displayLoader$.next(true);
    this.http.put(this.serverUrl + 'filePnc', {name: fileName, content: fileContent})
            .pipe(finalize(() => this.displayLoader$.next(false)))
            .subscribe(res => {
              this.fileListPnc.push(fileName);
              this.fileListPnc$.next(this.fileListPnc);
            }, error => {
              this.displayLoader$.next(false);
            });
  }

  public downloadPnc(fileName: string): void {
    this.http.get(this.serverUrl + 'filePnc/${fileName}', {responseType: 'blob'}).subscribe((res) => {
      window.open(window.URL.createObjectURL(res));
    });
  }

  public removePnc(fileName): void {
    this.http.delete(this.serverUrl + 'filePnc/${fileName}').subscribe(() => {
      this.fileListPnc.splice(this.fileListPnc.findIndex(name => name === fileName), 1);
      this.fileListPnc$.next(this.fileListPnc);
    });
  }

  public listPnc(): Observable<string[]> {
    return this.fileListPnc$;
  }

  private addFileToListPnc(fileName: string): void {
    this.fileListPnc.push(fileName);
    this.fileListPnc$.next(this.fileListPnc);
  }


  /***********************************************************************
   * WC Files
  ***********************************************************************/
 public uploadWc(fileName: string, fileContent: string): void {
  this.displayLoader$.next(true);
  this.http.put(this.serverUrl + 'fileWc', {name: fileName, content: fileContent})
          .pipe(finalize(() => this.displayLoader$.next(false)))
          .subscribe(res => {
            this.fileListWc.push(fileName);
            this.fileListWc$.next(this.fileListWc);
          }, error => {
            this.displayLoader$.next(false);
          });
}

public downloadWc(fileName: string): void {
  this.http.get(this.serverUrl + 'fileWc/${fileName}').subscribe(() => {
    this.fileListWc.splice(this.fileListWc.findIndex(name => name === fileName), 1);
    this.fileListWc$.next(this.fileListWc);
  });
}

public removeWc(fileName): void {
  this.http.delete(this.serverUrl + 'fileWc/${fileName}').subscribe(() => {
    this.fileListWc.splice(this.fileListWc.findIndex(name => name === fileName), 1);
    this.fileListWc$.next(this.fileListWc);
  });
}

  public listWc(): Observable<string[]> {
    return this.fileListWc$;
  }

  private addFileToListWc(fileName: string): void {
    this.fileListWc.push(fileName);
    this.fileListWc$.next(this.fileListWc);
  }


/***********************************************************************
 * CF Files
***********************************************************************/
public uploadCf(fileName: string, fileContent: string): void {
  this.displayLoader$.next(true);
  this.http.put(this.serverUrl + 'fileCf', {name: fileName, content: fileContent})
          .pipe(finalize(() => this.displayLoader$.next(false)))
          .subscribe(res => {
            this.fileListCf.push(fileName);
            this.fileListCf$.next(this.fileListCf);
          }, error => {
            this.displayLoader$.next(false);
          });
}

public downloadCf(fileName: string): void {
  this.http.get(this.serverUrl + 'fileCf/${fileName}').subscribe(() => {
    this.fileListCf.splice(this.fileListCf.findIndex(name => name === fileName), 1);
    this.fileListCf$.next(this.fileListCf);
  });
}

public removeCf(fileName): void {
  this.http.delete(this.serverUrl + 'fileCf/${fileName}').subscribe(() => {
    this.fileListCf.splice(this.fileListCf.findIndex(name => name === fileName), 1);
    this.fileListCf$.next(this.fileListCf);
  });
}

  public listCf(): Observable<string[]> {
    return this.fileListCf$;
  }

  private addFileToListCf(fileName: string): void {
    this.fileListCf.push(fileName);
    this.fileListCf$.next(this.fileListCf);
  }


/***********************************************************************
 * Admin Files
***********************************************************************/
public uploadAdmin(fileName: string, fileContent: string): void {
  this.displayLoader$.next(true);
  this.http.put(this.serverUrl + 'fileAdmin', {name: fileName, content: fileContent})
          .pipe(finalize(() => this.displayLoader$.next(false)))
          .subscribe(res => {
            this.fileListAdmin.push(fileName);
            this.fileListAdmin$.next(this.fileListAdmin);
          }, error => {
            this.displayLoader$.next(false);
          });
}

public downloadAdmin(fileName: string): void {
  this.http.get(this.serverUrl + 'fileAdmin/${fileName}').subscribe(() => {
    this.fileListAdmin.splice(this.fileListAdmin.findIndex(name => name === fileName), 1);
    this.fileListAdmin$.next(this.fileListAdmin);
  });
}

public removeAdmin(fileName): void {
  this.http.delete(this.serverUrl + 'fileAdmin/${fileName}').subscribe(() => {
    this.fileListAdmin.splice(this.fileListAdmin.findIndex(name => name === fileName), 1);
    this.fileListAdmin$.next(this.fileListAdmin);
  });
}

public listAdmin(): Observable<string[]> {
  return this.fileListAdmin$;
}

private addFileToListAdmin(fileName: string): void {
  this.fileListAdmin.push(fileName);
  this.fileListAdmin$.next(this.fileListAdmin);
}

}
