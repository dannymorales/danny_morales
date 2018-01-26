import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from './firestore.service';
import * as firebase from 'firebase';
import * as model from '../models';
import { Observable } from 'rxjs/Observable';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2/firebase.app.module';


@Injectable()
export class StorageService {

  private basePath = 'wedding-photos';
  private weddings = 'wedding-photography';
  private images = 'images';
  private storageRef = firebase.storage().ref();
  imagesList: AngularFireList<model.Upload[]>;
  image: AngularFireObject<model.Upload>;
  uploads: Observable<model.Upload[]>;
  imagesItems: AngularFirestoreCollection<model.Upload>;
  weddingPhotography: AngularFirestoreCollection<model.Portfolio>;
  porfolioItem: model.Portfolio;
  portfolioDoc: AngularFirestoreDocument<model.Portfolio>;


  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private firestoreService: FirestoreService, private afs: AngularFirestore) {
    this.image = db.object('wedding-photos')
  }

  //  GET IMAGES======================================================
  getImages() {
    this.imagesList = this.db.list(`${this.basePath}/`)
    return this.imagesList
  }
  getImagesByRef(id: string) {
    this.imagesList = this.db.list(`${this.basePath}/`,
      ref => ref.orderByChild('refKey').equalTo(id)
    )
    return this.imagesList
  }
  getImage(key: string) {
    const imagePath = `${this.basePath}/${key}`;
    this.image = this.db.object(imagePath)
    return this.image
  }
  //  END GET IMAGES======================================================

  //  UPLOAD FILES======================================================
  addPortfolioItem(item: model.Portfolio) {
    this.firestoreService.addPortfolioItem(item)
  }
  uploadFiles(upload: model.Upload) {

    const x = upload.file.name;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${x}`).put(upload.file);
    console.log(x);

    // if(upload.file.type !== "image/png"){
    //   alert ("Only jpeg are allowed")
    //   return false;
    // }else{
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('uploads is ' + upload.progress + '% done')
      },
      (error) => {
        alert(error)
      },
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.completeName = x;
        upload.name = x.slice(0, -4);
        upload.createdOn = Date();
        this.db.list(`${this.basePath}`).push(upload);
      }
    );
  }
  //  END UPLOAD FILES======================================================

  deleteItem(key: model.Upload): void {
    this.imagesList.remove(key.$key).then(()=>{
      const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${key.completeName}`).delete()
    })
      .catch(error => console.log(error))
  }
 
}
