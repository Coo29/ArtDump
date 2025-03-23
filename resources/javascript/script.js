// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const close = document.querySelector('.close');

// Open lightbox when image is clicked
document.querySelectorAll('.art-image').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.getAttribute('data-title') || '';
    });
});

// Close lightbox when the close button is clicked
close.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox if clicked outside of the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Tilt effect based on mouse position with shadow effect
document.querySelectorAll('.image-container').forEach(container => {

    container.style.transform = 'rotateX(0deg) rotateY(0deg)';
    container.style.willChange = 'transform, box-shadow';


    container.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        const percentX = (mouseX / width) - 0.5; // -0.5 to center the effect
        const percentY = (mouseY / height) - 0.5; // -0.5 to center the effect

        // Reverse the tilt direction by negating the tilt calculations
        const tiltX = -percentY * 15;  // Max tilt angle (opposite direction)
        const tiltY = percentX * 15;   // Max tilt angle (opposite direction)

        // Adjust shadow effect based on tilt
        const shadowX = percentX * -20; // Horizontal shadow shift
        const shadowY = percentY * 20; // Vertical shadow shift
        const shadowBlur = 5 + Math.abs(percentX) * 20 + Math.abs(percentY) * 20; // Shadow blur intensity

        // Apply the tilt effect and shadow to the container
        container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        container.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3)`; // Dynamic shadow

        // Smooth transition for tilt and shadow
        container.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    });

    container.addEventListener('mouseleave', () => {
        // Reset the tilt and shadow when mouse leaves the image
        container.style.transform = 'rotateX(0deg) rotateY(0deg)';
        container.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.7)';
        container.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // Add smooth reset transition
    });
});
