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
                dir services/auth-service
                dir services/user-service
                dir frontend
                '''
            }
        }

        stage('Build Images') {
            steps {
                bat 'docker-compose build --no-cache'
            }
        }
        
        stage('Démarrer Services') {
            steps {
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            bat 'docker-compose ps'
            bat 'docker images'
            echo 'Pipeline terminé'
        }
        failure {
            echo 'Échec du pipeline'
        }
    }
}
