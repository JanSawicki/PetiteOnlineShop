import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RemoveShoppingCartOutlined from "@material-ui/icons/RemoveShoppingCartOutlined";
import AddShoppingCartOutlined from "@material-ui/icons/AddShoppingCartOutlined";
import { Cart } from "../Cart/Cart";
import { formatCurrency } from "../../utils";
import { Chip, Tooltip } from "@material-ui/core";
import { Store } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";

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

    setProductsInCart(_productsInCart);
  };

  let changeProductCountInCart = async (
    product,
    changeByNumber,
    triggerErrorQuantity
  ) => {
    let _productsInCart = [...productsInCart];
    _productsInCart.forEach((_product) => {
      if (_product.pid === product.pid) {
        _product.count += changeByNumber;

        if (_product.count == 0) {
          _product.count = 1;
        }

        axios
          .post(
            "/api/product/check/",
            JSON.stringify(
              {
                pid: _product.pid,
                quantity: _product.count,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
          )
          .then((response) => {})
          .catch((error) => {
            if (error.response.data.errorType === "INCORRECT_QUANTITY") {
              triggerErrorQuantity();
              _product.count -= changeByNumber;
            }
          })
          .finally(() => {
            setProductsInCart(_productsInCart);
          });
      }
    });
  };

  useEffect(async () => {
    let _products = await axios("/api/cart");
    _products = _products.data;

    setProducts(_products);
    setProductsInCart([]);
  }, []);

  return (
    <div className="container">
      <Chip label="Lista produktów" icon={<Store />}/>
      <List>
        {products.map((product) => (
          <ListItem>
            <ListItemText
              primary={product.name}
              secondary={formatCurrency(product.price)}
            />
            {!isProductInCart(product) && (
              <Tooltip title="Dodaj do koszyka">
                <IconButton edge="end" onClick={() => addToCart(product)}>
                  <AddShoppingCartOutlined style={{ color: green[500] }} />
                </IconButton>
              </Tooltip>
            )}
            {isProductInCart(product) && (
              <Tooltip title="Usuń z koszyka">
                <IconButton edge="end" onClick={() => removeFromCart(product)}>
                  <RemoveShoppingCartOutlined style={{ color: red[500] }}/>
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
