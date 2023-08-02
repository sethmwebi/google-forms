import React from "react";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { TextInput, useTheme, HelperText } from "react-native-paper";

type ControlledInputProps = {
	control: Control;
	name: string;
} & React.ComponentProps<typeof TextInput>;

const ControlledInput = ({ control, name, ...textInputProps }: ControlledInputProps) => {
	const theme = useTheme();
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error, invalid },
			}) => (
				<View style={{flex: 1}}>
					<TextInput
						{...textInputProps}
						style={{ backgroundColor: theme.colors.background }}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
					<HelperText type="error" visible={invalid}>
						{error?.message}
					</HelperText>
				</View>
			)}
		/>
	);
};

export default ControlledInput;
