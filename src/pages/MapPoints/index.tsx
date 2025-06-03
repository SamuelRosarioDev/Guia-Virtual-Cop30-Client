import { useState, useEffect } from "react";
import { UserLayout } from "../../Layouts/users.layout";
import { api } from "../../services/api";
import { Table } from "antd";

interface MapPoint {
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
    linkMap: string;  // ✅ já é o código do iframe completo
}

export function MapPoints() {
    const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
    const [selectedLinkMap, setSelectedLinkMap] = useState<string>(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7921736003254!2d-48.474958699999995!3d-1.2994965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a467007b4f40e1%3A0xac35eaf332ec53c1!2sDrogasil!5e0!3m2!1spt-BR!2sbr!4v1748819975719!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`);

    useEffect(() => {
        async function fetchMapPoints() {
            try {
                const response = await api.get("/trader");
                console.log(response.data.data);
                setMapPoints(response.data.data);
            } catch (error) {
                console.error("Error fetching map points:", error);
            }
        }

        fetchMapPoints();
    }, []);

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'storeName',
            key: 'storeName',
        },
        {
            title: 'Tipo',
            dataIndex: 'storeType',
            key: 'storeType',
        },
        {
            title: 'CEP',
            dataIndex: 'cep',
            key: 'cep',
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
        },
    ];

    return (
        <UserLayout>
            <div style={{ display: "flex" }}>
                <div dangerouslySetInnerHTML={{ __html: selectedLinkMap }} />

                <div style={{ width: '100%' }}>
                    <Table
                        dataSource={mapPoints}
                        columns={columns}
                        rowKey="idTrader"
                        pagination={{ pageSize: 5 }}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    console.log('Clicou no item:', record);
                                    if (record.linkMap) {
                                        setSelectedLinkMap(record.linkMap);
                                    } else {
                                        console.warn("linkMap não encontrado para este item.");
                                    }
                                },
                                style: { cursor: 'pointer' },
                            };
                        }}
                    />
                </div>
            </div>
        </UserLayout>
    );
}
