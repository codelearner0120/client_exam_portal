import React from 'react'
import { Typography, Drawer } from '@mui/material';
import classNames from 'classnames';
import { style } from '../Styles/MenuStyles';
import { withStyles } from '@mui/styles';
import LeftMenuItems from './LeftMenuItems';
import AppRoute from './AppRoute';

function LeftMenu(props) {
  const { classes } = props;
  const open = props.open;
  return (
    <>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <LeftMenuItems />

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppRoute />
      </main>
    </>
  )
}

export default withStyles(style)(LeftMenu)