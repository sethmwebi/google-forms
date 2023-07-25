import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function DeliveryDetails(){
	const router = useRouter();

	const nextPage = () => {
		router.push("/checkout/payment")
	}
	return (
		<View>
			<Text>Delivery Details</Text>
			<Button onPress={nextPage} mode="contained">Next</Button>
		</View>
	)
}