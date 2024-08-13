

let setting_btn=document.querySelector(".setting")
setting_btn.addEventListener("click",()=>{
    window.location.href = '../dist/setting.html';
});







//////////////////////////////////////////////////////////////// table add and remove ////////////////////////////////////////////////////
let add_btn=document.querySelector(".add_btn");
let list =document.querySelector(".input_list");
let tableBody=document.querySelector(".tablebody")
let flag=true;
let arr_items=[];
// window.localStorage.clear();

window.addEventListener("DOMContentLoaded",async function(){
    arr_items= await get_from_db();
    tableBody.innerHTML="";
    for(let i=0;i<arr_items.length;i++){
        let element=`
        <tr class="bg-white border-b" id="${arr_items[i]._id}">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${arr_items[i].name}
            </th>
            <td class="px-6 py-4">
                ${arr_items[i].type}
            </td>
            <td class="px-6 py-4">
                ${arr_items[i].description}
            </td>
            <td class="px-6 py-4">
                ${arr_items[i].quantity}
            </td>
            <td class="px-6 py-4">
                <button href="#" class=" delete_btn font-medium text-red-600 hover:underline">Remove</button>
            </td>
        </tr>`;
        tableBody.innerHTML+=element;
    }
});




async function add_to_db(arr_items){

try {
    console.log("here");
    const response = await fetch('http://localhost:1000/additem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( arr_items),
    });
    
    const result = await response.text();
    console.log(result);
    return result;
} catch (error) {
    console.log('Error:', error);
}

}

add_btn.onclick= async function(){
if(flag===true){
    list.classList.remove("hidden");
    list.classList.add("flex","flex-wrap")
    flag=false;
}
else{
    let name=document.querySelector(".p_name").value;
    let type=document.querySelector(".p_color").value;
    let description=document.querySelector(".p_Category").value;
    let quantity=document.querySelector(".p_price").value;

    document.querySelector(".p_name").value="";
    document.querySelector(".p_color").value="";
    document.querySelector(".p_Category").value="";
    document.querySelector(".p_price").value="";
    ////
    if(name&&type&&description&&quantity){
            
        let id= await add_to_db({name,type,description,quantity});
    let element=`
            <tr class="bg-white border-b" id=${id}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    ${name}
                </th>
                <td class="px-6 py-4">
                    ${type}
                </td>
                <td class="px-6 py-4">
                    ${description}
                </td>
                <td class="px-6 py-4">
                    ${quantity}
                </td>
                <td class="px-6 py-4">
                    <button href="#" class=" delete_btn font-medium text-red-600 hover:underline">Remove</button>
                </td>
            </tr>`;
            tableBody.innerHTML+=element;
    
    
    
}
list.classList.remove("flex","flex-wrap")
list.classList.add("hidden");
flag=true;

   
}





};


async function get_from_db(){


    try {
        
        const response = await fetch('http://localhost:1000/getitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.text();
        let data=JSON.parse(result);
        return data;
    } catch (error) {
        console.log('Error:', error);
    }

    
    
    
    }

/// remove 
tableBody.addEventListener("click",function(e){
    
    let temp=e.target.parentElement
    let row=temp.parentElement;
    console.log(e.target);
    if(e.target.classList.contains("delete_btn")){
        let id=row.id;
        // console.log(id);
        remove_from_db(id);
        row.remove();
    }
});


async function remove_from_db(id){
    try {
        
        const response = await fetch('http://localhost:1000/deleteitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({_id:id}),
        });
        
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('Error:', error);
    }

}