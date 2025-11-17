// 拖拽元素弹性跟随效果
class ElasticDrag {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({
            spring: 0.1,
            friction: 0.8,
            maxSpeed: 50
        }, options);
        this.isDragging = false;
        this.targetX = 0;
        this.targetY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.init();
    }

    init() {
        this.element.style.position = 'absolute';
        this.element.style.touchAction = 'none';
        this.addEventListeners();
        this.animate();
    }

    addEventListeners() {
        this.element.addEventListener('mousedown', (e) => this.onDragStart(e));
        this.element.addEventListener('touchstart', (e) => this.onDragStart(e));

        document.addEventListener('mousemove', (e) => this.onDragMove(e));
        document.addEventListener('touchmove', (e) => this.onDragMove(e));

        document.addEventListener('mouseup', () => this.onDragEnd());
        document.addEventListener('touchend', () => this.onDragEnd());
    }

    onDragStart(e) {
        this.isDragging = true;
        const event = e.touches ? e.touches[0] : e;
        this.targetX = event.clientX - this.currentX;
        this.targetY = event.clientY - this.currentY;
    }

    onDragMove(e) {
        if (!this.isDragging) return;
        const event = e.touches ? e.touches[0] : e;
        this.targetX = event.clientX - this.currentX;
        this.targetY = event.clientY - this.currentY;
    }

    onDragEnd() {
        this.isDragging = false;
    }

    animate() {
        const deltaX = this.targetX - this.currentX;
        const deltaY = this.targetY - this.currentY;

        this.velocityX += deltaX * this.options.spring;
        this.velocityY += deltaY * this.options.spring;

        this.velocityX *= this.options.friction;
        this.velocityY *= this.options.friction;

        // 限制最大速度
        this.velocityX = Math.max(-this.options.maxSpeed, Math.min(this.options.maxSpeed, this.velocityX));
        this.velocityY = Math.max(-this.options.maxSpeed, Math.min(this.options.maxSpeed, this.velocityY));

        this.currentX += this.velocityX;
        this.currentY += this.velocityY;

        this.element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

        requestAnimationFrame(() => this.animate());
    }
}

// 3D旋转产品展示
class Product3DRotator {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({
            sensitivity: 0.5,
            perspective: 1000
        }, options);
        this.rotationX = 0;
        this.rotationY = 0;
        this.init();
    }

    init() {
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.perspective = `${this.options.perspective}px`;
        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        this.rotationY = (e.clientX - centerX) * this.options.sensitivity;
        this.rotationX = -(e.clientY - centerY) * this.options.sensitivity;

        this.element.style.transform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
    }
}

// 鼠标轨迹粒子效果
class MouseTrailParticles {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            particleCount: 50,
            particleSize: 3,
            particleLife: 1000,
            particleSpeed: 0.5
        }, options);
        this.particles = [];
        this.init();
    }

    init() {
        // 创建Canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        // 事件监听
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('resize', () => this.resizeCanvas());

        // 动画循环
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    onMouseMove(e) {
        // 创建新粒子
        const particle = {
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * this.options.particleSpeed,
            vy: (Math.random() - 0.5) * this.options.particleSpeed,
            size: this.options.particleSize + Math.random() * 2,
            life: this.options.particleLife,
            maxLife: this.options.particleLife
        };
        this.particles.push(particle);

        // 限制粒子数量
        if (this.particles.length > this.options.particleCount) {
            this.particles.shift();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制粒子
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 减少生命值
            particle.life -= 16;

            // 计算透明度
            const alpha = particle.life / particle.maxLife;

            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(63, 81, 181, ${alpha})`;
            this.ctx.fill();

            // 移除死亡粒子
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// 翻书/滑动切换效果
class PageFlipEffect {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            transitionSpeed: 0.5
        }, options);
        this.pages = Array.from(this.container.children);
        this.currentPage = 0;
        this.isAnimating = false;
        this.init();
    }

    init() {
        // 设置初始样式
        this.pages.forEach((page, index) => {
            page.style.position = 'absolute';
            page.style.width = '100%';
            page.style.height = '100%';
            page.style.transformStyle = 'preserve-3d';
            page.style.backfaceVisibility = 'hidden';
            page.style.transform = index === 0 ? 'rotateY(0deg)' : 'rotateY(180deg)';
            page.style.transition = `transform ${this.options.transitionSpeed}s ease`;
        });
    }

    flipNext() {
        if (this.isAnimating || this.currentPage >= this.pages.length - 1) return;
        this.isAnimating = true;

        const current = this.pages[this.currentPage];
        const next = this.pages[this.currentPage + 1];

        current.style.transform = 'rotateY(-180deg)';
        next.style.transform = 'rotateY(0deg)';

        this.currentPage++;
        setTimeout(() => { this.isAnimating = false; }, this.options.transitionSpeed * 1000);
    }

    flipPrevious() {
        if (this.isAnimating || this.currentPage <= 0) return;
        this.isAnimating = true;

        const current = this.pages[this.currentPage];
        const prev = this.pages[this.currentPage - 1];

        current.style.transform = 'rotateY(180deg)';
        prev.style.transform = 'rotateY(0deg)';

        this.currentPage--;
        setTimeout(() => { this.isAnimating = false; }, this.options.transitionSpeed * 1000);
    }
}

// 初始化所有动画效果
document.addEventListener('DOMContentLoaded', () => {
    // 初始化拖拽元素弹性跟随效果
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(el => new ElasticDrag(el));

    // 初始化3D旋转产品展示
    const productElements = document.querySelectorAll('.product-3d');
    productElements.forEach(el => new Product3DRotator(el));

    // 初始化鼠标轨迹粒子效果
    new MouseTrailParticles(document.body);

    // 初始化翻书/滑动切换效果
    const flipContainers = document.querySelectorAll('.page-flip-container');
    flipContainers.forEach(el => new PageFlipEffect(el));
});