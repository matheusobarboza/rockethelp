import { Center, Spinner } from "native-base";

export function Loading({ ...rest }) {
  return (
    <Center 
      flex={1}
      { ...rest }
    >
      <Spinner color="secondary.700" />
    </Center>
  );
}
