import { Layout, Menu, theme, Button } from "antd";
import {
	UserOutlined,
	AppstoreOutlined,
	SettingOutlined,
	TeamOutlined,
	BarChartOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const adminItems = [
	{
		key: "1",
		icon: <AppstoreOutlined />,
		label: <Link to="/admin/dashboard">Dashboard</Link>,
	},
	{
		key: "2",
		icon: <UserOutlined />,
		label: <Link to="/admin/userslist">Users</Link>,
	},
	{
		key: "3",
		icon: <TeamOutlined />,
		label: <Link to="/admin/traderlist">Traders</Link>,
	},
	{
		key: "4",
		icon: <BarChartOutlined />,
		label: <Link to="/admin/hotelierlist">Hotelier</Link>,
	},
	{
		key: "5",
		icon: <SettingOutlined />,
		label: <Link to="/admin/registerUser">Register User</Link>,
	},
    {
        key: "6",
        icon: <SettingOutlined />,
		label: <Link to="/admin/registerHotelierOrTrader">Register Hotelier/Trader</Link>,
    }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const navigate = useNavigate();

	const handleLogout = () => {
		// Aqui você pode limpar tokens/localStorage, etc.
		navigate("/log-in");
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header
				style={{
					background: "#001529",
					color: "#fff",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0 24px",
				}}
			>
				<h1 style={{ color: "#fff", margin: 0, fontSize: 20 }}>Admin Panel</h1>
				<Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
					Logout
				</Button>
			</Header>

			<Layout>
				<Sider
					width={220}
					style={{
						background: "#f0f2f5",
						borderRight: "1px solid #d9d9d9",
					}}
				>
					<Menu
						mode="inline"
						defaultSelectedKeys={["1"]}
						items={adminItems}
						style={{ height: "100%", borderRight: 0 }}
					/>
				</Sider>

				<Layout style={{ padding: "24px" }}>
					<Content
						style={{
							background: colorBgContainer,
							padding: 24,
							minHeight: 280,
							borderRadius: 8,
							boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
						}}
					>
						{children}
					</Content>

					<Footer style={{ textAlign: "center", marginTop: 32 }}>
						Admin Panel ©{new Date().getFullYear()} - System COP30
					</Footer>
				</Layout>
			</Layout>
		</Layout>
	);
}
