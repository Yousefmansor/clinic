# Care Clinic — Doctor Booking System (MEAN Stack)

مشروع نهائي (MEAN Stack) لنظام حجز مواعيد عيادة. يتكون من باكت إند (Node.js + Express + TypeScript + MongoDB) وفرونت إند (Angular).

## المميزات

- **صفحة الدكاترة (Doctors):** عرض الدكاترة مع الفلترة حسب التخصص وزر حجز سريع.
- **نموذج الحجز (Booking):** نموذج متعدد الخطوات (بيانات المريض، التاريخ والوقت، التأكيد) مع التحقق من توفر الموعد قبل الحجز.
- **تسجيل دخول الأدمن (Admin Login):** صفحة تسجيل دخول محمية.
- **لوحة التحكم (Dashboard):** عرض مواعيد اليوم مع إحصائيات (إجمالي المواعيد / المرضى الجدد) وإمكانية تغيير حالة الموعد.
- **جدول عمل الدكاترة (Doctor Schedule):** الأدمن يحدد أيام العمل وساعاته ومدة الموعد لكل دكتور من تبويب Doctors في لوحة التحكم، والمريض لا يستطيع الحجز إلا في الأيام والأوقات المتاحة فقط.
- **إضافة دكتور جديد (Add Doctor):** الأدمن يستطيع إضافة دكتور جديد بالكامل من الداشبورد (الاسم، التخصص، رقم الهاتف، نبذة مختصرة، رابط صورة، وجدول العمل).

## بنية المشروع

```
clinic/
├── api/                 # الباك إند (Express + TypeScript + MongoDB)
│   └── src/
│       ├── models/      # Mongoose models (Doctor, Patient, Appointment, Admin)
│       ├── controllers/ # منطق العمل
│       ├── routes/      # مسارات API
│       ├── middleware/   # JWT authentication
│       ├── app.ts       # إعداد Express
│       └── server.ts    # نقطة البداية
├── frontend/            # الفرونت إند (Angular)
│   └── src/app/
│       ├── doctors/     # صفحة قائمة الدكاترة
│       ├── booking/     # نموذج الحجز متعدد الخطوات
│       ├── admin-login/ # تسجيل دخول الأدمن
│       └── dashboard/   # لوحة تحكم الأدمن
└── README.md
```

## المتطلبات

- Node.js (v20+)
- MongoDB (محلي أو Atlas)

## التشغيل

### 1. الباك إند

```bash
cd api
npm install
```

أنشئ ملف `api/.env` وضع فيه:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/care-clinic
JWT_SECRET=your-secret-key
```

```bash
npm start
```

عند أول تشغيل يتم إنشاء الأدمن الافتراضي تلقائيًا:

| الحقل | القيمة |
| --- | --- |
| Email | admin@careclinic.com |
| Password | admin123 |

### 2. الفرونت إند

```bash
cd frontend
npm install
ng serve
```

يفتح الموقع على `http://localhost:4200`. في وضع التطوير يتم توجيه طلبات `/api` إلى الباك إند عبر `proxy.conf.json`.

## أهم الـ API Endpoints

| المسار | الطريقة | ملاحظة |
| --- | --- | --- |
| `/api/health` | GET | فحص صحة السيرفر |
| `/api/doctors` | GET | قائمة الدكاترة (عام) |
| `/api/doctors` | POST | إضافة دكتور (أدمن) |
| `/api/patients` | POST | إنشاء مريض (عام) |
| `/api/appointments` | POST | حجز موعد (عام) |
| `/api/appointments/today` | GET | مواعيد اليوم (أدمن) |
| `/api/appointments/available-slots` | GET | السلات المتاحة لدكتور في تاريخ معين (عام) |
| `/api/doctors/:id` | PATCH | تعديل جدول عمل الدكتور (أدمن) |
| `/api/appointments/:id/status` | PATCH | تغيير الحالة (أدمن) |
| `/api/auth/login` | POST | تسجيل دخول الأدمن |

## التقنية المستخدمة

- **Backend:** Node.js, Express, TypeScript, Mongoose, JWT (bcryptjs, jsonwebtoken)
- **Frontend:** Angular (Standalone Components, Router, HttpClient)
- **Database:** MongoDB
