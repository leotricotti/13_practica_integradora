// Funcion que permite el acceso al panel de administrador si el usuario es premium
async function premiumUserAccess(userRole) {
  const premiumAccess = document.getElementById("premium-access");
  let html = "";

  if (userRole === "premium") {
    html = `
    <a href='realTimeProducts.html' class="btn dropdown-item" >
      <i class="fa-solid fa-sliders"></i>
      Admin Panel
    </a>
  `;
    premiumAccess.innerHTML = html;
  } else {
    premiumAccess.innerHTML = "";
  }
}
