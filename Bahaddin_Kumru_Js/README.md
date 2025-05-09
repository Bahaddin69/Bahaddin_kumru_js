## 🔧 Uygulama Akışı

1. **Sayfa Kontrolü:**
   - Kullanıcının gerçekten `ebebek.com` sitesinde olup olmadığı kontrol ediliyor.
   - Eğer doğru sitedeyse işleme devam ediliyor.

2. **Ürün Verilerinin Yönetimi:**
   - localStorage’da `products` anahtarı kontrol ediliyor.
   - Veri yoksa API'den istek atılıyor ve sadece bir kez çekilip localStorage’a kaydediliyor.
   - Böylece gereksiz tekrar isteklerin önüne geçiliyor.

3. **Carousel Sistemi:**
   - Mevcut carousel yapısı DOM üzerinden temizleniyor.
   - Yerine tamamen sıfırdan yazdığım, responsive çalışan bir carousel yapısı entegre ediliyor.

4. **Wishlist (Beğenilen Ürünler):**
   - Ürün kalbine tıklandığında, ürün `likes` anahtarında localStorage’a ekleniyor.
   - Aynı ürüne tekrar tıklandığında favorilerden çıkarılıyor.

## 🧪 Test
Geliştirme süreci boyunca işlemler:
- Konsol üzerinden adım adım çalıştırılarak hatasız şekilde ilerletildi.
- localStorage verileri elle kontrol edilerek doğrulandı.
- **Kod yapısı, bana atılan case dosyasındaki örnek hiyerarşi baz alınarak; IIFE (Immediately Invoked Function Expression) mimarisi baz alınarak yazıldı**
x
