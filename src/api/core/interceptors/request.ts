import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { showFullScreenLoading } from '@/components/Loading/fullScreen';
import { store } from '@/redux';
import { setToken } from '@/redux/modules/user';
import { AxiosCanceler } from '@/api/helper/axiosCancel';
// 尝试修改导入路径，确保路径正确指向 AxiosCanceler 模块

// 扩展 AxiosRequestConfig 类型
declare module 'axios' {
	interface InternalAxiosRequestConfig {
		loading?: boolean;
		ignoreCancel?: boolean;
	}
}

const axiosCanceler = new AxiosCanceler();

/**
 * 设置请求拦截器
 * @param instance Axios 实例
 */
export function setupRequestInterceptors(instance: AxiosInstance) {
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			// 当前请求需要显示加载
			config.loading && showFullScreenLoading();

			// 取消重复请求
			!config.ignoreCancel && axiosCanceler.addPending(config);

			// 添加 token
			if (config.headers && typeof config.headers.set === 'function') {
				const token: string = store.getState().user.token;
				if (token) {
					config.headers.set('x-access-token', token);
					config.headers['Authorization'] = `Bearer ${token}`;
				}
			}

			return config;
		},
		error => {
			console.error('请求错误拦截:', error);
			return Promise.reject(error);
		}
	);
}
