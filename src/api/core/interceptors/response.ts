import { AxiosInstance, AxiosResponse } from 'axios';
import { tryHideFullScreenLoading } from '@/components/Loading/fullScreen';
import { LOGIN_URL } from '@/config';
import { ResultEnum } from '@/enums/httpEnum';
import { message } from '@/hooks/useMessage';
import { store } from '@/redux';
import { setToken } from '@/redux/modules/user';
import { AxiosCanceler } from '@/api/helper/axiosCancel';
import { checkStatus } from '@/api/helper/checkStatus';
// 若仍报错，请检查以下事项：
// 1. 确认文件路径 '@/api/utils/checkStatus' 是否正确
// 2. 确认 checkStatus 文件是否存在
// 3. 确认 checkStatus 文件是否导出了 checkStatus 函数
// 4. 确认 tsconfig.json 中路径别名配置是否正确
// 假设 ResultData 类型定义在同级目录下的 result.ts 文件中，可根据实际项目结构调整路径

const axiosCanceler = new AxiosCanceler();

/**
 * 设置响应拦截器
 * @param instance Axios 实例
 */
export function setupResponseInterceptors(instance: AxiosInstance) {
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			const { data, config } = response;

			// 隐藏加载
			tryHideFullScreenLoading();

			// 移除请求取消
			axiosCanceler.removePending(config);

			// 处理登录过期
			if (data.code === ResultEnum.OVERDUE) {
				store.dispatch(setToken(''));
				message.error(data.msg || '登录信息已过期，请重新登录');
				window.$navigate(LOGIN_URL);
				return Promise.reject(data);
			}

			// 处理错误
			if (data.code && data.code !== ResultEnum.SUCCESS) {
				message.error(data.msg || '请求失败');
				return Promise.reject(data);
			}

			// 下载类型特殊处理
			const type = response.request.responseType || '';
			if (type.includes('blob')) {
				const disposition = response.headers['content-disposition'];
				let filename = '默认文件名';
				if (disposition && disposition.indexOf('filename=') !== -1) {
					filename = decodeURI(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length));
				}
				return {
					blob: data as unknown as Blob,
					filename,
				};
			}
			return data;
		},
		error => {
			tryHideFullScreenLoading();
			const { response } = error;

			// 处理网络错误
			if (!response) {
				message.error('网络连接错误，请检查网络后重试');
				return Promise.reject(error);
			}

			// 处理状态码错误
			checkStatus(response.status, response.data);
			return Promise.reject(error);
		}
	);
}
