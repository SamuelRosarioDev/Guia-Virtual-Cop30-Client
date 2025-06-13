import { useEffect } from "react";
import { Form, Input, Button, message, InputNumber } from "antd";
import { api } from "../../../../services/api";
import type { Hotelier } from "../../../../dtos/hoteliers.dto";
import { showError } from "../../../../utils/toastify";

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
            const auth = await api.get("/auth/me")
            const userId = auth.data.idUser

            await api.put(`/hotelier/${values.idHotelier}`, { ...values, userId });
            message.success("Perfil de hoteleiro atualizado!");
            onFinishEdit();
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            showError(error.response?.data?.message);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-6">
            <h2>Perfil Hoteleiro</h2>

            <Form.Item label="Hotel Name" name="hotelName">
                <Input />
            </Form.Item>

            <Form.Item label="Quantity Occupied" name="quantityOccupied">
                <InputNumber type="number" />
            </Form.Item>

            <Form.Item label="Total Quantity" name="totalQuantity">
                <InputNumber type="number" />
            </Form.Item>

            <Form.Item label="CNPJ" name="cnpj">
                <Input />
            </Form.Item>

            <Form.Item label="CEP" name="cep">
                <Input />
            </Form.Item>

            <Form.Item label="Iframe" name="linkMap">
                <Input />
            </Form.Item>
            <Form.Item label="Endereço" name="address" rules={[{ required: true, message: 'Informe o endereço' }]}>
                <Input />
            </Form.Item>

            <Form.Item name="userId" hidden>
                <Input type="hidden" />
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
