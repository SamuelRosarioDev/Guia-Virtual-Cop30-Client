import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, InputNumber } from "antd";
import { ContainerRegister, FormWrapper, Box } from "./styles";
import { api } from "../../../services/api";
import axios from "axios";
import { showSuccess, showError, showLoading, updateToast } from "../../../utils/toastify";
import { Link, useNavigate } from "react-router-dom";

export function HotelierRegister() {
    const [form] = Form.useForm();
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchUser() {
            const toastId = showLoading("Loading user...");

            try {
                const { data } = await api.get("/auth/me", { withCredentials: true });
                setUserId(data.idUser);
                updateToast(toastId, data?.message, "success");
                form.setFieldsValue({ userId: data.idUser });
            } catch (error: any) {
                showError(error.response?.data?.message);
            }
        }
        fetchUser();
    }, [form]);

    const onFinish = async (values: any) => {
        try {
            const response = await api.post("/hotelier", values, {
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
                <Typography.Title>COP30 - Register Hotelier</Typography.Title>
                <Typography.Paragraph>
                    Fill out the form to register your hotel.
                </Typography.Paragraph>

                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    <Box>
                        <Form.Item
                            style={{ width: "100%" }}
                            label="Hotel Name"
                            name="hotelName"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Enter the name of the hotel" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%" }}
                            label="Total Rooms"
                            name="totalQuantity"
                            rules={[{ required: true, type: "number", min: 1 }]}
                        >
                            <InputNumber placeholder="Enter the total number of rooms" style={{ width: "100%" }} min={1} />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%" }}
                            label="Occupied Rooms"
                            name="quantityOccupied"
                            rules={[{ required: true, type: "number", min: 0 }]}
                        >
                            <InputNumber placeholder="Enter the number of occupied rooms" style={{ width: "100%" }} min={0} />
                        </Form.Item>
                    </Box>

                    <Box>
                        <Form.Item
                            style={{ width: "100%" }}
                            label="CNPJ"
                            name="cnpj"
                        >
                            <Input placeholder="Enter the hotel's CNPJ" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%" }}
                            label="CEP"
                            name="cep"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Enter the CEP" onBlur={handleCepBlur} />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%" }}
                            label="Address"
                            name="address"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Hotel address" readOnly />
                        </Form.Item>
                    </Box>

                    <Form.Item
                        style={{ width: "100%" }}
                        label="Link Map"
                        name="linkMap"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="iframe da loja" />
                    </Form.Item>

                    <Form.Item
                        label="User ID"
                        name="userId"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Seu ID de usuário" readOnly />
                    </Form.Item>

                    <Form.Item>
                        <Typography.Paragraph>
                            Already have an account? <Link to="/log-in">Click here</Link>
                        </Typography.Paragraph>

                        <Button type="primary" htmlType="submit" block>
                            Register Hotel
                        </Button>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </ContainerRegister>
    );
}
