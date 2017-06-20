import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Session } from "../../models/Session";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageProvider: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.fetchRuns();
  }

  private fetchRuns(): void {
    this.storageProvider.get('runs')
      .then((result) => {
        var runs: Array<Session> = JSON.parse(result);
        runs.forEach(run => {
          this.items.push({
            title: run.name,
            note: run.records[run.records.length -1].distanceFromStart.toFixed(2).toString() + " KM",
            icon: this.icons[0]
          });
        });
      })
      .catch((error) => {
        console.log("Error fetching runs - " + error);
        this.items = [];
      });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
