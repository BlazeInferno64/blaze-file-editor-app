const socket = io();

const forms = document.querySelector("#forms");

const wordsLimit = document.querySelector('#lim');

const inputField = document.querySelector(".input-field");

const saveField = document.querySelector(".save-field");

const txtBox = document.querySelector(".txt1");

const saveBtn = document.querySelector(".btn");

const menu = document.querySelector("#menu");

const menuList = document.querySelector(".list");

const selectExtension = document.querySelector(".ext-name");


const logBtn = document.querySelector("#log");
const resetBtn = document.querySelector("#reset");
const copyBtn = document.querySelector("#copy");


const progress = document.querySelector(".progress");

const progressBarFluid = document.querySelector(".fluid");

const progressInfo = document.querySelector("#show");

const popupBar = document.querySelector(".alert");
const popupBarText = document.querySelector("#info");


const checkBtn = document.querySelector("#check");

const closeBtn = document.querySelector(".close");


const userPrompt = document.querySelector("#prompt");

const joinBtn = document.querySelector(".join-btn");

const usernameInput = document.querySelector(".field");

const Body = document.querySelector("body")


forms.addEventListener("submit",(e) =>{
    e.preventDefault();
})

inputField.addEventListener("input",(e) => {
    const str = inputField.value;
    const val = str.slice(0,2);

    if(inputField.value.length >= 100){
        wordsLimit.classList.add("yellow");
        wordsLimit.classList.remove("green-light");
    }
    if(inputField.value.length < 100){
        wordsLimit.classList.remove("yellow");
        wordsLimit.classList.add("green-light");
    }
    if(inputField.value.length >= 2){
        saveField.value = val;
    }
    if(inputField.value.length > 0){
      //  saveBtn.classList.remove("no-event")
      //console.log(e);
    }
    if(inputField.value.length <=0){
        saveField.value = '';
        wordsLimit.classList.remove("green-light");
        wordsLimit.classList.remove("yellow");
      //  saveBtn.classList.add("no-event")
    }

    wordsLimit.innerText = `${inputField.value.length} Words`;
})

forms.addEventListener("input",(e) => {
    if(inputField.value.length <= 0){
        saveBtn.classList.add("no-event");
    }
    if(saveField.value.length <= 0){
        saveBtn.classList.add("no-event");
    }
    else{
        saveBtn.classList.remove("no-event")
    }
})

/*document.addEventListener("keydown",(e) => {
    if(e.keyCode === 13){
        if(inputField.value.length <=0){
            inputField.focus();
        }
    }
})*/




menu.addEventListener("click",(e) => {
    menuList.classList.toggle("none");
    menu.classList.toggle("active");
})


usernameInput.addEventListener("input",(e) => {
    if(usernameInput.value.length <=0){
        joinBtn.classList.add("no-event");
    }
    else{
        joinBtn.classList.remove("no-event");
    }
})

usernameInput.addEventListener("keydown",(e) => {
    if(e.keyCode === 13){
        if(usernameInput.value.length <=0){
            alert("Please enter a username first!")
            usernameInput.focus();
        }
        else{
         alertNewUser(usernameInput.value);  
         userPrompt.classList.add("hide"); 
        }
    }
})

document.addEventListener("keydown",(e) => {
    if(e.keyCode === 13){
        if(userPrompt.className == 'user-prompt hide'){

        }
        else{
            if(usernameInput.value.length <=0){
                alert("Please enter a username first!")
                usernameInput.focus();
            }
            else{
             alertNewUser(usernameInput.value);  
             userPrompt.classList.add("hide"); 
            }
        }
    }
})

joinBtn.addEventListener("click",(e) => {
    alertNewUser(usernameInput.value);
    userPrompt.classList.add("hide");
   // alert("hi")
})

/*document.addEventListener("click",function(event){
    if(event.target !== menu){
        menuList.classList.add("none");
        menu.classList.remove("active");
    }
})*/

document.addEventListener("dblclick",function(event){
        menuList.classList.add("none");
        menu.classList.remove("active");

        popupBar.style.bottom = '-100%';
})


Body.addEventListener("load",(e) => {
    
})

closeBtn.addEventListener("click",(e) => {
    popupBar.style.bottom = '-100%';
})

copyBtn.addEventListener("click",(e) => {
    copyBtn.innerText = 'Copying...';
    setTimeout(() => {
        popupBar.style.bottom = '10%';
        popupBarText.innerText = 'Successfully Copied!';
        copyBtn.innerHTML = '<span></span><i class="fa fa-clone"></i>  Copy Text<span></span>';
    }, 2000);
})

/*resetBtn.addEventListener("click",(e) => {
    resetBtn.innerText = 'Reseting...';
    setTimeout(() => {
        inputField.value = '';
        saveField.value = '';
        popupBar.style.bottom = '10%';
        popupBarText.innerText = 'Successfully Reseted!';
    }, 2000);
})*/


resetBtn.onclick = function(e){
    resetBtn.innerText = 'Reseting...';
    setTimeout(() => {
        inputField.value = '';
        saveField.value = '';
        wordsLimit.innerText = '0 Words';
        wordsLimit.classList.remove("yellow");
        wordsLimit.classList.remove("green");
        popupBar.style.bottom = '10%';
        popupBarText.innerText = 'Successfully Reseted!';
        resetBtn.innerHTML = '<span></span><i class="fa fa-redo"></i>  Reset<span></span>';
    }, 2000);
}
logBtn.addEventListener("click",(e) => {
    logBtn.innerText = 'logging out...';
    socket.emit("exit-user",usernameInput.value);
    setTimeout(() => {
        menuList.classList.add("none");
        userPrompt.classList.remove("hide");
        popupBar.style.bottom = '10%';
        popupBarText.innerText = 'Successfully logged out!';
        logBtn.innerHTML = '<span></span><i class="fa fa-power-off"></i>  Log Out<span></span>';
    }, 3500);
})
const Filevalues = {
    filename: saveField.value,
    filevalue: inputField.value,
    fileExtension: selectExtension.options[selectExtension.selectedIndex].text
}

function save(){
    localStorage.setItem(saveField.value+selectExtension.options[selectExtension.selectedIndex].text,inputField.value);
}

function saveAsAllFile(){
    localStorage.setItem(saveField.value,inputField.value);
}
saveBtn.addEventListener("click",(e) => {
    // socket.emit('new-file')
    e.preventDefault();
        setTimeout(() => {
            progress.style.bottom = '-100%';
            popupBar.style.bottom = '10%';
            popupBarText.innerText = 'Successfully Downloaded!';
        }, 8500);

    if(selectExtension.options[selectExtension.selectedIndex].text == '.txt'){
        if(checkBtn.checked == true){
            save();
        }
        setTimeout(() => {
            saveFileWithExtensionTxt();
        }, 9000);
        broadcastFile();
        showProgress();
    }
    if(selectExtension.options[selectExtension.selectedIndex].text == '.json'){
        if(checkBtn.checked == true){
            save();
        }
        setTimeout(() => {
            saveFileWithExtensionJson();
        }, 9000);
        broadcastFile();
        showProgress();
    }
    if(selectExtension.options[selectExtension.selectedIndex].text == '.css'){
        if(checkBtn.checked == true){
            save();
        }
        setTimeout(() => {
            saveFileWithExtensionCss();
        }, 9000);
        broadcastFile();
        showProgress();
    }
    if(selectExtension.options[selectExtension.selectedIndex].text == '.html'){
        if(checkBtn.checked == true){
            save();
        }
        setTimeout(() => {
            saveFileWithExtensionHtml();
        }, 9000);
        broadcastFile();
        showProgress();
    }
    if(selectExtension.options[selectExtension.selectedIndex].text == '.js'){
        if(checkBtn.checked == true){
            save();
        }
        setTimeout(() => {
            saveFileWithExtensionJs();
        }, 9000);
        broadcastFile();
        showProgress();
    }
    if(selectExtension.options[selectExtension.selectedIndex].text == 'All Files'){
        if(checkBtn.checked == true){
            saveAsAllFile();
        }
        setTimeout(() => {
            saveFileWithExtensionAllFile();
        }, 9000);
        broadcastFile();
        showProgress();
    }
 
 })

function alertNewUser(username){
    socket.emit("new-user",username);
}


function saveFileWithExtensionTxt(){
    const link = document.createElement("a");
    const content = inputField.value;
    const file = new Blob ([content], {type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = `${saveField.value}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    //alert("File is successfully saved!")
}

function saveFileWithExtensionJs(){
    const link = document.createElement("a");
    const content = inputField.value;
    const file = new Blob ([content], {type: 'text/javascript'});
    link.href = URL.createObjectURL(file);
    link.download = `${saveField.value}.js`;
    link.click();
    URL.revokeObjectURL(link.href);
    //alert("File is successfully saved!")
}

function saveFileWithExtensionCss(){
    const link = document.createElement("a");
    const content = inputField.value;
    const file = new Blob ([content], {type: 'text/css'});
    link.href = URL.createObjectURL(file);
    link.download = `${saveField.value}.css`;
    link.click();
    URL.revokeObjectURL(link.href);
    //alert("File is successfully saved!")
}

function saveFileWithExtensionHtml(){
    const link = document.createElement("a");
    const content = inputField.value;
    const file = new Blob ([content], {type: 'text/css'});
    link.href = URL.createObjectURL(file);
    link.download = `${saveField.value}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
    //alert("File is successfully saved!")
}

function saveFileWithExtensionJson(){
    const link = document.createElement("a");
    const content = inputField.value;
    const file = new Blob ([content], {type: 'application/json'});
    link.href = URL.createObjectURL(file);
    link.download = `${saveField.value}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    //alert("File is successfully saved!")
}

function saveFileWithExtensionAllFile(){
    const link = document.createElement("a");
    const content = inputField.value;
    const file = new Blob ([content], {type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = `${saveField.value}`;
    link.click();
    URL.revokeObjectURL(link.href);
    //alert("File is successfully saved!")
}

/*const extension = selectExtension.options[selectExtension.selectedIndex].text;
const uname = usernameInput.value;
const content = inputField.value;*/

function broadcastFile(){
    socket.emit("File",{
        username: usernameInput.value,
        fileContent: inputField.value,
        fileName: saveField.value,
        fileExtension: selectExtension.options[selectExtension.selectedIndex].text
    });
}

let width = 1;

progressBarFluid.style.width = '0';
progressInfo.innerText = '0%';

function showProgress(){
    progress.style.bottom = '10%';
   // progressBarFluid.style.width = progressBarFluid.style.width;
    //document.querySelector("#show").innerText =   document.querySelector("#show").innerText;
   /* setInterval(() => {
        if(width >= 100){
            //progressBarFluid.style.width = '0';
        }
        else{
            width++;
            progressBarFluid.style.width = `${width}%`;
            document.querySelector(".show").innerText = `${width}%`;
        }
    }, 10);*/
    setTimeout(() => {
        progressBarFluid.style.width = `0%`;
        document.querySelector(".show").innerText = `0%`;
    }, 500);   
    setTimeout(() => {
        progressBarFluid.style.width = `25%`;
        document.querySelector(".show").innerText = `25%`;
    }, 2500);

    setTimeout(() => {
        progressBarFluid.style.width = `50%`;
        document.querySelector(".show").innerText = `50%`;
    }, 4000);
    setTimeout(() => {
        progressBarFluid.style.width = `75%`;
        document.querySelector(".show").innerText = `75%`;
    }, 5000);
    setTimeout(() => {
        progressBarFluid.style.width = `100%`;
        document.querySelector(".show").innerText = `100%`;
    }, 6000);
}

//socket.emit("disconnect",usernameInput.value);
