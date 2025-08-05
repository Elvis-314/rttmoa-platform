import ECharts from '@/components/Echarts';
import { ECOption } from '@/components/Echarts/config';
import man from '../../images/man.png';
import woman from '../../images/woman.png';
import './index.less';
import { useEffect, useRef } from 'react';

interface ChartProp {
	man: number;
	woman: number;
}
const MaleFemaleRatioChart: React.FC = () => {
	let data: ChartProp = {
		man: 0.6,
		woman: 0.4,
	};
	const option: ECOption = {
		xAxis: {
			type: 'value',
			show: false,
		},
		grid: {
			left: 0,
			top: '30px',
			bottom: 0,
			right: 0,
		},
		yAxis: [
			{
				type: 'category',
				position: 'left',
				data: ['男生'],
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
			},
			{
				type: 'category',
				position: 'right',
				data: ['女士'],
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false,
					padding: [0, 0, 40, -60],
					fontSize: 12,
					lineHeight: 60,
					color: 'rgba(255, 255, 255, 0.9)',
					formatter: '{value}' + data.woman * 100 + '%',
					rich: {
						a: {
							color: 'transparent',
							lineHeight: 30,
							fontFamily: 'digital',
							fontSize: 12,
						},
					},
				},
			},
		],
		series: [
			{
				type: 'bar',
				barWidth: 20,
				data: [data.man],
				z: 20,
				itemStyle: {
					borderRadius: 10,
					color: '#007AFE',
				},
				label: {
					show: true,
					color: '#E7E8ED',
					position: 'insideLeft',
					offset: [0, -20],
					fontSize: 12,
					formatter: () => {
						return `男士 ${data.man * 100}%`;
					},
				},
			},
			{
				type: 'bar',
				barWidth: 20,
				data: [1],
				barGap: '-100%',
				itemStyle: {
					borderRadius: 10,
					color: '#FF4B7A',
				},
				label: {
					show: true,
					color: '#E7E8ED',
					position: 'insideRight',
					offset: [0, -20],
					fontSize: 12,
					formatter: () => {
						return `女士 ${data.woman * 100}%`;
					},
				},
			},
		],
	};
	const dataSource: any[] = [
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
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},

		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park222222222222',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	];
	const scrollRef = useRef(null);

	useEffect(() => {
		const scrollContainer: any = scrollRef.current;
		if (!scrollContainer) return;

		let scrollStep = 1;
		let intervalId: any;

		const startScroll = () => {
			intervalId = setInterval(() => {
				if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
					// 滚动到底部后重置
					scrollContainer.scrollTop = 0;
				} else {
					scrollContainer.scrollTop += scrollStep;
				}
			}, 100); // 控制滚动速度
		};

		startScroll();

		// 鼠标悬停暂停滚动
		scrollContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
		scrollContainer.addEventListener('mouseleave', startScroll);

		return () => clearInterval(intervalId);
	}, []);
	return (
		<div className='ratio-main'>
			<div className='flex justify-center  text-[18px] text-green-400 font-bold'>实时入库任务状态</div>
			<div className='mt-[15px] w-full text-white font-mono'>
				<table className='w-full border-collapse'>
					<thead className=''>
						<tr className='hot-header'>
							<th className=''>索引</th>
							<th className=''>姓名</th>
							<th className=''>年龄</th>
							<th className=''>城市</th>
							<th className=''>标签</th>
						</tr>
					</thead>
				</table>

				{/* 滚动区域 */}
				<div className='max-h-[300px] overflow-y-auto' ref={scrollRef}>
					<table className='w-full border-collapse'>
						<tbody className=''>
							{dataSource.map((value: any, index: number) => (
								<tr key={index} className='text-center hot-header'>
									<td className='ellipsis'>{value.key}</td>
									<td className='ellipsis'>{value.name}</td>
									<td className='ellipsis'>{value.age}</td>
									<td className='ellipsis'>{value.address}</td>
									<td className='ellipsis'>{value.tags[0]}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MaleFemaleRatioChart;
