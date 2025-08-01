/** #### el是否包含某个class  */
const hasClass = (el: { className: string }, className: string) => {
	let reg = new RegExp('(^|s)' + className + '(s|$)');
	return reg.test(el.className);
};

/** #### el添加某个class  */
const addClass = (el: { className: any }, className: string) => {
	if (hasClass(el, className)) {
		return;
	}
	let newClass = el.className.split(' ');
	newClass.push(className);
	el.className = newClass.join(' ');
};

/** #### el去除某个class  */
const removeClass = (el: { className: any }, className: string) => {
	if (!hasClass(el, className)) {
		return;
	}
	let reg = new RegExp('(^|s)' + className + '(s|$)', 'g');
	el.className = el.className.replace(reg, ' ');
};

/** #### 获取兄弟节点  */
const siblings = (ele: { parentNode: { children: any } }) => {
	console.log(ele.parentNode);
	var chid = ele.parentNode.children,
		eleMatch = [];
	for (var i = 0, len = chid.length; i < len; i++) {
		if (chid[i] != ele) {
			eleMatch.push(chid[i]);
		}
	}
	return eleMatch;
};

/**
 * @description  获取滚动的坐标
 */
const getScrollPosition = (el: any) => ({
	x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
	y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

/**
 * @description  滚动到顶部
 */
const scrollToTop = () => {
	const c = document.documentElement.scrollTop || document.body.scrollTop;
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, c - c / 8);
	}
};

/**
 * ! el是否在视口范围内
 */
interface Example {
	getBoundingClientRect: () => { top: number; left: number; bottom: number; right: number };
}
const elementIsVisibleInViewport = (el: Example, partiallyVisible = false) => {
	const { top, left, bottom, right } = el.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	return partiallyVisible
		? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
		: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
