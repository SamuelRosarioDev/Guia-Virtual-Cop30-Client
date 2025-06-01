import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { api } from "./../../../services/api";
import type { Hotelier } from "../../../dtos/hoteliers.dto";

interface ProfileHotelierProps {
    infoHotelier: Hotelier;
    onFinishEdit: () => void;
}

export function ProfileHotelier({ infoHotelier, onFinishEdit }: ProfileHotelierProps) {
    const [form] = Form.useForm<Hotelier>();

    useEffect(() => {
        form.setFieldsValue(infoHotelier);
    }, [form, infoHotelier]);

    const onFinish = async (values: Hotelier) => {
        try {
            await api.put(`/hotelier/${values.idHotelier}`, values);
            message.success("Perfil de hoteleiro atualizado!");
            onFinishEdit();
        } catch (error) {
            console.error(error);
            message.error("Erro ao atualizar perfil de hoteleiro.");
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-6">
            <h2 className="text-xl font-bold mb-2">Perfil Hoteleiro</h2>

            <Form.Item label="Hotel Name" name="hotelName">
                <Input />
            </Form.Item>

            <Form.Item label="Quantity Occupied" name="quantityOccupied">
                <Input type="number" />
            </Form.Item>

            <Form.Item label="Total Quantity" name="totalQuantity">
                <Input type="number" />
            </Form.Item>

            <Form.Item label="CNPJ" name="cnpj">
                <Input />
            </Form.Item>

            <Form.Item label="CEP" name="cep">
                <Input />
            </Form.Item>

            <Form.Item name="idHotelier" hidden>
                <Input type="hidden" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
                Atualizar Hoteleiro
            </Button>
            <Button onClick={onFinishEdit} block className="mt-2">
                Cancelar
            </Button>
        </Form>
    );
}
