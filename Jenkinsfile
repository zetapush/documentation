pipeline {
    agent {
      docker {
        image 'openjdk:8u171-jdk'
      }
    }

    options {
        timestamps()
    }

    stages {
      stage('Clean') {
        steps {
          dir('target') {
            deleteDir()
          }
        }
      }

      stage('Generate html documentation') {
        steps {
          sh './mvnw generate-resources -P html'
        }
      }

      stage('Publish html documentation') {
        steps {
          sh 'mkdir target/gh-pages'
          dir('target/gh-pages') {
            git(url: 'git@github.com:zetapush/documentation.git', branch: 'gh-pages')
          }
          dir('target') {
            sh 'yes | cp -rf generated-docs/* gh-pages/documentation'
          }
          dir('target/gh-pages/documentation') {
            // TODO: push
          }
        }
      }
    }
}