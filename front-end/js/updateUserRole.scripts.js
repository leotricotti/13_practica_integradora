//Capturar elementos del DOM
const userRoleToogle = document.getElementById("user-role-toggle");

// Capturar el rol del usuario
const user = localStorage.getItem("user");
let userRole = JSON.parse(user).role;

// Función para actualizar el rol del usuario
async function updateUserRole(newRoleData) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.username;

  const response = await fetch(
    `http://localhost:8080/api/sessions/premium/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role: newRoleData,
      }),
    }
  );
  const result = await response.json();

  console.log(result);
}

// Función para cambiar el rol del usuario
function toggleUserRole() {
  if (userRole === "premium") {
    userRole = "user";
  } else {
    userRole = "premium";
  }
  renderUserRoleToogle();
  updateUserRole(userRole);
}

// Función para renderizar el botón de cambio de rol
const renderUserRoleToogle = () => {
  let html = "";
  if (userRole === "premiun") {
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
