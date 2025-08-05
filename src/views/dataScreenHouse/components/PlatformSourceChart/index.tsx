import React from 'react';
import ECharts from '@/components/Echarts';
import { ECOption } from '@/components/Echarts/config';
import { ranking1, ranking2, ranking3, ranking4 } from './icons/ranking';
import './index.less';
import { Col, Row, Space, Table, TableProps, Tag } from 'antd';

interface ChartProp {
	name: string;
	value: number;
	percentage: string;
	maxValue: number;
}

const HotPlateChart: React.FC = () => {
	const data = [
		{
			value: 79999,
			name: '峨眉山',
			percentage: '80%',
			maxValue: 100000,
		},
		{
			value: 59999,
			name: '稻城亚丁',
			percentage: '60%',
			maxValue: 100000,
		},
		{
			value: 49999,
			name: '九寨沟',
			percentage: '50%',
			maxValue: 100000,
		},
		{
			value: 39999,
			name: '万里长城',
			percentage: '40%',
			maxValue: 100000,
		},
		{
			value: 29999,
			name: '北京故宫',
			percentage: '30%',
			maxValue: 100000,
		},
	];

	const colors = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

	var ROOT_PATH = 'https://echarts.apache.org/examples';
	const weatherIcons = {
		Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
		Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
		Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png',
	};
	const option: any = {
		// title: {
		// 	text: 'Weather Statistics',
		// 	subtext: 'Fake Data',
		// 	left: 'center',
		// },
		// tooltip: {
		// 	trigger: 'item',
		// 	formatter: '{a} <br/>{b} : {c} ({d}%)',
		// },
		legend: {
			bottom: 10,
			left: 'center',
			data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE'],
			selectorLabel: { color: '#fff', backgroundColor: '#259645', padding: 20 },
			textStyle: { color: '#fff' },
		},
		series: [
			{
				type: 'pie',
				radius: '45%',
				center: ['50%', '40%'],
				selectedMode: 'single',
				data: [
					{ value: 735, name: 'CityC', color: '#eee' },
					{ value: 510, name: 'CityD' },
					{ value: 434, name: 'CityB' },
					{ value: 335, name: 'CityA' },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						// shadowColor: 'rgba(0, 0, 0, 0.5)',
						shadowColor: 'rgba(234, 212, 228)',
					},
				},
			},
		],
	};
	const option2: ECOption = {
		grid: {
			top: '5%',
			left: '7%',
			right: '4%',
			bottom: '1%',
			containLabel: true,
		},
		xAxis: {
			type: 'value',
			axisLine: {
				show: false,
				lineStyle: {
					color: 'white',
				},
			},
			nameGap: 1,
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
				fontSize: 16,
			},
			triggerEvent: false,
		},
		yAxis: [
			{
				show: true,
				data: data.map((val: ChartProp) => val.name),
				inverse: true,
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					color: '#fff',
					formatter: (value: string) => {
						let str = value.length > 6 ? value.slice(0, 6) + '...' : value;
						let index = data.map((item: ChartProp) => item.name).indexOf(value) + 1;
						return ['{' + (index > 3 ? 'lg' : 'lg' + index) + '|NO.' + index + '}', '{title|' + str + '}'].join(' ');
					},
					rich: {
						lg1: {
							width: 60,
							backgroundColor: {
								image: ranking1,
							},
							color: '#fff',
							align: 'center',
							height: 20,
							fontSize: 13,
						},
						lg2: {
							width: 60,
							backgroundColor: {
								image: ranking2,
							},
							color: '#fff',
							align: 'center',
							height: 20,
							fontSize: 13,
						},
						lg3: {
							width: 60,
							backgroundColor: {
								image: ranking3,
							},
							color: '#fff',
							align: 'center',
							height: 20,
							fontSize: 13,
						},
						lg: {
							width: 60,
							backgroundColor: {
								image: ranking4,
							},
							color: '#fff',
							align: 'center',
							height: 20,
							fontSize: 13,
						},
						title: {
							width: 60,
							fontSize: 13,
							align: 'center',
							padding: [0, 10, 0, 15],
						},
					},
				},
				triggerEvent: false,
			},
			{
				show: true,
				inverse: true,
				data,
				axisLabel: {
					fontSize: 14,
					color: '#fff',
					margin: 20,
					formatter: (value: number) => {
						return value >= 10000 ? (value / 10000).toFixed(2) + 'w' : value + '';
					},
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				triggerEvent: false,
			},
		],
		series: [
			{
				name: '条',
				type: 'bar',
				yAxisIndex: 0,
				data,
				barWidth: 12,
				itemStyle: {
					borderRadius: 30,
					color: function (params) {
						let num = colors.length;
						return colors[params.dataIndex % num];
					},
				},
				label: {
					show: true,
					position: [12, 0],
					lineHeight: 14,
					color: '#fff',
					formatter: params => {
						return (params.data as ChartProp).percentage;
					},
				},
			},
			{
				name: '框',
				type: 'bar',
				yAxisIndex: 1,
				data: data.map((val: ChartProp) => {
					if (!val.maxValue) return 5;
					return val.maxValue;
				}),
				barWidth: 18,
				itemStyle: {
					color: 'none',
					borderColor: '#00c1de',
					borderWidth: 1,
					borderRadius: 15,
				},
				silent: true,
			},
		],
	};

	interface DataType {
		key: string;
		name: string;
		age: number;
		address: string;
		tags: string[];
	}

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a>{text}</a>,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (_, { tags }) => (
				<>
					{tags.map(tag => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<a>Invite {record.name}</a>
					<a>Delete</a>
				</Space>
			),
		},
	];
	const dataSource: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	];
	return (
		<React.Fragment>
			<div className='hot-echarts'>
				<div className='w-full ml-[40px] '>
					<ECharts option={option} isResize={false} height={140} />
				</div>
				<div className='w-full ml-[120px]'>
					<ECharts option={option} isResize={false} height={140} />
				</div>
			</div>
			<div className='flex justify-center  text-[18px] text-green-400 font-bold'>库龄最久物料 Top x</div>
			<table className='w-full text-white border-collapse font-mono'>
				<thead className=''>
					<tr className='hot-header'>
						<th>姓名</th>
						<th>年龄</th>
						<th>城市</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{dataSource.map((value: any) => {
						return (
							<tr className='hot-header'>
								<td>{value.name}</td>
								<td>{value.age}</td>
								<td>{value.address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default HotPlateChart;
