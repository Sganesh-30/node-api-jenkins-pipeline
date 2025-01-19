pipeline {
    agent any

    tools {
        nodejs "NodeJS236"
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
                sh 'npm install --save-dev mocha'
            }
        }
        stage ('Unit Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage ('Lint') {
            steps {
                sh 'npm run lint || echo "Linting completed with issues. Check the logs."'
            }
        }
        
   }
}