import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { CheckIsLogged } from './state/auth/auth.actions';
import { OneSignalService } from './services/one-signal.service';
import config from 'capacitor.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private translateService: TranslateService,
    private platform: Platform,
    private store: Store,
    private oneSignalService: OneSignalService
  ) {
    this.translateService.setDefaultLang('es');
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(async () => {

      const language = await Device.getLanguageCode();

      if (language.value) {
        this.translateService.use(language.value.slice(0, 2))
      }
      
      // Activamos CapacitorHttp
      config.plugins.CapacitorHttp.enabled = true;
      // Notificaciones
      this.oneSignalService.init();
      // Comprobamos si estamos logueados
      this.store.dispatch(new CheckIsLogged());

    })
  }

}
