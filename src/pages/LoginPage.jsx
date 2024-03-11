import { Login } from 'components/Login'
import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {

  const { t } = useTranslation();

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
                <Login />
                <div>
                  <p className="mb-0">{t("Don't have an account")}? <Link to='/register' className="text-white-50 fw-bold">{t("Sign Up")}</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage