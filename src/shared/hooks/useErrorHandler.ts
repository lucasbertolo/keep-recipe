import { FirebaseCrashlyticsService } from "@/config/services/firebase/crashlytics";
import { useEffect } from "react";

export const useErrorHandler = () => {
  useEffect(() => {
    const errorHandler = (error: Error, isFatal?: boolean) => {
      FirebaseCrashlyticsService.logCrashlytics(
        `Fatal: ${isFatal}, Error: ${error.message}`,
      );
    };

    ErrorUtils.setGlobalHandler(errorHandler);
  }, []);
};
