import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { deleteOneNews } from '../../redux/slices/newSlice'
import { categoriesSlide } from '../../redux/slices/categoriesSlice'
import { config } from '../../config/config.js'
import Progress from '../progress/Progress'

const useStyle = makeStyles({
    btn: {
        background: 'black',
        color: 'white',
    },
    root: {
        maxWidth: 245,
        marginLeft: '.2rem',
        border: '3px solid rgb(160, 7, 7)',
        borderRadius: 10,
        padding: 15,
    },
    media: {
        height: 140,
    },
})

export default function CardWork({
    id,
    name,
    description,
    progresses

}) {
    const [prog, setProg] = useState([]);
    const [total, settotal] = useState();
    useEffect(() => {
        if (progresses !== undefined) {
            const data = progresses;

            const groupedData = data.reduce((result, item) => {
                const category = item.category.name;
                if (!result[category]) {
                    result[category] = {
                        category: category,
                        totalPercentage: 0,
                        maxWeight: item.weight
                    };
                } else {
                    if (item.weight !== null && (result[category].maxWeight === null || item.weight > result[category].maxWeight)) {
                        result[category].maxWeight = item.weight;
                    }
                }
                result[category].totalPercentage += item.value;
                return result;
            }, {});

            const groupedArray = Object.values(groupedData);

            let arrayfinal = [];
            groupedArray.map(element => {
                const total = element.totalPercentage * element.maxWeight / 100;
                const elemento = {
                    category: element.category,
                    Percentage: element.totalPercentage,
                    Weight: element.maxWeight,
                    total: total

                };
                arrayfinal.push(elemento);
            });
            setProg(arrayfinal);
            const totalAcumulado = arrayfinal.reduce((accumulator, element) => {
                return accumulator + element.total;
            }, 0);
            settotal(totalAcumulado);
        }

    }, [progresses]);
    const styles = useStyle()
    const dispatch = useDispatch()

    const deleteNews = (data) => {
        dispatch(deleteOneNews(data))
    }

    const stringCase = (param) => {
        return `${param}`.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
            letra.toUpperCase()
        )
    }

    return (
        <Grid item>
            <Card className={styles.root} key={id}>
                <CardActionArea className="player-wrapper">
                    <CardContent>
                        <Typography variant="h6">{`${name}`}</Typography>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {description}
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            sx={{
                                color: '#000',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        ></Typography>
                        {prog &&
                            prog.map((prog, i) => {
                                return (
                                    <Progress
                                        key={i}
                                        value={prog.Percentage}
                                        categorie={stringCase(
                                            `${prog?.category}`
                                        )}
                                    />
                                )
                            })}
                            {total && <Progress
                                        key={`totalcategoryas`}
                                        value={total}
                                        categorie={stringCase(
                                            `Total`
                                        )}
                                    />}


                    </CardContent>
                </CardActionArea>

            </Card>
        </Grid>
    )
}
