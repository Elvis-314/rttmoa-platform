import { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import ColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import { addUser, DelMoreUser, delUser, GetProTableUser, modifyUser } from '@/api/modules/system';
import ModalComponent from './component/Modal';
import FooterComponent from '@/components/TableFooter';
import DrawerComponent from '@/components/TableDrawer';

export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

// & 表格待实现：
// * 表头：排序、筛选、过滤
// * 待实现：列拖拽排序、可编辑行、可编辑单元格、响应式、随页面滚动的固定表头和滚动条
const useProTable = () => {
	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref

	const [form] = Form.useForm();

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	// const [dataSource, setdataSource] = useState([]);
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载 Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalUserInfo, setModalUserInfo] = useState({});

	const quickSearch = () => {};

	// async function GetData() {
	// 	SetLoading(true);
	// 	const params = {
	// 		page: pagination.page,
	// 		pageSize: pagination.pageSize,
	// 	};
	// 	const { data }: any = await GetProTableUser({ ...params });
	// 	console.log('data', data);
	// 	SetLoading(false);
	// 	SetPagination({ ...pagination, page: data.page, pageSize: data.pageSize, total: data.total });
	// 	setdataSource(data.list);
	// }
	// useEffect(() => {
	// 	GetData();
	// }, [pagination.page, pagination.pageSize]);

	// * 操作 — 员工： 新建、编辑、详情、删除  按钮
	const handleOperator = async (type: string, item: any) => {
		// console.log('handleOperator', type, item);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item);
		} else if (type === 'create') {
			setModalIsVisible(true);
			setModalTitle('新建用户');
			setModalType(type);
			setModalUserInfo({});
		} else if (['edit'].includes(type)) {
			setModalIsVisible(true);
			setModalTitle(type === 'edit' ? '编辑用户' : '查看详情');
			setModalType(type);
			setModalUserInfo(item);
		} else if (type === 'delete') {
			const hide = message.loading('正在删除');
			try {
				const result: any = await delUser(item._id);
				if (result) {
					hide();
					actionRef?.current?.reload();
					message.success(result.data.message);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		} else if (type === 'moreDelete') {
			const hide = message.loading('正在删除');
			try {
				const selectIds = selectedRows.map(value => value?._id);
				const res: any = await DelMoreUser(selectIds || []);
				if (res) {
					hide();
					setSelectedRows([]);
					actionRef.current?.reloadAndRest?.();
					message.success(res.data.message);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		}
	};
	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const handleModalSubmit = async (type: string, item: any) => {
		// 1、获取form字段值 并 过滤出有值的字段
		// 2、字段值传递接口、获取接口结果、并提示出信息
		// 3、重置Modal信息
		// 4、重新请求，根据页码等条件

		console.log('Modal 提交：', type, item);
		const hide = message.loading(type == 'create' ? '正在添加' : '正在编辑');
		try {
			let res = type === 'create' ? await addUser(item) : await modifyUser(item._id, item);
			if (res) {
				hide();
				form.resetFields();
				setModalTitle('');
				setModalType('');
				setModalIsVisible(false);
				setModalUserInfo({});
				if (actionRef.current) actionRef.current.reload();
				message.success(type == 'create' ? '添加成功' : '编辑成功');
			}
		} catch (error: any) {
			hide();
			message.error(error.message || error.msg);
		}
	};

	// * 工具栏 ToolBar
	let ToolBarParams = {
		setModalIsVisible, // 工具栏：新建按钮
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		handleOperator,
	};
	const allWidth = ColumnsConfig('', '').reduce((sum: any, col: any) => sum + (col.width || 0), 0);
	return (
		<>
			<ProTable<UserList>
				rowKey='_id'
				className='ant-pro-table-scroll'
				scroll={{ x: allWidth, y: '100vh' }} // 100vh
				bordered
				cardBordered
				dateFormatter='string'
				headerTitle='用户列表'
				defaultSize='small'
				loading={loading}
				columns={ColumnsConfig(handleOperator, handleModalSubmit)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发 actionRef.current.reset()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置
				// onSubmit={params => {}} // {username: '张三'}  提交表单时触发
				// onReset={() => {}} // 重置表单时触发
				// dataSource={dataSource}
				// request请求、获取所有数据、将数据存储起来、
				request={async (params, sort, filter) => {
					SetLoading(true);
					console.log('request请求参数：', params, sort, filter);
					const Param = {};
					const { data }: any = await GetProTableUser(Param);
					// console.log('用户列表数据：', data);
					SetLoading(false);
					SetPagination({ ...pagination, total: data.total });
					return formatDataForProTable<UserList>({ ...data, current: params.current });
				}}
				pagination={{
					size: 'default',
					...pagination,
					pageSizeOptions: [10, 20, 30, 50],
					onChange: (page, pageSize) => {
						SetPagination({ ...pagination, page, pageSize });
					},
				}}
				rowSelection={{
					onChange: (selectedRowKeys, selectedRows) => {
						setSelectedRows(selectedRows);
					},
				}}
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {
					message.error(`数据加载失败！ ${error}`);
				}} // 数据加载失败时触发
				editable={{ type: 'multiple' }}
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
			/>

			{selectedRows?.length > 0 && <FooterComponent selectedRows={selectedRows} modalResult={handleOperator} />}

			<ModalComponent
				form={form}
				modalIsVisible={modalIsVisible}
				setModalIsVisible={setModalIsVisible}
				modalTitle={modalTitle}
				modalType={modalType}
				modalUserInfo={modalUserInfo}
				handleModalSubmit={handleModalSubmit} // 提交表单
			/>

			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={{ ...drawerCurrentRow, name: drawerCurrentRow?.username }}
				drawerClose={() => {
					setDrawerCurrentRow({});
					setDrawerIsVisible(false);
				}}
				columnsConfig={ColumnsConfig}
				modalOperate={handleOperator}
				modalResult={handleModalSubmit}
			/>
		</>
	);
};

export default useProTable;
