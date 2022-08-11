const  createNav = () => {
    let nav = document.querySelector('.navbar')

    nav.innerHTML = `
    <div class="nav">
    <h2>SweetScents</h2>
   <!--<img src="/images/IMG_20210925_101931.JPG" alt="SweetScent Logo" class="brand-logo">-->
    <div class="nav-items">
        <div class="search">
            <input type="text" class="search-box" placeholder="search perfumes">
            <button class="search-btn">Search</button>
        </div>
        <a>
            <img src="/images/profile2.png" id="user-img"  alt="">
            <div class="login-logout-popup hide">
                <p class="account-info">Log in as, name</p>
                <button class="btn" id="user-btn"> Log Out </button>
            </div>
        </a>
        <a href="cart.html" class="cart"><img src="/images/cart2.png" alt="cart"><span>0</span></a>
    </div>

</div>
<ul class="links-container">
    <li class="link-item"><a href="#" class="link">Home</a> </li>
    <li class="link-item"><a href="#" class="link">Perfume</a> </li>
    <li class="link-item"><a href="#" class="link">Eau de Perfume</a> </li>
    <li class="link-item"><a href="#" class="link">Eau de Toilette</a> </li>
    <li class="link-item"><a href="#" class="link">Eau de Cologne</a> </li>
    <li class="link-item"><a href="#" class="link">Eau Fraiche</a> </li>
</ul>
                `;
}

createNav();

// nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-img');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null){
        // means user is logged in
        popuptext.innerHTML = `log in as, ${user.name}`;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    }else {
        // user is logged out
        popuptext.innerHTML = 'log in to place order';
        actionBtn.innerHTML = 'log in';
        actionBtn,addEventListener('click', () => {
            location.href = '/login.html';
        })
    }
}