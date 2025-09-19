import { Context } from 'koa';
import Basic from '../basic';
import _ from 'lodash';

// * 角色管理
class Role extends Basic {
	constructor() {
		super();
	}

	addAndModifyField = async (ctx: Context, data: any) => {
		const menu = await ctx.mongo.find('__menu');
		let roleMenu = [];
		for (const ItemPermission of data?.menuList || []) {
			for (const ItemMenu of menu) {
				if (ItemPermission == ItemMenu.key) {
					roleMenu.push(ItemMenu);
				}
			}
		}
		return {
			role_name: this.normalize(data?.role_name, ['string'], null), // 管理员 | 普通用户
			permission_str: this.normalize(data?.permission_str, ['string'], null), // 权限字符： admin / user
			level: this.normalize(data?.level, ['number'], null), // 角色级别  1
			sort: this.normalize(data?.sort, ['number'], null), // 角色排序  1
			status: this.normalize(data?.status, ['boolean'], false),
			permission_menu: this.normalize(data?.permission_menu, ['array'], []), // 菜单数组：树结构  ['menu', 'menu2', 'menu22', 'menu221', 'menu222']
			menuList: this.normalize(roleMenu, ['array'], []), // 菜单数组：角色菜单

			dataScope: '全部', // 数据范围
			depts: [] as any, // 数据权限：部门
			desc: data?.desc, // 角色描述

			createTime: new Date(),
			updateBy: 'admin',
			updateTime: new Date(),
		};
	};

	// * 新增角色：角色中带菜单
	addRole = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('添加角色：', data);

			// ! 权限字符不可以重复
			const permission_str = _.trim(_.get(data, 'permission_str', ''));
			if (!_.isEmpty(permission_str)) {
				const role = await ctx.mongo.find('__role', { query: { permission_str: permission_str } });
				if (role.length) return ctx.sendError(400, '新增角色错误：权限字符不可以重复');
			}
			const role = await this.addAndModifyField(ctx, data);
			const newRole: any = {
				...role,
				createTime: new Date(),
				updateBy: 'admin',
				updateTime: new Date(),
			};
			await ctx.mongo.insertOne('__role', newRole);
			return ctx.send('新增角色成功');
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 修改角色：角色中带菜单
	modifyRole = async (ctx: Context) => {
		try {
			// 1、获取前端参数并校验：
			const data: any = ctx.request.body;
			console.log('添加角色：', data);

			// ! 权限字符不可以重复
			const permission_str = _.trim(_.get(data, 'permission_str', ''));
			if (!_.isEmpty(permission_str)) {
				const role = await ctx.mongo.find('__role', { query: { permission_str: permission_str } });
				if (role.length) return ctx.sendError(400, '新增角色错误：权限字符不可以重复');
			}

			const role = await this.addAndModifyField(ctx, data);
			const newRole: any = {
				...role,
				updateBy: 'admin',
				updateTime: new Date(),
			};
			await ctx.mongo.updateOne('__role', data._id, newRole);
			return ctx.send('更新角色成功');
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 查询角色：角色中带菜单
	findRole = async (ctx: Context) => {
		try {
			// 1、获取前端参数：
			// 2、菜单结构应该是在服务端处理完后、将树结构传递回去
			// 3、接收的菜单是 ['menu', 'menu2', 'menu22', 'menu221', 'menu222'] 结构、处理后写入到库中
			const data = ctx.request.query;

			const find = await ctx.mongo.find('__role');

			return ctx.send({ list: find, page: 1, pageSize: 10, total: find.length });
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 删除角色
	delRole = async (ctx: Context) => {
		try {
			const data = ctx.request.query;
			console.log('删除角色 参数：', data);
			const { id } = data as { id: string };
			if (!id) return ctx.sendError(400, '未获取到id', 400);

			const del = await ctx.mongo.deleteOne('__role', id);
			return ctx.send(del);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new Role();
