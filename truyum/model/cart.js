

module.export =class Cart 
{
    menuItemList=[];
    totalPrice = 0;
    constructor(cartId,userId,menuItemList,totalPrice)
    {
        this.cartId=cartId;
        this.userId=userId;
        this.menuItemList=menuItemList;
        this.totalPrice=totalPrice;
    }

}