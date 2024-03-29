const selectElement = document.getElementById("mySelect");

        selectElement.addEventListener("change", function() {
            const selectedOption = selectElement.value;
            console.log(`Selected option: ${selectedOption}`);

            if(selectedOption==1)
            {
                viewCustomers();
            }
            if(selectedOption==2)
            {
                viewUserdata();
            }
            if(selectedOption==3)
            {
                viewOrders();
            }
            if(selectedOption==4)
            {
                viewOrderDetails();
            }
            if(selectedOption==5)
            {
                viewItems();
            }
        });



    function viewCustomers(){
        document.getElementById('userData').style.display='none';
        document.getElementById('Customers').style.display='block';
        document.getElementById('orders').style.display='none';
        document.getElementById('orderdetails').style.display='none';
        document.getElementById('items').style.display='none';
    }
    function viewUserdata(){
        document.getElementById('Customers').style.display='none';
        document.getElementById('userData').style.display='block';
        document.getElementById('orders').style.display='none';
        document.getElementById('orderdetails').style.display='none';
        document.getElementById('items').style.display='none';
    }
    function viewOrders(){
        document.getElementById('Customers').style.display='none';
        document.getElementById('userData').style.display='none';
        document.getElementById('orders').style.display='block';
        document.getElementById('orderdetails').style.display='none';
        document.getElementById('items').style.display='none';
    }
    function viewOrderDetails(){
    document.getElementById('Customers').style.display='none';
    document.getElementById('userData').style.display='none';
    document.getElementById('orders').style.display='none';
    document.getElementById('orderdetails').style.display='block';
    document.getElementById('items').style.display='none';
}
    function viewItems(){
        document.getElementById('Customers').style.display='none';
        document.getElementById('userData').style.display='none';
        document.getElementById('orders').style.display='none';
        document.getElementById('orderdetails').style.display='none';
        document.getElementById('items').style.display='block';
    }

viewItems();

function editItem(id,name,price,company){
    document.getElementById('editBox').style.display='block';
    document.getElementById('idInput').value=JSON.stringify(id);
    document.getElementById('nameInput').value=name;
    document.getElementById('compInput').value=company;
    document.getElementById('priceInput').value=price;

}
function closeEdit(){
    document.getElementById('editBox').style.display='none';
}

