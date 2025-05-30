import { Form, Input, Button, Select, Typography } from "antd";
import { ContainerRegister, FormWrapper, Box, ContainerBox } from "./styles";
import { CountryType, UserType } from "../../../enum/users.enum";
import { api } from "../../../services/api";
import { showLoading, updateToast } from "../../../utils/toastify";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom";

const { Option } = Select;

interface RegisterFormValues {
	name: string;
	email: string;
	password: string;
	phone: string;
	country: CountryType;
	typeUser: UserType;
}

export function Register() {
	const [form] = Form.useForm<RegisterFormValues>();

	const onFinish = async (values: RegisterFormValues) => {
		const toastId = showLoading("Registering user...");

		try {
			const response = await api.post("/users", values, {
				headers: { "Content-Type": "application/json" },
			});

			const message = response.data?.message;
			updateToast(toastId, message, "success");
			form.resetFields();

		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			const message = axiosError.response?.data?.message ?? "Error serving request";
			updateToast(toastId, message, axiosError.response?.status === 400 ? "warning" : "error");
		}
	};


	return (
		<ContainerRegister>
			<FormWrapper>
				<Typography.Title>COP30 - Register</Typography.Title>
				<Typography.Paragraph>Please fill out the form to create a new account.</Typography.Paragraph>

				<Form form={form} layout="vertical" onFinish={onFinish} size="large">
					<ContainerBox>
						<Box>
							<Form.Item label="First and last name" name="name" rules={[{ required: true }]}>
								<Input placeholder="Enter your name" />
							</Form.Item>

							<Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
								<Input placeholder="Enter your email" />
							</Form.Item>

							<Form.Item label="Password" name="password" rules={
								[
									{ required: true, message: "Password is required" },
									{ min: 6, message: "Password must be at least 6 characters" }
								]
							}>
								<Input.Password placeholder="Enter your password" />
							</Form.Item>
						</Box>
						<Box>
							<Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
								<Input placeholder="Enter your phone number" />
							</Form.Item>

							<Form.Item label="Country" name="country" rules={[{ required: true }]}>
								<Select placeholder="Select a country">
									{Object.values(CountryType).map((country) => (<Option key={country} value={country}>{country}</Option>))}
								</Select>
							</Form.Item>

							<Form.Item label="Type of User" name="typeUser" rules={[{ required: true }]}>
								<Select placeholder="Select user type">
									{Object.values(UserType).map((type) => (<Option key={type} value={type}>{type}</Option>))}
								</Select>
							</Form.Item>
						</Box>
					</ContainerBox>

					<Form.Item>
						<Typography.Paragraph>Already have an account? <Link to="/log-in">Click here</Link> </Typography.Paragraph>

						<Button type="primary" htmlType="submit" block>
							Register
						</Button>
					</Form.Item>
				</Form>
			</FormWrapper>
		</ContainerRegister>
	);
}
