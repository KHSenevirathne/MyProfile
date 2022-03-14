{
    const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
    const cusNameRegEx = /^[A-z ]{5,20}$/;
    const cusNICRegEx = /^[0-9]{12}$/;
    const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
    const cusContactRegEx = /^(07)[0-9][0-9]{7}$/;

    $("#updateCustomer").attr("disabled", true);
    $("#renew").attr("disabled", false);
    $("#custID").attr("disabled", false);
    $("#deleteCustomer").attr("disabled", true);

    $('#custID,#custName,#nic,#address,#contact').on('keydown', function (eventOb) {
        if (eventOb.key == "Tab") {
            eventOb.preventDefault(); // stop execution of the button
        }
    });

    $('#custID,#custName,#nic,#address,#contact').on('blur', function () {
        formValid();
    });


    $("#custID").on('keyup', function (eventOb) {

        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }

        if (eventOb.key == "Control") {
            var typedCustomerID = $("#custID").val();
            var srcCustomer = searchCustomerFromID(typedCustomerID);
            $("#custID").val(srcCustomer.getCustomerID());
            $("#custName").val(srcCustomer.getCustomerName());
            $("#nic").val(srcCustomer.getCustomerAddress());
            $("#address").val(srcCustomer.getCustomerSalary());
            $("#contact").val(srcCustomer.getCustomerSalary());
        }

    });

    $("#custName").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#nic").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#address").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#contact").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });


    $("#btnSaveOrUpdate").attr('disabled', true);

    function clearAll() {
        $('#custID,#custName,#nic,#address,#contact').val("");
        $('#custID,#custName,#nic,#address,#contact').css('border', '2px solid #ced4da');
        $('#custID').focus();
        $("#btnSaveOrUpdate").attr('disabled', true);
        //loadAllCustomers();
        $("#lblcusid,#lblcusname,#lblcusNIC,#lblcusAddress,#lblcusContact").text("");
    }

    function formValid() {
        var cusID = $("#custID").val();
        $("#custID").css('border', '2px solid green');
        $("#lblcusid").text("");
        if (cusIDRegEx.test(cusID)) {
            var cusName = $("#custName").val();
            if (cusNameRegEx.test(cusName)) {
                $("#custName").css('border', '2px solid green');
                $("#lblcusname").text("");
                var cusNIC = $("#nic").val();
                //console.log(cusNIC);//=============================
                if (cusNICRegEx.test(cusNIC)) {
                    //console.log("What");
                    $("#nic").css('border', '2px solid green');
                    $("#lblcusNIC").text("");
                    var cusAddress = $("#address").val();
                    if (cusAddressRegEx.test(cusAddress)) {
                        $("#address").css('border', '2px solid green');
                        $("#lblcusAddress").text("");
                        var cusContact = $("#address").val();
                        // return true;
                        if (cusContactRegEx.test(cusContact)) {
                            $("#contact").css('border', '2px solid green');
                            $("#lblcusContact").text("");
                            return true;
                        } else {
                            $("#contact").css('border', '2px solid red');
                            $("#lblcusContact").text("Cus Salary is a required field : Pattern 100.00 or 100");
                            return false;
                        }
                    } else {
                        $("#address").css('border', '2px solid red');
                        $("#lblcusAddress").text("Cus Salary is a required field : Pattern 100.00 or 100");
                        return false;
                    }
                } else {
                    $("#nic").css('border', '2px solid red');
                    $("#lblcusNIC").text("Cus Name is a required field : Mimum 7");
                    return false;
                }
            } else {
                $("#custName").css('border', '2px solid red');
                $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
                return false;
            }
        } else {
            $("#custID").css('border', '2px solid red');
            $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
            return false;
        }
    }

    function checkIfValid() {
        var cusID = $("#custID").val();
        if (cusIDRegEx.test(cusID)) {
            $("#custName").focus();
            var cusName = $("#custName").val();
            if (cusNameRegEx.test(cusName)) {
                $("#nic").focus();
                var cusNIC = $("#nic").val();
                if (cusNICRegEx.test(cusNIC)) {
                    $("#address").focus();
                    var cusAddress = $("#address").val();
                    if (cusAddressRegEx.test(cusAddress)) {
                        $("#contact").focus();
                        var cusContact = $("#contact").val();
                        if (cusContactRegEx.test(cusContact)) {
                            let res = confirm("Do you really need to add this Customer..?");
                            if (res) {
                                saveCustomer();
                                clearAll();
                            }
                        } else {
                            $("#contact").focus();
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

    function setButton() {
        let b = formValid();
        if (b) {
            $("#btnSaveOrUpdate").attr('disabled', false);
        } else {
            $("#btnSaveOrUpdate").attr('disabled', true);
        }
    }

    $('#btnSaveOrUpdate').click(function () {
        checkIfValid();
    });

    /*$('#btnSaveOrUpdate').click(function () {
        $("#myModal").show('modal');
    });*/

    /*Save Customer*/
    function saveCustomer() {

        $("#customerTable>tr").off("click");

        let customerID = $("#custID").val();
        let customerName = $("#custName").val();
        let customerNIC = $("#nic").val();
        let customerAddress = $("#address").val();
        let customerTP = $("#contact").val();

        let customerDTO = new CustomerDTO(customerID, customerName, customerNIC, customerAddress, customerTP);

        customerDB.push(customerDTO);
        loadAllCustomers();
    }

    function loadAllCustomers() {
        $("#customerTable").empty();
        for (var i of customerDB) {
            let row = `<tr><td>${i.getID()}</td><td>${i.getName()}</td><td>${i.getNIC()}</td><td>${i.getAddress()}</td><td>${i.getContact()}</td></tr>`;
            $("#customerTable").append(row);
        }
    }

    var response;

    $("#btnSearch").click(function () {
        var searchID = $("#txtSearchCusID").val();

        response = searchCustomer(searchID);
        if (response) {
            /*$("#custID").val(response.getItemCode());
            $("#custName").val(response.getItemName());
            $("#nic").val(response.getNIC());
            $("#address").val(response.getAddress());
            $("#contact").val(response.getContact());*/
            $("#customerTable").empty();
            let row = `<tr><td>${response.getID()}</td><td>${response.getName()}</td><td>${response.getNIC()}</td><td>${response.getAddress()}</td><td>${response.getContact()}</td></tr>`;
            $("#customerTable").append(row);
            $("#txtSearchCusID").val("");
            $("#updateCustomer").attr("disabled", false);
            $("#deleteCustomer").attr("disabled", false);
        }else{
            /* alert("No Such a Customer");*/
            loadAllCustomers();

            swal({
                title:"Error..!",
                text: "No such Customer...",
                icon : "warning",
                timer : 2000
            });
        }
    });

    function searchCustomer(id) {
        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getID() == id) {
                return customerDB[i];
            }
        }
    }

    $("#txtSearchCusID").on('keyup', function (eventOb) {
        if (eventOb.key == "Enter") {
            var searchID1 = $("#txtSearchCusID").val();

            response = searchCustomer(searchID1);
            if (response) {
                /*$("#custID").val(response.getItemCode());
                $("#custName").val(response.getItemName());
                $("#nic").val(response.getNIC());
                $("#address").val(response.getAddress());
                $("#contact").val(response.getContact());*/
                $("#customerTable").empty();
                let row = `<tr><td>${response.getID()}</td><td>${response.getName()}</td><td>${response.getNIC()}</td><td>${response.getAddress()}</td><td>${response.getContact()}</td></tr>`;
                $("#customerTable").append(row);
                $("#txtSearchCusID").val("");
                $("#updateCustomer").attr("disabled", false);
                $("#deleteCustomer").attr("disabled", false);
            }else{
                loadAllCustomers();
                swal({
                    title:"Error..!",
                    text: "No such Customer...",
                    icon : "warning",
                    timer : 2000
                });
            }
        }
    });

    $("#updateCustomer").click(function () {
        $("#custID").val(response.getID());
        $("#custName").val(response.getName());
        $("#nic").val(response.getNIC());
        $("#address").val(response.getAddress());
        $("#contact").val(response.getContact());

        $("#renew").attr("disabled", false);
        $("#custID").attr("disabled", true);

    });

    $("#renew").click(function () {

        //if($("#custName").val() == "" && $("#nic").val() == "" && $("#address").val() == "" && $("#contact").val() == ""){
            var id =$("#custID").val();
            for (var i=0; i<customerDB.length; i++){
                if(customerDB[i].getID() == id){
                    customerDB[i].setName($("#custName").val());
                    customerDB[i].setNIC($("#nic").val());
                    customerDB[i].setAddress($("#address").val());
                    customerDB[i].setContact($("#contact").val());
                    console.log(customerDB[i].getAddress());

                    loadAllCustomers();

                    swal({
                        title:"Confirmation..!",
                        text: "Customer Updated Successfully",
                        icon : "confirm",
                        timer : 2000
                    });

                    $("#custID").val("");
                    $("#custName").val("");
                    $("#nic").val("");
                    $("#address").val("");
                    $("#contact").val("");

                    $("#renew").attr("disabled", true);
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

    $("#deleteCustomer").click(function () {
        customerDB.splice(response);

        swal({
            title:"Confirmation..!",
            text: "Customer deleted Successfully",
            icon : "confirm",
            timer : 2000
        });

        loadAllCustomers();
    });

}