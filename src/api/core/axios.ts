import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResultEnum } from '@/enums/httpEnum';
import { setupRequestInterceptors } from './interceptors/request';
import { setupResponseInterceptors } from './interceptors/response.ts';

// 配置默认值
const defaultConfig: AxiosRequestConfig = {
	timeout: ResultEnum.TIMEOUT as number,
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
};

/**
 * 创建 Axios 实例
 * @param config 自定义配置
 * @returns Axios 实例
 */
export function createAxiosInstance(config: AxiosRequestConfig = {}): AxiosInstance {
	// 合并默认配置和自定义配置
	const mergedConfig = { ...defaultConfig, ...config };

	// 创建实例
	const instance = axios.create(mergedConfig);

	// 设置拦截器
	setupRequestInterceptors(instance);
	setupResponseInterceptors(instance);

	return instance;
}

// 默认实例
export const http = createAxiosInstance({
	baseURL: import.meta.env.VITE_API_URL as string,
});

// upack 实例
export const httpUpack = createAxiosInstance({
	baseURL: 'upack',
});

// export default http;
