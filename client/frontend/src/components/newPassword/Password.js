import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification, Card } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Redirect } from 'react-router-dom';

const openNotification = (placement, icon, title, message) => {
  notification.open({
    message: title,
    description:
      message,
    placement,
    icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
    duration: 3,
    isRedirect: false,
  });
};

class Password extends Component {
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

        // this.setState({ iconLoading: true })

        const response = await fetch('/newPassword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email,
          }),
        });

        const result = await response.json();


        if (result.response === 'success') {

          this.setState({
            isRedirect: true,
          });
        } else {
          openNotification('topRight', 'warning', 'Warning',
            'Неправильно указан email, пожалуйста попробуйте еще раз!');
          this.setState({ iconLoading: false });
        }
      }
    });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={`/instructions_new_password`} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="registerForm">

        <Card style={{
          borderRadius: '20px',
          marginTop: '11%',
          marginBottom: '11%',
        }}>
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '130px' }} src={logo} alt="" />
            <h3 style={{ color: '#4a76a8' }}>Для получения пароля введите email,
                указанный при регистрации.<br />
                Дальнейшие инструкции будут высланы в ответном пиьме!</h3>
          </div>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Введите правильный E-mail!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите E-mail!',
                  },
                ],
              })(<Input placeholder="E-mail" />)}
            </Form.Item>


            <Form.Item>
              <Button style={{ backgroundColor: '#4A76A8', color: '#ffffff' }}
                htmlType="submit" className="login-form-button"
                loading={this.state.iconLoading} icon='login'>
                Получить новый пароль
                </Button>
              <div style={{ textAlign: 'center' }}>

                <Link to={'/our_company'}>О нас</Link><br />
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Password);
// export default Password;