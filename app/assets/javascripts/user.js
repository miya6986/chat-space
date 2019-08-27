$(function() {

  var set_html = $("#user-group");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $(set_html).append(html);
  }

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $(set_html).append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var url = "/users";
    $.ajax({
      type: 'GET',
      url: url,
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-group").empty();
      if (users.length !== 0) {
        $.each(users, function(i, user) {
            appendUser(user);
        })
      }
      else {
        appendErrMsg("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  })
})