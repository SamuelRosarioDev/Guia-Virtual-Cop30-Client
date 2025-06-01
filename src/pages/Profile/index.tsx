import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { UserLayout } from "../../Layouts/users.layout";
import { Input, Button, Form, Select, message, Card, Popconfirm } from "antd";
import { CountryType, UserType } from "../../enum/users.enum";
import type { User } from "../../dtos/users.dto";
import { ProfileTrader } from "./ProfileTrader";
import { ProfileHotelier } from "./ProfileHotalier";

const { Option } = Select;

export function Profile() {
    const [form] = Form.useForm<User>();
    const [hasHotelier, setHasHotelier] = useState(false);
    const [hasTrader, setHasTrader] = useState(false);
    const [infoHotelier, setInfoHotelier] = useState<any>(null);
    const [infoTrader, setInfoTrader] = useState<any>(null);
    const [isEditingHotelier, setIsEditingHotelier] = useState(false);
    const [isEditingTrader, setIsEditingTrader] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/auth/me");
                const userData = response.data;

                if (userData.hotelier) {
                    const hotelier = userData.hotelier.idHotelier;
                    const responseHotelier = await api.get(`/hotelier/${hotelier}`);
                    setInfoHotelier(responseHotelier.data.data);
                }

                if (userData.trader) {
                    const trader = userData.trader.idTrader;
                    const responseTrader = await api.get(`/trader/${trader}`);
                    setInfoTrader(responseTrader.data.data);
                }

                form.setFieldsValue(userData);

                if (userData.typeUser === "HOTELIER") setHasHotelier(true);
                if (userData.typeUser === "TRADER") setHasTrader(true);
            } catch (error) {
                console.error(error);
                message.error("Erro ao carregar perfil.");
            }
        };

        fetchUserProfile();
    }, [form]);

    const onFinish = async (values: User) => {
        try {
            await api.put(`/user/${values.idUser}`, values);
            message.success("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error(error);
            message.error("Erro ao atualizar perfil.");
        }
    };

    const deleteHotelier = async () => {
        try {
            await api.delete(`/hotelier/${infoHotelier.idHotelier}`);
            message.success("Registro Hoteleiro excluído com sucesso!");
            setHasHotelier(false);
            setInfoHotelier(null);
        } catch (error) {
            console.error(error);
            message.error("Erro ao excluir registro hoteleiro.");
        }
    };

    const deleteTrader = async () => {
        try {
            await api.delete(`/trader/${infoTrader.idTrader}`);
            message.success("Registro Comerciante excluído com sucesso!");
            setHasTrader(false);
            setInfoTrader(null);
        } catch (error) {
            console.error(error);
            message.error("Erro ao excluir registro comerciante.");
        }
    };

    const deleteUser = async () => {
        const userId = form.getFieldValue("idUser");
        try {
            if (hasHotelier) {
                message.warning("Exclua primeiro o registro hoteleiro.");
                return;
            }
            if (hasTrader) {
                message.warning("Exclua primeiro o registro comerciante.");
                return;
            }
            await api.delete(`/user/${userId}`);
            message.success("Usuário excluído com sucesso!");
            // Aqui pode redirecionar para tela de login ou home
        } catch (error) {
            console.error(error);
            message.error("Erro ao excluir usuário.");
        }
    };

    return (
        <UserLayout>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "20px" }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="max-w-md mx-auto p-4 border rounded shadow"
                >
                    <h1 className="text-2xl font-bold mb-4">Perfil</h1>

                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Phone" name="phone">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Country" name="country">
                        <Select placeholder="Selecione o país">
                            {Object.values(CountryType).map((country) => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Type of User" name="typeUser">
                        <Select placeholder="Selecione o tipo de usuário">
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
                        <Button type="primary" htmlType="submit" block>
                            Update
                        </Button>
                        <Popconfirm title="Tem certeza que deseja excluir o usuário?" onConfirm={deleteUser}>
                            <Button danger block>
                                Delete User
                            </Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>

                <div>
                    {hasHotelier && infoHotelier && (
                        <Card title="Registro Hoteleiro" className="max-w-md mx-auto mt-6 shadow rounded border">
                            {isEditingHotelier ? (
                                <ProfileHotelier infoHotelier={infoHotelier} onFinishEdit={() => setIsEditingHotelier(false)} />
                            ) : (
                                <>
                                    <p><strong>Hotel name:</strong> {infoHotelier.hotelName}</p>
                                    <p><strong>Quantity Occupied:</strong> {infoHotelier.quantityOccupied}</p>
                                    <p><strong>Total Quantity:</strong> {infoHotelier.totalQuantity}</p>
                                    <p><strong>CNPJ:</strong> {infoHotelier.cnpj}</p>
                                    <p><strong>CEP:</strong> {infoHotelier.cep}</p>
                                    <Button type="primary" block onClick={() => setIsEditingHotelier(true)}>
                                        Editar
                                    </Button>
                                    <Popconfirm title="Tem certeza que deseja excluir o registro hoteleiro?" onConfirm={deleteHotelier}>
                                        <Button danger block>
                                            Delete Hotelier
                                        </Button>
                                    </Popconfirm>
                                </>
                            )}
                        </Card>
                    )}


                    {hasTrader && infoTrader && (
                        <Card title="Perfil Comerciante" className="max-w-md mx-auto mt-6 shadow rounded border">
                            {isEditingTrader ? (
                                <ProfileTrader infoTrader={infoTrader} onFinishEdit={() => setIsEditingTrader(false)} />
                            ) : (
                                <>
                                    <p><strong>Store name:</strong> {infoTrader.storeName}</p>
                                    <p><strong>Store Type:</strong> {infoTrader.storeType}</p>
                                    <p><strong>CEP:</strong> {infoTrader.cep}</p>
                                    <Button type="primary" block onClick={() => setIsEditingTrader(true)}>
                                        Editar
                                    </Button>
                                    <Popconfirm title="Tem certeza que deseja excluir o registro comerciante?" onConfirm={deleteTrader}>
                                        <Button danger block>
                                            Delete Trader
                                        </Button>
                                    </Popconfirm>
                                </>
                            )}
                        </Card>
                    )}

                </div>
            </div>
        </UserLayout>
    );
}
