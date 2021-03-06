/* When clicking 'logout' button */
$('#logout_button').on("click", function() {
//    $.get("login.html", function() {
        location.replace('/login/');
        alert("logged out");
//    });
});



/* when clicking 'save' button on add schedule model */
$('#add-schedule-form').on("submit", function(event) {
    event.preventDefault();
    console.log("inside js add-schedule-save handler")
    add_schedule();
});

function add_schedule() {
    console.log("add schedule");
    console.log($('#event-description').val());
    console.log($('#event-time-start').val());

    $.ajax({
        url : "/add_schedule/",
        type : "POST",
        data : {
            description : $('#event-description').val(),
            time_start : $('#event-time-start').val(),
            time_finish : $('#event-time-end').val(),
            place : $('#event-place').val(),
            id : $('#event-modal').data('value1'),
            type : $('#event-modal').data('value2')
        },

        success : function(json) {
            $('#add-schedule-modal').modal('toggle');
            $('#add-schedule-form')[0].reset();
            console.log(json);
            location.replace('/');
        },
        error : function(error) {
            console.log(error);
        }

    });
};


/* when clicking on an item on the list
$('.event-list').on("click", function(event) {
    console.log($(this).attr('id'));
    console.log($(this).data('value'));
    console.log('event list');
});
*/

/* when the schedule item is double clicked */
$('.event-list').dblclick(function() {
    console.log('event list double-clicked');
    console.log($(this).attr('id'));
    console.log($(this).data('value'));

    _ajaxSetup();

    // Get data from server via AJAX
    $.ajax( {
        url : "/get_schedule/",
        type : "POST",
        data : {
            id : $(this).attr('id'),
            type : $(this).data('value'),
        },

        success : function(json) {
            console.log('edit_schedule ajax send success');
            console.log(json);
            displayEventEditModal(json);
        },
        error : function(error) {
            console.log(error);
        }

    });
});

function displayEventEditModal(jsonData) {
    var modal = $('#add-schedule-modal').modal();

    modal.find('.modal-title').text('Edit event');
    modal.find('#event-description').val(jsonData.description);
    modal.find('#event-place').val(jsonData.place);
    modal.find('#event-time-start').val(jsonData.date_start);
    modal.find('#event-time-end').val(jsonData.date_finish);
    modal.find('#event-modal').data('value1', jsonData.id);
    modal.find('#event-modal').data('value2', jsonData.type);
};

$('#add-schedule-modal').on('hide.bs.modal', function() {
    $(this).find('.modal-title').text('Add New Schedule');
    $(this).find('#event-description').val('');
    $(this).find('#event-place').val('');
    $(this).find('#event-time-start').val('');
    $(this).find('#event-time-end').val('');
    $(this).find('#event-modal').data('value1', "");
    $(this).find('#event-modal').data('value2', "");
});



$('.event-list-item-delete').on("click", function(event) {
//    console.log($(this).parent().attr('id'));
//    console.log($(this).parent().data('value'));
    console.log('delete button');
    console.log(csrftoken);

    _ajaxSetup();

    $.ajax( {
        url : "/delete_schedule/",
        type : "POST",
        data : {
            id : $(this).parent().attr('id'),
            type : $(this).parent().data('value'),
        },

        success : function(json) {
            console.log('delete_schedule ajax success')
            location.replace('/');
        },
        error : function(error) {
            console.log(error);
        }

    });
});



/* functions : Cookie, CSRF */

function getCookie(name) {
    var cookieValue = null;

    if(document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');

        for(var i=0 ; i < cookies.length ; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if(cookie.substring(0, name.length+1) === (name+'=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length+1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');;

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function _ajaxSetup() {
    $.ajaxSetup( {
        beforeSend : function(xhr,settings) {
            if(!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                console.log('ajax before-send : setting csrf token succeeded ');
            } else {
                console.log('ajax before-send : failed');
            }
        }
    });
}

