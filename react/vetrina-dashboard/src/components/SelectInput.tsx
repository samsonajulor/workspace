import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

/**
 * 
 * @returns 
 */
const SelectInput = () => {
    const [shop, setShop] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
      setShop(event.target.value);
    };
    return (
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth size='small'>
          <InputLabel id='demo-simple-select-label'></InputLabel>
          <Select
            defaultValue='Fenoh Store'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={shop}
            label=''
            onChange={handleChange}
          >
            <MenuItem value={10}>Samson Store</MenuItem>
            <MenuItem value={20}>Jumia Store</MenuItem>
            <MenuItem value={30}>Alibaba Store</MenuItem>
            <MenuItem value={30}>Amazon Store</MenuItem>
            <MenuItem value={30}>Wix Store</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}

export default SelectInput