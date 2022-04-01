
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';


const names = [
  'Body',
  'NotBody',
  'Cook',
  'Other',
];
const categories = ["BO","NB","CO","OT"]


export default function BasicSelect() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Categories</InputLabel>
        <Select
          labelId="simple-select-label"
          id="category"
          name="category"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {names.map((name,index) => (
            <MenuItem
              key={name}
              value={categories[index]}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

// 複数選択が可能なMultiple Select
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelect(props) {
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-name-label">Categroy</InputLabel>
//         <Select
//           labelId="demo-multiple-name-label"
//           id="category"
//           multiple
//           value={personName}
//           name="category"
//           onChange={handleChange}
//           input={<OutlinedInput label="Category" />}
//           MenuProps={MenuProps}
//         >
//           {names.map((name,index) => (
//             <MenuItem
//               key={name}
//               value={categories[index]}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }