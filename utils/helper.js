import uuid from 'uuid/v1';
import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

import { STORAGE_NOTIFICATION, STORAGE_MAIN_DATA } from './constants';

export function generateId() {
    return uuid();
}

export function notification() {
    AsyncStorage.getItem(STORAGE_NOTIFICATION)
    .then(JSON.parse)
    .then(data => {
        if (data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if (status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync();

                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(19);
                    tomorrow.setMinutes(0);

                    Notifications.scheduleLocalNotificationAsync({
                        title: 'Flashcards',
                        body: 'Não esqueça de praticar hoje!',
                        android: {
                            vibrate: true,
                            sticky: false,
                            sound: true,
                            priority: 'high'
                        }
                    }, {
                        time: tomorrow,
                        repeat: 'day'
                    }).catch
                    
                    AsyncStorage.setItem(STORAGE_NOTIFICATION, JSON.stringify(true));
                }
            });
        }
    });
}

export function clearNotification(){
    return AsyncStorage.removeItem(STORAGE_NOTIFICATION)
    .then(() => {
        Notifications.cancelAllScheduledNotificationsAsync();
    });
}