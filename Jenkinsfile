pipeline {
    agent any

    parameters {
        string(name: 'SONAR_PROJECT_KEY', defaultValue: 'node-project', description: 'SonarQube project key')
        string(name: 'DOCKER_IMAGE_NAME', defaultValue: 'nodeapp1', description: 'Docker image name')
        string(name: 'CONTAINER_NAME', defaultValue: 'app2', description: 'Container name')
        string(name: 'APP_PORT', defaultValue: '5003', description: 'App port for container')
        choice(name: 'DEPLOY_ENVIRONMENT', choices: ['Development', 'Staging', 'Production'], description: 'Choose deployment environment')
    }

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
        stage ('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('sonarserver') {
                        withCredentials([string(credentialsId: 'Sonar-Token', variable: 'SONAR_TOKEN')]) {
                            bat """
                            sonar-scanner.bat ^
                                -D"sonar.projectKey=${params.SONAR_PROJECT_KEY}" ^
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
                echo "Building Docker image: ${params.DOCKER_IMAGE_NAME}"
                bat "docker build -t ${params.DOCKER_IMAGE_NAME} -f Dockerfile ."
            }
        }
        stage ('Pushing Docker Image to DockerHub') {
            steps {
                withCredentials([usernameColonPassword(credentialsId: 'dockerhub-cred', variable: 'DOCKER_HUB_CREDS')]) {
                    bat """
                    docker login -u sganesh3010 --password-stdin
                    docker tag ${params.DOCKER_IMAGE_NAME}:latest sganesh3010/${params.DOCKER_IMAGE_NAME}:latest
                    docker push sganesh3010/${params.DOCKER_IMAGE_NAME}:latest
                    docker logout
                    """
                }
            }
        }
        stage ('Deploying Container') {
            steps {
                echo "Deploying container in ${params.DEPLOY_ENVIRONMENT} environment"
                bat "docker run -d --name ${params.CONTAINER_NAME} -p 5000:${params.APP_PORT} sganesh3010/${params.DOCKER_IMAGE_NAME}:latest"
            }
        }
    }
}
