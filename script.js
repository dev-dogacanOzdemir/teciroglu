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

    // Slider'ı başlat - ilk slide'ı aktif yap
    function initializeSlider() {
        if (slides.length > 0 && dots.length > 0) {
            // Tüm slide'ları gizle
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // İlk slide'ı ve dot'u aktif yap
            slides[0].classList.add('active');
            dots[0].classList.add('active');
            currentSlide = 0;
        }
    }

    // Slider otomatik geçiş
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    // Slider'ı sıfırla
    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Sonraki slide'a geç
    function nextSlide() {
        if (slides.length > 0) {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }
    }

    // Önceki slide'a geç
    function prevSlide() {
        if (slides.length > 0) {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }
    }

    // Belirli bir slide'a git
    function goToSlide(n) {        
        // Güvenlik kontrolü
        if (slides.length === 0 || dots.length === 0 || n < 0 || n >= slides.length) {
            return;
        }
        
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
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetSlider();
        });
    }

    // Dot'lara tıklanınca
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            resetSlider();
        });
    });

    // Slider'ı başlat
    initializeSlider();
    startSlider();

    // Company Name Overlay pozisyonunu ayarlama
    const companyNameOverlay = document.querySelector('.company-name-overlay');
    
    // Sayfa yüklendiğinde ve scroll edildiğinde overlay pozisyonunu güncelleme
    function updateOverlayPosition() {
        if (!companyNameOverlay) return;
        
        // Hakkımızda bölümünün pozisyonunu al
        const aboutSection = document.getElementById('hakkimizda');
        if (!aboutSection) return;
        
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
    
    // Responsive davranışları için optimizasyonlar
    let isMobile = window.innerWidth <= 768;
    let isTablet = window.innerWidth <= 1024;
    
    // Pencere boyutu değiştiğinde mobile/tablet durumunu güncelle
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        const newIsTablet = window.innerWidth <= 1024;
        
        // Eğer mobile/tablet durumu değiştiyse gerekli güncellemeleri yap
        if (newIsMobile !== isMobile || newIsTablet !== isTablet) {
            isMobile = newIsMobile;
            isTablet = newIsTablet;
            
            // Company overlay mobilde gizle
            if (isMobile && companyNameOverlay) {
                companyNameOverlay.style.display = 'none';
            } else if (companyNameOverlay) {
                companyNameOverlay.style.display = 'flex';
                updateOverlayPosition();
            }
            
            // Sosyal medya ikonlarını mobilde gizle
            toggleSocialIcons();
            
            // Hakkımızda bölümünü mobilde gizle
            toggleAboutSection();
            
            // Slider kontroller boyutlarını ayarla
            adjustSliderControls();
        }
    });
    
    // Sosyal medya ikonlarını responsive olarak gizle/göster
    function toggleSocialIcons() {
        const socialIconContainers = document.querySelectorAll('.social-icons');
        const socialSections = document.querySelectorAll('.footer-social, .contact-box:last-child');
        
        // Sosyal medya ikon konteynerlerini gizle/göster
        socialIconContainers.forEach(container => {
            if (isMobile) {
                container.style.display = 'none';
            } else {
                // Desktop'ta default değerlere dön
                const isHeaderSocial = container.closest('.header-left');
                const isFooterSocial = container.closest('.footer-social');
                const isMenuSocial = container.closest('.menu-contact');
                const isContactSocial = container.closest('.contact-box');
                
                if (isHeaderSocial || isMenuSocial || isContactSocial) {
                    container.style.display = 'flex';
                } else if (isFooterSocial) {
                    // Footer sosyal medya için özel düzenleme
                    container.style.display = 'flex';
                    container.style.gap = '15px';
                    container.style.marginTop = '20px';
                }
            }
        });
        
        // Sosyal medya bölümlerini tamamen gizle/göster
        socialSections.forEach(section => {
            if (isMobile) {
                section.style.display = 'none';
            } else {
                // Desktop'ta footer sosyal medya bölümünü göster
                if (section.classList.contains('footer-social')) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'flex';
                }
            }
        });
    }
    
    // Slider kontrollerini responsive olarak ayarla
    function adjustSliderControls() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn && nextBtn) {
            if (isMobile) {
                // Mobilde daha küçük kontroller
                prevBtn.style.width = '40px';
                prevBtn.style.height = '40px';
                nextBtn.style.width = '40px';
                nextBtn.style.height = '40px';
            } else if (isTablet) {
                // Tablette orta boyut kontroller
                prevBtn.style.width = '45px';
                prevBtn.style.height = '45px';
                nextBtn.style.width = '45px';
                nextBtn.style.height = '45px';
            } else {
                // Desktop'ta standart boyut
                prevBtn.style.width = '50px';
                prevBtn.style.height = '50px';
                nextBtn.style.width = '50px';
                nextBtn.style.height = '50px';
            }
        }
    }
    
    // Touch events için mobil optimizasyonu
    if ('ontouchstart' in window) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const sliderContainer = document.querySelector('.slider-container');
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Sola swipe - sonraki slide
                    nextSlide();
                    resetSlider();
                } else {
                    // Sağa swipe - önceki slide
                    prevSlide();
                    resetSlider();
                }
            }
        }
    }
    
    // Sayfa ilk yüklendiğinde responsive ayarları uygula
    if (isMobile && companyNameOverlay) {
        companyNameOverlay.style.display = 'none';
    }
    adjustSliderControls();
    toggleSocialIcons(); // Sosyal medya ikonlarının durumunu da kontrol et
    toggleAboutSection(); // Hakkımızda bölümünün durumunu da kontrol et

    // Hakkımızda bölümünü mobilde gizle
    function toggleAboutSection() {
        const aboutSection = document.getElementById('hakkimizda');
        
        if (aboutSection) {
            if (isMobile) {
                aboutSection.style.display = 'none';
            } else {
                aboutSection.style.display = 'block';
            }
        }
    }
});
