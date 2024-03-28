FROM bellsoft/liberica-openjdk-debian:17

ARG JAR_FILE
COPY ${JAR_FILE} template.jar

# Comando eseguito allo startup del container
ENTRYPOINT ["java","-jar","/template.jar"]