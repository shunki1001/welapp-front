import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import CategoryChoices from './CategoryChoices';
import axios from 'axios';

export default function FormDialog(props) {
  // Modalのopen, close
  const [open, setOpen] = React.useState(false);

  // POSTした後にGETをする同期処理を行う関数を定義
  const asynchronyFunction = (sendedData) => {
    return new Promise((resolve, reject)=>{
      axios.post('https://welcia-shopping-list.herokuapp.com/welapi/items/',sendedData,{
      headers: {
        'Content-Type':'application/json',
      }
    }).then(setOpen(false)).catch(function (error){
      if (error.response.status===400){
        alert('データの入力形式を間違えてるよ。登録できなかった。')
      } else {
        alert('なんでか分からんけど登録できんわ')
      };
    });
    resolve();
    })
    .then(()=>{
      return new Promise((resolve, reject)=>{
        axios.get('https://welcia-shopping-list.herokuapp.com/welapi/items/',sendedData,{})
        .then(res=>props.changeState(res.data));
      })
    })
  }

  // formのsubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // JSON形式にしてPOST
    const sendedData = {
      title: data.get('title'),
      quontity: Number(data.get('quontity')),
      category: data.get('category')
    };
    // console.log(sendedData)
    asynchronyFunction(sendedData)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        NEW ITEM
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規作成</DialogTitle>
        <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            入力してねん
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="What?"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="quontity"
            name="quontity"
            label="How many?"
            fullWidth
            variant="standard"
          />
          <CategoryChoices />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>やーめっぴ</Button>
          <Button type="submit">OK</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
