import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function PersonalDetails(){
	return (
		<View>
			<Text>Personal Details</Text>
			<Link href={"/checkout/delivery"}>Next</Link>
		</View>
	)
}