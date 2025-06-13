import { Card, Col, Row, Statistic } from "antd";
import {
	UserOutlined,
	TeamOutlined,
	ShopOutlined,
} from "@ant-design/icons";
import { AdminLayout } from "../../../Layouts/admin.layout";

export function DashboardAdmin() {
	const counts = {
		hoteliers: 15,
		visitors: 87,
		traders: 32,
	};

	return (
		<AdminLayout>
			<h2 style={{ marginBottom: 24 }}>Visão Geral do Sistema</h2>
			<Row gutter={[24, 24]}>
				<Col xs={24} sm={12} md={8}>
					<Card bordered hoverable>
						<Statistic
							title="Hoteliers registrados"
							value={counts.hoteliers}
							prefix={<ShopOutlined />}
						/>
					</Card>
				</Col>

				<Col xs={24} sm={12} md={8}>
					<Card bordered hoverable>
						<Statistic
							title="Visitors registrados"
							value={counts.visitors}
							prefix={<UserOutlined />}
						/>
					</Card>
				</Col>

				<Col xs={24} sm={12} md={8}>
					<Card bordered hoverable>
						<Statistic
							title="Traders registrados"
							value={counts.traders}
							prefix={<TeamOutlined />}
						/>
					</Card>
				</Col>
			</Row>
		</AdminLayout>
	);
}
