import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { Cart } from "../Cart/Cart";
import { formatCurrency } from "../../utils";
import { Tooltip } from "@material-ui/core";

const App = () => {
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  let isProductInCart = (product) => {
    return (
      [...productsInCart].filter(function (_product) {
        return _product.pid === product.pid;
      }).length > 0
    );
  };

  let addToCart = (clickedProduct) => {
    let _productsInCart = [...productsInCart];

    clickedProduct.count = 1;

    _productsInCart.push(clickedProduct);

    setProductsInCart(_productsInCart);
  };

  let removeFromCart = (clickedProduct) => {
    let _productsInCart = [...productsInCart];

    _productsInCart = _productsInCart.filter(function (product) {
      return product.pid !== clickedProduct.pid;
    });

    console.log(_productsInCart);

    setProductsInCart(_productsInCart);
  };

  let changeProductCountInCart = (product, changeByNumber) => {
    let _productsInCart = [...productsInCart];
    _productsInCart.forEach((_product) => {
      if (_product.pid === product.pid) {
        _product.count += changeByNumber;
      }
    });

    setProductsInCart(_productsInCart);
  };

  useEffect(async () => {
    let _products = await axios("/api/cart");
    _products = _products.data;

    setProducts(_products);
    setProductsInCart([]);
  }, []);

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <List>
        {products.map((product) => (
          <ListItem>
            <ListItemText
              primary={product.name}
              secondary={formatCurrency(product.price)}
            />
            {!isProductInCart(product) && (
              <Tooltip title="Add to cart">
                <IconButton edge="end" onClick={() => addToCart(product)}>
                  <ShoppingCartOutlined />
                </IconButton>
              </Tooltip>
            )}
            {isProductInCart(product) && (
              <Tooltip title="Remove from cart">
                <IconButton edge="end" onClick={() => removeFromCart(product)}>
                  <ShoppingCart />
                </IconButton>
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
      <Cart
        products={productsInCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        changeProductCountInCart={changeProductCountInCart}
      ></Cart>
    </div>
  );
};

export { App };
