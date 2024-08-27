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

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <TextInput
      {...rest}
      mode="outlined"
      label={label ?? "Senha"}
      secureTextEntry
      onChange={onChange}
      value={value}
      right={<TextInputPaper.Icon icon="eye" />}
    />
  );
};
