import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from "@expo-google-fonts/roboto";

import { SignIn } from "./screens/SignIn";
import { THEME } from "./styles/theme";
import { Loading } from "./components/Loading";
import { Home } from "./screens/Home";
import { Register } from "./screens/Register";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Register /> : <Loading bg="gray.500" />}
    </NativeBaseProvider>
  );
}
