import ElasticSearch from "./elasticSearch";

export = async () => {
    const elasticSearch = new ElasticSearch();

    return {
        domainName: elasticSearch.domain.domainName,
        domainEndpoint: elasticSearch.domain.endpoint,
        kibanaEndpoint: elasticSearch.domain.kibanaEndpoint
    }
};
