$(function() {

  var buildMessageHTML = function(message) {
      var message_content = ( message.content == null ? "": `<div class="chat-contents__message"><p>${ message.content }</p></div>`);
      var message_image = ( message.image == null ? "": `<img src="${ message.image }" width="300" height="300">`);
      var html = `<div class="chat-contents" data-message-id="${ message.id }">
                    <div class="chat-user">
                      <div class="chat-user__name">
                        ${ message.user_name }
                      </div>
                      <div class="chat-user__date">
                        <p>
                          ${ message.time }
                        </p>
                      </div>
                    </div>
                    ${ message_content }
                    ${ message_image }
                  </div>`
      return html;
    }

  var reloadMessages = (function() {
    last_message_id = $(".chat-contents:last").data("message-id");
    $.ajax({
      type: 'GET',
      url: 'api/messages',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(data) {
      var html = "";
      $.each(data, function(i, message) {
        html = buildMessageHTML(message);
        $(".chat-contents-wrapper").append(html);
      })
      $(".chat-contents-wrapper").animate({scrollTop: $(".chat-contents-wrapper")[0].scrollHeight});
    })
    .fail(function() {
      alert("error");
    })
  })

  $(".chat-form").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href;
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildMessageHTML(data);
      $(".chat-contents-wrapper").append(html);
      $(".chat-form")[0].reset();
      $(".chat-form__btn").prop("disabled", false);
      $(".chat-contents-wrapper").animate({scrollTop: $(".chat-contents-wrapper")[0].scrollHeight});
    })
    .fail(function() {
      alert("error");
      $('.chat-form__btn').prop("disabled", false);
    })
  })
  if (/\/groups\/\d*\/messages/.test(window.location.href)) {
  setInterval(reloadMessages, 5000);
  }
})