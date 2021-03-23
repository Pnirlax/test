const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      color:'white',
      boxShadow: '0px 0px 2px black'
    },
    titleInput: {
      height: '40px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      position:'static',
      width: 'calc(100% - 300px)',
      backgroundColor: '#29487d',
      color: 'white',
      backgroundColor:'#7b109e',
      paddingLeft: '50px'
    },
    editIcon: {
      position: 'absolute',
      left: '19px',
      top: '12px',
      marginDown:'10%',
      color: 'white',
      width: '8',
      height: '8'
    },
    editorContainer: {
      height: '83.4%',
     // float:'left',
      width:'90%',
      position:'absolute',
      marginLeft: '457px'
    //  margin:'30px',
    //  paddingLeft:'30px'
     
    },
    dropdown:{
      backgroundColor: '#7b109e',
      marginLeft: '3000px',
    },
    dropdownCat:{
      backgroundColor:'black'
  },
      image: {
        width:'78%'  ,
        position:'relative',
        
      },
      images: {
        width:'66.7%'  ,
      
      height:'48%',
      float:'right',
      position:'absolute',
  
      left: '0%',
      top: '40%',
        
      },
      srcimg: {
        width:'69%'  ,
      
      height:'100%',
      float:'right',
      position:'absolute',
  
      left: '0%',
      top: '40%',
        
      },
   
      man:{
      width:'100%',
      color:'blue',
      float:'right',
      textcolor:'black'
      },
      mans:{
        textcolor:'black-bold',
        fontSize:'20px',
        fontFamily:'a'
        
      },
      upload:{
        backgroundColor:'#7b109e',
        width:'11%',
        position:'absolute',
        float:'right',
        left: '67%',
        top: '107%'
        
      },
      alert:{
        backgroundColor:'green',
        width:'98%',
        position:'absolute',
        float:'right',
        left: '67%',
        top: '7%',
      },
      savebtn: {
        backgroundColor:'#7b109e',
        color:'#ffff',
        width:'8%',
        position:'absolute',
        float:'right',
        left: '67%',
        top: '7%',
        '&:hover': {
          backgroundColor: '#2fe047'
        }
      },
      i:{
        marginRight:'2px'
      }
      });
  
  export default styles;