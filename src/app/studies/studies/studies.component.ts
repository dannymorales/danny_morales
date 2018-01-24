import { Component, OnInit, EventEmitter, HostListener, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml, } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { take } from 'rxjs/Operator/take';
// import { map } from 'rxjs/Operator/map';-1
import 'rxjs/Rx'
import { identifierName } from '@angular/compiler';
import * as _ from 'lodash';
import { forEach } from '@angular/router/src/utils/collection';
declare var $:any;
@Pipe({ name: 'safeUrl'})
export class SafeUrlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustUrl(value);
  }
}

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {

  @HostListener('click', ['$event'])
    onclick($event){
     let url =  this.url + $event.target.innerHTML;
     this.http.get(url).map(res => res.json().data).subscribe((data) => {this.videos = data})
    }
  constructor(private http: Http) { }

  url = 'https://api.vimeo.com/channels/1021571/videos?access_token=XXX&sort=manual&per_page=5&page='
  
  videos
  pages;
  items;
  getVideos(){
      this.http.get(this.url + 1 ).map(res => res.json().data).subscribe((data) => {
        this.videos = data
      })
  }
  pagination = this.http.get(this.url + 1 ).map(res => res.json()).subscribe(x =>  {
    this.pages = Math.ceil(x.total/5)
    let i = 1;
    let text = ""
    while ( i < this.pages ) {
      text += '<li class="page-item" style="padding: 7px; cursor:pointer" class="page">' + i + '</li>';
      i++
    };
    $('ul').html(text)

  })
  


  // data = [{"id":1},{"id":2,},{"id":3},{"id":4},{"id":5},{"id":6, "name":'danilo'},{"id":7},{"id":8},{"id":9}];
 
  
  // data = _.chunk(this.getVideos(), 3)
  
  ngOnInit() {

  return this.getVideos()

  }
}