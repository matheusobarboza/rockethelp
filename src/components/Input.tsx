import { IInputProps, Input as NativeBaseInput } from 'native-base';
//o IInputProps é a typagem do native base
export function Input({ ...rest }: IInputProps) { //o ...rest serve para buscar todas as props que o componente filho passar
  return (
    <NativeBaseInput 
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700"
      }}
      { ...rest }
    />
  );
}