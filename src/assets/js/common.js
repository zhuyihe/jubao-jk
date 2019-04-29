import messages from 'muse-ui-message';
import toasts from 'muse-ui-toast';
/** 
 * 提示框
 * @param {String} type 提示框类型
 * @param {String} content 内容
 * @param {String} title 标题
*/
export const message = (type, content, title) => {
    switch (type) {
        case 'alert':
            messages.alert(content, title)
            break;
        case 'confirm':
            messages.confirm(content, title)
            break;
        case 'prompt':
            messages.alert(content, title)
            break;
    }
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