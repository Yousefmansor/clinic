# Care Clinic — Doctor Booking System

هذا هو **المشروع النهائي** لنظام حجز مواعيد عيادة، مبني باستخدام **MEAN Stack**. يوجد المشروع كاملًا داخل هذا المجلد، بينما تبقى واجبات الأيام السابقة في مجلدات مستقلة في جذر المستودع.

## بنية المشروع

```text
Final Project/
├── api/                              # Backend: Node.js + Express + TypeScript + MongoDB
│   └── src/
│       ├── models/                   # Doctor, Patient, Appointment, Admin
│       ├── controllers/              # Business logic
│       ├── routes/                   # API routes
│       ├── middleware/               # JWT authentication
│       ├── app.ts                    # Express app configuration
│       └── server.ts                 # Backend entry point
├── frontend/                         # Frontend: Angular
│   └── src/app/
│       ├── doctors/                  # Public doctors list
│       ├── booking/                  # Multi-step booking form
│       ├── admin-login/              # Admin login page
│       └── dashboard/                # Protected admin dashboard
├── README.md                         # This project guide
└── CARE_CLINIC_ORAL_EXAM_QA_AR.md    # Oral-exam study guide (Arabic)
```

## المميزات

| الميزة | الوصف |
|---|---|
| قائمة الدكاترة | عرض الدكاترة مع فلترة حسب التخصص وزر حجز سريع. |
| حجز موعد | نموذج من ثلاث خطوات: بيانات المريض، اختيار التاريخ والوقت، ثم التأكيد. |
| جدول عمل الطبيب | لكل طبيب أيام عمل وساعات بداية ونهاية ومدة للزيارة. |
| السلات المتاحة | النظام يولّد الأوقات المتاحة ويستبعد المواعيد المحجوزة بالفعل. |
| لوحة الأدمن | تعرض مواعيد اليوم، الإحصائيات، وتسمح بتغيير حالة الموعد. |
| إدارة الدكاترة | يستطيع الأدمن إضافة طبيب جديد، تعديل جدول عمله، أو حذفه. |
| الحماية | تسجيل دخول للأدمن باستخدام JWT، مع Route Guard في Angular. |

## المتطلبات

- Node.js 20 أو أحدث.
- MongoDB محليًا أو MongoDB Atlas.

## التشغيل محليًا

افتح Terminal في **هذا المجلد (`Final Project`)** ثم اتبع الخطوات التالية.

### 1. تشغيل قاعدة البيانات

تأكد أولًا أن خدمة MongoDB تعمل على المنفذ الافتراضي `27017`.

### 2. تشغيل الباك إند

```bash
cd api
npm install
```

أنشئ ملفًا باسم `.env` داخل `api` واكتب القيم التالية:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/care-clinic
JWT_SECRET=your-secret-key
```

ثم شغّل السيرفر:

```bash
npm run dev
```

سيعمل الـ API على:

```text
http://localhost:4000
```

عند أول تشغيل ينشئ التطبيق أدمن افتراضيًا إن لم يكن موجودًا:

| الحقل | القيمة |
|---|---|
| Email | `admin@careclinic.com` |
| Password | `admin123` |

### 3. تشغيل الفرونت إند

افتح Terminal جديدًا من مجلد `Final Project` ثم:

```bash
cd frontend
npm install
npm start
```

افتح الموقع من المتصفح على:

```text
http://localhost:4200
```

في وضع التطوير، ملف `proxy.conf.json` يوجّه طلبات `/api` من Angular إلى الباك إند على `localhost:4000`.

## أهم API Endpoints

| Method | Endpoint | الوصول | الوصف |
|---|---|---|---|
| GET | `/api/health` | عام | فحص تشغيل السيرفر. |
| GET | `/api/doctors` | عام | جلب قائمة الدكاترة. |
| POST | `/api/doctors` | أدمن | إضافة دكتور جديد. |
| PATCH | `/api/doctors/:id` | أدمن | تعديل بيانات أو جدول عمل دكتور. |
| DELETE | `/api/doctors/:id` | أدمن | حذف دكتور. |
| POST | `/api/patients` | عام | إنشاء سجل مريض خلال الحجز. |
| GET | `/api/appointments/available-slots` | عام | عرض الأوقات المتاحة لدكتور في تاريخ محدد. |
| POST | `/api/appointments` | عام | حجز موعد جديد. |
| GET | `/api/appointments/today` | أدمن | جلب مواعيد اليوم وإحصائياتها. |
| PATCH | `/api/appointments/:id/status` | أدمن | تغيير حالة الموعد. |
| POST | `/api/auth/login` | عام | تسجيل دخول الأدمن وإرجاع JWT. |

## التقنيات المستخدمة

| الجزء | التقنيات |
|---|---|
| Frontend | Angular، Standalone Components، Router، HttpClient، Template-driven Forms |
| Backend | Node.js، Express، TypeScript |
| Database | MongoDB مع Mongoose |
| Authentication | JSON Web Token وbcryptjs |

> راجع ملف `CARE_CLINIC_ORAL_EXAM_QA_AR.md` إذا كنت تحضّر لمناقشة المشروع؛ فهو يحتوي على أسئلة وإجابات مرتبطة بالكود الفعلي.
