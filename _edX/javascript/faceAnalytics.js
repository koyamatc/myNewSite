document.querySelector("#analizeBtn").addEventListener("click", analyze);

function analyze(){

    var reqBody = {
        "documents": [
            {
            "language":"jp",
            "id" : 1,
            "text": document.querySelector("#url").value
            }
        ]
    };

    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'17a26f2fbc9240aebfb272df98928812'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false', initObject);

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