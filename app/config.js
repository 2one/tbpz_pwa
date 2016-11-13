var config = {
    viewsPath: "./app/views/",
    incPath: "./app/views/partials/",
	postsApiUrl: '//thebackpackerz.com/wp-json/posts?filter[posts_per_page]=5',
    categoryPostsApiUrl: '//thebackpackerz.com/wp-json/posts?filter[category_name]={slug}&filter[posts_per_page]=5',
    postApiUrl: '//thebackpackerz.com/wp-json/posts?filter[name]={slug}',
    singlepostApiUrl: '//thebackpackerz.com/wp-json/posts/{ID}',
	navApiUrl: '//thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms'
};
