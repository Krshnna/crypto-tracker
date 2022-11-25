import React from 'react'
import { styled } from '@mui/system';

const SelectButton = ({children, selected, onClick}) => {
    const MyComponent = styled('span') ({
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        fontFamily: "Monserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        width: "22%",
    })
  return (
    <MyComponent onClick={onClick} className="hov">{children}</MyComponent>
  )
};

export default SelectButton;