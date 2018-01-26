import { Component, OnInit, EventEmitter, HostListener, Output, HostBinding} from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FirestoreService } from '../../services/firestore.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Portfolio } from '../../models';
import * as model from '../../models';
import * as _ from 'lodash';
import * as firebase from 'firebase';
// import { directive } from '@angular/core/src/render3/instructions';
declare var $:any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})

export class UploadComponent implements OnInit{

  
  click(){
     $('.inputfile').trigger('click');
   }
   @HostListener('onFocus')
    onFocus(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 20; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
  @HostListener('dragover')
    ondragenter(){
      $('.drop').css({
        'visibility':'visible',
      })
    }
    @HostListener('drop')
      ondrop($event){
        $('.drop').css({
          'display':'none',
        })
      }

  files: FileList;
  upload: model.Upload;
  dropzoneActive:boolean = false;
  something:any;
  portfolioItem: model.Portfolio = {
    portfolioId: this.onFocus(),
    title: '',
    description: ''
  };

  constructor(
    private afs: AngularFirestore, 
    private storageService: StorageService,
    private firestoreService: FirestoreService
  ) {}
  
 
dropzoneState($event: boolean) {
  this.dropzoneActive = $event;
}

 handleFiles(event){
   this.files = event.target.files;
   console.log(this.portfolioItem.portfolioId)
   console.log(this.files)
   
 }
 
 uploadFiles(){
  this.storageService.addPortfolioItem(this.portfolioItem)
  const upload = model.Upload
  const filesToUpload = this.files;
   const filesIdx = _.range(filesToUpload.length);
   _.each(filesIdx, (idx) =>{
     console.log(filesToUpload[idx]);  
      if(filesToUpload[idx].type !== 'image/jpeg' ) {
        alert ('only jpeg files')
      }else{
        this.upload = new model.Upload(filesToUpload[idx]);
        this.upload.refKey = this.portfolioItem.portfolioId;
        this.storageService.uploadFiles(this.upload);
      }
     $('.uploadFile').html('');
     });
   
   
 }
 ngOnInit(){}
 
}


