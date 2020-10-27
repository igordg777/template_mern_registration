import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification, Card } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { AddIsLogin } from '../redux/action';
// import logo from '../images/logo.png';
import loginHeadMask from '../images/login-head-mask.png';
import './styles/login.css';

const openNotification = (placement, icon, title, message) => {
  notification.open({
    message: title,
    description:
      message,
    placement,
    icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
    duration: 3,
  });
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      iconLoading: false,
      dashboard: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ iconLoading: true });
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const result = await response.json();
        if (result.response === 'success') {

          this.props.cookies.set('isLogin', true, { path: '/' });
          this.props.cookies.set('Role', result.crewRole, { path: '/' });
          this.props.addIsLogin(true);
          if (result.crewRole === 'командир отдельно на будещее') {

            this.setState({
              isRedirect: true,
              iconLoading: false,
              dashboard: '/dashboard',
            });

          } else if (result.crewRole || result.crewRole !==
            'командир отдельно на будещее') {
            this.setState({
              isRedirect: true,
              iconLoading: false,
              dashboard: '/dashboard',
            });
          }

        } else {
          openNotification('topRight', 'warning', 'Warning',
            'Неверный email и пароль, пожалуйста попробуйте еще раз!');
          this.setState({ iconLoading: false });
        }
      }
    });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={`${this.state.dashboard}`} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <Card className='login-form'>
          <div className='login-head'>

            <h3>Введите<br />
                свои данные</h3>
            <img src={loginHeadMask} alt="" />
          </div>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item className='flex-form'>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите E-mail!',
                  }],
              })(
                <Input
                  className='login-form--input'
                  type='mail'
                  placeholder="E-mail"
                />,
              )}
            </Form.Item>
            <Form.Item className='flex-form'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите пароль!',
                  }],
              })(
                <Input
                  className='login-form--input'
                  type="password"
                  placeholder="Пароль"
                />,
              )}
            </Form.Item>
            <Form.Item className='flex-form'>
              <Button
                type="primary"
                htmlType="submit"
                className="primary-btn"
                loading={this.state.iconLoading}
              >
                Войти
                </Button>
              <div style={{ textAlign: 'center' }}>
                <Link to={'/signupAll'}>Регистрация</Link><br />
                {/*<Link to={'/password'}>Не помню пароль</Link><br/>
                  <Link to={'/our_company'}>О нас</Link><br/>*/}
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addIsLogin: (toogle) => {
      dispatch(AddIsLogin(toogle));
    },
  };
}

const Signin = Form.create({ name: 'normal_login' })(Login);
export default withCookies(connect(null, mapDispatchToProps)(Signin));