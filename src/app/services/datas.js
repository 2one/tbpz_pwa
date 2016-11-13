app.service('datasSce', function($http) {
    var promise = {};
    return {
        getArticles: function(slug, page) {
            if (!slug) {
                var slug = '';
            }
            if (!page) {
                var page = 1;
            }
            if (!promise['articles_' + slug + '_page' + page]) {
                promise['articles_' + slug + '_page' + page] = $http.get(config.postsApiUrl.replace('{slug}', slug).replace('{page}', page)).then(function(res) {
                    return res.data;
                });
            }
            return promise['articles_' + slug + '_page' + page];
        },
        getArticleById: function(id) {
            if (!promise['article_'+ id]) {
                promise['article_'+ id] = $http.get(config.singlepostApiUrl.replace('{ID}', id)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ id];
        },
        getArticleBySlug: function(slug) {
            if (!promise['article_'+ slug]) {
                promise['article_'+ slug] = $http.get(config.postApiUrl.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ slug];
        },
        getNavG: function() {
            if (!promise['nav']) {
                promise['nav'] = $http.get(config.navApiUrl).then(function(res) {
                    return res.data;
                });
            }
            return promise['nav'];
        }
    };
});
