import { UserList } from '@/api/interface';
import { ProColumns, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';

type DrawerComponentProps = {
	drawerIsVisible: boolean;
	drawerCurrentRow: {
		name: string | undefined;
		[key: string]: any;
	};
	drawerClose: any;
	TableColumnsConfig: (modalOperate: any, modalResult: any) => ProColumns<any>[];
	modalOperate: any;
	modalResult: any;
};
const DrawerComponent: React.FC<DrawerComponentProps> = Params => {
	const { drawerIsVisible, drawerCurrentRow, drawerClose, TableColumnsConfig, modalOperate, modalResult } = Params;

	return (
		<Drawer width={550} open={drawerIsVisible} onClose={drawerClose} closable={true}>
			{drawerCurrentRow?.name && (
				<ProDescriptions<UserList>
					// extra='extra'
					bordered
					size='small'
					layout='horizontal'
					column={1}
					title={drawerCurrentRow?.name}
					request={async () => ({
						data: drawerCurrentRow || {},
					})}
					params={{
						id: drawerCurrentRow?.name,
					}}
					columns={TableColumnsConfig(modalOperate, modalResult) as ProDescriptionsItemProps<UserList>[]}
				/>
			)}
		</Drawer>
	);
};
export default DrawerComponent;
