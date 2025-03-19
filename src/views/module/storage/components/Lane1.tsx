import React from 'react'
import { Space, Table, Tag, Tooltip } from 'antd'
import type { TableProps } from 'antd'
import './index.less'

// ! http://localhost:9527/#/module/storage

interface DataType {
	key?: string
	lane: number
	row: number
	layer: number
	column1: number
	column2: number
	column3: number
	column4: number
	column5: number
	column6: number
	column7: number
	column8: number
	column9: number
	column10: number
	column11: number
}

function titleFN(data: string, record?: any, index?: number) {
	// console.log('titleFN', data, record, index)
	if (!data) return null
	const lane = record?.lane ?? ''
	const row = record?.row ?? ''
	const layer = record?.layer ?? ''
	const str = `${row}排 - ${layer}层 - ${data}列`

	return (
		<Tooltip
			placement="top"
			color="#fff"
			title={
				<table className="w-full border-collapse  text-slate-700 ">
					<tr>
						<th className="w-[250px] text-[12px] text-center">货品名词</th>
						<th className="w-[150px] text-[12px] text-center">生产日期</th>
						<th className="w-[350px] text-[12px] text-center">在库整数总数</th>
					</tr>
					<tr>
						<td className="  text-[12px] text-center">食品火腿肠</td>
						<td className="  text-[12px] text-center">2020-11-19 12:32:00</td>
						<td className="w-[350px] text-[12px] text-center">500箱0根</td>
					</tr>
				</table>
			}>
			{str}
		</Tooltip>
	)
}

let rawData: any[] = []
for (let w = 1; w < 2; w++) {
	// 巷道
	for (let i = 1; i < 3; i++) {
		// 排
		for (let j = 1; j < 4; j++) {
			// 列
			for (let k = 1; k < 5; k++) {
				// 层
				const res = `第${i}排 ${j}列 ${k}层`
				console.log(res)
				let obj = {}
				if (j == 1) Object.assign(obj, { column1: j })
				if (j == 2) Object.assign(obj, { column2: j })
				if (j == 3) Object.assign(obj, { column3: j })
				rawData.push({
					key: res,
					lane: w, // 巷道
					row: i, // 排
					column: j, // 列
					layer: k, // 层
					...obj,
				})
			}
		}
	}
}
// console.log('货位 rawData：', rawData)
// !  这个数组，lane相同合并行，row一样合并行，该如何处理这个数组？

// 📌 1️⃣ 处理数据，把 column1 ~ columnN 结构整理好
const groupedData: any[] = []

rawData.forEach(item => {
	const { lane, row, layer, column } = item
	const key = `第${lane}巷道 - ${row}排 - ${layer}层`

	let existing = groupedData.find(d => d.key === key)
	if (!existing) {
		existing = {
			key,
			lane,
			row,
			layer,
			column1: null,
			column2: null,
			column3: null,
			// ...item,
		}
		groupedData.push(existing)
	}

	// 按列号填充 column1 ~ columnN
	existing[`column${column}`] = column
	// console.log(existing)
})

console.log('货位 rawData：', rawData)

console.log('初始 groupedData', groupedData)

// 📌 2️⃣ 处理 rowSpan，合并相同行
const rowSpanMap = new Map<string, number>()
groupedData.forEach((item, index) => {
	const key = `${item.lane}-${item.row}-${item.layer}`
	if (!rowSpanMap.has(key)) {
		rowSpanMap.set(key, groupedData.filter(d => d.lane === item.lane && d.row === item.row && d.layer === item.layer).length)
	}
})
console.log('合并行 rowSpanMap', rowSpanMap)

// http://localhost:9527/#/module/storage
const columns: TableProps<DataType>['columns'] = [
	{
		title: 'RowHead',
		dataIndex: 'key',
		// rowScope: 'row', //* title
		width: 120,
		fixed: 'left',
	},
	{
		title: '巷道',
		dataIndex: 'lane',
		key: 'lane',
		width: 50,
		// onCell: (record, index) => {
		// 	return {
		// 		rowSpan: index === 0 || groupedData[index as any]?.lane !== record.lane ? rowSpanMap.get(`${record.lane}-${record.row}-${record.layer}`) : 0,
		// 	}
		// },
	},
	{
		title: '排',
		dataIndex: 'row',
		key: 'row',
		width: 50,
	},
	{
		title: '层',
		dataIndex: 'layer',
		key: 'layer',
		width: 50,
	},
	{
		title: '第1列',
		dataIndex: 'column1',
		key: 'column1',
		render: (value, record, index) => titleFN(value, record, index),
	},
	{
		title: '第2列',
		dataIndex: 'column2',
		key: 'column2',
		render: (value, record, index) => titleFN(value, record, index),
	},
	{
		title: '第3列',
		dataIndex: 'column3',
		key: 'column3',
		render: (value, record, index) => titleFN(value, record, index),
	},
	{
		title: '第4列',
		dataIndex: 'column4',
		key: 'column4',
		render: (value, record, index) => titleFN(value, record, index),
	},
	{
		title: '第5列',
		dataIndex: 'column5',
		key: 'column5',
	},
	{
		title: '第6列',
		dataIndex: 'column6',
		key: 'column6',
	},
]
console.log('columns length', columns.length)

const Lane: React.FC = () => {
	console.log('巷道一')
	let Header = (
		<div className="flex">
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-slate-100">空库位</div>
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-pink-300">预占用库位</div>
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-green-400">有库存库位</div>
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-slate-100 text-red-500">选中库位</div>
		</div>
	)
	return (
		<Table<DataType>
			className="cusTable"
			title={() => Header}
			columns={columns}
			dataSource={groupedData}
			// scroll={{ x: "max-content" }}
			scroll={{ x: columns.length * 150 }}
			pagination={false}
		/>
	)
}

export default Lane
