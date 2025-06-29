# SEO ve Analytics Entegrasyonu Rehberi

## Google Analytics 4 (GA4) Entegrasyonu
Aşağıdaki kodu tüm HTML sayfalarınızın <head> bölümüne ekleyin:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Not: GA_MEASUREMENT_ID'yi Google Analytics'ten aldığınız gerçek ID ile değiştirin.

## Google Search Console Doğrulaması
Google Search Console'da sitenizi doğrulamak için aşağıdaki meta etiketi <head> bölümüne ekleyin:

```html
<meta name="google-site-verification" content="VERIFICATION_CODE" />
```

Not: VERIFICATION_CODE'u Google Search Console'dan aldığınız kod ile değiştirin.

## Bing Webmaster Tools
Bing için de benzer doğrulama:

```html
<meta name="msvalidate.01" content="BING_VERIFICATION_CODE" />
```

## Favicon Ekleme
Sitenizin favicon'ını eklemek için:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

## Önemli SEO İpuçları:

1. **Alt Etiketleri**: Tüm resimlere açıklayıcı alt etiketleri ekleyin
2. **H1-H6 Etiketleri**: Sayfa başlıklarını hiyerarşik olarak kullanın
3. **İç Linkler**: Sayfalar arası bağlantıları artırın
4. **Sayfa Hızı**: Resim optimizasyonu yapın
5. **Mobile-First**: Mobil uyumluluğu test edin
6. **SSL Sertifikası**: HTTPS kullanın
7. **Local SEO**: Google My Business kaydı yapın

## Yapılacaklar Listesi:
- [ ] Google Analytics hesabı oluştur
- [ ] Google Search Console'a site ekle
- [ ] Favicon dosyaları oluştur
- [ ] Tüm resimlere alt etiketleri ekle
- [ ] Google My Business kaydı yap
- [ ] SSL sertifikası al
