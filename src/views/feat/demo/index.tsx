import React from 'react';
import { Card } from 'antd';
import FileUpload from './components/fileUpload';
import UserList from './components/userList';

const Demo: React.FC = () => {
	return (
		<>
			<Card className='w-full h-full'>
				<Card>
					<FileUpload />
				</Card>
				<Card className='mt-[20px]'>
					<UserList />
				</Card>
			</Card>
		</>
	);
};
export default Demo;
