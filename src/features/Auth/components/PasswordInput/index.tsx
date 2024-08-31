import { TextInput } from "@/shared/components";
import { TextInput as TextInputPaper } from "react-native-paper";
import { useState } from "react";

type PasswordInputProps = React.ComponentProps<typeof TextInput> & {};

export const PasswordInput = ({
  value,
  onChange,
  label,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <TextInput
      {...rest}
      label={label ?? "Senha"}
      secureTextEntry={!!showPassword}
      textContentType="oneTimeCode"
      onChange={onChange}
      value={value}
      right={
        <TextInputPaper.Icon
          onPress={handleShowPassword}
          icon={showPassword ? "eye-outline" : "eye-off-outline"}
        />
      }
    />
  );
};
