import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { UserLayout } from "../../../Layouts/users.layout";
import { Input, Button, Form, Select, Card, Popconfirm, Space, Row, Col } from "antd";
import { CountryType, UserType } from "../../../enum/users.enum";
import type { User } from "../../../dtos/users.dto";
import { ProfileTrader } from "./ProfileTrader";
import { ProfileHotelier } from "./ProfileHotalier";
import { showError, showSuccess, showWarning } from "../../../utils/toastify";

const { Option } = Select;

export function Profile() {
    const [form] = Form.useForm<User>();
    const [hasHotelier, setHasHotelier] = useState(false);
    const [hasTrader, setHasTrader] = useState(false);
    const [infoHotelier, setInfoHotelier] = useState<any>(null);
    const [infoTrader, setInfoTrader] = useState<any>(null);
    const [isEditingHotelier, setIsEditingHotelier] = useState(false);
    const [isEditingTrader, setIsEditingTrader] = useState(false);
    const [userName, setUserName] = useState<User>();
    const [userEmail, setUserEmail] = useState<User>();
    const [_userPassword, setUserPassword] = useState<User>();
    const [userCountry, setUserCountry] = useState<User>();
    const [userPhone, setUserPhone] = useState<User>();
    const [userType, setUserType] = useState<User>();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/auth/me");
                const userData = response.data;
                console.log(response);

                const responseHotelier = await api.get("/hotelier/");
                const userHotelier = responseHotelier.data.data.find((hotel: any) => hotel.userId === userData.idUser);

                if (userHotelier) {
                    setInfoHotelier(userHotelier);
                }

                if (userData.trader) {
                    const trader = userData.trader.idTrader;
                    const responseTrader = await api.get(`/trader/${trader}`);
                    setInfoTrader(responseTrader.data.data);
                }

                const { name, email, password, phone, country, typeUser, ...rest } = userData;
                form.setFieldsValue(rest);
                
                setUserName(name)
                setUserEmail(email)
                setUserPassword(password)
                setUserPhone(phone)
                setUserCountry(country)
                setUserType(typeUser)

                if (userData.typeUser === "HOTELIER") setHasHotelier(true);
                if (userData.typeUser === "TRADER") setHasTrader(true);
            } catch (error: any) {
                showError(error.response?.data?.message);

            }
        };

        fetchUserProfile();
    }, [form]);

    const onFinish = async (values: User) => {
        try {
            await api.put(`/user/${values.idUser}`, values);
            showSuccess("Perfil atualizado com sucesso!");
            window.location.reload();
        } catch (error: any) {
            showError(error.response?.data?.message);

        }
    };

    const deleteHotelier = async () => {
        try {
            await api.delete(`/hotelier/${infoHotelier.idHotelier}`);
            showSuccess("Registro Hoteleiro excluído com sucesso!");
            setHasHotelier(false);
            setInfoHotelier(null);
        } catch (error: any) {
            showError(error.response?.data?.message);

        }
    };

    const deleteTrader = async () => {
        try {
            await api.delete(`/trader/${infoTrader.idTrader}`);
            showWarning("Registro Comerciante excluído com sucesso!");
            setHasTrader(false);
            setInfoTrader(null);
        } catch (error: any) {
            console.error(error);
            showError(error.response?.data?.message);
        }
    };

    const deleteUser = async () => {
        const userId = form.getFieldValue("idUser");

        try {
            if (hasHotelier) {
                showWarning("Exclua primeiro o registro hoteleiro.");
                return;
            }
            if (hasTrader) {
                showWarning("Exclua primeiro o registro comerciante.");
                return;
            }

            await api.delete(`/user/${userId}`);
            showSuccess("User deleted Sucessiful");
            // Aqui pode redirecionar para tela de login ou home
        } catch (error: any) {
            showError(error.response?.data?.message);
        }
    };

return (
        <UserLayout>
            <Row gutter={24} style={{ padding: "24px" }}>
                <Col xs={24} lg={12}>
                    <Card
                        title="Editar Perfil"
                        bordered
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item label={`Nome: ${userName}`} name="name">
                                <Input placeholder="Novo nome" />
                            </Form.Item>

                            <Form.Item label={`Email: ${userEmail}`} name="email">
                                <Input placeholder="Novo email" />
                            </Form.Item>

                            <Form.Item label={`Senha`} name="password">
                                <Input.Password placeholder="Nova senha" />
                            </Form.Item>

                            <Form.Item label={`Telefone: ${userPhone}`} name="phone">
                                <Input placeholder="Novo telefone" />
                            </Form.Item>

                            <Form.Item label={`País: ${userCountry}`} name="country">
                                <Select placeholder="Selecione seu novo país">
                                    {Object.values(CountryType).map((country) => (
                                        <Option key={country} value={country}>
                                            {country}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label={`Tipo: ${userType}`} name="typeUser">
                                <Select placeholder="Selecione o novo tipo de usuário">
                                    {Object.values(UserType).map((type) => (
                                        <Option key={type} value={type}>
                                            {type}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="idUser" hidden>
                                <Input type="hidden" />
                            </Form.Item>

                            <Form.Item>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <Button type="primary" htmlType="submit" block>
                                        Atualizar
                                    </Button>
                                    <Popconfirm
                                        title="Tem certeza que deseja excluir o usuário?"
                                        onConfirm={deleteUser}
                                        okText="Sim"
                                        cancelText="Cancelar"
                                    >
                                        <Button danger block>
                                            Excluir Usuário
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Space direction="vertical" style={{ width: "100%" }} size="large">
                        {hasHotelier && infoHotelier && (
                            <Card
                                title="Registro Hoteleiro"
                                bordered
                                style={{ borderRadius: "12px", backgroundColor: "#fafafa" }}
                            >
                                {isEditingHotelier ? (
                                    <ProfileHotelier
                                        infoHotelier={infoHotelier}
                                        onFinishEdit={() => setIsEditingHotelier(false)}
                                    />
                                ) : (
                                    <>
                                        <p><strong>Nome do Hotel:</strong> {infoHotelier.hotelName}</p>
                                        <p><strong>Qtd. Ocupada:</strong> {infoHotelier.quantityOccupied}</p>
                                        <p><strong>Qtd. Total:</strong> {infoHotelier.totalQuantity}</p>
                                        <p><strong>CNPJ:</strong> {infoHotelier.cnpj}</p>
                                        <p><strong>CEP:</strong> {infoHotelier.cep}</p>
                                        <Space direction="vertical" style={{ width: "100%" }}>
                                            <Button type="primary" block onClick={() => setIsEditingHotelier(true)}>
                                                Editar
                                            </Button>
                                            <Popconfirm
                                                title="Deseja excluir este registro hoteleiro?"
                                                onConfirm={deleteHotelier}
                                                okText="Sim"
                                                cancelText="Cancelar"
                                            >
                                                <Button danger block>
                                                    Excluir Hotelier
                                                </Button>
                                            </Popconfirm>
                                        </Space>
                                    </>
                                )}
                            </Card>
                        )}

                        {hasTrader && infoTrader && (
                            <Card
                                title="Registro Comerciante"
                                bordered
                                style={{ borderRadius: "12px", backgroundColor: "#fafafa" }}
                            >
                                {isEditingTrader ? (
                                    <ProfileTrader
                                        infoTrader={infoTrader}
                                        onFinishEdit={() => setIsEditingTrader(false)}
                                    />
                                ) : (
                                    <>
                                        <p><strong>Nome da Loja:</strong> {infoTrader.storeName}</p>
                                        <p><strong>Tipo:</strong> {infoTrader.storeType}</p>
                                        <p><strong>CEP:</strong> {infoTrader.cep}</p>
                                        <Space direction="vertical" style={{ width: "100%" }}>
                                            <Button type="primary" block onClick={() => setIsEditingTrader(true)}>
                                                Editar
                                            </Button>
                                            <Popconfirm
                                                title="Deseja excluir este registro comerciante?"
                                                onConfirm={deleteTrader}
                                                okText="Sim"
                                                cancelText="Cancelar"
                                            >
                                                <Button danger block>
                                                    Excluir Trader
                                                </Button>
                                            </Popconfirm>
                                        </Space>
                                    </>
                                )}
                            </Card>
                        )}
                    </Space>
                </Col>
            </Row>
        </UserLayout>
    );
}
