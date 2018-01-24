import { Directive, EventEmitter, HostListener, Output, HostBinding} from '@angular/core';


@Directive({
  selector: '[appFileDrop]'
})

export class FileDropDirective {

  
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter<boolean>();


  constructor() { }
  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();
    }
    @HostListener('dragover', ['$event'])
     onDragOver($event) {
       event.preventDefault();
       this.filesHovered.emit(true);
     }
   @HostListener('dragleave', ['$event'])
    onDragLeave($event) {
      this.filesHovered.emit(false);
    }


 



    
    

}