# Customer registration app
This is a CRUD project that I used to improve my skils with Java and Spring Boot. There's two folders inside, the [backend](/backend/) and the [frontend](/frontend/).

#### Back-end
- Spring Boot
- Maven

#### Front-end
- Vue.js 3
- Vite
- Zod

#### Requirements (*Minimum*)
- Java 21
- Node.js 20

### Features
- ✔ Create customer
- ✔ Delete customer
- ✔ Update customer
- ✔ View customer
- ✔ Form validation

## How to start

### 1. Clone the repository
```
git clone https://github.com/brantac/customer-registration-app.git
cd customer-registration-app
```

### 2. Install npm dependencies for the front-end
```
cd .\frontend\
npm install
```

### 3. Run the front-end
Run this command and click on the url that will show in the console to open the page.
```
npm run dev
```

### 4. Run the back-end
Open a new command line window and go to the back-end folder. Inside of it there's a Maven wrapper that will run Spring Boot.
```
cd .\backend\
```

Run:
```
# If you're on Windows
.\mvnw.cmd spring-boot:run

# If you're on Linux
./mvnw spring-boot:run
```
