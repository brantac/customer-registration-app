# Customer registration app
This is a side project, used to learn more about Java. The back-end and the front-end have separate folders.

#### Requirements (*Minimum*)
- Java 21
- Node.js 20

#### Back-end
- Spring Boot
- Maven

#### Front-end
- Vue.js 3
- Vite

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
Open a new command line window and go to the back-end folder.
```
cd .\backend\
```

Run the project with Maven:
```
# If you're on Windows
.\mvnw.cmd spring-boot:run

# If you're on Linux
./mvnw spring-boot:run
```