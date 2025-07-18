import { useState } from 'react';
import { Alert, Button, Card, Divider, Input, Space, Typography } from 'antd';
import { SmileFilled, SmileOutlined } from '@ant-design/icons';
import { message } from '@/hooks/useMessage';
import useClipboard from '@/hooks/useClipboard';

const { Paragraph, Link } = Typography;

const Clipboard: React.FC = () => {
	const { copyToClipboard, isCopied } = useClipboard();

	const [value, setValue] = useState('');

	const handleCopy = () => {
		if (!value) return message.warning('请输入要 Copy 的内容 ！');
		copyToClipboard(value);
		message.success('Copy Success ！');
	};

	const antMessage = (
		<span>
			Ant Design Paragraph copyable ：
			<Link href='https://ant.design/components/typography-cn#components-typography-demo-interactive' target='_blank'>
				Paragraph 组件 — copyable 可复制属性
			</Link>
		</span>
	);

	return (
		<Card className='w-full h-full'>
			<Alert message='useClipboard hook 🌈' type='info' showIcon className='mb20' />

			<Space.Compact style={{ width: '350px' }}>
				<Input placeholder='Please enter content' value={value} onChange={e => setValue(e.target.value)} />
				<Button type='primary' onClick={handleCopy}>
					Copy
				</Button>
			</Space.Compact>
			<span className='ml10'> Copy Status: {isCopied + ''}</span>

			<Divider />

			<Alert message={antMessage} type='info' showIcon className='mt-[40px] mb-[20px]' />
			<Paragraph copyable>This is a copyable text.</Paragraph>
			<Paragraph copyable={{ text: 'Hello, Hooks Admin!' }}>Replace copy text.</Paragraph>
			<Paragraph
				copyable={{
					icon: [<SmileOutlined key='copy-icon' />, <SmileFilled key='copied-icon' />],
					tooltips: ['click here', 'you clicked!!'],
				}}
			>
				Custom Copy icon and replace tooltips text.
			</Paragraph>
			<Paragraph copyable={{ tooltips: false }}>Hide Copy tooltips.</Paragraph>
		</Card>
	);
};

export default Clipboard;
