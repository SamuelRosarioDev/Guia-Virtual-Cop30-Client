import { Layout, Menu, theme } from "antd";
import {
	DashboardOutlined,
	ProfileOutlined,
	SearchOutlined,
	FireFilled,
	BankFilled
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const items = [
	{ key: "1", icon: <DashboardOutlined />, label: <Link to="/dashboard" >Dashboard</Link> },
	{ key: "2", icon: <ProfileOutlined />, label: <Link to="/profile" >Profile</Link> },
	{ key: "3", icon: <SearchOutlined />, label: <Link to="/map" >Find no map</Link> },
	{ key: "4", icon: <FireFilled />, label: <Link to="/events" >Events</Link> },
	{ key: "5", icon: <BankFilled />, label: <Link to="/banks" >Banks</Link> },
];

const { Header, Sider, Content, Footer} = Layout;

export function UserLayout({ children }: { children: React.ReactNode }) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onCollapse={(collapsed, type) => console.log(collapsed, type)}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={items}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ margin: "24px 16px 0" }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
}
