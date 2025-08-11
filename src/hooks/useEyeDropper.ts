import { useState, useEffect } from 'react';

interface EyeDropperResult {
	color: string;
	isEnabled: boolean;
	openEyeDropper: () => void;
	cancelEyeDropper: () => void;
}

// * 常用功能：取色器
const useEyeDropper = (): EyeDropperResult => {
	const [color, setColor] = useState<string>('');
	const [isEnabled, setIsEnabled] = useState<boolean>(true);

	useEffect(() => {
		// Check if EyeDropper API is supported
		if (!window.EyeDropper) {
			setIsEnabled(false);
		}
	}, []);

	const abortController = new AbortController();

	const openEyeDropper = async () => {
		if (!window.EyeDropper) {
			console.log('EyeDropper API is not supported in this browser.');
			return;
		}
		// Create a new EyeDropper instance
		const eyeDropper = new window.EyeDropper();
		console.log('eyeDropper', eyeDropper);
		// Open the EyeDropper
		try {
			const result = await eyeDropper?.open({ signal: abortController.signal });
			setColor(result.sRGBHex);
		} catch (error) {
			console.log('openEyeDropper catch:', error);
		}
	};

	const cancelEyeDropper = () => {
		abortController.abort();
	};

	return { color, isEnabled, openEyeDropper, cancelEyeDropper };
};

export default useEyeDropper;
