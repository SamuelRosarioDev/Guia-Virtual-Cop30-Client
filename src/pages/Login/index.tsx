import { Form, Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ContainerRegister, FormWrapper } from "./styles";
import { showSuccess, showError } from "../../utils/toastify"; // your toastify utils

export function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await api.post("/login", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Important for cookies
      });

      showSuccess("Login successful!");

      // Get user info to decide navigation route
      const { data } = await api.get("/auth/me", { withCredentials: true });

      if (data.typeUser === "TRADER") {
        try {
          await api.get(`/traders/${data.userId}`, { withCredentials: true });
          navigate("/dashboard"); // Trader exists → go to dashboard
          console.log("User is already a trader, redirecting to dashboard.");
        } catch {
          console.log("User is not a trader, redirecting to trader registration.");
          navigate("/register/traders"); // No trader → go to register
        }
      } else {
        console.log("User is not a trader, redirecting to dashboard.");
        navigate("/dashboard"); // Not a trader → dashboard
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Error logging in");
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

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
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
