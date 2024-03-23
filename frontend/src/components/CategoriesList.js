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
import {Box, Typography} from "@mui/material";
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
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [allowed, setAllowed] = useState([]);
    const [prohibited, setProhibited] = useState([]);

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

            <Typography variant={"h1"} sx={{ fontSize: 30, justifySelf:'center', pb:3}} color="text.secondary" gutterBottom>
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
            <Button variant="contained" sx={{mt:5}} onClick={updateCategories}>Update Categories</Button>
            <Box sx={{pr:80}}></Box>
        </div>
    );
}