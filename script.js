

let tab1 = document.querySelector(".tab1")
let tab2 = document.querySelector(".tab2")
let sect= document.querySelector(".sect")
let chap= document.querySelector(".chap")
let chapgrp = document.querySelector(".chapgrp")
let lines = document.querySelector(".lines")
let explanation = document.querySelector(".explanation")
let head = document.querySelector(".head")
let head1 = document.querySelector(".head1")
let head2 = document.querySelector(".head2")
let head3 = document.querySelector(".head3")
let head4 = document.querySelector(".head4")
let head5 = document.querySelector(".head5")
let error = document.querySelector(".error")
let searchbar = document.querySelector("#searchbar")

let kural=1;
let language="tamil";//initially tamil content is diaplayed

function getData(value){
    //alert(value)
    
    changestyle(value);
    api(kural);

}
function changestyle(value){
   // alert(value)
   if(value=="tamil"){
       language="tamil";
       tab1.style.color="rgb(143, 34, 34)"
       tab1.style.borderBottom="5px solid rgb(143, 34, 34)"
       tab1.style.backgroundColor="white"
    //    tab1.style.backgroundColor="rgb(236, 169, 169)";

    tab2.style.color="gray";
    tab2.style.borderBottom="1px solid black";
    tab2.style.backgroundColor="rgb(214, 213, 213)";
   }else if(value=="english"){
       language="english";
    tab2.style.color="rgb(235, 47, 235)";
    tab2.style.borderBottom="5px solid rgb(235, 47, 235)";
    tab2.style.backgroundColor="white";
    // tab2.style.backgroundColor="rgb(199, 175, 230)";

    tab1.style.color="gray";
    tab1.style.borderBottom="1px solid black";
    tab1.style.backgroundColor="rgb(214, 213, 213)";
   }
}

function search(){
    if(searchbar.value>0 && searchbar.value<=1330){
        // error.style.display="none"
        kural = Number(searchbar.value);
       // console.log(kural)
        api(kural);
    }else{
        // error.innerHTML="ERROR : ONLY FROM 1 TO 1330"
        // error.style.display="block"
        appear("kural only from 1 to 1330")
    }
    //console.log(kural);
    
}

function api(number){
    //console.log("number",number)
    let url=`https://api-thirukkural.vercel.app/api?num=${number}`;
    fetch(url)
    .then((res)=>res.json())
    .then(function(data){
        if(language=="english"){
            //console.log("kural in english");
            head.innerHTML="Thirukural";
            head1.innerHTML="Section"+" : ";
            head2.innerHTML="Chapter"+" : ";
            head3.innerHTML="Chapter group"+" : ";
            head4.innerHTML="Lines"+" : ";
            head5.innerHTML="Explanation"+" : ";
            sect.innerHTML=data['sect_eng']
            chap.innerHTML=data['chap_eng']
            chapgrp.innerHTML=data['chapgrp_eng']
            lines.innerHTML=data['eng']
            explanation.innerHTML=data['eng_exp']
           
        }else{
            //console.log("kural in tamil");
            head.innerHTML="????????????????????????????????? ????????????????????????";
            head1.innerHTML="????????????"+" : ";
            head2.innerHTML="????????????????????????"+" : ";
            head3.innerHTML="???????????????????????? ?????????"+" : ";
            head4.innerHTML="???????????????"+" : ";
            head5.innerHTML="????????????????????????"+" : ";
            sect.innerHTML=data['sect_tam']
            chap.innerHTML=data['chap_tam']
            chapgrp.innerHTML=data['chapgrp_tam']
            lines.innerHTML=`${data['line1']} <br> ${data['line2']}`
            explanation.innerHTML=data['tam_exp']
               }
    })
    .catch((err)=>console.log(err));
}

api(kural); // run once to display first kural when page loads

function prev(){
    if(kural<1){
       appear("Reached first kural / ??????????????? ??????????????? ????????????????????????")
    }else{
        kural-=1;
        //console.log(kural);
        api(kural)
    }
}

function next(){
    if(kural>1330){
        appear("Reached last kural 1330 / ??????????????? ??????????????? ????????????????????????")
    }else{
        kural+=1;
        //console.log(kural)
        api(kural);
    }
}

//for error message to appear and disappaear
function appear(value){
    document.querySelector(".message").innerHTML=value;
    document.getElementById("confirm").style.display="block";
    document.querySelector("#searchbar").disabled=true
    document.querySelector(".searchbtn").disabled=true
   
}
function disappear(){
    document.getElementById("confirm").style.display="none";
    searchbar.setAttribute("disabled",false);
    document.querySelector("#searchbar").disabled=false
    document.querySelector(".searchbtn").disabled=false
}