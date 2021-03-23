const styles = theme => ({
    listItem: {
      cursor: 'pointer'
      
    },
    textSection: {
      maxWidth: '85%',
      color:'green'
    },  
    deleteIcon: {
      position: 'absolute',
      right: '5px',
      marginLeft:'30%',
      top: 'calc(50% - 15px)',
      '&:hover': {
        color: 'red'
      }
    }
  });
  
  export default styles;