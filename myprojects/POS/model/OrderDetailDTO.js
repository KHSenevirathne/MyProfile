function OrderDetailDTO(orderCode,itemCode,itemName,orderQTY,pPerUnit,tPrice){
    var __orderCode=orderCode;
    var __itemCode=itemCode;
    var __ItemName=itemName;
    var __orderQTY=orderQTY;
    var __pPerUnit=pPerUnit;
    var __tPrice=tPrice;

    this.getOCode = function () {
        return __orderCode;
    }
    this.getItemCodeOfDetails = function () {
        return __itemCode;
    }
    this.getItemNameOfDetails = function () {
        return __ItemName;
    }
    this.getOrderQTY = function () {
        return __orderQTY;
    }
    this.getPricePerUnit = function () {
        return __pPerUnit;
    }
    this.getTPrice = function () {
        return __tPrice;
    }

    this.setOCode = function (orderCode) {
        __orderCode=orderCode;
    }
    this.setItemCodeOfDetails = function (itemCode) {
        __itemCode=itemCode;
    }
    this.setItemNameOfDetails = function (itemName) {
        __ItemName=itemName;
    }
    this.setOrderQTY = function (orderQTY) {
        __orderQTY=orderQTY;
    }
    this.setPricePerUnit = function (pPerUnit) {
        __pPerUnit=pPerUnit;
    }
    this.setTPrice = function (tPrice) {
        __tPrice=tPrice;
    }
}