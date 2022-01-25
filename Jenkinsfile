#!/usr/bin/env groovy
node('master') {
    try{
        stage('env'){

            checkout scm

            env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
            env.EMAIL_TO = sh (script: 'git log -n 50 --pretty="%ce" | sort | uniq | grep -E "@(gmail.com|frc.org)" | tr \'\n\' \',\' | xargs | sed \'s/\\(.*\\),/\\1 /\'', returnStdout: true).trim()

            emailext    to: "${env.EMAIL_TO}",
                        body: "View build output here: $BUILD_URL/console\n\nLast Commit Message: ${env.GIT_COMMIT_MSG}",
                        subject: "${env.SITE_DOMAIN_NAME} BUILD STARTING: ${env.BRANCH_NAME} : ${BUILD_ID}",
                        replyTo: 'eab@frc.org'

        }

        stage('build'){
            // build the image tagged with the current branch name
            sh "docker build -t familyresearchcouncil/acm:${env.BRANCH_NAME} ."
        }

//        ${env.DOCKER_SWARM_DIRECTORY}
//         stage('setup') {
//             // start the services
//             sh 'docker-compose up -d'
//         }
//
//         stage('test') {
//              // check status code of http request
//
//             int status = sh(script: "curl -sLI -w '%{http_code}' localhost:3000 -o /dev/null", returnStdout: true)
//
//             if (status != 200 && status != 201) {
//                 error("Returned status code = $status when calling $url")
//             }
//
//         }

        stage('deploy') {

            // push the image to dockerhub so it is available to pull
            sh "docker push familyresearchcouncil/acm:${env.BRANCH_NAME}"

            // copy the files necessary to deploy the application
            sh "scp deploy.sh docker-compose.*.yml docker01:/docker/containers/${env.DOCKER_SWARM_DIRECTORY}"

            // run the deploy script, passing the current branch as the argument
            sh "ssh docker01 /docker/containers/${env.DOCKER_SWARM_DIRECTORY}/deploy.sh ${env.BRANCH_NAME}"

        }

    } catch(error) {
        emailext    to: "${env.EMAIL_TO}",
                    body: "View build output here: $BUILD_URL/console\n\nError ${error}",
                    subject: "${env.SITE_DOMAIN_NAME} BUILD FAILED: ${env.BRANCH_NAME} : ${BUILD_ID}",
                    replyTo: 'eab@frc.org'

    } finally  {
//         sh 'docker-compose down'
    }

}
