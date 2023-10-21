async function handleLogoutBtnClick() {
  const option = {
    method: "POST",
  };

  try {
    const response = await fetch("/api/v1/auth/logout", option);
    if (response.ok && response.status === 200) {
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
