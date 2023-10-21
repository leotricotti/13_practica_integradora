const userRoleToogle = document.getElementById("user-role-toogle");

async function updateUserRole() {
  const userId = userRoleToogle.dataset.userId;
  const userRole = userRoleToogle.dataset.userRole;
  const userRoleToogleValue = userRoleToogle.value;

  const data = {
    userId: userId,
    userRole: userRole,
    userRoleToogleValue: userRoleToogleValue,
  };

  const response = fetch("/admin/updateUserRole", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
