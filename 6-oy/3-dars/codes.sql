### Mashq 1: Har bir kategoriyada nechta mahsulot borligini aniqlash

homework3=# select category , count(*) as maxsulotlar_soni from products  group by category;

        category         | maxsulotlar_soni
-------------------------+------------------
 Maishiy texnika         |                2
 Telefonlar              |                3
 Ofis jihozlari          |                1
 Kompyuter aksessuarlari |                1
 Elektronika             |                3
(5 rows)






### Mashq 2: Har bir kategoriyada mahsulotlarning ortacha narxini hisoblash;

homework3=# select category , trunc(avg(price)) as avarage_price from products group by category;

        category         | avarage_price
-------------------------+---------------
 Maishiy texnika         |       4400000
 Telefonlar              |       5433333
 Ofis jihozlari          |       1200000
 Kompyuter aksessuarlari |       1800000
 Elektronika             |       4000000
(5 rows)






### Mashq 3: Har bir kategoriyada eng qimmat mahsulotni aniqlash

homework3=# select category , trunc(max(price)) as kategoriyadagi_eng_qimmat_narx from products group by category;

        category         | kategoriyadagi_eng_qimmat_narx
-------------------------+--------------------------------
 Maishiy texnika         |                        5600000
 Telefonlar              |                        9800000
 Ofis jihozlari          |                        1200000
 Kompyuter aksessuarlari |                        1800000
 Elektronika             |                        5500000
(5 rows)






### Mashq 4: O'rtacha narxi 3 million so'mdan yuqori bolgan kategoriyalarni aniqlash (HAVING)

homework3=# select category , trunc(avg(price)) as qimmat_kategories from products group by category having avg(price)>3000000;

    category     | qimmat_kategories
-----------------+-------------------
 Maishiy texnika |           4400000
 Telefonlar      |           5433333
 Elektronika     |           4000000
(3 rows)






### Mashq 5: Kamida 3 ta mahsulot bolgan kategoriyalarni aniqlash (HAVING);

homework3=# select category , count(*) as maxsulotlar_soni from products group by category having count(*)>=3;

  category   | maxsulotlar_soni
-------------+------------------
 Telefonlar  |                3
 Elektronika |                3
(2 rows)




### Mashq 6: Har bir mijoz qilgan buyurtmalar soni

homework3=# SELECT c.customer_name, COUNT(o.order_id) AS order_count
homework3-# FROM customers c
homework3-# JOIN orders o ON c.customer_id = o.customer_id
homework3-# GROUP BY c.customer_name
homework3-# ORDER BY order_count DESC;

  customer_name   | order_count
------------------+-------------
 Karimova Nilufar |           2
 Soliyev Sardor   |           2
 Rahimova Malika  |           2
 Hakimov Shuhrat  |           2
 Toshmatov Bekzod |           2
 Usmonova Dilnoza |           2
 Azizov Jasur     |           2
 Mahmudova Ziyoda |           1
(8 rows)

### Mashq 7: Har bir shahardan nechta mijoz ro'yxatdan o'tganini aniqlash

homework3=# SELECT city, COUNT(*) AS customer_count
homework3-# FROM customers
homework3-# GROUP BY city
homework3-# ORDER BY customer_count DESC;

   city    | customer_count
-----------+----------------
 Toshkent  |              3
 Buxoro    |              1
 Namangan  |              1
 Andijon   |              1
 Fargona   |              1
 Samarqand |              1
(6 rows)

### Mashq 8: Jami buyurtma summasi 10 million somdan oshgan mijozlarni aniqlash (HAVING)

homework3=# SELECT c.customer_name, SUM(o.total_amount) AS total_spent
homework3-# FROM customers c
homework3-# JOIN orders o ON c.customer_id = o.customer_id
homework3-# GROUP BY c.customer_name
homework3-# HAVING SUM(o.total_amount) > 10000000
homework3-# ORDER BY total_spent DESC;

  customer_name   | total_spent
------------------+-------------
 Usmonova Dilnoza | 15400000.00
 Hakimov Shuhrat  | 14800000.00
 Soliyev Sardor   | 11600000.00
(3 rows)