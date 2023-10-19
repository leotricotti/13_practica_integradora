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
    console.log(result);
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
