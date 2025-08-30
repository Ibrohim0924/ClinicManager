🏥 Appointment Management API

Bu loyiha NestJS + TypeORM + PostgreSQL asosida yaratilgan bo‘lib, shifokorlar, bemorlar va uchrashuvlarni boshqarish uchun API taqdim etadi.

✨ Xususiyatlari

🏥 Hospital (Kasalxona) CRUD amallari

👨‍⚕️ Doctor (shifokor) CRUD amallari

🧑‍🤝‍🧑 Patient (bemor) CRUD amallari

📅 Appointment (uchrashuv) yaratish, ko‘rish, yangilash va o‘chirish

🔗 Relationlar (Doctor ↔ Appointments ↔ Patient) (Doctor ↔ Hospital)

❌ Xatoliklar uchun NotFoundException, ConflictException ishlatiladi

🚀 Texnologiyalar

NestJS
 – Backend framework

TypeORM
 – ORM

PostgreSQL
 – Ma’lumotlar bazasi


src/
 ├── appointment/
 │   ├── dto/
 │   ├── entities/
 │   ├── appointment.controller.ts
 │   ├── appointment.service.ts
 │   ├── appointment.module.ts
 │
 ├── doctor/
 │   ├── dto/
 │   ├── entities/
 │   ├── enum/
 │   ├── doctor.controller.ts
 │   ├── doctor.service.ts
 │   ├── doctor.module.ts
 │
 ├── hospitall/
 │   ├── dto/
 │   ├── entities/
 │   ├── hospitall.controller.ts
 │   ├── hospitall.service.ts
 │   ├── hospitall.module.ts
 │
 ├── patient/
 │   ├── dto/
 │   ├── entities/
 │   ├── patient.controller.ts
 │   ├── patient.service.ts
 │   ├── patient.module.ts
 │
 ├── app.module.ts
 └── main.ts


⚙️ O‘rnatish

Repositoriyani clone qiling:

git clone https://github.com/username/appointment-api.git
cd appointment-api


Kerakli paketlarni o‘rnating:

Loyihani ishga tushiring:

npm run start:dev

📖 API Endpointlar

🏥 Hospitals

POST /hospital – Hospital qo‘shish

GET /hospital – Hospitallarni olish

GET /hospital/:id – Bitta hospitalni olish

PUT /hospital/:id – Hospitalni yangilash

DELETE /hospital/:id – Hospitalni o‘chirish

👨‍⚕️ Doctors

POST /doctor – Shifokor qo‘shish

GET /doctor – Shifokorlarni olish

GET /doctor/:id – Bitta shifokorni olish

PUT /doctor/:id – Shifokorni yangilash

DELETE /doctor/:id – Shifokorni o‘chirish

🧑‍🤝‍🧑 Patients

POST /patient – Bemor qo‘shish

GET /patient – Bemorlarni olish

GET /patient/:id – Bitta bemorni olish

PUT /patient/:id – Bemorni yangilash

DELETE /patient/:id – Bemorni o‘chirish

📅 Appointments

POST /appointment – Appointment yaratish

GET /appointment – Appointmentlarni olish (doctor va patient bilan)

GET /appointment/:id – Bitta appointmentni olish

PUT /appointment/:id – Appointmentni yangilash

DELETE /appointment/:id – Appointmentni o‘chirish

📌 Misol JSON natija
{
  "id": 1,
  "day": "2025-02-12",
  "time": "09:00:00",
  "patient": {
    "id": 2,
    "name": "Ali",
    "age": 25
  },
  "doctor": {
    "id": 4,
    "name": "Ibrohim",
    "role": "DOCTOR"
  }
}

✅ Xatoliklar

404 NotFoundException – Resurs topilmasa

409 ConflictException – Duplicate appointment vaqtida

👤 Muallif

Ibrohim Toshqoriyev – Backend Developer 🚀