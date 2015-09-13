
function getCurrentTabTitle(callback) {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    var tab = tabs[0];

    var title = tab.title;

    var res = title.split("-");

    console.assert(typeof title == 'string', 'tab.title should be a string');

    callback(res[0]);
  });
};

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
  document.getElementById('info').textContent = "Leave your info here and we'll find someone for you!";
};


document.addEventListener('DOMContentLoaded', function() {
    var restaurantName;

    getCurrentTabTitle(function(title) {
        renderStatus('You are at: ' + title);
        restaurantName = title;
    });
    
    var currentName;
    var currentEmail;
    var currentDate;

    var form = document.forms.myform;
    var elem = form.elements;
    elem.find.onclick = function(){

        if(!elem.name.value){
            document.getElementById('findText').textContent = "Input Name not valid";
            elem.name.focus();
            return false;
        }
        if(!elem.email.value){
            document.getElementById('findText').textContent = "Input email not valid";
            elem.email.focus();
            return false;
        }
        if(!elem.date.value){
            document.getElementById('findText').textContent = "Input data not valid";
            elem.date.focus();
            return false;
        }
        currentName = elem.name.value;
        currentEmail = elem.email.value;
        currentDate = elem.date.value;


        document.getElementById('findText').style.color = "black";
        document.getElementById('findText').textContent = "Thanks for submitting your info";

        

        return true;
    };



    var findResult = document.getElementById('myButton');
    // onClick's logic below:
        findResult.addEventListener('click', function() {
                Parse.initialize("gv8ORqGFC7atYHqmQjsKw3hStqeWl6aOlLRRI1g2", "I18bPzuM8y5S0ySZtuZhGikp3lePgWtivmxANM60");
                
                var TestObject = Parse.Object.extend("TestObject");
                var testObject = new TestObject();



                testObject.save({name:currentName,email:currentEmail,date:currentDate,restaurant:restaurantName}).then(function(object) {
                  
                //document.getElementById('wujiaxi').textContent = "wujiaxi shabi";      

/*
                var lotsOfWins = new Parse.Query(TestObject);
                lotsOfWins.equalTo("date", "13/09/2015");

                var fewWins = new Parse.Query(TestObject);
                fewWins.equalTo("resturant", "fuckU");

                var query = Parse.Query.and(lotsOfWins, fewWins);

*/
                var aquery = new Parse.Query(TestObject);
                var tempresult = aquery.equalTo("date", currentDate);
                var query = tempresult.equalTo("restaurant", restaurantName);
/*
                query.first({
                  success: function(object) {
                    // Successfully retrieved the object.
                    document.getElementById('wujiaxi').textContent = "Go and contact: " + object.get('email');      

                   },
                  error: function(error) {
                    document.getElementById('wujiaxi').textContent = "No one is here for you lol" 
                  }
                });
*/
                query.find({
                  success: function(comments) {
                    // Comments now contains the last ten comments, and the "post" field
                    // has been populated. For example:
                    if (comments.length >= 2){
                        for (var i = 0; i < comments.length; i++) {
                            if(comments[i].get('email') !== currentEmail){
                                document.getElementById('wujiaxi').textContent = "Go and Contact: " + comments[i].get('email'); 
                            }
                        }       
                        
                    }
                    else{
                        document.getElementById('wujiaxi').textContent = "No one is here for you lol" 

                    }
                  }
                });

                });
    });




    
});

