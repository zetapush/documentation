FROM openjdk:8u171-jdk

RUN apt-get update && \
    apt install -y graphviz curl build-essential && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs


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


COPY indexer/ /home/jenkins/indexer/
COPY indexer.sh /home/jenkins/
RUN cd /home/jenkins/indexer/ && \
    npm install --production && \
    chmod +x /home/jenkins/indexer.sh && \
    ln -s /home/jenkins/indexer.sh /usr/bin/indexer

RUN chown -R ${user}:${user} ${USER_HOME}

USER jenkins
WORKDIR /home/jenkins

VOLUME ["/home/jenkins/.m2"]