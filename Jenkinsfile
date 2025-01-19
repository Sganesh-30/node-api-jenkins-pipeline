pipeline {
    agent any

    tools {
        nodejs "NodeJS234"
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
                bat 'npm install -g eslint'
            }
        }
        stage ('Unit Test') {
            steps {
                bat 'npm run test'
            }
        }
        stage ('Lint') {
            steps {
                bat 'npm run lint || echo "Linting completed with issues. Check the logs."'
            }
        }
        
   }
}