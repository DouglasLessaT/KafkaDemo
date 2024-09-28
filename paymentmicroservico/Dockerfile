
FROM ubuntu:latest AS build

WORKDIR /app


RUN apt-get update && \
    apt-get install -y maven openjdk-17-jdk && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


COPY pom.xml .
COPY src ./src


RUN mvn install

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar


EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
