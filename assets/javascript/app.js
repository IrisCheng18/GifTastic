var topics = [
    "Cat",
    "Dog",
    "Rabbit",
    "Tiger",
    "Skunk",
    "Goldfish",
    "Bird",
    "Turtle",
    "Dolphin",
    "Giraffe",
    "Lion",
    "Monkey",
    "Chicken",
    "Panda"
];

createButtons();

// createFrom();


$(document).on("click", ".gif-button", function (event) {
    event.preventDefault();

    var queryItem = $(this).attr("data-name");
    // console.log(queryItem);

    makeAPICallToGiphy(queryItem);
});

$(document).on("click", ".gif-image", function (event) {
    event.preventDefault();

    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("data-animate");
    var stillUrl = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", stillUrl);
        $(this).attr("data-state", "still");
    }
});

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var input = $("#add-animal").val();
    topics.push(input);

    createButtons();
});

function createButtons() {
    $("#button-section").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("gif-button btn-primary");
        btn.attr("data-name", topics[i].toLowerCase());
        btn.text(topics[i]);
        $("#button-section").append(btn);
    };
};

// function createFrom() {
//     var form = $("<form>");
//     var formGroup = $("<div>").addClass("form-group mt-3");
//     var label = $("<label>").text("Add an animal");
//     var input = $("<input>").addClass("form-control");
//     input.attr("id", "add-animal");
//     input.attr("type", "text");

//     var btnSubmit = $("<button>").addClass("btn btn-primary");
//     btnSubmit.attr("id", "submit-btn");
//     btnSubmit.attr("type", "Submit");
//     btnSubmit.text("Submit");

//     formGroup.append(label, input);
//     form.append(formGroup, btnSubmit);

//     $("#form-section").append(form);
// };

function makeAPICallToGiphy(queryItem) {

    var apiKey = "dc6zaTOxFJmzC"
    var queryURL = "https://api.giphy.com/v1/gifs/search";
    var queryParams = "?" + $.param({
        api_key: apiKey,
        q: queryItem,
        limit: 10,
    });
    // console.log(queryParams);

    var queryUrlWithParams = queryURL + queryParams;

    $.ajax({
        url: queryUrlWithParams,
        method: "GET"
    }).then(function (response) {
        var imagesArr = response.data;
        var rating = "";
        var title = "";
        var source = "";
        var imgHeight = 0;
        var imgWidth = 0;

        console.log(imagesArr);

        $("#gif-section").empty();

        for (var i = 0; i < imagesArr.length; i++) {
            var card = $("<div>").addClass("card mt-4 mr-3 border-0");

            imgHeight = parseInt(imagesArr[i].images.fixed_height.height) + 150;
            imgWidth = parseInt(imagesArr[i].images.fixed_height.width) + 80;
            // console.log(imgWidth + " " + imgHeight);

            card.attr("style", "width: " + imgWidth + "px; height: " + imgHeight + "px;");


            var img = $("<img>");
            img.addClass("card-img-top gif-image float-center");
            img.attr("src", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-still", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-animate", imagesArr[i].images.fixed_height.url);
            img.attr("data-state", "still");
            img.attr("style", "width: " + imagesArr[i].images.fixed_height.width + "px; height: " + imagesArr[i].images.fixed_height.height + "px;");


            rating = imagesArr[i].rating;
            title = imagesArr[i].title;
            source = imagesArr[i].source_tld;
            var cardBody = $("<div>").addClass("card-body");
    
            var small = $("<small>");
            var pRating = $("<p>").addClass("m-0");
            pRating.text("Rating: "+ rating);
            var pTitle = $("<p>").addClass("m-0");
            pTitle.text("Title: " + title);
            var pSource = $("<p>").addClass("m-0");
            pSource.text("Source: " + source);

            small.append(pRating, pTitle, pSource);
            cardBody.append(small);


            card.append(img, cardBody);
            $("#gif-section").append(card);
        };


    });
};
