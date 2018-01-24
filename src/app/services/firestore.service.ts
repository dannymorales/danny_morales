import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as model from '../models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirestoreService {

weddingPhotography: AngularFirestoreCollection<model.Portfolio>;
portfolioItems: Observable<model.Portfolio[]>;
portfolioDoc: AngularFirestoreDocument<model.Portfolio>;

  constructor(private afs: AngularFirestore) {
    this.weddingPhotography = afs.collection('weddings');
    this.portfolioItems = this.weddingPhotography.snapshotChanges().map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as model.Portfolio;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getPortfolioItems(){
     return this.portfolioItems
   }
   addPortfolioItem(portfolioItem: model.Portfolio){
     this.weddingPhotography.add(portfolioItem);
   }
   deletePortfolioItem(portfolioItem: model.Portfolio){
    this.portfolioDoc = this.afs.doc(`weddings/${portfolioItem.id}`)
    this.portfolioDoc.delete
   }

   updatePortfolioItem(portfolioItem: model.Portfolio){
    this.portfolioDoc = this.afs.doc(`weddings/${portfolioItem.id}`);
    this.portfolioDoc.update(portfolioItem);
   }

  

}
