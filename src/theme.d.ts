// module agumentation

import { ThemeOptions } from "@mui/material/styles";
import React from "react";

declare module '@mui/material/styles' {

    interface Theme {
        customProps: {
            background: string;
            color: string;
        }
    }

    interface ThemeOptions {
        customProps: {
            background: React.CSSProperties['backgroundColor'];
            color: React.CSSProperties['color'];
        }
    }

    interface Palette {
        extra?: PaletteColor
    }

    interface PaletteOptions { 
        extra?: PaletteColorOptions
    }
 }