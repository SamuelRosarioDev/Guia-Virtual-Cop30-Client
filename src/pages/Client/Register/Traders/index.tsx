import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import { ContainerRegister, FormWrapper, Box } from "./styles";
import { api } from "../../../../services/api";
import axios from "axios";
import { StoreType } from "../../../../enum/trader.enum";
import { Link, useNavigate } from "react-router-dom";
import { showError, showLoading, showSuccess, updateToast } from "../../../../utils/toastify";

const { Option } = Select;

export function TraderRegister() {
    const [form] = Form.useForm();
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const toastId = showLoading("Loading user...");

            try {
                const { data } = await api.get("/auth/me", { withCredentials: true });
                setUserId(data.idUser);
                updateToast(toastId, data?.message, "success");
                form.setFieldsValue({ userId: data.idUser });
            } catch (error: any) {
                showError(error.response?.data?.message);
            }
        };
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
            navigate("/dashboard")
        } catch (error: any) {
            showError(error.response?.data?.message);;
        }
    };

    const handleCepBlur = async () => {
        const toastId = showLoading("Buscando endereço...");

        try {
            const cep = form.getFieldValue("cep")?.replace(/\D/g, "");

            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            const endereco = `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`;

            form.setFieldsValue({ address: endereco });

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

                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    <Box>
                        <Form.Item
                            label="Nome da Loja"
                            name="storeName"
                            rules={[{ required: true, message: "Por favor, insira o nome da loja" }]}
                        >
                            <Input placeholder="Digite o nome da loja" />
                        </Form.Item>

                        <Form.Item
                            label="Tipo de Loja"
                            name="storeType"
                            rules={[{ required: true, message: "Por favor, selecione o tipo de loja" }]}
                        >
                            <Select placeholder="Selecione o tipo de loja">
                                {Object.values(StoreType).map((type) => (
                                    <Option key={type} value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="CPF"
                            name="cpf"
                            rules={[
                                { required: true, message: "Por favor, insira o CPF" },
                                { pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: "CPF inválido" }
                            ]}
                        >
                            <Input placeholder="000.000.000-00" />
                        </Form.Item>
                    </Box>

                    <Box>
                        <Form.Item
                            label="CNPJ"
                            name="cnpj"
                            rules={[
                                { pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, message: "CNPJ inválido" }
                            ]}
                        >
                            <Input placeholder="00.000.000/0000-00" />
                        </Form.Item>

                        <Form.Item
                            label="CEP"
                            name="cep"
                            rules={[
                                { required: true, message: "Por favor, insira o CEP" },
                                { pattern: /^\d{5}-?\d{3}$/, message: "CEP inválido" }
                            ]}
                        >
                            <Input placeholder="00000-000" onBlur={handleCepBlur} />
                        </Form.Item>

                        <Form.Item
                            label="Endereço"
                            name="address"
                            rules={[{ required: true, message: "Por favor, insira o endereço" }]}
                        >
                            <Input placeholder="Endereço completo" />
                        </Form.Item>

                        <Form.Item
                            label="Link do Mapa"
                            name="linkMap"
                            rules={[{ required: true, message: "Por favor, insira o link do mapa" }]}
                        >
                            <Input placeholder="URL do mapa ou iframe" />
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
                        <Button type="primary" htmlType="submit" block>
                            Registrar Loja
                        </Button>
                        <Typography.Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
                            Já tem uma conta? <Link to="/login">Faça login</Link>
                        </Typography.Paragraph>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </ContainerRegister>
    );
}