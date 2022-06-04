import { Badge, Icon, Stack, styled, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "./models/DataStructure";

// PROP YTPES
type SubmenuItemProps = {
  item: SidebarItem;
  open: boolean;
};

// CUSTOM LINK
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.customProps.color,
  display: "flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  transition: "all .2s ease-in-out",
  "&:hover": {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.customProps.background,
    color: theme.palette.primary.main,
  },
  justifyContent: "space-between",
}));

// CUSTOM ICON
const StyledIcon = styled(Icon)({
  fontSize: "1.5rem",
  marginRight: "0.8rem",
  
});

// CUSTOM LABEL
const SideMenuLabel = styled(Typography)({
  marginLeft: ".1rem",
  fontSize: "0.9rem",
  display: "inline-block",
});

// CUSTOM BADGE
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: theme.palette.extra.greenPrimary,
    marginRight: "0.8rem",
  },
}));

// SUBMENU COMPONENT
const SubmenuItem: FC<SubmenuItemProps> = ({ item, open }) => {
  const [hasSubnav, setHasSubnav] = useState(false);
  const toggleSubnav = () => {
    setHasSubnav(!hasSubnav);
  };
  

  return (
    <>
      <StyledLink to={item.path} onClick={toggleSubnav}>
        <Stack direction="row">
          <StyledIcon>{item.icon}</StyledIcon>
          <SideMenuLabel sx={{ paddingTop: ".2em" }}>
            {open && item.title}
          </SideMenuLabel>
        </Stack>
        {open && (
          <span>
            {item?.subnav && hasSubnav ? item?.iconOpened : item?.iconClosed}
          </span>
        )}
        {open && item?.notification && (
          <StyledBadge badgeContent={item?.notification} ></StyledBadge>
        )}
      </StyledLink>
      {hasSubnav &&
        item?.subnav?.map((subitem, index) => (
          <StyledLink
            key={index}
            to={subitem.path}
            sx={{ backgroundColor: "#E9F8FE" }}
          >
            <SideMenuLabel sx={{ paddingLeft: "2.3rem" }}>
              {subitem.title}
            </SideMenuLabel>
          </StyledLink>
        ))}
    </>
  );
};

export default SubmenuItem;
