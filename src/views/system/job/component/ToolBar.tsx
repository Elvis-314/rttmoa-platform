import { ArrowsAltOutlined, FullscreenOutlined, PlusOutlined, SearchOutlined, SecurityScanTwoTone, SettingOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search'; // ! antd/lib/input
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/Excel';
import TableColumnsConfig from './ColumnConfig';

type ToolBarProps = {
	quickSearch: () => void;
	openSearch: string;
	SetOpenSearch: any;
	modalOperate: (type: string, data: any) => void;
	tableData: Array<any>[];
	tableName: string;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { quickSearch, openSearch, SetOpenSearch, modalOperate, tableData, tableName } = props;
	const dispatch = useDispatch();

	const CreateBtn = () => {
		modalOperate('create', null);
	};

	const tableHeader = TableColumnsConfig(1, 1)
		.filter((v: any) => v.title != '操作')
		.map((v: any) => v.title);
	return [
		<Search placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		<Button icon={<PlusOutlined />} onClick={CreateBtn}>
			新建
		</Button>,
		<Excel
			TableName={tableName}
			tableHeaders={tableHeader} // 表头数据
			ExportData={tableData} // 接口数据：所有表数据
			ImportData={(data: any) => {
				console.log('导入结果：', data);
			}}
		>
			<Button icon={<SettingOutlined className='hover:cursor-pointer' />}>Excel Setting</Button>
		</Excel>,
		<Tooltip title={!openSearch ? '关闭表单搜索' : '开启表单搜索'} className='text-lg'>
			<span onClick={() => SetOpenSearch(!openSearch)}>
				<SearchOutlined />
			</span>
		</Tooltip>,
		<Tooltip title='全屏' className='text-lg'>
			<span onClick={() => dispatch(setGlobalState({ key: 'maximize', value: true }))}>
				<FullscreenOutlined />
			</span>
		</Tooltip>,
	];
};
export default ToolBarRender;
