# Console Verna — ملخص المشروع

> صفحات هبوط لبيع كونسول خشب طبيعي في الجزائر — 3 تيمات لونية، دعم FR/AR، الدفع عند الاستلام، تسجيل الطلبات في Google Sheets.

**المستودع:** https://github.com/smailchocho01-alt/console-verna
**الموقع:** https://smailchocho01-alt.github.io/console-verna/

---

## 1. الملفات الرئيسية

| الملف | الوصف |
|---|---|
| [console_verna.html](console_verna.html) | تيمة خضراء (#87a17d) |
| [console_verna_terracotta.html](console_verna_terracotta.html) | تيمة تيراكوتا (#b85842) |
| [console_verna_monochrome.html](console_verna_monochrome.html) | تيمة ذهبية أحادية (#b08858) |
| [google-sheet-apps-script.gs](google-sheet-apps-script.gs) | سكربت Google Apps Script لاستقبال الطلبات |
| [PHOTO/](PHOTO/) | صور المنتج (WebP) |
| [com/](com/) | لقطات شاشة لرسائل عملاء حقيقيين (WebP) |

---

## 2. هيكل الصفحة (9 أقسام)

1. **HERO** — عنوان رئيسي + شعار + زر تبديل اللغة
2. **معرض المنتج** — صورة رئيسية + 4 مصغرات قابلة للتبديل
3. **Value Props** — 4 مزايا (خشب طبيعي، الدفع عند الاستلام، 58 ولاية، ضمان سنة)
4. **التقييمات النصية** — 4 شهادات عملاء + تقييم 4.9/5
5. **رسائل العملاء** ⭐ — معرض أفقي قابل للسحب لـ 3 لقطات شاشة حقيقية
6. **السعر** — `11 500 DA` بخط Bebas Neue + شارة الدفع عند الاستلام
7. **الأبعاد** — ارتفاع/عرض/عمق/وزن
8. **نموذج الطلب** — اختيار اللون + الاسم + الهاتف + الولاية + زر الطلب + زر WhatsApp للأسئلة
9. **FAQ** — 3 أسئلة شائعة عن التوصيل
10. **Trust bar** — 3 نقاط ثقة في الأسفل

---

## 3. الميزات التفاعلية

### 🌐 تبديل اللغة (FR / AR)
- زر في أعلى يمين الـ HERO
- يبدّل `<html lang>` و `dir` (LTR ↔ RTL)
- يترجم **كل النصوص** عبر `data-i18n` (HTML)، `data-i18n-html` (مع `<br>`), `data-i18n-placeholder` (للحقول)
- خطوط عربية: **Cairo** (نصوص) + **Amiri** (عناوين)
- يحفظ التفضيل في `localStorage`
- اكتشاف تلقائي من `navigator.language` عند أول زيارة
- **58 ولاية ثنائية اللغة** في القائمة المنسدلة مع بحث يعمل بكلا اللغتين

### 📊 تسجيل الطلبات في Google Sheets
- يستخدم **Google Apps Script Web App** (مجاني، بدون backend)
- إرسال خفي عبر `navigator.sendBeacon` (لا يؤخر العميل)
- البيانات المسجلة: التاريخ، اللغة، الاسم، الهاتف، الولاية، اللون، **التيمة** (verna / terracotta / monochrome)، الرابط الكامل
- يعمل أيضاً عبر `fetch` مع `keepalive: true` كبديل احتياطي

### ✅ شاشة تأكيد بعد الطلب
- بعد إرسال الطلب، يتم **إخفاء النموذج** و WhatsApp وعرض بطاقة شكر
- "تم استلام طلبك ✓" / "Commande reçue ✓"
- "📞 احتفظ بهاتفك معك" / "📞 Gardez votre téléphone..."
- WhatsApp **لم يعد** يُفتح للطلبية، فقط لزر "لدي سؤال"

### 💬 زر WhatsApp واضح المعالم
- **خلفية خضراء WhatsApp الرسمية** (#25D366)
- **أيقونة SVG حقيقية** لـ WhatsApp
- ظل ناعم لإبراز الزر
- مخصص للأسئلة فقط، ليس للطلبية

### 🎨 اختيار اللون داخل النموذج
- نُقل من قسم السعر إلى داخل قسم "Votre commande" / "طلبك"
- مباشرة قبل حقل الاسم
- 3 خيارات: Beige Naturel / Blanc Mat / Noyer Foncé
- حقل "Finition choisie" المكرر تم حذفه

### ✨ خط السعر
- **Bebas Neue** عريض ومضغوط
- حجم 44px مع letter-spacing لإبراز السعر
- باقي الخطوط بقيت كما هي

### 🖼️ صور WebP
- كل صور `PHOTO/` و `com/` بصيغة WebP
- تخفيض الحجم بنسبة ~70% مقارنة بـ PNG/JPEG
- `loading="lazy"` للصور خارج الشاشة

---

## 4. إعداد Google Sheets (مرة واحدة)

### الخطوات

1. **إنشاء ورقة جديدة** على [sheets.google.com](https://sheets.google.com)
2. نسخ الـ ID من الرابط: `docs.google.com/spreadsheets/d/<ID>/edit`
3. فتح **Extensions → Apps Script**
4. لصق محتوى [google-sheet-apps-script.gs](google-sheet-apps-script.gs) ووضع الـ ID في `SHEET_ID`
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. نسخ رابط Web app ولصقه في الثابت `GS_WEBHOOK_URL` داخل ملفات HTML الثلاثة

### الرابط المُستخدم حالياً
```
https://script.google.com/macros/s/AKfycbzy6UbgzlUIiuBOfMmpPUo1optULPQu9LYPpSHa676MulCBWUQ5RNzphWdmDTGOlx2K/exec
```

### أعمدة الورقة
| Date | Langue | Prénom | Téléphone | Wilaya | Finition | Thème | Source |

---

## 5. النشر على GitHub Pages

تم تفعيل GitHub Pages من إعدادات المستودع (Settings → Pages → Source: main branch).

### الروابط المباشرة

| التيمة | الرابط |
|---|---|
| 🌿 أخضر | https://smailchocho01-alt.github.io/console-verna/console_verna.html |
| 🧱 تيراكوتا | https://smailchocho01-alt.github.io/console-verna/console_verna_terracotta.html |
| ⚫ ذهبي | https://smailchocho01-alt.github.io/console-verna/console_verna_monochrome.html |

⏱ بعد كل `git push`، GitHub Pages يحتاج **30-60 ثانية** ليُحدّث.

---

## 6. ثوابت قابلة للتعديل

في كل ملف HTML (داخل `<script>`):

```js
const PHONE_NUMBER = '213562637101';       // رقم WhatsApp بصيغة دولية
const GS_WEBHOOK_URL = 'https://...';      // رابط Apps Script
const THEME_NAME = 'verna';                // verna / terracotta / monochrome
const ALG_PHONE_RE = /^(\+213|0)[2-9]\d{8}$/;  // تحقق الأرقام الجزائرية
```

**السعر** يُعدَّل في 3 أماكن داخل قسم 5 (PRIX): السعر الجديد، القديم، نسبة الخصم.

**نص الطلب الواصل للـ WhatsApp** (زر "لدي سؤال" فقط) يُعدَّل في مفاتيح:
- `wa-question` (FR + AR)

---

## 7. التسلسل الزمني للتعديلات

| Commit | المحتوى |
|---|---|
| `b52b24f` | Initial commit — 3 تيمات + FR/AR + Google Sheets |
| `a6af6df` | معرض رسائل العملاء + زر WhatsApp مُحسَّن + نقل اختيار اللون + خط Bebas Neue للسعر |
| `74586c6` | تحويل صور رسائل العملاء من JPEG إلى WebP |
| `88cc38c` | تحديث مراجع صور المنتج `.png → .webp` |

---

## 8. كيفية الاختبار

### اختبار محلي
- افتح أي ملف `.html` مباشرة في المتصفح (Double-click)
- جرّب: تبديل اللغة، اختيار لون، تبديل الصور، ملء النموذج والإرسال

### اختبار النموذج
- املأ بيانات صحيحة (الهاتف يجب أن يبدأ بـ 0 ثم رقم 2-9 — مثال: 0661234567)
- اختر ولاية من القائمة (ليس كتابة حرة)
- بعد الإرسال: يجب أن تظهر بطاقة الشكر، والصف يجب أن يُضاف إلى Google Sheet
- بعد الإرسال: WhatsApp **لا** يُفتح (فقط زر "لدي سؤال" يفتحه)

### اختبار التحقق
- اسم أقل من حرفين → خطأ
- رقم هاتف غير صحيح → خطأ
- ولاية غير موجودة في القائمة → خطأ

---

## 9. ملاحظات تقنية

- **CRLF Warning** عند `git push` على Windows: غير مؤذٍ، فقط تحويل تلقائي لنهايات الأسطر
- المستودع **Public** للسماح بـ GitHub Pages مجانياً، لا يحتوي على أي بيانات حساسة
- رابط `GS_WEBHOOK_URL` ظاهر في الكود لكنه آمن لأن Apps Script Web App مصمم لاستقبال طلبات عامة
- `.gitignore` يحمي `.env`, `secrets.json`, `node_modules/` إذا أُضيفت لاحقاً
