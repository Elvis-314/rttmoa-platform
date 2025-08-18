import { Card } from 'antd';
import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { config } from '@react-spring/core';

// use Firefox: https://www.react-spring.dev
// Animation Libary: https://blog.csdn.net/wang_yu_shun/article/details/131427960
const Perism = () => {
	const [toggle, setToggle] = useState(false);
	const transtions = useTransition(toggle, {
		from: { position: 'absolute', opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		reverse: toggle,
		delay: 500,
		config: config.molasses,
		onRest: () => setToggle(!toggle),
	});
	return (
		<>
			<Card style={{ width: '100%', height: '100%' }}>
				{transtions(({ opacity }, item) => {
					return item ? (
						<animated.div
							style={{
								position: 'absolute',
								opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
							}}
						>
							<img src={'https://iknow-pic.cdn.bcebos.com/c9fcc3cec3fdfc035ea5383bc63f8794a5c22650'} alt='第一个背景图片' style={{ height: '80vh' }} />
						</animated.div>
					) : (
						<animated.div
							style={{
								position: 'absolute',
								opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
							}}
						>
							<img src={'https://iknow-pic.cdn.bcebos.com/caef76094b36acaf0f64e0616ed98d1000e99ca2'} alt='第二个背景图片' style={{ height: '80vh' }} />
						</animated.div>
					);
				})}
			</Card>
		</>
	);
};

export default Perism;
