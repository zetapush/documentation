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
        branch 'master'
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
        // index documents for search
        withCredentials([string(credentialsId: 'algolia-documentation-admin-key', variable: 'ALGOLIA_DOCUMENTATION_ADMIN_KEY')]) {
          sh "indexer index -d target/generated-docs/ -a ${env.ALGOLIA_DOCUMENTATION_APP_ID} -k ${env.ALGOLIA_DOCUMENTATION_ADMIN_KEY} -i ${env.ALGOLIA_DOCUMENTATION_INDEX}"
        }
      }
    }
  }

  post {
    failure {
      slackSend(
          message: """ZetaPush documentation : ${env.BRANCH_NAME} failed to build
                      - <${env.BUILD_URL}/consoleFull|View logs>""",
          color: '#ff0000'
      )
      emailext(
          subject: '${DEFAULT_SUBJECT}',
          body: '${DEFAULT_CONTENT}', 
          attachLog: true, 
          recipientProviders: [[$class: 'CulpritsRecipientProvider']]
      )
    }      
    success {
      slackSend(
          message: """ZetaPush documentation : ${env.BRANCH_NAME} success
                      - <${env.BUILD_URL}/consoleFull|View logs>""",
          color: '#00ff00'
      )
    }
  }
}