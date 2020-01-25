// (() => {
    const map = new CityMap(localStorage.getItem('cities'));

    const statesCitiesButton  = document.getElementsByClassName('states-cities__button')[0];
    const statesCitiesInput = document.getElementsByClassName('states-cities__input')[0];

    const inputCityFormName = document.getElementsByClassName('input-city-form__name')[0];
    const inputCityFormState = document.getElementsByClassName('input-city-form__state')[0];
    const inputCityFormLatitude = document.getElementsByClassName('input-city-form__latitude')[0];
    const inputCityFormLongitude =document.getElementsByClassName('input-city-form__longitude')[0];
    const inputCityFormButton = document.getElementsByClassName('input-city-form__button')[0];

    const saveInLocalstorage =document.getElementsByClassName('save-in-localstorage')[0];

    const cityMapOutput = document.getElementsByClassName('city-map__output')[0];


    statesCitiesButton.addEventListener('click', function () {
        cityMapOutput.innerText = map.getStatesCities(statesCitiesInput.value);
        statesCitiesInput.value = '';
    });

    inputCityFormButton.addEventListener('click', function () {
        cityMapOutput.innerText = map.addCity(inputCityFormName.value, inputCityFormState.value, inputCityFormLatitude.value, inputCityFormLongitude.value);
        inputCityFormName.value = '';
        inputCityFormState.value = '';
        inputCityFormLatitude.value = '';
        inputCityFormLongitude.value = '';
    });

    saveInLocalstorage.addEventListener('click', function () {
        localStorage.setItem('cities', map.cities);
        cityMapOutput.innerText = 'cities saved';
    });
// })();
