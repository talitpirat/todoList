$(document).ready(function() {
    function addItem() {
        const text = $('#textbox').val();
        if (text.trim() !== '') {
            $('#myUL').append('<li><input type="checkbox" class="check"> ' + text + '</li>');
            $('#textbox').val('');
        }
    }

    $('.btn').click(function() {
        addItem();
    });

    $('#textbox').keypress(function(event) {
        if (event.which === 13) { 
            event.preventDefault();
            addItem();
        }
    });

    $('#myUL').on('click', '.check', function() {
        $(this).closest('li').remove();
    });
});
