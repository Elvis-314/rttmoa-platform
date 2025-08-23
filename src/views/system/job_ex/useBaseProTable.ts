import { useRef, useState, useCallback } from 'react';
import { Form } from 'antd';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';

interface UseBaseProTableOptions<T = any> {
	tableName?: string;
	fetchData: (params: any) => Promise<{ data: { list: T[]; total: number } }>;
	addData?: (data: T) => Promise<any>;
	updateData?: (id: string, data: T) => Promise<any>;
	deleteData?: (id: string) => Promise<any>;
	deleteManyData?: (ids: string[]) => Promise<any>;
	importData?: (data: T[]) => Promise<any>;
}

// ai 生成、参考
export function useBaseProTable<T extends { _id?: string }>({
	tableName = '数据管理',
	fetchData,
	addData,
	updateData,
	deleteData,
	deleteManyData,
	importData,
}: UseBaseProTableOptions<T>) {
	const actionRef = useRef<ActionType>();
	const formRef = useRef<FormInstance>();
	const [form] = Form.useForm();

	// 状态管理
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
	const [selectedRows, setSelectedRows] = useState<T[]>([]);
	const [openSearch, setOpenSearch] = useState(false);

	// Modal 状态
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
	const [modalData, setModalData] = useState<T | null>(null);

	// Drawer 状态
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [drawerData, setDrawerData] = useState<T | null>(null);

	// 通用操作
	const handleModalOpen = useCallback(
		(type: 'create' | 'edit' | 'detail', item?: T) => {
			setModalType(type);
			setModalTitle(type === 'create' ? '新建' : type === 'edit' ? '编辑' : '详情');
			setModalData(item || null);
			setModalVisible(true);

			if (type === 'edit' && item) {
				form.setFieldsValue(item);
			} else {
				form.resetFields();
			}
		},
		[form]
	);

	const handleDrawerOpen = useCallback((item: T) => {
		setDrawerData(item);
		setDrawerVisible(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalVisible(false);
		setModalData(null);
		form.resetFields();
	}, [form]);

	const handleDrawerClose = useCallback(() => {
		setDrawerVisible(false);
		setDrawerData(null);
	}, []);

	// CRUD 操作
	const handleCreate = useCallback(
		async (data: T) => {
			if (!addData) return;
			const hide = message.loading('正在添加');
			try {
				await addData(data);
				hide();
				handleModalClose();
				actionRef.current?.reload();
				message.success('添加成功');
			} catch (error: any) {
				hide();
				message.error(error.message || '添加失败');
			}
		},
		[addData, handleModalClose]
	);

	const handleUpdate = useCallback(
		async (data: T) => {
			if (!updateData || !data._id) return;
			const hide = message.loading('正在编辑');
			try {
				await updateData(data._id, data);
				hide();
				handleModalClose();
				actionRef.current?.reload();
				message.success('编辑成功');
			} catch (error: any) {
				hide();
				message.error(error.message || '编辑失败');
			}
		},
		[updateData, handleModalClose]
	);

	const handleDelete = useCallback(
		async (item: T) => {
			if (!deleteData || !item._id) return;
			const hide = message.loading('正在删除');
			try {
				await deleteData(item._id);
				hide();
				actionRef.current?.reload();
				message.success('删除成功');
			} catch (error) {
				hide();
				message.error('删除失败');
			}
		},
		[deleteData]
	);

	const handleBatchDelete = useCallback(async () => {
		if (!deleteManyData || selectedRows.length === 0) return;
		const hide = message.loading('正在批量删除');
		try {
			const ids = selectedRows.map(row => row._id).filter(Boolean) as string[];
			await deleteManyData(ids);
			hide();
			setSelectedRows([]);
			actionRef.current?.reloadAndRest?.();
			message.success('批量删除成功');
		} catch (error) {
			hide();
			message.error('批量删除失败');
		}
	}, [deleteManyData, selectedRows]);

	const handleImport = useCallback(
		async (data: T[]) => {
			if (!importData) return;
			const hide = message.loading('正在导入');
			try {
				await importData(data);
				hide();
				actionRef.current?.reload();
				message.success('导入成功');
			} catch (error: any) {
				hide();
				message.error(error.message || '导入失败');
			}
		},
		[importData]
	);

	// 表格请求
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

				const { data } = await fetchData(payload);
				setPagination(prev => ({ ...prev, total: data.total }));
				return {
					data: data.list,
					success: true,
					total: data.total,
				};
			} catch (error) {
				return {
					data: [],
					success: false,
					total: 0,
				};
			} finally {
				setLoading(false);
			}
		},
		[fetchData]
	);

	return {
		// refs
		actionRef,
		formRef,
		form,

		// 状态
		loading,
		pagination,
		selectedRows,
		setSelectedRows,
		openSearch,
		setOpenSearch,

		// modal
		modalVisible,
		modalTitle,
		modalType,
		modalData,

		// drawer
		drawerVisible,
		drawerData,

		// actions
		handleModalOpen,
		handleDrawerOpen,
		handleModalClose,
		handleDrawerClose,
		handleCreate,
		handleUpdate,
		handleDelete,
		handleBatchDelete,
		handleImport,
		handleRequest,
	};
}
