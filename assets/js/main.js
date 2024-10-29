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
document.querySelectorAll('.circular-progress').forEach(progress => {
    const percentage = progress.getAttribute('data-progress');
    const radius = 70; // Circle radius
    const circumference = 2 * Math.PI * radius;

    const progressCircle = progress.querySelector('.progress');
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    const offset = circumference - (percentage / 100 * circumference);
    progressCircle.style.strokeDashoffset = offset;

    const progressValue = progress.querySelector('.progress-value');
    progressValue.innerText = `${percentage}%`;
});


// **************** Animate progress on skills ****************
// Function to animate percentage value
function animatePercentage(element, targetValue) {
    let currentValue = 0;
    const interval = setInterval(() => {
        if (currentValue < targetValue) {
            currentValue++;
            element.innerHTML = currentValue + '%';
        } else {
            clearInterval(interval);
        }
    }, 20); // Speed of the percentage increment
}

// Function to animate percentage value
function animatePercentage(element, targetValue) {
    let currentValue = 0;
    const interval = setInterval(() => {
        if (currentValue < targetValue) {
            currentValue++;
            element.innerHTML = currentValue + '%';
        } else {
            clearInterval(interval);
        }
    }, 20); // Speed of the percentage increment
}

// Function to animate circular progress bar
function animateCircularProgress(element) {
    const targetValue = element.getAttribute('data-progress');
    const circle = element.querySelector('.progress');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference; // Initially hide the stroke

    // Reset progress for animation
    circle.style.transition = 'none'; // Disable transition for reset
    circle.style.strokeDashoffset = circumference; // Reset to full circle (hidden)

    // Force reflow to reset the CSS (important to apply changes)
    circle.getBoundingClientRect();

    // Animate progress
    setTimeout(() => {
        circle.style.transition = `stroke-dashoffset 2s ease`;
        const offset = circumference - (targetValue / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }, 100); // Delay for the transition to be visible

    // Animate percentage value
    const percentage = element.querySelector('.progress-value');
    animatePercentage(percentage, targetValue);
}

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
    link.href = 'https://alas4370.github.io/AJA3Profile.github.io/assets/pdf/AJA_Resume.pdf'; // Replace with the actual path to your PDF file
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
