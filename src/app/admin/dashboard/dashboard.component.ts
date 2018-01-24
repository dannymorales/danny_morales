import { Component, OnInit, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import {AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as model from '../../models';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  portfolioItems: model.Portfolio[];
  editState: boolean = false;
  portfolioItemToEdit: model.Portfolio;


  constructor(private db: AngularFireDatabase, 
              private afs: AngularFirestore, 
              private firestoreService: FirestoreService ) {}

  ngOnInit() {
    this.firestoreService.getPortfolioItems().subscribe(items =>{
      this.portfolioItems = items;
      console.log(items)
    });
    
  }
  deletePortfolioItem(event, portfolioItem: model.Portfolio){
    this.clearState();
    this.firestoreService.deletePortfolioItem(portfolioItem)
  }
  editPortfolioItem(event, portfolioItem: model.Portfolio){
    this.editState = true;
    this.portfolioItemToEdit = portfolioItem;
  }

  updatePortfolioItem(portfolioItem: model.Portfolio){
    this.firestoreService.updatePortfolioItem(portfolioItem)
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.portfolioItemToEdit = null;
  }
}
