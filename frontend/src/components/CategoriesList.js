import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {CategoriesService} from "../services/CategoriesService";
import {useEffect, useState} from "react";
import {Box, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {CustomSnackbar} from "./CustomSnackBar";

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function CategoriesList() {
    const [alignment, setAlignment] = useState('allowed');
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [allowed, setAllowed] = useState([]);
    const [prohibited, setProhibited] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        CategoriesService.getCategories().then(values => {
            const allowedArr = values.filter(value => !value.prohibited)
            const prohibitedArr = values.filter(value => value.prohibited)

            setAllowed(allowedArr)
            setProhibited(prohibitedArr)
        });
    }, []);

    const allowedChecked = intersection(checked, allowed);
    const prohibitedChecked = intersection(checked, prohibited);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedProhibited = () => {
        setProhibited(prohibited.concat(allowedChecked));
        setAllowed(not(allowed, allowedChecked));
        setChecked(not(checked, allowedChecked));
    };

    const handleCheckedAllowed = () => {
        setAllowed(allowed.concat(prohibitedChecked));
        setProhibited(not(prohibited, prohibitedChecked));
        setChecked(not(checked, prohibitedChecked));
    };

    function handleClose() {
        setOpen(false);
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const updateCategories = () => {
        setOpen(true);

        const updatedAllowed = allowed.map(value => ({
            ...value,
            prohibited: false
        }));
        const updatedProhibited = prohibited.map(value => ({
            ...value,
            prohibited: true
        }));
        const newCategories = [...updatedAllowed,...updatedProhibited];

        CategoriesService.updateCategories(newCategories);
    }

    function createCategory() {
        if(/[a-zA-Z]/.test(categoryName)) {
            setIsError(false);
            if (alignment === "allowed") {
                setAllowed([...allowed, {
                    id: null,
                    name: categoryName,
                    prohibited: false
                }])
            } else {
                setProhibited([...prohibited, {
                    id: null,
                    name: categoryName,
                    prohibited: true
                }])
            }
            setCategoryName('')
        } else setIsError(true);
    }

    const customList = (title, items) => {
        const isProhibited = title === "Prohibited";
        return (<Card>
                <CardHeader
                    sx={{px: 2, py: 1, backgroundColor: isProhibited ? '#ba000d' : '#124116'}}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={
                                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                            }
                            disabled={items.length === 0}
                            inputProps={{
                                'aria-label': 'all items selected',
                            }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(items)}/${items.length} selected`}
                />
                <Divider/>
                <List
                    sx={{
                        width: 200,
                        height: 230,
                        overflow: 'auto',
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {items.map((value) => {
                        const labelId = `transfer-list-all-item-${value}-label`;

                        return (
                            <ListItemButton
                                key={value.name}
                                role="listitem"
                                onClick={handleToggle(value)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.name}/>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Card>
        );
    }

    return (
        <div>
            <CustomSnackbar onClose={handleClose} state={open} title={"Categories updated successfully!"}/>

            <Typography variant={"h2"} sx={{ fontSize: 30, justifySelf:'center', pb:3}} color="text.secondary" gutterBottom>
                Categories:
            </Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>{customList('Allowed', allowed)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{my: 0.5}}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedProhibited}
                            disabled={allowedChecked.length === 0}
                            aria-label="move selected prohibited"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{my: 0.5}}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedAllowed}
                            disabled={prohibitedChecked.length === 0}
                            aria-label="move selected allowed"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList('Prohibited', prohibited)}</Grid>
            </Grid>

            <div style={{display:'flex', paddingLeft:65}}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch', mr:2},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField error={isError} id="outlined-basic" value={categoryName} onChange={(event) => {
                        setCategoryName(event.target.value);}} label="Category Name" variant="outlined" />
                </Box>
                <ToggleButtonGroup
                    size="small"
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{display:'block', marginTop:2}}
                >
                    <ToggleButton value="allowed" >Allowed</ToggleButton>
                    <ToggleButton value="prohibited">Prohibited</ToggleButton>
                </ToggleButtonGroup>
                <Button variant="contained" onClick={createCategory} sx={{maxHeight:40, marginTop:2, marginLeft:2}} >SUBMIT</Button>
            </div>

            <Button variant="contained" sx={{mt:5}} onClick={updateCategories}>Update Categories</Button>
            <Box sx={{pr:80}}></Box>
        </div>
    );
}