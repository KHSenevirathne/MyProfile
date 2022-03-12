function CustomerDTO(id,name,nic,address,contact){
    var __id=id;
    var __name=name;
    var __nic=nic;
    var __address=address;
    var __contact=contact;

    this.getID = function () {
        return __id;
    }
    this.getName = function () {
        return __name;
    }
    this.getNIC = function () {
        return __nic;
    }
    this.getAddress = function () {
        return __address;
    }
    this.getContact = function () {
        return __contact;
    }

    this.setID = function (id) {
         __id=id;
    }
    this.setName = function (name) {
        __name=name;
    }
    this.setNIC = function (nic) {
        __nic=nic;
    }
    this.setAddress = function (address) {
        __address=address;
    }
    this.setContact = function (contact) {
        __contact=contact;
    }
}