import styled from 'styled-components';

export const Button = styled.button`
width:8rem; padding:0.50rem; border-radius:0.50rem; margin:0.5rem; background-color:${({backgroundColor})=> backgroundColor || 'orange'}; border:1px solid black; cursor:pointer;
box-shadow:2px 2px black;
&:hover{
background-color:${({hoverColor}) => hoverColor || 'darkorange'};
}
`

