import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SendNotification } from './notifications.actions';
import { NotificationService } from './notification.service';

export class NotificationsStateModel {
  public success: boolean
}

const defaults = {
  success: false
};

@State<NotificationsStateModel>({
  name: 'notifications',
  defaults
})
@Injectable()
export class NotificationsState {

  @Selector()
  static success(state: NotificationsStateModel) {
    return state.success;
  }

  constructor(private notificationService: NotificationService) {

  }

  @Action(SendNotification)
  sendNotification({ patchState }: StateContext<NotificationsStateModel>, { payload }: SendNotification) {
    return this.notificationService.sendNotification(payload.title, payload.body, payload.date, payload.url).then(success => {
      patchState({
        success
      })
    })

  }
}
