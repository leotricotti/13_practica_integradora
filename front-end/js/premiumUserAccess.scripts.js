async function premiumUserAccess(userRole) {
  const premiumAccess = document.getElementById("premium-access");
  let html = "";

  console.log(userRole);

  if (userRole === "premium") {
    html = `
    <button class="btn dropdown-item" onclick="toggleUserRole()">
      <i class="fa-solid fa-sliders"></i>
      Admin Panel
    </button>
  `;
    premiumAccess.innerHTML = html;
  } else {
    premiumAccess.innerHTML = "";
  }
}
