//Capturar elementos del DOM
const userRoleToogle = document.getElementById("user-role-toggle");

// Capturar el rol del usuario
const user = JSON.parse(localStorage.getItem("user"));
let userRole = user.role;

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

// Función para actualizar el rol del usuario
async function updateUserRole(newRoleData) {
  const token = localStorage.getItem("token");
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

  if (!result.message === "Rol actualizado con exito") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo actualizar el rol",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Rol actualizado con exito",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    }).then(() => {
      user.role = newRoleData;
      localStorage.setItem("user", JSON.stringify(user));
    });
  }
}

// Función para renderizar el botón de cambio de rol
const renderUserRoleToogle = () => {
  let html = "";
  if (userRole === "premium") {
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
