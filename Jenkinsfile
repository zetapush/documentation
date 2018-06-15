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
          alwaysLinkToLastBuild: true, 
          keepAll: false, 
          reportTitles: ''
        )
      }
    }

    stage('Publish html documentation') {
      when {
        anyOf {
          branch 'master'
          branch 'feature/ci/gh-pages'
        }
      }
      steps {
        // checkout gh-pages
        dir('target/documentation') {
          git(url: 'git@github.com:zetapush/documentation.git', branch: 'gh-pages')
        }
        // copy new documentation to gh-pages local repo
        sh 'cp -rf target/generated-docs/* target/documentation'
        // commit
        sh 'cd target/documentation && git add .'
        sh 'cd target/documentation && git commit -m "Update generated documentation"'
        // push on gh-pages
        sshagent(['github-ssh']) {
          sh 'mkdir ~/.ssh'
          sh 'ssh-keyscan github.com >> ~/.ssh/known_hosts'
          sh 'cd target/documentation && git push origin gh-pages'
        }
      }
    }
  }
}