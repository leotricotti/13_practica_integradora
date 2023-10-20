// Función que envía los datos al backend
const forgotPassword = async (username) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/sessions/forgotPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username }),
      }
    );

    const result = await response.json();
    if (result.response === "Correo de recuperación enviado al usuario") {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Correo de recuperación enviado al usuario",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#009688",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "index.html";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario no existe",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#009688",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
      });
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Capturamos el formulario de login
const loginForm = document.getElementById("login-form");

// Función que captura los datos y actualiza la contraseña
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  forgotPassword(username);
});

const restoreBtn = document.getElementById("forgot-button");

const btnSpinner = () => {
  restoreBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...`;
};

// // Constantes que capturan los elementos del DOM
// const newEyeOpen = document.getElementById("new-eye-open");
// const newPassword = document.getElementById("new-password");
// const newEyeClose = document.getElementById("new-eye-close");
// const newEyeContainer = document.getElementById("new-eye-container");

// // Función que agrega un evento de click al botón de mostrar/ocultar contraseña
// newEyeContainer.addEventListener("click", () => {
//   newEyeOpen.classList.toggle("show-password");
//   newEyeClose.classList.toggle("show-password");
//   showNewPassword();
// });

// // Función que muestra/oculta la contraseña
// const showNewPassword = () => {
//   newPassword.type = newEyeOpen.classList.contains("show-password")
//     ? "text"
//     : "password";
// };
