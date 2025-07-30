import { Table } from 'antd';
import { useState } from 'react';
import './index.less';
import Config from './config';
import Excel from './Excel';

const expectedHeaders = ['序号', '学科', '项目名称', '端', '账号', '密码'];

const TableDataImport = () => {
	const [tableLoading, setTableLoading] = useState<boolean>(false); // 加载状态：Loading
	const [fileName, setFileName] = useState<string>(''); // 文件名称： __EXCEL__黑马账号信息.xlsx

	const DataSource = Config().dataSource;
	const Column: any = Config().column;
	return (
		<div className='TableDataImport bg-white p-[24px] h-full'>
			<div className='fileUpDiv mb-[40px] mt-0'>
				<div className='mr-[40px]'>文件名称：</div>
				<span className='fileName'>{fileName}</span>
				<Excel
					TableName='用户管理'
					setFileName={setFileName}
					ExportTableData={DataSource} // 接口数据：所有表数据
					tableHeaders={Column.map((value: any) => value.title)} // 表头数据
				/>
			</div>
			<Table
				scroll={{ x: '100%', y: 'calc( 100vh - 270px )' }}
				rowKey={record => record.key}
				bordered
				loading={tableLoading}
				size='small'
				dataSource={DataSource}
				columns={Column}
			/>
		</div>
	);
};

export default TableDataImport;
