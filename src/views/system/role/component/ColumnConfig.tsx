import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Popconfirm, Switch, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';
import Link from 'antd/lib/typography/Link';

const TableColumnsConfig = (handleOperator: any): ProColumns<UserList>[] => {
	return [
		{
			title: '角色名称',
			dataIndex: 'role_name',
			// copyable: true,
			// width: 150,
			fixed: 'left',
			tooltip: '角色名称：role_name',
			// initialValue: 'zhangsan',
			onFilter: false,
			// hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,
			sorter: true,
			render: (dom, entity: any) => {
				return <Link onClick={() => handleOperator('detail', entity)}>{entity?.role_name}</Link>;
			},
		},
		{
			title: '权限字符',
			dataIndex: 'permission_str',
			tooltip: '权限字符： permission_str',
			filters: true,
			onFilter: true,
		},
		{
			title: '菜单分配',
			dataIndex: 'distribution',
			tooltip: '新建或编辑时体现菜单分配',
			filters: true,
			onFilter: true,
		},
		{
			title: '角色级别',
			dataIndex: 'level',
			tooltip: '角色级别： level',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色排序',
			dataIndex: 'sort',
			tooltip: '角色名称： sort',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色状态',
			dataIndex: 'status',
			tooltip: '角色状态： status',
			// width: 150,
			sorter: true,
			// render: (data, entity) => {
			// 	return <Switch value={data == '0' ? false : true} />;
			// },
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
			render: (data, entity) => action(entity, handleOperator),
		},
	];
};

const action = (entity: UserList, handleOperator: any) => {
	const OnView = () => {
		handleOperator('detail', entity);
	};
	const OnEdit = () => {
		handleOperator('edit', entity);
	};
	const OnDelete = () => {
		handleOperator('delete', entity);
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
				<Popconfirm title='删除任务！' description='你确定要删除这条任务?' onConfirm={OnDelete} okText='确认' cancelText='取消' placement='bottom' trigger='hover'>
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
				placement='bottom'
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
