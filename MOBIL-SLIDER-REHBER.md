# Mobil Slider Fotoğrafları - Dosya Yapısı

## Gerekli Dosyalar

Mobil cihazlarda farklı fotoğraflar göstermek için aşağıdaki dosyaları `img/` klasörüne eklemeniz gerekiyor:

### Tablet ve Orta Boy Mobil (768px ve altı):
- `slider1-mobile.jpg` - Alya Vita Çakırlar mobil versiyonu
- `slider2-mobile.jpg` - Güler Apartmanı mobil versiyonu  
- `slider3-mobile.jpg` - Alya Vita Mamak mobil versiyonu

### Küçük Mobil Cihazlar (480px ve altı):
- `slider1-small.jpg` - Alya Vita Çakırlar küçük ekran versiyonu
- `slider2-small.jpg` - Güler Apartmanı küçük ekran versiyonu
- `slider3-small.jpg` - Alya Vita Mamak küçük ekran versiyonu

## Dosya Boyutları ve Optimizasyon Önerileri

### Desktop (mevcut):
- Boyut: 1920x1080 veya 1200x800
- Format: PNG/JPG
- Kalite: Yüksek

### Mobil (768px ve altı):
- Boyut: 800x600 veya 768x576  
- Format: JPG (daha küçük dosya boyutu)
- Kalite: Orta-Yüksek
- Dosya boyutu: 150-300KB arası

### Küçük Mobil (480px ve altı):
- Boyut: 480x360 veya 400x300
- Format: JPG
- Kalite: Orta
- Dosya boyutu: 80-150KB arası

## Uygulanan CSS Kuralları

```css
/* Desktop - Varsayılan */
.slide-1 { background-image: url('img/slider1.png'); }
.slide-2 { background-image: url('img/slider2.png'); }
.slide-3 { background-image: url('img/slider4.png'); }

/* Tablet/Mobil (768px ve altı) */
@media (max-width: 768px) {
    .slide-1 { background-image: url('img/slider1-mobile.jpg'); }
    .slide-2 { background-image: url('img/slider2-mobile.jpg'); }
    .slide-3 { background-image: url('img/slider3-mobile.jpg'); }
}

/* Küçük Mobil (480px ve altı) */
@media (max-width: 480px) {
    .slide-1 { background-image: url('img/slider1-small.jpg'); }
    .slide-2 { background-image: url('img/slider2-small.jpg'); }
    .slide-3 { background-image: url('img/slider3-small.jpg'); }
}
```

## Mobil Fotoğraf Seçimi İpuçları

1. **Dikey Odaklı Kompozisyon**: Mobil cihazlarda ekran daha dar olduğu için, ana konunun merkezde ve dikey olarak çerçevelendiği fotoğraflar seçin.

2. **Basit Kompozisyon**: Çok detaylı veya karmaşık görünümler küçük ekranlarda kaybolabilir. Daha basit ve net kompozisyonlar tercih edin.

3. **Yüksek Kontrast**: Mobil ekranlarda görünürlüğü artırmak için yüksek kontrastlı fotoğraflar kullanın.

4. **Metin Alanını Dikkate Alın**: Slide üzerindeki metin mobilde ortalanacağı için, fotoğrafın orta kısmında metin için uygun alan bırakın.

## Test Etme

Dosyaları ekledikten sonra:
1. Tarayıcınızı yenileyin
2. Developer tools (F12) açın
3. Device simulation kullanarak mobil görünümü test edin
4. Farklı ekran boyutlarında fotoğrafların doğru değiştiğini kontrol edin
