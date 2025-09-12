import { Button, Col, Form, Input, Modal, Radio, Row, Space, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult } = Params;

	useEffect(() => {
		form.setFieldsValue({
			job_name: modalType == 'create' ? '' : modalUserInfo.postName,
			job_sort: modalType == 'create' ? '' : modalUserInfo.postSort,
			status: modalType == 'create' ? '启用' : modalUserInfo.status,
			desc: modalType == 'create' ? '' : modalUserInfo.desc,
		});
	}, [modalType, modalUserInfo]);

	const OnCancel = () => {
		setModalIsVisible(false);
	};
	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		if (modalType == 'edit') {
			formList._id = modalUserInfo._id;
		}
		modalResult && modalResult(modalType, formList);
	};
	const Submit = () => {
		form.submit();
	};
	return (
		<Modal
			title={modalTitle}
			width={800}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={[
				<Button loading={false} onClick={OnCancel}>
					取消
				</Button>,
				<Button key='link' type='primary' loading={false} onClick={Submit}>
					提交
				</Button>,
			]}
		>
			<Form
				className='mt-[40px] mb-[100px] px-[20px] max-h-[500px] overflow-auto'
				layout='vertical'
				form={form}
				// labelCol={{ span: 6 }}
				// wrapperCol={{ span: 18 }}
				onFinish={FormOnFinish}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='岗位名称' name='job_name' rules={[{ required: true, message: '必填：岗位名称' }]}>
							<Input placeholder='请输入岗位名称' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='岗位排序' name='job_sort' rules={[{ required: true, message: '必填：岗位排序' }]}>
							<Input placeholder='请输入岗位排序' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='状态' name='status' rules={[{ required: false }]}>
							{/* <Switch /> */}
							<Radio.Group options={['启用', '停用']} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='岗位描述' name='desc' rules={[{ required: false }]}>
							{/* <TextArea rows={3} placeholder='岗位说明' maxLength={60} /> */}
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
