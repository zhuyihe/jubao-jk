import messages from 'muse-ui-message';
import toasts from 'muse-ui-toast';
/** 
 * 提示框
 * @param {String} type 提示框类型
 * @param {String} content 内容
 * @param {String} title 标题
 * @param {Object} options 更改默认的配置信息
*/
export const message = (type, content, options, title = '提示') => {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'alert':
                messages.alert(content, title, options).then(() => {
                    resolve()
                })
                break;
            case 'confirm':
                messages.confirm(content, title, options).then(({ result }) => {
                    if (result) {
                        resolve()
                    } else {
                        reject()
                    }
                })
                break;
            case 'prompt':
                messages.alert(content, title, options).then(({ result, value }) => {
                    if (result) {
                        resolve(value)
                    } else {
                        reject()
                    }
                })
                break;
        }
    })

}
/** 
 * 提示消息
 * @param {String} type 消息类型
 * @param {String} content 内容
*/
export const toast = (type, content) => {
    switch (type) {
        case 'success':
            toasts.success(content)
            break;
        case 'message':
            toasts.message(content)
            break;
        case 'info':
            toasts.info(content)
            break;
        case 'warning':
            toasts.warning(content)
            break;
        case 'error':
            toasts.error(content)
            break;
    }
}
//js 延迟函数 函数去抖
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）默认·500ms
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export const debounce = function (fn, delay = 500) {
	let timer = null;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
		  fn.call(this,...args)
    }, delay)
	}
}