// import React, { lazy } from 'react';
// import { Button, Pane } from 'evergreen-ui';
// import './App.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { url } from './url';
// import { Authorized } from './App';
// import { Err, MyTextInputField } from './Fields';
// import { LoginSchema } from './Validation';
// import logo from './image/pnglogo.png';
// const dev = process.env.NODE_ENV === 'development';

// let options = {
//   dev,
//   validate: true,
//   prefill: false,
//   showState: dev,
//   settings: true,
// };
// const newUser = !Object.keys(options).every(key => window.pglOptions[key]);
// for (let key in options) {
//   if (newUser) window.pglOptions.setItem(key, options[key]);
//   else options[key] = window.pglOptions.getItem(key) === 'true' || false;
// }

// export const OptionsContext = React.createContext({});

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       ...options,
//       updateOptions: (key, { target: { checked } }) => {
//         window.pglOptions[key] = checked;
//         this.setState(Object.fromEntries([[key, checked]]));
//       },
//       region: null,
//     };
//   }

//   submit = values => {
//     fetch(`${url}login`, {
//       method: 'POST',
//       body: JSON.stringify(values),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(r => r.json())
//       .then(region => this.setState({ region }));
//   };

// componentDidMount() {
//   this.props.region
//     .then(res => res.json())
//     .then(region => region && this.setState({ region }))
//     .catch(e => {
//       throw new Error('app js setState on comp did mount');
//     });
// }

//   Login = () => (
//     <Pane
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       height="70vh"
//     >
//       <Pane width="90vw" border="default">
//         <img src={logo} height="47px" alt="pgl logo" />
//         <Formik
//           initialValues={
//             process.env.NODE_ENV === 'development'
//               ? { username: 'test', password: 'wonderboy' }
//               : { username: '', password: '' }
//           }
//           onSubmit={this.submit}
//           validationSchema={LoginSchema}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <ErrorMessage component={Err} name="username" />
//               <Field as={MyTextInputField} name="username" label="Username" />
//               <ErrorMessage component={Err} name="password" />
//               <Field
//                 as={MyTextInputField}
//                 name="password"
//                 label="Password"
//                 type="password"
//               />
//               <Button type="submit" disabled={isSubmitting} children="Submit" />
//               {this.state.region === false && 'login failed'}
//             </Form>
//           )}
//         </Formik>
//       </Pane>
//     </Pane>
//   );
//   route(region) {
//     if (region) return <Authorized route={this.props.route} />;
//     if (region === null) return 'Loading';
//     if (region === false) return <this.Login />;
//     else return 'something weird happened';
//   }
//   render() {
//     return (
//       <OptionsContext.Provider value={this.state}>
//         <Authorized />
//       </OptionsContext.Provider>
//     );
//   }
// }
// /*
//     <div>
//           <ul>
//             <li>
//               <Link to="/public">Public Page</Link>
//             </li>
//             <li>
//               <Link to="/protected">Protected Page</Link>
//             </li>
//           </ul>
//           <Route path="/login" component={Login} />
//           <PrivateRoute path="/" component={App} />
//         </div>
//     */
// class Login extends React.Component {
//   render() {
//     return <div>Login</div>;
//   }
// }
