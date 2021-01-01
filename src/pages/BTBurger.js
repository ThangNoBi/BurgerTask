import React, { Component } from "react";
//Kết nối component với React-redux
import { connect } from "react-redux";
//Link CSS
import "./burger.css";

class BTBurger extends Component {
  //Hàm render bánh bên trái
  renderBanh = () => {
    let { banhBurger } = this.props;
    let content = [];
    // Cách 1: duyệt object bằng For In

    for (let PropBurger in banhBurger) {
      let getObj = [];
      for (let i = 0; i < banhBurger[PropBurger]; i++) {
        getObj.push(<div key={i} className={PropBurger}></div>);
      }
      content.push(getObj);
      // console.log(PropBurger, banhBurger[PropBurger]);
    }
    return content;

    //Cách 2 : Dùng hàm có trong JS để bóc tách Object biến thành các mảng con tương ứng
    // console.log(Object.entries(banhBurger));
    // const getObject = Object.entries(banhBurger).map(([PropBurger, value], index) => {
    //     let content = [];
    //     for (let i = 0; i < value; i++) {
    //       content.push(<div key={i} className={PropBurger}></div>);
    //     }
    //     return content;
    //   }
    // );
    // return getObject;
  };

  //Hàm render Menu bên phải
  renderMenu = () => {
    //Lấy Props từ Redux
    let { banhMenu, banhBurger } = this.props;
    // console.log(banhMenu);

    return Object.entries(banhMenu).map(([propsMenu, propsprice], index) => {
      return (
        <tr key={index}>
          <td>{propsMenu}</td>
          <td>
            <button
              onClick={() => this.props.changeAmount(propsMenu, -1)}
              className="btn btn-info"
            >
              -
            </button>
            <span className="mx-1">{banhBurger[propsMenu]}</span>
            <button
              onClick={() => this.props.changeAmount(propsMenu, 1)}
              className="btn btn-success"
            >
              +
            </button>
          </td>
          <td className="text-center">{propsprice}</td>
          <td className="text-center">{banhBurger[propsMenu] * propsprice}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <h3 className="display-4 text-info text-center">
          Bài Tập Burger Redux
        </h3>
        <div className="row">
          <div className="col-7">
            <h4 className="text-center text-danger">Burger của bạn</h4>
            <div className="breadTop"></div>
            {this.renderBanh()}
            <div className="breadBottom"></div>
          </div>
          <div className="col-5">
            <h3 className="text-center text-danger">Chọn thức ăn</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Thức ăn</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
                {this.renderMenu()}
              </thead>
              <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td className="text-center">Tổng cộng</td>
                  <td className="text-center">{this.props.banhTongTien}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    banhBurger: state.BurgerReducer.burger,
    banhMenu: state.BurgerReducer.menu,
    banhTongTien: state.BurgerReducer.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAmount: (propsName, propsamount) => {
      const action = {
        type: "CHANGE_AMOUNT",
        payload: {
          propsName,
          propsamount,
        },
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BTBurger);
