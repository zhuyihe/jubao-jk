
(function () {
    var vueTouchDrag = {};
    vueTouchDrag.install = function (Vue) {
        Vue.directive('touch-drag', {
            bind: function (el, binding, vnode) {
                var initiated = false;
                var offsetX = 0;
                var offsetY = 0;
                function touchStart(e) {
                    initiated = true;
                    var touch = e.touches[0];
                    offsetX = (touch.pageX - el.offsetLeft);
                    offsetY = (touch.pageY - el.offsetTop);
                    addEventListener('touchmove', touchMove);
                    addEventListener('touchend', touchEnd);
                    e.preventDefault();
                }
                function touchMove(e) {
                    if(!initiated)return;
                    var W = window.innerWidth - el.offsetWidth;
                    var H = window.innerHeight - el.offsetWidth;
                    var touch = e.touches[0];
                    el.style.left = Math.min(Math.max((touch.pageX - offsetX),0),W) + 'px';
                    el.style.top = Math.min(Math.max((touch.pageY - offsetY),0),H) + 'px';
                    e.preventDefault();
                }
                function touchEnd(e) {
                    initiated = false;
                    removeEventListener('touchmove', touchMove);
                    removeEventListener('touchend', touchEnd);
                    e.preventDefault();
                }
                el.addEventListener('touchstart', touchStart)
            }
        })
    }
    if (typeof exports == "object") {
        module.exports = vueTouchDrag;
    } else if (typeof define == "function" && define.amd) {
        define([], function () {
            return vueTouchDrag
        })
    } else if (window.Vue) {
        window.vueTouchDrag = vueTouchDrag;
        Vue.use(vueTouchDrag);
    }
})();
