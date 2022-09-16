import { doc, getDoc } from "firebase/firestore";
import { FC, Fragment, useContext, useState, useEffect } from "react";
import { auth, firestore } from "../../Firebase/firebase";
import { Data } from "../../Interface";
import NotPound from "../NotPound";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Product from "./Product";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{width:'100%'}}
    >
      {value === index && (
        <Box sx={{ p: 3, width:'100%' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Admin: FC = () => {
  const [value, setValue] = useState(0);


  const [data, setData] = useState<Data>();
  useEffect(() => {
    if (auth.currentUser?.uid) {
      getDoc(doc(firestore as any, "user", auth.currentUser?.uid as any)).then((docSnap) => {
        if (docSnap.exists as any) {
          setData(docSnap.data() as Data);
        }
      });
    }
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (data?.nguoidung.includes('quantri') ?
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width:'250px' }}
      >
        <Tab label="Dashboard" {...a11yProps(0)}  />
        <Tab label="Sản phẩm" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Thống kê 
      </TabPanel>
      <TabPanel value={value} index={1}  >
         <Product />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box> : <NotPound />)
}
export default Admin;