import { useState, useEffect } from "react";
import { UserLayout } from "../../../Layouts/users.layout";
import { api } from "../../../services/api";
import { Table } from "antd";

interface Trader {
    idTrader: string;
    storeName: string;
    storeType: string;
    address: string;
    cep: string;
    cnpj: string;
    cpf: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    linkMap: string;
}

interface Hotelier {
    idHotelier: string;
    hotelName: string;
    address: string;
    cep: string;
    cnpj: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    linkMap: string;
}

export function MapPoints() {
    const [traders, setTraders] = useState<Trader[]>([]);
    const [hoteliers, setHoteliers] = useState<Hotelier[]>([]);

    const [selectedLinkMap, setSelectedLinkMap] = useState<string>(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7921736003254!2d-48.474958699999995!3d-1.2994965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a467007b4f40e1%3A0xac35eaf332ec53c1!2sDrogasil!5e0!3m2!1spt-BR!2sbr!4v1748819975719!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`);

    useEffect(() => {
        async function fetchData() {
            try {
                const [tradersRes, hoteliersRes] = await Promise.all([
                    api.get("/trader"),
                    api.get("/hotelier"),
                ]);

                setTraders(tradersRes.data.data);
                setHoteliers(hoteliersRes.data.data);
            } catch (error) {
                console.error("Error fetching map points:", error);
            }
        }

        fetchData();
    }, []);

    const traderColumns = [
        { title: 'Name Trader', dataIndex: 'storeName', key: 'storeName' },
        { title: 'Type', dataIndex: 'storeType', key: 'storeType' },
        { title: 'CEP', dataIndex: 'cep', key: 'cep' },
    ];

    const hotelierColumns = [
        { title: 'Name Hotel', dataIndex: 'hotelName', key: 'hotelName' },
        { title: 'Type', key: 'type', render: () => 'Hotel' },
        { title: 'CEP', dataIndex: 'cep', key: 'cep' },
    ];

    return (
        <UserLayout>
            <div style={{ display: "flex", gap: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: selectedLinkMap }} />

                <div style={{ width: '100%' }}>
                    <h2>Traders</h2>
                    <Table
                        dataSource={traders}
                        columns={traderColumns}
                        rowKey="idTrader"
                        pagination={{ pageSize: 5 }}
                        onRow={(record) => ({
                            onClick: () => {
                                if (record.linkMap) {
                                    setSelectedLinkMap(record.linkMap);
                                } else {
                                    console.warn("linkMap não encontrado para este Trader.");
                                }
                            },
                            style: { cursor: 'pointer' },
                        })}
                    />

                    <h2 className="mt-4">Hoteliers</h2>
                    <Table
                        dataSource={hoteliers}
                        columns={hotelierColumns}
                        rowKey="idHotelier"
                        pagination={{ pageSize: 5 }}
                        onRow={(record) => ({
                            onClick: () => {
                                if (record.linkMap) {
                                    setSelectedLinkMap(record.linkMap);
                                } else {
                                    console.warn("linkMap não encontrado para este Hotelier.");
                                }
                            },
                            style: { cursor: 'pointer' },
                        })}
                    />
                </div>
            </div>
        </UserLayout>
    );
}
