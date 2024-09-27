//get total
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catogery=document.getElementById('catogery');
let submit=document.getElementById('submit');
let mood='create';
let temp;
//console.log(title,price,taxes,ads,discount,total,count,catogery,submit);
//get total
function GetTotal(){
    if(price.value !=''){
        let res=(+price.value+ +taxes.value+ +ads.value)- (+discount.value);
        total.innerHTML=res;
        total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}
//create product
let datapro;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product);
}else{
    datapro=[];
}
submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catogery:catogery.value.toLowerCase()
    }
    if(title.value !=''&&price.value !=''&&catogery.value!=''&&newPro.count>100){
        if(mood==='create'){
            if(newPro.count>1){
                for(let i=0;i<newPro.count;i++){
                    datapro.push(newPro);
                }
            }else{
                datapro.push(newPro); 
            }
        }else{
            datapro[temp]=newPro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
        ClearData();
    }
  
   
    
    //save localstorge
    localStorage.setItem('product',JSON.stringify(datapro));
    ClearData();
    ShowData();
}

//clear input
function ClearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
   count.value='';
    catogery.value='';
}
//read
function ShowData(){
    GetTotal();
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].catogery}</td>
                        <td><button onclick="UpdateData(${i})" id="btn">Update</button></td>
                        <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteall');
    //count
    if(datapro.length>0){
        btnDelete.innerHTML=`
        <button onclick="DeleteAll()">Delete All${datapro.length}</button>
        `
    }else{
        btnDelete.innerHTML='';
    }
}
ShowData();
//delete data
function DeleteData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    ShowData();
}


//delete all
function DeleteAll(){
    localStorage.clear();
    datapro.splice(0);
    ShowData();
}
//update
function UpdateData(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
taxes.value=datapro[i].taxes;
discount.value=datapro[i].discount;
GetTotal();
count.style.display='none';
catogery.value=datapro[i].catogery;
submit.innerHTML='update';
mood='update';
temp=i;
scroll({
    top:0,
    behavior:'smooth',
})
}
//search
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById('search');
   if(id=='searchTitle'){
      searchMood='title'
      search.placeholder='Search By Title';
   }
   else{
      searchMood='catogery';
      search.placeholder='Search By Catogery';
   }
   search.focus();
   search.value='';
   ShowData();
}
function searchData(value){
    console.log(value);
    let table='';
   if(searchMood=='title'){
     for(let i=0;i<datapro.length;i++){
         if(datapro[i].title.includes(value.toLowerCase())){
            table+=`
            <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].catogery}</td>
                            <td><button onclick="UpdateData(${i})" id="btn">Update</button></td>
                            <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
                        </tr>
            `
         }
     }
   }
   else{
    for(let i=0;i<datapro.length;i++){
        if(datapro[i].catogery.includes(value.toLowerCase())){
           table+=`
           <tr>
                           <td>${i}</td>
                           <td>${datapro[i].title}</td>
                           <td>${datapro[i].price}</td>
                           <td>${datapro[i].taxes}</td>
                           <td>${datapro[i].ads}</td>
                           <td>${datapro[i].discount}</td>
                           <td>${datapro[i].total}</td>
                           <td>${datapro[i].catogery}</td>
                           <td><button onclick="UpdateData(${i})" id="btn">Update</button></td>
                           <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
                       </tr>
           `
        }
    }
   }
   document.getElementById('tbody').innerHTML=table;
}
//clean data