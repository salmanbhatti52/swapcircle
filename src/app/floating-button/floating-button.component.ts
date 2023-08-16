import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ExtraService } from '../services/extra.service';
@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<void>();

  // btnshow = false;
  constructor(public extra: ExtraService) { }

  ngOnInit() {
    this.extra.btnshow
    console.log('sadsadsad', this.extra.btnshow);

    // if (localStorage.getItem('user_Id') == '' || localStorage.getItem('user_Id') == null) {
    //   this.btnshow = true;
    // }
  }

  onButtonClick() {
    this.buttonClick.emit();
  }

}
