import {Box, Grid, Paper, styled, Typography} from "@mui/material";
import CategoriesList from "../components/CategoriesList";
import {ImageUploader} from "../components/ImageUploader";
import {LogTable} from "../components/LogTable";
import {useState} from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const HomePage = () => {
    const [response,setResponse] = useState();

    const handleImageUpload = (response) => {
        setResponse(response);
    };

    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '50vh' }}
    >
        <Box sx={{mt: '5vh'}}></Box>
        <Grid item xs={6}>
            <Item>
                <Box sx={{pl:80, pt:10}}></Box>
                <Typography variant={"h1"} sx={{ fontSize: 30, justifySelf:'center', pb:10}} color="text.secondary" gutterBottom>
                    Upload Product Image
                </Typography>
                <ImageUploader onImageUpload={handleImageUpload}/>
                <Item sx={{display:'flex', alignContent:'flex-start', border:1, borderColor: 'primary.main'}}>
                    <CategoriesList/>
                    <LogTable response={response}/>
                </Item>
                <Box sx={{pb:10}}></Box>
            </Item>
        </Grid>
    </Grid>
}