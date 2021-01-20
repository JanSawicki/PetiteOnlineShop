import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import RemoveOutlined from "@material-ui/icons/RemoveOutlined";
import Add from "@material-ui/icons/Add";
import { green, red } from "@material-ui/core/colors";
import ListSubheader from "@material-ui/core/ListSubheader";
import { debounce, Tooltip } from "@material-ui/core";
import { formatCurrency } from "../../utils";

import "./CartItem.css";
import { Warning } from "@material-ui/icons";

const CartItem = (
  props = {
    product,
    addToCart,
    removeFromCart,
    changeProductCountInCart,
    min: 1,
    max: 10,
    isBlocked: false,
  }
) => {
  const [isErrorQuantityMessage, setIsErrorQuantityMessage] = useState(false);

  let hideErrorQuantityMessage = () => {
    setIsErrorQuantityMessage(false);
  };

  let showErrorQuantityMessage = () => {
    setIsErrorQuantityMessage(true);
  };

  return (
    <ListItem>
      <ListItemText
        primary={props.product.name}
        secondary={formatCurrency(props.product.price)}
      />
      <ListSubheader edge="end">
        Obecnie masz w koszyku {props.product.count} sztuk produktu
      </ListSubheader>

      {isErrorQuantityMessage && (
        <Tooltip title="Osiągnięto maksymalną liczbę produktów">
          <Warning style={{ color: red[500] }} />
        </Tooltip>
      )}

      <Tooltip
        title={props.isBlocked ? "Osiągnięto limit produktów" : "Usuń jeden"}
      >
        <div>
          <IconButton
            onClick={() => {
              hideErrorQuantityMessage();
              debounce(
                props.changeProductCountInCart(
                  props.product,
                  -1,
                  showErrorQuantityMessage
                )
              );
            }}
            disabled={props.isBlocked}
          >
            <RemoveOutlined style={{ color: red[500] }} />
          </IconButton>
        </div>
      </Tooltip>

      <Tooltip
        title={props.isBlocked ? "Osiągnięto limit produktów" : "Dodaj jeden"}
      >
        <div>
          <IconButton
            onClick={() => {
              hideErrorQuantityMessage();
              debounce(
                props.changeProductCountInCart(
                  props.product,
                  +1,
                  showErrorQuantityMessage
                )
              );
            }}
            disabled={props.isBlocked}
          >
            <Add style={{ color: green[500] }} />
          </IconButton>
        </div>
      </Tooltip>

      <Tooltip title="Usuń z koszyka">
        <IconButton
          edge="end"
          onClick={() => props.removeFromCart(props.product, +1)}
        >
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export { CartItem };
