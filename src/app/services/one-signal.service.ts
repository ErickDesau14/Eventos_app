import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  init() {

    // Compruebo si el plugin esta disponible para este dispositivo
    const isPushNotificationAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationAvailable) {

      // Pido al usuario si quiere que se le envien notificaciones
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive) {
          PushNotifications.register().then(() => {
            // Inicializamos onesignal
            OneSignal.initialize(environment.oneSignalID);

            // Evento al hacer click a la notificacion que mandemos
            OneSignal.Notifications.addEventListener('click', async (e) => {
              const notification = e.notification;
              if (notification.additionalData['url']) {
                await Browser.open({ url: notification.additionalData['url'] })
              }
            })

          })
        }
      })

      PushNotifications.addListener("registration", (token: Token) => {
        console.log(token);
      })

    } else {
      console.log("No esta disponible las push notifications");
    }

  }
}
