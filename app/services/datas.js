app.service('datasSce', function($http) {
    var promise = {};
    return {
        getArticles: function() {
            if (!promise['articles']) {
                promise['articles'] = $http.get(config.postsApiUrl).then(function(res) {
                    return res.data;
                });
            }
            return promise['articles'];
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
        getCategoryArticles: function(slug) {
            if (!promise['category_' + slug]) {
                promise['category_' + slug] = $http.get(config.categoryPostsApiUrl.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['category_' + slug];
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
