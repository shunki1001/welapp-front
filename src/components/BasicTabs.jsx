import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { GetList } from './GetList';

const categories = ["BO","NB","CO","OT"]
const category_name = ["Body","NotBody","Cook","Other"]

// 以下、Defaultの表記
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    label : `${category_name[index]}`,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// ここまで

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab {...a11yProps(0)} />
          <Tab {...a11yProps(1)} />
          <Tab {...a11yProps(2)} />
          <Tab {...a11yProps(3)} />        
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GetList name={categories[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
       <GetList name={categories[1]} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GetList name={categories[2]} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <GetList name={categories[3]} />
      </TabPanel>
    </Box>
  );
}
