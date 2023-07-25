import { Slot } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 1
};

export default function RootLayout() {
	return (
		<PaperProvider theme={theme}>
			<Slot />
		</PaperProvider>
	);
}
