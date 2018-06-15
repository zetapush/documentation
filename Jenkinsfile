pipeline {
  agent {
    dockerfile {
      dir '.docker/build'
      additionalBuildArgs '--build-arg uid=${JENKINS_UID} --build-arg gid=${JENKINS_GID}'
      args '-v ${WORKSPACE}/.docker/.m2:/home/jenkins/.m2:rw,z'
      label 'docker'
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
        dir('/tmp/gh-pages') {
          deleteDir()
        }
      }
    }

    stage('Generate html documentation') {
      steps {
        sh './mvnw generate-resources -P html'
        publishHTML(
          reportName: 'Generated documentation', 
          reportDir: 'target/generated-docs', 
          reportFiles: 'index.html', 
          allowMissing: false, 
          alwaysLinkToLastBuild: false, 
          keepAll: false, 
          reportTitles: ''
        )
      }
    }

    stage('Publish html documentation') {
      when {
          branch 'master'
      }
      steps {
        sh 'mkdir /tmp/gh-pages'
        dir('/tmp/gh-pages') {
          git(url: 'git@github.com:zetapush/documentation.git', branch: 'gh-pages')
        }
        sh 'cp -rf target/generated-docs/* /tmp/gh-pages/documentation'
        dir('/tmp/gh-pages/documentation') {
          sshagent(['github']) {
            // TODO: push
            sh 'git add .'
            sh 'git commit -m "Update generated documentation"'
            sh 'git push'            
          }
        }
      }
    }
  }
}