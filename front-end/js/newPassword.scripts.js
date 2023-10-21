// Constantes que capturan los elementos del DOM
const newPassword = document.getElementById("new-password");
const repitPassword = document.getElementById("repit-password");

const updatePassword = (newPasswordData, repitPasswordData) => {
  if (newPasswordData !== repitPasswordData) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    }).then(() => {
      window.location.href = "newPassword.html";
    });
  }

  const response = fetch(
    (url = "http://localhost:8080/api/users/newPassword"),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: newPasswordData,
        repitPassword: repitPasswordData,
      }),
    }
  );
};

addEventListener("submit", (e) => {
  e.preventDefault();
  updatePassword(newPassword.value, repitPassword.value);
});

// Constantes que capturan los elementos del DOM
const repitEyeOpen = document.getElementById("repit-eye-open");
const repitEyeClose = document.getElementById("repit-eye-close");
const repitEyeContainer = document.getElementById("repit-eye-container");

// Función que agrega un evento de click al botón de mostrar/ocultar contraseña
repitEyeContainer.addEventListener("click", () => {
  repitEyeOpen.classList.toggle("show-password");
  repitEyeClose.classList.toggle("show-password");
  showNewPassword();
});

// Función que muestra/oculta la contraseña
const showNewPassword = () => {
  repitPassword.type = repitEyeOpen.classList.contains("show-password")
    ? "text"
    : "password";
};

const updatePasswordBtn = document.getElementById("update-password-button");

// Spinner de carga
const btnSpinner = () => {
  updatePasswordBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...`;
};
