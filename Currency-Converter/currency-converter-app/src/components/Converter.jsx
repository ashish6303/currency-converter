import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, Box, Button, FormControlLabel, FormGroup, Grid, styled, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/ThemeSlice';
import MaterialUISwitch from '../customComponents/CustomSwitch';
import CustomTextField from '../customComponents/CustomTextField';

function Converter() {

    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const [countryFrom, setCountryFrom] = useState('India');
    const [currencyFrom, setCurrencyFrom] = useState('INR');
    const [currencyTo, setCurrencyTo] = useState('USD')
    const [amountFrom, setAmountFrom] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [currencyExchnageRate, setAmountFromExchangeRate] = useState('');

    const dummyExchangeRates = {
        "USD": 1,         // Base currency
        "EUR": 0.85,      // 1 USD = 0.85 EUR
        "GBP": 0.75,      // 1 USD = 0.75 GBP
        "JPY": 110.0,     // 1 USD = 110.0 JPY
        "INR": 82.0,      // 1 USD = 82.0 INR
        "CAD": 1.25       // 1 USD = 1.25 CAD
    };

    const getCountryList = async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data.map(country => (
            {
                label: country.name.common,
                flag: country.flags.png,
                code: country.cca2,
                currency: country.currencies ? Object.keys(country.currencies) : [],

            }));
        setCountryFrom(countryOptions);
    }

    const getExchangeRate = async () => {
        // const response = await axios.get('https://data.fixer.io/api/latest?access_key=58338b724ca55ab81d221b9b8ef923ba');
        // const exchangeRates = response.data.rates;
        // console.log("Exchange ", exchangeRates)
        const exchangeValues = Object.keys(dummyExchangeRates).map(currencyCode => ({
            currency: currencyCode,
            rate: dummyExchangeRates[currencyCode]
        }));
        setAmountFromExchangeRate(exchangeValues);
    }

    const handleCurrencyExchange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value <= 100000000) {
            setAmountFrom(value);
        }
    }

    const handelConversion = () => {
        const amount = Number(amountFrom);
        if (amount > 0 && currencyFrom && currencyTo) {
            const rateFrom = dummyExchangeRates[currencyFrom];
            const rateTo = dummyExchangeRates[currencyTo];

            if (rateFrom && rateTo) {
                const convertedValue = (amount * rateTo) / rateFrom;
                setConvertedAmount(convertedValue.toFixed(2)); // Format to 2 decimal places
            } else {
                setConvertedAmount('0');
            }
        } else {
            setConvertedAmount('0');
        }
    };

    const handleCountryChange = (e, newValue, field) => {
        const selectedCurrency = newValue ? newValue?.currency[0] : '';
        if (field === 'from') {
            setCurrencyFrom(selectedCurrency);
            setAmountFrom(0);
        } else if (field === 'to') {
            setCurrencyTo(selectedCurrency);
            setAmountFrom(0);
        }
    }

    useEffect(() => {
        handelConversion();
    }, [amountFrom]);

    useEffect(() => {
        getCountryList();
        getExchangeRate();
    }, [])

    // , backgroundColor:'#490058'
    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', border: '2px solid #490058', }}>
            <h1>Currency Converter & Exchange Rates</h1>
            <Grid container style={{ width: "30%", marginBottom: '12px' }}>
                <Grid item md={6} className='sub-heading'>
                    <div>Up to date FX rate</div>
                </Grid>
                <Grid item md={6} className='sub-heading'>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <MaterialUISwitch
                                    checked={darkMode}
                                    onChange={() => dispatch(toggleDarkMode())}
                                />
                            }
                            label="Mode"
                        />
                    </FormGroup>
                </Grid>
            </Grid>

            <Box sx={{ width: 430, textAlign: 'center', }}>
                <Card variant="outlined" sx={{ borderRadius: '5px' }}>
                    <CardContent className={darkMode ? 'card-dark-mode' : 'card-light-mode'}>
                        <Grid container sx={{ borderRadius: '5px', backgroundColor: "whitesmoke" }}>
                            <Grid className={darkMode ? 'grid-dark-mode' : 'grid-light-mode'} item md={12} sm={12} sx={12}>
                                <Autocomplete
                                    disablePortal
                                    id="From-Country"
                                    options={countryFrom}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(e, newValue) => handleCountryChange(e, newValue, 'from')}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={option.flag}
                                                alt={`${option.label} flag`}
                                                style={{ width: '30px', height: 'auto', marginRight: '10px' }}
                                            />
                                            {option.label}
                                        </li>
                                    )}
                                    renderInput={(params) => <CustomTextField
                                        {...params}
                                        label="Country From"
                                        darkMode={darkMode}
                                    />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className='grid-container'>
                            <Grid className={darkMode ? 'grid-dark-mode' : 'grid-light-mode'} item md={12} sm={12} sx={12}>
                                <Autocomplete
                                    disablePortal
                                    id="Country-To"
                                    options={countryFrom}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(e, newValue) => handleCountryChange(e, newValue, 'to')}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={option.flag}
                                                alt={`${option.label} flag`}
                                                style={{ width: '30px', height: 'auto', marginRight: '10px' }}
                                            />
                                            {option.label}
                                        </li>
                                    )}
                                    renderInput={(params) =>
                                        <CustomTextField
                                        {...params}
                                        label="Country To"
                                        darkMode={darkMode}
                                    />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={3}>
                                <h3 style={{ color: darkMode ? '#AC3AE1' : '#AC3AE1', float: 'inline-start', marginLeft: '5px' }}>Amount</h3>
                                <CustomTextField
                                    id="outlined-basic"
                                    placeholder='Amount'
                                    size='small'
                                    variant="outlined"
                                    value={amountFrom}
                                    darkMode={darkMode}
                                    onChange={handleCurrencyExchange}
                                />
                            </Grid>
                            <Grid item md={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 className={darkMode ? 'text-dark-mode' : 'text-light-mode'} style={{ marginBottom: '5px', alignSelf: 'flex-end' }}>{(amountFrom === '' ? '0' : `${amountFrom}`) + ' ' + currencyFrom}</h3>
                                <h1 style={{ marginTop: '1px', marginBottom: '5px', color: '#AC3AE1', alignSelf: 'flex-end' }}>{(convertedAmount === '' ? '0 ' : `${convertedAmount}`) + ' ' + currencyTo}</h1>
                                <p className={darkMode ? 'text-dark-mode' : 'text-light-mode'} style={{ marginTop: '1px', alignSelf: 'flex-end' }}>Market rates collected -  {new Date().toLocaleDateString()}</p>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <p>Developed by - Ashish Prakash Singh</p>
                </Card>
            </Box>
        </div>
    );
}

export default Converter;
