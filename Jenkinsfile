pipeline {
  agent any

  environment {
    DOCKER_BUILDKIT = 1
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/ZeinebHaraketi/Tunisavors.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Run Services') {
      steps {
        sh 'docker compose up -d'
      }
    }

    stage('Tests') {
      steps {
        sh 'docker exec auth-service npm test'
        sh 'docker exec user-service npm test'
      }
    }
  }

  post {
    always {
      echo 'Pipeline terminé'
    }
    failure {
      echo 'Échec du pipeline'
    }
  }
}
