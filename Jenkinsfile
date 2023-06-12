// This is a Jenkinsfile. It is a script that Jenkins will run when a build is triggered.
pipeline {
    // Telling Jenkins to run the pipeline on any available agent.
    agent any

    // Setting environment variables for the build.
    environment {
        MONGODB_URI = credentials('mongodb-uri')
        MY_PRIVATE_KEY = credentials('SSH Key Pair')
    }

    // This is the pipeline. It is a series of stages that Jenkins will run.
    stages {
        // This state is telling Jenkins to checkout the source code from the source control management system.
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sshagent(['your-ssh-credentials']) {
                        sh 'ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com "docker pull prathibha097/management"'
                        sh 'ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com "docker stop management-container"'
                        sh 'ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com "docker run -d -p 5001:5000 --name=management-container-new prathibha097/management"'
                        sh 'ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com "docker update --link --volumes-from=management-container management-container-new"'
                        sh 'ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com "docker rm -f management-container"'
                        sh 'ssh -o StrictHostKeyChecking=no -i $MY_PRIVATE_KEY ec2-user@ec2-34-220-229-58.us-west-2.compute.amazonaws.com "docker rename management-container-new management-container"'
                    }
                }
            }
        }
        
    }
}
