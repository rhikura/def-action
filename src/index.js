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
    core.info(github.context.eventName)
}

const branchCheck = () => {
    core.info("User notified")
}

const run = async () => {
    try {
        const input = {
            jobType: core.getInput("jobType").toLowerCase() || "body_check"
        }

        switch (input.jobType) {
            case "body_check":
                bodyCheck()
                break
            case "notify_user":
                notifyUser()
                break
            case "branch_check":
                branchCheck()
                break
            default:
                core.setFailed("Job type undefine")
                break
        }

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();