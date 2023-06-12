pipeline {
    // Telling Jenkins to run the pipeline on any available agent.
    agent any

    // Setting environment variables for the build.
    environment {
        MONGODB_URI = credentials('mongodb-uri')
    }

options {
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/prathibha97/management-system.git']],
                    extensions: [[$class: 'CloneOption', noTags: true, shallow: true]]
                ])
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
                    sshagent(['SSH Key Pair']) {
                       withCredentials([file(credentialsId: 'SSH Key Pair', variable: 'MY_PRIVATE_KEY')]) {
                        sh 'chmod 400 $MY_PRIVATE_KEY'
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
