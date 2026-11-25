(() => {
"use strict";
const cfg = window.PCREZA_CONFIG || {};
const WA = cfg.WHATSAPP_NUMBER || "989024356801";
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const fa = n => Number(n).toLocaleString("fa-IR");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const toast = msg => { const el=$("#toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2600); };
const wa = message => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(message)}`,"_blank","noopener");
const defaultGroups = [
{category:"خدمات خودرو",icon:"🚘",items:["ثبت‌نام و پیگیری ایران‌خودرو","ثبت‌نام و پیگیری سایپا","ثبت‌نام بهمن موتور و کرمان موتور","ثبت‌نام خودروهای وارداتی و اقساطی","نوبت‌دهی تعویض پلاک","پرداخت خلافی خودرو","پرداخت عوارض آزادراهی","مالیات نقل‌وانتقال خودرو","پیگیری امور پلاک و مالکیت خودرو"]},
{category:"خدمات گذرنامه",icon:"🛂",items:["ثبت درخواست گذرنامه عادی","ثبت درخواست گذرنامه زیارتی","پیگیری درخواست و صدور گذرنامه","راهنمایی امور تمدید و تعویض گذرنامه"]},
{category:"یارانه و خدمات معیشتی",icon:"💳",items:["اعتراض به دهک‌بندی","اعتراض به قطع یارانه","درخواست بررسی مجدد وضعیت خانوار","درخواست جداسازی یارانه اعضای خانوار","پیگیری کالابرگ الکترونیکی","ثبت و پیگیری درخواست‌های معیشتی"]},
{category:"وام و تسهیلات بانکی",icon:"🏦",items:["ثبت‌نام وام ازدواج","ثبت‌نام وام فرزندآوری","ثبت‌نام وام ودیعه مسکن","تسهیلات مشاغل خانگی","پیگیری درخواست تسهیلات","خدمات بانکی و اعتباری"]},
{category:"خدمات قضایی و ثنا",icon:"⚖️",items:["ثبت‌نام و احراز هویت سامانه ثنا","دریافت و چاپ ابلاغیه الکترونیکی","دریافت گواهی عدم سوءپیشینه","ثبت درخواست‌های قضایی","پیگیری پرونده قضایی","نوبت‌دهی قضایی"]},
{category:"خدمات دولتی و اداری",icon:"🏛️",items:["پنجره ملی خدمات دولت هوشمند","خدمات سامانه دولت من","احراز هویت و ارتقای سطح کاربری","خدمات املاک و اسکان","ثبت درخواست‌های اداری و دولتی","بارگذاری مدارک و پیگیری درخواست‌ها","خدمات کمیته امداد و بهزیستی","درخواست و پیگیری مستمری"]},
{category:"خدمات بانکی و پرداخت",icon:"🏧",items:["پرداخت قبوض خدماتی","خرید شارژ تلفن همراه","خرید بسته اینترنت","پیگیری درخواست‌های بانکی","دریافت گردش و صورت‌حساب در سامانه‌های مجاز"]},
{category:"خدمات بیمه",icon:"🛡️",items:["استعلام و تمدید انواع بیمه","خدمات بیمه تأمین اجتماعی","مشاهده سوابق بیمه","دریافت فیش و حکم بازنشستگی","خدمات بیمه سلامت","خدمات با همکاری شرکت‌های بیمه"]},
{category:"تحصیلی و استخدامی",icon:"🎓",items:["ثبت‌نام مدارس و دانشگاه‌ها","ثبت‌نام آزمون‌های سراسری","ثبت‌نام آزمون‌های استخدامی","انتخاب رشته و ثبت‌نام آموزشی","ثبت‌نام نهضت سوادآموزی","دریافت کارنامه و سوابق تحصیلی"]},
{category:"نظام وظیفه",icon:"🎖️",items:["درخواست معافیت تحصیلی","پیگیری امور اینترنتی نظام وظیفه","ثبت درخواست‌های مشمولان","دریافت راهنمایی خدمات وظیفه عمومی"]},
{category:"کامپیوتر و لپ‌تاپ",icon:"💻",items:["نصب ویندوز و نرم‌افزار","عیب‌یابی و تعمیر کامپیوتر و لپ‌تاپ","نصب و راه‌اندازی پرینتر","نصب آنتی‌ویروس","رفع مشکلات نرم‌افزاری","بازیابی اطلاعات و فایل‌های حذف‌شده","رفع مشکلات اینترنت و مودم","نصب و راه‌اندازی تجهیزات شبکه","فروش و سفارش لپ‌تاپ نو و کارکرده"]},
{category:"خدمات موبایل",icon:"📱",items:["نصب و راه‌اندازی برنامه‌های موبایل","انتقال اطلاعات بین گوشی و رایانه","راهنمایی تنظیمات گوشی","رفع مشکلات نرم‌افزاری گوشی","مدیریت و انتقال فایل‌ها"]},
{category:"تایپ، چاپ و طراحی",icon:"🖨️",items:["تایپ فارسی و انگلیسی","پرینت سیاه‌وسفید و رنگی","کپی و اسکن مدارک","طراحی تراکت و پوستر","طراحی کارت ویزیت","تنظیم و ویرایش فایل Word و PDF","ساخت رزومه و فرم‌های اداری","چاپ عکس","صحافی و فنر زدن","طراحی بنر و اعلامیه"]},
{category:"ثبت‌نام‌ها و خدمات اینترنتی",icon:"🌐",items:["ثبت‌نام آزمون‌ها و استخدامی‌ها","ثبت‌نام طرح‌ها و سامانه‌های دولتی","تکمیل فرم‌های اینترنتی","بارگذاری مدارک","دریافت نوبت اینترنتی","بازیابی رمز عبور","پیگیری درخواست‌های اینترنتی","ثبت‌نام و پیگیری درخواست‌های سازمانی"]},
{category:"عکاسی و خدمات تصویری",icon:"📷",items:["آماده‌سازی عکس پرسنلی","تنظیم اندازه عکس برای چاپ","ویرایش عکس در حد نیاز چاپ","چاپ عکس در ابعاد مختلف"]}
];
const products = [
["⌨️","لوازم جانبی کامپیوتر","ماوس، کیبورد و تجهیزات جانبی"],
["🔌","شارژر و کابل","انواع شارژر، کابل و مبدل"],
["💾","فلش و حافظه","فلش مموری و تجهیزات ذخیره‌سازی"],
["💻","لپ‌تاپ نو و کارکرده","سفارش با استعلام قیمت و ضمانت"],
["🖨️","پرینتر و لوازم چاپ","پرینتر، تونر و مواد مصرفی"],
["🎮","لوازم گیمینگ","دسته بازی و تجهیزات گیمینگ"],
["📡","مودم و تجهیزات شبکه","مودم، روتر و آداپتور وای‌فای"],
["🧰","قطعات کامپیوتر","قطعات و لوازم ارتقای سیستم"]
];
let sb=null, services=[], cart=[], isAdmin=false;
const configured = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
  !cfg.SUPABASE_URL.includes("YOUR_") && !cfg.SUPABASE_ANON_KEY.includes("YOUR_");
if(configured && window.supabase) sb=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);

function flattenDefaults(){return defaultGroups.flatMap(g=>g.items.map(title=>({id:null,title,category:g.category,description:"",icon:g.icon,active:true,source:"default"})));}
function groupServices(rows){
 const map=new Map();
 rows.filter(x=>x.active!==false).forEach(x=>{
  const key=x.category||"سایر خدمات";
  if(!map.has(key))map.set(key,{category:key,icon:x.icon||"📌",items:[]});
  map.get(key).items.push(x);
 });
 return [...map.values()];
}
function renderServices(){
 const q=$("#serviceSearch").value.trim().toLowerCase(),cat=$("#categoryFilter").value;
 const filtered=services.filter(s=>(cat==="all"||s.category===cat)&&(`${s.title} ${s.category} ${s.description||""}`).toLowerCase().includes(q));
 const groups=groupServices(filtered);
 $("#serviceGrid").innerHTML=groups.length?groups.map(g=>`<article class="service-card"><div class="service-card-head"><span class="service-icon">${esc(g.icon)}</span><div><h3>${esc(g.category)}</h3><small>${fa(g.items.length)} خدمت</small></div></div><div class="service-items">${g.items.map(s=>`<div class="service-line"><span>${esc(s.title)}</span><button class="order-service" data-service="${esc(s.title)}">سفارش</button></div>`).join("")}</div></article>`).join(""):`<div class="empty-result">خدمتی با این مشخصات پیدا نشد.</div>`;
 $("#serviceResultCount").textContent=`نمایش ${fa(filtered.length)} خدمت در ${fa(groups.length)} دسته‌بندی`;
 $$("#categoryFilter option").length>1||populateCategories();
}
function populateCategories(){
 const select=$("#categoryFilter"),current=select.value;
 select.innerHTML='<option value="all">همه دسته‌بندی‌ها</option>'+[...new Set(services.map(s=>s.category))].map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");
 if([...select.options].some(o=>o.value===current))select.value=current;
}
async function loadServices(){
 services=flattenDefaults();
 if(sb){
  const {data,error}=await sb.from("service_items").select("*").eq("active",true).order("category").order("title");
  if(!error&&data&&data.length)services=data.map(x=>({...x,source:"database"}));
 }
 populateCategories();renderServices();
}
function renderProducts(){
 const q=$("#productSearch").value.trim().toLowerCase();
 $("#productGrid").innerHTML=products.filter(p=>p[1].toLowerCase().includes(q)||p[2].toLowerCase().includes(q)).map(p=>`<article class="product-card"><div class="product-visual">${p[0]}</div><div class="product-info"><small>محصولات قابل سفارش</small><h3>${p[1]}</h3><p>${p[2]}</p><button class="add-product" data-product="${p[1]}">افزودن به سبد سفارش</button></div></article>`).join("");
}
function openCart(){$("#cartDrawer").classList.add("open");$("#cartBackdrop").classList.add("show");}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#cartBackdrop").classList.remove("show");}
function renderCart(){
 $("#cartCount").textContent=fa(cart.length);
 $("#cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-row"><span>${fa(i+1)}. ${esc(x)}</span><button data-remove="${i}">حذف</button></div>`).join(""):'<p class="empty-cart">هنوز موردی انتخاب نشده است.</p>';
}
async function recordOrder(payload){
 if(!sb)return;
 try{await sb.from("orders").insert({customer_name:payload.name||null,details:payload.details,status:"new"});}catch(e){console.warn("Order save failed",e);}
}
async function sendCart(){
 if(!cart.length){toast("سبد سفارش خالی است.");return;}
 const name=$("#orderName").value.trim(),note=$("#orderNote").value.trim();
 const message=`سلام، برای سفارش از سایت کافی‌نت رضا پیام می‌دهم.\nنام: ${name||"ثبت نشده"}\nموارد:\n${cart.map((x,i)=>`${i+1}. ${x}`).join("\n")}\nتوضیحات: ${note||"ندارد"}\nلطفاً برای هماهنگی راهنمایی بفرمایید.`;
 await recordOrder({name,details:message});
 wa(message);toast("پیام سفارش برای واتساپ آماده شد.");
}
function showAdmin(){ $("#adminModal").classList.add("show"); }
function hideAdmin(){ $("#adminModal").classList.remove("show"); }
function authMessage(t){$("#adminAuthMessage").textContent=t||"";}
function panelMessage(t){$("#adminPanelMessage").textContent=t||"";}
async function openAdminPanel(){
 $("#adminLoginView").hidden=true;$("#adminPanelView").hidden=false;
 await loadAdminServices();await loadAdminOrders();
}
async function loginAdmin(e){
 e.preventDefault();authMessage("");
 if(!sb){authMessage("ابتدا آدرس و کلید عمومی Supabase را در config.js وارد کنید.");return;}
 const phone=$("#adminPhone").value.trim(),password=$("#adminPassword").value;
 const {data,error}=await sb.auth.signInWithPassword({phone,password});
 if(error){authMessage("ورود انجام نشد: "+error.message);return;}
 const {data:profile,error:profileError}=await sb.from("profiles").select("role").eq("id",data.user.id).single();
 if(profileError||profile?.role!=="admin"){
  await sb.auth.signOut();authMessage("این حساب دسترسی مدیریت ندارد.");return;
 }
 isAdmin=true;await openAdminPanel();toast("ورود مدیر موفق بود.");
}
async function loadAdminServices(){
 const {data,error}=await sb.from("service_items").select("*").order("category").order("title");
 if(error){panelMessage("خطا در دریافت خدمات: "+error.message);return;}
 $("#adminServiceList").innerHTML=(data||[]).map(s=>`<div class="admin-list-row"><div><b>${esc(s.icon||"📌")} ${esc(s.title)}</b><small>${esc(s.category)} · ${s.active?"فعال":"غیرفعال"}</small></div><div><button class="edit-btn" data-edit="${s.id}">ویرایش</button> <button class="delete-btn" data-delete="${s.id}">حذف</button></div></div>`).join("")||"<p>هنوز خدمتی ثبت نشده است.</p>";
}
async function saveService(e){
 e.preventDefault();if(!sb||!isAdmin)return;
 const id=$("#editServiceId").value;
 const row={title:$("#serviceTitle").value.trim(),category:$("#serviceCategory").value.trim(),description:$("#serviceDescription").value.trim(),icon:$("#serviceIcon").value.trim()||"📌",active:true};
 const result=id?await sb.from("service_items").update(row).eq("id",id):await sb.from("service_items").insert(row);
 if(result.error){panelMessage("ذخیره انجام نشد: "+result.error.message);return;}
 $("#serviceForm").reset();$("#editServiceId").value="";$("#serviceIcon").value="📌";
 panelMessage("خدمت ذخیره شد.");await loadAdminServices();await loadServices();
}
async function loadAdminOrders(){
 const {data,error}=await sb.from("orders").select("*").order("created_at",{ascending:false}).limit(100);
 if(error){$("#adminOrdersList").innerHTML=`<p>خطا: ${esc(error.message)}</p>`;return;}
 $("#adminOrdersList").innerHTML=(data||[]).map(o=>`<div class="admin-list-row order-admin-row"><div><b>${esc(o.customer_name||"مشتری بدون نام")}</b><small>${new Date(o.created_at).toLocaleString("fa-IR")} · ${esc(o.status)}</small></div><div>${esc(o.details)}</div></div>`).join("")||"<p>هنوز سفارشی ثبت نشده است.</p>";
}
async function logoutAdmin(){if(sb)await sb.auth.signOut();isAdmin=false;$("#adminPanelView").hidden=true;$("#adminLoginView").hidden=false;$("#adminLoginForm").reset();authMessage("از حساب مدیریت خارج شدید.");}
function bindEvents(){
 $("#mobileMenu").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
 $$("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
 $("#serviceSearch").addEventListener("input",renderServices);$("#categoryFilter").addEventListener("change",renderServices);
 $("#productSearch").addEventListener("input",renderProducts);
 $("#serviceGrid").addEventListener("click",e=>{const b=e.target.closest("[data-service]");if(!b)return;const title=b.dataset.service;cart.push(title);renderCart();openCart();});
 $("#productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-product]");if(!b)return;cart.push(b.dataset.product);renderCart();toast("به سبد سفارش اضافه شد.");});
 $("#popularGrid").addEventListener("click",e=>{const b=e.target.closest("[data-jump]");if(!b)return;$("#categoryFilter").value=b.dataset.jump;renderServices();$("#services").scrollIntoView({behavior:"smooth"});});
 $("#cartOpen").addEventListener("click",openCart);$("#cartClose").addEventListener("click",closeCart);$("#cartBackdrop").addEventListener("click",closeCart);
 $("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;cart.splice(Number(b.dataset.remove),1);renderCart();});
 $("#sendOrder").addEventListener("click",sendCart);
 $("#adminOpen").addEventListener("click",showAdmin);$("#adminClose").addEventListener("click",hideAdmin);
 $("#adminModal").addEventListener("click",e=>{if(e.target===$("#adminModal"))hideAdmin();});
 $("#adminLoginForm").addEventListener("submit",loginAdmin);$("#adminLogout").addEventListener("click",logoutAdmin);
 $("#serviceForm").addEventListener("submit",saveService);
 $("#cancelServiceEdit").addEventListener("click",()=>{$("#serviceForm").reset();$("#editServiceId").value="";$("#serviceIcon").value="📌";});
 $("#adminServiceList").addEventListener("click",async e=>{
  const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");
  if(edit){const {data,error}=await sb.from("service_items").select("*").eq("id",edit.dataset.edit).single();if(error)return panelMessage(error.message);
   $("#editServiceId").value=data.id;$("#serviceTitle").value=data.title;$("#serviceCategory").value=data.category;$("#serviceDescription").value=data.description||"";$("#serviceIcon").value=data.icon||"📌";return;}
  if(del&&confirm("این خدمت حذف شود؟")){const {error}=await sb.from("service_items").delete().eq("id",del.dataset.delete);if(error)panelMessage(error.message);else{await loadAdminServices();await loadServices();panelMessage("خدمت حذف شد.");}}
 });
 $$(".admin-tabs button").forEach(b=>b.addEventListener("click",()=>{$$(".admin-tabs button").forEach(x=>x.classList.toggle("active",x===b));$$(".admin-tab").forEach(x=>x.hidden=x.id!==b.dataset.tab);}));
}
async function init(){
 bindEvents();renderProducts();renderCart();await loadServices();
 if(!configured)console.info("Supabase is not configured. Public site works with built-in service data; admin needs config.js.");
}
document.addEventListener("DOMContentLoaded",init);
})();