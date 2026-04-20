---
title: "Yapay Zeka Otomasyonunun 5 Seviyesi Açıklandı"
excerpt: "Basit bir kuraldan otonom ajana: YA otomasyonunun 5 seviyesi açıklandı. KOBİ'nizin hangi seviyede olduğunu ve bir üst seviyeye nasıl geçeceğinizi keşfedin."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "21 min"
coverImage: "/blog/placeholder-cover.svg"
---

Basit bir kuraldan otonom ajana: YA otomasyonunun 5 seviyesi açıklandı. KOBİ'nizin hangi seviyede olduğunu ve bir üst seviyeye nasıl geçeceğinizi keşfedin.

Bir KOBİ yöneticisi bana "otomasyonu zaten yaptık" dediğinde, her zaman aynı soruyu sorarım: "Nasıl?". Cevap, %80 durumda, Outlook kuralları, birkaç Excel makrosu ve Slack'e bildirim gönderen bir Zapier'den ibarettir. Bu, YA otomasyonu değil — bu, beş kademeli bir ölçekte 1. Seviye'dir. YA otomasyon seviyelerini anlamak, bir binanın katlarını anlamak gibidir: zemin katta çok rahat yaşayabilirsiniz, ama en üst katta oturduğunuzu söyleyemezsiniz. Bu makale, her seviyayı somut örneklerle, gerçek sınırlamalarla ve yükselmek için bir yol haritasıyla açıklıyor.

## Neden otomasyon seviyelerini anlamak gerekir

YA otomasyon seviyeleri yalnızca teorik bir alıştırma değildir. İşletmenizin üç kritik boyutuna doğrudan etkisi vardır:

**Yatırım getirisi.** Her seviye, kazanılan zaman ve önlenebilen hata açısından ek bir büyüklük sırasının kilidini açar. 1. Seviye'deki bir KOBİ haftada birkaç saat tasarruf eder. 3. Seviye'deki bir KOBİ bütün günleri serbest bırakır. Fark doğrusal değil, üsseldir — 3. Seviye'ye kadar, sonrasında marjinal kazançlar azalır.

**Risk seviyesi.** Otomasyon ölçeğinde yükseldikçe, sistemler insan onayı olmaksızın daha fazla karar alır. Hatalı bir teklif gönderen yarı otonom bir ajan, yanlış klasöre e-posta taşıyan bir Outlook kuralından daha pahalıya mal olur. Seviyeleri anlamak, hırsınızı risk toleransınıza göre ayarlamak demektir.

**Gerekli yetkinlik.** 1. Seviye bir öğleden sonra Zapier ile konuşlandırılabilir. 4. Seviye bir YA mimarı, temiz veriler ve bir izleme altyapısı gerektirir. Gerekli yetkinlikler olmadan bir seviye atlamak, ehliyetsiz bir Formula 1 sürmek gibidir: iyi bitmez.

KOBİ'ler için mesele, 5. Seviye'ye ulaşmak değildir. Tam olarak nerede olduklarını bilmek, bir sonraki seviyede hangi gerçekçi kazancı umabileceklerini ve bunun hangi yatırımı gerektirdiğini anlamaktır. [YA otomasyonu üzerine bu kapsamlı rehber](/blog/automation-ia-guide-complet) size genel çerçeveyi verir; bu makale ise seviyeler arasında gezinmeniz için pusulayı sunar.

## Seviye 1 — Basit Kurallar (Eğer/O zaman)

1. Seviye tüm otomasyonun temelidir: bir olay gerçekleştiğinde, bir eylem yürütülür. Zeka yok, öğrenme yok, bağlam yok. Sadece koşul her sağlandığında aynı şekilde uygulanan statik bir kural.

### Nasıl çalışır

1. Seviye otomasyon, deterministik kurallara dayanır. Sistem bir Boolean koşulunu değerlendirir — doğru veya yanlış — ve önceden tanımlanmış bir eylemi tetikler. Zapier, Make veya IFTTT gibi platformlar bu seviyeyi örnekler: "Gmail'de konusu 'teklif' içeren yeni bir e-posta geldiğinde, Trello'da bir kart oluştur". Mantık sabittir. Konu değişirse, e-posta İngilizce ise, müşteri mesaj gövdesinde bir soru sorarsa, kural uyum sağlamaz.

Bu seviye, eskiden temel RPA (Robotik Süreç Otomasyonu) olarak adlandırılan şeye karşılık gelir: hiçbir yargı yeteneği olmadan eylem dizilerini tekrarlayan betikler. [RPA ve YA otomasyonu arasındaki fark](/blog/rpa-vs-ia-automation) tam olarak şudur: RPA 1. Seviye'de kalırken, YA 3. Seviye'de başlar.

### Somut örnek

Bir iletişim ajansı Outlook'ta şu kuralı yapılandırır: "Gönderen '@client-premium.fr' içeriyorsa, e-postayı 'Öncelikli Müşteriler' klasörüne taşı ve #comptes-premium kanalına bir Slack bildirimi gönder". Bu kural mükemmel çalışır — gönderen tam olarak desene uyduğu sürece. Bir premium müşteri kişisel adresinden yazdığında, kural onu yok sayar. Nitelikli olmayan bir potansiyel müşteri benzer bir etki alanından yazdığında, kural onu VIP olarak değerlendirir.

### Avantajlar ve sınırlamalar

**Avantajlar:**
- Hızlı kurulum, genellikle bir saatten daha kısa sürede
- Teknik yetkinlik gerektirmez
- Mevcut araçlarla (Outlook, ücretsiz Zapier) neredeyse sıfır maliyet
- Tam öngörülebilirlik: kural tam olarak isteneni yapar

**Sınırlamalar:**
- Hiçbir uyum yeteneği yok: kural öngörülmeyen durumları yönetemez
- Artan bakım: daha fazla kural ekledikçe, sistem kırılgan ve çelişkili hale gelir
- Otomasyon yanılgısı: sıralamayı otomatikleştirdiniz, işi değil
- Doğal dil, görüntüler veya yapılandırılmamış veriler işlenemez

## Seviye 2 — Koşullu otomasyon

2. Seviye, dallanma ve koşullu mantığı devreye sokar. Tek bir Eğer/O zaman kuralı yerine, sistem birden fazla koşulu değerlendirir ve birden fazla eylem dalı arasından seçim yapar. Hâlâ deterministiktir — YA yoktur — ancak mantık gerçek iş süreçlerini modelleyecek kadar zengindir.

### Nasıl çalışır

Koşullu otomasyon, karar ağaçları kullanır: EĞER koşul A O ZAMAN eylem X, DEĞİLSE EĞER koşul B O ZAMAN eylem Y, DEĞİLSE eylem Z. Make (eski adıyla Integromat) veya n8n gibi platformlar, yönlendirme, filtreleme ve yineleme modülleri sayesinde bu seviyede üstün performans gösterir. Onlarca koşulu zincirleyebilir, listeler üzerinde döngüler oluşturabilir ve bir potansiyel müşteriden fatura kesilmesine kadar bir iş sürecinin tamamını kapsayan iş akışları oluşturabilirsiniz.

1. Seviye ile temel fark, akışın karmaşıklığıdır. 2. Seviye, beş kritere (sektör, şirket büyüklüğü, bütçe, konum, kaynak) göre bir potansiyel müşteriyi niteliklendirebilir, talebi doğru satış temsilcisine yönlendirebilir ve buna göre takip dizisini kişiselleştirebilir. Ancak her dal açıkça programlanmıştır. Bir potansiyel müşteri hiçbir dala uymazsa, varsayılan duruma düşer — genellikle "manuel işlenecek" dosyası.

### Somut örnek

Bir danışmanlık firması, web formu üzerinden gelen talepleri niteliklendirmek için bir Make iş akışı yapılandırır. İş akışı formun beş alanını inceler. Sektör "finans" VE bütçe 50 bin EUR'dan fazlaysa, potansiyel müşteri HubSpot'ta "Premium" olarak işaretlenir ve kıdemli ortağa bir bildirim gönderilir. Sektör "perakende" VE konum "Île-de-France" ise, potansiyel müşteri bölgesel satış temsilcisine atanır. Diğer tüm durumlarda, potansiyel müşteri otomatik besleme sürecine girer. İş akışı haftada 200 talebi insan müdahalesi olmadan işler — varsayılan duruma düşen %15 hariç.

### Avantajlar ve sınırlamalar

**Avantajlar:**
- 1. Seviye'ye kıyasla çok daha geniş kapsam: 2. Seviye bir iş akışı süreçleri tamamen modelleyebilir
- Hızlı YG: çoğu KOBİ, yatırım getirilerinin %80'ine 2. ve 3. Seviye arasında ulaşır
- Hâlâ deterministik: her kararın neden alındığını tam olarak denetleyebilirsiniz
- Olgun araçlar: Make, n8n, Zapier erişilebilir görsel arayüzler sunar

**Sınırlamalar:**
- "Varsayılan durum" zamanla şişer: her öngörülmeyen durum bir dal ekler ve iş akışı karmaşıklık canavarına dönüşür
- Doğal dil anlayışı yok: müşteri ihtiyacını serbest metinle açıklarsa, sistem bunu yorumlayamaz
- Pahalı bakım: her yeni koşul, her yeni dallanma, iş akışında manuel değişiklik gerektirir
- 3. Seviye'ye sıçrama kademeli değil — bir dil modeli entegre etmeyi gerektirir, bu da mimariyi temelden değiştirir

## Seviye 3 — YA destekli (Kopyilotlar)

3. Seviye, sürece yapay zekanın girişini işaret eder. YA nihai karar vermez — analiz ederek, önererek ve ön doldurarak insana yardımcı olur. İnsan döngüdedir ("human-in-the-loop"): her önemli eylemi yürütmeden önce doğrular. Bu, kopyilot YA seviyesidir.

### Nasıl çalışır

3. Seviye bir sistem, bir kural motorunu (1. ve 2. Seviyeler) bir dil modeli veya öngörücü model ile birleştirir. YA modeli, yapılandırılmamış verileri — bir e-posta, bir PDF belgesi, bir konuşma — analiz eder ve bir öneri veya taslak üretir. İnsan sonucu inceler, gerekirse değiştirir ve kabul eder. Örneğin, [potansiyel müşteri arama için bir kopyilot YA](/blog/automation-agent-autonome) bir potansiyel müşterinin LinkedIn profilini analiz eder, kişiselleştirilmiş bir e-posta yazar ve bunu taslak olarak gönderim kutusuna yerleştirir. Satış temsilcisi okur, tonu ayarlar ve gönderir.

Mimari temel bir ilkeye dayanır: YA modeli danışman bir kaynaktır, karar verici değil. Yanılabilir (halüsinasyonlar, bağlam hataları) ve insanın rolü tam olarak bu hataların etki yaratmadan önce düzeltilmesidir. Bu nedenle 3. Seviye, "akıllı" seviyelerin en güvenlisidir.

### Somut örnek

Bir bilişim hizmetleri KOBİ'si, 1. Seviye müşteri desteği için bir kopyilot YA konuşlandırır. Bir bilet geldiğinde, kopyilot mesajı analiz eder, sorun türünü tanımlar (parola, VPN erişimi, yazılım kurulumu), bilgi tabanından yararlanarak uygun bir yanıt yazar ve destek temsilcisine gösterir. Temsilci, yanıtı doğru bulursa "Gönder"e tıklar veya değiştirir. Sonuç: ortalama yanıt süresi 4 saatten 12 dakikaya düşer. Temsilci günde 5 kat daha fazla bilet yönetir. İlk temas çözüm oranı %40'tan %78'e çıkar. Ve en önemlisi, kopyilot yanlış olduğunda (örneğin, müşteri Mac'teyken Windows için çözüm önerirse), temsilci göndermeden önce düzeltir.

### Avantajlar ve sınırlamalar

**Avantajlar:**
- Doğal dil işleme: sistem serbest metinle formüle edilmiş talepleri anlar
- Düzeltmeler yoluyla öğrenme: insan öneriyi değiştirdiğinde, sistem gelişebilir
- Devasa YG: otomasyonun gerçekten verimliliği dönüştürmeye başladığı seviye budur
- Kontrollü risk: insan her çıktıyı doğrular, bu yüzden YA hataları etkiden önce düzeltilir

**Sınırlamalar:**
- İnsan darboğazı: insan her eylemi doğrulamak zorundaysa, darboğazı kaldırmazsınız, yerini değiştirirsiniz
- Dil modeli maliyeti: her LLM çağrısının bir maliyeti vardır ve hacimle birlikte artar
- Değişken güvenilirlik: dil modelleri deterministik değildir — aynı girdi farklı çıktılar üretebilir
- 4. Seviye'ye geçiş kademeli değil: "döngüde insan" mimarisinden "döngüde insan" mimarisine geçişi yeniden düşünmeyi gerektirir, bu temel bir paradigma değişikliğidir

## Seviye 4 — Yarı otonom ajanlar

4. Seviye, dönüm noktasıdır. YA ajanı, tanımlanmış bir kapsam içinde kendi başına kararlar alır ve eylemler yürütür. İnsan artık döngüde ("human-in-the-loop") değil, döngüdedir ("human-on-the-loop"): denetler, uyarılar alır, anormallik durumunda müdahale eder, ancak her eylemi doğrulamaz. Bu basit bir evrim değil, temel bir mimari değişikliktir.

### Nasıl çalışır

Yarı otonom bir ajan üç kapasiteyi birleştirir: algılama (yapılandırılmış ve yapılandırılmamış veriler aracılığıyla ortamı analiz etme), akıl yürütme (bir eylem planı oluşturmak için dil modeli çağrılarını zincirleme) ve eylem (API'ler aracılığıyla yürütme — e-posta gönderme, CRM güncelleme, fatura oluşturma). Ajanın koruyucu kuralları (guardrails) vardır: eylem kapsamını sınırlayan güvenlik kuralları. Örneğin, yarı otonom bir satış ajanı otomatik takip e-postaları gönderebilir, ancak insan doğrulaması olmadan %10'dan fazla indirim onaylayamaz.

3. Seviye ile mimari fark büyüktür. 3. Seviye'de YA önerir ve insan yürütür. 4. Seviye'de YA yürütür ve insan denetler. Bu, bir izleme altyapısı (günlükler, uyarılar, kalite metrikleri), bir geri alma sistemi (sapmış bir ajanın eylemlerini iptal etme) ve geri çekilme politikaları (ajan emin olmadığında ne yapar? Durur ve bir insana sorar) gerektirir.

### Somut örnek

Bir e-ticaret KOBİ'si, müşteri iade taleplerinin yönetimi için yarı otonom bir ajan konuşlandırır. Bir müşteri iade talep ettiğinde, ajan talebi analiz eder, iade koşullarını kontrol eder (süre, ürün durumu, müşteri geçmişi), kabul veya red karar verir, iade etiketini oluşturur ve Shopify'daki siparişi günceller. Müşteri bu ay zaten 5 iade yapmışsa, ajan karar vermez — müşteri hizmetlerine aktarır. Üç ayda, ajan iade taleplerinin %85'ini tamamen otonom olarak, ortalama 24 saat yerine 3 dakikada işler. Müşteri hizmetleri artık yalnızca %15'lik karmaşık vakaları yönetir.

### Avantajlar ve sınırlamalar

**Avantajlar:**
- İnsan darboğazının ortadan kaldırılması: basit eylemler beklemeden yürütülür
- İşlem hızı: yarı otonom ajanlar saatler değil, saniyeler veya dakikalar içinde harekete geçer
- Ölçeklenebilirlik: aynı ajan personel eklemeden 10 veya 10.000 talebi işleyebilir
- Ayarlanabilir guardrails: risk toleransınıza göre özerklik kapsamını kontrol edersiniz

**Sınırlamalar:**
- Mimari karmaşıklık: izleme, geri alma, guardrails, geri çekilme — altyapı önemli ölçüdedir
- İstenmeyen eylem riski: bir durumu yanlış yorumlayan bir ajan, büyük hızda uygunsuz eylemler yürütebilir
- Temiz veri gereksinimi: kötü kaliteli verilerle beslenen yarı otonom bir ajan, büyük ölçekte kötü kararlar alır
- Denetim maliyeti: döngüdeki insan yine de izlemek zorundadır, bu da araçlar ve zaman gerektirir

## Seviye 5 — Otonom ajanlar

5. Seviye, tam ve otonom otomasyonu temsil eder. YA ajanı kendi hedeflerini belirler, kendi stratejilerini tasarlar, yürütür ve insan denetimi olmadan kendi kendini düzeltir. Bu, otonom sürüş için 5. seviyenin karşılığıdır: direksiyon yok, pedal yok, sürücü koltuğu yok.

### Nasıl çalışır

5. Seviye'de otonom bir ajan, önceki seviyelerden temel olarak ayırt eden dört özelliğe sahiptir. Birincisi, oto-hedef: talimat almak yerine, ajan üst düzey bir hedefe (örneğin, "satış sonrası hizmet müşteri memnuniyetini maksimize et") göre kendi alt hedeflerini belirler. İkincisi, oto-planlama: ajan, ortamın geri bildirimlerine göre eylem planını dinamik olarak tasarlar ve revize eder. Üçüncüsü, oto-düzeltme: bir eylem başarısız olduğunda, ajan nedenini analiz eder ve stratejisini ayarlar. Dördüncüsü, oto-öğrenme: ajan, deneyim biriktirerek zamanla performansını geliştirir.

Uygulamada, 5. Seviye ajanlar çok modelli mimariler kullanır: bir planlama modeli, bir yürütme modeli, bir eleştiri modeli (eylemlerin kalitesini değerlendiren) ve bir bellek modeli (etkileşim geçmişini depolayan). Bu ajanlar, karmaşık problemleri çözmek için birbirleriyle iletişim kurar. Bu, tüm iş süreçlerinin koordineli YA ajanları tarafından yönetildiği hiperotomasyon alanıdır.

### Somut örnek

2026'da, birkaç öncü şirket, tedarik zinciri yönetiminin tamamı için otonom ajanlar denemektedir. Ajan, üst düzey bir hedef alır: "depolama maliyetlerini minimize ederken %98 stok bulunabilirliği oranını korumak". Satışları, stok seviyelerini, tedarikçi sürelerini, hava koşullarını (lojistiği etkileyen) ve ekonomik sinyalleri gerçek zamanlı izler. Otomatik olarak sipariş verir, tedarikçilerle otomatik takaslar yoluyla fiyat pazarlığı yapar, gecikme durumunda sevkiyatları yeniden yönlendirir ve stok seviyelerini ayarlar. Beklenmedik bir olay oluştuğunda — bir liman bloke oldu, bir tedarikçi iflas etti — ajan planını yeniden değerlendirir ve insan müdahalesi olmadan bir alternatif bulur. Ön sonuçlar, stok kesintilerinde %30 ve depolama maliyetlerinde %20 azalma göstermektedir.

### Avantajlar ve sınırlamalar

**Avantajlar:**
- Tam özerklik: günlük operasyonlar için sıfır insan müdahalesi
- Uyum yeteneği: ajan, önceden belirlenmiş protokol olmaksızın beklenmedik durumları yönetir
- Sürekli performans: ajan, öğrenme sayesinde sürekli olarak gelişir
- Çok süreçli orkestrasyon: 5. Seviye bir ajan, birbirine bağımlı birden fazla iş akışını koordine edebilir

**Sınırlamalar:**
- Teknolojik olgunluk: 2026'da, üretimde gerçekten operasyonel 5. Seviye ajan çok azdır
- Sistemik risk: ajanın bir hatası, insan freni olmadan tüm sisteme yayılabilir
- Karar opaklığı: 5. Seviye ajanlar, sonradan denetlenmesi zor karmaşık kararlar alır
- Veri gereksinimi: oto-öğrenme, yüksek kaliteli devasa veri hacimleri gerektirir
- Belirsiz hukuki çerçeve: otonom bir ajan yasadışı veya zararlı bir karar aldığında kim sorumludur?

## 5 seviyenin özet tablosu

| Seviye | Ad | Mantık | İnsanın rolü | Karmaşıklık | Risk | Tipik KOBİ YG |
|--------|-----|---------|-----------------|------------|--------|-----------------|
| 1 | Basit kurallar (Eğer/O zaman) | Deterministik, tek koşul | Yapılandır ve unut | Çok düşük | Yok | Düşük (birkaç saat/hafta) |
| 2 | Koşullu otomasyon | Karar ağacı, çoklu dallar | Yapılandır, istisnaları izle | Düşük | Çok düşük | Orta (ölçülebilir günlük kazanç/hafta) |
| 3 | YA destekli (Kopyilotlar) | Dil modeli + insan doğrulaması | Her öneriyi doğrular | Orta | Düşük (etkiden önce düzeltilir) | Yüksek (verimlilik dönüşümü) |
| 4 | Yarı otonom ajanlar | YA planlama + guardrails | Denetler, uyarı üzerine müdahale eder | Yüksek | Orta (doğrulamasız eylemler) | Çok yüksek (ölçeklenebilirlik) |
| 5 | Otonom ajanlar | Oto-hedef, oto-planlama, oto-düzeltme | Yok (sadece üst düzey hedef) | Çok yüksek | Yüksek (insan güvenlik ağı yok) | Teorik olarak maksimum (KOBİ'de kanıtlanmamış) |

## Bir üst seviyeye nasıl geçilir

Bir seviye yükselmek hiçbir zaman basit bir "ekleme" değildir. Her geçiş, zihniyet, yetkinlik ve altyapı değişikliği gerektirir. İşte dört geçiş ve kaçınılması gereken tuzaklar.

### 1. Seviye'den 2. Seviye'ye

En erişilebilir geçiş. Zaten Eğer/O zaman kurallarınız var; bunları tutarlı karar ağaçları halinde düzenlemek yeterlidir. Mevcut kurallarınızı haritalandırmakla başlayın. Muhtemelen fazlalıklar (aynı şeyi yapan iki kural), çelişkiler (birbirini çeliştiren kurallar) ve boşluklar (kapsanmayan durumlar) keşfedeceksiniz. Mantığınızı yapılandırılmış bir iş akışında yeniden oluşturmak için Make veya n8n gibi bir araç kullanın.

**Tuzak:** sonsuz dallar eklemek. İyi tasarlanmış bir 2. Seviye iş akışı, dalların %20'siyle durumların %80'ini kapsar. Her marjinal durum için bir dal eklerseniz, yönetilemez bir canavar inşa edersiniz. Beş durumdan birinin "varsayılan"a düşmesini kabul edin — bu kalan insan işidir.

### 2. Seviye'den 3. Seviye'ye

Bu, bir KOBİ için en dönüştürücü sıçramadır. Deterministik mantıktan olasılıksal mantığa geçersiniz: dil modeli her yürütmede aynı sonucu garanti etmez. Önce YA modelini tek bir sürtünme noktasında entegre edin — örneğin, gelen e-postaların analizi. Konuya göre filtrelemek yerine, LLM'nin içeriği okumasına ve talebi sınıflandırmasına izin verin. Sistematik insan doğrulamasını koruyun. Bu bir kopyilot, otomatik pilot değil.

**Tuzak:** insan doğrulamasını çok erken kaldırmak. Kopyilotun iki hafta iyi performans gösterdiğini görüp, e-postaları kendisinin göndermesine izin verme temptasyonu büyüktür. Direnin. Dil modellerinin ince başarısızlık modları vardır: haftalarca mükemmel çalışabilir, ardından atipik bir vakta dramatik halüsinasyonlar üretebilirler. İnsan doğrulaması bir maliyet değil — bir sigortadır.

### 3. Seviye'den 4. Seviye'ye

Bu mimari sıçramadır. "Döngüde insan"dan "döngüde insan"a geçersiniz. Bu, kopyilotunuza bir "otonom mod" butonu ekleyerek yapılmaz. Tam bir altyapı gerektirir: bir guardrails sistemi (ajanın çiğneyemeyeceği güvenlik kuralları), bir izleme sistemi (ajanın ne yaptığını gerçek zamanlı gösteren panolar), bir uyarı sistemi (ajan kapsamından çıktığında bildirimler) ve bir geri alma sistemi (son eylemleri iptal etme kapasitesi).

Önce, kopyilotunuzun %99 doğrulukla gerçekleştirdiği düşük riskli eylemleri belirleyin: alındı onayı gönderme, CRM'de durum güncelleme, bir belgeyi arşivleme. Yalnızca bu eylemler için özerkliği etkinleştirin. Orta riskli eylemleri (müşteriye e-posta gönderme, sipariş değiştirme) kopyilot modunda bırakın. Ve yüksek riskli eylemleri (indirim onaylama, sözleşme iptali) zorunlu insan doğrulaması modunda tutun.

**Tuzak:** geçişin kademeli olduğunu düşünmek. Kademeli değildir. "Human-on-the-loop" mimarisi, "human-in-the-loop" mimarisinden temelden farklıdır. Yapılandırılmış günlüklere, güven metriklerine, geri çekilme politikalarına ve bir denetim panosuna ihtiyacınız var. Bu kendi başına bir projedir, bir açma/kapama düğmesi değil.

### 4. Seviye'den 5. Seviye'ye

2026'da bir KOBİ için 5. Seviye büyük ölçüde teoriktir. Teknolojiler mevcuttur (CrewAI, AutoGen, LangGraph gibi çerçeveler), ancak KOBİ bağlamında üretime hazır kullanım durumları nadirdir. 4. Seviye'deyseniz ve 5. Seviye'yi düşünüyorsanız, kendinize bir soru sorun: insan denetiminin yokluğu gerçek bir değer mi getiriyor, yoksa bu teknolojik bir hırs mı? Cevap ikincisiyse, 4. Seviye'de kalın. İşletmelerin çoğu, YG'lerinin %80'ini 2. ve 3. Seviye arasında elde eder. 5. Seviye kağıt üzerinde çekicidir, ancak 2026'da bir KOBİ için risk/fayda oranı hâlâ güçlü bir şekilde risk tarafına meyleder.

**Tuzak:** hiperotomasyonun çekiciliği. Yazılım satıcılarının pazarlama söylemleri size tam otomasyon, hiçbir şeyin insan müdahalesi gerektirmediği sürekli bir akış vaat eder. Uygulamada, 5. Seviye ajanlar kusursuz veriler, gelişmiş guardrails ve net bir hukuki çerçeve gerektirir. Bu koşulların hiçbiri 2026'da standart bir KOBİ için tam olarak karşılanmamaktadır.

## KOBİ'niz hangi seviyede?

Mevcut seviyenizi, aşağıdaki soruları yanıtlayarak değerlendirin. Durumunuza en çok uyan yanıtları sayın.

**1. Gelen e-postaları nasıl yönetiyorsunuz?**
- a) Manuel sıralama, bültenler için birkaç Outlook kuralı → 1. Seviye
- b) Gönderen ve konuya göre yönlendiren otomatik iş akışı → 2. Seviye
- c) İçeriği okuyup yanıt öneren kopyilot YA → 3. Seviye
- d) Basit taleplere yanıt veren, karmaşık olanları aktaran ajan → 4. Seviye

**2. Potansiyel müşterilerinizi nasıl niteliklendiriyorsunuz?**
- a) Manuel olarak, her talebi okuyarak → 1. Seviye
- b) Form alanlarına dayalı karar ağacı → 2. Seviye
- c) Serbest metni analiz edip niteliklendirme öneren kopyilot → 3. Seviye
- d) Otomatik olarak niteliklendiren, puanlayan ve yönlendiren ajan → 4. Seviye

**3. Otomasyonunuz beklenmedik bir durumla karşılaştığında ne olur?**
- a) Hiçbir şey yapmaz — kural uygulanmaz → 1. Seviye
- b) Varsayılan duruma geçer, manuel işlenir → 2. Seviye
- c) Kopyilot, insanın doğrulayacağı veya düzelteceği bir öneri sunar → 3. Seviye
- d) Ajan durur ve bir insanı uyarır → 4. Seviye

**4. Otomasyonlarınızın bakımına ne kadar zaman ayırıyorsunuz?**
- a) Hemen hemen hiç: kurallar kendi başına çalışıyor → 1. Seviye (ama çok şey kapsamıyor)
- b) Dalları ayarlamak için ayda birkaç saat → 2. Seviye
- c) Promptları ayarlamak ve önerileri düzeltmek için düzenli zaman → 3. Seviye
- d) Ajanları izlemek ve anormallikleri analiz etmek için günlük zaman → 4. Seviye

**5. Şu anki en büyük darboğazınız nedir?**
- a) Çok fazla tekrarlayan manuel görev → 1. Seviye'desiniz, 2'ye geçin
- b) İş akışlarınızın kapsamadığı istisnalar → 2. Seviye'desiniz, 3'e geçin
- c) Kopyilotun önerilerini doğrulamaya harcanan zaman → 3. Seviye'desiniz, 4'e geçin
- d) Yarı otonom ajanların denetimi → 4. Seviye'desiniz, 5'i hedeflemeden önce optimize edin

## SSS

### 5. Seviye 2026'da bir KOBİ için erişilebilir mi?

Hayır, üretimde güvenilir bir şekilde değil. 5. Seviye ajanlar araştırma laboratuvarlarında ve birkaç büyük teknoloji şirketinde mevcuttur, ancak KOBİ'de konuşlandırılmaları üç engelle karşılaşır: yeterli eğitim verisi eksikliği, otonom kararların sorumluluğu üzerine net bir hukuki çerçevenin yokluğu ve izleme altyapısının maliyeti. 2026'da 5. Seviye'yi hedefleyen bir KOBİ, üretime değil, denemeye yatırım yapar. 4. Seviye, gerçekçi maksimumdur.

### Bir seviye atlanabilir mi?

Teknik olarak evet, ancak bu nadiren akıllıca olur. Her seviye, öncekinin yetkinlikleri üzerine inşa edilir. 1. Seviye'den 3. Seviye'ye atlamak, hiç koşullu iş akışı kurmadan bir kopyilot YA konuşlandırmaya çalışmaktır. Süreçlerinizi tanımlamak için gereken kelime dağarcığından, guardrails tanımlama titizliğinden ve sonuçları değerlendirme olgunluğundan yoksun kalırsınız. Seviye seviye çıkın. Daha yavaştır, ancak her seviye zaten somut bir YG sunar.

### RPA ve YA otomasyonu arasındaki fark nedir?

[RPA (Robotik Süreç Otomasyonu)](/blog/rpa-vs-ia-automation) ölçeğimizin 1. Seviyesine karşılık gelir: insan eylemlerini deterministik olarak, zeka olmadan kopyalar. YA otomasyonu 3. Seviye'de başlar: doğal dili anlar, varyasyonlara uyum sağlar ve düzeltmelerden öğrenir. RPA, kararlı, tekrarlayan ve tam olarak belgelenmiş süreçler için mükemmeldir. YA otomasyonu, süreç yargı, dil veya uyum gerektirdiğinde gereklidir.

### 2. Seviye'den 3. Seviye'ye geçiş ne kadara mal olur?

Standart bir KOBİ için, 2. Seviye'den 3. Seviye'ye geçiş tipik olarak entegrasyonda (iş akışı yapılandırması, prompt yazımı, testler ve yinelemeler) 2.000 ile 8.000 euro arasında tutar, artı dil modeli çağrıları için aylık 50 ila 300 euro tekrar eden maliyet. YG genellikle 2-4 ay içinde, kazanılan zaman ve önlenebilen hatalar şeklinde ortaya çıkar. Bu, bir KOBİ için ölçekteki en kârlı yatırımdır.

### Mümkün olan en yüksek seviyeye mi ulaşmalıyım?**

Hayır. Sezgiye aykırı olarak, KOBİ'lerin çoğu YG'lerinin %80'ini 2. ve 3. Seviye arasında elde eder. 4. Seviye ölçeklenebilirlik getirir, ancak önemli bir altyapı maliyetiyle. 5. Seviye, 2026'da bir KOBİ için kanıtlanmış YG getirmemektedir. Doğru seviye, faaliyetiniz için kazanç/karmaşıklık oranını maksimize eden seviyedir. Hizmet KOBİ'si için bu genellikle 3. Seviye'dir. Yüksek hacimli e-ticaret KOBİ'si için 4. Seviye. Mikro işletme için 2. Seviye fazlasıyla yeterlidir.

## Güncelleme -- Nisan 2026

Son güncellememizden bu yana, üç kayda değer gelişme YA otomasyon seviyeleri manzarasını değiştirmiştir:

**Hazır 4. Seviye ajanların ortaya çıkışı.** 2025 sonlarında, Lindy, Relevance AI ve CrewAI gibi platformlar, belirli kullanım durumları (müşteri desteği, potansiyel müşteri niteliklendirme, iade yönetimi) için önceden yapılandırılmış yarı otonom ajanlar sunmaya başladı. Bu, 4. Seviye'nin giriş bariyerini önemli ölçüde düşürür: izleme ve guardrails mimarisini kendiniz inşa etmek yerine, kiralarsınız. Tipik aylık maliyet, 2.000-5.000 eurodan (özel mimari) 200-800 euroya (SaaS) düşer. Bu, KOBİ'ler için oyun değiştiricidir.

**3. Seviye'nin standart olarak konsolidasyonu.** Microsoft Copilot, Google Gemini for Workspace ve CRM'lere entegre kopyilotlar (Salesforce Einstein, HubSpot AI), 3. Seviye'yi teknik entegrasyon olmadan erişilebilir kılmıştır. 2026'da, güncel bir ofis paketine sahip KOBİ'lerin çoğu, farkında olmadan zaten bir kopyilot YA'ya sahiptir. Zorluk artık teknik değil — örgütseldir: ekipleri bunu etkili kullanmaları için eğitmek.

**Avrupa hukuki çerçevesi netleşiyor.** Kademeli olarak yürürlüğe giren Avrupa Yapay Zeka Yasası (AI Act), düşük riskli YA sistemleri (1-3. Seviyeler, az yükümlülük), sınırlı riskli (4. Seviye, şeffaflık ve belgeleme yükümlülükleri) ve yüksek riskli (bazı sektörlerde 5. Seviye, ağır yükümlülükler) arasında ayrım yapmaktadır. Bir KOBİ için bu, 4. Seviye'ye çıkmakın ihmal edilemez uyum adımları gerektirdiği ve düzenlenmiş sektörlerde (finans, sağlık, İK) 5. Seviye'nin önemli hukuki yatırım gerektirdiği anlamına gelir.

## Sonuç

YA otomasyonunun beş seviyesi, 5. Seviye'nin nihai hedef olduğu bir değer hiyerarşisi değildir. Bu bir karar çerçevesidir. Her seviyenin güçlü yönleri, zayıflıkları ve optimum kullanım durumu vardır. 1. Seviye mikro otomasyonlar için yeterlidir. 2. Seviye yapılandırılmış iş süreçlerini kapsar. 3. Seviye, YA destekli verimliliği dönüştürür. 4. Seviye, yarı otonom ajanlarla ölçeklenebilirliğin kilidini açar. 5. Seviye, 2026'da KOBİ'ler için operasyonel bir gerçeklikten çok bir araştırma ufku olarak kalmaktadır.

Anahtar, dürüstlüktür. Denetlediğim KOBİ'lerin %80'i otomasyon yaptığını düşünür, oysa sıralama kuralları ve makrolarla 1. Seviye'dedir. Gerçek seviyenizi belirleyin. Sonraki seviyenin gerçekçi kazancını değerlendirin. Buna göre yatırım yapın. Ve unutmayın: 5. Seviye'ye ulaşmanız gerekmiyor. YG'nizi maksimize eden seviyeye ulaşmanız gerekiyor — ve çoğu KOBİ için bu, 2. ve 3. Seviye arasındadır. [Otomasyondan otonom ajana giden yol](/blog/automation-agent-autonome) bir yolculuktur, bir yarış değil.