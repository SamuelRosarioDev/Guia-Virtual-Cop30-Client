import { Form, Input, Button, Typography, message, Select } from "antd";
import { ContainerRegister, FormWrapper } from "./styles";
import { api } from "../../../services/api";
import { useEffect } from "react";
import axios from "axios";
import { StoreType } from "../../../enum/trader.enum";

const { Option } = Select;

export function TraderRegister() {
	const [form] = Form.useForm();

	useEffect(() => {
		async function fetchUser() {
			try {
				const { data } = await api.get("/auth/me", { withCredentials: true });
				form.setFieldsValue({ userId: data.idUser });  // seta o idUser no form
			} catch (error: any) {
				message.error(error.response?.data.message || "Erro ao buscar usuário");
			}
		}

		fetchUser();
	}, [form]);

	const onFinish = async (values: any) => {
		try {
			const response = await api.post("/traders", values, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			const data = response.data;
			message.success(data.message || "Trader registrado com sucesso!");
			form.resetFields();
		} catch (error: any) {
			throw new Error(error.response?.data.message);
		}
	};

	const handleCepBlur = async () => {
		const cep = form.getFieldValue("cep")?.replace(/\D/g, "");  // Remove caracteres não numéricos
		if (cep?.length !== 8) {
			message.warning("CEP inválido");
			return;
		}

		try {
			const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

			if (data.erro) {
				message.error("CEP não encontrado");
				return;
			}

			const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

			form.setFieldsValue({
				address: endereco,
			});
		} catch (error) {
			message.error("Erro ao buscar endereço pelo CEP");
		}
	};

	return (
		<ContainerRegister>
			<FormWrapper>
				<Typography.Title>COP30 - Register Trader</Typography.Title>
				<Typography.Paragraph>
					Preencha o formulário para registrar sua loja.
				</Typography.Paragraph>

				<Form form={form} layout="vertical" onFinish={onFinish} size="large">
					<Form.Item label="Store Name" name="storeName" rules={[{ required: true }]}>
						<Input placeholder="Enter store name" />
					</Form.Item>

					<Form.Item label="Store Type" name="storeType" rules={[{ required: true }]}>
						<Select placeholder="Select user type">
							{Object.values(StoreType).map((type) => (
								<Option key={type} value={type}>{type}</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="CPF" name="cpf" rules={[{ required: true }]}>
						<Input placeholder="Enter your CPF" />
					</Form.Item>

					<Form.Item label="CNPJ" name="cnpj">
						<Input placeholder="Enter your CNPJ" />
					</Form.Item>

					<Form.Item label="CEP" name="cep" rules={[{ required: true }]}>
						<Input placeholder="Enter CEP" onBlur={handleCepBlur} />
					</Form.Item>

					<Form.Item label="Address" name="address" rules={[{ required: true }]}>
						<Input placeholder="Enter store address" readOnly />
					</Form.Item>

					<Form.Item label="User ID" name="userId" rules={[{ required: true }]}>
						<Input placeholder="Enter your User ID" readOnly />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Register Trader
						</Button>
					</Form.Item>
				</Form>
			</FormWrapper>
		</ContainerRegister>
	);
}
