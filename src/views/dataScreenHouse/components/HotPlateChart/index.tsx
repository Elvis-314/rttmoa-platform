import { Empty } from 'antd';
import './index.less';
import { useEffect, useRef } from 'react';

const MaleFemaleRatioChart: React.FC = () => {
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
			<div className='flex justify-center  text-[18px] text-green-400 font-bold'>实时出库任务状态</div>
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
							{dataSource.length != 0 ? (
								dataSource.map((value: any, index: number) => (
									<tr key={index} className='text-center hot-header'>
										<td className='ellipsis'>{value.key}</td>
										<td className='ellipsis'>{value.name}</td>
										<td className='ellipsis'>{value.age}</td>
										<td className='ellipsis'>{value.address}</td>
										<td className='ellipsis'>{value.tags[0]}</td>
									</tr>
								))
							) : (
								<div className='flex justify-center mt-[30px]'>
									<Empty description={<div className='text-[#fba926] text-[18px]'>暂无待入库托盘</div>} />
								</div>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MaleFemaleRatioChart;
