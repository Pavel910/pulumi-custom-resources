import * as aws from "@pulumi/aws";

class ElasticSearch {
    domain: aws.elasticsearch.Domain;

    constructor() {
        const domainName = "webiny-e2e";

        this.domain = new aws.elasticsearch.Domain(domainName, {
            elasticsearchVersion: "7.10",
            clusterConfig: {
                instanceType: "c5.xlarge.elasticsearch"
            },
            ebsOptions: {
                ebsEnabled: true,
                volumeSize: 10,
                volumeType: "gp2"
            },
            advancedOptions: {
                "rest.action.multi.allow_explicit_index": "true"
            },
            snapshotOptions: {
                automatedSnapshotStartHour: 23
            }
        });

        /**
         * Domain policy defines who can access your Elasticsearch Domain.
         * For details on Elasticsearch security, read the official documentation:
         * https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/security.html
         */
        new aws.elasticsearch.DomainPolicy(`${domainName}-policy`, {
            domainName: this.domain.domainName.apply(v => `${v}`),
            accessPolicies: Promise.all([aws.getCallerIdentity({})]).then(
                ([currentCallerIdentity]) => ({
                    Version: "2012-10-17",
                    Statement: [
                        /**
                         * Allow requests signed with current account
                         */
                        {
                            Effect: "Allow",
                            Principal: {
                                AWS: currentCallerIdentity.accountId
                            },
                            Action: "es:*",
                            Resource: this.domain.arn.apply(v => `${v}/*`)
                        }
                        /**
                         * Uncomment the following `Allow` policy to allow access from specific IP address.
                         * This will be useful for development purposes, when you want to access Kibana to inspect your data.
                         *
                         * If you need to setup proper user accounts for access to Kibana, you'll need to connect it to
                         * Cognito User Pool. For instructions, see the official documentation:
                         * https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-cognito-auth.html
                         */

                        // {
                        //     Effect: "Allow",
                        //     Principal: "*",
                        //     Action: "es:*",
                        //     Resource: this.domain.arn.apply(v => `${v}/*`),
                        //     Condition: {
                        //         IpAddress: {
                        //             "aws:SourceIp": "213.149.51.28/32"
                        //         }
                        //     }
                        // }
                    ]
                })
            )
        });
    }
}

export default ElasticSearch;
