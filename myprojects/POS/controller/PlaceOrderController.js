{
   /* $("#inputId").attr("disabled", true);
    $("#inputName").attr("disabled", true);
    $("#inputContact").attr("disabled", true);
    $("#inputAddress").attr("disabled", true);*/

   /* $("#inputItemCode").attr("disabled", true);
    $("#inputIName").attr("disabled", true);
    $("#inputQTY").attr("disabled", true);
    $("#inputPrice").attr("disabled", true);*/

    $("#inputBalance").attr("disabled", true);
    $("#inputCash").attr("disabled", true);
    $("#purchase").attr("disabled", true);
    $("#inputOrderID").attr("disabled", true);
    $("#inputOrderQTY").attr("disabled", true);
    $("#btnAddToCart").attr("disabled", true);
    $('#inputDate').val(new Date().toISOString().slice(0, 10));

    var ifExistsCustomer = false;
    var ifExistsItem = false;
    let selectedItem;
    let total = 0.00;
    let subTotal = 0.00;
    let orderDetailObject;

    function setCustomerIdsToComboBox() {
        $("#inputState").empty();
        $("#inputState").append(new Option("-Select Customer-", ""));
        for (let i = 0; i < customerDB.length; i++) {
            $("#inputState").append(new Option(customerDB[i].getID(), i));
        }
    }

    $("#inputState").change(function () {
        var id = $("#inputState").find('option:selected').text();
        let searchCustomer1 = searchCustomer(id);
        if (searchCustomer1) {
            ifExistsCustomer = true;
            $("#inputId").val(searchCustomer1.getID());
            $("#inputName").val(searchCustomer1.getName());
            $("#inputContact").val(searchCustomer1.getContact());
            $("#inputAddress").val(searchCustomer1.getAddress());
        }
        if (ifExistsCustomer == false) {
            $("#inputId").val("");
            $("#inputName").val("");
            $("#inputContact").val("");
            $("#inputAddress").val("");
        }

    });

    function searchCustomer(id) {
        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getID() == id) {
                ifExistsCustomer = true;
                return customerDB[i];
            }
        }
        ifExistsCustomer = false;
    }

    function setOrderID() {
        if (OrderDB.length == 0) {
            $("#inputOrderID").val("O00-001");
        } else if (OrderDB.length > 0) {
            var orderId = OrderDB[OrderDB.length - 1].getOrderCode().split("-")[1];
            var tempId = parseInt(orderId);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#inputOrderID").val("O00-00" + tempId);
            } else if (tempId <= 99) {
                $("#inputOrderID").val("O00-00" + tempId);
            } else if (tempId <= 999) {
                $("#inputOrderID").val("O00-" + tempId);
            }
        }
    }

    function setItemIdsToComboBox() {
        $("#selectItem").empty();
        $("#selectItem").append(new Option("-Select Item-", ""));
        for (let i = 0; i < itemDB.length; i++) {
            $("#selectItem").append(new Option(itemDB[i].getItemCode(), i));
        }
    }

    $("#selectItem").change(function () {
        var id = $("#selectItem").find('option:selected').text();
        let searchItem1 = searchItem(id);
        if (searchItem1) {
            ifExistsItem = true;
            selectedItem = searchItem1;
            $("#inputItemCode").val(searchItem1.getItemCode());
            $("#inputIName").val(searchItem1.getItemName());
            $("#inputQTY").val(searchItem1.getItemQTY());
            $("#inputPrice").val(searchItem1.getPrice());
            $("#inputOrderQTY").attr("disabled", false);
        }
        if (ifExistsItem == false) {
            $("#inputItemCode").val("");
            $("#inputIName").val("");
            $("#inputQTY").val("");
            $("#inputPrice").val("");
            $("#inputOrderQTY").attr("disabled", true);
        }

    });

    function searchItem(id) {
        for (let i = 0; i < itemDB.length; i++) {
            if (itemDB[i].getItemCode() == id) {
                ifExistsCustomer = true;
                return itemDB[i];
            }
        }
        ifExistsItem = false;
    }

    function loadAllOrders() {
        $("#orderTable").empty();
        for (var i of tempArray) {
            let row = `<tr><td>${i.getItemCodeOfDetails()}</td><td>${i.getItemNameOfDetails()}</td><td>${i.getOrderQTY()}</td><td>${i.getPricePerUnit()}</td><td>${i.getTPrice()}</tr>`;
            $("#orderTable").append(row);
        }
    }

    $("#inputOrderQTY").on('keyup', function (eventOb) {
        if (eventOb.key == "Enter") {
            $("#btnAddToCart").attr("disabled", false);
            if ($("#inputOrderQTY").val() <= $("#inputQTY").val()) {
                if ($("#inputOrderQTY").val() != 0) {
                    let OID = $("#inputOrderID").val();
                    let orderQTY = $("#inputOrderQTY").val();
                    total = total + orderQTY * selectedItem.getPrice();
                    let val = $("#inputQTY").val();
                    $("#inputQTY").val(val - orderQTY);

                    orderDetailObject = new OrderDetailDTO(OID, selectedItem.getItemCode(), selectedItem.getItemName(), orderQTY, selectedItem.getPrice(), total);
                    tempArray.push(orderDetailObject);
                    loadAllOrders();

                    $("#totalPrice").text("Total Price : Rs." + total);
                    $("#subTotal").text("Sub Price- : Rs." + total);
                } else {
                    swal({
                        title: "Error..!",
                        text: "PLease enter Order Quantity...!",
                        icon: "warning",
                        timer: 2000
                    });
                }
            } else {
                swal({
                    title: "Error..!",
                    text: "Order Qty is higher than Qty On Hand...",
                    icon: "warning",
                    timer: 2000
                });
            }
        }
    });

    $("#btnAddToCart").click(function () {
        if ($("#inputOrderQTY").val() <= $("#inputQTY").val()) {
            if ($("#inputOrderQTY").val() != 0) {
                let OID = $("#inputOrderID").val();
                let orderQTY = $("#inputOrderQTY").val();
                total = total + orderQTY * selectedItem.getPrice();
                let val = $("#inputQTY").val();
                $("#inputQTY").val(val - orderQTY);

                orderDetailObject = new OrderDetailDTO(OID, selectedItem.getItemCode(), selectedItem.getItemName(), orderQTY, selectedItem.getPrice(), total);
                tempArray.push(orderDetailObject);
                loadAllOrders();

                $("#totalPrice").text("Total Price : Rs." + total);
                $("#subTotal").text("Sub Price- : Rs." + total);
            } else {
                swal({
                    title: "Error..!",
                    text: "PLease enter Order Quantity...!",
                    icon: "warning",
                    timer: 2000
                });
            }
        } else {
            swal({
                title: "Error..!",
                text: "Order Qty is higher than Qty On Hand...",
                icon: "warning",
                timer: 2000
            });
        }
    });

    $("#inputDiscount").on('keyup', function (eventOb) {
        if (eventOb.key == "Enter") {
            let discount = $("#inputDiscount").val();
            subTotal = total - discount;
            $("#subTotal").text("Sub Price- : Rs." + subTotal);
            $("#inputCash").attr("disabled", false);
        }
    });
    $("#inputCash").on('keyup', function (eventOb) {
        if (eventOb.key == "Enter") {
            let cash = $("#inputCash").val();
            $("#inputBalance").val((cash - subTotal));
            $("#purchase").attr("disabled", false);
        }
    });

    $("#purchase").click(function () {
        let res = confirm("Do you want to place the Order..?");
        if (res) {
            let OID = $("#inputOrderID").val();
            let date = $("#inputDate").val();
            let orderObject = new OrderDTO(OID, date, subTotal, orderDetailObject);
            OrderDB.push(orderObject);
            for (i = 0; i < tempArray.length; i++) {
                var orderDetail = new OrderDetailDTO(OID, tempArray[i].getItemCodeOfDetails(), tempArray[i].getItemNameOfDetails(), tempArray[i].getPricePerUnit(), tempArray[i].getOrderQTY(), tempArray[i].getTPrice());
                OrderDetailsDB.push(orderDetail);
                manageQuantity(tempArray[i].getItemCodeOfDetails(), tempArray[i].getOrderQTY());//-------------------------------
            }
        }
        $("#inputBalance").attr("disabled", true);
        loadOrderDetailTable();
        setOrderID();
        //clearData();
        loadAllOrders();
    });

   /*function clearData() {
        $("#selectItem").val("");
        $("#inputState").val("");
        //-------------------------------------
        $("#inputItemCode").val("");
        $("#inputIName").val("");
        $("#inputQTY").val("");
        $("#inputPrice").val("");
        $("#inputOrderQTY").val("");
        $("#inputOrderQTY").attr("disabled", true);
        $("#purchase").attr("disabled", true);
        /------------------------------------------
        $("#inputId").val("");
        $("#inputName").val("");
        $("#inputContact").val("");
        $("#inputAddress").val("");
        /------------------------------------------
        $("#inputDiscount").val("");
        $("#inputCash").val("");
        $("#inputBalance").val("");
        tempArray.splice(0, tempArray.length);
    }*/

    function manageQuantity(itemCode, buyQty) {
        for (var i = 0; i < itemDB.length; i++) {
            if (itemDB[i].getItemCode() == itemCode) {
                let tempQty = parseInt(itemDB[i].getItemQTY());
                let qtyOnHand = tempQty - buyQty;
                itemDB[i].setItemQTY(qtyOnHand);
            }
        }
    }

}