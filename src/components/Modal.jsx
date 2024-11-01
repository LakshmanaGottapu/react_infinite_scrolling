import {useEffect} from 'react';
import styled from 'styled-components';
import {Button} from './styledComponents.js';
const Popup = styled.div`
    border:1px solid black;
    border-radius:1rem;
    width:9rem;
    padding:2rem;
    height:16rem;
    box-shadow:3px 3px black;
    background-color: white;
    position:fixed;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    z-index: 2;
    `;
const PopupWrapper = styled.div` 
position:fixed; z-index:1; top:0; left:0; right:0; bottom:0; background-color:rgba(0, 0, 0, 0.4); backdrop-filter: blur(2px); 
`
function Modal({setModalVisibility}) {
    useEffect(()=>{
        document.documentElement.style.setProperty('overflow', 'hidden');
        console.log('overflow hidden');
        return () => {
            document.documentElement.style.overflow = 'scroll';
            console.log('overflow scroll')
        }
    },[])
    return (
        <div className='modal'>
            <PopupWrapper className="popup-wrapper" onClick={()=>{
            setModalVisibility(false);
            }}></PopupWrapper>
            <Popup className="popup">
            <>
                <h1>Pop Up</h1>
                <p>Subscribe for more updates!</p>
            </>
            <Button onClick={()=>setModalVisibility(false)}> <strong> I ACCEPT </strong> </Button>
            </Popup> 
        </div>
    )
}

export default Modal;
