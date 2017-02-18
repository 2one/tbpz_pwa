var config = {
// @if NODE_ENV='local'
    html5mode: false,
    viewsPath: "./templates/",
    incPath: "./templates/partials/",
    apiUrls: {
        posts: "//secure.thebackpackerz.com/wp-json/posts?type=post&filter[category_name]={slug}&filter[tag]={tag}&filter[s]={search}&filter[posts_per_page]=5&page={page}",
        post: "//secure.thebackpackerz.com/wp-json/posts?type=post&filter[name]={slug}",
        pages: "//secure.thebackpackerz.com/wp-json/posts?type=page",
        page: "//secure.thebackpackerz.com/wp-json/posts?type=page&filter[name]={slug}",
        singlepost: "//secure.thebackpackerz.com/wp-json/posts/{ID}",
        nav: "//secure.thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms"
    },
// @endif
// @if NODE_ENV='remote'
    html5mode: true,
    viewsPath: "./templates/",
    incPath: "./templates/partials/",
    apiUrls: {
        posts: "//secure.thebackpackerz.com/wp-json/posts?type=post&filter[category_name]={slug}&filter[tag]={tag}&filter[s]={search}&filter[posts_per_page]=5&page={page}",
        post: "//secure.thebackpackerz.com/wp-json/posts?type=post&filter[name]={slug}",
        pages: "//secure.thebackpackerz.com/wp-json/posts?type=page",
        page: "//secure.thebackpackerz.com/wp-json/posts?type=page&filter[name]={slug}",
        singlepost: "//secure.thebackpackerz.com/wp-json/posts/{ID}",
        nav: "//secure.thebackpackerz.com/wp-json/posts/types/posts/taxonomies/category/terms"
    },
// @endif
    notification: {
        publicKey: 'BGNeWjvWTQ7VutGHgNYY9bQDazwrLysOysycwNV-2aZp5EJjcsarZsinanCsDUfkfcLLRHbYThheRVFlMo4vIIU',
        //privateKey: 'BGNeWjvWTQ7VutGHgNYY9bQDazwrLysOysycwNV-2aZp5EJjcsarZsinanCsDUfkfcLLRHbYThheRVFlMo4vIIU',
    }
};
module.exports = config;
