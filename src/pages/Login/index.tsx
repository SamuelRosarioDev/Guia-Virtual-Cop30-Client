import { Form, Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ContainerRegister, FormWrapper } from "./styles";
import { showSuccess, showError } from "../../utils/toastify";

interface LoginValues {
    email: string;
    password: string;
}

export function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: LoginValues) => {
        try {
            await api.post("/login", values, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            showSuccess("Login successful!");

            const { data } = await api.get("/auth/me", { withCredentials: true });
            console.log(data);
            if (data.hotelier || data.trader) {
                console.log("User already registered as hotelier or trader. Redirecting to dashboard.");
                navigate("/dashboard");
                return;
            }

            console.log("User is not a hotelier or trader yet. Redirecting to registration.");
            navigate(`/register/${data.typeUser.toLowerCase()}`);
        } catch (error: any) {
            //emite error do backend
            showError(error.response?.data?.message);
        }
    };

    return (
        <ContainerRegister>
            <FormWrapper>
                <Typography.Title>COP30 - Login</Typography.Title>
                <Typography.Paragraph>Enter your credentials to access.</Typography.Paragraph>

                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={
                        [
                            { required: true },
                            { min: 6, message: "Password must be at least 6 characters" }
                        ]
                    }>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Typography.Paragraph>Don't have an account yet? <Link to="/register">Click here</Link> </Typography.Paragraph>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>

                    </Form.Item>

                </Form>
            </FormWrapper>
        </ContainerRegister>
    );
}
