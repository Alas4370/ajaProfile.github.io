// **************** Sticky header ****************
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// **************** Circle Progress bar ****************
// document.querySelectorAll('.circular-progress').forEach(progress => {
//     const percentage = progress.getAttribute('data-progress');
//     const radius = 70; // Circle radius
//     const circumference = 2 * Math.PI * radius;

//     const progressCircle = progress.querySelector('.progress');
//     progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
//     progressCircle.style.strokeDashoffset = circumference;

//     const offset = circumference - (percentage / 100 * circumference);
//     progressCircle.style.strokeDashoffset = offset;

//     const progressValue = progress.querySelector('.progress-value');
//     progressValue.innerText = `${percentage}%`;
// });


// // **************** Animate progress on skills ****************
// // Function to animate percentage value
// function animatePercentage(element, targetValue) {
//     let currentValue = 0;
//     const interval = setInterval(() => {
//         if (currentValue < targetValue) {
//             currentValue++;
//             element.innerHTML = currentValue + '%';
//         } else {
//             clearInterval(interval);
//         }
//     }, 20); // Speed of the percentage increment
// }

// // Function to animate percentage value
// function animatePercentage(element, targetValue) {
//     let currentValue = 0;
//     const interval = setInterval(() => {
//         if (currentValue < targetValue) {
//             currentValue++;
//             element.innerHTML = currentValue + '%';
//         } else {
//             clearInterval(interval);
//         }
//     }, 20); // Speed of the percentage increment
// }

// // Function to animate circular progress bar
// function animateCircularProgress(element) {
//     const targetValue = element.getAttribute('data-progress');
//     const circle = element.querySelector('.progress');
//     const radius = circle.r.baseVal.value;
//     const circumference = 2 * Math.PI * radius;

//     circle.style.strokeDasharray = circumference;
//     circle.style.strokeDashoffset = circumference; // Initially hide the stroke

//     // Reset progress for animation
//     circle.style.transition = 'none'; // Disable transition for reset
//     circle.style.strokeDashoffset = circumference; // Reset to full circle (hidden)

//     // Force reflow to reset the CSS (important to apply changes)
//     circle.getBoundingClientRect();

//     // Animate progress
//     setTimeout(() => {
//         circle.style.transition = `stroke-dashoffset 2s ease`;
//         const offset = circumference - (targetValue / 100) * circumference;
//         circle.style.strokeDashoffset = offset;
//     }, 100); // Delay for the transition to be visible

//     // Animate percentage value
//     const percentage = element.querySelector('.progress-value');
//     animatePercentage(percentage, targetValue);
// }

// Keep track of visibility state
const progressState = new WeakMap();

// Trigger animation when scrolling into view
function animateOnScroll() {
    const progressBars = document.querySelectorAll('.circular-progress');

    progressBars.forEach((progressBar) => {
        const inViewport = isInViewport(progressBar);

        if (inViewport && !progressState.get(progressBar)) {
            animateCircularProgress(progressBar);
            progressState.set(progressBar, true); // Mark as animated
        } else if (!inViewport) {
            progressState.set(progressBar, false); // Reset animation state
        }
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Event listener to trigger animation
window.addEventListener('scroll', animateOnScroll);


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        // Adjust the offset as necessary
        if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// **************** Download PDF Resume ****************
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'https://alas4370.github.io/ajaProfile.github.io/assets/pdf/AJA_Resume.pdf'; // Replace with the actual path to your PDF file
    link.download = 'AJA_Resume.pdf'; // Replace with the desired file name for download
    link.click();
}

// **************** Copy to Clipboard ****************
document.getElementById("phone-number").addEventListener("click", function() {
    navigator.clipboard.writeText(this.textContent)
        .then(() => {
            alert("Phone number copied: " + this.textContent);
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
});

document.getElementById("email-address").addEventListener("click", function() {
    navigator.clipboard.writeText(this.textContent)
        .then(() => {
            alert("Email copied: " + this.textContent);
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
});

// **************** Light or Dark mode Switch ****************
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.section.classList.toggle('dark-mode');
});

const canvas = document.getElementById('skillsCanvas');
const ctx = canvas.getContext('2d');

// Skill data
const skills = [
    { name: 'HTML', months: 24 },
    { name: 'CSS', months: 24 },
    { name: 'JavaScript', months: 18 },
    { name: 'MySQL', months: 24 },
    { name: 'PHP', months: 18 },
    { name: 'Laravel', months: 6 },
    { name: 'Photo Editing', months: 24 },
    { name: 'Git', months: 12 },
];

// Canvas settings
const chartWidth = 600; // Width of the bar chart area
const chartHeight = 280; // Height of the bar chart area
const xOffset = 120; // Left padding for the y-axis labels
const yOffset = 40; // Top padding for the x-axis labels and chart area
const barHeight = 20; // Height of each bar
const barSpacing = 15; // Space between bars

// Animation settings
let animationProgress = 0; // To track animation progress
const animationSpeed = 0.01; // Speed of animation (adjustable)
const maxMonths = 36; // Maximum months to scale the bars (3 years)

// Draw x-axis and y-axis
function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(xOffset, yOffset);
    ctx.lineTo(xOffset, chartHeight + yOffset);
    ctx.lineTo(xOffset + chartWidth, chartHeight + yOffset);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Draw y-axis labels (categories)
function drawYAxisLabels() {
    ctx.font = '14px Arial';
    ctx.fillStyle = '#555';
    skills.forEach((skill, index) => {
        const yPos = yOffset + index * (barHeight + barSpacing) + barHeight / 2;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, xOffset - 10, yPos);
    });
}

// Draw x-axis labels (years)
function drawXAxisLabels() {
    const steps = 3; // Number of intervals (0yr, 1yr, ..., 4yrs)
    for (let i = 0; i <= steps; i++) {
        const year = (i * 3) / steps;
        const xPos = xOffset + (year / 3) * chartWidth;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        if (i == 0 || i == 1) {
            ctx.fillText(`${year} year`, xPos, chartHeight + yOffset + 3);
        } else {
            ctx.fillText(`${year} years`, xPos, chartHeight + yOffset + 3);
        }
    }
}

// Draw bars with animation
function drawBars() {
    skills.forEach((skill, index) => {
        const barWidth = (skill.months / maxMonths) * chartWidth; // Calculate bar width based on months
        const yPos = yOffset + index * (barHeight + barSpacing);

        // Bar background (for neumorphic effect)
        ctx.fillStyle = '#d9d9d9';
        ctx.fillRect(xOffset, yPos, chartWidth, barHeight);

        // Bar fill (animated width)
        const currentBarWidth = barWidth * animationProgress;
        const gradient = ctx.createLinearGradient(0, 0, currentBarWidth, 0);
        gradient.addColorStop(0, '#ff8680');
        gradient.addColorStop(1, '#ff554d');
        ctx.fillStyle = gradient;
        ctx.fillRect(xOffset, yPos, currentBarWidth, barHeight);

        // Neumorphic shadow effect
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.strokeRect(xOffset, yPos, currentBarWidth, barHeight);

        // Animated months text inside the colored bar (centered)
        const animatedMonths = Math.floor(skill.months * animationProgress); // Animate months text
        const textWidth = ctx.measureText(`${animatedMonths} months`).width; // Measure text width
        const textXPos = xOffset + (currentBarWidth - textWidth) / 2; // Center text within the bar
        ctx.font = '12px Arial';
        ctx.fillStyle = '#fff'; // Text color (white for contrast)
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${animatedMonths} months`, textXPos, yPos + barHeight / 2); // Position text inside the bar
    });
}

// Animation loop
function animate() {
    if (animationProgress < 1) {
        animationProgress += animationSpeed; // Gradually increase progress
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the next frame
        drawChart();
        requestAnimationFrame(animate); // Continue animation
    } else {
        drawChart(); // Draw final state when animation completes
    }
}

// Draw the entire chart
function drawChart() {
    drawAxes();
    drawYAxisLabels();
    drawXAxisLabels();
    drawBars();
}

// Detect if the #skills section is fully out of the viewport
function isFullyOutOfViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom < 0 || // Completely scrolled up
        rect.top > window.innerHeight // Completely scrolled down
    );
}

// Track visibility state
let wasOutOfViewport = true; // Assume initially out of viewport
let isAnimating = false;

// Animation loop
function animate() {
    if (animationProgress < 1) {
        animationProgress += 0.01; // Adjust speed for smooth animation
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the next frame
        drawChart();
        requestAnimationFrame(animate); // Continue animation
    } else {
        drawChart(); // Draw final state when animation completes
        isAnimating = false; // Allow reanimation
    }
}

// Scroll event to trigger the animation
window.addEventListener('scroll', function () {
    const skillsSection = document.getElementById('skills');

    if (isFullyOutOfViewport(skillsSection)) {
        wasOutOfViewport = true; // Mark section as fully out of viewport
    } else if (wasOutOfViewport && !isAnimating) {
        // Section re-entered the viewport after being fully out
        wasOutOfViewport = false; // Update state
        isAnimating = true; // Prevent multiple triggers
        animationProgress = 0; // Reset animation progress
        animate(); // Trigger the animation
    }
});

