document.addEventListener('DOMContentLoaded', function() {
    // Menü Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const closeBtn = document.querySelector('.close-btn');

    function toggleMenu() {
        menuToggle.classList.toggle('open');
        fullscreenMenu.classList.toggle('open');

        // Sayfanın scroll edilmesini engelle/serbest bırak
        if (fullscreenMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    // Slider Fonksiyonları
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Slider otomatik geçiş
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Slider'ı sıfırla
    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Sonraki slide'a geç
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Önceki slide'a geç
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Belirli bir slide'a git
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // İstatistik sayaçları
    function startCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 saniye
            const step = Math.ceil(target / (duration / 20)); // 20ms'de bir güncelleme
            let current = 0;

            const updateCounter = () => {
                current += step;

                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            };

            const timer = setInterval(updateCounter, 20);
        });
    }

    // Scroll izleme
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    let countersStarted = false;

    window.addEventListener('scroll', function() {
        const statsSection = document.getElementById('istatistikler');

        if (statsSection && isElementInViewport(statsSection) && !countersStarted) {
            startCounters();
            countersStarted = true;
        }
    });

    // Slider kontrolleri
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetSlider();
    });

    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetSlider();
    });

    // Dot'lara tıklanınca
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            resetSlider();
        });
    });

    // Slider başlat
    startSlider();

    // Company Name Overlay pozisyonunu ayarlama
    const companyNameOverlay = document.querySelector('.company-name-overlay');
    
    // Sayfa yüklendiğinde ve scroll edildiğinde overlay pozisyonunu güncelleme
    function updateOverlayPosition() {
        // Hakkımızda bölümünün pozisyonunu al
        const aboutSection = document.getElementById('hakkimizda');
        const aboutRect = aboutSection.getBoundingClientRect();
        
        // Overlay'i hakkımızda bölümünün üzerinde konumlandır
        if (aboutRect.top <= window.innerHeight && aboutRect.bottom >= 0) {
            companyNameOverlay.style.opacity = '1';
            companyNameOverlay.style.top = (aboutRect.top + 30) + 'px'; // Biraz daha yukarıda gösterelim
        } else {
            // Hakkımızda bölümü görünür değilse, overlay'i gizle
            companyNameOverlay.style.opacity = '0';
        }
    }
    
    // Sayfa yüklendiğinde pozisyonu güncelle
    updateOverlayPosition();
    
    // Sayfa scroll edildiğinde overlay pozisyonunu güncelle
    window.addEventListener('scroll', updateOverlayPosition);
    
    // Pencere boyutu değiştiğinde de güncelle
    window.addEventListener('resize', updateOverlayPosition);

    // Form işlemleri
    const contactForm = document.getElementById('contact-form');
    
    // Form gönderildiğinde işlem yap
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Formun normal gönderimini engelle
            
            // Form verilerini topla
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Form verilerini konsola yazdır (gerçek uygulamada burada Ajax isteği yapılabilir)
            console.log('Form verileri:', formObject);
            
            // Kullanıcıya başarılı mesajı göster
            alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
            
            // Formu sıfırla
            contactForm.reset();
        });
    }
});
