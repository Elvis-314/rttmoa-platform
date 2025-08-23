export const jobTableConfig = {
	tableName: '岗位管理',
	api: {
		fetch: '/api/job/list',
		add: '/api/job/add',
		update: '/api/job/update',
		delete: '/api/job/delete',
		deleteMany: '/api/job/deleteMany',
		import: '/api/job/import',
	},
	columns: () => import('../job/component/ColumnConfig').then(m => m.default),
};
