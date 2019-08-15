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

const fetchSingle = (id, callback) => {
  const data = {
    mode : 'fetch',
    id,
  }

  $.post({
    type: "POST",
    url: "api/index.php",
    data: data,
    success: response => {
      callback(response);
    },
    error: (x,y,m) => {
      console.log(x,y,m);
    }
  });
}
$(document).ready(() => {
  getAllMember();

  $("#btn-add-member").click(() => {
    $("#form-modal").modal("toggle");
  });

  $("#form-modal").on("hidden.bs.modal", () => {
    //clear form data
    $('#member-form #btn-submit').val('add');

    //set back to default
    $('#member-form #mode').val('add');
    $('#member-form #target').val('');
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
    const id = $(e.target).data("id");

    fetchSingle(id, (response) => {
      console.log('response', response);
      const data = response[0];

      //set button label to update
      $('#member-form #btn-submit').val('update')

      //set formData;
      $('#member-form #email').val(data.email);
      $('#member-form #first_name').val(data.first_name);
      $('#member-form #last_name').val(data.last_name);
      $('#member-form #number').val(data.mobile_number);

      //set reference deta
      $('#member-form #mode').val('update');
      $('#member-form #target').val(id);

      //show form
      $("#form-modal").modal("toggle");
    })
  });

  $("body").on("click", "#tbl-btn-remove", e => {
    const id = $(e.target).data("id");

    const data = {
      mode : 'destroy',
      id,
    }

    $.post({
      type: "POST",
      url: "api/index.php",
      data: data,
      success: response => {
        getAllMember();
      },
      error: (x,y,m) => {
        console.log(x,y,m);
      }
    });

  });
});
