import React from 'react';
import { BaseProTable } from './BaseProTable';
import TableColumnsConfig from './component/ColumnConfig';
import * as api from '@/api/modules/system';

const JobPage = () => (
	<BaseProTable
		columns={TableColumnsConfig(1, 2)}
		tableName='岗位管理'
		fetchData={api.findJob}
		addData={api.addJob}
		updateData={api.modifyJob}
		deleteData={api.delJob}
		deleteManyData={api.delMoreJob}
		importData={api.ExJob}
	/>
);

export default JobPage;
