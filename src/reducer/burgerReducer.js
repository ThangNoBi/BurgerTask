const burgerState = {
  burger: {
    salad: 1,
    cheese: 1,
    beef: 1,
  },
  menu: {
    salad: 15,
    cheese: 25,
    beef: 40,
  },
  total: 80,
};

const BurgerReducer = (state = burgerState, action) => {
  switch (action.type) {
    case "CHANGE_AMOUNT": {
      // console.log(action);
      //Bóc tách phần tử từ action.payload
      let { propsName, propsamount } = action.payload;
      //Thay đổi số lượng
      //Tăng 1
      let burgerUpdate = { ...state.burger };
      burgerUpdate[propsName] += propsamount;
      //Giảm 1
      if (propsamount === -1 && state.burger[propsName] < 1) {
        return { ...state };
      }
      state.burger = burgerUpdate;
      //Tính tổng tiền
      state.total += propsamount * state.menu[propsName];
      return { ...state };
    }
  }
  return { ...state };
};

export default BurgerReducer;
