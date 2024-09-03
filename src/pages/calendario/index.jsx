import React, { useState } from 'react';
import { Calendar, Button, theme, Divider } from 'antd';
import { ConfirmModal } from './confirmModal';

export default function Calendario() {
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const [dataSelecionado, setDataSelecionado] = useState(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const [modalidadeSelecionada, setModalidadeSelecionada] = useState(null);
    const [open, setOpen] = useState(false);
    const [aulasMarcadas] = useState([
        {
            id: 1,
            aula: 'Spinning',
            dataHora: '2024-09-05T08:00:00',
            instrutor: 'João Silva',
        },
        {
            id: 2,
            aula: 'Yoga',
            dataHora: '2024-09-05T10:00:00',
            instrutor: 'Maria Fernandes',
        },
        {
            id: 3,
            aula: 'Crossfit',
            dataHora: '2024-09-06T18:00:00',
            instrutor: 'Carlos Oliveira',
        },
        {
            id: 4,
            aula: 'Pilates',
            dataHora: '2024-09-06T19:00:00',
            instrutor: 'Ana Souza',
        },
        {
            id: 5,
            aula: 'Zumba',
            dataHora: '2024-09-07T09:00:00',
            instrutor: 'Fernanda Lima',
        },
    ]);

    const modalidadesDisponiveis = {
        '01': ['Spinning', 'Yoga'],
        '02': ['Crossfit', 'Pilates'],
        '03': ['Zumba', 'Spinning'],
        '04': ['Yoga', 'Pilates'],
        '05': ['Crossfit', 'Zumba'],
        '06': ['Spinning', 'Crossfit'],
        '07': ['Yoga', 'Pilates'],
        '08': ['Zumba', 'Spinning'],
        '09': ['Yoga', 'Crossfit'],
        '10': ['Pilates', 'Zumba']
    };

    const { token } = theme.useToken();

    const onPanelChange = (value) => {
        const data = value.format('YYYY-MM-DD');
        setDataSelecionado(data);

        const diaSelecionado = value.format('DD');
        setDiaSelecionado(diaSelecionado);
        setHorarioSelecionado(null);
        setModalidadeSelecionada(null);
    };

    const wrapperStyle = {
        width: '100%',
        maxWidth: '400px',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const disabledDate = (current) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Definir a hora para o início do dia
        return current && current.toDate() < today;
    };

    const horariosDisponiveis = {
        '03': ['09:00', '10:00', '10:40', '15:00', '16:30'],
        '04': ['08:30', '11:00', '11:30', '14:00', '17:00'],
        '05': ['09:30', '10:30', '12:00', '15:30', '18:00'],
        '06': ['08:00', '10:00', '13:30', '16:00', '19:00'],
        '07': ['09:00', '11:00', '14:00', '17:30', '20:00'],
        '08': ['09:00', '11:00', '14:00', '17:30', '20:00'],
        '09': ['09:00', '11:00', '14:00', '17:30', '20:00'],
        10: ['09:00', '11:00', '14:00', '17:30', '20:00'],
    };

    const handleHorarioClick = (horario) => {
        setHorarioSelecionado(horario);
        setOpen(true);
    };

    const aulasDoDia = aulasMarcadas.filter(
        (aula) => aula.dataHora.startsWith(dataSelecionado)
    );

    return (
        <div>
            <div>
                <p className="text-large">
                    Deseja marcar sua aula dessa semana na unidade XXXXXXXXXXXXXXX?
                </p>
            </div>
            <div className="d-flex justify-center">
                <div style={wrapperStyle}>
                    <Calendar
                        locale="pt_BR"
                        style={{ backgroundColor: 'transparent' }}
                        mode="month"
                        fullscreen={false}
                        onSelect={onPanelChange}
                        className=""
                        disabledDate={disabledDate}
                    />
                </div>
            </div>

            {diaSelecionado && (
                <div className="mt-4">
                    <p>Escolha a modalidade de aula para o dia {diaSelecionado}:</p>
                    <div className="d-grid grid-cols-3 flex-column align-center gap-2 mt-2">
                        {modalidadesDisponiveis[diaSelecionado]?.map((modalidade) => (
                            <Button
                                key={modalidade}
                                className={`btn py-2 w-full ${
                                    modalidade === modalidadeSelecionada
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                }`}
                                onClick={() => setModalidadeSelecionada(modalidade)}
                            >
                                {modalidade}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {modalidadeSelecionada && (
                <>
                    <div className="mt-4">
                        <p>
                            Escolha um horário para a modalidade {modalidadeSelecionada} no dia{' '}
                            {diaSelecionado}:
                        </p>
                        <div className="d-grid grid-cols-3 flex-column align-center gap-2 mt-2">
                            {horariosDisponiveis[diaSelecionado]?.map((horario) => (
                                <Button
                                    key={horario}
                                    className={`btn py-2 w-full ${
                                        horario === horarioSelecionado
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                    }`}
                                    onClick={() => handleHorarioClick(horario)}
                                >
                                    {horario}
                                </Button>
                            ))}
                        </div>
                    </div>
                </>
            )}
            <Divider />
            {aulasDoDia.length > 0 && (
                <div className="mt-4">
                    <p className="text-large">Aulas marcadas para o dia {diaSelecionado}:</p>
                    <ul className="mt-4">
                        {aulasDoDia.map((aula) => (
                            <>
                                <li key={aula.id} className="flex flex-column text-large">
                                    Aula: {aula.aula}; <br />
                                    Horário:{' '}
                                    {new Date(aula.dataHora).toLocaleTimeString('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                    <br />
                                    Instrutor: {aula.instrutor}
                                </li>
                                <Divider />
                            </>
                        ))}
                    </ul>
                </div>
            )}

            {open && (
                <ConfirmModal
                    open={open}
                    setOpen={setOpen}
                    choosedDateTime={dataSelecionado}
                    choosedHour={horarioSelecionado}
                    setAulasMarcadas={() => {}}
                />
            )}
        </div>
    )
}
