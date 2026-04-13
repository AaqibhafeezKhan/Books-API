# Build stage
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and install dependencies first for caching purposes
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the actual source code and build the project
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage using a lightweight JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/books-api-1.0.0.jar app.jar

# Render requires applications to bind to 0.0.0.0 and listen on the $PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
