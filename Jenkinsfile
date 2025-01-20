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
                bat 'npm install express --save'
                bat 'npm install morgan --save'
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
      stage ('Build Docker Image') {
        steps {
            echo "Building docker image"
            bat "docker build -t nodeapp1 -f Dockerfile . "
        }
      }
      stage ('Pushing Docker Image to DockerHub'){
        steps {
            withCredentials([usernameColonPassword(credentialsId: 'dockerhub-cred', variable: 'docker-hub creds')]) {
                bat """
                docker login -u sganesh3010 --password-stdin

                docker tag nodeapp1:latest sganesh3010/nodeapp1:latest

                docker push sganesh3010/nodeapp1:latest

                docker logout

                """
            }
        }
      }
      stage ('Deploying Container') {
        steps {
            bat "docker run -d --name app1 -p 5000:5000 sganesh3010/nodeapp1:latest"
        }
      }
   }

}


