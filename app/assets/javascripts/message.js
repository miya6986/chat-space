$(function() {

  function buildHTML(message) {
    image = ( message.image == null ? "": `<img src="${ message.image }" width="300" height="300">` );
    var html = `<div class="chat-contents">
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
                  <div class="chat-contents__message">
                    <p>
                      ${ message.content }
                    </p>
                  </div>
                  ${ image }
                </div>`
    return html;
  }

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
      var html = buildHTML(data);
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
})