import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { UserLayout } from "../../Layouts/users.layout";
import { Input, Button, Form, Select, Card, Popconfirm } from "antd";
import { CountryType, UserType } from "../../enum/users.enum";
import type { User } from "../../dtos/users.dto";
import { ProfileTrader } from "./ProfileTrader";
import { ProfileHotelier } from "./ProfileHotalier";
import { showError, showSuccess, showWarning } from "../../utils/toastify";

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
    const [userPassword, setUserPassword] = useState<User>();
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "20px" }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="max-w-md mx-auto p-4 border rounded shadow"
                >
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>

                    <Form.Item label={`${userName}`} name="name">
                        <Input placeholder="new Name"/>
                    </Form.Item>

                    <Form.Item label={`${userEmail}`} name="email">
                        <Input placeholder="New email" />
                    </Form.Item>

                    <Form.Item label={`${userPassword && "**********"}`} name="password">
                        <Input placeholder="New password" />
                    </Form.Item>

                    <Form.Item label={`${userPhone}`} name="phone">
                        <Input placeholder="New Phone"/>
                    </Form.Item>

                    <Form.Item label={`${userCountry}`} name="country">
                        <Select placeholder="Select your new country">
                            {Object.values(CountryType).map((country) => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label={`${userType}`} name="typeUser">
                        <Select placeholder="Select your new type user">
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
                        <Card title="Registered Hotel" className="max-w-md mx-auto mt-6 shadow rounded border">
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
                        <Card title="Registered Trade" className="max-w-md mx-auto mt-6 shadow rounded border">
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
