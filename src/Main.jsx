import Actions from './cart/Actions';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './cart/Dispatcher';
import Cart, { CartComponent } from './cart/Container';
import { Container } from 'flux/utils';
import React, { Component } from 'react';
import { Table } from 'reactstrap';

class SSSSS extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }
  getInitialState() {
    return {};
  }
  reduce(state, action) {
    return state;
  }
}

const TTTT = new SSSSS();

// --

function addItem(key, ev) {
  ev.preventDefault();
  Actions.addItem(key);
}

function removeItem(key, ev) {
  ev.preventDefault();
  Actions.removeItem(key);
}

function emptyCart() {
  Actions.emptyCart();
}

function resetCart() {
  Actions.resetCart();
}

function updateQty(key, quantity, ev) {
  ev.preventDefault();
  Actions.updateItem(key, quantity);
}

function submit() {
  alert('Submit order!');
}

function MyFunctionalComponent(props) {
  const { 
    articles, 
    selection, 
    isEmpty,
    foldSelection
  } = props;
  return (
    <div>
      <Table>
        <tbody>
          {articles.entrySeq().map(([key, article]) => 
            <tr key={key}>
              <td>
                <span>{article.Name}</span>
              </td>
              <td>
                <a href='#' onClick={ev => addItem(key, ev)}>Add</a>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {!isEmpty && (
        <span>
          <h2>Cart items</h2>
          <Table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {selection.entrySeq().map(([key, item]) => 
                <tr key={key}>
                  <td>
                    {item.article.Name} 
                  </td>
                  <td>
                    {item.article.Price} 
                  </td>
                  <td>
                    &times; {item.quantity}
                  </td>
                  <td>
                    <a href='#' onClick={ev => removeItem(key, ev)}>Remove</a>
                  </td>
                  <td>
                    <button onClick={ev => updateQty(key, item.quantity + 1, ev)}>+</button>
                  </td>
                  <td>
                    <button onClick={ev => updateQty(key, item.quantity - 1, ev)}>-</button>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  Sum:
                </td>
                <td>
                  {foldSelection((sum, article, qty) => sum + qty*article.Price, 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </Table>
        </span>
      )}
      <div>
        {!isEmpty && (
          <span>
            <button onClick={() => submit()}>Submit</button>
            <button onClick={() => emptyCart()}>Empty cart</button>
          </span>
        )}
        <button onClick={() => resetCart()}>Reset</button>
      </div>
    </div>
  );
}

class MyComponent extends CartComponent {
  static getStores() {
    return [TTTT];
  }
  static calculateState() {
    return {x: TTTT.getState()};
  }
  render() {
    return MyFunctionalComponent(this.state);
  }
}

function a() {
  return [
    TTTT
  ];
}

function b() {
  return {x: TTTT.getState()};
}

const MyStore = Container.create(MyComponent);

const MyStoreComponent = Cart.createFunctional(MyFunctionalComponent, a, b);

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const products = {
      "product-1" : { "Name" : "Canned Unicorn Meat"   , "Price" : "9.99"  }, 
      "product-2" : { "Name" : "Disappearing Ink Pen"  , "Price" : "14.99" }, 
      "product-3" : { "Name" : "USB Rocket Launcher"   , "Price" : "29.99" },
      "product-4" : { "Name" : "Airzooka Air Gun"      , "Price" : "29.99" },
      "product-5" : { "Name" : "Star Trek Paper Clips" , "Price" : "19.99" }
    };
    const selection = {
      "product-1" : { quantity: 2 },
      "product-3" : { quantity: 3 }
    };
    Actions.initialize(products, selection);
  }
  render() {
    return (
      <span>
        <MyStoreComponent /> 
        <hr />
        <hr />
        <hr />
        <MyStore />
      </span>
    );
  }
}
