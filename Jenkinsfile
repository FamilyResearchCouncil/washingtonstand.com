#!/usr/bin/env groovy
node('master') {
    try{
        def branch_name;
        def branch_compose_file;

        stage('env'){

            checkout scm

            //git symbolic-ref --short HEAD
            env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
            env.EMAIL_TO = sh (script: 'git log -n 50 --pretty="%ce" | sort | uniq | grep -E "@(gmail.com|frc.org)" | tr \'\n\' \',\' | xargs | sed \'s/\\(.*\\),/\\1 /\'', returnStdout: true).trim()

            emailext    to: "${env.EMAIL_TO}",
                        body: "View build output here: $BUILD_URL/console\n\nLast Commit Message: ${env.GIT_COMMIT_MSG}",
                        subject: "washingtonstand.frc.org BUILD STARTING: ${branch_name} : ${BUILD_ID}",
                        replyTo: 'itadmin@frc.org'

            branch_name = scm.branches[0].name
            branch_compose_file = "docker-compose.${branch_name}.yml";
            sh "echo 'running on branch ($branch_name)'"

        }


        stage('build'){
            // build the image tagged with the current branch name
            sh "docker build -t familyresearchcouncil/washingtonstand:${branch_name} ."
        }


        if ("$branch_name" == 'main' || "$branch_name" == 'staging'){

            stage('deploy') {


                // push the image to dockerhub so it is available to pull
                sh "docker push familyresearchcouncil/washingtonstand:${branch_name}"

                // copy the files necessary to deploy the application
                sh "scp deploy.sh docker-compose.*.yml docker01:/docker/containers/washingtonstand"

                // run the deploy script, passing the current branch as the argument
                sh "ssh docker01 /docker/containers/washingtonstand/deploy.sh ${branch_name}"

            }

        }

    } catch(error) {
        emailext    to: "${env.EMAIL_TO}",
                    body: "View build output here: $BUILD_URL/console\n\nError ${error}",
                    subject: "washingtonstand.frc.org BUILD FAILED: ${branch_name} : ${BUILD_ID}",
                    replyTo: 'eab@frc.org'

    } finally  {
//         sh 'docker-compose down'
    }

}
