$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.age + '</td>';
                html += '<td>' + item.country + '</td>';
                html += '<td><div class="btn-group" role="group"><button type="button" class="btn btn-secondary" onclick="return getbyID(' + item.id + ')">Edit</button><button type="button" class="btn btn-secondary" onclick="Delele(' + item.id + ')">Delete</button></div></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#id').val(),
        Name: $('#name').val(),
        Age: $('#age').val(),
        Country: $('#country').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function () {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#name').css('border-color', 'lightgrey');
    $('#age').css('border-color', 'lightgrey');
    $('#country').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#name').val(result.name);
            $('#age').val(result.age);
            $('#country').val(result.country);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        id: $('#id').val(),
        name: $('#name').val(),
        age: $('#age').val(),
        country: $('#country').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function () {
            loadData();
            $('#myModal').modal('hide');
            $('#id').val("");
            $('#name').val("");
            $('#age').val("");
            $('#country').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function () {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#id').val("");
    $('#name').val("");
    $('#age').val("");
    $('#country').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#name').val().trim() == "") {
        $('#name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#name').css('border-color', 'lightgrey');
    }
    if ($('#age').val().trim() == "") {
        $('#age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#age').css('border-color', 'lightgrey');
    }
    if ($('#country').val().trim() == "") {
        $('#country').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#country').css('border-color', 'lightgrey');
    }
    return isValid;
}