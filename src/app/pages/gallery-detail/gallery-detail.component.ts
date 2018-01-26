import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireList, AngularFireDatabase, AngularFireObject, AngularFireAction } from 'angularfire2/database';
import * as model from '../../models';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/Rx';


@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit {
  
  
  images: model.Upload[];

  constructor(private storageService: StorageService, private route: ActivatedRoute, private db: AngularFireDatabase) { }
  id = this.route.snapshot.params['id'];

  ngOnInit() {
    let x = this.storageService.getImagesByRef(this.id)
    x.snapshotChanges().subscribe(item =>{
      this.images = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.images.push(y as model.Upload)
      })
      console.log(this.images)
    })
    console.log(this.id)
  }

}
