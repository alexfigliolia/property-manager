export const validateEmail = (email) => {
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {  
    return (true); 
  } else { 
    return (false);
  }   
}

export const validatePassword = (pw) => {
  if(pw === "" || pw === " " || pw.length < 5) {
    return false;
  } else {
    return true;
  }
}

export const validateName = (name) => {
  if( /^[a-zA-Z-'. ]+$/.test(name) &&
      name === name.replace(/\d+/g, '') &&
      /\s/g.test(name) &&
      /^[a-z ,.'-]+$/i.test(name) )
  {
    return true;
  } else {
    return false;
  }
}

export const checkDate = (date) => {
  const monthCheck = new Date(date).getMonth() === new Date().getMonth();
  const yearCheck = new Date(date).getUTCFullYear() === new Date().getUTCFullYear();
  if(monthCheck && yearCheck) {
    return true;
  } else {
    return false;
  }
}

export const getFirstWord = (str) => {
  const lastInit = str.match(/\b(\w)/g)[1]; 
  const spacePosition = str.indexOf(' ');
  if (spacePosition === -1)
    return str + '' + lastInit;
  else
    return str.substr(0, spacePosition) + ' ' + lastInit;
}