import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { useStyles } from './BodyStyles';
import { PageHeader } from './Common/CommonComponent';
import { DisplayCardGraph } from './Common/GraphComponent';
import { CardContent } from '@material-ui/core';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  fakeArrayDataGenerator,
  randomValueGenerator,
} from './../utils/fakeArrayDataGenetator';
import {
  amber,
  green,
  indigo,
  lightGreen,
  red,
} from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { GetPost, GetUser } from './../utils/blogRequest';
import ListSection from './ListSection';
import { getUser } from './../api/auth';
import Progress from './Common/Progress';

export default function Dashboard() {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const [authors, setauthors] = useState([]);

  const hs = fakeArrayDataGenerator({ count: 9, digit: 100 });
  console.log(hs);
  const DisplayData = [
    {
      label: 'Gained Stores',
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: '4%',
    },
    {
      label: 'Drop Stores',
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: '9%',
    },
    {
      label: 'New Products',
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: '23%',
    },
    {
      label: 'Incoming  Products',
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: '23%',
    },
    {
      label: 'Earning From New Products',
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: '40%',
    },
    {
      label: 'Earning From Incoming  Products',
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: '30%',
    },
  ];

  const GraphCardData = [
    {
      id: 'Gained Stores',
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: blue[500],
      bgColor: blue[50],
    },
    {
      id: 'Drop Stores',
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: indigo[500],
      bgColor: indigo[50],
    },
    {
      id: 'New Products',
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: lightGreen[500],
      bgColor: lightGreen[50],
    },
    {
      id: 'Incoming  Products',
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: lightGreen[500],
      bgColor: lightGreen[50],
    },
    {
      id: 'Earning From New Products',
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: amber[500],
      bgColor: amber[50],
    },
    {
      id: 'Earning From Incoming  Products',
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: amber[500],
      bgColor: amber[50],
    },
  ];

  useEffect(() => {
    console.log(getUser());
    if (!fetched) {
      GraphCardData.map((item, i) =>
        DisplayCardGraph({
          id: item.id,
          data: item.data,
          brColor: item.brColor,
          bgColor: item.bgColor,
        })
      );
      setFetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);

  // for api calling
  useEffect(() => {
    if (!fetched) {
      GetPost({ limit: 5 }).then(({ data: { data } }) => {
        setPosts(data);
      });
      GetUser({ limit: 5 }).then(({ data: { data } }) => {
        setauthors(data);
      });
      setFetched(true);
    }
  }, [fetched]);
  return (
    <Box>
      <PageHeader
        label="Dashboard"
        pageTitle="Analytics of All Owners"
      />
      <Grid container spacing={1}>
        {DisplayData.map((item, i) => (
          <Grid item xs={6} sm={4} lg={4} key={i}>
            <Card>
              <CardContent className={classes.cardContent}>
                <canvas
                  id={item.label}
                  className={classes.displayCardGraph}
                ></canvas>

                <Typography
                  variant="body2"
                  className={classes.cardLabel}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="h5"
                  component="h6"
                  className={classes.cardTitle}
                >
                  {item.value}
                </Typography>
                <Typography
                  component="p"
                  style={{
                    textAlign: 'center',
                    marginBottom: '0px',
                  }}
                >
                  <Button
                    size="small"
                    className={classes.ratioBtn}
                    startIcon={item.icon}
                    style={{
                      color:
                        item.label[0] === 'P' ? green[600] : red[500],
                    }}
                  >
                    {item.iconLabel}
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <UserOverviewComponent /> */}
      <Typography style={{ fontSize: '25px', marginBottom: '10px' }}>
        Business Locations
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4} lg={2}>
          <Progress percentage="20" text="NewYork" />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Progress percentage="30" text="Los Angeles" />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Progress percentage="10" text="Houston" />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Progress percentage="10" text="Phoenix" />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Progress percentage="15" text="Philadelphia" />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Progress percentage="25" text="Other" />
        </Grid>
      </Grid>
      {/* <ListSection posts={posts} authors={authors} /> */}
    </Box>
  );
}
