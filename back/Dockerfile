FROM adoptopenjdk/openjdk8 AS builder
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY src src
RUN chmod +x .mvn
RUN .mvn/wrapper/maven-wrapper.jar bootJAR

FROM adoptopenjdk/openjdk8
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 10080
ENTRYPOINT ["java", "-jar", "/app.jar"]
