import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { galleryImage } from '../../models';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/Rx';
declare var $:any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {


  imagesRef: AngularFireList<any>;
  images: galleryImage[];
  

  constructor(private storageService: StorageService ) {}

  ngOnInit() {
    let x = this.storageService.getImages()
    x.snapshotChanges().subscribe(item =>{
      this.images = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.images.push(y as galleryImage)
      });
    });
  }

  ngOnChanges(){
   
  }

}
