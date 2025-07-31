import http from '@/api/api';
import httpUpack from '@/api/upack';
import { AuthState } from '@/redux/interface';
import { PORT1 } from '@/api/config/servicePort';
import { Params, ReqLogin, ReqPage, ResLogin, ResPage, UserList } from '@/api/interface/index';
import authMenuList from '@/assets/api/authMenuList.json';
import authButtonList from '@/assets/api/authButtonList.json';
import loginJSON from '@/assets/api/login.json';

// * 系统管理 — 用户管理 — 登陆、注册、退出
export const userLogin = (params: Params) => httpUpack.post(`/userp/login`, params);
export const userLogout = (params: Params) => httpUpack.post(`/userp/logout`, params);
export const userRegister = (params: Params) => httpUpack.post(`/userp/register`, params);

// 用户登陆
export const loginApi = (params: ReqLogin) => {
	return http.post<ResLogin>(PORT1 + `/login`, params);
	// return http.post<ResLogin>(PORT1 + `/login`, params, { loading: false });
	// return http.post<ResLogin>(PORT1 + `/login`, {}, { params });
	// return http.post<ResLogin>(PORT1 + `/login`, qs.stringify(params));
	// return http.get<ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`);
	// return loginJSON;
};

// ! 获取菜单列表
export const getAuthMenuListApi = () => {
	return http.get<AuthState['authMenuList']>(PORT1 + `/menu/list`);
	// return authMenuList
};

// 获取按钮权限
// export const getAuthButtonListApi = () => http.get<AuthState['authButtonList']>(PORT1 + `/auth/buttons`)
export const getAuthButtonListApi = () => authButtonList;

// 用户退出
export const logoutApi = () => http.post(PORT1 + `/logout`, {}, { loading: true });

// 获取用户列表
export const getUserList = (params: ReqPage) => http.post<ResPage<UserList>>(PORT1 + `/user/list`, params);
