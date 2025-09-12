import { useCallback, useRef, useState } from 'react';
import { Form } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import TableColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import { addJob, delJob, delMoreJob, ExJob, findJob, modifyJob } from '@/api/modules/system';
import './index.less';
import ModalComponent from './component/Modal';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';

const useProTable = () => {
	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref
	const [form] = Form.useForm();
	const tableName = '岗位管理';

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [loading, setLoading] = useState<boolean>(false); // Loading：加载Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [tableData, setTableData] = useState<any[]>([]); // 表格数据
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
	const [modalUserInfo, setModalUserInfo] = useState({});

	// Modal 操作：创建、编辑、详情
	const modalOperate = (type: 'create' | 'edit' | 'detail', item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '新建用户' : '编辑用户');
		}
	};

	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const modalResult = useCallback(
		async (type: string, item: any) => {
			try {
				if (['create', 'edit'].includes(type)) {
					const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
					const res = type === 'create' ? await addJob(item) : await modifyJob(item._id, item);
					hide();
					if (res) {
						form.resetFields();
						setModalIsVisible(false);
						actionRef.current?.reload();
						message.success(type === 'create' ? '添加成功' : '编辑成功');
					}
				} else if (['delete', 'moreDelete'].includes(type)) {
					const hide = message.loading('正在删除');
					const ids = type === 'delete' ? [item._id] : selectedRows.map(row => row._id);
					const res = type === 'delete' ? await delJob(item._id) : await delMoreJob(ids);
					hide();
					if (res) {
						if (type === 'moreDelete') setSelectedRows([]);
						actionRef.current?.reloadAndRest?.();
						message.success(`成功删除${type === 'delete' ? ` ${item?.postName}` : '多条'}记录`);
					}
				}
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form]
	);

	const quickSearch = () => {};
	const ImportData = useCallback(
		async (data: any) => {
			const hide = message.loading('数据正在导入中');
			try {
				await ExJob(data);
				hide();
				actionRef?.current?.reload();
				message.success('导入完成');
			} catch (error: any) {
				hide();
				message.error(error.message || error.msg || '导入失败');
			}
		},
		[ExJob]
	);

	// * 发请求：当表格参数变化
	const handleRequest = useCallback(
		async (params: any, sort: any, filter: any) => {
			setLoading(true);
			try {
				const searchParams = { ...params };
				delete searchParams.current;
				delete searchParams.pageSize;

				const mappedSort = Object.fromEntries(Object.entries(sort).map(([field, order]) => [field, order === 'ascend' ? 'asc' : 'desc']));

				const payload = {
					pagination: {
						page: params.current,
						pageSize: params.pageSize,
					},
					sort: mappedSort,
					filter,
					search: searchParams,
				};

				const { data }: any = await findJob(payload);
				SetPagination((prev: any) => ({ ...prev, total: data.total }));
				return {
					data: data.list,
					success: true,
					total: data.total,
				};
			} catch (error) {
				message.error('数据加载失败');
				return { data: [], success: false, total: 0 };
			} finally {
				setLoading(false);
			}
		},
		[findJob]
	);

	// * 工具栏 ToolBar
	let ToolBarParams: any = {
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		modalOperate,
		tableName,
		tableData,
		ImportData,
	};
	const drawerClose = () => {
		setDrawerCurrentRow({});
		setDrawerIsVisible(false);
	};
	const allWidth = TableColumnsConfig(modalOperate, modalResult).reduce((sum: any, col: any) => sum + (col.width || 0), 0);

	return (
		<>
			<ProTable<any>
				// components={{
				// 	body: {
				// 		row: EditableRow,
				// 		cell: EditableCell,
				// 	},
				// }}
				rowKey='_id'
				className='ant-pro-table-scroll'
				scroll={{ x: allWidth, y: '100vh' }} // 100vh
				headerTitle={tableName}
				loading={loading}
				formRef={formRef} // 可以获取到查询表单的 form 实例
				actionRef={actionRef} // 操作 Table
				bordered
				cardBordered
				dateFormatter='number'
				defaultSize='small'
				columns={TableColumnsConfig(modalOperate, modalResult)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6, resetText: '重置', searchText: '查询', showHiddenNum: true }} // 搜索表单配置
				request={handleRequest}
				pagination={{
					size: 'default',
					showQuickJumper: true,
					showSizeChanger: true,
					...pagination,
					pageSizeOptions: [10, 20, 30, 50],
					onChange: (page, pageSize) => {
						SetPagination({ ...pagination, page, pageSize });
					},
					showTotal: () => `第 ${pagination.page} 页，共 ${pagination.total} 条`,
				}}
				rowSelection={{
					onChange: (selectedRowKeys, selectedRows) => {
						setSelectedRows(selectedRows);
					},
				}}
				ghost={false}
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {}} // 数据加载失败时触发
				editable={{ type: 'multiple' }}
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
			/>

			{selectedRows?.length > 0 && <FooterComponent selectedRows={selectedRows} modalResult={modalResult} />}

			<ModalComponent
				form={form}
				modalIsVisible={modalIsVisible}
				setModalIsVisible={setModalIsVisible}
				modalTitle={modalTitle}
				modalType={modalType}
				modalUserInfo={modalUserInfo}
				modalResult={modalResult}
			/>

			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={{ ...drawerCurrentRow, name: drawerCurrentRow?.postName }}
				drawerClose={drawerClose}
				TableColumnsConfig={TableColumnsConfig}
				modalOperate={modalOperate}
				modalResult={modalResult}
			/>
		</>
	);
};

export default useProTable;
