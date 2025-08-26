import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Popconfirm, Switch, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export const TableColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<any>[] => {
	const detail = (entity: any) => {
		modalOperate('detail', entity);
	};
	const onChange = (event: any) => {
		// console.log(event.target.value);
	};
	return [
		{
			title: '岗位名称',
			dataIndex: 'postName',
			copyable: true, // 表格数据可复制？
			width: 150,
			fixed: 'left', // 固定？
			tooltip: '用户的名字',
			onFilter: false, // 筛选？
			fieldProps: {
				placeholder: '请输入岗位名称',
			},
			// hideInSearch: true, // 搜索 Search
			// hideInTable: true, // 在 Table 中不展示此列
			// hideInForm: true, // 在 Form 中不展示此列
			// hideInSetting: true, // 在 Setting 中
			// hideInDescriptions: true, // 详情中
			ellipsis: true,
			sorter: true, // 排序
			// readonly: true,
			render: (dom, entity) => {
				return (
					<Link to={''} onClick={() => detail(entity)}>
						{dom}
					</Link>
				);
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			filterDropdown: () => (
				<div style={{ padding: 4 }}>
					<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入' onChange={onChange} />
				</div>
			),
			filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			// fieldProps: (form, config) => {
			// 	console.log('form, config', form, config);
			// }, // 查询表单的 props，会透传给表单项，
		},
		{
			title: '岗位排序',
			dataIndex: 'postSort',
			// width: 150,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入岗位排序',
			},
		},
		{
			title: '岗位状态',
			dataIndex: 'status',
			sorter: true,
			tooltip: '指代用户的年纪大小',
			// filters: [
			// 	{ text: '启用', value: '启用' },
			// 	{ text: '停用', value: '停用' },
			// ],
			fieldProps: {
				placeholder: '请输入岗位状态',
			},
			render: (dom, entity) => {
				if (dom == '启用') return <Tag color='blue'>启用</Tag>;
				if (dom == '停用') return <Tag color='red'>停用</Tag>;
			},
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			hideInForm: true, // * hideInForm 在Form中不展示此列, 不可搜索
			filters: true,
			onFilter: true,
			hideInSearch: true,
			render: (dom: any, entity) => {
				const time = dayjs(dom).format('YYYY-MM-DD HH:mm:ss');
				return <span>{time}</span>;
			},
		},
		{
			title: '操作',
			key: 'option',
			fixed: 'right',
			width: 50,
			hideInSearch: true,
			render: (data, entity) => action(entity, modalOperate, modalResult),
		},
	];
};

const action = (entity: any, modalOperate: any, modalResult: any) => {
	const OnView = () => {
		modalOperate('detail', entity);
	};
	const OnEdit = () => {
		modalOperate('edit', entity);
	};
	const OnDelete = () => {
		modalResult('delete', entity);
	};
	const menuList = [
		{
			key: '1',
			label: (
				<Button key='view' type='link' size='small' icon={<EyeOutlined />} onClick={OnView}>
					查看
				</Button>
			),
		},
		{
			key: '2',
			label: (
				<Button key='edit' type='link' size='small' icon={<EditOutlined />} onClick={OnEdit}>
					编辑
				</Button>
			),
		},
		{
			key: '3',
			label: (
				<Popconfirm
					title='删除任务！'
					description={`你确定要删除： ${entity.postName}`}
					onConfirm={OnDelete}
					okText='确认'
					cancelText='取消'
					placement='top'
					trigger='hover'
				>
					<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];
	return [
		<div className='more-button' key={1}>
			<Dropdown
				menu={{
					items: menuList,
				}}
				placement='bottom' // bottom
				arrow={{ pointAtCenter: true }}
				trigger={['click']}
			>
				<div className='more-button-item'>
					<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
				</div>
			</Dropdown>
		</div>,
	];
};
export default TableColumnsConfig;
