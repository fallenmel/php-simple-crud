const getAllMember = () => {
  $.post({
    type: "GET",
    url: "api/index.php",
    success: response => {
      console.log("all data", response);

      $("#record-table tbody tr").remove();

      response.forEach(element => {
        const dom =
          "<tr><td>" +
          element.last_name +
          " " +
          element.first_name +
          "</td><td>" +
          element.email +
          "</td><td>" +
          element.mobile_number +
          "</td><td><button data-id='" +
          element.id +
          "' class='btn btn-sm btn-primary' id='tbl-btn-update'>Update</button><button data-id='" +
          element.id +
          "' class='btn btn-sm btn btn-danger' id='tbl-btn-remove'>Remove</button></td></tr>";
        $("#record-table tbody").append(dom);
      });
    },
    error: (x, y, m) => {
      console.log(x, y, m);
    }
  });
};

$(document).ready(() => {
  getAllMember();

  $("#btn-add-member").click(() => {
    $("#form-modal").modal("toggle");
  });

  $("#form-modal").on("hidden.bs.modal", () => {
    //clear form data
  });

  //form submit
  $("#member-form").submit(e => {
    e.preventDefault();
    const data = $("#member-form").serialize();
    console.log("data", data);

    $.post({
      type: "POST",
      url: "api/index.php",
      data: data,
      success: response => {
        console.log(response);
        getAllMember();
        $("#form-modal").modal("toggle");
      },
      error: (x, y, m) => {
        console.log(x, y, m);
      }
    });
  });

  //table buttons
  $("body").on("click", "#tbl-btn-update", e => {
    console.log($(e.target).data("id"));
  });

  $("body").on("click", "#tbl-btn-remove", e => {
    console.log($(e.target).data("id"));
  });
});
