import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { NavLink } from "react-router-dom";
import { changeSortBy } from "../store/slices/postsReducer";
import { useDispatch } from "react-redux";

export const TagsBlock = ({ items, isLoading }) => {
  const dispatch = useDispatch();
  const handleClick = (sorts) => {
    dispatch(changeSortBy(sorts));
  };
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <NavLink key={i}
                   onClick={() => handleClick(name)}
                   style={{ textDecoration: "none", color: "black" }}
                   to={`/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </SideBlock>
  );
};
