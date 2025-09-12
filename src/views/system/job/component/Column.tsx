import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, MenuProps, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export const TableColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<any>[] => {
	/**
	 * 渲染操作按钮
	 */
	const renderAction = (entity: any) => {
		const menuItems: MenuProps['items'] = [
			{
				key: 'view',
				label: (
					<Button type='link' size='small' icon={<EyeOutlined />} onClick={() => modalOperate('detail', entity)}>
						查看
					</Button>
				),
			},
			{
				key: 'edit',
				label: (
					<Button type='link' size='small' icon={<EditOutlined />} onClick={() => modalOperate('edit', entity)}>
						编辑
					</Button>
				),
			},
			{
				key: 'delete',
				label: (
					<Popconfirm
						title='删除任务！'
						description={`你确定要删除： ${entity.postName}`}
						onConfirm={() => modalResult('delete', entity)}
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

		return (
			<div className='more-button'>
				<Dropdown menu={{ items: menuItems }} placement='bottom' arrow={{ pointAtCenter: true }} trigger={['click']}>
					<div className='more-button-item'>
						<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
					</div>
				</Dropdown>
			</div>
		);
	};

	const renderAction2 = () => {
		return (
			<div className='flex flex-row justify-around'>
				<div className='  bg-green-400 w-[30px] h-[22px] flex justify-center items-center   rounded-md'>
					<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1060' width='16' height='16'>
						<path d='M512.048 768a224 224 0 1 1 0-448 224 224 0 0 1 0 448z m0-64a160 160 0 1 0 0-320 160 160 0 0 0 0 320z' p-id='1061' fill='#ffffff'></path>
						<path
							d='M674.992 706.944Q742.448 639.36 742.448 544q0-95.424-67.456-162.944Q607.408 313.6 512.048 313.6q-95.424 0-162.944 67.456Q281.648 448.64 281.648 544q0 95.424 67.456 162.944Q416.688 774.4 512.048 774.4q95.424 0 162.944-67.456z m-9.088-316.8q63.744 63.744 63.744 153.856t-63.744 153.856Q602.16 761.6 512.048 761.6t-153.856-63.744Q294.448 634.112 294.448 544t63.744-153.856Q421.936 326.4 512.048 326.4t153.856 63.744z m-271.488 36.16Q345.648 475.072 345.648 544t48.704 117.632Q443.184 710.4 512.048 710.4t117.632-48.768q48.768-48.704 48.768-117.632T629.68 426.24Q580.976 377.6 512.048 377.6t-117.632 48.704z m8.96 226.304Q358.448 607.616 358.448 544q0-63.616 44.992-108.608Q448.432 390.4 512.048 390.4q63.616 0 108.608 44.992 44.992 44.992 44.992 108.608 0 63.616-44.992 108.608Q575.664 697.6 512.048 697.6q-63.616 0-108.608-44.992z'
							p-id='1062'
							fill='#ffffff'
						></path>
						<path
							d='M512.048 896C323.248 896 154.224 783.232 5.488 561.856a32 32 0 0 1 0-35.712C154.288 304.704 323.248 192 512.048 192s357.824 112.704 506.56 334.144a32 32 0 0 1 0 35.712c-148.736 221.44-317.76 334.08-506.56 334.08z m0-64c159.872 0 306.752-94.784 441.216-288C818.8 350.72 671.92 256 512.048 256 352.24 256 205.36 350.784 70.832 544 205.36 737.216 352.24 832 512.048 832z'
							p-id='1063'
							fill='#ffffff'
						></path>
						<path
							d='M512.048 896C323.248 896 154.224 783.232 5.488 561.856a32 32 0 0 1 0-35.712C154.288 304.704 323.248 192 512.048 192s357.824 112.704 506.56 334.144a32 32 0 0 1 0 35.712c-148.736 221.44-317.76 334.08-506.56 334.08z m0-12.8q275.328 0 495.936-328.512 7.168-10.688 0-21.44Q787.376 204.8 512.048 204.8T16.112 533.312q-7.232 10.688 0 21.376Q236.72 883.2 512.048 883.2z m0-38.4q-247.424 0-451.776-293.504L55.152 544l5.12-7.296Q264.624 243.2 512.048 243.2t451.776 293.504l5.12 7.296-5.12 7.296Q759.472 844.8 512.048 844.8z m0-12.8c159.872 0 306.752-94.784 441.216-288C818.8 350.72 671.92 256 512.048 256 352.24 256 205.36 350.784 70.832 544 205.36 737.216 352.24 832 512.048 832z'
							p-id='1064'
							fill='#ffffff'
						></path>
					</svg>
				</div>
				<div className='bg-blue-500 w-[30px] h-[22px] flex justify-center items-center rounded-md'>
					<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1242' width='16' height='16'>
						<path
							d='M153.6 902.656a32.256 32.256 0 0 1 0-64h716.8a32.256 32.256 0 0 1 0 64zM743.936 151.04l72.192 72.192a51.2 51.2 0 0 1 0 72.192L358.4 751.616a51.2 51.2 0 0 1-36.352 14.848H226.816a25.6 25.6 0 0 1-25.6-25.6v-97.792a51.2 51.2 0 0 1 14.848-36.352l455.68-455.68a51.2 51.2 0 0 1 72.192 0z m-478.72 497.152v54.272h54.272l442.88-442.88L708.096 204.8z'
							fill='#ffffff'
							p-id='1243'
						></path>
					</svg>
				</div>
				<div className='bg-red-500 w-[30px] h-[22px] flex justify-center items-center rounded-md'>
					<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='881' width='16' height='16'>
						<path
							d='M885.312 213.312h-224a149.312 149.312 0 0 0-298.624 0h-224a37.312 37.312 0 0 0 0 74.56h37.312v597.312c0 41.216 33.408 74.688 74.688 74.688h522.688c41.216 0 74.752-33.344 74.752-74.688V288h37.248a37.312 37.312 0 1 0-0.064-74.688zM512 138.688c41.216 0 74.688 33.536 74.688 74.688H437.312c0-41.152 33.472-74.688 74.688-74.688z m261.312 746.624H250.688V288h522.688v597.312h-0.064z'
							p-id='882'
							fill='#ffffff'
						></path>
						<path
							d='M362.688 792c20.608 0 37.312-16.64 37.312-37.312V456a37.312 37.312 0 0 0-74.624 0v298.688a37.12 37.12 0 0 0 37.312 37.312z m149.312 0c20.608 0 37.312-16.64 37.312-37.312V456a37.312 37.312 0 1 0-74.624 0v298.688c0 20.608 16.704 37.312 37.312 37.312z m149.312 0c20.608 0 37.312-16.64 37.312-37.312V456a37.312 37.312 0 0 0-74.624 0v298.688c0 20.608 16.64 37.312 37.312 37.312z'
							p-id='883'
							fill='#ffffff'
						></path>
					</svg>
				</div>
			</div>
		);
	};
	/**
	 * 渲染状态标签
	 */
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
			tooltip: '岗位名称',
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
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			valueType: 'dateRange',
			align: 'center',
			fieldProps: {
				placeholder: '选择日期',
			},
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
			hideInSearch: true,
			render: renderAction,
			// render: renderAction2,
		},
	];
};
export default TableColumnsConfig;
