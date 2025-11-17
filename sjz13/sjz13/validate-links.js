// 验证页面链接和图片链接的脚本
// 此脚本可以在浏览器控制台中运行

console.log("=== 页面链接验证 ===");

// 验证所有页面链接
const pages = ['index.html', 'index-1.html', 'index-3.html', 'index-4.html'];

// 检查当前页面
console.log("当前页面:", window.location.pathname);

// 检查外部资源
console.log("\n=== 外部资源验证 ===");

// 检查CSS文件
const cssFiles = [
    'css/style.css',
    'css/grid.css',
    'css/camera.css',
    'css/font-awesome.css'
];

cssFiles.forEach(css => {
    const link = document.querySelector(`link[href="${css}"]`);
    if (link) {
        console.log("✓ CSS文件存在:", css);
    } else {
        console.log("✗ CSS文件缺失:", css);
    }
});

// 检查JavaScript文件
const jsFiles = [
    'js/jquery.js',
    'js/jquery-migrate-1.2.1.js',
    'js/script.js',
    'js/camera.js',
    'js/superfish.js',
    'js/jquery.ui.totop.js',
    'js/jquery.equalheights.js',
    'js/jquery.mobilemenu.js',
    'js/jquery.easing.1.3.js',
    'js/TMForm.js',
    'js/sForm.js',
    'js/touchTouch.jquery.js',
    'js/advanced-animations.js',
    'js/performance-optimizations.js'
];

jsFiles.forEach(js => {
    const script = document.querySelector(`script[src="${js}"]`);
    if (script) {
        console.log("✓ JS文件存在:", js);
    } else {
        console.log("✗ JS文件缺失:", js);
    }
});

// 检查图片链接
console.log("\n=== 图片链接验证 ===");
const images = document.querySelectorAll('img');
let validImages = 0;
let brokenImages = 0;

images.forEach((img, index) => {
    const src = img.getAttribute('src');
    if (src) {
        // 检查图片是否加载成功
        if (img.complete && img.naturalWidth > 0) {
            validImages++;
        } else {
            brokenImages++;
            console.log("✗ 图片加载失败:", src);
        }
    }
});

console.log(`\n图片验证结果: ${validImages} 张有效, ${brokenImages} 张失效`);

// 检查动画功能
console.log("\n=== 动画功能验证 ===");

// 检查3D产品展示
const product3dElements = document.querySelectorAll('.product-3d');
if (product3dElements.length > 0) {
    console.log("✓ 3D产品展示元素存在:", product3dElements.length);
}

// 检查懒加载图片
const lazyLoadImages = document.querySelectorAll('.lazy-load');
if (lazyLoadImages.length > 0) {
    console.log("✓ 懒加载图片存在:", lazyLoadImages.length);
}

// 检查拖拽元素
const draggableElements = document.querySelectorAll('[data-draggable]');
if (draggableElements.length > 0) {
    console.log("✓ 拖拽元素存在:", draggableElements.length);
}

// 检查翻书效果容器
const pageFlipContainer = document.querySelector('#page-flip-container');
if (pageFlipContainer) {
    console.log("✓ 翻书效果容器存在");
}

console.log("\n=== 验证完成 ===");