const cart = [];
const count = document.getElementById('cartCount');
const summary = document.getElementById('cartSummary');
const items = document.getElementById('cartItems');
const orderBtn = document.getElementById('orderBtn');

function faNum(n){return String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);}
function updateCart(){
  count.textContent = faNum(cart.length);
  summary.textContent = cart.length ? `${faNum(cart.length)} مورد در سبد خرید` : 'سبد خرید شما خالی است.';
  items.textContent = cart.length ? cart.map((p,i)=>`${faNum(i+1)}. ${p}`).join('، ') : 'هنوز محصولی انتخاب نشده است.';
  const message = cart.length
    ? 'سلام، برای سفارش این موارد از کافی‌نت رضا راهنمایی می‌خواهم: ' + cart.join('، ')
    : 'سلام، برای خرید از کافی‌نت رضا راهنمایی می‌خواهم.';
  orderBtn.href = 'https://wa.me/989024356801?text=' + encodeURIComponent(message);
}
document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click',()=>{
    cart.push(btn.dataset.product);
    updateCart();
    btn.textContent='اضافه شد ✓';
    setTimeout(()=>btn.textContent='افزودن به سبد',1000);
  });
});
document.getElementById('searchProducts').addEventListener('input',e=>{
  const q=e.target.value.trim().toLowerCase();
  document.querySelectorAll('.product-card').forEach(card=>{
    card.style.display=card.dataset.name.toLowerCase().includes(q)?'':'none';
  });
});
document.getElementById('menuToggle').addEventListener('click',()=>{
  document.getElementById('mainNav').classList.toggle('open');
});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));
updateCart();
