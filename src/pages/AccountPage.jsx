// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from 'hooks/use-auth';
// import { useLocation } from 'react-router-dom';
// // import { Navbar } from 'components/Navbar';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';

// const AccountPage = () => {

//     const {isAuth, email} = useAuth();
  
//     const navigate = useNavigate();

//     const { t } = useTranslation();
  
//     useEffect(() => {
//       if (!isAuth) {
//         navigate('/login');
//       }
//     });

//     const [date, setDate] = useState();

//     useEffect(() => {
//       axios
//         .post("https://dropclick.pro/base/getSubs.php", {
//           email: email
//         })
//         .then(res => {
//           setDate(res.data);
//         })
//     }, [isAuth])

//   return (
//     <div>
//         {/* <Navbar email={email} /> */}
//         <div className='container mt-4'> 
//             <h1>{t("Office")}</h1>
//             <div className='row mt-4'>
//                 <div className='col-4' style={{borderRadius: "15px", backgroundColor: '#16171b', padding: '30px'}}>
//                     <h5 className='mb-4'>{t("Personal data")}</h5>
//                     <div className='mb-3' style={{display: 'flex', justifyContent: 'center'}}>
//                         <h1 style={{textTransform: 'uppercase', border: "1px solid white", borderRadius: '100%', padding: '20px 30px'}}>{email.substring(0, 1)}</h1>
//                     </div>
//                     <p style={{textAlign: "center"}}>{email}</p>
//                     <h5 className='mt-5 mb-3'>{t("Safety")}</h5>
//                     <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{width: '100%'}}>
//                         {t("Change your password")}
//                     </button>
//                 </div>
//                 <div className='col-1'></div>
//                 <div className='col-7' style={{borderRadius: "15px", backgroundColor: '#16171b', padding: '30px'}}>
//                     <h5 className='mb-4'>{t("Subscription Information")}</h5>
//                     <p>{t("The subscription allows you to get unlimited access to the site materials. We provide several tariff plans to choose from. No subscription is available.")}</p>
//                     <div className='row mt-5'>
//                     <div className='col-6' style={{textAlign: 'center'}}>
//                         <p>{t("Subscription payment date")}:</p>
//                     </div>
//                     <div className='col-6' style={{textAlign: 'center'}}>
//                         {
//                         date ? date.map(dat => (
//                             <input type="date" value={dat.nach} readOnly />
//                         )) : <input type="text" value="Нет данных" readOnly />
//                         }
//                     </div>
//                     </div>
//                     <div className='row mt-4'>
//                     <div className='col-6' style={{textAlign: 'center'}}>
//                         <p>{t("Subscription end date")}:</p>
//                     </div>
//                     <div className='col-6' style={{textAlign: 'center'}}>
//                         <div>
//                         {
//                         date ? date.map(dat => (
//                             <input type="date" value={dat.date} readOnly />
//                         )) : <input type="text" value="Нет данных" readOnly />
//                         }
//                         </div>
//                     </div>
//                     </div>
//                         </div>
//                     </div>
//         </div>
//         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div class="modal-dialog modal-dialog-centered">
//                 <div class="modal-content">
//                 <div class="modal-header">
//                     <h1 class="modal-title fs-5" id="exampleModalLabel">{t("Hello")}!</h1>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="modal-body">
//                     {t("Unfortunately, you cannot change your password at the moment. If you need it, contact the administrator. This feature will be available soon. Thanks for understanding.")}
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">OK</button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AccountPage