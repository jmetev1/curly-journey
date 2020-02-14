import React, { useState } from 'react';
import { url } from './url';
import { Wrapper, SelectClinic, Receipt } from './Fields';
import { OneClinic } from './OneClinic';

export default class PastVisits extends React.Component {
  state = {};
  componentDidMount() {
    Promise.all(['visits', 'clinic'].map(type => fetch(url + type)))
      .then(res => Promise.all(res.map(r => r.json())))
      .then(([allVisits, clinics]) => {
        const byClinic = allVisits.reduce((a, v) => {
          const { clinic } = v;
          a[clinic] = a[clinic] ? a[clinic].concat([v]) : [v];
          return a;
        }, {});

        const clinicsThatHaveVisits = clinics.filter(
          ({ _id }) => byClinic[_id]?.length
        );
        this.setState({
          clinicsThatHaveVisits,
          byClinic,
        });
      });
  }

  render() {
    const { clinicsThatHaveVisits, byClinic } = this.state;
    return (
      <Wrapper>
        {byClinic ? (
          <SelectClinicModule
            byClinic={byClinic}
            clinics={clinicsThatHaveVisits}
          />
        ) : (
          'Loading'
        )}
      </Wrapper>
    );
  }
}

const SelectClinicModule = ({ clinics, byClinic }) => {
  const [clinic, setClinic] = useState({});

  const setClinicByID = ({ target: { value } }) => {
    const chosen = clinics.find(c => value === c._id) || {};
    setClinic(chosen);
  };
  const { _id, name } = clinic;
  const visits = byClinic[_id];
  return (
    <>
      <SelectClinic clinics={clinics} setClinic={setClinicByID} />
      {_id && (
        <OneClinic clinicID={_id} clinicName={name} visits={visits}></OneClinic>
      )}
    </>
  );
};
/*
get spending by docotr seems to fail with admin
*/
