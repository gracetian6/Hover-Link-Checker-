links = document.getElementsByTagName('a');

for (i = 0;  i < links.length; i++) { //for every link, create a mouseover event 
    links[i].onmouseover = function () { 
        //saves default style to oldStyle attribute
        if (this.hasAttribute("oldStyle") == false){ //checks whether oldstyle attribute exists 
            var old = this.getAttribute("style"); 
            this.setAttribute("oldStyle", old);
        }
        //console.log(this.href);
        if (this.href != ""){
            firstStatus = status1(this.href); 
            //when link response from status 1 is fast
            if (firstStatus >= 200 && firstStatus <=399 ){ 
                validLink(this);      
            }   
            //when link response from status 1 is slow / not complete
            else if (firstStatus == 0){ 
                status2(this);
            }

            //when status1 returns a bad response 
            else{ //console.log("else condition");
                invalidLink(this);
            }
        }   
    }
}

function status1(url){ //checks the link status synchronously
    var xhr = new XMLHttpRequest();
    try {
        xhr.open("GET", url, false);
        xhr.send(); 
        //console.log("status1(",url,")", xhr.status); 
        return xhr.status;
    }
    catch (err){
        //console.log('status1 error:', url, xhr.status);
        return xhr.status;
    }
}

function status2(thisLink){ //checks the link status asynchronously when status1 gives response 0
    var xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = function() {
        //console.log('ASYNC:', thisLink.href, xhr.readyState, xhr.status);
        if (xhr.readyState == 4){ //when url response is ready, check linkstatus 
            if (xhr.status >= 400 && xhr.status <=599) { // invalid link
                validLink(thisLink);
            }
            else if (xhr.status != 0) {validLink(thisLink);}
            //do nothing if xhr.status = 0
        }
    };
    xhr.open("GET", thisLink.href, true);
    xhr.send();
}

function validLink(thisLink) { //changes doc to show it is valid 
    chrome.storage.sync.get( //get greenBox and greenBoxTime values from popup saved to chrome.storage
        ['greenBox', 'greenBoxTime'], function(result) { 
        //console.log(result);
        if (result.greenBox == true){
            thisLink.style['background-color'] = "lightgreen";
            thisLink.style.color = "black";
            if (result.greenBoxTime == '2'){
                setTimeout(function() {
                    thisLink.style = thisLink.getAttribute("oldStyle"); 
                }, 2000);            
            }
            else if (result.greenBoxTime == '5'){
                setTimeout(function() {
                    thisLink.style = thisLink.getAttribute("oldStyle"); 
                }, 5000);  
            }
        }
    });
}

function invalidLink(thisLink){ //changes doc to show link is invalid
    chrome.storage.sync.get( //get unclickable and strikethrough values from popup saved to chrome.storage
        ['unclickable', 'strikethrough'], function(result) {
        if (result.unclickable == true){
            thisLink.removeAttribute("href"); //remove url
        }
        if (result.strikethrough == true){
            thisLink.style.setProperty("text-decoration", "line-through"); //strikethrough link
        }
    });         
}




    






