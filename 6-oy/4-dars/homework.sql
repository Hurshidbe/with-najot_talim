## JOIN operatorlari bo'yicha mashqlar

### Mashq 1: INNER JOIN - O'quvchilar va ularning maslahatchilarini ko'rsatish

**Vazifa:** O'quvchilar va ularning maslahatchi o'qituvchilari to'g'risidagi ma'lumotlarni ko'rsating. Faqat maslahatchisi bo'lgan o'quvchilarni ko'rsating.

**Tushuntirish:** INNER JOIN faqat har ikkala jadvalda mos keladigan yozuvlarni qaytaradi. Bu so'rovda maslahatchisi bo'lmagan o'quvchilar (advisor_id NULL bo'lgan) natijaga kiritilmaydi.

homework4=# SELECT
homework4-#     s.student_id,
homework4-#     s.first_name AS student_name,
homework4-#     s.last_name AS student_surname,
homework4-#     t.first_name AS teacher_name,
homework4-#     t.last_name AS teacher_surname,
homework4-#     t.subject
homework4-# FROM students s
homework4-# INNER JOIN teachers t ON s.advisor_id = t.teacher_id;

 student_id | student_name | student_surname | teacher_name | teacher_surname |   subject
------------+--------------+-----------------+--------------+-----------------+-------------
          1 | Rustam       | Zokirov         | Anvar        | Karimov         | Matematika
          2 | Kamola       | Nasriddinova    | Nilufar      | Azimova         | Fizika
          3 | Davron       | Qosimov         | Jasur        | Toshmatov       | Informatika
          4 | Aziza        | Meliyeva        | Madina       | Raimova         | Ingliz tili
          5 | Bobur        | Haydarov        | Anvar        | Karimov         | Matematika
          6 | Gulnora      | Karimova        | Sardor       | Aliyev          | Kimyo
          7 | Temur        | Ortiqov         | Jasur        | Toshmatov       | Informatika
         10 | Diyora       | Ergasheva       | Zarina       | Ismoilova       | Tarix
(8 rows)







### Mashq 2: LEFT JOIN - Barcha oquvchilar va ularning maslahatchilari

**Vazifa:** Barcha o'quvchilar va ularning maslahatchi o'qituvchilari (agar mavjud bo'lsa) to'g'risidagi ma'lumotlarni ko'rsating.

**Tushuntirish:** LEFT JOIN chap jadvaldan (students) barcha yozuvlarni va o'ng jadvaldan (teachers) mos keladigan yozuvlarni qaytaradi. Agar o'ng jadvaldagi mos keladigan yozuv topilmasa, NULL qaytariladi. Bu so'rovda COALESCE funksiyasi NULL qiymatlarni foydali matn bilan almashtirish uchun ishlatiladi.

homework4=# SELECT
homework4-#     s.student_id,
homework4-#     s.first_name AS student_name,
homework4-#     s.last_name AS student_surname,
homework4-#     COALESCE(t.first_name, 'Maslahatchi yo''q') AS teacher_name,
homework4-#     COALESCE(t.last_name, '') AS teacher_surname,
homework4-#     COALESCE(t.subject, 'Maslahatchi yo''q') AS subject
homework4-# FROM students s
homework4-# LEFT JOIN teachers t ON s.advisor_id = t.teacher_id;

 student_id | student_name | student_surname |   teacher_name   | teacher_surname |     subject
------------+--------------+-----------------+------------------+-----------------+------------------
          1 | Rustam       | Zokirov         | Anvar            | Karimov         | Matematika
          2 | Kamola       | Nasriddinova    | Nilufar          | Azimova         | Fizika
          3 | Davron       | Qosimov         | Jasur            | Toshmatov       | Informatika
          4 | Aziza        | Meliyeva        | Madina           | Raimova         | Ingliz tili
          5 | Bobur        | Haydarov        | Anvar            | Karimov         | Matematika
          6 | Gulnora      | Karimova        | Sardor           | Aliyev          | Kimyo
          7 | Temur        | Ortiqov         | Jasur            | Toshmatov       | Informatika
          8 | Malika       | Raimova         | Maslahatchi yo'q |                 | Maslahatchi yo'q
          9 | Javohir      | Tursunov        | Maslahatchi yo'q |                 | Maslahatchi yo'q
         10 | Diyora       | Ergasheva       | Zarina           | Ismoilova       | Tarix
(10 rows)






### Mashq 3: RIGHT JOIN - Barcha o'qituvchilar va ularga biriktirilgan o'quvchilar

**Vazifa:** Barcha o'qituvchilar va ularga maslahatchi sifatida biriktirilgan o'quvchilar to'g'risidagi ma'lumotlarni ko'rsating.

**Tushuntirish:** RIGHT JOIN o'ng jadvaldan (teachers) barcha yozuvlarni va chap jadvaldan (students) mos keladigan yozuvlarni qaytaradi. Agar chap jadvaldagi mos keladigan yozuv topilmasa, NULL qaytariladi. Bu so'rov barcha o'qituvchilarni ko'rsatadi, hatto ularga biriktirilgan o'quvchilar bo'lmasa ham.

homework4=# SELECT
homework4-#     t.teacher_id,
homework4-#     t.first_name AS teacher_name,
homework4-#     t.last_name AS teacher_surname,
homework4-#     t.subject,
homework4-#     s.student_id,
homework4-#     s.first_name AS student_name,
homework4-#     s.last_name AS student_surname
homework4-# FROM students s
homework4-# RIGHT JOIN teachers t ON s.advisor_id = t.teacher_id;

 teacher_id | teacher_name | teacher_surname |   subject   | student_id | student_name | student_surname
------------+--------------+-----------------+-------------+------------+--------------+-----------------
          1 | Anvar        | Karimov         | Matematika  |          1 | Rustam       | Zokirov
          2 | Nilufar      | Azimova         | Fizika      |          2 | Kamola       | Nasriddinova
          3 | Jasur        | Toshmatov       | Informatika |          3 | Davron       | Qosimov
          4 | Madina       | Raimova         | Ingliz tili |          4 | Aziza        | Meliyeva
          1 | Anvar        | Karimov         | Matematika  |          5 | Bobur        | Haydarov
          5 | Sardor       | Aliyev          | Kimyo       |          6 | Gulnora      | Karimova
          3 | Jasur        | Toshmatov       | Informatika |          7 | Temur        | Ortiqov
          6 | Zarina       | Ismoilova       | Tarix       |         10 | Diyora       | Ergasheva
(8 rows)





### Mashq 4: FULL OUTER JOIN - O'qituvchilar va o'quvchilar to'liq ro'yxati

**Vazifa:** Barcha o'qituvchilar va barcha o'quvchilarni ko'rsating, ularning orasidagi maslahatchi aloqalarini ko'rsating.

**Tushuntirish:** FULL OUTER JOIN har ikkala jadvaldan barcha yozuvlarni qaytaradi. Agar mos keladigan yozuv topilmasa, tegishli ustunlar NULL qiymatlarini oladi. Bu so'rov barcha o'qituvchilar va barcha o'quvchilarni ko'rsatadi, ularning orasidagi aloqalarni ham korsatadi.

homework4=# SELECT
homework4-#     s.student_id,
homework4-#     s.first_name AS student_first_name,
homework4-#     s.last_name AS student_last_name,
homework4-#     t.teacher_id,
homework4-#     t.first_name AS teacher_first_name,
homework4-#     t.last_name AS teacher_last_name
homework4-# FROM students s
homework4-# FULL OUTER JOIN teachers t
homework4-# ON s.advisor_id = t.teacher_id;

 student_id | student_first_name | student_last_name | teacher_id | teacher_first_name | teacher_last_name
------------+--------------------+-------------------+------------+--------------------+-------------------
          1 | Rustam             | Zokirov           |          1 | Anvar              | Karimov
          2 | Kamola             | Nasriddinova      |          2 | Nilufar            | Azimova
          3 | Davron             | Qosimov           |          3 | Jasur              | Toshmatov
          4 | Aziza              | Meliyeva          |          4 | Madina             | Raimova
          5 | Bobur              | Haydarov          |          1 | Anvar              | Karimov
          6 | Gulnora            | Karimova          |          5 | Sardor             | Aliyev
          7 | Temur              | Ortiqov           |          3 | Jasur              | Toshmatov
          8 | Malika             | Raimova           |            |                    |
          9 | Javohir            | Tursunov          |            |                    |
         10 | Diyora             | Ergasheva         |          6 | Zarina             | Ismoilova
(10 rows)
