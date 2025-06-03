import { useEffect } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { api } from "./../../../services/api";
import type { Trader } from "../../../dtos/traders.dto";
import { StoreType } from "../../../enum/trader.enum";

const { Option } = Select;

interface ProfileTraderProps {
    infoTrader: Trader;
    onFinishEdit: () => void;
}

export function ProfileTrader({ infoTrader, onFinishEdit }: ProfileTraderProps) {
    const [form] = Form.useForm<Trader>();

    useEffect(() => {
        form.setFieldsValue(infoTrader);
    }, [form, infoTrader]);

    const onFinish = async (values: Trader) => {
        try {
            await api.put(`/trader/${values.idTrader}`, values);
            message.success("Perfil de lojista atualizado!");
            onFinishEdit();
            window.location.reload();
        } catch (error) {
            console.error(error);
            message.error("Erro ao atualizar perfil de lojista.");
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-6">
            <h2 className="text-xl font-bold mb-2">Perfil Lojista</h2>

            <Form.Item label="Store Name" name="storeName">
                <Input />
            </Form.Item>

            <Form.Item label="Store Type" name="storeType">
                <Select placeholder="Select Store Type">
                    {Object.values(StoreType).map((type) => (
                        <Option key={type} value={type}>
                            {type}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="CPF" name="cpf">
                <Input />
            </Form.Item>

            <Form.Item label="CEP" name="cep">
                <Input />
            </Form.Item>

            <Form.Item label="Address" name="address">
                <Input />
            </Form.Item>

            <Form.Item name="idTrader" hidden>
                <Input type="hidden" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
                Atualizar Lojista
            </Button>
            <Button onClick={onFinishEdit} block className="mt-2">
                Cancelar
            </Button>
        </Form>
    );
}
