1. WHERE va AND
Products jadvalidan narxi 500 dan yuqori VA category_id = 1 bo'lgan mahsulotlarni toping.

select * from product where category_id = 1 and price>500;

 id |    name     | price  | category_id | created_date
----+-------------+--------+-------------+--------------
  1 | iPhone 13   | 999.99 |           1 | 2023-01-15
  2 | Samsung s21 | 899.99 |           1 | 2023-01-15
  9 | Xiaomi 20T  | 699.99 |           1 | 2023-09-14




2. WHERE va OR
Narxi 1000 dan yuqori YOKI category_id = 3 bo'lgan mahsulotlarni toping.

select * from product where category_id = 3 or price>1000;

 id |    name     |  price  | category_id | created_date
----+-------------+---------+-------------+--------------
  3 | Macbook PRO | 1299.99 |           2 | 2023-03-10
  4 | DELL Xps    | 1199.99 |           2 | 2023-04-05
  5 | Ipad Pro    |  799.99 |           3 | 2023-05-12
  6 | Galaxy Tab  |  649.99 |           3 | 2023-06-18




3. BETWEEN
Narxi 600 dan 1000 gacha bo'lgan mahsulotlarni toping.

onlineshopping=# select*from product where price between 600 and 1000;


 id |    name     | price  | category_id | created_date
----+-------------+--------+-------------+--------------
  1 | iPhone 13   | 999.99 |           1 | 2023-01-15
  2 | Samsung s21 | 899.99 |           1 | 2023-01-15
  5 | Ipad Pro    | 799.99 |           3 | 2023-05-12
  6 | Galaxy Tab  | 649.99 |           3 | 2023-06-18
  9 | Xiaomi 20T  | 699.99 |           1 | 2023-09-14
 10 | Lenovo Yoga | 899.99 |           2 | 2023-08-25




4. GROUP BY va COUNT

Har bir kategoriyada nechta mahsulot borligini hisoblang.

TOPSHIRIQ SHARTIDA COUNT(son ustuni berilmagan)

bu koddan foidalaniladi: SELECT category, COUNT(*) AS product_count FROM products GROUP BY category;






### 5. MIN va MAX

Har bir kategoriya bo'yicha eng arzon va eng qimmat mahsulotni toping.

onlineshopping=# SELECT category_id, MIN(price) AS min_price, MAX(price) AS max_price
onlineshopping-# FROM product
onlineshopping-# GROUP BY category_id;
 category_id | min_price | max_price
-------------+-----------+-----------
           3 |    649.99 |    799.99
           4 |    149.99 |    199.99
           2 |    899.99 |   1299.99
           1 |    699.99 |    999.99
(4 rows)





### 6. WHERE, AND va BETWEEN

2023-yilning birinchi yarim yilida (January-June) yaratilgan VA narxi 800-1200 oralig'ida bo'lgan mahsulotlarni toping.

onlineshopping=# select * from product where (created_date between '2023-01-01' and '2023-06-30') and price between 800
and 1200;

 id |    name     |  price  | category_id | created_date
----+-------------+---------+-------------+--------------
  1 | iPhone 13   |  999.99 |           1 | 2023-01-15
  2 | Samsung s21 |  899.99 |           1 | 2023-01-15
  4 | DELL Xps    | 1199.99 |           2 | 2023-04-05





### 7. GROUP BY va HAVING

Mahsulotlarining o'rtacha narxi 800 dan yuqori bo'lgan kategoriyalarni toping.

onlineshopping=# select category_id from product group by category_id having avg(price) > 800;
 category_id
-------------
           2
           1





### 8. WHERE va LIKE

Nomi 'Samsung' so'zi bilan boshlanadigan mahsulotlarni toping.

onlineshopping=# select * from product where name like 'Samsung%';

 id |    name     | price  | category_id | created_date
----+-------------+--------+-------------+--------------
  2 | Samsung s21 | 899.99 |           1 | 2023-01-15






### 9. GROUP BY va ORDER BY

Kategoriyalarni ulardagi mahsulotlar soni bo'yicha kamayish tartibida saralang.

SELECT category_id, COUNT(*) AS product_count FROM product GROUP BY category_id ORDER BY product_count DESC;






### 10. Murakkab AND/OR

Quyidagi shartlarni qanoatlantiruvchi mahsulotlarni toping:

- category_id = 1 yoki 2
- VA
- narxi 1000 dan yuqori

onlineshopping=# select * from product where (category_id=1 or category_id=2) and price <1000;

 id |    name     | price  | category_id | created_date
----+-------------+--------+-------------+--------------
  1 | iPhone 13   | 999.99 |           1 | 2023-01-15
  2 | Samsung s21 | 899.99 |           1 | 2023-01-15
  9 | Xiaomi 20T  | 699.99 |           1 | 2023-09-14
 10 | Lenovo Yoga | 899.99 |           2 | 2023-08-25






11-topshiriq yo'q ekan 10 dan 12 ga o'tib ketibdi


### 12. MIN, MAX, AVG kombinatsiyasi

Har bir kategoriya uchun:

- Eng arzon mahsulot
- Eng qimmat mahsulot
- O'rtacha narx
- Mahsulotlar soni
  ma'lumotlarini chiqaring.

onlineshopping=# SELECT category_id,
onlineshopping-#        MIN(price) AS min_price,
onlineshopping-#        MAX(price) AS max_price,
onlineshopping-#        AVG(price) AS average_price
onlineshopping-# FROM product
onlineshopping-# GROUP BY category_id;

 category_id | min_price | max_price |     average_price
-------------+-----------+-----------+-----------------------
           3 |    649.99 |    799.99 |  724.9900000000000000
           4 |    149.99 |    199.99 |  174.9900000000000000
           2 |    899.99 |   1299.99 | 1133.3233333333333333
           1 |    699.99 |    999.99 |  866.6566666666666667