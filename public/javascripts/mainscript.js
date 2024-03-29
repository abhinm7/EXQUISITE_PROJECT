let menD,womD,casD,menData,womenData,casualData;

fetch('/login')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

    menD = data.products;
    womD = data.productsw;
    casD = data.productsc;
   
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  
    function search() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
  
      // Search for the data in menData
      let result = menData.find(result => result.name.toLowerCase()=== searchInput);
      let index = menData.indexOf(result);
      
      // If not found in menData, search in womenData
      if (index === -1) {
          result = womenData.find(result => result.name.toLowerCase() === searchInput);
          index = womenData.indexOf(result);
      }
      
      // If not found in womenData, search in casualData
      if (index === -1) {
          result = casualData.find(result => result.name.toLowerCase() === searchInput);
          index = casualData.indexOf(result);
      }
  
      if (result) {
          let productid=result.productId;
          console.log(`Found ${result.name} at index ${index} id = ${productid}`);
          openPopup(index,productid);
          
      } else {
          console.log("Not found");
      }
      
  
  }

  
    let section,mlimit=0,wlimit=0,climit=0;
    
    function createProductCardM()
    {
      section='men';
      mlimit+=1;
      createProductCard();
    } 
    function createProductCardW()
    {
      section='women';
      wlimit+=1;
      createProductCard();
    }
    function createProductCardC()
    {
      section='casual';
      climit+=1;
      createProductCard()
    }
    
  
    function createProductCard(){
      setTimeout(function() {
        
        menData   =   menD;
        womenData =   womD;
        casualData=   casD;


        let productData;
      if(section=='men'){
        document.getElementById('productContainers').style.display = 'none';
        const productContainer=document.getElementById('productContainer');
        productContainer.style.display='grid';
        document.getElementById('productContainerW').style.display='none';
        document.getElementById('productContainerC').style.display='none';
        productData=menData;
      }
      else if(section=='women'){
        document.getElementById('productContainers').style.display = 'none';
        const productContainerW=document.getElementById('productContainerW');
        productContainerW.style.display='grid';
        document.getElementById('productContainer').style.display='none';
        document.getElementById('productContainerC').style.display='none';
        productData=womenData;
      }
      else if(section=='casual'){
        const productContainerC=document.getElementById('productContainerC');
        productContainerC.style.display='grid';
        document.getElementById('productContainerW').style.display='none';
        document.getElementById('productContainer').style.display='none';
        productData=casualData;
      }
        productData.forEach((product,index) =>{
        const productCard = document.createElement('div');
        productCard.classList.add('cont', 'page-wrapper');
        productCard.innerHTML=`<div class="page-inner">
        <div class="row">
            <div class="el-wrapper">
                <div onclick="openPopup(${index},${product.productId})" class="box-up">
                    <img class="img" src="${product.img}" alt="">
                    
                    <div class="img-info">
                        <div class="info-inner">
                            <span class="p-name">${product.name}</span>
                            <span class="p-company">${product.company}</span>
                          <p></p>
                        </div>
                        <div class="a-size">Available sizes: <span class="size">${product.availableSizes}</span></div>
                    </div>
                </div>
                <div class="box-down">
                    <div class="h-bg">
                        <div class="h-bg-inner"></div>
                    </div>
                    <a onclick="cartAdd(${index},${product.productId})" class="cart">
                        <span class="price">${product.price}</span>
                        <span  class="add-to-cart">
                            <span class="txt">Add to cart</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>`;
  if(section=='men' && mlimit==1){
    productContainer.appendChild(productCard);
  }
  else if(section=='women' && wlimit==1){
    productContainerW.appendChild(productCard);
  }
  else if(section=='casual' && climit==1){
    productContainerC.appendChild(productCard);
  }
    });
  closeCart();
      }, 100);
      
    }
  
   setTimeout(()=>{
    createProductCardM();
   },50)
    
  
  
  function openPopup(index,productId) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    setTimeout(() => {
      document.getElementById('popup').style.opacity = '1';
    }, 10);
      
      let data;
      const popup= document.getElementById('popup');
      if(productId>=111 && productId<=119){
        data=menData[index];
      }
      else if(productId>=211 && productId<=219){
        data=womenData[index];
      }
      else if(productId>=311 && productId<=319){
          data=casualData[index];
      }
      console.log(productId);
      console.log(data);
      
      const product=data;
      popup.innerHTML=`
      <span class="close-btn" onclick="closePopup()">&times;</span>
  
      <div class="ppDiv">
  
        <div class="fpDiv">
  <img class="imgP" src="${product.img}" alt="">
        </div>
        <div class="spDiv">
          <h2 class="itemP">${product.name}</h2>
          <p class="pbrand">${product.company}</p>
          <p class="itemP">
          <div class="buttonSize">
          <button class="sizeB" onclick=size(s)>S</button>
          <button class="sizeB" onclick=size(x)>X</button></p>
          <button class="sizeB" onclick=size(m)>M</button>
          <button class="sizeB" onclick=size(L)>L</button></div>
          
          <h3 class="priceP">${product.price}</h3>
          <button onclick="cartAdd(${index},${productId})" class="pButton">Add to cart</button>
          <button class="pButton">Buy</button>
  
      </div>
     
      
    </div> `;
  
  
    }
  
    function closePopup() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('popup').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
      }, 300);
    }
  
  
     let cartData,cart2 = {
      products: [],
      total: 0
  };
 
    function cartAdd(index,productId) {
  
      document.getElementById('cartInfo').style.display = 'block';
      setTimeout(() => {
        document.getElementById('cartInfo').style.opacity = '1';
      }, 10);
      
  
      const cart=document.getElementById('cartInfo');
      cart.innerHTML=`<h2 class="cartH" id="cartcount"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;:&nbsp;&nbsp;${cart2.products.length+1}</h2>
      </div>`;
  
  
      let Data;
      if(productId>100 && productId<200 ){
        Data=menData[index]; 
      }
      else if(productId>200 && productId<300)
      {
        Data=womenData[index];
      }
      else if(productId>300 && productId<400)
      {
        Data=casualData[index];
      }
      let cartdata=Data;
      cart2.products.push(cartdata);
      updateCart();
      
      
    }
    let finalAmount;
    function updateCart() {
      let cartCards = document.getElementById('cartCards');
      let cartProducts = cart2.products;
      let bagTotal=0,discount=0,deliveryCharge;
      cartData=cart2.products;
      const productIds = cartData.map(item => item.productId);
      console.log(cartData);
      document.getElementById('orderItems').value = JSON.stringify(cartData);

      cartCards.innerHTML='';
      if(cart2.products.length===0)
     {
      let cartCard0 = document.createElement('div');
      cartCard0.classList.add('cartCard0');
      cartCard0.innerHTML=`<h2>oops !!!</h2><br> <h1>your cart is empty</h1><br>
      <span onclick="closeCart()" class="closebtn2">Continue shoping ></span>`
      
      cartCards.appendChild(cartCard0);
     }
     else
     { 
      cartProducts.forEach((product, index) => {
      let cartCard = document.createElement('div');
      cartCard.classList.add('cartCard');
      cartCard.id = `cartCard_${index}`;
      
      cartCard.innerHTML =
          `<img class="cartPic" src="${product.img}">
            <div class="carditemtrash">
              <div class="cartItems">
                <p>${product.name}</p>
                <p>${product.company}</p>
                <p>${product.availableSizes}</p>
                <p>${product.price}</p>
              </div>
              <i class="fa-solid fa-trash trashIc" onclick="removeFromCart(${index})"></i>
            </div>`;
      bagTotal=product.price+bagTotal;
      let discountDec=(bagTotal/100)*10;
      discount=(discountDec).toFixed(2);
      cartCards.appendChild(cartCard);
      
  });
     }
      let itemsCount=cart2.products.length;
      let amt1=(bagTotal+686);
      let amt=amt1-discount;
      
      if(cart2.products.length===0){
         finalAmount=0;
      }
      else{
        finalAmount= amt.toFixed(2);
      }
      console.log("amount ",finalAmount);
  
      document.getElementById('itemsCount').textContent=`(${itemsCount}) items`;
      document.getElementById('total').innerHTML=`<s>${amt1}</s>&nbsp;&nbsp;&nbsp;${finalAmount}`;
      document.getElementById('deliveryCharge').textContent=deliveryCharge;
      document.getElementById('bagTotal').textContent=bagTotal;
      document.getElementById('discount').textContent=discount;
  
      console.log("bagTotal ",bagTotal);
      document.getElementById('bagPrice').value = JSON.stringify(bagTotal);
  }
  function viewCart(){
    document.getElementById('overlay').style.display = 'block';
      document.getElementById('cartInfo').style.display = 'none';
      document.getElementById('productContainers').style.display = 'none';
      document.getElementById('navbar').style.display="none";
      document.getElementById('popup').style.opacity = '0';
      document.getElementById('cartView').style.display = 'block';
      setTimeout(() => {
          document.getElementById('cartView').style.opacity = '1';
      }, 10); 
      
      // console.log(cartData);
  }
  
  function removeFromCart(index) {
      cart2.products.splice(index,1);
      let cartCardToDelete = document.getElementById(`cartCard_${index}`);
          
          cartCardToDelete.remove();
          updateCart();
  }
  
  
  
    function closeCart() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('cartInfo').style.display = 'block';
      document.getElementById('cartView').style.opacity = '0';
      document.getElementById('productContainers').style.display = 'block';
      document.getElementById('navbar').style.display='block';
      setTimeout(() => {
        document.getElementById('cartView').style.display = 'none';
      }, 300);   
  
    }
  
  
    function giveAddress(){
      document.getElementById('addressBox').style.display="block";
      document.getElementById('overlay').style.display = 'block';
      
    document.getElementById('addressBox').style.zIndex=1001;
    
    document.getElementById('overlay').style.zIndex =1000;
    }
  function closeAddress(){
    document.getElementById('addressBox').style.display="none";
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('overlay').style.zIndex=0;
  }
  
  function placeOrder(){
    console.log("hello");
    document.getElementById('confirmBox').style.display='block';
  }
  function closeConfirmBox(){
    document.getElementById('confirmBox').style.display='none';
  }



  
  
  