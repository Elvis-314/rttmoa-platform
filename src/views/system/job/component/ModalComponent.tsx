import { Button, Col, Form, Input, Modal, Radio, Row, Space, Switch } from 'antd';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo: userInfo, handleModalSubmit } = Params;

	useEffect(() => {
		if (modalType == 'create') {
			form.resetFields();
		}
		if (modalType == 'edit') {
			form.setFieldsValue({
				username: userInfo.username,
				age: userInfo.age,
				email: userInfo.email,
				sex: userInfo.sex,
				status: userInfo.status,
				phone: userInfo.phone,
				city: userInfo.city,
			});
		}
	}, [modalType, userInfo]);

	const OnCancel = () => {
		setModalIsVisible(false);
	};
	const OnReset = () => {
		form.resetFields();
	};
	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		handleModalSubmit && handleModalSubmit(modalType, formList);
	};

	return (
		<Modal
			className='relative '
			title={modalTitle}
			width={600}
			// loading={false}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={false}
			// footer={[
			// 	<Button loading={loading} onClick={() => {}}>取消</Button>,
			// 	<Button key='back' onClick={() => {}}>
			// 		重置表单
			// 	</Button>,
			// 	<Button key='link' type='primary' loading={loading} onClick={() => {}}>提交</Button>,
			// ]}
		>
			<Form className='mb-[60px] max-h-[500px] overflow-auto' layout='horizontal' form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} onFinish={FormOnFinish}>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item label='岗位名称' name='job_name' rules={[{ required: true, message: '必填：岗位名称' }]}>
							<Input placeholder='请输入岗位名称' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='岗位排序' name='job_sort' rules={[{ required: true, message: '必填：岗位排序' }]}>
							<Input placeholder='请输入岗位排序' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='状态' name='status' rules={[{ required: false }]}>
							<Switch />
						</Form.Item>
					</Col>
				</Row>
				<Row className='absolute right-[105px] bottom-[0px]'>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Space>
							<Button type='default' htmlType='button' onClick={OnCancel}>
								取消
							</Button>
							<Button type='default' htmlType='button' onClick={OnReset}>
								重置
							</Button>
							<Button type='primary' htmlType='submit'>
								提交
							</Button>
						</Space>
					</Form.Item>
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
