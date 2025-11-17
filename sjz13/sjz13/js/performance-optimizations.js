// 使用Intersection Observer实现懒加载
class LazyLoader {
    constructor(selector = '.lazy-load', options = {}) {
        this.selector = selector;
        this.options = Object.assign({
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }, options);
        this.init();
    }

    init() {
        // 检查浏览器是否支持Intersection Observer
        if (!('IntersectionObserver' in window)) {
            // 如果不支持，立即加载所有图片
            this.loadAllImages();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.options);

        // 观察所有懒加载元素
        const lazyElements = document.querySelectorAll(this.selector);
        lazyElements.forEach((element) => {
            observer.observe(element);
        });
    }

    loadImage(element) {
        if (element.tagName === 'IMG') {
            // 如果是图片元素，加载src
            if (element.dataset.src) {
                element.src = element.dataset.src;
            }
        } else {
            // 如果是其他元素，可以加载背景图片
            if (element.dataset.bgSrc) {
                element.style.backgroundImage = `url(${element.dataset.bgSrc})`;
            }
        }
        // 添加加载完成类
        element.classList.add('lazy-loaded');
    }

    loadAllImages() {
        const lazyElements = document.querySelectorAll(this.selector);
        lazyElements.forEach((element) => {
            this.loadImage(element);
        });
    }
}

// 视口检测
class ViewportDetector {
    constructor(selector, callback, options = {}) {
        this.selector = selector;
        this.callback = callback;
        this.options = Object.assign({
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }, options);
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // 如果不支持，立即调用回调
            const elements = document.querySelectorAll(this.selector);
            elements.forEach((element) => {
                this.callback(element, true);
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                this.callback(entry.target, entry.isIntersecting);
            });
        }, this.options);

        // 观察所有元素
        const elements = document.querySelectorAll(this.selector);
        elements.forEach((element) => {
            observer.observe(element);
        });

        return observer;
    }
}

// 初始化性能优化功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化懒加载
    new LazyLoader('.lazy-load', {
        rootMargin: '50px 0px', // 提前50px加载
        threshold: 0.1
    });

    // 初始化视口检测
    new ViewportDetector('.viewport-detect', (element, isInViewport) => {
        if (isInViewport) {
            element.classList.add('in-viewport');
        } else {
            element.classList.remove('in-viewport');
        }
    });
});