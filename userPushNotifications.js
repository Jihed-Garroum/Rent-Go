import React, { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";


export const usePushNotifications = () => {
    // Define a function to show the toast notification
    const showToast = (message,title) => {
        // Implement your toast logic here
        console.log(title);
        console.log(message);
        // For example, using a simple alert for demonstration purposes
        Toast.show({
            type: "success",
            text1: title,
            text2: message,
          });
        // In a real scenario, you might want to use a more sophisticated approach
        // such as a custom toast component that auto-hides after a few seconds
    };

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false,
            // When a notification is received, show a toast notification
            actions: [{
                identifier: "SHOW_TOAST",
                title: "Show Toast",
                // Optionally, you can pass additional data to the toast
                // For example, the notification message
                data: { message: "New notification arrived!" },
            }],
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState();
    const [notification, setNotification] = useState();

    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus!== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus!== "granted") {
                alert("Failed to get push token for push notification");
                return;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
            });
        } else {
            alert("Must be using a physical device for Push notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
            // Optionally, show a toast notification here as well
            showToast(notification.request.content.body,notification.request.content.title);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return {
        expoPushToken,
        notification,
    };
};
