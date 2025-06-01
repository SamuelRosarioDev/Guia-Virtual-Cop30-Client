import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import { ContainerRegister, FormWrapper, Box } from "./styles";
import { api } from "../../../services/api";
import axios from "axios";
import { StoreType } from "../../../enum/trader.enum";
import { showSuccess, showError, showLoading, updateToast } from "../../../utils/toastify";
import { Link } from "react-router-dom";

const { Option } = Select;

export function TraderRegister() {
	const [form] = Form.useForm();
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const toastId = showLoading("Loading user...");

			try {
				const response = await api.get("/auth/me", { withCredentials: true });
				console.log(response.data.idUser);
				setUserId(response.data.idUser);
				

				updateToast(toastId, response.data?.message, "success");

				form.setFieldsValue({ userId: response.data.idUser });
			} catch (error: any) {
				showError(error.response?.data?.message);
			}
		}

		fetchUser();
	}, [form]);

	const onFinish = async (values: any) => {
		try {
			const response = await api.post("/trader", values, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			showSuccess(response.data?.message);
			form.resetFields();
		} catch (error: any) {
			showError(error.response?.data?.message);
		}
	};

	const handleCepBlur = async () => {
		const toastId = showLoading("Buscando endereço...");

		try {
			const cep = form.getFieldValue("cep")?.replace(/\D/g, "");
			
			const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

			const endereco = `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`;

			form.setFieldsValue({address: endereco});

			updateToast(toastId, response.data?.message, "success");
		} catch (error: any) {
			updateToast(toastId, error.response?.data?.message, "error");
		}

	};

	if (userId === null) {
		return <div>Carregando usuário...</div>;
	}

	return (
		<ContainerRegister>
			<FormWrapper>
				<Typography.Title>COP30 - Register Trader</Typography.Title>
				<Typography.Paragraph>
					Preencha o formulário para registrar sua loja.
				</Typography.Paragraph>

				<Form form={form} layout="vertical" onFinish={onFinish} size="large">
					<Box>
						<Form.Item
							style={{ width: "100%" }}
							label="Nome da Loja"
							name="storeName"
							rules={[{ required: true }]}
						>
							<Input placeholder="Digite o nome da loja" />
						</Form.Item>

						<Form.Item
							style={{ width: "100%" }}
							label="Tipo de Loja"
							name="storeType"
							rules={[{ required: true }]}
						>
							<Select placeholder="Selecione o tipo de loja">
								{Object.values(StoreType).map((type) => (
									<Option key={type} value={type}>
										{type}
									</Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							style={{ width: "100%" }}
							label="CPF"
							name="cpf"
							rules={[{ required: true }]}
						>
							<Input placeholder="Digite seu CPF" />
						</Form.Item>
					</Box>

					<Box>
						<Form.Item
							style={{ width: "100%" }}
							label="CNPJ"
							name="cnpj"
						>
							<Input placeholder="Digite seu CNPJ" />
						</Form.Item>

						<Form.Item
							style={{ width: "100%" }}
							label="CEP"
							name="cep"
							rules={[{ required: true }]}
						>
							<Input
								placeholder="Digite o CEP"
								onBlur={handleCepBlur}
							/>
						</Form.Item>

						<Form.Item
							style={{ width: "100%" }}
							label="Endereço"
							name="address"
							rules={[{ required: true }]}
						>
							<Input placeholder="Endereço da loja" readOnly />
						</Form.Item>
					</Box>

					<Form.Item
						label="User ID"
						name="userId"
						rules={[{ required: true }]}
					>
						<Input placeholder="Seu ID de usuário" readOnly />
					</Form.Item>

					<Form.Item>
						<Typography.Paragraph>Already have an account? <Link to="/log-in">Click here</Link> </Typography.Paragraph>

						<Button type="primary" htmlType="submit" block>
							Registrar Loja
						</Button>
					</Form.Item>
				</Form>
			</FormWrapper>
		</ContainerRegister>
	);
}
