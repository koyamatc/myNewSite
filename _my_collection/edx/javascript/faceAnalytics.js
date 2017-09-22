document.querySelector("#analizeBtn").addEventListener("click", analyze);

function analyze(){

    var reqBody = {
        "documents": [
            {
            "language":"en",
            "id" : 1,
            "text": document.querySelector("#url").value
            }
        ]
    };

    var myHeader =  new Headers({
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key':' be6c055642544d3bb3383189536df7d5'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0', initObject);

    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        console.log(response)
        document.querySelector("#atributes").innerHTML = "Age: " + response.documents[0].age + "</br>" + response.documents[0].gender;
    }).catch(function(err){
        alert(err);  
        document.querySelector("#atributes").innerHTML = "";
    });

}