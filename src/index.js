import * as core from '@actions/core'
import * as github from '@actions/github'

const bodyCheck = () => {
    let pr = github.context.payload.pull_request
    if (!pr.body) {
        core.setFailed("Alert")
        return
    }
    core.setOutput("bodyCheck", true)
}

const notifyUser = () => {
    core.info("User notified")
}

const run = async () => {
    try {
        const input = {
            jobType: core.getInput("jobType").toLowerCase() || "body_check"
        }

        switch (input.jobType) {
            case "body_check": bodyCheck();
            case "notify_user": notifyUser();
        }

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();