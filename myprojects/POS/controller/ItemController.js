{
    var itemCodeRegEx = /^(I00-)[0-9]{3}$/;
    var itemNameRegEx = /^[A-z ]{4,}$/;
    var itemUnitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
    var itemQtyOnHandRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

    $('#iCode,#itemName,#Iprice,#Iqty').on('keydown', function (eventOb) {
        if (eventOb.key == "Tab") {
            eventOb.preventDefault(); // stop execution of the button
        }
    });

    $('#iCode,#itemName,#Iprice,#Iqty').on('blur', function () {
        formValid();
    });

    $('#iCode,#itemName,#Iprice,#Iqty').on('keyup', function (eventOb) {
        setButtonItem();
        if (eventOb.key == "Enter") {
            checkItemIfValid();
        }
    });


    $("#saveItem").attr('disabled', true);
    $("#updateItem").attr('disabled', true);
    $("#deleteItem").attr('disabled', true);

    function clearAllItem() {
        $('#iCode,#itemName,#Iprice,#Iqty').val("");
        $('#iCode,#itemName,#Iprice,#Iqty').css('border', '2px solid #ced4da');
        $('#iCode').focus();
        $("#saveItem").attr('disabled', true);
        //loadAllCustomers();
        //$("#lblcusid,#lblcusname,#lblcusNIC,#lblcusAddress,#lblcusContact").text("");
    }

    function ItemFormValid() {
        var iCode = $("#iCode").val();
        $("#iCode").css('border', '2px solid green');
        //$("#lblcusid").text("");
        if (itemCodeRegEx.test(iCode)) {
            var iName = $("#itemName").val();
            if (itemNameRegEx.test(iName)) {
                $("#itemName").css('border', '2px solid green');
                //$("#lblcusname").text("");
                var iPrice = $("#Iprice").val();
                //console.log(cusNIC);//=============================
                if (itemUnitPriceRegEx.test(iPrice)) {
                    //console.log("What");
                    $("#Iprice").css('border', '2px solid green');
                    //$("#lblcusNIC").text("");
                    var iQuantity = $("#Iqty").val();
                    if (itemQtyOnHandRegEx.test(iQuantity)) {
                        $("#Iqty").css('border', '2px solid green');
                        //$("#lblcusAddress").text("");
                        return true;
                    } else {
                        $("#Iqty").css('border', '2px solid red');
                        //$("#lblcusAddress").text("Cus Salary is a required field : Pattern 100.00 or 100");
                        return false;
                    }
                } else {
                    $("#Iprice").css('border', '2px solid red');
                    //$("#lblcusNIC").text("Cus Name is a required field : Mimum 7");
                    return false;
                }
            } else {
                $("#itemName").css('border', '2px solid red');
                //$("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
                return false;
            }
        } else {
            $("#iCode").css('border', '2px solid red');
            //$("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
            return false;
        }
    }

    function checkItemIfValid() {
        var iCode = $("#iCode").val();
        if (itemCodeRegEx.test(iCode)) {
            $("#itemName").focus();
            var iName = $("#itemName").val();
            if (itemNameRegEx.test(iName)) {
                $("#Iprice").focus();
                var iPrice = $("#Iprice").val();
                if (itemUnitPriceRegEx.test(iPrice)) {
                    $("#Iqty").focus();
                    var iQuentity = $("#Iqty").val();
                    if (itemQtyOnHandRegEx.test(iQuentity)) {
                        let res = confirm("Do you really need to add this Item..?");
                        if (res) {
                            saveItem();
                            clearAllItem();
                        }
                    } else {
                        $("#address").focus();
                    }
                } else {
                    $("#nic").focus();
                }
            } else {
                $("#custName").focus();
            }
        } else {
            $("#custID").focus();
        }
    }

    function setButtonItem() {
        let b = ItemFormValid();
        if (b) {
            $("#saveItem").attr('disabled', false);
        } else {
            $("#saveItem").attr('disabled', true);
        }
    }

    $('#saveItem').click(function () {
        checkItemIfValid();
    });

    function loadAllItems() {
        $("#itemTable").empty();
        for (var i of itemDB) {
            let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getPrice()}</td><td>${i.getItemQTY()}</tr>`;
            $("#itemTable").append(row);
        }
    }

    function saveItem() {

        $("#itemTable>tr").off("click");

        let itemCode = $("#iCode").val();
        let itemName = $("#itemName").val();
        let price = $("#Iprice").val();
        let itemQTY = $("#Iqty").val();

        let itemDTO = new ItemDTO(itemCode, itemName, price, itemQTY);
        itemDB.push(itemDTO);
        loadAllItems();

        $("#itemTable>tr").click(function () {

            let itemCode = $(this).children(":eq(0)").text();
            let itemName = $(this).children(":eq(1)").text();
            let price = $(this).children(":eq(2)").text();
            let itemQTY = $(this).children(":eq(3)").text();

            //console.log(itemCode, itemName, price, itemQTY);

            $("#iCode").val(itemCode);
            $("#itemName").val(itemName);
            $("#Iprice").val(price);
            $("#Iqty").val(itemQTY);

        });
    }

    function searchItem(id) {
        for (let i = 0; i < itemDB.length; i++) {
            if (itemDB[i].getItemCode() == id) {
                ifExistsCustomer = true;
                return itemDB[i];
            }
        }
        ifExistsItem = false;
    }

    $("#txtItemID").on('keyup', function (eventOb) {
        if (eventOb.key == "Enter") {
            var searchID1 = $("#txtItemID").val();

            response = searchItem(searchID1);
            if (response) {
                /*$("#custID").val(response.getItemCode());
                $("#custName").val(response.getItemName());
                $("#nic").val(response.getNIC());
                $("#address").val(response.getAddress());
                $("#contact").val(response.getContact());*/
                $("#itemTable").empty();
                let row = `<tr><td>${response.getItemCode()}</td><td>${response.getItemName()}</td><td>${response.getPrice()}</td><td>${response.getItemQTY()}</tr>`;
                $("#itemTable").append(row);
                $("#txtItemID").val("");
                $("#updateItem").attr("disabled", false);
                $("#deleteItem").attr("disabled", false);
            }else{
                loadAllItems();
                swal({
                    title:"Error..!",
                    text: "No such Item...",
                    icon : "warning",
                    timer : 2000
                });
            }
        }
    });

    $("#btnSearchItem").click(function () {
        var searchID = $("#txtItemID").val();

        response = searchItem(searchID);
        if (response) {
            /*$("#custID").val(response.getItemCode());
            $("#custName").val(response.getItemName());
            $("#nic").val(response.getNIC());
            $("#address").val(response.getAddress());
            $("#contact").val(response.getContact());*/
            $("#itemTable").empty();
            let row = `<tr><td>${response.getItemCode()}</td><td>${response.getItemName()}</td><td>${response.getPrice()}</td><td>${response.getItemQTY()}</tr>`;
            $("#itemTable").append(row);
            $("#txtItemID").val("");
            $("#updateItem").attr("disabled", false);
            $("#deleteItem").attr("disabled", false);
        }else{
            /* alert("No Such a Customer");*/
            loadAllItems();

            swal({
                title:"Error..!",
                text: "No such Item...",
                icon : "warning",
                timer : 2000
            });
        }
    });

    $("#updateItem").click(function () {
        $("#iCode").val(response.getItemCode());
        $("#itemName").val(response.getItemName());
        $("#Iprice").val(response.getPrice());
        $("#Iqty").val(response.getItemQTY());

        $("#renewItem").attr("disabled", false);
        $("#itemCode").attr("disabled", true);

    });

    $("#renewItem").click(function () {

        //if($("#custName").val() == "" && $("#nic").val() == "" && $("#address").val() == "" && $("#contact").val() == ""){
        var id =$("#iCode").val();
        for (var i=0; i<itemDB.length; i++){
            if(itemDB[i].getItemCode() == id){
                itemDB[i].setItemName($("#itemName").val());
                itemDB[i].setPrice($("#Iprice").val());
                itemDB[i].setItemQTY($("#Iqty").val());
               /* customerDB[i].setContact($("#contact").val());*/
               // console.log(customerDB[i].getAddress());

                loadAllItems();

                swal({
                    title:"Confirmation..!",
                    text: "Item Updated Successfully",
                    icon : "confirm",
                    timer : 2000
                });

                $("#iCode").val("");
                $("#itemName").val("");
                $("#Iprice").val("");
                $("#Iqty").val("");

                $("#renewItem").attr("disabled", true);
            }
        }
        /*}else {
           swal({
               title:"Error..!",
               text: "Fill all fields and try again..",
               icon : "error",
               timer : 2000
           });
       }*/
    });

    $("#deleteItem").click(function () {
        itemDB.splice(response);

        swal({
            title:"Confirmation..!",
            text: "Item deleted Successfully",
            icon : "confirm",
            timer : 2000
        });

        loadAllItems();
    });
}