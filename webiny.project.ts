import pulumiDeploy from "@webiny/cli-plugin-deploy-pulumi";
import beforeDeploy from "./plugins/beforeDeploy";

export default {
    name: "webiny-js-ci-infrastructure",
    cli: {
        plugins: [beforeDeploy, pulumiDeploy()]
    }
};
