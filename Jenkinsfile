pipeline {
    agent any

    environment {
        MONGODB_URI = credentials('mongodb-uri')
    }

    stages {
        stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
		}
        
        stage('Build Images') {
            steps {
                sh 'docker build -t prathibha097/management .'
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push prathibha097/management'
                }
            }
        }

        stage('Update Docker Container on EC2') {
            steps {
                withCredentials([file(credentialsId: 'SSH Key Pair', variable: 'MY_PRIVATE_KEY')]) {
                    sh 'chmod 400 $MY_PRIVATE_KEY'
                    script {
                        def sshCommand = "ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com"
                        sshCommand += " 'docker pull prathibha097/management'"
                        sshCommand += " 'docker stop management-container'"
                        sshCommand += " 'docker run -d -p 5001:5000 --name=management-container-new prathibha097/management'"
                        sshCommand += " 'docker update --link --volumes-from=management-container management-container-new'"
                        sshCommand += " 'docker rm -f management-container'"
                        sshCommand += " 'docker rename management-container-new management-container'"
                        sh sshCommand
                    }
                }
            }
        }
    }
}
