function createTableHeader(tableId){
    
    var table = document.querySelector("#" + tableId);
    var row = table.insertRow();
    row.innerHTML = '<th>ProductId</th><th>Type</th><th>Price</th><th>Examin</th>'
  
}

function updateTable(tableId,productArray){
    var tableBody = document.querySelector("#"+tableId);
    //reset table
    while (tableBody.hasChildNodes()) {   
        tableBody.removeChild(tableBody.firstChild);
    }
    //create table header
    createTableHeader(tableId);
    //populate table rows
    for (i = 0; i < productArray.length; i++) {
        let tr = tableBody.insertRow();
        tr.innerHTML += "<td>" + productArray[i].id + "</td>"
        tr.innerHTML += "<td>" + productArray[i].type + "</td>"
        tr.innerHTML += "<td>" + productArray[i].price + "</td>"
        let productId = productArray[i].id;
        tr.innerHTML += "<button onclick='examine(this)'>Examine</button>"

  }  
}

function updateExaminedText(product){
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.querySelector("#productText").innerHTML = outputString;
}

function getIntersection(arrA,arrB,searchedId){

    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);     
        });
    });

    return similarArray;

}

function processSearchId(searchId){
    api.searchProductById(searchId).then(function(val){
        return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
    }).then(function(val){
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert(val);
    });
}

function processSearchType(searchType){
    api.searchProductsByType(searchType).then(function(val){
        updateExaminedText(val[2]);
        updateTable('similarTable',val);
    }).catch(function(val){
        alert(val);
    });
}

function processSearchPrice(searchType, searchPrice){
    api.searchProductsByPrice(searchPrice, 50).then(function(val){
        return Promise.all([api.searchProductsByPrice(searchPrice, 50),
                            api.searchProductsByType(searchType),val]);
    }).then(function(val){
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert(val);
    });
}

function examine(target) {
    processSearchId(target.parentNode.firstChild.innerHTML);
}

api.searchAllProducts().then(function(value){
    updateTable('allTable',value);
});

document.querySelector("#inputButtonId").addEventListener('click',function(){
    processSearchId(document.querySelector('#inputId').value);
});

document.querySelector("#inputButtonId").addEventListener('click',function(){
    processSearchId(document.querySelector('#inputId').value);
});

document.querySelector("#inputButtonType").addEventListener('click',function(){
    processSearchType(document.querySelector('#inputType').value);
});

document.querySelector("#inputButtonPrice").addEventListener('click',function(){
    processSearchPrice(document.querySelector('#inputType').value,
                       document.querySelector('#inputPrice').value);
});