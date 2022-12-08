import PaidIcon from '@mui/icons-material/Paid';
import WalletIcon from '@mui/icons-material/Wallet';
import { NavLink } from 'react-router-dom';
const User = () =>{
    return(
        <><p>logged in</p><NavLink to={`rembourser/`}>  <button className="btn btn-primary"><WalletIcon /></button></NavLink><NavLink to={`payer/`}>  <button className="btn btn-primary"><PaidIcon /></button></NavLink></>
    );

};

export default User;