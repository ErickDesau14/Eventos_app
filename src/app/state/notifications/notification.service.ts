import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment-timezone'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  sendNotification(title: string, body: string, date: string, url: string){

    const userTimeZone = moment.tz.guess();

    return CapacitorHttp.post({
      url: 'https://onesignal.com/api/v1/notifications',
      params: {},
      data: {
        app_id: environment.oneSignalID,
        included_segments: ["Total Subscriptions"], // segmento de onesignal
        headings: { "en": title }, // se puede agregar diferentes idiomas
        contents: { "en": body }, // se puede agregar diferentes idiomas
        data: { url },
        send_after: moment(date).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss [GMT]Z')
      },
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Basic ${environment.oneSignalRestAPI}`
      }
    }).then( (response: HttpResponse) => {
      console.log(response);
      return response.status == 200;
    })


  }



}
