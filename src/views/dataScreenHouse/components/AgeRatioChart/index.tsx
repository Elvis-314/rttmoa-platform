import ECharts from '@/components/Echarts';
import { ECOption } from '@/components/Echarts/config';
import './index.less';

interface ChartProp {
	value: number;
	name: string;
	percentage: string;
}

const AgeRatioChart: React.FC = () => {
	// There should not be negative values in rawData
	const rawData = [
		[100, 302, 301, 334, 390, 330, 320],
		[320, 132, 101, 134, 90, 230, 210],
		[220, 182, 191, 234, 290, 330, 310],
		[150, 212, 201, 154, 190, 330, 410],
		[820, 832, 901, 934, 1290, 1330, 1320],
	];
	const totalData: number[] = [];
	for (let i = 0; i < rawData[0].length; ++i) {
		let sum = 0;
		for (let j = 0; j < rawData.length; ++j) {
			sum += rawData[j][i];
		}
		totalData.push(sum);
	}
	const strArr = ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'];
	const strArr2 = ['Direct', 'Mail Ad'];
	const series: echarts.BarSeriesOption[] = strArr.map((name, sid) => {
		return {
			name,
			type: 'bar',
			stack: 'total',
			barWidth: '40%',
			label: {
				show: true,
				formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%',
			},
			data: rawData[sid].map((d, did) => (totalData[did] <= 0 ? 0 : d / totalData[did])),
			// data: [],
		};
	});

	const option: any = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999',
				},
			},
		},
		toolbox: {
			feature: {
				dataView: { show: true, readOnly: false },
				magicType: { show: true, type: ['line', 'bar'] },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		legend: {
			bottom: 10,
			data: ['Evaporation', 'Precipitation', 'Temperature'],
		},
		xAxis: [
			{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisPointer: {
					type: 'shadow',
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				name: 'Precipitation',
				min: 0,
				max: 250,
				interval: 50,
				axisLabel: {
					formatter: '{value} ml',
				},
			},
			{
				type: 'value',
				name: 'Temperature',
				min: 0,
				max: 25,
				interval: 5,
				axisLabel: {
					formatter: '{value} °C',
				},
			},
		],
		series: [
			{
				name: 'Evaporation',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value: number) {
						return (value as number) + ' ml';
					},
				},
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			},
			{
				name: 'Precipitation',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value: number) {
						return (value as number) + ' ml';
					},
				},
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
			},
			{
				name: 'Temperature',
				type: 'line',
				yAxisIndex: 1,
				tooltip: {
					valueFormatter: function (value: number) {
						return (value as number) + ' °C';
					},
				},
				data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
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
	];
	const status: any = [
		{
			'01': '空闲',
		},
		{
			'02': '正在入库',
		},
		{
			'03': '正在充电',
		},
	];
	return (
		<div className='h-full'>
			<table className='w-full text-white border-collapse font-mono'>
				<thead className='w-full hot-header'>
					<tr>
						<th>四项车号</th>
						<th>姓名</th>
						<th>年龄</th>
						<th>城市</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{dataSource.map((value: any) => {
						return (
							<tr className='hot-header'>
								<td>{value.key}</td>
								<td>{value.name}</td>
								<td>{value.age}</td>
								<td>{value.address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='flex justify-center  text-[18px]   font-black text-white'>
				{status.map((value: any) => {
					console.log('value', value['1#']);
					return (
						<div className='mt-[16px]'>
							<span>{value['01'] && <span>1#四项车 【 {<span className='text-[#a4ea30] font-bold text-[20px]'>{value['01']}</span>} 】</span>}</span>
							<span>{value['02'] && <span>2#四项车 【 {<span className='text-[#a4ea30] font-bold text-[20px]'>{value['02']}</span>} 】</span>}</span>
							<span>{value['03'] && <span>3#四项车 【 {<span className='text-[#a4ea30] font-bold text-[20px]'>{value['03']}</span>} 】</span>}</span>
						</div>
					);
				})}
			</div>
			<div className='flex justify-center  text-[18px]   font-bold text-green-400 mt-[30px] mb-[-40px]'>最近12小时三台四项车任务统计</div>
			<div className='w-full mt-[20px]'>
				<ECharts option={option} isResize={false} height={200} />
			</div>
		</div>
	);
};

export default AgeRatioChart;
