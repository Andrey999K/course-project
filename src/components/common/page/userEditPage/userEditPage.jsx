import React, { useEffect, useState } from "react";
import api from "../../../../api";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import RadioField from "../../form/radioField";
import MultiSelectField from "../../form/multiSelectField";
import PropTypes from "prop-types";
import { validator } from "../../../../utils/validator";

const UserEditPage = ({ data, onSubmit }) => {
  const history = useHistory();
  const [user, setUser] = useState(data);
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
  const { userId } = useParams();
  const handleChange = ({ name, value }) => {
    setUser(prevState => ({ ...prevState, [name]: value }));
  };
  const handleChangeProfession = ({ value }) => {
    const newProfession = professions.find(prof => prof.value === value);
    setUser(prevState => (
      {
        ...prevState,
        profession: {
          _id: newProfession.value,
          name: newProfession.label
        }
      }
    ));
  };
  const handleChangeQualities = ({ value }) => {
    const newQualities = value.map(item => ({ _id: item.value, name: item.label, color: item.color }));
    console.log(newQualities);
    setUser(prevState => ({ ...prevState, qualities: newQualities }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    const isValid = validate();
    if (!isValid) return;
    onSubmit(user);
    history.push(`/users/${userId}`);
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Пожалуйста заполните имя"
      }
    },
    email: {
      isRequired: {
        message: "Пожалуйста заполните электронную почту"
      },
      isEmail: {
        message: "Email введён некорректно"
      },
    }
  };
  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    validate();
  }, [user]);
  const showForm = () => {
    if (!user) return <span>Loading...</span>;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          name="name"
          label="Имя"
          value={user.name}
          error={errors.name}
        />
        <TextField
          onChange={handleChange}
          name="email"
          label="Электронная почта"
          value={user.email}
          error={errors.email}
        />
        <SelectField
          onChange={handleChangeProfession}
          name="profession"
          label="Выбери свою профессию"
          value={user.profession._id}
          options={professions}
        />
        <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" }
          ]}
          value={user.sex}
          name="sex"
          onChange={handleChange}
          label="Выберите ваш пол"
        />
        <MultiSelectField
          options={qualities}
          onChange={handleChangeQualities}
          name="qualities"
          label="Выберите ваши качества"
          defaultValue={
            user.qualities.map(item => ({ ...item, label: item.name, value: item._id }))
          }
        />
        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
        >
          Обновить
        </button>
      </form>
    );
  };
  useEffect(() => {
    api.professions.fetchAll().then(data => {
      const professionsList = Object.keys(data).map(professionName => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then(data => {
      const qualitiesList = Object.keys(data).map(optionName => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {
            showForm()
          }
        </div>
      </div>
    </div>
  );
};

UserEditPage.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

export default UserEditPage;
