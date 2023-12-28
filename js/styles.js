// reference: https://blog.csdn.net/BrianV530/article/details/135068495?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-135068495-blog-124718043.235^v40^pc_relevant_3m_sort_dl_base3&spm=1001.2101.3001.4242.2&utm_relevant_index=4
function backgroundParticles() {

    background = document.getElementById("background");
    background.style.width = innerWidth + 'px';
    background.style.height = innerHeight + 'px';

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = innerHeight;
    canvas.width = innerWidth;

    let particlesArray = [];
    // 页面内粒子数量
    let count = parseInt(canvas.width / 100 * canvas.height / 100);


    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // x，y轴的移动速度  -0.5 - 0.5
            this.directionX = Math.random() - 0.5;
            this.directionY = Math.random() - 0.5;
        }

        update() {
            this.x += this.directionX;
            this.y += this.directionY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }

    function createParticle() {
        // 随机坐标
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;

        particlesArray.push(new Particle(x, y));
    }

    // 先更新坐标，再绘制出来
    function handleParticle() {
        for (let i = 0; i < particlesArray.length; i++) {
            let particle = particlesArray[i];
            particle.update();
            particle.draw();
            // 超出范围就将这个粒子删除
            if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                particlesArray.splice(i, 1);
            }

            // 两个点之间的连线
            for (let j = i + 1; j < particlesArray.length; j++) {
                dx = particlesArray[j].x - particlesArray[i].x;
                dy = particlesArray[j].y - particlesArray[i].y;
                // 只画dist < 100的点之间的连线
                dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(255, 255, 255, " + (1 - dist / 100);
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.closePath();
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function draw() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // 如果粒子数量小于规定数量，就生成新的粒子
        if (particlesArray.length < count) {
            createParticle()
        }

        // 处理粒子
        handleParticle()
    }

    // 设置定时器
    setInterval(draw, 10)
}