import { useRouter } from "expo-router";
import { Alert, ScrollView, View } from "react-native";
import {
	Button,
	Card,
	TextInput,
	useTheme,
	Switch,
	Text,
	Checkbox,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	PaymentInfo,
	PaymentInfoSchema,
} from "../../src/schema/checkout.schema";
import ControlledInput from "../../src/components/ControlledInput";
import { useCheckoutContext } from "../../src/context/CheckoutContext";

export default function PaymentDetails() {
	const { control, handleSubmit } = useForm<PaymentInfo>({
		resolver: zodResolver(PaymentInfoSchema),
	});
	const { setPayment, onSubmitAll } = useCheckoutContext();
	const router = useRouter();
	const theme = useTheme();

	const nextPage = async (data: PaymentInfo) => {
		setPayment(data);
		const success = await onSubmitAll(data);
		if (success) {
			router.push("/");
		} else {
			Alert.alert("Failed to submit the form")
		}
	};

	return (
		<ScrollView
			contentContainerStyle={{
				gap: 15,
				maxWidth: 500,
				width: "100%",
				alignSelf: "center",
			}}
			showsVerticalScrollIndicator={false}
		>
			<Card style={{ backgroundColor: theme.colors.background }}>
				<Card.Title title="Payment details" titleVariant="titleLarge" />
				<Card.Content style={{ gap: 10 }}>
					<ControlledInput
						control={control}
						name="number"
						label="Card number"
						placeholder="4242 4242 4242 4242"
						style={{ backgroundColor: theme.colors.background }}
					/>
					<View style={{ flexDirection: "row", gap: 15 }}>
						<ControlledInput
							control={control}
							name="expirationDate"
							label="Expiration date"
							placeholder="mm/yyyy"
							style={{ backgroundColor: theme.colors.background, flex: 2 }}
						/>
						<ControlledInput
							control={control}
							name="securityCode"
							label="Security code"
							style={{ backgroundColor: theme.colors.background, flex: 1.5 }}
						/>
					</View>
					<Controller
						control={control}
						name="saveInfo"
						render={({ field: { value, onChange } }) => (
							<Checkbox.Item
								label="Save payment information"
								status={value ? "checked" : "unchecked"}
								onPress={() => onChange(!value)}
								position="trailing"
							/>
						)}
					/>
				</Card.Content>
			</Card>

			<Button onPress={handleSubmit(nextPage)} mode="contained">
				Submit
			</Button>
		</ScrollView>
	);
}
