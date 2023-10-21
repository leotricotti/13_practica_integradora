// Constantes que capturan los elementos del DOM
const newPassword = document.getElementById("new-password");
const repitPassword = document.getElementById("repit-password");

const updatePassword = async (newPasswordData, repitPasswordData) => {
  console.log(newPasswordData, repitPasswordData);
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
  try {
    const response = await fetch(
      (url = `http://localhost:8080/api/sessions/updatePassword`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPasswordData,
        }),
      }
    );

    const result = await response.json();

    if (result.message === "La contraseña no puede ser igual a la anterior") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña no puede ser igual a la anterior",
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
    } else {
      Swal.fire({
        icon: "success",
        title: "¡Contraseña actualizada!",
        text: "Su contraseña ha sido actualizada exitosamente",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      }).then(() => {
        window.location.href = "index.html";
      });
    }
  } catch (error) {
    console.log(error);
  }
};

addEventListener("submit", (e) => {
  e.preventDefault();
  const token = new URLSearchParams(window.location.search).get("token");
  updatePassword(newPassword.value, repitPassword.value, token);
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
