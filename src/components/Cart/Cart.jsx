import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { formatCurrency } from "../../utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Chip,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { CartItem } from "../CartItem/CartItem";

import "./Cart.css";
import { ShoppingCart } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

const Cart = (
  props = { products, addToCart, removeFromCart, changeProductCountInCart }
) => {
  const [products, setProducts] = useState([]);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);

  useEffect(async () => {
    let _products = props.products;

    setProducts(_products);
  });

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  let getTotalPrice = (products) => {
    let totalPrice = products.reduce((product1, product2) => {
      return {
        price:
          parseFloat(product1.price) * product1.count +
          parseFloat(product2.price) * product2.count,
        count: 1,
      };
    }).price;

    return totalPrice;
  };

  let buyItems = () => {
    setIsOpenAlertDialog(true);
  };

  const handleClose = () => {
    setIsOpenAlertDialog(false);
  };

  return (
    <div className="container">
      <Chip label="Koszyk" icon={<ShoppingCart />} />
      {products.map((product) => (
        <CartItem
          product={product}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
          changeProductCountInCart={props.changeProductCountInCart}
          min={product.min}
          max={product.max}
          isBlocked={product.isBlocked}
        ></CartItem>
      ))}
      {props.products.length > 0 && (
        <ListItem>
          <ListItemText
            primary="Total:"
            secondary={formatCurrency(getTotalPrice(props.products))}
          />
        </ListItem>
      )}

      {props.products.length > 0 && (
        <ThemeProvider theme={theme}>
          <Button color="primary" onClick={() => buyItems()}>Kup</Button>
        </ThemeProvider>
      )}

      <Dialog open={isOpenAlertDialog} onClose={handleClose}>
        <DialogTitle>Przekierowywanie do płatności...</DialogTitle>
        <DialogContent>
          To może zająć chwilę (szczególnie, że to okno to tylko placeholder)...
        </DialogContent>
        <LinearProgress />
      </Dialog>
    </div>
  );
};

export { Cart };
