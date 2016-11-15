var config = {
    viewsPath: "./app/views/",
    incPath: "./app/views/partials/",
    apiUrls: {
        posts: '//thebackpackerz.com/wp-json/posts?filter[category_name]={slug}&filter[s]={search}&filter[posts_per_page]=4&page={page}',
        post: '//thebackpackerz.com/wp-json/posts?filter[name]={slug}',
        singlepost: '//thebackpackerz.com/wp-json/posts/{ID}',
        nav: '//thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms'
    }
};
