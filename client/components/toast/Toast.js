import React from 'react';

const Toast = (props) => {
  return (
  	<div
  		onClick={props.dismissToast} 
  		onTouchStart={props.dismissToast} 
  		className={props.classes}>
  		<h3>{props.title}:</h3>
  		<p>{props.message}</p>
  	</div>    
  );
}

export default Toast;

