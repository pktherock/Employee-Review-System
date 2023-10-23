// Logout post request
document
  .getElementById("logOutBtn")
  ?.addEventListener("click", handleLogoutBtnClick);

// function to handle logout btn click
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

const DeleteUser = Array.from(document.getElementsByClassName("deleteUser"));

DeleteUser.forEach((user) => {
  user.addEventListener("click", async () => {
    const userId = user.getAttribute("userId");
    console.log(userId);
    const isConfirm = confirm("Are you sure you want to delete");
    if (isConfirm) {
      await deleteUser(userId);
    }
  });
});

async function deleteUser(userId) {
  const options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(`/api/v1/employee/${userId}`, options);
    if (response.status === 200) {
      location.reload();
    } else {
      alert("Error while deleting user..");
    }
  } catch (error) {
    console.log(error);
  }
}

const empType = document.getElementById("empType");
if (empType) {
  empType.value = empType?.getAttribute("value");
}

const DeleteReview = Array.from(
  document.getElementsByClassName("deleteReview")
);

DeleteReview.forEach((review) => {
  review.addEventListener("click", () => {
    const reviewId = review.getAttribute("reviewId");
    console.log(reviewId);
    deleteReview(reviewId);
  });
});

async function deleteReview(reviewId) {
  const isUserConfirm = confirm("Are you sure? you want to delete.");
  if (isUserConfirm) {
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(`/api/v1/review/${reviewId}`, options);

      if (response.status === 200) {
        location.reload();
      } else {
        alert("error while deleting..");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
