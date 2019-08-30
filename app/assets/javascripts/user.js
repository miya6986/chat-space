$(function() {

  var search_result = $("#user-search-result");
  var user_selected_html = $("#user-group-selected");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $(search_result).append(html);
  }

  function appendUserSelected(user) {
    var html = `<div class="chat-group-user clearfix">
                  <input name="group[user_ids][]" value="${user.id}" type="hidden" id="group-user-ids">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-selected chat-group-user__btn chat-group-user__btn--remove" data-user-id="${user.id}" data-user-name="${user.name}">削除</div>
                </div>`
    $(user_selected_html).append(html);
  }

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $(search_result).append(html);
  }


  $(document).on("click", ".chat-group-user__btn--add", function() {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    var user = {
                id: user_id,
                name: user_name
                }
    appendUserSelected(user);
    $(this).parent().empty();
  })

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().empty();
  })


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var user_ids = [];
    var url = "/users";
    $(".user-search-selected").each(function() {
      user_ids.push($(this).data("user-id"));
    })
    $.ajax({ 
      type: 'GET',
      url: url,
      data: { keyword: input,
              user_ids: user_ids
            },
      dataType: 'json'
    })
    .done(function(users) {
      $(search_result).empty();
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