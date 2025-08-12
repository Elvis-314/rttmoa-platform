import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Popconfirm, Switch, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';

const TableColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<UserList>[] => {
	return [
		{
			title: '岗位名称',
			dataIndex: 'postName',
			copyable: true,
			// width: 150,
			fixed: 'left',
			tooltip: '用户的名字',
			// initialValue: 'zhangsan',
			onFilter: false,
			// hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,
			sorter: true,
			render: (dom, entity) => {
				return (
					<a
						href='javascript:void(0)'
						// className="divide-x-2"
						onClick={() => {
							// setCurrentRow(entity);
							// setShowDetail(true);
							modalOperate('detail', entity);
							// message.info(`点击了 ${entity.username}`);
						}}
					>
						{dom}
					</a>
				);
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			filterDropdown: () => (
				<div style={{ padding: 2 }}>
					<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入' />
				</div>
			),
			filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			fieldProps: (form, config) => {}, // 查询表单的 props，会透传给表单项，
		},
		{
			title: '岗位排序',
			dataIndex: 'postSort',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '岗位状态',
			dataIndex: 'status',
			sorter: true,
			tooltip: '指代用户的年纪大小',
			render: (dom, entity) => {
				if (dom == '1') return <Tag color='blue'>启用</Tag>;
				if (dom == '0') return <Tag color='red'>停用</Tag>;
			},
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			hideInForm: true, // * hideInForm 在Form中不展示此列, 不可搜索
			filters: true,
			onFilter: true,
			hideInSearch: true,
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

const action = (entity: UserList, modalOperate: any, modalResult: any) => {
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
				<Popconfirm title='删除任务！' description='你确定要删除这条任务?' onConfirm={OnDelete} okText='确认' cancelText='取消' placement='top' trigger='hover'>
					<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];
	return [
		<div className='more-button'>
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
