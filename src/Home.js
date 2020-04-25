import React, { useState } from 'react';
import { url } from './url';
import { Button, Dialog, TextInputField } from 'evergreen-ui';
import { MyTextInputField } from './Fields';
/*eslint-disable quotes*/

const OneAttest = ({ date, signed, id, children, i }) => {
  const [month, year] = date.split('/');
  // const [show, setShow] = useState(!i);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [inputName, setInputName] = useState('');
  const sStyle = { padding: '9px' };
  return (
    <div>
      <Dialog
        isShown={show}
        onCloseComplete={toggleShow}
        hasFooter={false}
        hasHeader={false}
      >
        {({ close }) => (
          <>
            {text}
            <br />
            <div style={{ display: 'flex' }}>
              <div style={sStyle}>/s/</div>
              <TextInputField
                value={inputName}
                onChange={({ target }) => setInputName(target.value)}
              />
              {employees.includes(inputName.toLowerCase())
                ? children
                : 'Please fill in your full name to complete'}
            </div>
            <Button height={40} onClick={close}>
              Close without signing
            </Button>
          </>
        )}
      </Dialog>
      {months[month]} {year}
      <div>
        {signed ? (
          'Already Signed'
        ) : (
          <Button onClick={toggleShow}>Read and Sign</Button>
        )}
      </div>
    </div>
  );
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const employees = [
  'Beau Bauder',
  'Jessie Barre',
  'Holly Broussard',
  'Elyse Alford ',
  'Sarah Izdepski',
].map((name) => name.toLowerCase());

const Home = ({ user }) => {
  const [attests, setAttests] = useState(user.attests);

  const sign = (id, date) => {
    fetch(`${url}sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, id }),
    })
      .then((res) => res.json())
      .then(setAttests);
  };

  return attests && attests.length ? (
    <>
      {attests.map((a, i) => (
        <div key={a._id} style={{ border: '1px solid black' }}>
          <OneAttest {...a} key={a._id} i={i}>
            <div style={{ 'padding-top': '4px' }}>
              <Button height={32} onClick={sign.bind(null, a._id, a.date)}>
                Sign
              </Button>
            </div>
          </OneAttest>
        </div>
      ))}
    </>
  ) : (
    <h2>You're all up to date.</h2>
  );
};

const text = (
  <div>
    By digitally signing below you certify that in the past days all money spent
    on food, beverage, and other nominal items (less than $10 value) by you in
    the course of your employment with PGL:
    <ol>
      {[
        `has been reported and entered into this tracking app`,
        `was used in conjunction with educational/workflow-process related visits with providers and;`,
        `complied with all federal and state laws and regulations governing said.`,
      ].map((item) => (
        <li>{item}</li>
      ))}
    </ol>
    I also certify that I have complied with all applicable laws including but
    not limited to HIPAA, The Anti-Kickback Statute, The Stark Law, and The
    Eliminating Kickbacks in Recovery Act at all times during my employment with
    PGL and if I have not or have any questions regarding compliance with these
    laws I have contacted PGL's Chief Compliance Officer or management. In the
    event you cannot in full honesty sign this attestation please contact PGL's
    compliance hotline at 985-317-8102
  </div>
);

export default Home;
