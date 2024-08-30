import { useToast } from "@/shared/hooks";
import { useQueryClient } from "@tanstack/react-query";

const useReactQueryConfig = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const firebaseCrashlytics = (error: unknown) => {
    //   FirebaseService.crashlytics.log(
    //     `.:Erro capturado pelo react-query:. \n ${JSON.stringify(error)}`,
    //   );
    //   FirebaseService.crashlytics.recordError(new Error(JSON.stringify(error)));
  };

  const defaultConfig = {
    refetchOnWindowFocus: true,
    onError: (error: Error) => {
      firebaseCrashlytics(error);

      showToast({ message: error.message, type: "error" });
    },
    retry: (count: number, error: unknown) => {
      return false;
    },
  };

  queryClient.setDefaultOptions({
    queries: { ...defaultConfig },
    mutations: { ...defaultConfig },
  });
};

export default useReactQueryConfig;
