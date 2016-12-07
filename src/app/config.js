var config = {
    viewsPath: "./app/views/",
    incPath: "./app/views/partials/",
    apiUrls: {
        posts: "//thebackpackerz.com/wp-json/posts?type=post&filter[category_name]={slug}&filter[tag]={tag}&filter[s]={search}&filter[posts_per_page]=5&page={page}",
        post: "//thebackpackerz.com/wp-json/posts?type=post&filter[name]={slug}",
        pages: "//thebackpackerz.com/wp-json/posts?type=page",
        page: "//thebackpackerz.com/wp-json/posts?type=page&filter[name]={slug}",
        singlepost: "//thebackpackerz.com/wp-json/posts/{ID}",
        nav: "//thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms"
    }
};
