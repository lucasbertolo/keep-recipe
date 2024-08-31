import React, { useMemo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "react-native-paper";
import Button from "../Button";
import If from "../If";
import { useFormContext } from "react-hook-form";

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
  action?: () => void;
}

export interface ProgressStepConfig {
  hasNextButton?: boolean;
  content: React.JSX.Element;
}

const Step: React.FC<StepProps> = ({ isActive, isCompleted, action }) => {
  const theme = useTheme();

  const backgroundColor = useMemo(() => {
    if (isActive) return theme.colors.outline;

    if (isCompleted) return theme.colors.primary;

    return theme.colors.outlineVariant;
  }, [
    isActive,
    isCompleted,
    theme.colors.outline,
    theme.colors.primary,
    theme.colors.outlineVariant,
  ]);

  return (
    <TouchableWithoutFeedback onPress={action}>
      <View
        style={[
          styles.step,
          {
            width: isActive ? 20 : 10,
            height: 5,
            backgroundColor,
            borderRadius: isActive ? 3 : 12,
          },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

interface ProgressStepsProps {
  currentStep: number;
  setStep: (e: number) => void;
  content: React.JSX.Element[];
  isCompleted?: boolean;
  onSubmit: () => void;
  fieldNamesPerStep?: string[][];
}

export const PROGRESS_INITIAL_STEP = 0;

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  setStep,
  content,
  isCompleted,
  fieldNamesPerStep,
  onSubmit,
}) => {
  const { trigger } = useFormContext();

  const Content = content[currentStep];

  const onStepPress = (index: number) => {
    if (index > currentStep && !isCompleted) return;

    setStep(index);
  };

  const lastStep = content.length - 1;

  const onNext = async () => {
    if (currentStep === lastStep) return;

    if (fieldNamesPerStep) {
      const isStepValid = await trigger(fieldNamesPerStep[currentStep]);

      if (!isStepValid) return;
    }

    setStep(currentStep + 1);
  };

  const onPrevious = () => {
    if (currentStep <= PROGRESS_INITIAL_STEP) return;

    setStep(currentStep - 1);
  };

  const submitButton = (
    <Button mode="contained" onPress={onSubmit}>
      Enviar
    </Button>
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: content.length }).map((_, index) => (
          <Step
            key={index}
            isCompleted={currentStep > index}
            isActive={currentStep === index}
            action={() => onStepPress(index)}
          />
        ))}
      </View>
      <View style={styles.contentContainer}>{Content}</View>

      <View style={styles.buttonContainer}>
        <If condition={currentStep > PROGRESS_INITIAL_STEP}>
          <Button mode="outlined" onPress={onPrevious}>
            Voltar
          </Button>
        </If>
        <If condition={currentStep !== lastStep} elseRender={submitButton}>
          <Button mode="contained" onPress={onNext}>
            Próximo
          </Button>
        </If>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  step: {
    marginHorizontal: 5,
    borderRadius: 2.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    paddingBottom: 18,
    paddingHorizontal: 18,
  },
});
