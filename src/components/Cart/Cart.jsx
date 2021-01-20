import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import RemoveOutlined from "@material-ui/icons/RemoveOutlined";
import Add from "@material-ui/icons/Add";
import { addPrices, formatCurrency } from "../../utils";
import { green, red } from "@material-ui/core/colors";
import ListSubheader from "@material-ui/core/ListSubheader";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";

import "./Cart.css";

const Cart = (
  props = { products, addToCart, removeFromCart, changeProductCountInCart }
) => {
  const [products, setProducts] = useState([]);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);

  useEffect(async () => {
    let _products = props.products;

    setProducts(_products);
  });

  let getTotalPrice = (products) => {
    let totalPrice = products.reduce((product1, product2) => {
      return { price: addPrices(product1.price, product2.price) };
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
      <h3>Koszyk</h3>
      {products.map((product) => (
        <ListItem>
          <ListItemText
            primary={product.name}
            secondary={formatCurrency(product.price)}
          />
          <ListSubheader edge="end">
            Obecnie masz w koszyku {product.count} sztuk produktu
          </ListSubheader>

          <Tooltip title="Delete one">
            <IconButton
              onClick={() => props.changeProductCountInCart(product, -1)}
            >
              <RemoveOutlined style={{ color: red[500] }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add one">
            <IconButton
              onClick={() => props.changeProductCountInCart(product, +1)}
            >
              <Add style={{ color: green[500] }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Remove from cart">
            <IconButton
              edge="end"
              onClick={() => props.removeFromCart(product, +1)}
            >
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </ListItem>
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
        <Button variant="outlined" color="primary" onClick={() => buyItems()}>
          Kup
        </Button>
      )}

      <Dialog open={isOpenAlertDialog} onClose={handleClose}>
        <DialogTitle>Taking you to payment...</DialogTitle>
        <LinearProgress />
      </Dialog>
    </div>
  );
};

export { Cart };
