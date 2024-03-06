import { Control, useController } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({
  control,
  name,
  ...props
}: { control?: Control<any>; name: string } & TextInputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <TextInput
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      style={Object.assign({}, styles.input, props.style)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
