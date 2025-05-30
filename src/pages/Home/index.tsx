import { Layout, Typography, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import imgAmazonia from "../../assets/bgImage.jpeg"

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export function Home() {
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header />

            <Content style={{
                backgroundImage: `url(${imgAmazonia})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: "50px 20px"
            }}>
                <div
                    style={{

                        zIndex: -1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "30px", // espaço entre os cards
                    }}
                >
                    <Card
                        style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffffcc",
                            padding: "30px",
                        }}
                    >
                        <div style={{ padding: "20px" }}>
                            <Title level={2} style={{ textAlign: "center" }}>
                                Welcome to COP30
                            </Title>

                            <Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
                                COP30 is an international conference dedicated to addressing
                                climate change, promoting sustainable development, and fostering
                                global cooperation. Join us in making a difference for our
                                planet's future.
                            </Paragraph>

                            <Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
                                Explore our platform to find resources, participate in events,
                                and connect with the global community working towards a sustainable
                                future.
                            </Paragraph>

                            <div style={{ marginTop: "30px", textAlign: "center" }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => navigate("/map")}
                                >
                                    Go to the Map
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card
                        style={{
                            height: "100%",
                            width: "100%",
                            maxWidth: "600px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffffcc",
                            padding: "30px",
                        }}
                    >
                        <div style={{ padding: "20px" }}>
                            <Title level={3} style={{ textAlign: "center" }}>
                                About This Project
                            </Title>

                            <Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
                                This project aims to assist visitors, hoteliers, and local
                                merchants in finding hotels and public places of interest.
                                By providing up-to-date information and an interactive map,
                                we help facilitate access to essential services and enhance
                                the experience for everyone involved in the COP30 event.
                            </Paragraph>
                            <div style={{ marginTop: "30px", textAlign: "center" }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => navigate("/map")}
                                >
                                    Go to the Map
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </Content>

            <Footer />
        </Layout>
    );
}
