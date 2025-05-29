import { Form, Input, Button, Select, Typography, message } from "antd";
import { ContainerRegister, FormWrapper, Box, ContainerBox } from "./styles";
import { CountryType, UserType } from "../../../enum/users.enum";
import { api } from "../../../services/api";
const { Option } = Select;

export function Register() {
	const [form] = Form.useForm();

	const onFinish = async (values: any) => {

		try {
			const response = await api.post("/users", values, { headers: { "Content-Type": "application/json" } });
			const data = response.data;
			message.success(data);
			form.resetFields();

		} catch (error: any) {
			throw new Error(error.response?.data.message);
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

							<Form.Item label="Password" name="password" rules={[{ required: true }]}>
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
						<Button type="primary" htmlType="submit" block>
							Register
						</Button>
					</Form.Item>
				</Form>
			</FormWrapper>
		</ContainerRegister>
	);
}
