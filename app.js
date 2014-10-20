var eatApp = {};

eatApp.apiId = "212bfa16";

eatApp.apiKey = "ae271af881b4e96011e1e8d8e6e75fe0";



eatApp.init = function(){
	eatApp.getRecipes();

};

eatApp.getRecipes = function(course, ingredient){
	//AJAX requests for recipes goes here
	$.ajax({
		url:'https://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data:{
			format: 'jsonp',
			_app_id: eatApp.apiId,
			_app_key: eatApp.apiKey,
			requirePictures:true,
			start:0,
			maxResult:6,
			'allowedCourse[]': course,
			'allowedIngredient[]': ingredient
			// 'allowedCourse[]': 'course^course-Lunch and Snacks'
			//  'allowedCourse[]': 'course^course-Main Dishes'
		},
		success: function(result){
			// console.log('the data: ' + result.matches);
			$('.recipe').empty();
			eatApp.displayRecipes(result.matches);
			   //to make sure the results clear out and display new results
			// eatApp.displayRecipes(result.matches);
		},
		beforeSend: function() {
			console.log('Getting the ajax results');
		}
	});
};


	eatApp.displayRecipes = function(data){
		console.log(data);
		var recipeDiv = $('.recipe');
		$.each(data, function(i, recipe){
// 		if(piece.webImage){
 			 var title = $('<h2>').text(recipe.recipeName);
			 var image = $('<img>').attr('src', recipe.imageUrlsBySize['90']);
			 // var imgSrc = piece.smallImageUrls.toString().replace('=s90', '');
			 // var image = $('<img>').attr('src', imgSrc);
			 var url = $('<a>').attr('href', 'http://www.yummly.com/recipe/' + recipe.id);

			 var eatUrl = url.append(image, title);
			 var eatRecipe = $('<div>').addClass('recipe').append(eatUrl);

			 recipeDiv.append(eatRecipe);
		});

	};


	

$(function(){
	$('form#myform').on('submit', function(e){
		e.preventDefault();
		var course = $('input:radio[name="course"]:checked').val();
		var ingredients = $('input.list').val();
		eatApp.getRecipes(course, ingredients);
	});
	// eatApp.init();
});