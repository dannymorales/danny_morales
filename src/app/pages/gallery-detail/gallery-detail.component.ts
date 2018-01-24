import { Component, OnInit, OnChanges } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { galleryImage } from '../../models';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit {
private imageUrl = ""
  constructor(private storageService: StorageService, private route: ActivatedRoute) { }

  getImageUrl(key: string){
    this.storageService.getImage(key)
      .then(image => this.imageUrl = image)
  }
  ngOnInit() {
    this.getImageUrl(this.route.snapshot.params['id'])
  }

}
