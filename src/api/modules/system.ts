import { PORT1 } from '@/api/config/servicePort';
import http from '@/api/upack';
import httpIndex from '@/api';
import { Params } from '@/api/interface';

// * http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// * System
// * 系统管理 — 菜单管理
export const FindAllMenu = (params: Params) => http.get(`/menu/allMenu`, params);
export const InsNewMenu = (params: Params) => http.post(`/menu/addMenu`, params);
export const UpMenu = (params: Params) => http.post(`/menu/modMenu`, params);
export const DelMenu = (params: Params) => http.post(`/menu/delMenu`, params);

// * 系统管理 — 用户管理
export const GetUserManagerList = (params: Params) => http.get(`/userp/users2`, params);
export const DelUser = (id: string) => http.delete(`/userp/users`, { id });
export const GetProTableUser = (params: Params) => http.get(`/userp/users1`, params);
export const DelMoreUser = (ids: string[]) => http.post(`/userp/delMoreUsers`, { ids });
export const DelMoreProTableUser = (ids: Params) => http.post('/userp/delMoreUsers', { data: ids });

// * 系统管理 — 岗位管理
export const findJob = (params: Params) => http.get(`/jb/job`, params);
export const addJob = (params: Params) => http.post(`/jb/job`, params);
export const delJob = (id: string) => http.delete(`/jb/job/${id}`);
export const delMoreJob = (data: string[]) => http.post(`/jb/jobs`, data);
export const modifyJob = (id: string, params: Params) => http.put(`/jb/job/${id}`, params);

// * 系统管理 — 角色管理
export const findRole = (params: Params) => http.get(`/role/findRole`, params);
export const addRole = (params: Params) => http.post(`/role/addRole`, params);
export const modifyRole = (params: Params) => http.post(`/role/modifyRole`, params);
export const delRole = (id: string) => http.delete(`/role/delRole`, { id });

export const roleList = () => httpIndex.get(PORT1 + `/role/list`); // 获取角色列表
export const roleTransferList = (id: number) => httpIndex.get(PORT1 + `/role/transfer/list`); // 获取角色转换列表

// * 系统管理 — 部门管理
export const findDept = (params: Params) => http.get(`/dept/departments`, params);
export const addDept = (params: Params) => http.post(`/dept/department`, params);
export const modifyDept = (id: string, data: any) => http.put(`/dept/department/${id}`, data);
export const delDept = (id: string) => http.delete(`/dept/department/${id}`);

const categoryList = (parentId: string) => http.get(`/category/list?parentId=${parentId}`); // 获取分类列表

export const fetchUserDepttList = (params = {}) => httpIndex.get(PORT1 + `/dept/list`, params); // 获取用户管理左侧分类列表（杭州,上海地区）
export const fetchUserList = (params = {}) => httpIndex.get(PORT1 + `/user/list2`, params); // 获取用户列表
export const fetchUserDetail = (params = {}) => httpIndex.get(PORT1 + `/user/detail`, params); // 获取用户详情
export const fetchUserDelete = (params = {}) => httpIndex.get(PORT1 + `/user/delete`, params); // 删除
export const fetchRoleList = (params = {}) => httpIndex.get(PORT1 + `/rolelist`, params); // 角色 List
export const fetchChangeUserStatus = (params = {}) => httpIndex.get(PORT1 + `/user/changeStatus`, params); // 用户 Status
export const fetchUserDetailUpdate = (params = {}) => httpIndex.post(PORT1 + `/user/detailUpdate`, params); // 弹窗: 修改人员信息
export const fetchUserAdd = (params = {}) => httpIndex.post(PORT1 + `/user/add`, params); // 弹窗: 新增人员信息
export const fetchUserSetRole = (params = {}) => httpIndex.post(PORT1 + `/user/set/role`, params); // 角色：修改角色信息
