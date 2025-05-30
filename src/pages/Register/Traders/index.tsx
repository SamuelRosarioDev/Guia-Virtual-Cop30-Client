import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import { ContainerRegister, FormWrapper, Box } from "./styles";
import { api } from "../../../services/api";
import axios, { type AxiosError } from "axios";
import { StoreType } from "../../../enum/trader.enum";
import { showSuccess, showError, showWarning, showLoading, updateToast } from "../../../utils/toastify";
import { Link } from "react-router-dom";

const { Option } = Select;

export function TraderRegister() {
	const [form] = Form.useForm();
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const { data } = await api.get("/auth/me", { withCredentials: true });
				setUserId(data.idUser);
				form.setFieldsValue({ userId: data.idUser });
			} catch (error) {
				const axiosError = error as AxiosError<{ message?: string }>;
				const errorMessage = axiosError.response?.data?.message ?? "Erro ao buscar usuário";
				showError(errorMessage);
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
			showSuccess(data.message ?? "Trader registrado com sucesso!");
			form.resetFields();
		} catch (error) {
			const axiosError = error as AxiosError<{ message?: string }>;
			const errorMessage = axiosError.response?.data?.message ?? "Erro ao registrar trader";
			showError(errorMessage);
		}
	};

	const handleCepBlur = async () => {
		const cep = form.getFieldValue("cep")?.replace(/\D/g, "");
		if (cep?.length !== 8) {
			showWarning("CEP inválido");
			return;
		}

		const toastId = showLoading("Buscando endereço...");

		try {
			const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

			if (data.erro) {
				updateToast(toastId, "CEP não encontrado", "error");
				return;
			}

			const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

			form.setFieldsValue({
				address: endereco,
			});

			updateToast(toastId, "Endereço encontrado com sucesso!", "success");
		} catch {
			updateToast(toastId, "Erro ao buscar endereço", "error");
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
