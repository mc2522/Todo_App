$(document).ready(function() {

    $('form').on('submit', function(){

        var item = $('form input');
        var todo = {item: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/',
          data: todo,
          success: function(data){
            location.reload();
          }
        })
        return false
    });

    $('li').on('click', function() {
        let item = $(this).text().trim().replace(/ /g, '-')
        let url = `/${item}`
        console.log(url)
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function(data) {
                location.reload()
            }
        })
    })

})