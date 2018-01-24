import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirestoreService } from './firestore.service';
import * as firebase from 'firebase';
import { galleryImage, Portfolio } from '../models';
import * as model from '../models';
import { Observable } from 'rxjs/Observable';
import 'firebase/storage';

@Injectable()
export class StorageService {

private basePath = '/uploads';
private weddings = '/wedding-photography';
private images = '/images';
private storageRef = firebase.storage().ref();
imagesList: AngularFireList<any>;
uploads: Observable<model.Upload[]>;
portfolio: model.Portfolio;
weddingPhotography: AngularFirestoreCollection<model.Portfolio>;
porfolioItem: model.Portfolio;


  constructor(private db: AngularFireDatabase, private firestoreService: FirestoreService) {}

  getImages() {
    this.imagesList = this.db.list(`${this.basePath}/${this.weddings}`)
    return this.imagesList
  }
  getImage(key: string){
    return firebase.database().ref(`${this.basePath}/${this.weddings}` + key).once('value')
    .then((snap)=> snap.val())
  }
  addPortfolioItem(item: model.Portfolio){
    this.firestoreService.addPortfolioItem(item)
  }
 
  uploadFiles(upload: model.Upload){
  
    
    const x = upload.file.name;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${this.weddings}/${x}`).put(upload.file);
    console.log(x);
    
  // if(upload.file.type !== "image/png"){
  //   alert ("Only jpeg are allowed")
  //   return false;
  // }else{
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes ) * 100;
        console.log('uploads is '+ upload.progress + '% done' )
      },
      (error) =>{
        alert (error)
      },
      ():any =>{
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = x.slice(0, -4);
        upload.createdOn = Date();
        this.db.list(`${this.basePath}/${this.weddings}`).push(upload); 
      }
    );
  }
}
