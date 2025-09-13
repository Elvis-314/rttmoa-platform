import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, MenuProps, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { TableRenderAction } from '@/components/TableAction';

export const TableColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<any>[] => {
	const renderStatusTag = (status: any) => {
		if (status === '启用') return <Tag color='blue'>启用</Tag>;
		if (status === '停用') return <Tag color='red'>停用</Tag>;
		return <span>{status}</span>;
	};
	return [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 40,
			fixed: 'left',
			align: 'center',
		},
		{
			title: '岗位名称',
			dataIndex: 'postName',
			// copyable: true, // 表格数据可复制？
			width: 150,
			fixed: 'left',
			align: 'center',
			tooltip: '岗位名称：postName',
			onFilter: false, // 筛选
			fieldProps: {
				placeholder: '请输入岗位名称',
			},
			// hideInSearch: true, // 在 Search 筛选栏中不展示
			// hideInTable: true, // 在 Table 中不展示此列
			// hideInForm: true, // 在 Form 中不展示此列
			// hideInSetting: true, // 在 Setting 中不展示
			// hideInDescriptions: true, // 在 Drawer 查看详情中不展示
			ellipsis: true, // 省略
			// tooltip: 'The title will shrink automatically if it is too long', // 省略提示
			sorter: true, // 排序
			// readonly: true,
			render: (dom, entity) => {
				return (
					<Link
						to={''}
						onClick={e => {
							e.preventDefault();
							modalOperate('detail', entity);
						}}
					>
						{dom}
					</Link>
				);
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			// filterDropdown: () => (
			// 	<div style={{ padding: 4 }}>
			// 		<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入岗位名称' onChange={onChange} />
			// 	</div>
			// ),
			// filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		},
		{
			title: '岗位排序',
			dataIndex: 'postSort',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入岗位排序',
			},
			ellipsis: true, // 省略
		},
		{
			title: '岗位状态',
			dataIndex: 'status',
			align: 'center',
			sorter: true,
			tooltip: '指代用户的年纪大小',
			// filters: [
			// 	{ text: '启用', value: '启用' },
			// 	{ text: '停用', value: '停用' },
			// ],
			fieldProps: {
				placeholder: '请输入岗位状态',
			},
			ellipsis: true, // 省略
			render: renderStatusTag,
		},
		{
			title: '运行状态',
			dataIndex: 'status',
			align: 'center',
			fieldProps: {
				placeholder: '请输入岗位状态',
			},
			valueEnum: {
				all: { text: '全部', status: 'Default' },
				close: { text: '关闭', status: 'Default' },
				1: { text: '运行中', status: 'Processing' },
				启用: { text: '已上线', status: 'Success' },
				停用: { text: '异常', status: 'Error' },
			},
			ellipsis: true, // 省略
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			valueType: 'dateRange',
			align: 'center',
			fieldProps: {
				placeholder: '选择日期',
			},
			ellipsis: true, // 省略
			render: (_, record) => {
				return <span>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>;
			},
		},
		{
			title: '操作',
			key: 'option',
			align: 'center',
			fixed: 'right',
			width: 135,
			tooltip: '按钮分别是：详情、编辑、删除',
			hideInSearch: true,
			// render: renderAction,
			render: (_, record) => TableRenderAction(record, modalOperate, modalResult),
		},
	];
};
export default TableColumnsConfig;
