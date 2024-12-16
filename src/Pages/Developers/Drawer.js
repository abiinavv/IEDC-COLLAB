import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Buttons from "./Buttons";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeContext } from "../../App";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const styles = {
  fontFamily: "Nunito",
  fontWeight: "450",
  fontSize: "1.6rem",
  lineHeight: "42px",
  color: "white",
  padding: "0",
  margin: "0",
};

const styles1 = {
  fontFamily: "Nunito",
  fontWeight: "600",
  fontSize: "2rem",
  lineHeight: "42px",
  color: "white",
  padding: "0",
  margin: "0",
};

export default function PersistentDrawerLeft({
  selectedSkills,
  setSelectedSkills,
  selectedTags,
  setSelectedTags,
  addBranch,
  addYop,
  page,
  open,
  setOpen,
}) {
  const { branch, setBranch, yop, setYop, setWidth } = React.useContext(ThemeContext);
  const { tags, skills } = useContext(ProjectContext);

  const [skillList, setSkillList] = React.useState([
    "React",
    "CSS",
    "Javascript",
    "C++",
  ]);

  const branches = ["CSE", "ECE", "EEE", "EBE", "MECH"];
  const years = ["2023", "2024", "2025", "2026"];

  const matches0 = useMediaQuery("(max-width:500px)");
  const matches1 = useMediaQuery("(max-width:600px)");
  const matches2 = useMediaQuery("(max-width:800px)");
  const matches3 = useMediaQuery("(max-width:865px)");
  const matches5 = useMediaQuery("(max-width:1000px)");

  const drawerWidth = matches5
    ? matches2
      ? matches1
        ? matches0
          ? "95vw"
          : "70vw"
        : "50vw"
      : "40vw"
    : "25vw";

  const theme = useTheme();
  const [search, setSearch] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addSkill = (skill) => {
    let oldSkills = selectedSkills;
    if (oldSkills.find((s) => s === skill)) {
      oldSkills = oldSkills.filter((s) => s !== skill);
    } else {
      oldSkills = [...oldSkills, skill];
    }
    setSelectedSkills(oldSkills);
  };

  function handleChange(event) {
    const Name = event.target.value;
    setSearch(Name);
    if (Name.length === 0) {
      setSkillList(["React", "CSS", "Javascript", "C++"]);
    } else {
      setSkillList(
        skills.filter((location) => {
          return location.toLowerCase().includes(Name.toLowerCase());
        })
      );
    }
  }

  const addTag = (tag) => {
    let oldTags = selectedTags;
    if (oldTags.find((s) => s === tag)) {
      oldTags = oldTags.filter((s) => s !== tag);
    } else {
      oldTags = [...oldTags, tag];
    }
    setSelectedTags(oldTags);
  };

  const clearFilter = () => {
    setSelectedSkills([]);
    setSelectedTags([]);
    setBranch([]);
    setYop([]);
  };

  return (
    <>
      {/* Static Filter Button */}
      <IconButton
  color="inherit"
  aria-label="open drawer"
  onClick={handleDrawerOpen}
  edge="start"
  sx={{
    position: "relative", 
    marginTop: "20px", 
    marginLeft: "20px", 
    backgroundColor: "transparent", 
    color: "#9e0000", 
    padding: "10px",
    borderRadius: "50%", 
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)", 
    },
  }}
>
  <FilterAltIcon sx={{ fontSize: "2rem" }} />
  <Typography sx={{ paddingLeft: "8px", fontSize: "1.5rem", fontWeight: "500", color: "#9e0000" }}>
    Filter
  </Typography>
</IconButton>






      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(90deg, #8B1010 0%, #C71111 100%)",
            borderBottomRightRadius: "16px",
            borderTopRightRadius: "16px",
            height: "100%",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="filter_box">
          <h3 style={styles1}>Filter By:</h3>
          <button
            style={{
              color: "white",
              padding: "1px 7px",
              fontSize: "16px",
              borderRadius: "5px",
              backgroundColor: "transparent",
              border: "2px solid white",
              fontStyle: "Nunito",
            }}
            onClick={clearFilter}
          >
            Clear Filter
          </button>
          {/* Filter content */}
        </div>
      </Drawer>
    </>
  );
}
