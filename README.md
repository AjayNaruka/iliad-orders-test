# iliad-orders-test
# SETUP BACKEND:

Enter the backend folder
```bash
cd backend
```

Rename .env.example and rename into .env
```bash
mv .env.example .env
```

Start Docker with
```bash
docker compose up -d --build
```

Build vendor with composer
```bash
docker exec backend-php-1 composer install
```
Add Sample DB
```bash
docker exec backend-database-1 mysql -u app -p!ChangeMe! app < dumps/sample.sql 
```

TEST USER:
Mail: test@gmail.com
Password: password123
-----------------------------
# SETUP FRONTEND: ( developed using latest ng, npm, node)
Enter the frontend folder
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run dev server:
```bash
ng serve
```


