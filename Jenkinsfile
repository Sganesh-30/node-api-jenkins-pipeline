pipeline {
    agent any

    tools {
        nodejs "NodeJS234"
    }
    environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN = credentials('Sonar-Token')
    }

    stages {
        stage ('Print NodeJS and NPM Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }
        stage ('Installing Dependencies') {
            steps {
                bat 'npm install'
                bat 'npm install --save-dev mocha'
            }
        }
        stage ('Unit Test') {
            steps {
                bat 'npm run test'
            }
        }
      stage('SonarQube Analysis') {
        steps {
            script {
                withSonarQubeEnv('sonarserver') {
                    withCredentials([string(credentialsId: 'Sonar-Token', variable: 'SONAR_TOKEN')]) {
                    bat """
                    sonar-scanner.bat ^
                        -D"sonar.projectKey=node-project" ^
                        -D"sonar.sources=." ^
                        -D"sonar.host.url=http://localhost:9000" ^
                        -D"sonar.login=%SONAR_TOKEN%"
                    """
                    }
                }

               }
            }
       }
       stage ('Quality Gate') {
        steps {
            echo 'Evaluating Quality Gate status...'
             timeout(time: 2, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
             }
        }
      }
   }

}


