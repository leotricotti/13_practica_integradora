// Constantes que capturan los elementos del DOM
const repitEyeOpen = document.getElementById("repit-eye-open");
const repitPassword = document.getElementById("repit-password");
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
