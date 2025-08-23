import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { useBaseProTable } from './useBaseProTable';

interface BaseProTableProps<T = any> {
	columns: ProColumns<T>[];
	tableName?: string;
	// fetchData: (params: any) => Promise<{ data: { list: T[]; total: number } }>;
	fetchData: (params: any) => any;
	addData?: (data: T) => Promise<any>;
	updateData?: (id: string, data: T) => Promise<any>;
	deleteData?: (id: string) => Promise<any>;
	deleteManyData?: (ids: string[]) => Promise<any>;
	importData?: (data: T[]) => Promise<any>;
}

export function BaseProTable<T extends { _id?: string }>({ columns, tableName, ...apiConfig }: BaseProTableProps<T>) {
	const {
		actionRef,
		formRef,
		form,
		loading,
		pagination,
		selectedRows,
		setSelectedRows,
		openSearch,
		setOpenSearch,

		modalVisible,
		modalTitle,
		modalType,
		modalData,

		drawerVisible,
		drawerData,

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
	} = useBaseProTable<T>({ tableName, ...apiConfig });

	// 增强列配置，添加操作列
	const enhancedColumns: any = [
		...columns,
		{
			title: '操作',
			key: 'option',
			fixed: 'right',
			width: 120,
			hideInSearch: true,
			render: (_: any, record: any) => (
				<div style={{ display: 'flex', gap: 8 }}>
					<a onClick={() => handleDrawerOpen(record)}>查看</a>
					<a onClick={() => handleModalOpen('edit', record)}>编辑</a>
					<a style={{ color: 'red' }} onClick={() => handleDelete(record)}>
						删除
					</a>
				</div>
			),
		},
	];

	return (
		<>
			<ProTable<T>
				rowKey='_id'
				className='ant-pro-table-scroll'
				scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
				bordered
				cardBordered
				dateFormatter='string'
				headerTitle={tableName}
				defaultSize='small'
				loading={loading}
				columns={enhancedColumns}
				actionRef={actionRef}
				formRef={formRef}
				search={
					openSearch
						? false
						: {
								labelWidth: 'auto',
								filterType: 'query',
								span: 6,
								resetText: '重置',
								searchText: '查询',
							}
				}
				request={handleRequest}
				pagination={{
					size: 'default',
					showQuickJumper: true,
					showSizeChanger: true,
					...pagination,
					pageSizeOptions: [10, 20, 30, 50],
					showTotal: () => `共 ${pagination.total} 条`,
				}}
				rowSelection={{
					onChange: (_, selectedRows) => setSelectedRows(selectedRows),
				}}
				toolBarRender={() =>
					[
						<a key='create' onClick={() => handleModalOpen('create')}>
							新建
						</a>,
						selectedRows.length > 0 && (
							<a key='batchDelete' onClick={handleBatchDelete} style={{ color: 'red' }}>
								批量删除 ({selectedRows.length})
							</a>
						),
					].filter(Boolean)
				}
			/>

			{/* 这里可以添加通用的 Modal 和 Drawer 组件 */}
		</>
	);
}
