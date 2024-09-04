import { useToast } from "@/shared/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { FirebaseCrashlyticsService } from "../firebase";

const retry = (failureCount: number, error: any): boolean => {
  const statusCode = error?.response?.status;

  const nonRetryableStatusCodes = [400, 401, 403, 404, 422];

  if (nonRetryableStatusCodes.includes(statusCode)) {
    return false;
  }

  return failureCount < 3;
};

export const useReactQueryConfig = (user?: Auth.User | null) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const firebaseCrashlytics = (error: unknown, context?: object) => {
    const errorMessage = `.:Erro capturado pelo react-query:. \n ${JSON.stringify(error)}`;

    FirebaseCrashlyticsService.logCrashlytics(errorMessage);

    FirebaseCrashlyticsService.recordError(new Error(errorMessage), context);

    FirebaseCrashlyticsService.setUserIdentifier(user?.uid);
  };

  const defaultConfig = {
    refetchOnWindowFocus: true,
    retry,
  };

  queryClient.setDefaultOptions({
    queries: { ...defaultConfig },
    mutations: {
      ...defaultConfig,
      onError: (error, variables, context) => {
        try {
          showToast({ message: error.message, type: "error" });

          if (!!context && "mutationKey" in (context as any)) {
            const mutationContext = context as {
              mutationKey: unknown[];
              variables: unknown;
              meta: unknown;
            };

            firebaseCrashlytics(error, {
              mutationKey: mutationContext.mutationKey,
              variables: variables,
              meta: mutationContext.meta,
            });

            return;
          }

          firebaseCrashlytics(error);
        } catch (error) {
          return error;
        }
      },
      retry: false,
    },
  });
};
