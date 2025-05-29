import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api"
import { ContainerRegister, FormWrapper } from "./styles";

export function Login() {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values: any) => {
		try {
			await api.post("/login", values, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true, // Importante: para enviar cookies automaticamente
			});
			
			message.success("Login realizado com sucesso!");

			// Consulta /auth/me para saber qual rota seguir
			const { data } = await api.get("/auth/me", { withCredentials: true });

            
			if (data.typeUser === "TRADER") {
				// Verifica se já tem trader cadastrado
				try {
					await api.get(`/traders/${data.userId}`, { withCredentials: true });
					navigate("/dashboard"); // Já tem Trader → vai pro dashboard
                    console.log("Usuário já é trader, redirecionando para o dashboard.1");
                    
				} catch {
                    console.log("Usuário não é trader, redirecionando para o registro de trader.");
                    
					navigate("/register/traders"); // Não tem Trader → registra
				}
			} else {
                console.log("Usuário não é trader, redirecionando para o dashboard.2");
                
				navigate("/dashboard"); // Não é trader → dashboard
			}

		} catch (error: any) {
			message.error(error.response?.data?.message || "Erro ao fazer login");
		}
	};

	return (
		<ContainerRegister>
			<FormWrapper>
				<Typography.Title>COP30 - Login</Typography.Title>
				<Typography.Paragraph>Digite suas credenciais para acessar.</Typography.Paragraph>

				<Form form={form} layout="vertical" onFinish={onFinish} size="large">
					<Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
						<Input placeholder="Digite seu email" />
					</Form.Item>

					<Form.Item label="Senha" name="password" rules={[{ required: true }]}>
						<Input.Password placeholder="Digite sua senha" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Entrar
						</Button>
					</Form.Item>
				</Form>
			</FormWrapper>
		</ContainerRegister>
	);
}
