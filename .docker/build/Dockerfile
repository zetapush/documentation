FROM openjdk:8u171-jdk

RUN apt-get update && \
    apt install -y graphviz

ARG user=jenkins
ARG group=jenkins
ARG uid=1000
ARG gid=1000

ENV USER_HOME /home/${user}
ENV MAVEN_HOME ${USER_HOME}/.m2
ENV M2_HOME ${MAVEN_HOME}
ENV MAVEN_CONFIG ""
ENV MAVEN_OPTS "-Duser.home=${USER_HOME}"


RUN groupadd --gid ${gid} ${group} && \
    useradd --uid ${uid} --gid ${gid} --shell /bin/bash --create-home ${user} && \
    mkdir ${MAVEN_HOME}


RUN chown -R ${user}:${user} ${USER_HOME}

USER jenkins

VOLUME ["/home/jenkins/.m2"]