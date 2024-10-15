import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Database, get, getDatabase, orderByChild, push, query, ref, remove, set, startAt } from '@angular/fire/database';
import * as moment from 'moment';
import { EventDDR } from 'src/app/models/event.ddr';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private database: Database;

  constructor(afApp: FirebaseApp) {
    this.database = getDatabase(afApp);
  }


  createEvent(event: EventDDR) {
    return new Promise((resolve, reject) => {
      try {
        let eventRef = ref(this.database, 'eventos');
        const newRef = push(eventRef);
        event.id = newRef.key;
        set(newRef, {
          ...event
        })
        resolve(true);
      } catch (error) {
        reject(false);
      }

    })
  }

  updateEvent(event: EventDDR) {
    return new Promise((resolve, reject) => {
      try {
        let eventRef = ref(this.database, 'eventos/' + event.id);
        set(eventRef, {
          ...event
        })
        resolve(true);
      } catch (error) {
        reject(false);
      }

    })
  }

  deleteEvent(id: string) {
    return new Promise((resolve, reject) => {
      try {
        let eventRef = ref(this.database, 'eventos/' + id);
        remove(eventRef);
        resolve(true);
      } catch (error) {
        reject(false);
      }

    })
  }

  getFutureEvents() {

    const queryDB = query(ref(this.database, 'eventos'), orderByChild('start'), startAt(moment().format('YYYY-MM-DDTHH:mm')))

    return get(queryDB);
  }

}
