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
	let data: any[] = [
		{ value: 200, name: '10岁以下', percentage: '16%' },
		{ value: 110, name: '10 - 18岁', percentage: '8%' },
		{ value: 150, name: '18 - 30岁', percentage: '12%' },
		{ value: 310, name: '30 - 40岁', percentage: '24%' },
		{ value: 250, name: '40 - 60岁', percentage: '20%' },
		{ value: 260, name: '60岁以上', percentage: '20%' },
	];

	const colors = ['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA'];

	const option: ECOption = {
		color: colors,
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: '{b} <br/>占比：{d}%',
		},
		legend: {
			orient: 'vertical',
			right: '-120px',
			top: '10px',
			itemGap: 15,
			itemWidth: 12,
			formatter: function (name: string) {
				let text = '';
				data.forEach((val: ChartProp) => {
					if (val.name === name) text = ' ' + name + '　 ' + val.percentage;
				});
				return text;
			},
			textStyle: { color: '#fff' },
		},
		grid: { top: 'bottom', left: 10, bottom: 10 },
		series: [
			{
				zlevel: 1,
				name: '年龄比例',
				type: 'pie',
				selectedMode: 'single',
				radius: [50, 90],
				center: ['35%', '50%'],
				startAngle: 60,
				label: {
					position: 'inside',
					show: true,
					color: '#fff',
					formatter: function (params) {
						return (params.data as ChartProp).percentage;
					},
					rich: {
						b: {
							fontSize: 16,
							lineHeight: 30,
							color: '#fff',
						},
					},
				},
				itemStyle: {
					shadowColor: 'rgba(0, 0, 0, 0.2)',
					shadowBlur: 10,
				},
				data: data.map((val: ChartProp, index: number) => {
					return {
						value: val.value,
						name: val.name,
						percentage: val.percentage,
						itemStyle: {
							borderWidth: 10,
							shadowBlur: 20,
							borderColor: colors[index],
							borderRadius: 10,
						},
					};
				}),
			},
			{
				name: '',
				type: 'pie',
				selectedMode: 'single',
				radius: [50, 90],
				center: ['35%', '50%'],
				startAngle: 20,
				data: [
					{
						value: 1000,
						name: '',
						label: {
							show: true,
							formatter: '{a|本日总数}',
							rich: {
								a: {
									align: 'center',
									color: 'rgb(98,137,169)',
									fontSize: 12,
								},
							},
							position: 'center',
						},
					},
				],
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
			<div className='flex flex-row justify-stretch'>
				<div className='w-full h-[180px] ml-[10px] '>
					<ECharts option={option} isResize={false} height={160} />
				</div>
				<div className='w-full h-[180px] ml-[10px]'>
					<ECharts option={option} isResize={false} />
				</div>
			</div>

			<div className='mt-4 flex justify-center font-mono text-[18px] text-green-500 font-black'>库龄最久物料 Top</div>
			<table className='w-full text-white border-collapse font-mono'>
				<thead className='w-full hot-header'>
					<tr className=''>
						<th>索引</th>
						<th>姓名</th>
						<th>年龄</th>
						<th>城市</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{dataSource.map((value: any) => {
						return (
							<tr className='py-2'>
								<td>{value.key}</td>
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
