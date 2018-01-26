import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireList, AngularFireDatabase, AngularFireObject, AngularFireAction } from 'angularfire2/database';
import * as model from '../../models';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  @Input() image: model.Upload;

  constructor(private storageService: StorageService) { }

  deleteItem(){
    if(confirm('Are you sure you would like to delete this file?')){
      this.storageService.deleteItem(this.image)
    }
  }
  ngOnInit() {
  }

}
