const canvas = document.querySelector("#home canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const particleCount = 100;
const maxDistance = 100;
const magnetDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.radius = Math.random() * 1.5 + 1.5;
    }

    update(mouse) {
        this.x += this.speedX;
        this.y += this.speedY;
    
        // Check if mouse is not over the specified elements
        if (!isMouseOverElement(mouse, '.navbar, .home-text')) {
            if (mouse.x && mouse.y && Math.hypot(mouse.x - this.x, mouse.y - this.y) < magnetDistance) {
                this.x -= (this.x - mouse.x) / 50;
                this.y -= (this.y - mouse.y) / 50;
            }
        }
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
particles.push(new Particle());
}

function connectParticles() {
for (let a = 0; a < particles.length; a++) {
for (let b = a + 1; b < particles.length; b++) {
let distance = Math.hypot(
particles[a].x - particles[b].x,
particles[a].y - particles[b].y
);
if (distance < maxDistance) {
ctx.strokeStyle =
"rgba(0, 0, 0, " + (1 - distance / maxDistance) + ")";
ctx.beginPath();
ctx.moveTo(particles[a].x, particles[a].y);
ctx.lineTo(particles[b].x, particles[b].y);
ctx.stroke();
}
}
}
}

let mouse = {
x: null,
y: null,
};

window.addEventListener("mousemove", function (event) {
mouse.x = event.x;
mouse.y = event.y;
});

function isMouseOverElement(mouse, elementSelector) {
    const elements = document.querySelectorAll(elementSelector);
    return Array.from(elements).some(element => {
        const rect = element.getBoundingClientRect();
        return (
            mouse.x >= rect.left &&
            mouse.x <= rect.right &&
            mouse.y >= rect.top &&
            mouse.y <= rect.bottom
        );
    });
}


function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < particles.length; i++) {
particles[i].update(mouse);
particles[i].draw();
}
connectParticles();
requestAnimationFrame(animate);
}

animate();    

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select all links with hashes
    document.querySelectorAll('.navbar a[href^="#"], .scroll-down a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Scroll to the specific section smoothly
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function openProjectDetail(projectId) {
    setTimeout(() => {
        var modal = document.getElementById(projectId);
        modal.classList.add('show');
    }, 100); // Delay in ms
}


function closeProjectDetail(projectId) {
    var modal = document.getElementById(projectId);
    modal.classList.remove('show');
}

