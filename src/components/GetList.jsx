import axios from 'axios';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';

import NewItemModal from './NewItemModal'
import { Button, Grid } from '@mui/material';

export const GetList = (props) => {
  // Propsとしてカテゴリ名を取得し、そのカテゴリに対応するリストを表示
  const getCategory = props.name;
  const [itemList, setItemList] = useState([]);

  // 削除チェックボックス
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  // 削除完了の可否
  const [completedDelete, setCompletedDelete] = useState(false);

  // // Modalが開いてPOSTされたかどうかを取得。引数のisStateは子コンポーネントで実行した際に取ってくる。
  // // これをPropsとして渡す。
  // const [state,setState] =useState(false)
  const changeState = (isState) => {setItemList(isState)}

  // 初回起動時にアイテムリストを取得
  useEffect(() => {
      axios.get('https://welcia-shopping-list.herokuapp.com/welapi/items/',{})
      .then(res=>setItemList(res.data));
  },[completedDelete]);
  // カテゴリーごとのリストを取得
  const showList = itemList.filter(item=>{
    return item.category === getCategory
  });

  // 数の増減のonClick関数
  const plusOne = (selectedId) =>{
    const plusItem = itemList.filter((item)=>{
      return item.id === selectedId;
    })
    const putData = {
      title: plusItem[0].title,
      quontity: plusItem[0].quontity+1,
      category: plusItem[0].category 
    }
    // console.log(putData)
    axios.put(`https://welcia-shopping-list.herokuapp.com/welapi/items/${plusItem[0].id}/`, putData,{
      headers: {
        'Content-Type':'application/json'
      }
    }).then(res=>{
      setItemList(itemList.map(item=>(item.id === selectedId ? res.data : item)));
    })
  }
  const minusOne = (selectedId) =>{
    
    const minusItem = itemList.filter((item)=>{
      return item.id === selectedId;
    })
    const putData = {
      title: minusItem[0].title,
      quontity: minusItem[0].quontity-1,
      category: minusItem[0].category 
    }
    // console.log(putData);
    axios.put(`https://welcia-shopping-list.herokuapp.com/welapi/items/${minusItem[0].id}/`, putData,{
      headers: {
        'Content-Type':'application/json'
      }
    }).then(res=>{
      setItemList(itemList.map(item=>(item.id === minusItem[0].id ? res.data : item)));
    })
  }

  //削除
  const [selectedItem, setSelectedItem] = useState([]); 
  const DeleteItems = () => {
    selectedItem.splice(-1,1);
    console.log(completedDelete)
    
    const promise = new Promise((resolve, reject) =>{
      selectedItem.map((itemID) =>{
        axios.delete(`https://welcia-shopping-list.herokuapp.com/welapi/items/${itemID}/`,{
            headers: {
                'Authorization': 'Token 2fad1a4859ac04f0db5e6d1598d798e69b868aa9'
            }
        })
      })
      resolve();
    })
    
    // Promise.all(promises).then(setCompletedDelete(prev => setCompletedDelete(!prev)))
    const promises = Promise.all(promise)
    promises.then(setCompletedDelete(prev => setCompletedDelete(!prev)))
    // .then(() => {setItemList(itemList.filter(item => item.id !== itemID))})

  }


  const columns=[
    { field: 'title', headerName:'アイテム',flex:1,},
    // { field: 'actions',
    //   type:'actions',
    //   width: 10,
    //   getActions: (params)=>[
    //     <GridActionsCellItem
    //       icon={<AddIcon />}
    //       label="Add"
    //       onClick={plusOne(params.id)}
    //     />
    //   ],
    // },
    { field: 'plusBtn',
      type: 'actions',
      width:15,
      renderCell: (param)=>
        <IconButton aria-label="plus" size="small" onClick={()=>plusOne(param.id)}>
        <AddIcon fontSize='small' />
        </IconButton>
    },
    { field:'quontity', headerName:'数',width:20,},
    { field: 'minusBtn',
      type: 'actions',
      width:15,
      renderCell: (param)=>
        <IconButton aria-label="minus" size="small" onClick={()=>minusOne(param.id)}>
        <RemoveIcon fontSize='small' />
        </IconButton>
    },
  ]
  const rows = showList.map((item) =>{
    return {id: item.id, title: item.title, quontity: item.quontity}
  })
  return (
    <div>
      {/* <ul>
        {
          showList.map(item=>
            <li key={item.id} style={{paddingBottom:'1em', listStyle:'none'}}>
              <Grid container spacing={2}>
                <Grid item xs={8.4}>
                    {item.title}
                  </Grid>
                  <Grid item xs={1.2}>
                    <Button onClick={()=>plusOne(item.id)}>+</Button>
                  </Grid>
                  <Grid item xs={1.2}>
                    <div style={{textAlign:'center'}}>
                    {item.quontity}
                    </div> 
                  </Grid>
                  <Grid item xs={1.2}>
                  <Button onClick={()=>minusOne(item.id)}>-</Button>
                  </Grid>
              </Grid>
            </li>
            )
        }
      </ul> */}
        <div style={{width: '100%' }}>
        <Button onClick={()=>setCheckboxSelection(!checkboxSelection)}/>
        <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            disableColumnMenu
            autoHeight
            checkboxSelection
            onSelectionModelChange={(ids)=>{
              setSelectedItem([...ids, {id: ids}]);
            }}
            />
        </div>
        </div>
        </div> 
      <Grid container >
      <Grid item xs={2}></Grid>
        <Grid item xs={4}>   
          <NewItemModal changeState={changeState}/>
        </Grid>
        <Grid item xs={4}>
        <Button variant="contained" onClick={DeleteItems}>
          DELETE
        </Button>
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
    </div>
  )
}
