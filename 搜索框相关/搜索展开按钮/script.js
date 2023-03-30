const icon=document.querySelector(".icon");
const search=document.querySelector(".search");
icon.onclick=function(){
    search.classList.toggle("active");
};

const clear=document.querySelector(".clear");
const input=document.getElementsByTagName("input")[0];
clear.onclick=function(){
    input.value="";
}
