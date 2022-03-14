function ItemDTO(itemCode,itemName,price,itemQTY){
    var __itemCode=itemCode;
    var __itemName=itemName;
    var __price=price;
    var __itemQTY=itemQTY;

    this.getItemCode = function () {
        return __itemCode;
    }
    this.getItemName = function () {
        return __itemName;
    }
    this.getPrice = function () {
        return __price;
    }
    this.getItemQTY = function () {
        return __itemQTY;
    }


    this.setItemCode = function (itemCode) {
        __itemCode=itemCode;
    }
    this.setItemName = function (itemName) {
        __itemName=itemName;
    }
    this.setPrice = function (price) {
        __price=price;
    }
    this.setItemQTY = function (itemQTY) {
        __itemQTY=itemQTY;
    }
}