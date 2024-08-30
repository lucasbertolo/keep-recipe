import { ChefHatSvg } from "@/shared/assets/images/svg";
import { Button, Space, Typography } from "@/shared/components";
import { ScrollView, StyleSheet, View } from "react-native";

type IntroductionProps = {
  action: () => void;
};

export const Introduction = ({ action }: IntroductionProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.circleSvg}>
          <ChefHatSvg width={60} height={60} />
        </View>

        <Space type="md" />
        <Typography variant="heading">Adicione novas</Typography>
        <Typography variant="heading">receitas</Typography>
        <Space />
        <View style={styles.containerSubtitle}>
          <Typography variant="body">
            Aqui você pode salvar suas receitas e o modo de preparo para sempre
            te-las nas mãos.
          </Typography>
        </View>
      </View>

      <Button mode="contained" onPress={action}>
        Vamos lá
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    padding: 18,
    flex: 1,
  },
  containerSubtitle: {
    width: "80%",
  },
  circleSvg: {
    padding: 12,
    borderRadius: 42,
    backgroundColor: "rgba(0, 104, 116, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});
