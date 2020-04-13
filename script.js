
var main=document.getElementById('root');
var pageResult="ProductsPage";
var loggedIn="";

var pageProducts =[
  {
    name:"kurtha",
    price:240,
    order:0
  },
  {
    name:"salwar",
    price:410,
    order:0
  },
  {
    name:"shirt",
    price:520,
    order:0
  },
  {
    name:"watch",
    price:260,
    order:0
  },
  {
    name:"shoes",
    price:170,
    order:0
  },
  {
    name:"wallet",
    price:120,
    order:0
  }
];

var users = [
  {
    uname:"jeyan",
    upass:"saran"
  },
  {
    uname:"saran",
    upass:"jeyan"
  }
]

var onCart = []

function pageClicked(page)
{
  if(page==="Login")
  {
    if(loggedIn==="")
    {
     pageResult="LoginForm";
    }
    else
    {
      userLogged("");
    }
  }
  else if(page==="Signup")  
  {
     pageResult="SignupForm";
  }
  else if(page==="Cart")  
  {
     pageResult="CartPage";
  }
  else if(page==="Products")  
  {
      pageResult="ProductsPage";
  }
  RenderContent();
}
RenderContent();



function RenderContent()
{
if(pageResult==="ProductsPage")
{
   var render= '<div class="products-panel">';
         
  pageProducts.map((con, i) => {
   
  render+=`<div class="product-box">
  <div class="product-name">${con.name}</div>
  <div class="product-price">₹${con.price}</div>
  <div class="product-cart" onclick="AddToCart(${i})">${con.order===0? "Add to cart" : "Added"}</div></div>`;
  
  })
  render+='</div>';
main.innerHTML = `<div>${render}</div>`;
}
else if (pageResult==="LoginForm")
{
  var render= `<div class="login-form">
  <div class="login-heading">Login Form</div>
  <div class="login-box">
  <div class="login-options">Username:</div>
  <input type="text" onChange="LoginUsernameChange(event)" value=${LoginUsername}>
  </div>
  <div class="login-box">
  <div class="login-options">Password:</div>
  <input type="password" onChange="LoginPasswordChange(event)" value=${LoginPassword}>
  </div>
  <div id="login-error"></div>
  <div class="login-box">
  <div class="login-button" onclick="pageClicked('Signup')">Signup</div>
  <div class="login-button" onClick="LoginSubmit()">Login</div>
  </div>
  </div>`;
main.innerHTML = `<div>${render}</div>`;
}
else if (pageResult==="SignupForm")
{
  var render= `<div class="login-form">
  <div class="login-heading">Signup Form</div>
  <div class="login-box">
  <div class="login-options">Username:</div>
  <input type="text" onChange="SignupUsernameChange(event)" value=${SignupUsername}>
  </div>
  <div class="login-box">
  <div class="login-options">Password:</div>
  <input type="password" onChange="SignupPasswordChange(event)" value=${SignupPassword}>
  </div>
  <div id="signup-error"></div>
  <div class="login-box">
  <div class="login-button" onclick="pageClicked('Login')">Login</div>
  <div class="login-button" onClick="SignupSubmit()">Signup</div>
  </div>
  </div>`;
main.innerHTML = `<div>${render}</div>`;
}
else if(pageResult==="CartPage")
{
   var render= '<div><div class="products-panel">';
         var productNo=0;
  pageProducts.map((con, i) => {
   if(con.order>0)
   {
     productNo++;
  render+=`<div class="product-box">
  <div class="product-name">${con.name}</div>
  <div class="product-price">₹${con.price*con.order}</div>
  <div class="cart-options">
  <div class="product-cart-add" onclick="AddOneToCart(${i})">+</div>
  ${con.order}
 <div class="product-cart-add" onclick="LessOneToCart(${i})">-</div></div>
  </div>`;
   }
  })
  render+=`</div>`;
  if(productNo===0)
   {
    render+=`<div class="cart-msg">Sorry no products have been added to the cart</div>`;
   }
   else
   {
    render+=`${loggedIn===""?`<div class="product-cart-options" onclick="pageClicked('Login')">Login to Order</div>`:`<div class="product-cart" onclick="PlaceOrder()">Place Order</div>`}`;
   }
   render+=` <div class="product-cart-options" onclick="pageClicked('Products')">Browse More</div>`;
  render+='</div>';
main.innerHTML = `<div>${render}</div>`;
}
}

//Adding the Products
function AddToCart(index)
{
  if(pageProducts[index].order===0)
  {
  pageProducts[index].order++; 
  RenderContent();
  }
}

function AddOneToCart(index)
{
  pageProducts[index].order++; 
  RenderContent();
}
function LessOneToCart(index)
{
  pageProducts[index].order--; 
  RenderContent();
}




//Login Form Functions
var LoginUsername="";
var LoginPassword="";


function LoginUsernameChange(event)
{
  LoginUsername=event.target.value;
}

function LoginPasswordChange(event)
{
  LoginPassword=event.target.value;
}

function LoginSubmit()
{
  let success = false;
  var loggedin="";
  users.map((user)=>
  {
      if(user.uname===LoginUsername && user.upass===LoginPassword)
      {
        success=true;
        loggedin=user.uname;
      }
      if(success)
      {
        userLogged(loggedin);
        LoginUsername="";
        LoginPassword=""
      }
      else
      {
        var error = document.getElementById("login-error");
        error.innerHTML = "wrong user credentials!!!";
        
      }
  })
}

//Signup Form
var SignupUsername="";
var SignupPassword="";

function SignupUsernameChange(event)
{
  SignupUsername=event.target.value;
}

function SignupPasswordChange(event)
{
  SignupPassword=event.target.value;
}

function SignupSubmit()
{
  let good = true;
 if(SignupUsername.length<3 || SignupUsername.length>10)
 {
  var error = document.getElementById("signup-error");
   error.innerHTML = "username length is wrong!!!";
   good=false;
 }
 else if(SignupPassword.length<3 || SignupPassword.length>10)
 {
  var error = document.getElementById("signup-error");
   error.innerHTML = " password length is wrong!!!";
   good=false;
 }
  if(good)
  {
    var error = document.getElementById("signup-error");
   error.innerHTML = "";
    let newUser={
      uname:SignupUsername,
      upass:SignupPassword
    }
    users=[...users,newUser];
    userLogged(SignupUsername);
    SignupUsername="";
    SignupPassword="";
  }
}

//Logging in
function userLogged(username)
{
  loggedIn=username;
  var loggedUser=document.getElementById("logged-user");
   loggedUser.innerHTML = loggedIn;
   var logged=document.getElementById("logged");
   logged.innerHTML = loggedIn===""? "login":"logout";
   pageClicked('Products'); 
}


//Placing order

function PlaceOrder()
{
  window.alert("your order is placed we'll reach you soon!!!");
  pageProducts.map((con, i) => {
    con.order=0;
  })
  pageClicked('Products'); 
}