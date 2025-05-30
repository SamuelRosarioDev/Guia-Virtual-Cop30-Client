import { Layout, Menu, theme } from "antd";
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from "@ant-design/icons";

const items = [
	{ key: "1", icon: <UserOutlined />, label: "User" },
	{ key: "2", icon: <VideoCameraOutlined />, label: "Video" },
	{ key: "3", icon: <UploadOutlined />, label: "Upload" },
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
				onBreakpoint={(broken) => console.log(broken)}
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
