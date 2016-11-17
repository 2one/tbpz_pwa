app.service('datasSce', function($http) {
    var promise = {};
    return {
        getArticles: function(categorySlug, searchQuery, page) {
            if (!categorySlug) {
                var categorySlug = '';
            }
            if (!searchQuery) {
                var searchQuery = '';
            }
            if (!page) {
                var page = 1;
            }
            if (!promise['articles_' + categorySlug + '_'+ searchQuery + '_page' + page]) {
                promise['articles_' + categorySlug + '_'+ searchQuery + '_page' + page] = $http.get(config.apiUrls.posts.replace('{slug}', categorySlug).replace('{search}', searchQuery).replace('{page}', page)).then(function(res) {
                    return res.data;
                });
            }
            return promise['articles_' + categorySlug + '_'+ searchQuery + '_page' + page];
        },
        getArticleById: function(id) {
            if (!promise['article_'+ id]) {
                promise['article_'+ id] = $http.get(config.apiUrls.singlepost.replace('{ID}', id)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ id];
        },
        getArticleBySlug: function(slug) {
            if (!promise['article_'+ slug]) {
                promise['article_'+ slug] = $http.get(config.apiUrls.post.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['article_'+ slug];
        },
        getPages: function() {
            if (!promise['pages']) {
                promise['pages'] = $http.get(config.apiUrls.pages).then(function(res) {
                    return res.data;
                });
            }
            return promise['pages'];
        },
        getPageBySlug: function(slug) {
            if (!promise['page_'+ slug]) {
                promise['page_'+ slug] = $http.get(config.apiUrls.page.replace('{slug}', slug)).then(function(res) {
                    return res.data;
                });
            }
            return promise['page_'+ slug];
        },
        getNavG: function() {
            if (!promise['nav']) {
                promise['nav'] = $http.get(config.apiUrls.nav).then(function(res) {
                    return res.data;
                });
            }
            return promise['nav'];
        }
    };
});
