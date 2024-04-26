import {Card, ConfigProvider, DatePicker, Form, Space, Divider, Typography, Flex} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import locale from 'antd/locale/pt_BR';
import dayjs from 'dayjs';
import {Loading} from "@/components";
import 'dayjs/locale/pt-br';
import {useEffect, useState} from "react";
import {getResumo} from "@/redux/actions/declaracaoVenda";
import {TrophyTwoTone} from "@ant-design/icons";
import * as constants from "@/constants/declaracaoVenda";

const {Text} = Typography;

export default function ResumoAprovacao() {
	dayjs.locale('pt-br');
	const {usuario} = useSelector(state => state.login)
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const {resumo, loading} = useSelector(state => state.declaracaoVenda);
	const [dateDefault, setDateDefault] = useState(dayjs(dayjs().format('MMMM'), 'MMMM'));
	const [date, setDate] = useState(dayjs().format('YYYY-MM'));
	
	useEffect(() => {
		dispatch(getResumo(date, usuario.user_email));
	}, [date]);
	
	console.log(resumo)
	console.log(dateDefault)
	
	const onChangeDate = (date, dateString) => {
		setDate(dayjs(date.$d).format('YYYY-MM'));
		setDateDefault(dayjs(date.$d));
	};
	
	const Prize = ({resumo}) => {
		
		if (
			resumo.vendas_total >= resumo.premiacao?.premiacao1.quantidade &&
			resumo.vendas_total < resumo.premiacao?.premiacao2.quantidade
		) {
			return (
				<>
					<Text><TrophyTwoTone style={{fontSize: '30px'}} twoToneColor={'#F8CE4C'}/></Text>
					<Text>{`+${resumo.premiacao?.premiacao1.bonus}`}</Text>
				</>
			);
		} else if (
			resumo.vendas_total >= resumo.premiacao?.premiacao2.quantidade &&
			resumo.vendas_total < resumo.premiacao?.premiacao3.quantidade
		) {
			return (
				<>
					<Text><TrophyTwoTone style={{fontSize: '30px'}} twoToneColor={'#F8CE4C'}/></Text>
					<Text><TrophyTwoTone style={{fontSize: '30px'}} twoToneColor={'#F8CE4C'}/></Text>
					<Text>{`+${resumo.premiacao?.premiacao2.bonus}`}</Text>
				</>
			);
		} else if (
			resumo.vendas_total >= resumo.premiacao?.premiacao3.quantidade
		) {
			return (
				<>
					<Text><TrophyTwoTone style={{fontSize: '30px'}} twoToneColor={'#F8CE4C'}/></Text>
					<Text><TrophyTwoTone style={{fontSize: '30px'}} twoToneColor={'#F8CE4C'}/></Text>
					<Text><TrophyTwoTone style={{fontSize: '30px'}} twoToneColor={'#F8CE4C'}/></Text>
					<Text>{`+${resumo.premiacao?.premiacao3.bonus}`}</Text>
				</>
			);
		} else {
			return (<></>)
		}
	}
	
	return (
		<>
			<Loading spinning={loading}>
				
				<Form
					layout="vertical"
					initialValues={{
						requiredMarkValue: 'default',
					}}
					form={form}
					name="resumoAprovacao"
				>
					<Form.Item
						label="Mês de referência"
						name="referencia"
						rules={[
							{
								required: true,
							},
						]}
					>
						<ConfigProvider locale={locale}>
							<DatePicker
								picker={'month'}
								value={dateDefault}
								format={'MMMM'}
								allowClear
								style={{
									width: '100%',
								}}
								onChange={onChangeDate}
							/>
						</ConfigProvider>
					</Form.Item>
				</Form>
				
				{
					resumo.vendas_total < resumo.meta ?
						<Flex justify={'space-between'} align={'flex-start'}>
							<Space direction="horizontal">
								<Text>Meta online = {resumo.meta}</Text>
							</Space>
							<Space direction="horizontal">
								<Text><b>{resumo.vendas_total} vendas de {resumo.meta}</b></Text>
							</Space>
						</Flex> :
						<>
							<Flex justify={'space-between'} align={'flex-start'}>
								<Space direction="horizontal">
									<Text>Meta online = {resumo.meta}</Text>
								</Space>
								<Space direction="horizontal">
									<Prize resumo={resumo}/>
								</Space>
							</Flex>
							<br/>
							<Flex justify={'space-between'} align={'flex-start'}>
								<Text><b>{resumo.vendas_total} vendas de {resumo.meta}</b></Text>
								{
									resumo.vendas_total >= resumo.meta &&
									<Text><b>Meta Batida</b></Text>
								}
							</Flex>
						</>
				}
				<Divider/>
				<Space direction="vertical" className="w-100">
				{
					resumo?.vendas?.map((res, i) => (
						<>
							<Card
								key={i}
								title={`Cliente: ${res.cliente}`}
								className={"flex-nowrap"}
								size="small"
								style={{backgroundColor: constants.STATUS[res.status].colorCard, width: '100%'}}
							>
								<ul className={'pl-4'} style={{wordWrap: 'break-word'}}>
									<li key={`list1-${i}`}><p><b>Unidade:</b> {res.unidade}</p></li>
									<li key={`list2-${i}`}><p><b>Codigo do cliente:</b> {res.cod}</p></li>
									<li key={`list3-${i}`} ><p><b>Link:</b> {res.link}</p></li>
								</ul>
								<Divider/>
								<p style={{color: constants.STATUS[res.status].colorLabelStatus}}><b>Status:</b> {res?.motivo} </p>
							</Card>
							<Divider/>
						</>
					))
				}
				</Space>
			</Loading>
		</>
	)
}
