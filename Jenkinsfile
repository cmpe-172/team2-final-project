pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
            args '-u root:root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deliver') {
            steps {
                sh './jenkins_scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins_scripts/kill.sh'
            }
        }
    }
}