document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarLinks = document.querySelector('.navbar-links');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });

    navbarLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburgerMenu.classList.remove('active');
            navbarLinks.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navbarLinks.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            navbarLinks.classList.remove('active');
        }
    });

    const sliderContainer = document.querySelector('.card-container');
    const sliderItems = document.querySelectorAll('.card-item');
    let index = 0;
    let sliderInterval;

    // Duplikasi elemen untuk efek infinite loop
    const totalItems = sliderItems.length;
    sliderContainer.append(...Array.from(sliderItems).slice(0, 3).map(item => item.cloneNode(true)));
    sliderContainer.prepend(...Array.from(sliderItems).slice(-3).map(item => item.cloneNode(true)));

    // Set ukuran awal
    const cardWidth = sliderItems[0].offsetWidth + 20; // Card width + gap
    sliderContainer.style.transform = `translateX(${-cardWidth * 3}px)`;

    // Fungsi untuk slide otomatis
    function slideNext() {
        index++;
        sliderContainer.style.transition = 'transform 0.3s ease-in-out';
        sliderContainer.style.transform = `translateX(${-cardWidth * (3 + index)}px)`;

        if (index === totalItems) {
            setTimeout(() => {
                sliderContainer.style.transition = 'none';
                index = 0;
                sliderContainer.style.transform = `translateX(${-cardWidth * 3}px)`;
            }, 300);
        }
    }

    // Mulai interval slider
    function startSlider() {
        sliderInterval = setInterval(slideNext, 3000);
    }

    // Hentikan interval slider
    function stopSlider() {
        clearInterval(sliderInterval);
    }

    // Tambahkan event listener untuk hover pada card-item
    sliderItems.forEach(item => {
        item.addEventListener('mouseenter', stopSlider); // Hentikan slider saat hover
        item.addEventListener('mouseleave', startSlider); // Mulai kembali slider setelah hover selesai
    });

    // Mulai interval saat halaman dimuat
    startSlider();
})

