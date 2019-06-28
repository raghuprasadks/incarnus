const posts =[
	{
		title:"post one",body:" body of post one"
	},
	{
		title:"post two",body:" body of post two"
	}
];
/*
function getPosts()
{
	let output = '';
	posts.forEach(function (post,index)
	{
		output += "<p>"+post.title+"</p></br>";
	});
	document.body.innerHTML = output;
}

getPosts();
*/

function getPosts()
{
	setTimeout(function(){
		console.log('inside getposts:settimeout');
		let output = '';
		posts.forEach(function (post,index)
		{
			output += "<p>"+post.title+"</p></br>";
		});
		document.body.innerHTML = output;
	},1000);
}

function createPost(post){
	setTimeout(function(){
		posts.push(post);
	},2000);
}

createPost({title:"post three",body:"Body of post 3"});
getPosts();
/*
function createPost(post,callback){
	setTimeout(function(){
		posts.push(post);
		callback();
	},2000);
}

createPost({title:"post three",body:"Body of post 3"},getPosts);

*/