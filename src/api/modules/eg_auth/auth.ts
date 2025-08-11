import { http } from '@/api/core';
import type { LoginModel, SignupModel, Tokens } from './auth.type';

enum LoginType {
	USERNAME = '1', // 用户名登录
	EMAIL = '2', // 邮箱登录
}
// NOTE: 调用api接口： AuthAPI.login({})
// NOTE: 使用 class 只导出一个 AuthAPI{} 即可
export class AuthAPI {
	private static AUTH_API_PREFIX = '/auth';

	static REFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`;

	/**
	 * 登录
	 */
	static login(data: LoginModel) {
		return http.post<Tokens>(`${this.AUTH_API_PREFIX}/login`, { ...data }, { params: { type: LoginType.USERNAME } });
	}

	/**
	 * 注册
	 */
	static signup(data: SignupModel) {
		return http.post<Tokens>(`${this.AUTH_API_PREFIX}/signup`, {
			...data,
		});
	}

	/**
	 * 刷新令牌
	 */
	static refresh(token: string) {
		return http.post<Tokens>(this.REFRESH_API_URL, {}, { params: { token } });
	}

	/**
	 * 登出
	 */
	static logout() {
		return http.post(`${this.AUTH_API_PREFIX}/logout`);
	}
}
