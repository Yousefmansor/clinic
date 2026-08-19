# بنك أسئلة مناقشة مشروع **Care Clinic**

> **مهم:** هذا المستند مبني على الكود الموجود فعليًا في مشروعك، وليس على إجابات عامة. احفظ أولًا الإجابات القصيرة، ثم راجع إجابة التعمّق وموضع الكود؛ لأن الممتحن قد يقول: «ورّيني فين عملت كده؟».

## طريقة استخدام البنك

في المقابلة لا تبدأ بتفاصيل كثيرة. جاوب بجملة قصيرة وواضحة، ثم افتح الملف أو اذكر اسمه إذا طلب منك. لا تدّعِ وجود ميزة غير موجودة. في آخر المستند توجد أسئلة صعبة عن أشياء **غير مطبقة حاليًا**؛ الإجابة الصحيحة عليها هي الاعتراف بها وذكر طريقة تطويرها.

| الرمز | المقصود |
|---|---|
| **إجابة سريعة** | جملة مناسبة لو السؤال مباشر. |
| **لو كمل معاك** | تفصيل إضافي تقوله فقط إذا سأل أكثر. |
| **فين في الكود؟** | اسم الملف أو الدالة التي تفتحها أمامه. |

---

# أولًا: افتتاحية المشروع والـ Architecture

> **أفضل تعريف للمشروع:** «Care Clinic هو نظام حجز عيادة مبني بـ MEAN Stack. المريض يختار الدكتور وتاريخًا ووقتًا متاحًا، والباك إند يتحقق من جدول عمل الدكتور ومن عدم وجود حجز سابق. الأدمن يسجل دخول ويدير مواعيد اليوم والدكاترة وجداول العمل.»

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 1 | مشروعك فكرته إيه؟ | نظام لحجز مواعيد عيادة؛ المريض يحجز والدمن يدير الدكاترة والمواعيد. | المسارات الأساسية في `frontend/src/app/app.routes.ts`. |
| 2 | ليه اخترت مشروع عيادة؟ | لأنه مثال واقعي يحتاج CRUD، علاقات بين بيانات، Authentication، ومنطق مواعيد وليس مجرد صفحات. | الكيانات: Doctor وPatient وAppointment وAdmin. |
| 3 | إيه الـ MEAN Stack؟ | MongoDB لقاعدة البيانات، Express للـ API، Angular للواجهة، وNode.js لتشغيل الباك إند. | `api/package.json` و`frontend/package.json`. |
| 4 | إيه الفرق بين Node.js وExpress؟ | Node.js بيئة تشغيل JavaScript على السيرفر، وExpress إطار بيسهّل إنشاء routes وmiddlewares والـ API. | `api/src/server.ts` يشغّل التطبيق و`api/src/app.ts` يستخدم Express. |
| 5 | ليه استخدمت TypeScript؟ | لأن الـ types تقلل أخطاء البيانات وتوضح شكل كل object قبل التشغيل. | `IAdmin` و`IDoctor` و`Appointment` interfaces. |
| 6 | مشروعك Monolith ولا Microservices؟ | Monolith صغير: API واحدة وواجهة Angular واحدة، وهذا مناسب لحجم Final Project. | مجلدا `api` و`frontend`. |
| 7 | إيه النمط المعماري في الباك إند؟ | MVC مبسّط: Route يستقبل الطلب، Controller يطبق المنطق، Model يتعامل مع MongoDB. | مثال: `doctor.routes.ts` → `doctor.controller.ts` → `doctor.model.ts`. |
| 8 | اشرح مسار طلب حجز من أول click لحد DB. | Angular ينشئ Patient ثم يرسل Appointment؛ Express يمرره للـ controller؛ controller يتحقق ثم Mongoose يحفظ في MongoDB. | `booking.component.ts` داخل `confirm()` و`appointment.controller.ts` داخل `create()`. |
| 9 | ليه فصلت frontend عن backend؟ | للفصل بين مسؤولية العرض ومسؤولية البيانات، ولأن Angular لا يجب أن يصل لقاعدة البيانات مباشرة. | `frontend/` و`api/`. |
| 10 | إيه الكيانات الرئيسية؟ | Doctor، Patient، Appointment، Admin. | `api/src/models/`. |
| 11 | إيه العلاقة بين الكيانات؟ | Appointment هو الرابط: يحتوي ObjectId للمريض وObjectId للدكتور. | `appointment.model.ts` حقلا `patient` و`doctor`. |
| 12 | ليه Appointment كيان مستقل؟ | لأن الموعد له بيانات تخصه مثل التاريخ والوقت والحالة ونوع الزيارة، وليس مجرد field داخل Doctor أو Patient. | `IAppointment`. |
| 13 | إيه الفرق بين public وadmin features؟ | الحجز وقائمة الدكاترة public؛ إدارة الدكاترة والمواعيد تتطلب JWT للأدمن. | routes و`requireAdmin`. |
| 14 | إيه أهم business rule في المشروع؟ | المريض لا يحجز إلا في يوم وساعة ضمن جدول الدكتور، ولا يمكن حجز نفس السلة مرتين. | `availableSlots()` و`create()` في appointment controller. |
| 15 | إيه أهم إضافة منطقية في مشروعك؟ | Doctor availability: أيام وساعات ومدة زيارة لكل دكتور، مع توليد slots واستبعاد المحجوز. | `IDoctorSchedule` و`generateSlots()`. |
| 16 | ليه التصميم مش معقد؟ | ركزت على وضوح flow الحجز وسهولة شرح الكود؛ البساطة تقلل الأخطاء وتخدم المستخدم. | المكونات: Doctors، Booking، Admin Login، Dashboard. |
| 17 | هل الواجهة SPA؟ | نعم، Angular يعرض components حسب route بدون إعادة تحميل صفحة كاملة. | `<router-outlet>` في `app.component.ts`. |
| 18 | إيه الفرق بين client-side وserver-side validation؟ | Client-side لتحسين تجربة المستخدم، وserver-side للحماية لأن أي شخص يقدر يتجاوز الواجهة ويرسل API request مباشرة. | `nextStep()` مقابل checks في `appointment.controller.ts`. |

---

# ثانيًا: المجلدات، الملفات، وتشغيل التطبيق

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 19 | ليه عندك `api` و`frontend`؟ | `api` للـ Express وMongoDB، و`frontend` لتطبيق Angular. | root project folders. |
| 20 | إيه وظيفة `server.ts`؟ | يتصل بـ MongoDB ثم يشغّل HTTP server على البورت المحدد. | `api/src/server.ts`. |
| 21 | إيه وظيفة `app.ts`؟ | ينشئ Express app ويضيف middlewares ويربط مجموعات الـ routes. | `api/src/app.ts`. |
| 22 | ليه فصلت server عن app؟ | لتسهيل الاختبار وإبقاء مسؤولية التشغيل منفصلة عن تهيئة التطبيق والمسارات. | `server.ts` يستورد `app`. |
| 23 | المشروع بيشتغل على بورت كام؟ | API على 4000 افتراضيًا، وAngular development server على 4200 افتراضيًا. | `.env` و`server.ts` وAngular CLI. |
| 24 | هل لازم البورت يكون 3000؟ | لا، البورت رقم متاح لاختيار الخدمة؛ اخترت 4000 لتجنب التعارض، والمهم أن proxy يشير له. | `PORT || 4000` و`proxy.conf.json`. |
| 25 | إزاي تشغل الباك إند في التطوير؟ | من `api`: `npm run dev`، وهو يشغّل `tsx src/server.ts`. | `api/package.json`. |
| 26 | إزاي تشغل الفرونت إند؟ | من `frontend`: `npm start`، وهو `ng serve`. | `frontend/package.json`. |
| 27 | ليه محتاج terminalين؟ | لأن Angular server وExpress server عمليتان منفصلتان ببورتين مختلفين. | API 4000 وclient 4200. |
| 28 | قبل التشغيل محتاج إيه؟ | MongoDB لازم تكون شغالة، ثم API، ثم frontend. | URI في `.env`. |
| 29 | إيه `npm run build` في API؟ | يحول TypeScript إلى JavaScript داخل `dist` لتشغيله بالإنتاج عبر `node dist/server.js`. | scripts في `api/package.json`. |
| 30 | إيه `ng build`؟ | يبني ملفات Angular static optimized للنشر؛ ليس development server. | `frontend/package.json`. |
| 31 | إيه `/api/health`؟ | endpoint بسيط للتأكد أن Express يعمل ويرجع `{ status: "ok" }`. | `app.ts`. |
| 32 | ليه تستخدم `.env`؟ | لفصل الإعدادات الحساسة أو المتغيرة مثل URI وJWT secret والبورت عن source code. | `api/.env` و`dotenv/config`. |
| 33 | هل `.env` يُرفع إلى GitHub؟ | لا، الأفضل وضعه في `.gitignore` وتوفير `.env.example` بدون أسرار. | تحسين مناسب قبل تسليم production. |
| 34 | فين بيحصل `dotenv` loading؟ | في بداية `server.ts` عبر `import "dotenv/config"`. | `api/src/server.ts`. |
| 35 | ليه API URL في frontend مش `localhost:4000` مباشرة؟ | استخدمت `/api` نسبيًا ثم Angular proxy يعيد توجيهه؛ هذا يتجنب مشكلة cross-origin في development. | `api.service.ts` و`proxy.conf.json`. |
| 36 | إيه وظيفة `proxy.conf.json`؟ | أي طلب يبدأ بـ `/api` يذهب من Angular dev server إلى `http://localhost:4000`. | `frontend/proxy.conf.json`. |
| 37 | هل proxy حل production؟ | لا، هو للحالة التطويرية؛ في production أضبط reverse proxy مثل Nginx أو API URL environment. | إجابة تطويرية صحيحة. |
| 38 | إيه `tsconfig.json`؟ | ملف إعداد TypeScript: target وmodule resolution ومكان الخرج وقواعد التحويل. | `api/tsconfig.json`. |
| 39 | ليه `tsx` بدل `ts-node`؟ | `tsx` يشغّل TypeScript مباشرة بسرعة وبإعداد بسيط أثناء التطوير. | `dev` script. |
| 40 | لو ظهر `MongoDB connection error` تعمل إيه؟ | أتأكد أن MongoDB شغالة، وأراجع URI والبورت 27017 واسم المتغير في `.env`. | `mongoose.connect(MONGO_URI)` في `server.ts`. |

---

# ثالثًا: MongoDB وMongoose والـ Models

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 41 | إنت مستخدم أنهي database؟ | MongoDB باستخدام Mongoose ODM. | `mongoose` في API dependencies. |
| 42 | إيه MongoDB؟ | NoSQL document database تخزن documents بشكل قريب من JSON داخل collections. | الداتا تظهر كـ Doctors وPatients وAppointments وAdmins. |
| 43 | إيه الفرق بين Database وCollection وDocument؟ | Database مثل `care-clinic`، Collection مثل `doctors`، Document سجل دكتور واحد. | Mongoose models. |
| 44 | اسم قاعدة البيانات إيه؟ | `care-clinic`. | fallback في `api/src/server.ts`. |
| 45 | إيه Mongoose؟ | ODM يعرّف schema وmodel ويجعل التعامل مع MongoDB من TypeScript منظمًا. | كل ملف داخل `api/src/models`. |
| 46 | إيه الفرق بين Schema وModel؟ | Schema يحدد شكل وقواعد البيانات؛ Model هو الكائن الذي أنفذ به create/find/update/delete. | `doctorSchema` و`Doctor`. |
| 47 | ليه في Models استخدمت `interface`؟ | لتحديد شكل document في TypeScript، كما كان مطلوبًا في الكورس، مع الاستفادة من type checking. | `IAdmin`, `IAppointment`, `IDoctor`, `IPatient`. |
| 48 | إيه `Document` في interfaces؟ | نوع Mongoose يضيف خصائص document مثل `_id` وطرق الحفظ فوق الحقول التي عرفتها. | imports في models. |
| 49 | إيه `timestamps: true`؟ | يجعل Mongoose يضيف `createdAt` و`updatedAt` تلقائيًا. | doctor/patient/appointment schemas. |
| 50 | ليه Admin له collection منفصل؟ | لأن الأدمن له email/password وصلاحية إدارة، وهي بيانات مختلفة عن بيانات المريض. | `admin.model.ts`. |
| 51 | إيه fields في Doctor؟ | name، specialty، phone، bio، image، maxSlotsPerDay، status، schedule. | `IDoctor`. |
| 52 | إيه field `status` في Doctor؟ | يحدد هل الدكتور active أو inactive أو on-leave، والحجز مسموح فقط للـ active. | enum في doctor model وcheck في appointment controller. |
| 53 | إيه `enum`؟ | قيد يجعل قيمة field واحدة من قيم محددة فقط. | doctor status وappointment status وvisitType. |
| 54 | ليه `phone` required للدكتور؟ | لأنه من التفاصيل الأساسية للدكتور ولا أريد إنشاء سجل ناقص. | `doctorSchema`. |
| 55 | هل bio وimage required؟ | لا، لهما default فارغ؛ لأن صورة أو نبذة اختيارية عند إضافة طبيب. | `doctor.model.ts`. |
| 56 | إيه `maxSlotsPerDay`؟ | حقل يعبّر عن حد يومي ممكن مستقبلاً، لكنه **غير مستخدم حاليًا في منطق الحجز**؛ عدد السلات الفعلي ناتج من الساعات والـ duration. | إجابة صادقة: field في `doctor.model.ts` فقط. |
| 57 | ما معنى `ref: "Patient"`؟ | مرجع بين collections يجعل Mongoose يعرف أن ObjectId يشير إلى Patient ويتيح populate. | `appointment.model.ts`. |
| 58 | لماذا Appointment يحتوي `patient` و`doctor` كـ ObjectId بدل نسخ كل بياناتهم؟ | لتقليل تكرار البيانات والمحافظة على علاقة مرجعية؛ التفاصيل تجلب بـ populate. | `appointmentSchema`. |
| 59 | إيه `populate()`؟ | يستبدل ObjectId بالـ document المرتبط عند القراءة. | `Appointment.find().populate("patient").populate("doctor")`. |
| 60 | هل MongoDB تعمل JOIN مثل SQL؟ | ليس بنفس الشكل؛ Mongoose `populate` ينفذ فكرة الربط على مستوى التطبيق. | controller appointment. |
| 61 | إيه fields في Patient؟ | name، phone، countryCode مع timestamps. | `patient.model.ts`. |
| 62 | ليه countryCode منفصل عن phone؟ | لعرض وتخزين كود الدولة بوضوح بدل خلطه بالرقم المحلي. | `IPatient`. |
| 63 | إيه fields في Appointment؟ | patient، doctor، date، time، visitType، reason، status. | `IAppointment`. |
| 64 | ليه date `Date` وtime `string`؟ | التاريخ للحجز في يوم محدد، والوقت نص مثل `09:00 AM` لعرض slot. في نسخة أكبر يمكن توحيدهما في DateTime واحد. | `appointment.model.ts`. |
| 65 | إيه visitType؟ | `new` أو `returning`، لتحديد هل الزيارة الأولى أم متابعة. | enum في appointment model. |
| 66 | إيه reason؟ | array من أسباب الزيارة التي اختارها المريض مثل consultation أو follow up. | `reason: [{ type: String }]`. |
| 67 | إيه status الافتراضي للموعد؟ | `pending` حتى يراجعه الأدمن، ثم يمكن تغييره confirmed أو cancelled. | appointment schema. |
| 68 | ليه Admin email `unique`؟ | لمنع إنشاء أدمنين بنفس الإيميل على مستوى MongoDB index. | `adminSchema`. |
| 69 | هل `unique: true` validation كامل؟ | هو ينشئ unique index، لكن يجب أيضًا التعامل مع duplicate key error عند الإنشاء في production. | تحسين محتمل. |
| 70 | إيه pre-save hook في Admin؟ | كود يعمل قبل حفظ الأدمن؛ يشفر الباسورد إذا تغير. | `adminSchema.pre("save")`. |
| 71 | ليه لا تخزن password plain text؟ | لأن تسريب database لا يجب أن يكشف كلمات المرور؛ نخزن bcrypt hash فقط. | `bcrypt.hash(this.password, 10)`. |
| 72 | إيه `10` في bcrypt hash؟ | salt rounds؛ توازن مناسب تعليميًا بين الأمان والسرعة. | `admin.model.ts`. |
| 73 | إيه `comparePassword`؟ | method على Admin يقارن كلمة المرور التي دخلها المستخدم بالـ hash المخزن. | `adminSchema.methods.comparePassword`. |
| 74 | الفرق بين hash وencryption؟ | Hash أحادي الاتجاه للمقارنة ولا أسترجع الأصل؛ encryption يمكن فكّه بمفتاح. | استخدمت hash للباسورد. |
| 75 | إيه default schedule؟ | الأحد إلى الخميس، من 09:00 إلى 17:00، ومدة الموعد 30 دقيقة. | `defaultSchedule` في doctor model. |
| 76 | ليه الأيام أرقام؟ | لأن `Date.getDay()` يعيد أرقام 0–6، فتكون المقارنة بسيطة؛ 0 الأحد و6 السبت. | comments في `IDoctorSchedule`. |
| 77 | إيه `scheduleSchema`؟ | subdocument schema داخل Doctor لتجميع days/start/end/duration. | `doctor.model.ts`. |
| 78 | هل يومي الجمعة والسبت افتراضيًا عمل؟ | لا، default days هي `[0,1,2,3,4]` فقط. | `defaultSchedule.days`. |
| 79 | هل عندك index يمنع حجز نفس slot فعليًا؟ | لا يوجد compound unique index حاليًا؛ المنع يتم في controller قبل الإنشاء. في نسخة أقوى أضيف unique index على doctor/date/time. | نقطة تطوير مهمة. |
| 80 | لو حذفت دكتور له مواعيد ماذا يحدث؟ | حاليًا يتم حذف Doctor فقط ولا يوجد cascade delete؛ المواعيد قد تبقى بمراجع غير صالحة. الأفضل منع الحذف أو حذف/أرشفة التوابع داخل transaction. | `doctor.controller.ts` في `remove()`. |

---

# رابعًا: الاتصال بقاعدة البيانات وCRUD في الباك إند

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 81 | فين يحدث الاتصال بـ MongoDB؟ | في `server.ts` عبر `mongoose.connect(MONGO_URI)`. | `api/src/server.ts`. |
| 82 | ليه تشغّل app بعد نجاح الاتصال فقط؟ | حتى لا يستقبل API طلبات وهو لا يملك اتصالًا بالداتا. | داخل `.then(async () => app.listen(...))`. |
| 83 | ماذا يحدث لو الاتصال فشل؟ | يدخل `.catch` ويظهر `MongoDB connection error` ولا يبدأ الاستماع للطلبات. | `server.ts`. |
| 84 | عندك ملف `config/database.ts` بيعمل إيه؟ | فيه دالة `connectDatabase` كتنظيم ممكن استخدامه، لكن التشغيل الفعلي الحالي يستخدم `mongoose.connect` مباشرة في `server.ts`. | لا تدّعِ أنه مستخدم إن طلب منك الدليل. |
| 85 | ليه وجود `config/database.ts` مع اتصال في server ملاحظة؟ | هذا تكرار تنظيمي بسيط؛ لو أرتب المشروع أكثر سأنقل الاتصال كله للدالة وأستدعيها من server. | تحسين refactor واضح. |
| 86 | إيه معنى CRUD؟ | Create, Read, Update, Delete. | Controllers للدكتور والمريض. |
| 87 | أين Create doctor؟ | `Doctor.create(req.body)` داخل `doctor.controller.ts`. | route: `POST /api/doctors`. |
| 88 | أين Read doctors؟ | `Doctor.find()` داخل `list()`. | `GET /api/doctors`. |
| 89 | أين Read one doctor؟ | `Doctor.findById(req.params.id)`. | `GET /api/doctors/:id`. |
| 90 | أين Update doctor؟ | `Doctor.findByIdAndUpdate(id, body, { new: true })`. | `PATCH /api/doctors/:id`. |
| 91 | لماذا `{ new: true }`؟ | لكي يرجع document بعد التعديل وليس النسخة القديمة. | doctor/patient update. |
| 92 | أين Delete doctor؟ | `Doctor.findByIdAndDelete`. | `DELETE /api/doctors/:id`. |
| 93 | ماذا لو id غير موجود؟ | controller يرجع HTTP 404 وmessage مناسبة. | get/update/remove doctor والمريض. |
| 94 | لماذا HTTP 201 عند الإنشاء؟ | 201 Created هو status الصحيح لنجاح إنشاء resource جديد. | create Doctor/Patient/Appointment. |
| 95 | لماذا HTTP 200 عند القراءة/التعديل؟ | هو status الافتراضي لطلب ناجح ويرجع data. | `res.json`. |
| 96 | لماذا HTTP 400؟ | للـ request غير الصحيح مثل slot محجوز أو وقت خارج ساعات العمل أو بيانات ناقصة. | appointment controller. |
| 97 | لماذا HTTP 401؟ | عندما لا يوجد token أو token غير صالح في protected routes. | `requireAdmin`. |
| 98 | لماذا HTTP 404؟ | عندما المورد المطلوب مثل Doctor أو Appointment غير موجود. | controllers. |
| 99 | ليه response فيها `success`؟ | توحيد شكل استجابة الواجهة لتعرف نجاح الطلب بسهولة مع data/message. | كل controllers. |
| 100 | هل كل Controllers فيها try/catch؟ | لا، الكود الحالي لا يملك global error middleware أو try/catch شامل. في نسخة production أضيف async error handler. | نقطة تحسين لا تخفيها. |
| 101 | هل كل updates تعمل validation؟ | لا، `findByIdAndUpdate` الحالي لا يحتوي `runValidators: true`. الأفضل إضافتها لكي enums والـ schema constraints تعمل أثناء update. | doctor/patient/updateStatus. |
| 102 | هل API فيها pagination؟ | لا حاليًا؛ `find()` يرجع كل الدكاترة/المواعيد. لو البيانات كبرت أستخدم page, limit, skip, filters. | `list()` controllers. |
| 103 | هل عندك sorting؟ | للمواعيد نعم: list يرتب date تنازليًا ثم time، وtoday يرتب time. | `appointment.controller.ts`. |
| 104 | كيف رجعت بيانات الدكتور والمريض في الموعد؟ | باستعمال populate بعد الاستعلام أو update status. | `list`, `today`, `updateStatus`. |
| 105 | لماذا لم تحفظ اسم المريض داخل Appointment؟ | اعتمدت المرجع لتقليل التكرار؛ populate يجلب الاسم عند العرض. | appointment model. |
| 106 | ما مشكلة لو المريض حجز أكثر من مرة؟ | حاليًا ينشئ Patient جديدًا كل مرة، وهذا مقبول للـ guest booking لكنه يكرر records. تطويرًا: أبحث بالهاتف أو أستخدم patient account. | booking `confirm()`. |
| 107 | هل API المريض public؟ | إنشاء Patient public لأن الحجز public. لكن list/get للمريض public حاليًا أيضًا، والأصح إنتاجيًا حمايتهما للأدمن لحماية الخصوصية. | `patient.routes.ts`. |
| 108 | لماذا `req.body` يحتاج `express.json()`؟ | ليحوّل JSON body القادم إلى object داخل `req.body`. | `app.use(express.json())`. |
| 109 | ماذا يحدث بدون `express.json()`؟ | `req.body` قد يكون undefined للـ JSON requests، فتفشل عمليات الإنشاء/الدخول. | `app.ts`. |
| 110 | ليه CORS موجود؟ | للسماح للواجهة الموجودة على origin مختلف بإرسال API requests في development. | `app.use(cors())`. |

---

# خامسًا: Routes وHTTP وREST

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 111 | إيه Route؟ | تعريف يربط HTTP method وURL بدالة controller. | مثال `router.post("/", create)`. |
| 112 | إيه الفرق بين Route وController؟ | route يحدد الطريق والحماية، controller يحتوي business logic والـ DB calls. | `appointment.routes.ts` وcontroller المقابل. |
| 113 | ليه عامل Router لكل entity؟ | لتنظيم endpoints حسب المسؤولية بدل وضع كل شيء في app.ts. | routes folder. |
| 114 | إيه endpoints الخاصة بالأدمن Auth؟ | `POST /api/auth/login`. | `auth.routes.ts`. |
| 115 | إيه endpoints الخاصة بالدكاترة؟ | GET all, GET one public، ثم POST/PATCH/DELETE محمية للأدمن. | `doctor.routes.ts`. |
| 116 | لماذا GET doctors public؟ | حتى الزائر يرى الدكاترة ويبدأ الحجز دون تسجيل حساب. | `doctor.routes.ts`. |
| 117 | لماذا POST doctor protected؟ | إضافة دكتور عملية إدارية لا يجب أن ينفذها زائر. | `requireAdmin` قبل controller. |
| 118 | ما endpoints الخاصة بالمواعيد؟ | list وtoday للأدمن، available-slots وcreate public، update status/delete للأدمن. | `appointment.routes.ts`. |
| 119 | لماذا available slots GET؟ | لأنه يقرأ بيانات محسوبة بدون تغيير state، لذلك GET مناسب. | `/available-slots?doctorId=&date=`. |
| 120 | لماذا create appointment POST؟ | لأنه ينشئ resource جديدًا ويغير data. | `POST /api/appointments`. |
| 121 | لماذا update status PATCH لا PUT؟ | PATCH مناسب لتعديل جزء من resource وهو status فقط، بينما PUT يستبدل resource كاملًا غالبًا. | `PATCH /:id/status`. |
| 122 | لماذا delete يستخدم DELETE؟ | لأنه semantic HTTP method لحذف resource. | doctor/patient/appointment routes. |
| 123 | إيه `req.params.id`؟ | الجزء الديناميكي في URL مثل `/doctors/:id`. | get/update/delete. |
| 124 | إيه `req.query`؟ | data في query string مثل doctorId وdate في available-slots. | `availableSlots`. |
| 125 | إيه `req.body`؟ | البيانات المرسلة في request body، مثل email/password أو appointment data. | login/create methods. |
| 126 | لماذا ترتيب routes مهم؟ | route ثابت مثل `/today` أو `/available-slots` يجب أن يسبق `/:id` حتى لا يفسره Express كـ id. | `appointment.routes.ts`. |
| 127 | هل لديك versioning مثل `/api/v1`؟ | لا، استخدمت `/api` فقط لأن المشروع صغير. للإصدارات مستقبلاً أستخدم `/api/v1`. | `app.ts`. |
| 128 | هل response موحد؟ | غالبًا نعم: `success` مع `data` في النجاح و`message` عند الخطأ. | controllers. |
| 129 | هل API REST كاملة 100%؟ | هي REST-like ومناسبة للمشروع؛ بعض business endpoints مثل `today` و`available-slots` عمليات domain مخصصة. | endpoint design. |
| 130 | كيف تختبر endpoints دون frontend؟ | Postman أو curl: health ثم login ثم Bearer token للـ protected endpoints. | README وroutes. |

---

# سادسًا: Authentication وAuthorization وJWT

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 131 | إيه الفرق بين Authentication وAuthorization؟ | Authentication يثبت من أنت عبر login؛ Authorization يحدد هل مسموح لك تعمل العملية، مثل إضافة دكتور للأدمن فقط. | login و`requireAdmin`. |
| 132 | إزاي الأدمن يسجل دخول؟ | يرسل email/password إلى `/api/auth/login`، والسيرفر يقارن الباسورد ويعيد JWT. | `auth.controller.ts`. |
| 133 | إيه الخطوات داخل `login()`؟ | يتحقق من الحقول، يبحث بالإيميل، يقارن hash، يوقع token، ويرجع token وبيانات admin غير الحساسة. | `auth.controller.ts`. |
| 134 | لماذا لا ترجع password في response؟ | لأنها بيانات حساسة ولا حاجة للواجهة بها. | response يعيد name/email فقط. |
| 135 | إيه JWT؟ | token موقع يحتوي claims؛ هنا يحتوي adminId ويثبت أن المستخدم تم تسجيل دخوله. | `jwt.sign({ adminId })`. |
| 136 | ماذا يوجد داخل token؟ | payload فيه `adminId`، والتوقيع يعتمد JWT secret، وصلاحيته 7 أيام. | auth controller. |
| 137 | هل JWT مشفر؟ | لا، payload قابل للقراءة عادة؛ الحماية في التوقيع الذي يمنع التعديل دون secret. لا أضع password فيه. | إجابة مفاهيمية مهمة. |
| 138 | ليه token لها expiration؟ | لتقليل أثر تسريب token وعدم إبقاء جلسة صالحة للأبد. | `expiresIn: "7d"`. |
| 139 | أين يتم تخزين token في الواجهة؟ | `localStorage` تحت المفتاح `admin_token`. | `admin-login.component.ts`. |
| 140 | هل localStorage أفضل اختيار دائمًا؟ | مناسب وبسيط للمشروع التعليمي، لكن production قد تفضل HttpOnly secure cookies لتقليل XSS token theft. | إجابة نقدية قوية. |
| 141 | إزاي تبعت token؟ | في header: `Authorization: Bearer <token>`. | `ApiService` methods المحمية. |
| 142 | إيه `requireAdmin`؟ | middleware يقرأ bearer token ويتحقق منه قبل الوصول للـ controller. | `api/src/middleware/auth.ts`. |
| 143 | إيه middleware؟ | دالة تعمل بين request ووصوله للـ route controller؛ تستعمل للحماية أو logging أو validation. | `requireAdmin`. |
| 144 | إزاي middleware يقرأ token؟ | يأخذ `req.headers.authorization` ويتأكد أنها تبدأ بـ `Bearer ` ثم يستخرج الباقي. | `header.startsWith("Bearer ")`. |
| 145 | ماذا لو header غير موجود؟ | يرجع 401 برسالة `Missing token`. | `requireAdmin`. |
| 146 | ماذا لو token غلط أو منتهية؟ | `jwt.verify` يرمي error، وmiddleware يرجع 401 `Invalid token`. | catch في `requireAdmin`. |
| 147 | ليه كتبت `AuthRequest`؟ | لتوسيع Express Request وإضافة `adminId` بشكل typed بعد التحقق. | `auth.ts`. |
| 148 | هل controller يستخدم `req.adminId` حاليًا؟ | لا في النسخة الحالية، لكنه مجهز لتسجيل صاحب العملية أو role checks لاحقًا. | `AuthRequest`. |
| 149 | هل كل dashboard API محمية؟ | today وlist appointments وupdate status/delete محمية بالـ middleware. | appointment routes. |
| 150 | هل Angular guard بديل لحماية الباك إند؟ | لا؛ guard يمنع التنقل في الواجهة فقط، أما الحماية الحقيقية للبيانات تكون في API middleware. | `admin.guard.ts` و`requireAdmin`. |
| 151 | كيف يعمل Angular guard؟ | يفحص token في localStorage، إن لم يجدها يرجع UrlTree إلى `/admin`. | `adminGuard`. |
| 152 | هل guard يتحقق من صلاحية JWT أو expiry؟ | لا، يفحص وجود token فقط. API هو الذي يرفض المنتهية. تطويرًا أفك token أو أتحقق من server. | إجابة صادقة. |
| 153 | لماذا يوجد check آخر داخل Dashboard constructor؟ | طبقة حماية UX إضافية؛ guard هو الأساس في routing. | `dashboard.component.ts`. |
| 154 | كيف يعمل logout؟ | يمسح `admin_token` و`admin_name` من localStorage ثم يوجه إلى `/admin`. | `logout()`. |
| 155 | هل logout يبطل JWT على server؟ | لا، هو client logout فقط. للإبطال الحقيقي أستخدم token blacklist/short-lived tokens/refresh flow. | تحسين production. |
| 156 | لماذا password مشفرة قبل seed admin؟ | لأن `pre("save")` hook يشتغل عند `Admin.create` ويعمل bcrypt hash. | `seedAdmin()` وadmin model. |
| 157 | متى ينشأ default admin؟ | عند نجاح اتصال MongoDB وقبل بداية الاستماع للطلبات. | `seedAdmin()` في `server.ts`. |
| 158 | لماذا default admin خطر في production؟ | لأن credentials المعروفة لا تصلح للإنتاج؛ أستخدم env أو setup flow وأغيّر الباسورد. | إجابة مهمة. |
| 159 | أين JWT secret؟ | من `process.env.JWT_SECRET` مع fallback تعليمي موجود. | auth controller وmiddleware. |
| 160 | لماذا fallback secret ليس مناسبًا production؟ | لأنه معروف في الكود، لذلك في deployment أفرض secret قويًا في environment ولا أضع fallback. | تحسين أمني. |

---

# سابعًا: منطق الحجز والـ Availability

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 161 | اشرح منطق جدول الدكتور. | لكل طبيب days وstart وend وduration؛ منها تتولد slots لكل يوم عمل. | `IDoctorSchedule`. |
| 162 | كيف تمثل أيام العمل؟ | array أرقام من 0 إلى 6 مطابق لـ JavaScript `Date.getDay()`. | doctor model. |
| 163 | ماذا يعني `[0,1,2,3,4]`؟ | Sunday إلى Thursday؛ الجمعة والسبت غير متاحين افتراضيًا. | defaultSchedule. |
| 164 | لماذا لم تخزن أسماء الأيام كنص؟ | الأرقام أسهل في المقارنة مباشرة مع `getDay()` وأقل عرضة لاختلاف spelling/locale. | `isWorkingDay` وavailableSlots. |
| 165 | إيه وظيفة `toMinutes()`؟ | تحول وقت مثل `09:30` إلى 570 دقيقة لتسهيل المقارنة والحساب. | بداية appointment controller. |
| 166 | ليه تحول لدقائق بدل مقارنة strings؟ | المقارنة العددية أوضح وأضمن عند الحساب وإضافة مدة الزيارة. | `toMinutes`. |
| 167 | إيه وظيفة `generateSlots()`؟ | تبدأ من start وتضيف duration كل مرة حتى لا تتجاوز end، ثم ترجع قائمة أوقات. | appointment controller. |
| 168 | مثال: 09:00–17:00 و30 دقيقة، كم slot؟ | 16 slot: من 09:00 حتى 16:30؛ لا تبدأ 17:00 لأنه لا توجد مدة زيارة بعدها. | شرط `t + duration <= endMin`. |
| 169 | ليه الشرط `t + duration <= endMin`؟ | يمنع slot تبدأ قبل النهاية لكنها تنتهي بعدها. | `generateSlots`. |
| 170 | كيف تعرض الساعة بصيغة 12-hour؟ | تحدد AM/PM ثم تحول الساعة باستخدام remainder 12 وتضيف zero padding. | lines داخل `generateSlots`. |
| 171 | إيه endpoint السلات؟ | `GET /api/appointments/available-slots?doctorId=...&date=YYYY-MM-DD`. | appointment routes. |
| 172 | لماذا يحتاج doctorId وdate؟ | لأن المتاح يختلف باختلاف الطبيب وباختلاف يوم الأسبوع والحجوزات لهذا التاريخ. | `availableSlots`. |
| 173 | ماذا لو doctorId أو date ناقص؟ | يرجع 400 برسالة أنهما required. | `availableSlots`. |
| 174 | لماذا تتحقق من doctorId بالـ regex؟ | لمنع تمرير قيمة ليست Mongo ObjectId قبل `findById` ومنع CastError. | regex 24 hex chars. |
| 175 | ماذا لو doctor غير موجود؟ | 404 Doctor not found. | availableSlots. |
| 176 | ماذا لو doctor inactive أو on-leave؟ | 400 Doctor is not available ولا تظهر له slots. | check `status !== "active"`. |
| 177 | ماذا لو اختار المريض يوم ليس من أيام عمل الطبيب؟ | response ناجح لكن slots فارغة؛ الواجهة تظهر أنه لا يعمل ذلك اليوم. | schedule days check. |
| 178 | كيف تستبعد السلات المحجوزة؟ | أقرأ appointments للدكتور في ذلك اليوم وحالتها ليست cancelled، ثم أعمل filter من slots المولدة. | `bookedTimes` و`available`. |
| 179 | لماذا cancelled لا تمنع slot؟ | لأن الموعد الملغي لم يعد يحجز وقت الطبيب ويمكن إعادة حجزه. | `{ status: { $ne: "cancelled" } }`. |
| 180 | ما الفرق بين availableSlots وcreate appointment؟ | الأول يعرض اقتراحات؛ الثاني يعيد التحقق ويحفظ، لأن الواجهة لا تُعتبر مصدر ثقة. | كلا الدالتين في controller. |
| 181 | لماذا تعيد التحقق في create بعد أن عرضت slots؟ | لأن مستخدمًا آخر قد يحجز نفس slot بين العرض والضغط على confirm، أو لأن client يمكنه إرسال request يدوي. | `create()`. |
| 182 | ما checks داخل create؟ | doctor موجود، active، اليوم ضمن schedule، الوقت داخل الساعات، والslot غير محجوز. | `appointment.controller.ts`. |
| 183 | كيف تتحقق من وقت العمل؟ | تحول time/start/end إلى دقائق وتتحقق أن البداية ليست قبل start وأن time + duration لا تتجاوز end. | `timeMin`, `startMin`, `endMin`. |
| 184 | هل إنشاء appointment يتحقق أن الوقت يقع تمامًا على slot step؟ | لا بالكامل؛ يتحقق أنه داخل الحدود لكنه لا يتحقق أن time موافق لتوليد `generateSlots`. تحسينًا أتحقق من `generateSlots(...).includes(time)`. | ملاحظة متقدمة وصادقة. |
| 185 | كيف تمنع double booking؟ | `countDocuments` لنفس doctor/date/time بحالة غير cancelled؛ إن كان العدد أكبر من صفر أرجع 400. | create appointment. |
| 186 | هل check ثم create آمن تمامًا لو وصل طلبان في نفس اللحظة؟ | ليس atomic تمامًا؛ يوجد race condition. الحل الأفضل compound unique index `(doctor,date,time)` والتعامل مع duplicate key error أو transaction. | نقطة production مهمة. |
| 187 | لماذا لم تعتمد فقط على `maxSlotsPerDay`؟ | لأن المشروع يحتاج ساعات حقيقية؛ schedule + duration يحدد كل وقت، وmaxSlotsPerDay وحده لا يمنع تعارض الساعة. | Doctor model مقابل booking logic. |
| 188 | كيف تحسب مواعيد اليوم في dashboard؟ | أعمل range من بداية اليوم UTC إلى نهايته ثم أرجع appointments والـ counts. | `today()`. |
| 189 | ماذا يعيد endpoint today؟ | appointments populated، total، وnewPatients based on visitType new. | `res.json({ data: { appointments,total,newPatients }})`. |
| 190 | هل total يستبعد cancelled؟ | لا حاليًا، فهو يعد كل مواعيد اليوم بما فيها canceled. إن المطلوب "active total" أضيف status filter. | يجب أن تقول ذلك بصراحة. |
| 191 | هل newPatients يعني عدد مرضى unique؟ | لا، حاليًا هو عدد appointments من type new وليس distinct patients. | `countDocuments({visitType:"new"})`. |
| 192 | ليه موضوع timezone مهم؟ | لأن date والتوقيت العالمي/المحلي قد يغيران اليوم عند منتصف الليل؛ لذلك التطبيق يستخدم ranges على تاريخ اليوم. في production أوحّد timezone أو أخزن datetime واضحًا. | `today()` وcomments. |
| 193 | هل يسمح الباك إند بحجز تاريخ في الماضي؟ | الواجهة تمنع ذلك بـ minDate، لكن controller لا يفحص past date حاليًا؛ تحسين لازم للـ API. | `minDate()` في frontend فقط. |
| 194 | لماذا لا يمكن الاعتماد على minDate وحدها؟ | يمكن تجاوزها بطلب API مباشر، ولذلك server validation يجب أن يضيف check للتاريخ. | security principle. |
| 195 | كيف يتعامل الحجز مع أسباب متعددة؟ | يبني `reasons` array من checkboxes ثم يرسلها في appointment request. | `booking.component.ts` في `confirm()`. |
| 196 | هل اختيار follow up يغير visitType تلقائيًا؟ | لا؛ visitType حقل منفصل new/returning، وreason array مستقلة. | booking component. |
| 197 | لماذا تنشئ patient ثم appointment بطلبين؟ | لأن Patient resource مستقل وله ObjectId، ثم Appointment يحتاج patientId كمرجع. | `confirm()`. |
| 198 | ما مشكلة الطلبين المتتاليين؟ | لو إنشاء المريض نجح وإنشاء الموعد فشل قد يبقى Patient بدون appointment؛ في نسخة أقوى أستخدم endpoint واحد/transaction أو cleanup. | تحسين متقدم. |
| 199 | هل يمكن للمريض إلغاء موعده؟ | لا من الواجهة الحالية؛ الأدمن يغير الحالة أو يحذف. يمكن إضافة public cancellation مع token/OTP. | dashboard status actions. |
| 200 | لماذا حالتا `inactive` و`on-leave` مع أن booking يعاملهما نفس الشيء؟ | للمعنى الإداري: inactive قد يكون غير مفعل، وon-leave إجازة مؤقتة؛ لاحقًا أعرض رسائل/تاريخ إجازة مختلف. | doctor status enum. |

---

# ثامنًا: Angular، Routing، Services، Types

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 201 | إيه Angular في مشروعك؟ | framework للـ SPA مسؤولة عن components وrouting وforms وHTTP. | `frontend/src/app`. |
| 202 | هل components standalone؟ | نعم، كل component يحدد imports الخاصة به داخل decorator. | `imports: [CommonModule, FormsModule]`. |
| 203 | ليه standalone بدل NgModule؟ | هو الأسلوب الحديث الأبسط؛ يقلل boilerplate ويجعل dependencies واضحة لكل component. | كل component. |
| 204 | إيه Component؟ | جزء مستقل من الواجهة له TypeScript state وHTML template وCSS. | Doctors/Booking/Login/Dashboard. |
| 205 | إيه AppComponent؟ | root component؛ فيه navbar وfooter و`router-outlet` لمكان عرض الصفحات. | `app.component.ts`. |
| 206 | ما وظيفة `router-outlet`؟ | Angular يعرض داخله component المناسب للـ URL الحالي. | AppComponent template. |
| 207 | إيه routes الموجودة؟ | `/doctors`, `/booking/:doctorId`, `/admin`, `/dashboard` مع redirects. | `app.routes.ts`. |
| 208 | لماذا `/booking/:doctorId`؟ | حتى أعرف أي دكتور اختاره المستخدم من URL وأحمل بياناته. | booking ngOnInit. |
| 209 | كيف تقرأ doctorId؟ | `ActivatedRoute.snapshot.paramMap.get("doctorId")`. | booking component. |
| 210 | ماذا يحدث في route فاضية؟ | redirect إلى `/doctors`. | `path: ""`. |
| 211 | ماذا يحدث في route غير موجودة؟ | wildcard `**` يعيد للمسار `/doctors`. | routes. |
| 212 | ما الفرق بين RouterLink وRouter.navigate؟ | RouterLink directive في HTML للروابط؛ navigate method في TypeScript للتنقل البرمجي. | navbar مقابل `bookDoctor()`. |
| 213 | ما وظيفة `app.config.ts`؟ | يحقن global providers مثل router وHttpClient وتغيير zone behavior. | `appConfig`. |
| 214 | لماذا تستخدم `provideHttpClient()`؟ | لجعل `HttpClient` قابلًا للحقن داخل ApiService لتنفيذ API requests. | app config. |
| 215 | لماذا تستخدم `provideRouter(routes)`؟ | لتفعيل Angular Router وتسجيل تعريفات routes. | app config. |
| 216 | إيه `provideZoneChangeDetection({ eventCoalescing: true })`؟ | إعداد لتحسين تجميع أحداث change detection؛ ليس جوهر المنطق لكنه optimization من Angular. | app config. |
| 217 | إيه `ApiService`؟ | service مركزية تجمع كل HTTP calls بدل كتابة HttpClient داخل كل component. | `api.service.ts`. |
| 218 | لماذا `@Injectable({providedIn:"root"})`؟ | يجعل Angular ينشئ instance مشتركة singleton متاحة للتطبيق دون إضافتها يدويًا في providers. | ApiService. |
| 219 | ما فائدة Types في `types.ts`؟ | توحّد شكل Doctor/Patient/Appointment/response بين components وservice وتقلل أخطاء الخصائص. | `frontend/src/app/types.ts`. |
| 220 | هل Typescript interface هي database schema؟ | لا؛ interface للـ compile-time في frontend، وMongoose schema هي validation/runtime structure في backend. | `types.ts` مقابل models. |
| 221 | لماذا `Doctor` frontend يحتوي `_id` string؟ | MongoDB يرسل ObjectId كـ string في JSON، والواجهة تستخدمه في routes وAPI calls. | `types.ts`. |
| 222 | لماذا Appointment frontend يحتوي patient وdoctor objects؟ | لأن API عمل populate فيرجع بياناتهما بدل ids فقط عند dashboard. | Appointment interface وcontroller. |
| 223 | ما هي Observable؟ | نوع من RxJS يمثل بيانات تصل async مثل HTTP response؛ أعمل subscribe لاستقبال next/error. | ApiService/components. |
| 224 | لماذا HttpClient يرجع Observable؟ | لأنه asynchronous؛ response تصل لاحقًا من الشبكة. | `getDoctors()` وغيره. |
| 225 | ماذا يعني `subscribe({next,error})`؟ | next عند نجاح response، error عند failure؛ أغير loading أو أعرض message بناء عليه. | كل components. |
| 226 | هل تحتاج unsubscribe من HttpClient requests هنا؟ | HTTP Observable تكمل بعد response ثم تنتهي غالبًا، لذلك لا تحتاج unsubscribe يدويًا لهذه الطلبات القصيرة؛ streams طويلة تحتاجه. | إجابة مفاهيمية. |
| 227 | لماذا `BASE = "/api"`؟ | مركز endpoint prefix مرة واحدة وإتاحته للـ proxy بدل تكرار URL. | ApiService. |
| 228 | كيف تبعث query params في Angular؟ | في get أستخدم `{ params: { doctorId, date } }`. | `getAvailableSlots`. |
| 229 | كيف تضيف Authorization header؟ | `headers: { Authorization: \`Bearer ${localStorage...}\` }`. | protected methods in ApiService. |
| 230 | هل الأفضل كتابة header في كل method؟ | يعمل، لكن أنظف في مشروع أكبر استخدام HttpInterceptor يضيف token تلقائيًا. | تحسين architecture. |

---

# تاسعًا: صفحة الدكاترة والحجز بالتفصيل

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 231 | ماذا يحدث عندما تفتح صفحة Doctors؟ | `ngOnInit` يستدعي `loadDoctors` ثم service ترسل GET إلى API وتملأ array. | `doctors.component.ts`. |
| 232 | لماذا تستخدم `ngOnInit`؟ | هو lifecycle hook مناسب لتنفيذ التحميل الأولي بعد إنشاء component. | Doctors وDashboard وBooking. |
| 233 | كيف بنيت قائمة specialties؟ | أخذت specialty من كل doctor ثم استخدمت `Set` لإزالة التكرار ثم `Array.from`. | `loadDoctors()`. |
| 234 | لماذا Set؟ | لأنه يمنع التكرارات مثل Cardiologist التي قد تتكرر مع أكثر من دكتور. | doctors component. |
| 235 | كيف يعمل filter؟ | getter `filtered` يعيد كل doctors إذا لا يوجد اختيار، وإلا `filter` يطابق specialty. | `get filtered()`. |
| 236 | لماذا getter بدل method عادية؟ | template يمكنه قراءة قيمة محسوبة بوضوح؛ في مشروع كبير أحرص ألا تكون العملية ثقيلة عند كل change detection. | Doctors component. |
| 237 | كيف تنتقل من Book Now للحجز؟ | `router.navigate(["/booking", id])`. | `bookDoctor()`. |
| 238 | لماذا initials؟ | fallback بسيط إذا لم توجد صورة doctor؛ يأخذ أول حرف من أول كلمتين. | `initials(name)`. |
| 239 | ما الذي يحدث عند دخول Booking؟ | أقرأ doctorId ثم أحمل قائمة doctors وأجد selected doctor. | `BookingComponent.ngOnInit`. |
| 240 | لماذا لا تستخدم endpoint `GET /doctors/:id`؟ | الحالي يحمل القائمة ثم يبحث داخلها؛ يعمل للمشروع الصغير. تحسينًا أضيف ApiService `getDoctor(id)` لاستدعاء endpoint الموجود فعلًا. | endpoint موجود backend لكن غير مستخدم frontend. |
| 241 | ما state في Booking؟ | doctor، step، بيانات المريض، date/time، timeSlots، loading/message/done. | properties في component. |
| 242 | لماذا `doctor: Doctor | null`؟ | في البداية البيانات لم تصل async، وقد يفشل id؛ union يجبرني أتعامل مع null بأمان. | booking component. |
| 243 | لماذا `this.doctor!._id` في confirm؟ | non-null assertion لأن confirm لا يصل إليه المستخدم إلا بعد تحميل واختيار doctor؛ لكن يمكن إضافة guard إضافي لأمان أكثر. | `confirm()`. |
| 244 | كيف تحدد أن التاريخ يوم عمل؟ | أحول `dateStr` إلى Date، آخذ `getDay()`, ثم أتحقق أن الرقم موجود في `doctor.schedule.days`. | `isWorkingDay()`. |
| 245 | ماذا يحدث عند تغيير التاريخ؟ | يمسح الوقت القديم والـ slots، يتأكد من يوم العمل، ثم يطلب available slots من API. | `onDateChange()`. |
| 246 | لماذا تمسح time القديم؟ | لأن slot المختار في تاريخ سابق لا يصلح تلقائيًا في تاريخ جديد. | أول `onDateChange`. |
| 247 | لماذا تتحقق من يوم العمل في الواجهة إذا API يتحقق أيضًا؟ | لرسالة فورية للمستخدم وتقليل request غير ضروري، لكن server check لا يزال إلزاميًا. | `isWorkingDay` وcontroller. |
| 248 | ما وظيفة `minDate()`؟ | يرجع تاريخ اليوم بصيغة `YYYY-MM-DD` لربطه بـ input date ومنع اختيار تاريخ ماضٍ في UI. | booking component. |
| 249 | هل minDate حماية كاملة؟ | لا؛ حماية واجهة فقط، والتحقق على API من past dates يجب إضافته. | سؤال فخ مهم. |
| 250 | كيف يتحقق `nextStep()`؟ | يتحقق من الاسم والهاتف ثم من date وtime قبل الانتقال إلى step 2. | `nextStep()`. |
| 251 | لماذا multi-step form؟ | يقسم العملية لتكون أوضح: بيانات المريض/الاختيار ثم مراجعة وتأكيد، بدل form مزدحم. | booking template. |
| 252 | ماذا يحصل في `confirm()`؟ | يجمع reasons، ينشئ patient، ثم عند النجاح ينشئ appointment بالـ patientId. | Booking component. |
| 253 | ماذا لو create patient يفشل؟ | يضع message مناسبة ولا يرسل appointment request. | error handler الأول. |
| 254 | ماذا لو appointment يفشل بعد إنشاء patient؟ | يظهر error للحجز؛ يبقى patient record حاليًا كما شرحت في نقطة التحسين. | nested subscribe flow. |
| 255 | هل تستخدم Reactive Forms؟ | لا، استخدمت Template-driven forms بـ `FormsModule` و`ngModel` لأنها أبسط لحجم النموذج؛ Reactive Forms أفضل إن كبر النموذج أو احتجت validators مركبة. | component imports/templates. |
| 256 | أين تستورد FormsModule؟ | داخل standalone components التي تحتوي forms: Booking وAdmin Login وDashboard وDoctors filter. | decorators. |
| 257 | ما هي `loadingSlots`؟ | state لعرض حالة انتظار عند طلب السلات ومنع user من الاعتقاد أن الصفحة علقت. | Booking. |
| 258 | ما هي `done`؟ | flag تتحول true بعد نجاح الحجز لعرض صفحة/رسالة success بدل form. | Booking. |
| 259 | لماذا country code options ثابتة؟ | لتبسيط UI؛ list ثابتة في `COUNTRY_CODES`. في مشروع أكبر أحملها أو أستخدم phone validation library. | booking component. |
| 260 | هل frontend تخفي inactive doctors؟ | backend list الحالي يرجع كل doctors؛ الحجز نفسه يرفض غير active. تحسينًا أفلتر public list إلى active أو أضيف query filter. | نقطة صريحة. |

---

# عاشرًا: Dashboard وإدارة الدكتور والموعد

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 261 | ماذا يعرض Dashboard؟ | إحصائيات مواعيد اليوم وجدول المواعيد، وتبويب لإدارة الدكاترة والجداول. | dashboard component/template. |
| 262 | كيف تحمل Dashboard data؟ | في `ngOnInit` تستدعي `loadData` التي تطلب `GET /api/appointments/today`. | dashboard component. |
| 263 | ما البيانات التي تحفظها Dashboard؟ | appointments، total، newPatients، loading، doctors، tab، add/edit form states. | properties. |
| 264 | كيف تغيّر status موعد؟ | `setStatus(id,status)` يرسل PATCH ثم عند النجاح يعيد `loadData`. | dashboard component وApiService. |
| 265 | لماذا reload بعد update status؟ | لضمان أن الواجهة تعرض القيم الفعلية من database بدل تعديل state يدويًا قد ينسى counters. | `next: () => this.loadData()`. |
| 266 | كيف تستخدم tabs؟ | property اسمها `tab` نوعها union: appointments أو doctors؛ `switchTab` تغيرها وتحمل doctors عند الحاجة. | dashboard. |
| 267 | لماذا union type للـ tab؟ | يمنع كتابة قيم عشوائية ويعطي TypeScript type safety. | `tab: "appointments" | "doctors"`. |
| 268 | لماذا لا تحمّل doctors من أول فتح dashboard؟ | lazy loading بسيط: `loadDoctors()` فقط عند فتح doctors tab والمصفوفة فارغة. | switchTab. |
| 269 | ماذا يفعل Add Doctor؟ | يفتح form، يصفّر الحقول ويضع schedule افتراضيًا ثم createDoctor يرسل POST محمي. | `openAdd()` و`saveDoctor()`. |
| 270 | ما fields إضافة دكتور؟ | name، specialty، phone، bio، image، days، start/end، duration. | saveDoctor payload. |
| 271 | كيف تحول checkbox days إلى أرقام؟ | `map((v,i)=> v ? i : -1).filter(i=>i>=0)`. | saveDoctor/saveSchedule. |
| 272 | لماذا checkbox array boolean؟ | تناسب UI؛ كل index يمثل يومًا، ثم تتحول للـ numeric array التي يخزنها backend. | `addDays` و`editDays`. |
| 273 | ما validation قبل إضافة doctor؟ | name وspecialty وphone، يوم واحد على الأقل، وstart أقل من end. | `saveDoctor()`. |
| 274 | هل validation للـ duration موجود؟ | الـ UI يقدم قيم محددة، لكن backend لا يتحقق من القيم يدويًا حاليًا؛ في production أضيف validation schema. | إجابة صادقة. |
| 275 | كيف تعدل schedule دكتور؟ | `openEdit` يحول days numbers إلى booleans ويملأ inputs، ثم `saveSchedule` يرسل PATCH مع `{ schedule }`. | methods. |
| 276 | لماذا لا تعدل كل بيانات الطبيب في Edit Schedule؟ | الواجهة الحالية خصصت هذا التحرير للجدول فقط لتبقى بسيطة؛ endpoint update يسمح بتعديل fields الأخرى ويمكن إضافة form لها. | doctor PATCH. |
| 277 | ماذا يعمل Delete Doctor؟ | يعرض native confirm ثم يرسل DELETE محمي ويعيد تحميل القائمة. | `deleteDoctor()`. |
| 278 | هل browser `confirm` أفضل UX؟ | مناسب وبسيط للمشروع؛ production أفضل modal Angular واضح وقابل للتنسيق. | dashboard. |
| 279 | لماذا صورة الطبيب URL وليس upload؟ | لتقليل تعقيد المشروع؛ upload يحتاج storage وmultipart validation. يمكن إضافته Cloudinary/S3 لاحقًا. | `addImage`. |
| 280 | هل تتحقق من صلاحية image URL؟ | لا حاليًا؛ هي field نصية اختيارية. تحسينًا أتحقق من URL وأضيف fallback image. | doctor model/dashboard. |
| 281 | كيف تعرض أيام الطبيب باختصار؟ | `dayList()` يحول أرقام days إلى أول 3 حروف من DAY_NAMES ويجمعها. | dashboard component. |
| 282 | كيف تختار CSS class للـ status؟ | getter `statusClass` يرجع `badge-confirmed` أو `badge-cancelled` أو `badge-pending`. | dashboard component/CSS. |
| 283 | لماذا لا تغيّر UI قبل نجاح API؟ | اعتمدت reload بعد success لتفادي optimistic update غير الصحيح إذا فشل server. | setStatus. |
| 284 | أين admin name؟ | يُخزّن عند login في localStorage ويقرأ في dashboard مع fallback `Admin`. | login/dashboard. |
| 285 | ماذا يحصل لو user فتح dashboard مباشرة بلا login؟ | adminGuard يعيد `/admin` ويوجد check إضافي في constructor. | routes + dashboard. |
| 286 | هل Dashboard يعرض كل المواعيد؟ | الواجهة الرئيسية تعتمد `/today` وتعرض مواعيد اليوم فقط؛ endpoint list موجود للأدمن لو أردت شاشة تاريخ كامل. | appointment routes/controller. |
| 287 | هل الأدمن يستطيع إضافة Doctor inactive؟ | create form لا يرسل status، فيستخدم backend default وهو active. يمكن إضافة status select لاحقًا. | doctor model default. |
| 288 | كيف تمنع أن تكون end قبل start؟ | مقارنة نصوص `HH:MM` تعمل لأن الصيغة zero-padded؛ لو تغير format أستخدم minutes conversion للوضوح. | `saveDoctor`, `saveSchedule`. |
| 289 | هل يمكن للأدمن تحديد break time؟ | ليس في data model الحالي؛ schedule متصل من start إلى end. لإضافة breaks أستخدم intervals متعددة أو unavailable slots. | تطوير واقعي. |
| 290 | هل يمكن تحديد schedule مختلف لكل يوم؟ | ليس حاليًا؛ كل days تشترك في نفس start/end/duration. لتطويرها أجعل schedule array لكل يوم/interval. | تطوير واقعـي. |

---

# الحادي عشر: HTML وCSS وتجربة المستخدم

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 291 | أين CSS العامة؟ | في `frontend/src/styles.css`؛ فيها الألوان الأساسية والـ topbar والـ footer وقواعد عامة. | global styles. |
| 292 | أين CSS لكل صفحة؟ | بجانب component: `doctors.component.css`, `booking.component.css`, `admin-login.component.css`, `dashboard.component.css`. | component folders. |
| 293 | لماذا CSS منفصل لكل component؟ | يحافظ على تنظيم الستايل ويقلل تداخل selectors بين الصفحات. | Angular component style URLs. |
| 294 | ما اللون الرئيسي ولماذا؟ | teal طبي طبيعة هادئة ومرتبطة بالصحة، مع درجات للـ states. | styles.css. |
| 295 | كيف صممت responsive layout؟ | باستخدام CSS grid/flex وmedia queries في CSS الصفحات للتعامل مع الشاشات الأصغر. | component CSS. |
| 296 | لماذا تستخدم Cards؟ | لتنظيم معلومات الدكتور والمواعيد في وحدات قابلة للمسح البصري وأسهل على المريض. | doctors/dashboard templates. |
| 297 | كيف تظهر loading؟ | components لديها `loading` أو `loadingSlots` لتعرض حالة انتظار بدل بيانات ناقصة. | Doctors/Booking/Dashboard templates. |
| 298 | لماذا عندك `message` state؟ | لإظهار validation أو API errors للمستخدم بدل الفشل الصامت. | Login وBooking. |
| 299 | هل تستخدم library UI مثل Bootstrap؟ | لا، استخدمت CSS مخصص بسيط حتى يكون التصميم سهل الفهم والشرح. | styles files. |
| 300 | هل يوجد accessibility كامل؟ | الأساسيات موجودة من forms/buttons، لكن يمكن تحسين labels, aria-live للرسائل، focus states وkeyboard navigation. | إجابة تطويرية. |
| 301 | هل الصورة لها fallback؟ | عندما لا توجد image يمكن عرض initials في قائمة الدكاترة؛ وهو fallback مرئي بسيط. | `initials()`. |
| 302 | لماذا لا تستخدم icons package؟ | تجنبت dependency إضافية؛ استخدمت عناصر بسيطة مناسبة لمشروع تدريبي. | App/Dashboard styling. |
| 303 | هل CSS scoped؟ | Angular component styles تُعزل افتراضيًا بأسلوب view encapsulation، أما `styles.css` فهو global. | Angular behavior. |
| 304 | لماذا topbar وfooter في AppComponent؟ | لتظهر في كل routes بدل تكرارها في كل page component. | AppComponent template. |
| 305 | لماذا login page ليست داخل dashboard؟ | لأنها public route منفصلة، وdashboard محمي ويظهر فقط بعد نجاح login. | `app.routes.ts`. |

---

# الثاني عشر: أسئلة Debugging واختبار عملي أمام المحاضر

| # | السؤال المتوقع | إجابة سريعة | لو كمل معاك / فين في الكود؟ |
|---:|---|---|---|
| 306 | الموقع فتح لكن الدكاترة لا تظهر؛ ما أول شيء تفحصه؟ | أتأكد أن API شغالة عبر `/api/health`، ثم MongoDB، ثم network request/proxy. | `app.ts` و`proxy.conf.json`. |
| 307 | ظهر `Loading doctors` دائمًا؛ أين المشكلة غالبًا؟ | API غير شغالة أو proxy غير محمل أو request فشل؛ أفتح browser network/console وterminal API. | `DoctorsComponent.loadDoctors`. |
| 308 | ظهر 401 في dashboard؛ لماذا؟ | token غير موجودة أو انتهت أو header لم تُرسل؛ أعيد login وأفحص Authorization header. | `requireAdmin` وApiService. |
| 309 | ظهر 404 Doctor not found؛ ماذا يعني؟ | doctorId في URL غير صحيح أو الطبيب حُذف من database. | Booking route/get by id. |
| 310 | ظهر `This doctor does not work on this day`؛ هل bug؟ | لا، هذا business rule؛ اختر يومًا من schedule الطبيب أو عدّل جدوله كأدمن. | `isWorkingDay`. |
| 311 | لا تظهر slots رغم أن اليوم صحيح؛ ماذا أفحص؟ | schedule start/end/duration، status الطبيب active، server endpoint، وهل كل slots محجوزة. | availableSlots. |
| 312 | ظهر `This time slot is already booked`؛ ماذا حدث؟ | شخص حجز نفس doctor/date/time قبل confirm أو أرسلت الطلب مرتين؛ أختار slot آخر. | create appointment. |
| 313 | لماذا يمكن slot تظهر ثم تفشل عند confirm؟ | لأن availability تتغير بين الوقتين؛ create يعيد التحقق للحفاظ على البيانات. | availableSlots/create. |
| 314 | login لا يعمل رغم البيانات الصحيحة؛ ماذا أفحص؟ | API، وجود admin في database، JWT secret consistency، والـ request body/email. | auth controller/seedAdmin. |
| 315 | كيف تتأكد أن default admin تم إنشاؤه؟ | أرى console message عند أول run أو أفحص collection admins في MongoDB. | `seedAdmin`. |
| 316 | كيف تشاهد database من terminal؟ | `mongosh` ثم `use care-clinic` ثم مثلًا `db.doctors.find()` أو `db.appointments.find()`. | MongoDB tooling. |
| 317 | لماذا قد لا يبدأ API عندك على Windows؟ | MongoDB service قد لا تكون شغالة أو Node dependencies غير مثبتة؛ أراجع `npm install` وURI. | README. |
| 318 | لماذا قد يظهر CORS error؟ | frontend قد يتصل مباشرة بـ origin مختلف دون proxy أو CORS config؛ أستخدم `/api` proxy في dev أو restrict CORS في server. | `app.use(cors())`. |
| 319 | كيف تختبر protected endpoint من Postman؟ | login أولًا، انسخ token، ضع Authorization type Bearer Token، ثم أرسل request. | auth route/middleware. |
| 320 | لماذا لا تمرر token في public booking؟ | لأن patient flow مصمم كـ guest booking؛ الحماية موجودة فقط للعمليات الإدارية. | routes. |
| 321 | كيف تختبر منع التكرار؟ | أحجز doctor/date/time، ثم أرسل نفس request ثانية؛ الثاني يرجع 400 أو اختفي slot من available list. | appointment create. |
| 322 | كيف تختبر schedule؟ | عدّل days/start/end من dashboard، ثم اختبر endpoint أو booking في يوم عمل وغير يوم عمل. | `saveSchedule`, availableSlots. |
| 323 | ما test cases الأساسية للحجز؟ | doctor غير موجود، inactive، يوم غير متاح، وقت خارج الحدود، slot محجوز، بيانات patient ناقصة، وحجز صحيح. | business rules. |
| 324 | هل اختبرت build؟ | نعم، المطلوب تشغيل `npx ng build` للـ frontend و`npx tsc --noEmit` للـ API قبل التسليم. | scripts/config. |
| 325 | لماذا test build مهم؟ | لأنه يكتشف TypeScript/template errors حتى إن صفحة معينة لم تُفتح في المتصفح. | build process. |

---

# الثالث عشر: أسئلة «ليه عملت كده بدل كده؟»

| # | السؤال المتوقع | إجابة قوية ومختصرة |
|---:|---|---|
| 326 | ليه MongoDB بدل MySQL؟ | المشروع document-oriented والـ schema بسيط ومتغير مثل schedule وreason array؛ Mongoose يربطها بوضوح. SQL كان ممكن أيضًا، لكن MEAN course قائم على MongoDB. |
| 327 | ليه Mongoose بدل MongoDB driver مباشرة؟ | Mongoose يعطيني schemas وdefaults وvalidation وpopulate وtyped models، فينظم المشروع التعليمي. |
| 328 | ليه Express بدل NestJS؟ | Express أبسط ومتوافق مع مستوى الكورس ويظهر MVC وroutes/middlewares بوضوح. |
| 329 | ليه Angular بدل React؟ | لأن المطلوب/المسار التعليمي MEAN يستخدم Angular، واستفدت من Router وHttpClient وforms. |
| 330 | ليه `interface` في models؟ | لأن TypeScript interfaces توضح شكل document وتحقق requirement الكورس. |
| 331 | ليه Model منفصل للمريض بدل بياناته في Appointment؟ | لأن المريض كيان مستقل يمكن أن يكون له أكثر من appointment مستقبلًا وبياناته لا تتكرر داخل كل موعد. |
| 332 | ليه ما عملتش user account للمريض؟ | scope المشروع هو public guest booking لتقليل خطوات المستخدم؛ الحساب وOTP إضافة مستقبلية. |
| 333 | ليه Admin فقط له login؟ | لأن العمليات الحساسة الإدارية تحتاج هوية وصلاحيات؛ المرضى لا يديرون بيانات النظام. |
| 334 | ليه JWT بدل session server-side؟ | JWT بسيط للـ API ويعمل stateless، وتتحقق منه middleware في كل request. |
| 335 | ليه bcryptjs؟ | لتشفير كلمة المرور قبل التخزين ومقارنة hash بأمان؛ `bcryptjs` سهل التشغيل في بيئة Node. |
| 336 | ليه تستخدم `POST /patients` قبل `/appointments`؟ | appointment يحتاج patientId reference؛ أفصل الكيانين بوضوح. ويمكن لاحقًا دمجهما في transaction endpoint. |
| 337 | ليه schedule داخل Doctor مش collection منفصلة؟ | الجدول الحالي صغير ومملوك لطبيب واحد، فـ embedded subdocument أبسط وأسرع للقراءة مع doctor. |
| 338 | ليه days أرقام وليس Date objects؟ | هي recurring weekly weekdays وليست تواريخ محددة؛ الأرقام تمثلها مباشرة. |
| 339 | ليه time String؟ | العرض والـ generated slot يعملان بصورة واضحة؛ بديل أقوى هو DateTime موحّد أو minutes منذ منتصف الليل. |
| 340 | ليه status enum وليس boolean confirmed؟ | enum يسمح بـ pending/confirmed/cancelled ويترك المجال لحالات أخرى مثل completed/no-show. |
| 341 | ليه cancelled slot يصبح متاحًا؟ | لأنه لم يعد يحتاج وقت الطبيب، وهذا سلوك منطقي للحجز. |
| 342 | ليه حميت delete doctor؟ | لأن حذف resource عملية إدارية حساسة لا يجب أن تكون public. |
| 343 | ليه list doctors public؟ | لأن هدف الصفحة الأولى إتاحة اختيار الدكتور للمريض قبل login. |
| 344 | ليه استخدمت Angular guard رغم backend JWT؟ | guard يحسن navigation وUX، وbackend هو طبقة الأمان الحقيقية. الاثنان يكملان بعض. |
| 345 | ليه localStorage رغم مخاطره؟ | اختيار تعليمي بسيط وسهل شرحه؛ في deployment حساس أستخدم HttpOnly cookie وXSS protection. |
| 346 | ليه لم تستخدم interceptor؟ | عدد requests المحمية قليل؛ كتبت headers في service بوضوح. عند زيادة API أستبدله بـ interceptor لتجنب التكرار. |
| 347 | ليه Template-driven forms؟ | عدد الحقول محدود والحالة بسيطة، فـ ngModel أسرع للفهم. Reactive Forms أفضل للـ forms الكبيرة/validators المركبة. |
| 348 | ليه nested subscribe في confirm؟ | لأن إنشاء appointment يتوقف على patientId من الطلب الأول. بديل أنظف RxJS هو `switchMap` أو endpoint واحد atomic. |
| 349 | ليه لم تستخدم state management مثل NgRx؟ | حجم التطبيق صغير وحالة البيانات محلية في components؛ إضافة NgRx ستكون complexity بلا فائدة حاليًا. |
| 350 | ليه لا يوجد real-time updates؟ | ليس requirement؛ dashboard يعيد load بعد update. لو احتجت تحديث حي أستخدم WebSocket/Socket.IO. |

---

# الرابع عشر: أسئلة ناقدة عن نواقص المشروع — لا تنكرها

> لو الممتحن اكتشف نقطة غير مكتملة، لا تقل «موجودة» وهي غير موجودة. قل: «صحيح، النسخة الحالية اختارت scope بسيط، وخطوة التطوير الصحيحة هي …». هذه إجابة احترافية.

| # | السؤال المتوقع | الإجابة الصادقة المقترحة |
|---:|---|---|
| 351 | لماذا لا يوجد validation library مثل Joi/Zod/express-validator؟ | اعتمدت schema required/enum وبعض checks داخل controllers لحجم المشروع. التحسين الصحيح هو validation middleware لكل DTO قبل controller. |
| 352 | لماذا لا يوجد global error handler؟ | controllers ترجع الأخطاء المتوقعة، لكن لإنتاج حقيقي أضيف Express error middleware وasync wrapper لتوحيد handling. |
| 353 | لماذا update status يقبل string؟ | هذا تبسيط، لكن يجب whitelist لـ pending/confirmed/cancelled أو `runValidators:true` لتجنب قيمة غير صحيحة. |
| 354 | لماذا update doctor لا يوجد `runValidators:true`؟ | نقطة تحسين صحيحة؛ أضيف `{ new:true, runValidators:true }` كي validation تعمل على updates. |
| 355 | لماذا لا يوجد compound unique index للحجز؟ | المنع الحالي في controller يكفي للـ demo، لكن في concurrent production أضيف unique index على doctor/date/time وأتعامل مع error 11000. |
| 356 | لماذا يمكن API حجز وقت غير مولد طالما داخل ساعات العمل؟ | الحالي يتحقق من الحدود فقط. تحسين مهم: أتحقق أن `time` موجود في `generateSlots(...)` قبل create. |
| 357 | لماذا backend لا يمنع past dates؟ | الواجهة تمنعها، لكن يجب إضافة backend comparison مع بداية اليوم لأن client قابل للتجاوز. |
| 358 | لماذا public patient GET endpoints مشكلة؟ | بيانات المرضى شخصية؛ يجب حمايتها بـ `requireAdmin` أو إزالة endpoints غير المطلوبة. |
| 359 | لماذا CORS مفتوح `cors()`؟ | مناسب محليًا؛ في production أحدد `origin` من env وأمنع origins غير موثوقة. |
| 360 | لماذا JWT secret fallback داخل code؟ | للتطوير المحلي، لكن production يجب يرفض الإقلاع إذا لم يوجد secret قوي في `.env`. |
| 361 | لماذا admin credentials hardcoded؟ | seed للتجربة فقط؛ production يستخدم setup/secret env وتغيير الباسورد قبل النشر. |
| 362 | لماذا لا يوجد password reset؟ | خارج scope؛ أضيف verified email/OTP/reset token عند تطوير auth. |
| 363 | لماذا لا يوجد roles متعددة؟ | يوجد دور Admin واحد كافي للـ requirement؛ أضيف role field وrole middleware عند وجود receptionist/doctor/admin. |
| 364 | لماذا لا يوجد doctor login؟ | النظام الحالي يجعل الأدمن يدير schedules. لتجعل الطبيب يدير نفسه أضيف DoctorUser credentials وربط role doctor وصلاحية تعديل نفسه فقط. |
| 365 | هل فعليًا «الدكتور» هو من يضع الموعد؟ | في النسخة الحالية **الأدمن** هو من يضيف/يعدّل جدول الطبيب في dashboard؛ الطبيب لا يملك login منفصل. لا تقل غير ذلك. |
| 366 | لماذا `maxSlotsPerDay` غير مستخدم؟ | هو field احتياطي؛ التطوير الصحيح إما استخدامه في create/availableSlots أو حذفه لتفادي dead code. |
| 367 | لماذا لا توجد pagination؟ | البيانات قليلة في demo؛ عند التوسع أضيف `page`, `limit`, filters وindexes. |
| 368 | لماذا لا يوجد search للـ doctor؟ | يوجد filter بالتخصص فقط؛ search by name إضافة UI سهلة مستقبلًا. |
| 369 | لماذا لا توجد notifications؟ | خارج scope؛ أضيف email/SMS/WhatsApp service أو queue عند تأكيد/إلغاء موعد. |
| 370 | لماذا لا توجد file uploads؟ | استخدمت image URL لتقليل storage complexity؛ upload يحتاج multer وcloud storage وvalidation. |
| 371 | لماذا لا توجد audit logs؟ | ليست requirement؛ للعمليات الصحية الحقيقية أسجل من عدّل status ومتى باستخدام adminId/audit collection. |
| 372 | لماذا لا توجد soft delete؟ | delete الحالي hard delete للتبسيط؛ production أفضل `deletedAt` أو status inactive للأطباء. |
| 373 | لماذا حذف Doctor لا يمنع appointments القديمة؟ | يجب قبل الحذف count appointments أو archive doctor؛ هذه نقطة referential integrity تحسين. |
| 374 | لماذا لا توجد MongoDB transactions؟ | العمليات الأساسية بسيطة؛ لكن create patient + appointment مثال مناسب لاستخدام transaction في نسخة أقوى. |
| 375 | لماذا لا يوجد unit tests؟ | الاختبار الحالي end-to-end/manual وbuild checks؛ التحسين أضيف Jest/Supertest للـ API وAngular tests للواجهة. |
| 376 | لماذا لا توجد API docs؟ | README يشرح التشغيل، والتحسين أن أضيف Swagger/OpenAPI لعرض endpoints وrequests. |
| 377 | لماذا لا يوجد rate limiting؟ | خارج scope؛ login/public booking يحتاجان express-rate-limit في production. |
| 378 | لماذا لا توجد sanitation للـ inputs؟ | validation موجود بشكل بسيط، لكن production يحتاج sanitization وsecurity headers مثل helmet. |
| 379 | لماذا لا توجد CSRF protection؟ | JWT في Authorization header يقلل نموذج CSRF التقليدي، لكن إن استخدمت cookies أضيف CSRF measures. |
| 380 | لماذا timezone قد تكون مشكلة؟ | Date UTC/local around midnight يحتاج strategy واضحة؛ أختار clinic timezone وأخزن ISO datetime أو date-only consistent. |

---

# الخامس عشر: «ورّيني فين» — خريطة سريعة للدوال والملفات

| لو قال لك | افتح هذا الملف | وقل له |
|---|---|---|
| ورّيني connection MongoDB | `api/src/server.ts` | هنا أقرأ `MONGO_URI` ثم `mongoose.connect`، وبعد النجاح أبدأ السيرفر. |
| ورّيني Express routes | `api/src/app.ts` | هنا ركبت route groups تحت `/api/auth` و`/api/doctors` و`/api/patients` و`/api/appointments`. |
| ورّيني doctor schema | `api/src/models/doctor.model.ts` | هنا IDoctor وschedule subdocument والـ defaults والـ status enum. |
| ورّيني password hashing | `api/src/models/admin.model.ts` | هنا pre-save hook يعمل bcrypt hash قبل الحفظ وcomparePassword يقارن hash. |
| ورّيني login | `api/src/controllers/auth.controller.ts` | هنا البحث بالإيميل ثم comparePassword ثم jwt.sign. |
| ورّيني JWT protection | `api/src/middleware/auth.ts` | هنا أخذ Bearer token وjwt.verify ثم next أو 401. |
| ورّيني endpoints المحمية | `api/src/routes/doctor.routes.ts` و`appointment.routes.ts` | `requireAdmin` موضوع قبل create/update/delete والعمليات الإدارية. |
| ورّيني CRUD doctor | `api/src/controllers/doctor.controller.ts` | list/get/create/update/remove باستخدام Mongoose methods. |
| ورّيني CRUD patient | `api/src/controllers/patient.controller.ts` | نفس pattern؛ create public للحجز. |
| ورّيني appointment schema | `api/src/models/appointment.model.ts` | روابط doctor/patient وحالة الموعد والتاريخ والوقت. |
| ورّيني slots generation | `api/src/controllers/appointment.controller.ts` | `toMinutes` و`generateSlots`. |
| ورّيني منع duplicate booking | نفس الملف داخل `create()` | `countDocuments` لنفس doctor/date/time وحالة غير cancelled. |
| ورّيني check جدول الطبيب | نفس الملف داخل `availableSlots()` و`create()` | check days ثم start/end/duration. |
| ورّيني dashboard route protection | `frontend/src/app/app.routes.ts` و`admin.guard.ts` | `canActivate: [adminGuard]` ثم redirect إلى `/admin`. |
| ورّيني API calls Angular | `frontend/src/app/api.service.ts` | service موحدة فيها get/create/update/delete مع headers للـ admin. |
| ورّيني login frontend | `frontend/src/app/admin-login/admin-login.component.ts` | يستدعي API ويحفظ token/admin name ثم navigate dashboard. |
| ورّيني booking steps | `frontend/src/app/booking/booking.component.ts` | state `step` و`nextStep` و`prevStep` و`confirm`. |
| ورّيني date/day check | نفس Booking component | `isWorkingDay` و`onDateChange`. |
| ورّيني إضافة Doctor | `frontend/src/app/dashboard/dashboard.component.ts` | `openAdd` و`saveDoctor`. |
| ورّيني تعديل schedule | نفس Dashboard component | `openEdit` و`saveSchedule`. |
| ورّيني filter specialty | `frontend/src/app/doctors/doctors.component.ts` | `specialties` تتبني بـ Set وgetter `filtered`. |
| ورّيني proxy | `frontend/proxy.conf.json` | كل `/api` تتوجه إلى `localhost:4000` في development. |
| ورّيني CSS العام | `frontend/src/styles.css` | الألوان والقواعد المشتركة والـ header/footer. |

---

# السادس عشر: سيناريو مناقشة سريع — تدريب شفهي

> **سؤال:** «امشيني في عملية الحجز.»  
> **جواب جاهز:** «المريض يفتح قائمة الدكاترة ويختار Doctor، فينتقل إلى `/booking/:doctorId`. صفحة الحجز تقرأ id وتحمل جدول الطبيب. عندما يختار تاريخًا، تتحقق الواجهة أنه يوم عمل ثم تستدعي endpoint `available-slots`. الباك إند يولد السلات من start/end/duration ويستبعد الموجودة في appointments. عند التأكيد، الواجهة تنشئ Patient ثم Appointment. الباك إند يعيد التحقق من حالة الطبيب واليوم والوقت وعدم تكرار slot قبل الحفظ.»

> **سؤال:** «إزاي مأمن الداشبورد؟»  
> **جواب جاهز:** «بعد login السيرفر يقارن bcrypt hash ويصدر JWT تحتوي adminId وصلاحيتها 7 أيام. الواجهة تخزن token وترسلها في Authorization Bearer. API middleware `requireAdmin` يعمل verify قبل العمليات الإدارية. Angular guard مجرد حماية واجهة وتحويل لصفحة login؛ الحماية الحقيقية في middleware.»

> **سؤال:** «لو مستخدمين حجزوا نفس الموعد؟»  
> **جواب جاهز:** «قبل create أعمل `countDocuments` لنفس doctor/date/time مع استثناء cancelled. لو موجود أرجع 400. وللـ production concurrency أضيف compound unique index لأن check ثم create وحده يمكن أن يصطدم في طلبين بنفس اللحظة.»

> **سؤال:** «هل الدكتور نفسه يعدّل جدول عمله؟»  
> **جواب جاهز:** «في النسخة الحالية الأدمن هو الذي يعدل جدول الطبيب من تبويب Doctors. التصميم يدعم جدولًا منفصلًا لكل Doctor؛ الخطوة التالية لو نريد doctor portal هي إضافة login/role للطبيب وتقييد update على schedule الخاص به فقط.»

---

# مراجعة ليلة التسليم: أهم 20 نقطة تحفظها

| # | الجملة التي يجب أن تكون قادرًا على قولها |
|---:|---|
| 1 | المشروع MEAN: MongoDB + Express + Angular + Node. |
| 2 | الباك إند منظم Routes → Controllers → Models + Middleware. |
| 3 | `server.ts` يتصل بـ MongoDB ثم يشغل Express على 4000. |
| 4 | MongoDB URI هو `mongodb://localhost:27017/care-clinic` في إعداد التطوير. |
| 5 | Doctor وPatient وAppointment وAdmin هم الكيانات الأساسية. |
| 6 | Appointment يحمل references للطبيب والمريض ويستخدم populate عند القراءة. |
| 7 | passwords لا تخزن plain text؛ bcrypt hash عبر pre-save hook. |
| 8 | login ينتج JWT فيها adminId وصالحة 7 أيام. |
| 9 | middleware `requireAdmin` تحمي API، وAngular guard تحمي navigation فقط. |
| 10 | public flow: Doctors → Booking → Patient create → Appointment create. |
| 11 | schedule = days + start + end + duration لكل طبيب. |
| 12 | `generateSlots` يولد السلات و`availableSlots` يستبعد المحجوز. |
| 13 | create appointment يعيد تحقق schedule والحجز المكرر على server. |
| 14 | status الموعد: pending / confirmed / cancelled. |
| 15 | Dashboard يجلب today appointments ويغير status ويضيف/يحذف doctor ويعدل schedule. |
| 16 | Angular يستخدم standalone components وRouter وHttpClient وtemplate-driven forms. |
| 17 | ApiService هي مكان API calls، وproxy يوجه `/api` إلى الباك إند في development. |
| 18 | frontend 4200 وbackend 4000؛ MongoDB default 27017. |
| 19 | أكبر نقطة تطوير: compound unique index لمنع race condition في double booking. |
| 20 | لا تقل إن الطبيب له login حاليًا؛ الذي يعدل schedule فعليًا هو admin. |

---

## ملاحظة نهائية

هذا البنك يغطي أسئلة التصميم، الملفات، الدوال، الـ API، MongoDB، الحجز، Angular، CSS، التشغيل، والأخطاء والأسئلة النقدية. لو سألك الممتحن عن feature جديدة غير موجودة، استخدم نفس القاعدة: **اشرح scope الحالي بصدق، ثم قدّم تطويرًا منطقيًا يناسب نفس architecture.**
