$(document).ready(function() {

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