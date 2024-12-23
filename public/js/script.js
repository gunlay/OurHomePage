document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // 鼠标移动处理
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 更新光标位置
        cursorGlow.style.opacity = '1';
        
        // 为产品卡片更新鼠标位置变量
        products.forEach(product => {
            const rect = product.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            product.style.setProperty('--mouse-x', `${x}%`);
            product.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // 平滑动画
    function animate() {
        // 实现平滑跟随效果
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursorGlow.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 鼠标离开页面时隐藏光效
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    // 产品卡片的悬停效果
    products.forEach(product => {
        product.addEventListener('mousemove', (e) => {
            const rect = product.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            product.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;
        });
        
        product.addEventListener('mouseleave', () => {
            product.style.transform = 'translateY(0)';
        });
    });
    
    // Intersection Observer 代码保持不变...
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    products.forEach(product => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px)';
        observer.observe(product);
    });
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});