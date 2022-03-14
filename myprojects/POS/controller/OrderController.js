let regOrderId = /^(O00-)[0-9]{3}$/;

function loadAllOrderDetails() {
    $("#tOrder").empty();
    for (var i of OrderDB) {
        let row = `<tr><td>${i.getOrderCode()}</td><td>${i.getDateOfOrder()}</td><td>${i.getTotalPrice()}</td></tr>`;
        $("#tOrder").append(row);
    }
}


$("#txtSearchOrder").keyup(function (event) {
    let searchOid = $("#txtSearchOrder").val();
    if (regOrderId.test(searchOid)) {
        $("#txtSearchOrder").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchOrderByOrderDetailTable(searchOid);
            searchOrderByOrderTable(searchOid);
        }
    } else {
        $("#txtSearchOrder").css('border', '2px solid red');
    }
});


function searchOrderByOrderDetailTable(orderId) {
    $("#tOrderDetails").empty();
    for (var i = 0; i < OrderDetailsDB.length; i++) {
        if (OrderDetailsDB[i].getOCode() == orderId) {
            let tableRow = `<tr><td>${OrderDetailsDB[i].getItemCodeOfDetails()}</td><td>${OrderDetailsDB[i].getItemNameOfDetails()}</td><td>${OrderDetailsDB[i].getOrderQTY()}</td><td>${OrderDetailsDB[i].getPricePerUnit()}</td><td>${OrderDetailsDB[i].getTPrice()}</tr>`;
            $("#tOrderDetails").append(tableRow);
        }
    }
}

function searchOrderByOrderDB(searchOID) {
    for (var i = 0; i < OrderDB.length; i++) {
        if (OrderDB[i].getOrderCode() == searchOID) {
            return OrderDB[i];
        }
    }
}

function searchOrderByOrderTable(orderId) {
    let order = searchOrderByOrderDB(orderId);
    var found = false;
    if (order) {
        let oid = order.getOrderCode();
        let orderDate = order.getDateOfOrder();
        let total = order.getTotalPrice();

        $("#tOrder").empty();

        let tableRow = `<tr><td>${oid}</td><td>${orderDate}</td><td>${total}</td></tr>`;
        $("#tOrder").append(tableRow);

        found = true;
    }
    if (found == false) {
        loadOrderTable();
        loadOrderDetailTable();
        swal({
            title: "Error!",
            text: "Order Not Found",
            icon: "warning",
            button: "Close",
            timer: 2000
        });
    }
}

function loadOrderTable() {
    $("#tOrder").empty();
    for (var i = 0; i < OrderDB.length; i++) {
        let tableRow = `<tr><td>${OrderDB[i].getOrderCode()}</td><td>${OrderDB[i].getDateOfOrder()}</td><td>${OrderDB[i].getTotalPrice()}</td></tr>`;
        $("#tOrder").append(tableRow);
    }
}

function loadOrderDetailTable() {
    $("#tOrderDetails").empty();
    for (var i = 0; i < OrderDetailsDB.length; i++) {
        let tableRow = `<tr><td>${OrderDetailsDB[i].getItemCodeOfDetails()}</td><td>${OrderDetailsDB[i].getItemNameOfDetails()}</td><td>${OrderDetailsDB[i].getOrderQTY()}</td><td>${OrderDetailsDB[i].getPricePerUnit()}</td><td>${OrderDetailsDB[i].getTPrice()}</tr>`;
        $("#tOrderDetails").append(tableRow);
    }
}