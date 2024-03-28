FROM bellsoft/liberica-openjdk-debian:17

ARG JAR_FILE
COPY ${JAR_FILE} template.jar

ENTRYPOINT ["java","-jar","/template.jar"]