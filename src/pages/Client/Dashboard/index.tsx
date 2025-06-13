import { UserLayout } from "../../../Layouts/users.layout";
import { Card, Typography, Button, Space, Progress, Statistic, Row, Col } from "antd";
import { EnvironmentOutlined, CompassOutlined, UserOutlined, ShopOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface StatsData {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

export function Dashboard() {
    const navigate = useNavigate();

    const totalUsers = 1000;
    const visitors = 300;
    const hoteliers = 45;
    const merchants = 75;

    const userStats: StatsData[] = [
        { title: "Visitors", value: visitors, icon: <UserOutlined />, color: "#1890ff" },
        { title: "Hoteliers", value: hoteliers, icon: <HomeOutlined />, color: "#52c41a" },
        { title: "Merchants", value: merchants, icon: <ShopOutlined />, color: "#faad14" },
    ];

    return (
        <UserLayout>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Typography.Title level={2}>
                    Welcome to the COP30 Dashboard
                </Typography.Title>

                <Typography.Paragraph>
                    Explore Belém during the COP30 event. Use our interactive map to discover tourist attractions, local businesses, and hotels. Navigate the city with ease and make the most of your visit.
                </Typography.Paragraph>

                <Card
                    title="Interactive Map"
                    extra={<EnvironmentOutlined />}
                    style={{ maxWidth: 600 }}
                >
                    <Typography.Text>
                        Access the interactive map to find key locations, plan your routes, and explore everything Belém has to offer during the COP30.
                    </Typography.Text>

                    <Button
                        type="primary"
                        icon={<CompassOutlined />}
                        style={{ marginTop: 16 }}
                        onClick={() => navigate('/map')}
                    >
                        Go to Map
                    </Button>
                </Card>

                <Row gutter={16}>
                    {userStats.map((stat) => (
                        <Col xs={24} sm={8} key={stat.title}>
                            <Card>
                                <Statistic
                                    title={stat.title}
                                    value={stat.value}
                                    prefix={stat.icon}
                                    valueStyle={{ color: stat.color }}
                                />
                                <Progress
                                    percent={Number(((stat.value / totalUsers) * 100).toFixed(1))}
                                    strokeColor={stat.color}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Card title="Impact of the Platform">
                    <Row gutter={16}>
                        <Col xs={24} sm={8}>
                            <Statistic title="Tourist Spots Mapped" value={120} />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic title="Hotels Listed" value={80} />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic title="Local Shops Added" value={100} />
                        </Col>
                    </Row>
                    <Typography.Paragraph style={{ marginTop: 16 }}>
                        Our platform helps tourists locate key attractions, find suitable accommodations, and discover local commerce efficiently.
                    </Typography.Paragraph>
                </Card>
            </Space>
        </UserLayout>
    );
}
