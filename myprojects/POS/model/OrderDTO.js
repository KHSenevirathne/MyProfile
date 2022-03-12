function OrderDTO(OrderCode,orderDate,totalPrice,orderDetails){
    var __OrderCode=OrderCode;
    var __orderDate=orderDate;
    var __totalPrice=totalPrice;
    var __orderDetails=orderDetails;

    this.getOrderCode = function () {
        return __OrderCode;
    }
    this.getDateOfOrder = function () {
        return __orderDate;
    }
    this.getTotalPrice = function () {
        return __totalPrice;
    }
    this.getOrderDetails = function () {
        return __orderDetails;
    }


    this.setOrderCode = function (OrderCode) {
        __OrderCode=OrderCode;
    }
    this.setDateOfOrder = function (orderDate) {
        __orderDate=orderDate;
    }
    this.setTotalPrice = function (totalPrice) {
        __totalPrice=totalPrice;
    }
    this.setOrderDetails = function (orderDetails) {
        __orderDetails=orderDetails;
    }
}