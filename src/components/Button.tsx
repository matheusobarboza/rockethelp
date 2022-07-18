import { Button as NativeBaseButton, Heading, IButtonProps } from "native-base";
import { Loading } from "./Loading";

interface ButtonProps extends IButtonProps {
  title: string;
  loading: true | false
}

export function Button({ title, loading, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton 
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {loading ? <Loading bg="green.700" /> : title}
      </Heading>
    </NativeBaseButton>
  );
}
