var config = {
    viewsPath: "./app/views/",
    incPath: "./app/views/partials/",
	postsApiUrl: 'http://thebackpackerz.com/wp-json/posts?filter[posts_per_page]=5',
    categoryPostsApiUrl: 'http://thebackpackerz.com/wp-json/posts?filter[category_name]={slug}&filter[posts_per_page]=5',
    postApiUrl: 'http://thebackpackerz.com/wp-json/posts?filter[name]={slug}',
    singlepostApiUrl: 'http://thebackpackerz.com/wp-json/posts/{ID}',
	navApiUrl: 'http://www.thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms'
};
