pipeline {
    agent any

    tools {
        nodejs "NodeJS234"
    }

    stages {
        stage ('Print NodeJS and NPM Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage ('Installing Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage ('Unite Test') {
            steps {
                sh 'npm run test'
            }
        }
   }
}