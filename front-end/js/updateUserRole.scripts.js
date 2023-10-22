//Capturar elementos del DOM
const userRoleToogle = document.getElementById("user-role-toggle");

// Capturar el rol del usuario
const user = localStorage.getItem("user");
let userRole = JSON.parse(user).role;

// Función para actualizar el rol del usuario
async function updateUserRole(userRole) {
  const response = fetch("http://localhost:8080/api/sessions/premium/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userRole),
  });
  const data = await response.json();
}

// Función para cambiar el rol del usuario
function toggleUserRole() {
  if (userRole === "PREMIUM") {
    userRole = "BASIC";
  } else {
    userRole = "PREMIUM";
  }
  renderUserRoleToogle();
  updateUserRole(userRole);
}

// Función para renderizar el botón de cambio de rol
const renderUserRoleToogle = () => {
  let html = "";
  if (userRole === "PREMIUM") {
    html = `
    <button class="btn dropdown-item" onclick="toggleUserRole()">
    <i class="fa-solid fa-lock-open"></i>
      Premium a Basic
    </button>
  `;
  } else {
    html = `
    <button class="btn dropdown-item" onclick="toggleUserRole()">
    <i class="fa-solid fa-lock"></i>
      Basic a Premium
    </button>
  `;
  }
  userRoleToogle.innerHTML = html;
};

// Evento para renderizar el botón de cambio de rol
window.addEventListener("load", () => {
  renderUserRoleToogle();
});
