import { Context } from 'koa';
import Basic from '../basic';
import _ from 'lodash'

interface JobParams {
	job_name?: string;
	job_sort?: string;
	status?: string;
	desc?: string;
}

// * 岗位管理
// 字段：
// 创建人：admin
// 创建时间：2025-05-27
// 修改人：user
// 修改时间
// 标记：remark
// 职位id：1
// 职位代码：ceo
// 职位名称：董事长
// 职位排序：1
// 状态：0
// flag：false
class Job extends Basic {
	constructor() {
		super();
	}
	// 优化：添加更详细的验证
	private validateJobData = (data: JobParams) => {
		const errors: string[] = [];

		if (!data?.job_name?.trim()) {
			errors.push('岗位名称不能为空');
		} else if (data.job_name.length > 50) {
			errors.push('岗位名称长度不能超过50个字符');
		}

		if (!data?.job_sort) {
			errors.push('岗位排序不能为空');
		} else if (isNaN(Number(data.job_sort)) || Number(data.job_sort) < 0) {
			errors.push('岗位排序必须是大于等于0的数字');
		}

		if (!data?.status?.trim()) {
			errors.push('状态不能为空');
		}

		return errors;
	};

	// 岗位代码应该自动生成
	private generatePostCode = (postName: string) => {
		// 简单的拼音首字母生成
		return postName
			.split('')
			.map(char => (char.charCodeAt(0) > 255 ? char.charAt(0) : char))
			.join('')
			.toLowerCase()
			.replace(/\s+/g, '_');
	}; 

	// 检查岗位名称是否已存在
	private checkPostName = async (ctx: Context, postName: string) => {
		const existing = await ctx.mongo.find('__job', { query: { postName: postName } });
		// console.log('existing', existing);
		return !!existing.length;
	};

	// * 查询岗位
	findJob = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('查询参数：', data);

			const { postName, postSort, status } = data?.search || {};
			const query: Record<string, any> = {};
			if (postName?.trim()) {
				query.postName = { $regex: postName.trim(), $options: 'i' }; // 不区分大小写
			}
			if (postSort?.toString().trim()) {
				const sortNum = Number(postSort);
				if (!isNaN(sortNum)) {
					query.postSort = sortNum;
				}
			}
			throw new Error("故意报错 error")
			if (status?.trim()) {
				query.status = new RegExp(status.trim());
			}

			// 添加分页和排序的默认值
			const page = Math.max(1, Number(data.pagination?.page) || 1);
			const pageSize = Math.min(100, Math.max(1, Number(data.pagination?.pageSize) || 10));

			const [count, list] = await Promise.all([
				ctx.mongo.count('__job', query),
				ctx.mongo.find('__job', {
					query,
					page,
					pageSize,
					sort: data.sort || { postSort: 1, createTime: -1 },
				}),
			]);

			return ctx.send({
				list,
				page,
				pageSize,
				total: count,
			});
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};


	// * 新增岗位
	addJob = async (ctx: Context) => {
		try {
			const data: JobParams = ctx.request.body;
			console.log('新增岗位参数：', data);

			const check = await this.checkPostName(ctx, data?.job_name);
			if (check) return ctx.sendError(400, '已存在岗位名称');

			const errInfo = this.validateJobData(data);
			if (errInfo.length) return ctx.sendError(400, errInfo[0]);

			// * 先查询岗位名称是否重复
			const newJob: any = {  
				postCode:  this.generatePostCode(data?.job_name),
				postName: _.trim(_.toString(data?.job_name)), // 产品经理 | 前端开发 | 会计
				postSort: _.toNumber(data.job_sort), // 排序
				status: _.trim(_.toString(data.status)), // 开关：开启/关闭  
				desc: _.trim(_.toString(data?.desc)),
				flag: false, 
				createBy: 'admin',
				createTime: new Date(), 
				updateBy: null,
				updateTime: new Date(),
			};
			const ins = await ctx.mongo.insertOne('__job', newJob);
			return ctx.send(`新增数据成功!`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 修改岗位
	modifyJob = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			const data: JobParams = ctx.request.body;
			console.log('修改岗位参数：', data);
			if (!id) return ctx.sendError(400, `修改岗位操作：无iD`);

			const check = await this.checkPostName(ctx, data?.job_name);
			if (check) return ctx.sendError(400, '已存在岗位名称');

			
			const errInfo = this.validateJobData(data);
			if (errInfo.length) return ctx.sendError(400, errInfo[0]);

			// * 先查询岗位名称是否重复
			const newJob: any = {  
				postCode:  this.generatePostCode(data?.job_name),
				postName: _.trim(_.toString(data?.job_name)), // 产品经理 | 前端开发 | 会计
				postSort: _.toNumber(data.job_sort), // 排序
				status: _.trim(_.toString(data.status)), // 开关：开启/关闭  
				desc: _.trim(_.toString(data?.desc)),
				flag: false, 
				updateBy: "admin",
				updateTime: new Date(),

			};
			const ins = await ctx.mongo.updateOne('__job', id, newJob);
			return ctx.send(ins);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除岗位
	delJob = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (id) {
				const ins = await ctx.mongo.deleteOne('__job', id);
				return ctx.send(ins);
			} else {
				return ctx.sendError(400, `删除岗位操作：前端未传递id！`);
			}
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除多个岗位
	delMoreJob = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const _id of data) {
					await ctx.mongo.deleteOne('__job', _id);
				}
				return ctx.send('全部删除完成');
			} else {
				return ctx.sendError(400, `删除岗位操作：前端传递的参数不正确！`);
			}
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * Excel 表格数据导入
	ExJob = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('Excel 数据', data);

			if (data && data.length) {
				for (const element of data) {
					const newJob: any = { 
						postCode: "ceo",
						postName: _.trim(_.toString(element.postName)), // 产品经理 | 前端开发 | 会计
						postSort: _.toNumber(element.postSort), // 排序
						status: _.trim(_.toString(element.status)), // 开关：开启/关闭  
						desc: _.trim(_.toString(element?.desc)),
						flag: false,
						createBy: "admin",
						createTime: new Date(),
						updateBy: null,
						updateTime: null,
					};
					const ins = await ctx.mongo.insertOne('__job', newJob);
				}
				return ctx.send('岗位数据导入成功');
			} else {
				return ctx.sendError(400, `服务端未获取到数据`);
			}
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};
}

export default new Job();
