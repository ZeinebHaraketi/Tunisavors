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

    stage('Vérifier Structure') {
            steps {
                bat '''
                echo "Structure des fichiers:"
                tree /F
                echo "Contenu des dossiers:"
                dir services/auth-service { ls }
                dir services/user-service { ls }
                dir frontend { ls }
                '''
            }

    stage('Build Docker Images') {
      steps {
        bat 'docker compose build'
      }
    }

    stage('Run Services') {
      steps {
        bat 'docker compose up -d'
      }
    }

    stage('Tests') {
      steps {
        bat 'docker exec auth-service npm test'
        bat 'docker exec user-service npm test'
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
