### How to run the application

With docker installed, run:

```cmd
docker-compose up -d
```

In the root directory of the project, copy and paste the .env.example file and change the file name to .env.

Then, execute command to initialize the project:

```cmd
yarn dev
```

Configure database:

```cmd
npx prisma db push
```

```cmd
npx prisma db seed
```
