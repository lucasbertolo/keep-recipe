import crashlytics from "@react-native-firebase/crashlytics";

export class FirebaseCrashlyticsService {
  static logCrashlytics = (message: string) => {
    crashlytics().log(message);
  };

  static recordError = (error: Error, context?: object) => {
    if (context) {
      crashlytics().log(`Context: ${JSON.stringify(context)}`);
    }

    crashlytics().recordError(error);
  };

  static setUserIdentifier = (userId?: string) => {
    if (userId) crashlytics().setUserId(userId);
  };

  static crash = () => {
    crashlytics().crash();
  };
}
