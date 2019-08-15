$(document).ready(() => {
  $("#btn-add-member").click(() => {
    $("#form-modal").modal("toggle");
  });

  $("#form-modal").on("hidden.bs.modal", () => {
    //clear form data
    alert("clear form here");
  });

  //form submit
  $("#member-form").submit(e => {
    e.preventDefault();
    alert("submitting");
    const data = $('#member-form').serialize();
    console.log('data', data);

    $.post({
      type: "POST",
      url: "api/index.php",
      data: data,
      success: response => {
        console.log(response);
      },
      error: (x, y, m) => {
        console.log(x, y, m);
      }
    });
  });
});
