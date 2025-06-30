import { UserList } from '@/api/interface';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import TableColumnsConfig from './ColumnConfig';

type DrawerComponentProps = {
	showDetail: any;
	currentRow: any;
	setCurrentRow: any;
	setShowDetail: any;
	columnParams: any;
};

// 查看用户
const DrawerComponent: React.FC<DrawerComponentProps> = Params => {
	const { showDetail, currentRow, setCurrentRow, setShowDetail, columnParams } = Params;
	return (
		<Drawer
			width={600}
			open={showDetail}
			onClose={() => {
				setCurrentRow(undefined);
				setShowDetail(false);
			}}
			closable={false}
		>
			{currentRow?.username && (
				<ProDescriptions<UserList>
					column={2}
					title={currentRow?.username}
					request={async () => ({
						data: currentRow || {},
					})}
					params={{
						id: currentRow?.username,
					}}
					columns={TableColumnsConfig(columnParams) as ProDescriptionsItemProps<UserList>[]}
				/>
			)}
		</Drawer>
	);
};
export default DrawerComponent;
