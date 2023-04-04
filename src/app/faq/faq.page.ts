import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { log } from 'console';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  show = false;
  show1 = false;
  faqs: any = [];
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.getfaq()
  }

  getfaq() {
    this.api.getRequest('all_faqs').subscribe((res: any) => {
      console.log('allfaqs', res);
      res.data.forEach((ele: any) => {
        let obj = {
          faqs_id: ele.faqs_id,
          question: ele.question,
          answer: ele.answer,
          openanswer: false
        }
        this.faqs.push(obj)
      });

    })
  }
  openclose(item: any) {
    console.log(item);

    if (item.openanswer == false) {
      item.openanswer = true;
    } else {
      item.openanswer = false;
    }
  }

  openclose1() {
    if (this.show1 == false) {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }

  goback() {
    this.location.back()
  }

}
